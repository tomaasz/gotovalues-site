#!/usr/bin/env bash
set -euo pipefail

URL="${1:-https://gotovalues.com}"
OUT_DIR="${OUT_DIR:-/tmp/gotovalues_check}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="${OUT_DIR}/${TS}"

mkdir -p "$OUT"

say() { printf "\n=== %s ===\n" "$*"; }
ok()  { printf "✅ %s\n" "$*"; }
bad() { printf "❌ %s\n" "$*"; }

repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

cd "$(repo_root)"

say "META"
echo "time=$TS"
echo "pwd=$(pwd)"
echo "url=$URL"
echo "branch=$(git branch --show-current 2>/dev/null || echo '-')"
echo "commit=$(git log -1 --oneline --decorate 2>/dev/null || echo '-')"

say "GIT STATUS"
git status --porcelain || true

say "FRONTEND CHECKS"
# 1) no inline <script> (except external)
if grep -n '<script>' index.html | grep -v 'src=' >/dev/null 2>&1; then
  bad "inline <script> found in index.html (CSP risk)"
  grep -n '<script>' index.html | grep -v 'src=' || true
else
  ok "no inline <script> in index.html"
fi

# 2) logo targets present
if grep -q 'header-logo' index.html && grep -q 'footer-logo' index.html; then
  ok "header-logo + footer-logo present in index.html"
else
  bad "missing header-logo/footer-logo in index.html"
  grep -nE 'logo-container|header-logo|footer-logo' index.html || true
fi

# 3) injectLogos targets explicit selectors
if grep -n 'querySelectorAll' assets/app.js | grep -E 'header-logo|footer-logo' >/dev/null 2>&1; then
  ok "injectLogos targets header/footer explicitly"
else
  bad "app.js may still inject into .logo-container"
  grep -n 'querySelectorAll' assets/app.js || true
fi

say "REMOTE HEADERS SNAPSHOT"
curl -sI "$URL" > "$OUT/headers.txt" || { bad "curl failed for $URL"; exit 1; }

# Pretty extract
grep -iE '^(HTTP/|date:|server:|via:|content-type:|cache-control:|etag:|last-modified:|strict-transport-security:|content-security-policy:|x-content-type-options:|x-frame-options:|referrer-policy:|permissions-policy:|cross-origin-opener-policy:|cross-origin-resource-policy:)' \
  "$OUT/headers.txt" > "$OUT/headers_filtered.txt" || true

cat "$OUT/headers_filtered.txt"

# Minimal assertions
if grep -qi '^content-security-policy:' "$OUT/headers.txt"; then ok "CSP header present"; else bad "CSP header missing"; fi
if grep -qi '^x-content-type-options: nosniff' "$OUT/headers.txt"; then ok "nosniff present"; else bad "nosniff missing"; fi
if grep -qi '^x-frame-options: DENY' "$OUT/headers.txt"; then ok "XFO DENY present"; else bad "XFO missing/wrong"; fi
if grep -qi '^strict-transport-security:' "$OUT/headers.txt"; then ok "HSTS present"; else bad "HSTS missing"; fi

say "CACHE QUICK CHECK"
echo "--- / (HTML) ---"
curl -sI "$URL/" | grep -iE 'cache-control|content-type|server|via' || true
echo "--- /assets/app.js ---"
curl -sI "$URL/assets/app.js" | grep -iE 'cache-control|content-type|server|via' || true

say "DOCKER/PORTS (optional)"
if command -v docker >/dev/null 2>&1; then
  docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}' | grep -i caddy || true
fi
if command -v ss >/dev/null 2>&1; then
  ss -ltnp 2>/dev/null | grep -E ':(80|443)\s' || true
fi

say "OUTPUT FILES"
echo "$OUT/headers.txt"
echo "$OUT/headers_filtered.txt"

ok "done"
