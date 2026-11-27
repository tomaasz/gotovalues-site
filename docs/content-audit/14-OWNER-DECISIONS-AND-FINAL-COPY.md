# 14 — Decyzje właściciela i finalne teksty gotowe do wdrożenia (`gotovalues.com`)

**Data:** 2026-11-27  
**Status:** Zatwierdzone decyzje strategiczne właściciela — finalne copy do krótkiego „OK” przed wdrożeniem w kodzie.

---

## 1. Zatwierdzone decyzje właściciela (kontrakt wdrożeniowy)

1. **Kierunek:** **Wariant A — wersja zdalna i planowana** (dwa tory łączone równolegle z pracą na etacie):
   - **Tor 1 (główny):** Procesy, dane, automatyzacja i dedykowane narzędzia/aplikacje webowe (planowane etapy, zdalnie w całej Polsce).
   - **Tor 2 (wspierający):** Planowane uporządkowanie IT i zdalne wsparcie dla małych firm oraz JDG (poczta, kopie zapasowe, konfiguracja narzędzi i stanowisk zdalnie).
   - **Twarda granica operacyjna:** **brak obietnicy dojazdów, serwisu fizycznego na miejscu, dyżurów 24/7 i interwencji „od ręki”**. Lokalizacja **Zabrodzie, powiat wyszkowski** pojawia się wyłącznie jako rzeczowa informacja o miejscu działania (kontakt / zaufanie / Schema.org).
2. **Warstwa dowodowa:** zostajemy przy **braku przykładów wdrożeń** (`Cavi` i `Akta` pozostają bez publicznych kart i linków) — zaufanie budujemy przez przejrzystą metodę pracy, konkret i bezpośrednią rozmowę.
3. **Architektura tras — uproszczenie i porządek:**
   - **Usuwamy 5 starych podstron oferty:** `/supportflow`, `/triageflow`, `/kalkulator-roi`, `/dla-produkcji`, `/dla-logistyki` — z czystymi przekierowaniami **301 na `/`** w `next.config.*` (żeby nie tworzyć 404 w Google ani z zewnętrznych linków).
   - **Zostają wyłącznie:** `/` (strona główna), `/jak-pracuje` (docelowo spójna strona metody), `/blog` + artykuły, `/polityka-prywatnosci` oraz techniczne endpointy (`/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/ai/*`, `/feed.xml`).
   - Usuwamy odwołania do usuniętych tras ze stopki, `sitemap.ts`, `/llms.txt`, `/ai/*` oraz z linków wewnętrznych w `src/content/blog.ts`.
4. **Artykuł `~120h` na blogu:** przeredagowujemy `case-study-firma-produkcyjna-120h-automatyzacja` z udawanego case study na **jawny scenariusz modelowy / przykład obliczeniowy** (zmiana tytułu, opisu meta i wstępu; zachowanie adresu lub przekierowanie 301, jeśli zmienimy slug).
5. **Sekcja „O mnie” i obietnice operacyjne:**
   - **Krótkie „O mnie”** — bez ujawniania szczegółów dotyczących leasingu i wyceny maszyn.
   - **Zero absolutów i niepotwierdzonych obietnic:** wyrzucamy *„w 24h”*, *„od ręki”*, *„zawsze”*, *„bez ukrytych kosztów”*, *„niskie koszty utrzymania”*, *„NDA przed rozmową”* — zastępujemy spokojnymi, prawdziwymi deklaracjami (*„odpowiadam w dni robocze”*, *„zakres, wycenę, zasady poufności i własności ustalamy przed startem”*).

---

## 2. Finalne teksty strony głównej `/` (odchudzone pod `DESIGN.md` i uwagi Agenta 5)

### Metadane SEO (`src/app/layout.tsx`)
- **`<title>`:** `gotovalues — procesy, dane, aplikacje i zdalne IT dla firm`
- **`meta description`:** `Porządkuję powtarzalną pracę, dane i narzędzia IT w małych firmach i MŚP. Automatyzacja procesów, lekkie aplikacje webowe i zdalne wsparcie IT — planowo i etapami.`

### Nawigacja i stopka
- **Nawigacja (maks. 4 pozycje):** `Zakres` (`#oferta`) · `Jak pracuję` (`/jak-pracuje`) · `Blog` (`/blog`) · `Kontakt` (`#kontakt`)
- **Stopka:** wyłącznie spójne linki (`Zakres`, `Jak pracuję`, `Blog`, `Kontakt`, `Polityka prywatności`) — zero `SupportFlow`, `TriageFlow` i `Kalkulatora ROI`.

---

