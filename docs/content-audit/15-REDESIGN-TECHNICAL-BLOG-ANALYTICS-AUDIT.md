# 15 — Audyt techniczny, SEO, użyteczności rysunku, bloga i analityki (`gotovalues.com`)

**Data:** 2026-11-27  
**Stan bazowy produkcji i repozytorium:** `main` @ `8cb79af` (`https://gotovalues.com/`)  
**Tryb:** `/gsd-explore` — wyłącznie analiza i rekomendacje (bez zmian w kodzie, bez commitów i bez deployu).

---

## 1. Deployment, cache, przekierowania, sitemap, canonical i metadane SEO (Punkt 1)

### Dlaczego zewnętrzny audyt otrzymał różne wersje strony głównej?

Weryfikacja na żywo wykazała **dwie niezależne przyczyny** (jedną historyczną i jedną realną usterkę techniczną, która nadal działa na produkcji):

1. **7 wdrożeń produkcyjnych w ciągu ~4 godzin (2026-11-27):** `402a241` → `da56a44` → `8df75f4` → `802b6cc` → `658f180` → `a865bbf` → `7f2baae` → `8cb79af`. W trakcie szybkich deployów różne węzły brzegowe Vercel (`x-vercel-cache: HIT`, `age: 1371`) chwilowo serwowały kolejne migawki strony głównej. Obecnie 3 kolejne zapytania na `https://gotovalues.com/` zwracają ten sam `ETag` (`W/"69485e8e6f6c868b298e69fc50f29309"`) i identyczny `H1`.
2. **REALNY BŁĄD #1 — `https://www.gotovalues.com/` zwraca `200 OK` zamiast przekierowania 308 na apex `https://gotovalues.com/`:**
   - Sprawdzenie live:
     - `https://gotovalues.com/` → `200 OK`, `x-vercel-cache: HIT`, `age: 1371`
     - `https://www.gotovalues.com/` → `200 OK`, `x-vercel-cache: PRERENDER`, `age: 0`
   - Mimo że oba warianty mają `<link rel="canonical" href="https://gotovalues.com">`, brak przekierowania `www → apex` na poziomie Vercel/Next sprawia, że **oba hosty mają osobny cache**. Zewnętrzny crawler odpytujący raz `www`, a raz domenę bez `www` tuż po wdrożeniu dostaje dwie różne wersje strony głównej.
   - **Rekomendacja P0:** wymusić stałe przekierowanie `308` z `www.gotovalues.com/*` → `https://gotovalues.com/*` w panelu domen Vercel (albo w `next.config.ts`).

### Pozostałe zweryfikowane błędy techniczne SEO (wykryte na żywo)

| Problem | Stan na produkcji (`8cb79af`) | Skutek dla SEO / audytu | Rekomendowana naprawa |
|---|---|---|---|
| **Pętla canonical ↔ 307 na `/jak-pracuje`** | `GET /jak-pracuje` zwraca **`307 Temporary Redirect`** → `/vs-freelancer-automatyzator`, a `/vs-freelancer-automatyzator` zwraca `200 OK` z **`canonical: https://gotovalues.com/jak-pracuje`**. Oba URL-e są jednocześnie w `sitemap.xml`! | Klasyczny konflikt indeksacji (canonical wskazuje na URL przekierowujący 307). Google może losowo ignorować canonical lub indeksować brzydki slug `/vs-freelancer-automatyzator`. | Przenieść docelową stronę bezpośrednio pod `src/app/jak-pracuje/page.tsx` (`200 OK`, self-canonical `/jak-pracuje`), ustawić trwałe `301/308` z `/vs-freelancer-automatyzator` → `/jak-pracuje` i usunąć stary slug z `sitemap.xml`. |
| **`sitemap.xml` zawiera pliki tekstowe AI i fałszywy `lastModified`** | W `src/app/sitemap.ts` figurują `/llms.txt`, `/ai.txt` i `/vs-freelancer-automatyzator`, a `lastModified: new Date()` zmienia datę przy każdym wywołaniu. | Roboty wyszukiwarek dostają niepotrzebne sygnały o rzekomej codziennej zmianie wszystkich stron i pliki non-HTML w mapie witryny. | Usunąć `/llms.txt`, `/ai.txt` i `/vs-freelancer-automatyzator` z `sitemap.ts`; użyć stałych, realnych dat modyfikacji. |
| **Brak nagłówka CSP na Vercel (`public/_headers` jest martwy)** | Plik `public/_headers` ma format Cloudflare Pages/Workers i jest **ignorowany przez Vercel** (`csp: false` w teście live na `https://gotovalues.com/`). Dodatkowo jego CSP nawet nie dopuszcza Microsoft Clarity. | Brak ochrony `Content-Security-Policy` i `X-Frame-Options` na produkcji, martwy plik mylący w repozytorium. | Przenieść nagłówki bezpieczeństwa do `headers()` w `next.config.ts` (z uwzględnieniem PostHog proxy, GA4 i Clarity) oraz usunąć `public/_headers`. |
| **Przekierowania usuniętych tras** | `/supportflow`, `/triageflow`, `/kalkulator-roi`, `/dla-produkcji`, `/dla-logistyki` zwracają `308 → /`. | Poprawne technicznie (brak 404). Jeśli powstaną nowe podstrony usługowe (Punkt 10), np. `/dla-produkcji` lub `/supportflow` można później przekierować na bardziej pasującą podstronę (np. `/automatyzacja`). | Zachować `308`, ewentualnie zaktualizować cele po decyzji o podstronach. |
| **Prywatność w SSR i JSON-LD** | Na `/`, `/jak-pracuje`, `/polityka-prywatnosci`, `/blog/*`, `/llms.txt`: zero nazwiska, zero surowego numeru telefonu; `/polityka-prywatnosci` ma `noindex, nofollow`. | Zgodne z decyzją właściciela o ochronie danych osobowych przed wyszukiwarkami. | **Uwaga krytyczna (wykryta live):** `https://cavi.gotova.pl/polityka-prywatnosci` nadal zawiera nazwisko właściciela w jawnym HTML (`hasSurname: true`) — kluczowe przed ewentualnym przywróceniem linku do `Cavi`! |

