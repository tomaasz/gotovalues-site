# Figma Design System — One-Shot Setup

## Krok 1: Otwórz Figma i utwórz pliki (2 min)

1. Otwórz https://www.figma.com/
2. W Drafts (albo w teamie) kliknij **+ Design file**
3. Nazwij plik: `🎨 Design Tokens`
4. Powtórz — utwórz drugi plik: `🧩 UI Components`

## Krok 2: Wgraj kolory przez Variables (5 min)

W pliku `🎨 Design Tokens`:

1. Otwórz prawy panel → **Local variables** (albo kliknij ikonę `◐`)
2. Kliknij **+ Create variable** → **Color**
3. Nazwa: `primitive/green/50`, wartość: `#f0f8f5`
4. Powtórz dla wszystkich 46 kolorów z poniższej listy

### Kolory do wpisania (skopiuj z pliku `figma-variables-import.json`)

Alternatywnie: skopiuj wartości z pliku JSON:

```bash
cat packages/design-system/figma/figma-variables-import.json | python3 -c "
import json,sys
d=json.load(sys.stdin)
for v in d['variables']:
    print(f\"{v['collection']}/{v['name']}: {v['hex']}\")
"
```

## Krok 3: Wgraj Text Styles (2 min)

W pliku `🎨 Design Tokens`:

1. Zaznacz tekst → prawy panel → **Text** → kliknij ikonę **Style** (4 kropki) → **+**
2. Utwórz 10 styli:

| Nazwa | Font | Weight | Size | Line |
|---|---|---|---|---|
| `display/hero` | Fraunces | 600 | 80 | 92% |
| `heading/h1` | Fraunces | 600 | 48 | 98% |
| `heading/h2` | Fraunces | 600 | 36 | 98% |
| `heading/h3` | Fraunces | 600 | 24 | 98% |
| `body/large` | Manrope | 400 | 18 | 150% |
| `body/default` | Manrope | 400 | 16 | 150% |
| `body/small` | Manrope | 400 | 14 | 150% |
| `ui/label` | Manrope | 700 | 13 | 130% |
| `ui/eyebrow` | Manrope | 700 | 13 | 130% |
| `ui/caption` | Manrope | 400 | 12 | 150% |

## Krok 4: Wgraj Spacing i Radius Variables (2 min)

W Variables panel, dodaj **Number** variables:

**Spacing**: 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80, 96 (px)

**Radius**: 4, 8, 12, 16, 24, 32, 999

## Krok 5: Zbuduj komponenty (10 min)

W pliku `🧩 UI Components`, utwórz komponenty wg specyfikacji z `figma-components-spec.json`.

### Priorytetowe komponenty:

1. **Button** — 6 wariantów × 4 rozmiary
   - Użyj `color/semantic/light/primary` do tła
   - Użyj `radius/full` do border-radius
   - Dodaj Auto Layout (horizontal, gap 8, padding 16)

2. **Input** — 4 stany
   - Użyj `color/semantic/light/border` do obramowania
   - Użyj `radius/md`
   - Height: 40px, padding: 8px 12px

3. **Card** — z slotami
   - Użyj `color/semantic/light/card`
   - Użyj `radius/xl` (16px)
   - Padding: 24px

4. **Badge**
5. **Dialog/Modal**
6. **Select**
7. **Checkbox**

## Krok 6: Opublikuj jako Library (1 min)

1. W pliku `🎨 Design Tokens`: kliknij **↓** obok nazwy → **Publish library**
2. W pliku `🧩 UI Components`: to samo
3. W obu projektach (cavi, gotovalues): Assets → **Enable library**

---

## Import przez Plugin (alternatywnie)

Jeśli wolisz automatyczny import:

1. W Figma → Community → wyszukaj "Design Tokens" lub "Variables Import"
2. Zainstaluj plugin wspierający import JSON (np. "Design Tokens", "JSON to Figma")
3. Zaimportuj plik `packages/design-system/figma/figma-variables-import.json`

---

## Komendy pomocnicze

```bash
# Podgląd wszystkich kolorów z hex
cat packages/design-system/figma/figma-variables-import.json | python3 -c "
import json,sys
d=json.load(sys.stdin)
for v in d['variables']:
    print(f'{v[\"hex\"]}  {v[\"collection\"]}/{v[\"name\"]:30s} {v.get(\"description\",\"\")}')
"

# Podgląd text styles
cat packages/design-system/figma/figma-text-styles.json | python3 -c "
import json,sys
d=json.load(sys.stdin)
for s in d['styles']:
    print(f'{s[\"family\"]} {s[\"weight\"]} {s[\"size\"]}px  {s[\"name\"]}')
"

# Wygeneruj świeże pliki (po zmianie tokenów)
cd packages/design-system/figma/scripts
python3 generate-figma-package.py
```