### Arkusz 1 — `DrawingSheet` (Hero + rysunek + szybki formularz)
- **Eyebrow:** `Zdalnie dla firm i JDG · Polska`
- **H1 (maks. 2 wiersze desktop):** `Porządkuję procesy, dane i IT w małej firmie.`
- **Krótki podtytuł (1–2 krótkie wiersze):** `Łączę narzędzia, buduję proste aplikacje i pomagam zdalnie uporządkować firmowe IT — w jasno ustalonych etapach.`
- **Tabela rewizji na rysunku (zwięzła, 1 linia na krok):**
  - `0` — `Stan obecny`: Dane w kilku miejscach, ręczne przepisywanie albo nieuporządkowane narzędzia IT.
  - `A` — `Uporządkowanie`: Sprawna poczta, kopie zapasowe, uprawnienia i konfiguracja tego, co już masz.
  - `B` — `Integracje i dane`: Połączone arkusze, poczta i systemy oraz jeden czytelny widok danych.
  - `C` — `Narzędzia i AI`: Dedykowana aplikacja albo automatyzacja dla jednego, konkretnego procesu.
- **Szybki formularz (TitleBlockForm):**
  - **Placeholder wiadomości:** `Opisz krótko, co dziś blokuje pracę lub zajmuje za dużo czasu.`
  - **Przycisk CTA:** `Wyślij wiadomość`
  - **Komunikat po wysłaniu:** `Dziękuję. Przeczytam opis i wrócę z odpowiedzią w dni robocze.`

---

### Arkusz 2 — `PartsListSheet` (3 filary oferty)

1. **Procesy, dane i automatyzacja**
   - *Opis:* Łączę dane z poczty, arkuszy i programów, żeby zespół nie przepisywał tych samych informacji ręcznie.
   - *Punkty:*
     - integracje między pocztą, arkuszami, CRM i bazami danych,
     - porządkowanie danych i czytelne raporty do codziennych decyzji,
     - praktyczne wykorzystanie AI tam, gdzie realnie skraca powtarzalną pracę.

2. **Dedykowane narzędzia i aplikacje**
   - *Opis:* Gdy gotowe programy nie pasują do sposobu pracy firmy, buduję lekkie narzędzie webowe pod konkretny proces.
   - *Punkty:*
     - wewnętrzne panele, formularze, obiegi dokumentów i proste aplikacje webowe,
     - przejrzyste strony firmowe dopasowane do realnej oferty,
     - kod, konta i dokumentacja przekazywane firmie na jasnych zasadach.

3. **Uporządkowanie IT i zdalne wsparcie**
   - *Opis:* Pomagam małym firmom i JDG uporządkować podstawy IT oraz rozwiązuję bieżące sprawy techniczne zdalnie.
   - *Punkty:*
     - poczta we własnej domenie, Microsoft 365 i Google Workspace,
     - automatyczne kopie zapasowe, porządek w hasłach i uprawnieniach,
     - zdalna konfiguracja stanowisk, programów i planowane wsparcie techniczne.

---

### Arkusz 3 — `AuthorSheet` (Krótkie „O mnie” + zasady pracy)

- **Nagłówek:** `Tomasz Gołaszewski. Jeden kontakt od diagnozy po wdrożenie.`
- **Krótki akapit (bez szczegółów o leasingu/wycenie maszyn):**
  `Pracuję bezpośrednio z właścicielami małych firm i MŚP. Najpierw sprawdzam, gdzie dokładnie powstaje problem — a potem dobieram najprostsze rozwiązanie: od konfiguracji gotowych narzędzi i zdalnego wsparcia IT, przez integracje danych, po lekką aplikację webową.`
- **3 konkretne fakty:**
  - `Obszar pracy`: `automatyzacja procesów, analiza danych, aplikacje webowe (TypeScript/Next.js, Python, SQL) i zdalne wsparcie IT.`
  - `Model współpracy`: `planowane, małe etapy z jasnym zakresem przed startem — bezpośrednio ze mną, bez pośredników.`
  - `Lokalizacja`: `działam zdalnie w całej Polsce (siedziba: Zabrodzie, powiat wyszkowski).`
- **4 krótkie zasady pracy (zamiast 5 rozbudowanych):**
  1. **Najpierw problem, potem narzędzie** — jeśli wystarczy konfiguracja tego, co już masz, nie proponuję pisania aplikacji od zera.
  2. **Małe, zamknięte etapy** — zaczynamy od jednego konkretnego usprawnienia z ustalonym zakresem i wyceną z góry.
  3. **Bezpośredni kontakt** — rozmawiasz ze mną od pierwszego maila do odbioru prac, w prostym języku i bez żargonu.
  4. **Jasne zasady po stronie firmy** — konta, dostępy, poufność i prawa do rozwiązań ustalamy wprost przed startem.

---

### Arkusz 4 — `NotesSheet` (5 zwięzłych, uczciwych FAQ)