---

## 2. Ocena użyteczności stylistyki rysunku technicznego ISO 128 (Punkt 11)

Styl „The Working Drawing” (`DESIGN.md` — siatka stref `A–F / 1–4`, ramki z cienkich/grubych linii, kolor papieru `#FAF8F5`, grafit `#2A2623`, szałwia `#4E8B76`, interaktywny schemat SVG z tabelą rewizji `0 → A → B → C`) jest **największym wyróżnikiem wizualnym `gotovalues.com`**.

### Co działa świetnie (warto zachować)
- **Zero efektu „szablonu z generatora AI”:** strona od pierwszej sekundy wygląda jak przemyślany warsztat inżynierski, a nie kolejna ciemna strona agencji z fioletowymi gradientami.
- **Wysoka czytelność hierarchii i wysoki kontrast:** grube linie oddzielające arkusze (`DrawingSheet`, `PartsListSheet`, `AuthorSheet`, `NotesSheet`, `ContactSheet`) działają jak naturalne rozdziały.
- **Spójność z logotypem („Trasa do wartości”):** szałwiowa kropka końcowa na diagramie bezpośrednio nawiązuje do znaku `g` w logo.

### Realne problemy użyteczności (co warto poprawić przy ewentualnym redesignie)
1. **Sztywność pierwszego arkusza (`DrawingSheet`) na laptopach `1366×768` / `1280×800` i mobile:**
   - Lewa kolumna mieści duży diagram SVG + legendę + 4-wierszową tabelę rewizji `0/A/B/C`, a prawa kolumna: H1 + lede + listę 3 filarów + 2 CTA + tabelkę 4 metadanych.
   - Przy 4 filarach oferty (Punkt 3) prawa kolumna jeszcze bardziej urośnie w pionie i wypchnie CTA pod linię zgięcia na ekranach laptopowych.
2. **Niska odkrywalność interaktywności tabeli rewizji (`0/A/B/C`):**
   - Wielu odbiorców nietechnicznych (właściciel małej firmy, osoba prywatna szukająca pomocy z komputerem lub serwerem) traktuje schemat SVG jako statyczną ilustrację i nie klika wierszy `A/B/C`.
3. **Konflikt metafor dla klienta indywidualnego / wsparcia IT:**
   - Siatka stref `A–F / 1–4` i etykiety rysunkowe świetnie budują autorytet u klienta MŚP (automatyzacja, dane, aplikacje), ale dla klienta indywidualnego z problemem sprzętowym mogą sprawiać wrażenie „zbyt techniczne / tylko dla fabryk”.
   - Rozwiązanie: **zachować stylistykę rysunku technicznego jako tożsamość marki**, ale **uprościć prawą kolumnę Hero** (krótki opis wartości + 2 czytelne ścieżki wejścia zamiast powtarzania całej listy usług z Arkusza 2!) i usunąć zbędny techniczny żargon z etykiet (tak jak już słusznie usunięto „Opracował:” i „Uwagi:”).
