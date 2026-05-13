# Figma Design System — Import Guide

## Overview

Ten folder zawiera materiały do odtworzenia design systemu w Figmie.
Ponieważ w Figmie nie ma jeszcze struktury, proces składa się z trzech głównych kroków:

1. **Utwórz strukturę plików** w Figmie (zespół/projekt/biblioteka)
2. **Zaimportuj tokeny** (kolory, typografia, spacing, itp.)
3. **Zbuduj podstawowe komponenty** na bazie tokenów

---

## Krok 1: Struktura w Figmie

### 1.1 Utwórz Team (jeśli nie istnieje)
- Figma → Create team → nazwa: "gotovalues/cavi"

### 1.2 Utwórz Project
- W teamie → New project → "Design System"

### 1.3 Utwórz pliki Figma
Utwórz następujące pliki w projekcie "Design System":

| Plik | Zawartość |
|---|---|
| `🎨 Design Tokens` | Kolory, typografia, spacing, shadows — **źródło prawdy** |
| `🧩 UI Components` | Button, Input, Card, Badge, Dialog, Select, Checkbox... |
| `📄 Page Templates` | Przykładowe strony /cavi i /gotovalues |

### 1.4 Publish as Library
- Zaznacz `🎨 Design Tokens` → "Publish as library"
- Zaznacz `🧩 UI Components` → "Publish as library"
- W obu projektach: Assets → enable library

---

## Krok 2: Import Tokenów (Variables)

### Opcja A: Ręcznie przez Figma UI (zalecane na start)

#### Kolory
W pliku `🎨 Design Tokens`:
1. Otwórz panel **Variables** (ikona `◐` po lewej lub prawy panel)
2. Dla każdej grupy kolorów utwórz collection:
   - Collection: `color/primitive/green` — values z tabeli poniżej
   - Collection: `color/primitive/warm`
   - Collection: `color/primitive/gray`
   - Collection: `color/semantic/light`
   - Collection: `color/semantic/dark`

#### Primitive palette — Green

```
green/50:   hsl(162, 40%, 96%)  →
green/100:  hsl(162, 38%, 90%)
green/200:  hsl(162, 35%, 80%)
green/300:  hsl(162, 32%, 65%)
green/400:  hsl(162, 30%, 50%)
green/500:  hsl(162, 30%, 42%)
green/600:  hsl(162, 32%, 35%)
green/700:  hsl(162, 34%, 28%)
green/800:  hsl(162, 35%, 20%)
green/900:  hsl(162, 38%, 14%)
```

#### Primitive palette — Warm

```
warm/50:   hsl(42, 26%, 97%)   →
warm/100:  hsl(42, 26%, 94%)
warm/200:  hsl(40, 20%, 88%)
warm/300:  hsl(38, 16%, 82%)
warm/400:  hsl(36, 14%, 72%)
warm/500:  hsl(34, 12%, 60%)
warm/600:  hsl(32, 10%, 45%)
warm/700:  hsl(30, 10%, 32%)
warm/800:  hsl(30, 10%, 20%)
warm/900:  hsl(30, 10%, 12%)
```

#### Semantic colors (Light theme)

```
background:        hsl(42, 26%, 96%)    →  cream tło
foreground:        hsl(30, 10%, 15%)    →  tekst główny
card:              hsl(0, 0%, 100%)     →  karty
card-foreground:   hsl(30, 10%, 15%)
primary:           hsl(162, 28%, 38%)   →  akcent #4E8B76
primary-foreground: hsl(0, 0%, 100%)
secondary:         hsl(42, 14%, 89%)
secondary-foreground: hsl(30, 10%, 20%)
muted:             hsl(38, 12%, 91%)
muted-foreground:  hsl(30, 8%, 38%)     →  4.5:1 contrast
accent:            hsl(162, 28%, 38%)
destructive:       hsl(0, 72%, 51%)
border:            hsl(35, 15%, 82%)
input:             hsl(35, 15%, 82%)
ring:              hsl(162, 28%, 38%)
```

#### Typography Variables

W Variables panel:
1. Collection: `typography`
2. Dodaj number variables:

```
fontSize/xs:    12
fontSize/sm:    14
fontSize/base:  16
fontSize/lg:    18
fontSize/xl:    20
fontSize/2xl:   24
fontSize/3xl:   30
fontSize/4xl:   36
fontSize/5xl:   48
fontSize/6xl:   60
fontSize/7xl:   72
```

#### Spacing Variables

