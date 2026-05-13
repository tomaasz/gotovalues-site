# Design System — Figma Integration

## Overview

Ten dokument opisuje jak zsynchronizować design tokens z kodem do Figmy.
Źródłem prawdy jest `packages/design-system/tokens/`. Figma jest odbiciem.

## Current State

- Figma: **brak struktury** — nie ma jeszcze plików, bibliotek ani variables
- Kod: **tokeny gotowe** — w `packages/design-system/tokens/`
- Automatyzacja: **półautomatyczna** — skrypt `push-to-figma.py` + manualne kroki

## Setup (pierwsze uruchomienie)

1. **Utwórz Figma team i project** (jeśli nie istnieje)
   - Team: "gotovalues/cavi"
   - Project: "Design System"

2. **Utwórz pliki Figma**
   - `🎨 Design Tokens` — variables, color styles, text styles
   - `🧩 UI Components` — komponenty z wariantami
   - `📄 Page Templates` — przykładowe strony

3. **Skonfiguruj PAT**
   ```bash
   export FIGMA_PAT="figd_xxxxxxxxxxxx"
   ```

4. **Uruchom skrypt importu** (opcjonalnie)
   ```bash
   cd packages/design-system/figma
   python3 scripts/push-to-figma.py --file-key <FILE_KEY> --dry-run
   ```
   Gdzie `<FILE_KEY>` to ID z URL pliku Figma:
   `https://www.figma.com/file/<FILE_KEY>/...`

5. **Import manualny** — postępuj według `figma/import-guide.md`

## Synchronizacja

### Code → Figma (gdy zmieniasz tokeny w kodzie)

1. Zmień token w `packages/design-system/tokens/*.css`
2. Zaktualizuj `tokens/tokens.json`
3. Zaktualizuj odpowiadające variables w Figmie ręcznie
4. (Future) Uruchom `push-to-figma.py` gdy API będzie stabilne

### Figma → Code (gdy projektant zmienia tokeny w Figmie)

1. Eksportuj variables z Figma jako JSON
2. Porównaj z `tokens/tokens.json`
3. Ręcznie zaaplikuj zmiany do plików CSS
4. Zweryfikuj w Storybook

## Mapowanie

| CSS Variable | Figma Variable |
|---|---|
| `--ds-green-500` | `color/primitive/green/500` |
| `--ds-background` | `color/semantic/light/background` |
| `--ds-primary` | `color/semantic/light/primary` |
| `--ds-space-4` | `spacing/4` |
| `--ds-radius-xl` | `radius/xl` |
| `--ds-shadow-card` | `shadow/card` |
| `--ds-text-base` | `fontSize/base` |
| `--ds-text-xs` | `fontSize/xs` |

## Known Limitations

1. **Figma Variables API** (stan na 2025) — ograniczone wsparcie przez REST API. Tworzenie variables przez API może nie działać dla wszystkich kont. Skrypt `push-to-figma.py` generuje JSON do importu przez plugin.

2. **Brak dwukierunkowej synchronizacji** — obecnie proces jest manualny. W przyszłości można dodać GitHub Actions + Figma webhooks.

3. **Dark mode** — Figma variables wspierają tryby (light/dark). Tokeny w kodzie mają osobne bloki `:root` i `.dark`.

## Future Roadmap

1. **Figma Variables API stabilization** — Automatyczne tworzenie variables przez REST API
2. **Plugin import** — Narzędzie do importu `tokens.json` bezpośrednio do Figmy
3. **CI sync** — GitHub Action: zmiana w tokenach → PR → auto-update Figma
4. **Chromatic + Figma** — Visual regression testing z linkowaniem do komponentów Figma