4. **Powtórzenie zakresu między Arkuszem 1 a Arkuszem 2:**
   - Obecnie (po usunięciu górnego formularza w `8cb79af`) w `.gv-tb-scope` w Arkuszu 1 wyświetlane są dokładnie te same 3 tytuły i opisy filarów, które za chwilę powtarzają się słowo w słowo w tabeli w Arkuszu 2 (`PartsListSheet`)! To jest realne powtórzenie (Punkt 6), które warto zastąpić krótszym rozdzieleniem ścieżek odbiorcy (Firmy vs Osoby prywatne/IT).

---

## 3. Kompleksowy audyt wszystkich 17 wpisów na blogu (Punkt 12)

Przeanalizowałem wszystkie 17 artykułów w `src/content/blog.ts` (łącznie ok. **18 500 słów**, wszystkie opublikowane w jednym 15-dniowym pakiecie `2026-05-12` oraz `2026-06-01` – `2026-06-15`).

### Główne problemy wykryte na blogu

1. **Zero źródeł zewnętrznych (`0` linków źródłowych w 17/17 artykułach):**
   - Wpisy przytaczają dziesiątki konkretnych liczb i procentów (`40%`, `85%`, `65%`, `90%`, `41%`, `27%`, `18%`, `14%`, `50%`, `80%`, `100%`, `53 godziny`, `21 600 zł`, `1500 godzin`, `50 tys. zł`), ale nie podają ani jednego źródła, a część z nich nie ma oznaczenia, że to przykład kalkulacyjny.
2. **Niepotwierdzone deklaracje o wdrożeniach u klientów (ryzyko wiarygodności):**
   - Aż **8 wpisów** używa sformułowań sugerujących serię zrealizowanych projektów komercyjnych u klientów:
     - `[08] automatyzacja-obiegu-dokumentow`: **„Najlepsze wdrożenia, jakie prowadziłem”** oraz kalkulacja „400 faktur kosztowych → 53h → 13h” (wymaga jasnego rozdzielenia na przykład modelowy i usunięcia deklaracji „prowadziłem najlepsze wdrożenia”, jeśli nie jest udokumentowana).
     - `[10] zastosowania-ai-w-msp`: 5x deklaracje doświadczenia (`widziałem`, `u klientów`, `z mojego doświadczenia`).
     - `[11] ai-agenci-dla-biznesu-2026`: 4x (`u klientów`, `klienci`) + niekonsystentna liczba mnoga (`nasze`, `robimy`).
     - `[01]`, `[05]`, `[07]`, `[09]`, `[16]`: pojedyncze wzmianki `u klientów`, `z mojego doświadczenia`, `robimy`.
3. **Silna kanibalizacja tematyczna i powtórzenia (klastry tematyczne się nakładają):**
   - **Klaster AI (5 wpisów!):** `[03]`, `[09]`, `[10]`, `[11]`, `[17]` powtarzają niemal identyczny rdzeń (jak zacząć z AI, OCR faktur, nie zastępować człowieka chatbotem, policz godziny przed wdrożeniem).
   - **Klaster Dashboardy/Dane (3 wpisy):** `[04]`, `[05]`, `[06]` nakładają się na siebie w definicjach KPI vs metryk i błędów w raportowaniu.
   - **Klaster Aplikacje webowe (4 wpisy):** `[12]`, `[13]`, `[14]`, `[16]` powtarzają te same argumenty „gotowiec vs custom” oraz „kiedy Excel przestaje wystarczać”.
   - **Klaster Infrastruktura i wsparcie IT (0 wpisów!):** na blogu nie ma **ani jednego artykułu** o backupie, poczcie firmowej, NAS/serwerach, bezpieczeństwie kont ani wyborze sprzętu.
4. **Nadmierna kategoryczność i absoluty:**
   - W 14 z 17 artykułów pojawiają się kategoryczne słowa (`zawsze`, `nigdy`, `każda firma`, `każdy proces`, `natychmiast` — ponad 38 wystąpień).
5. **Niespójny opis strony `/blog`:**
   - Nagłówek w `src/app/blog/page.tsx` nadal mówi wyłącznie o *„aplikacjach, AI i procesach”* (*„kogoś, kto codziennie buduje narzędzia do porządkowania procesów”*) — bez danych/analityki i bez wsparcia IT.