```
spacing/0:   0
spacing/px:  1
spacing/0.5: 2
spacing/1:   4
spacing/2:   8
spacing/3:   12
spacing/4:   16
spacing/5:   20
spacing/6:   24
spacing/8:   32
spacing/10:  40
spacing/12:  48
spacing/14:  56
spacing/16:  64
spacing/20:  80
spacing/24:  96
```

#### Radius Variables

```
radius/sm:   4
radius/md:   8
radius/lg:   12
radius/xl:   16
radius/2xl:  24
radius/3xl:  32
radius/full: 999
```

### Opcja B: Przez Figma API (półautomatycznie)

W folderze `scripts/` znajduje się skrypt `push-to-figma.py`, który może
utworzyć variables w Figmie przez REST API. Wymaga:

1. Figma Personal Access Token (PAT) w zmiennej `FIGMA_PAT`
2. Figma File Key (z URL pliku `🎨 Design Tokens`)
3. Python 3 z `requests`

Uruchomienie:
```bash
cd packages/design-system/figma
export FIGMA_PAT="figd_xxxx..."
python3 scripts/push-to-figma.py --file-key YOUR_FILE_KEY
```

---

## Krok 3: Text Styles

W pliku `🎨 Design Tokens`, utwórz **Text Styles**:

| Style | Font | Weight | Size | Line | Usage |
|---|---|---|---|---|---|
| `display/hero` | Fraunces (GV) / Jura (cavi) | 600 | 80px | 0.92 | Hero heading |
| `heading/h1` | project-specific | 600 | 48px | 0.98 | Page title |
| `heading/h2` | project-specific | 600 | 36px | 0.98 | Section heading |
| `heading/h3` | project-specific | 600 | 24px | 0.98 | Subsection |
| `body/large` | Inter/Manrope | 400 | 18px | 1.5 | Lede/intro |
| `body/default` | Inter/Manrope | 400 | 16px | 1.5 | Body text |
| `body/small` | Inter/Manrope | 400 | 14px | 1.5 | Secondary text |
| `ui/label` | Inter/Manrope | 700 | 13px | 1.3 | Form labels |
| `ui/eyebrow` | Inter/Manrope | 700 | 13px | 1.3 | Section eyebrow |
| `ui/caption` | Inter/Manrope | 400 | 12px | 1.5 | Captions |

**Uwaga**: Font family jest specyficzne dla projektu:
- **cavi**: heading = Jura, body = Inter
- **gotovalues**: display = Fraunces, body = Manrope

---

## Krok 4: Komponenty Figma

W pliku `🧩 UI Components` utwórz komponenty z wariantami:

### Button
- **Variants**: variant (primary, secondary, outline, destructive, ghost, link)
- **Sizes**: sm (36px), md (40px), lg (44px)
- **States**: default, hover, focus, disabled, loading
- **Icons**: leading, trailing, icon-only
- **Radius**: 9999px (pill)

### Input
- **States**: default, focus, disabled, error, with-label
- **Types**: text, email, password, number, date
- **Icons**: leading icon support

### Card
- **Variants**: default, interactive (hover lift), glass
- **Subcomponents**: Header, Title, Description, Content, Footer
- **Radius**: 16px (xl)

### Badge
- **Variants**: default, secondary, destructive, outline
- **Sizes**: default, sm

### Dialog/Modal
- **Sizes**: default (512px), sm (384px), lg (640px)
- **Content slots**: header, body, footer

### Select
- **States**: default, open, disabled
- **Items**: with groups/labels

### Checkbox
- **States**: unchecked, checked, indeterminate, disabled

---

## Krok 5: Mapowanie Code ↔ Figma

| CSS Variable | Figma Variable |
|---|---|
| `--ds-background` | `color/semantic/light/background` |
| `--ds-primary` | `color/semantic/light/primary` |
| `--ds-card` | `color/semantic/light/card` |
| `--ds-space-4` | `spacing/4` |
| `--ds-radius-xl` | `radius/xl` |
| `--ds-shadow-card` | `shadow/card` |
| `--ds-text-base` | `fontSize/base` |

## Krok 6: Utrzymanie synchronizacji

### Zasada
Design tokens w `packages/design-system/tokens/` są **źródłem prawdy**.
Figma variables są **odbiciem** tych tokenów.

### Proces aktualizacji
1. Zmień token w kodzie (`tokens/colors.css` lub `tokens/spacing.css`)
2. Zaktualizuj odpowiadającą wartość w Figmie
3. Zaktualizuj `tokens/tokens.json`
4. Sprawdź w Storybook, czy zmiana jest widoczna

### W przyszłości
Gdy Figma Variables API będzie stabilne i wspierane, można zautomatyzować
dwukierunkową synchronizację przez GitHub Actions + Figma webhooks.