1. **Czy pracujesz zdalnie, czy przyjeżdżasz na miejsce?**
   `Pracuję wyłącznie zdalnie na terenie całej Polski — od wsparcia technicznego i konfiguracji narzędzi po integracje oraz budowę aplikacji. Nie prowadzę serwisu z dojazdem ani dyżurów awaryjnych 24/7; wszystkie zadania planujemy wcześniej na konkretny termin.`
2. **Czy muszę podpisywać stałą umowę abonamentową?**
   `Nie. Możemy zacząć od jednego konkretnego zlecenia — na przykład uporządkowania poczty i kopii zapasowych, integracji arkuszy albo małego narzędzia. Dalszą współpracę ustalamy dopiero wtedy, gdy ma to sens.`
3. **Jak wygląda wycena i rozliczenie?**
   `Po krótkim opisie problemu przygotowuję propozycję zakresu i wycenę przed startem — za zamknięty etap albo rozliczenie godzinowe przy doraźnych pracach zdalnych. Rozliczamy się na fakturę.`
4. **Nie znam się na sprawach technicznych — jak mam opisać problem?**
   `Wystarczy kilka zdań zwykłym językiem: co zajmuje za dużo czasu, co sprawia problem albo jaki efekt chcesz osiągnąć. Dopytam o potrzebne szczegóły i przedstawię opcje po ludzku.`
5. **Kto ma dostęp do kont, danych i kodu po zakończeniu prac?**
   `Konta, domeny, dostępy oraz zasady poufności i praw do stworzonego rozwiązania ustalamy wprost przed rozpoczęciem prac — tak, żeby firma zachowała kontrolę nad swoimi danymi i narzędziami.`

---

### Arkusz 5 — `ContactSheet` (Kontakt)
- **Wstęp:** `Napisz krótko, jaki proces chcesz usprawnić albo co w firmowym IT wymaga zdalnego uporządkowania. Jeśli temat wykracza poza mój zakres, powiem to wprost na początku.`
- **Placeholder formularza (neutralny, spójny na całej stronie):** `Opisz krótko problem lub proces, który chcesz uporządkować — np. ręczne przepisywanie danych, raporty, narzędzie webowe albo zdalna konfiguracja poczty i kopii zapasowych.`
- **Sygnały kontaktowe:**
  - `E-mail`: `kontakt@gotovalues.com`
  - `Telefon`: przycisk `PhoneReveal` (zabezpieczony przed botami — bez zmian mechanizmu)
  - `Odpowiedź`: `Odpowiadam w dni robocze.`
  - `Tryb pracy`: `Zdalnie w całej Polsce (Zabrodzie, powiat wyszkowski).`

---

## 3. Pozostałe zmiany w pakiecie wdrożeniowym

1. **`/jak-pracuje` (`/vs-freelancer-automatyzator`):**
   - Nowy `<title>`: `Jak pracuję — od procesu do rozwiązania` (z szablonem layoutu da `... | gotovalues`, bez duplikatu i anglicyzmu `web apps`).
   - Odświeżenie opisu pod Wariant A-zdalny (przebieg: opis problemu → sprawdzenie danych i narzędzi → mały etap z wyceną → wdrożenie i przekazanie; kiedy odradzam budowę aplikacji).
   - Neutralny, dopasowany placeholder w `ContactForm`.
2. **Usunięcie 5 podstron + 301 redirects w `next.config.*`:**
   - Usunięcie katalogów `src/app/supportflow`, `src/app/triageflow`, `src/app/kalkulator-roi`, `src/app/dla-produkcji`, `src/app/dla-logistyki` oraz martwych pól z `src/content/site.ts`.
   - Dodanie stałych przekierowań 301 (`permanent: true`) z tych 5 ścieżek na `/` (oraz usunięcie ich z `src/app/sitemap.ts`, stopki, `llms.txt` i `/ai/*`).
   - Oczyszczenie linków wewnętrznych w `src/content/blog.ts` prowadzących do usuniętych stron (zastąpienie naturalnym tekstem albo linkiem do `/#kontakt` / `/jak-pracuje`).
3. **Artykuł `~120h` w `src/content/blog.ts`:**
   - Zmiana tytułu i opisu z *„Jak firma produkcyjna zaoszczędziła ~120h...” / „Case study:”* na jawny przykład obliczeniowy: *„Ile godzin może zaoszczędzić automatyzacja w firmie produkcyjnej? Scenariusz modelowy (~120 h/mc)”* oraz wyraźna nota metodologiczna we wstępie, że liczby są modelem kalkulacyjnym, a nie raportem z konkretnego klienta.
4. **Testy i dokumentacja wewnętrzna:**
   - Aktualizacja wszystkich dotkniętych testów w `tests/` (w tym zachowanie pełnego testu regresji `tests/phone-reveal.test.tsx`), `pnpm lint`, `pnpm build` oraz synchronizacja `PRODUCT.md`, `process/context.md`, `AGENTS.md`, `GEMINI.md` i `.planning/PROJECT.md`.