### Matryca rekomendacji dla 17 artykułów bloga

| Nr | Slug | Słów | Główny problem | Rekomendacja |
|---|---|---|---|---|
| 01 | `automatyzacja-procesow-w-firmie-przewodnik` | 1656 | „u klientów”, 3 absoluty, powtarza tezy z 03/07 | **Zostawić jako filar (pillar)**, złagodzić absoluty i „u klientów” |
| 02 | `case-study-firma-produkcyjna-120h-automatyzacja` | 843 | Już przeredagowany jako scenariusz modelowy, ale URL nadal ma `case-study-` w slugu | **Zostawić** (już uczciwy) lub przenieść na slug bez `case-study` z 301 |
| 03 | `automatyzacja-procesow-z-ai-od-czego-zaczac` | 755 | Mocno pokrywa się z `[01]` i `[09]` | **Skonsolidować** z `[09]` (301) albo zawęzić do krótkiej checklisty startowej |
| 04 | `dashboardy-analityczne-dla-firm-przewodnik` | 1775 | 6 absolutów, nieuźródłowione „40%” | **Zostawić jako filar (Dane i analityka)**, usunąć nieuźródłowione liczby/absoluty |
| 05 | `dashboardy-analityczne-dla-produkcji` | 1164 | 7 procentów bez źródła (`85%`, `65%`...), „z mojego doświadczenia” | **Oznaczyć liczby jako przykładowe benchmarki** lub podać źródła |
| 06 | `kpi-dashboard-firma-jakie-dane-sledzic` | 1075 | 5 absolutów, nakłada się z `[04]` | **Zostawić** po oczyszczeniu z absolutów i wyraźnym rozróżnieniu od `[04]` |
| 07 | `workflow-automation-narzedzia-strategie` | 1015 | Najbardziej konkretny tekst techniczny; 1x „z mojego doświadczenia” | **Zostawić** — bardzo dobry artykuł ekspercki (drobny szlif) |
| 08 | `automatyzacja-obiegu-dokumentow` | 1131 | **PILNE:** „Najlepsze wdrożenia, jakie prowadziłem” + model 400 faktur | **Przeredagować framing** na jawny przykład obliczeniowy (tak jak `[02]`) |
| 09 | `ai-dla-firm-przewodnik-wdrozeniowy` | 1822 | „robimy”, „u klientów”, nakłada się z `[03]` i `[10]` | **Zostawić jako filar AI**, poprawić „my” → „ja” i usunąć „u klientów” |
| 10 | `zastosowania-ai-w-msp` | 1144 | 5x deklaracje o klientach, nakłada się z `[09]` | **Oczyścić** z niepotwierdzonych deklaracji albo połączyć z `[09]` |
| 11 | `ai-agenci-dla-biznesu-2026` | 1022 | „nasze/robimy”, 4x „u klientów”, data `2026` w slugu | **Oczyścić** (1. os. lp., bez „u klientów”, realizm ograniczeń agentów) |
| 12 | `aplikacje-webowe-dla-firm-przewodnik` | 1782 | 4 absoluty, 12 liczb/widełek bez źródła | **Zostawić jako filar (Aplikacje)**, wyraźnie oznaczyć widełki jako orientacyjne |
| 13 | `customowa-aplikacja-czy-gotowe-narzedzie` | 907 | „mamy”, nakłada się z `[12]` | **Zostawić** jako konkretne narzędzie decyzyjne (drobna korekta głosu) |
| 14 | `ile-kosztuje-aplikacja-webowa-dla-firmy` | 938 | Widełki bez zastrzeżenia rynkowego, `2026` w tytule | **Zostawić**, dodać zastrzeżenie o orientacyjnym charakterze rynkowym |
| 15 | `integracja-systemow-it-w-firmie` | 1447 | 5 absolutów (`natychmiast`, `nigdy`), 1x „klienci” | **Zostawić** — dobry artykuł pod filar Automatyzacja i integracje |
| 16 | `dedykowane-aplikacje-webowe-ai-excel` | 421 | Bardzo krótki (421 słów), w 100% duplikuje `[12]` i `[13]`, „1500 godzin” | **Kandydat do scalenia (301 → `[12]` lub `[13]`)** |
| 17 | `konsultant-ai-procesy-operacyjne-automatyzacja` | 337 | Bardzo krótki (337 słów), ogólny tekst pozycjonujący | **Kandydat do scalenia (301 → `[01]` lub `/jak-pracuje`)** |

---

## 4. Audyt analityki i pomiaru konwersji (Punkt 13)

