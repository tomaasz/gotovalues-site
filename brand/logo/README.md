# gotovalues — logo „Trasa do wartości”

Zatwierdzony kierunek: **A — Trasa do wartości** (2026-10-04).
Logotyp sam w sobie jest znakiem. Ogonek litery **g** to trasa procesu: zakręca pod kątem prostym i kończy się
**przystankiem**, czyli szałwiową kropką oznaczającą dowiezioną wartość. Litery zbudowano geometrycznie z kół,
prostych i jednego promienia zakrętu. To czyste kontury SVG, bez fontu i bez obrysów.

Zaprojektowane skillem [`kaankiziltug/logo-design-skill`](https://github.com/kaankiziltug/logo-design-skill)
(brief → koncepty → testy → zestaw).

## Pliki

| Plik | Do czego |
|---|---|
| `masters/gotovalues-logo-tight.svg` | **Logo główne.** Atrament + szałwiowa kropka, na jasnym tle. W serwisie jako `public/brand/gotovalues-logo.svg` |
| `masters/gotovalues-logo-reversed-tight.svg` | Na ciemnym tle: papierowe litery, odchudzone o ok. 7% (kompensacja irradiacji) |
| `masters/gotovalues-logo.svg` / `-reversed.svg` | To samo na kanwie o wysokości 256 (z marginesem) |
| `masters/gotovalues-symbol.svg` | Sam znak „g” (awatar, social media, ikony od 48 px) |
| `masters/gotovalues-symbol-small.svg` | **Wersja do małych rozmiarów (≤ 32 px):** grubsza kreska, większe światło i kropka |
| `masters/gotovalues-symbol-*-reversed.svg` | Znaki na ciemne tło |
| `variants/` | Wersje jednokolorowe (czarna, biała, szałwiowa), PNG 1200 px, kwadrat, kafelki ikon aplikacji |
| `presentation/slide-0*.png` | Prezentacja: brief, koncept, makiety (wizytówki, strona, szyld, profil, identyfikator, ikona) |
| `source/` | Generator (`gen.py`, `kit.py`) → `build-kit.sh` (obrys przez picosvg i scalenie konturów) oraz szablon OG |

Ikony serwisu leżą w `public/favicon/`: `favicon.ico` (16/32/48), `favicon.svg` (sam przełącza się na jasne
litery w ciemnym motywie przeglądarki), `apple-touch-icon.png`, `icon-192/512.png`, `maskable-512.png`
i `site.webmanifest`.

## Kolory

| Rola | HEX | RGB | Token |
|---|---|---|---|
| Atrament (litery) | `#2A2623` | 42 38 35 | `--ds-foreground` |
| Szałwia (przystanek) | `#4E8B76` | 78 139 118 | `--ds-primary` |
| Papier (tło / litery odwrócone) | `#FAF8F5` | 250 248 245 | `--ds-background` |

Kontrast: atrament na papierze ok. 14:1, szałwia na papierze ok. 3,75:1 (wystarczy dla grafiki, minimum to 3:1),
szałwia na atramencie ok. 3,8:1.
Odpowiedniki CMYK i Pantone trzeba dobrać na próbniku drukarni przed pierwszym drukiem.

Dozwolone wersje: pełnokolorowa (atrament + szałwia), jednokolorowa atramentowa lub czarna, jednokolorowa biała
na ciemnym tle, jednokolorowa szałwiowa. **Kropka zawsze ma kolor szałwii albo kolor reszty znaku**, nigdy inny.

## Pole ochronne i minimalne rozmiary

- **Pole ochronne:** wokół logo zostaw wolną przestrzeń równą średnicy kropki-przystanku × 1,5
  (w przybliżeniu połowa wysokości małych liter).
- **Logo:** minimum **96 px** szerokości na ekranie (nagłówek strony: 30 px wysokości ≈ 148 px) i **25 mm** w druku.
- **Znak:** od 48 px `gotovalues-symbol.svg`, poniżej 48 px (aż do 16 px) `gotovalues-symbol-small.svg`.

## Czego nie robić

- Nie przerysowuj liter fontem (Manrope, Fraunces ani żadnym innym). Używaj tylko plików z `masters/`.
- Nie zmieniaj proporcji, nie pochylaj i nie obracaj logo. Nie dodawaj cieni, gradientów ani obrysów.
- Nie zmieniaj koloru kropki na inny niż szałwia albo kolor liter. Nie usuwaj kropki.
- Nie oddzielaj trasy od litery i nie dokładaj kolejnych przystanków w logo. Motyw trasy z przystankiem
  może być rozwijany w ikonach i ilustracjach, ale osobno.
- Nie kładź pełnokolorowej wersji na zdjęciach ani na średnich szarościach bez kontrastu. Użyj wtedy wersji
  jednokolorowej.
- Nazwa w tekście zawsze małymi literami: **gotovalues**.

## Regeneracja

```bash
cd brand/logo/source && ./build-kit.sh   # wynik w build/masters/ (wymaga uv / uvx)
```

Warianty i ikony web zostały wyeksportowane skryptem `export_variants.py` ze skilla logo-design.

## Zastrzeżenia

Wyszukiwanie znaków towarowych nie zostało wykonane. Przed rejestracją znaku zlec badanie w EUIPO/UPRP oraz
wyszukiwanie obrazem.
