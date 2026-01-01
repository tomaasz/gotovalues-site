#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-https://gotovalues.com}"

check_ct () {
  local path="$1"
  local expected="$2"
  local ct
  ct="$(curl -fsSI "$BASE$path" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type"{print $2; exit}')"
  if [[ -z "${ct:-}" ]]; then
    echo "❌ $path: missing Content-Type"
    exit 1
  fi
  if [[ "$ct" != *"$expected"* ]]; then
    echo "❌ $path Content-Type='$ct' (expected contains '$expected')"
    exit 1
  fi
  echo "✅ $path Content-Type OK: $ct"
}

check_code () {
  local path="$1"
  local expected="$2"
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")"
  if [[ "$code" != "$expected" ]]; then
    echo "❌ $path HTTP $code (expected $expected)"
    exit 1
  fi
  echo "✅ $path HTTP OK: $code"
}

check_ct "/" "text/html"
check_ct "/index.html" "text/html"
check_ct "/favicon/site.webmanifest" "application/manifest+json"
check_code "/favicon/favicon.svg" "404"

echo "ALL OK @ $BASE"