### Stan faktyczny w kodzie (`src/components/`)

Na stronie zainstalowane są aż **trzy oddzielne systemy analityczne**, wszystkie bramkowane przez `subscribeAnalyticsConsent` z banera cookies:
1. **PostHog** (`posthog-provider.tsx`) — za first-party reverse proxy `/r9f3c0/*` (odporne na adblocki), włączone `capture_pageview`, `capture_pageleave`, `autocapture`, `person_profiles: "identified_only"`.
2. **Google Analytics 4** (`ga-provider.tsx`) — Consent Mode v2 (`analytics_storage: "granted"`, ad storage `denied`).
3. **Microsoft Clarity** (`clarity-provider.tsx`) — heatmapy i nagrania sesji.

### 4 kluczowe braki wykryte w audycie

1. **ZERO zdarzeń konwersji (`0` wywołań `posthog.capture`, `gtag("event")`, `clarity("event")` w całym `src/`):**
   - Nie mierzymy dzisiaj **ani jednego kluczowego zdarzenia biznesowego**:
     - wysłania formularza kontaktowego (`contact_form_submit_success` / `contact_form_submit_error`),
     - kliknięcia przycisku `PhoneReveal` (`phone_reveal_clicked`) oraz kliknięcia `tel:` (`phone_call_clicked`),
     - kliknięcia `OwnerReveal` (`owner_reveal_clicked`),
     - kliknięcia głównego CTA `Napisz wiadomość` (`hero_cta_clicked`),
     - przełączania rewizji `0/A/B/C` w rysunku SVG (`drawing_revision_selected`),
     - rozwinięcia pytania w FAQ (`faq_item_opened`),
     - kliknięcia mailto (`email_clicked`).
2. **Rozjazd w banerze cookies (ryzyko RODO / spójności):**
   - `src/components/cookie-consent.tsx` (linie 109–110) w rozwijanych szczegółach wymienia wyłącznie *„PostHog i Microsoft Clarity”*, **pomijając Google Analytics 4**, choć `GaProvider` uruchamia GA4 po tej samej zgodzie (na `/polityka-prywatnosci` GA4 jest wymienione poprawnie).
3. **Przeinwestowanie w 3 skrypty analityczne przy niskim ruchu:**
   - Trzy narzędzia jednocześnie (PostHog + GA4 + Clarity) zwiększają wagę JS po akceptacji cookies i rozpraszają dane. Dla jednoosobowej strony usługowej w pełni wystarcza **PostHog (zdarzenia + lejki za reverse proxy) + opcjonalnie Clarity (heatmapy)** albo **PostHog + GA4** (jeśli kiedyś planujesz Google Ads / raporty Search Console + GA4).
4. **Brak pomiaru konwersji po stronie serwera (`/api/contact`) niezależnego od zgody na cookies:**
   - Gdy użytkownik kliknie *„Tylko niezbędne”* w banerze cookies, żaden z 3 trackerów frontendowych się nie ładuje — więc statystyki frontendowe nie policzą nawet liczby wysłanych formularzy. Tymczasem sam fakt sukcesu `/api/contact` (bez danych osobowych, np. licznik + ścieżka źródłowa `referer`) daje 100% dokładny pomiar liczby zapytań.

### Rekomendowany minimalny plan zdarzeń (po zatwierdzeniu)

| Zdarzenie | Gdzie wywołać | Parametry (bez PII!) | Po co? |
|---|---|---|---|
| `cta_clicked` | Hero CTA, nawigacja, podstrony | `location`, `target`, `audience_path` | Sprawdzenie, która ścieżka (firmy vs IT/indywidualni) przyciąga kliknięcia. |
| `drawing_revision_selected` | `ProcessDrawing` | `revision_id` (`0`/`A`/`B`/`C`) | Weryfikacja, czy użytkownicy w ogóle wchodzą w interakcję z rysunkiem ISO. |
| `contact_form_submitted` | `ContactForm` | `route`, `status` (`success`/`error`) | Główna konwersja (z rozbiciem na podstronę źródłową). |
| `phone_revealed` | `PhoneReveal` | `route` | Druga najważniejsza konwersja (intencja kontaktu telefonicznego). |
| `owner_revealed` | `OwnerReveal` | `route`, `variant` | Sprawdzenie, jak często odwiedzający potrzebują zweryfikować tożsamość przed kontaktem. |
| `faq_expanded` | `NotesSheet` | `question_index` | Weryfikacja, które obiekcje realnie interesują klientów. |
