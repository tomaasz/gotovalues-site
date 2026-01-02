#!/usr/bin/env bash
set -euo pipefail

FILE="index.html"

echo "🔎 Sprawdzam repozytorium Git..."
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "❌ To nie jest repozytorium Git"
  exit 1
}

if [[ ! -f "$FILE" ]]; then
  echo "❌ Brak pliku $FILE"
  exit 1
fi

TS=$(date +%Y%m%d_%H%M%S)
BACKUP="${FILE}.bak.${TS}"

echo "💾 Tworzę backup: $BACKUP"
cp -a "$FILE" "$BACKUP"

echo "⬇️ Przywracam $FILE z Git (HEAD)..."
git checkout -- "$FILE"

echo "🔍 Sprawdzam wystąpienia 'Performance / Dostępność'..."
COUNT=$(grep -o "Performance / Dostępność" "$FILE" | wc -l || true)

echo "ℹ️ Liczba wystąpień: $COUNT"

if [[ "$COUNT" -eq 0 ]]; then
  echo "⚠️ Uwaga: sekcja NIE występuje w aktualnej wersji z Git"
else
  echo "✅ Sekcja obecna – plik zgodny z repo"
fi

echo "✅ Gotowe. Backup masz w: $BACKUP"
