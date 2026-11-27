# 19 — Podsumowanie wykonawcze redesignu i lista decyzji właściciela (`gotovalues.com`)

**Data:** 2026-11-27  
**Stan bazowy produkcji:** `main` @ `8cb79af`  
**Status:** **STOP NA ETAPIE DECYZJI WŁAŚCICIELA** — brak jakichkolwiek zmian w kodzie produkcyjnym, brak deployu, brak commitów i brak PR.

---

## 1. Co ustaliliśmy po weryfikacji wszystkich 14 rekomendacji

1. **Punkt 1 (Deployment, cache, SEO) — wykryto 3 realne usterki techniczne, które należy naprawić niezależnie od strategii:**
   - `https://www.gotovalues.com/` zwraca `200 OK` (z osobnym cache!) zamiast `308 → https://gotovalues.com/` — to (obok 7 dzisiejszych deployów) tłumaczy, dlaczego zewnętrzny audyt dostał różne wersje `/`.
   - `/jak-pracuje` zwraca `307 → /vs-freelancer-automatyzator`, a tamta strona ma `canonical: /jak-pracuje` i obie widnieją w `sitemap.xml` (pętla canonical-redirect).
   - `public/_headers` jest ignorowane przez Vercel (`csp: false` na produkcji), a `sitemap.xml` niepotrzebnie zawiera `/llms.txt` i `/ai.txt`.
2. **Punkt 13 (Analityka i konwersje) — 0 zdarzeń konwersji i luka w banerze cookies:**
   - Zainstalowane są 3 systemy (PostHog, GA4, Clarity), ale w całym `src/` jest **zero zdarzeń konwersji** (formularz, telefon, `OwnerReveal`, CTA, rysunek SVG, FAQ).
   - `cookie-consent.tsx` wymienia w szczegółach PostHog i Clarity, pomijając ładowane GA4.
3. **Punkt 12 (Blog — 17 wpisów) — wymaga redakcyjnego oczyszczenia:**
   - `0` źródeł zewnętrznych w 17/17 wpisach; niepotwierdzone deklaracje o wdrożeniach u klientów w **8 wpisach** (najpilniejszy: `[08] automatyzacja-obiegu-dokumentow` ze zdaniem *„Najlepsze wdrożenia, jakie prowadziłem”*); 38+ kategorycznych absolutów; silne powtórzenia między 5 wpisami AI oraz 2 bardzo słabe duplikaty (`[16]`, `[17]`); brak wpisów o infrastrukturze/wsparciu IT.
4. **Punkty 2, 3, 4, 5, 6, 11 (Pozycjonowanie, 4 filary, rozdzielenie odbiorców, Hero, powtórzenia, rysunek ISO):**
   - Styl rysunku technicznego warto zachować, ale **usunąć powtórzenie listy filarów między Arkuszem 1 a Arkuszem 2** i zamienić prawą kolumnę Hero na **2 czytelne ścieżki odbiorców** (Dla firm vs Wsparcie IT i klienci indywidualni).
   - Podział na **4 filary** (*Automatyzacja i integracje*, *Dane i analityka*, *Aplikacje i oprogramowanie*, *Infrastruktura i wsparcie IT*) dobrze domyka ofertę i spina ją z blogiem.
5. **Punkty 7, 8, 9, 10 — wymagają Twoich świadomych wyborów, bo kolidują z wcześniejszymi ograniczeniami:**
   - **Punkt 7 („O mnie”):** przy pracy w Urzędzie i decyzji o nieindeksowaniu nazwiska nie należy publikować szczegółowego CV pod imieniem — proponujemy bezpieczny **Wariant P1 („O gotovalues” + `OwnerReveal`)**.
   - **Punkt 8 (Portfolio `Cavi`, `Akta`, OCR):** samo `cavi.gotova.pl/` nie ma nazwiska, **ALE `https://cavi.gotova.pl/polityka-prywatnosci` ma Twoje nazwisko w jawnym HTML (`hasSurname: true`)!** Dlatego przywrócenie linku do `Cavi` jest bezpieczne dopiero po ukryciu nazwiska na tamtej podstronie (albo pokazaniu karty bez linku zewnętrznego).
   - **Punkt 10 (Podstrony usługowe):** do wyboru masz lekki wariant **S1** (`/` + `/wsparcie-it` + `/jak-pracuje`), pełny **S2** (4 podstrony usługowe: `/automatyzacja`, `/dane-i-analityka`, `/aplikacje`, `/wsparcie-it`) albo minimalny **S3** (bez nowych podstron).

---

## 2. Mapa dokumentacji tej fazy audytu (`docs/content-audit/`)

- [`15-REDESIGN-TECHNICAL-BLOG-ANALYTICS-AUDIT.md`](15-REDESIGN-TECHNICAL-BLOG-ANALYTICS-AUDIT.md) — audyt deploymentu, cache, SEO, użyteczności rysunku ISO, wszystkich 17 wpisów bloga i analityki.
- [`16-RECOMMENDATIONS-CRITICAL-VERIFICATION.md`](16-RECOMMENDATIONS-CRITICAL-VERIFICATION.md) — punkt po punkcie krytyczna ocena wszystkich 14 rekomendacji i konfliktów z ograniczeniami prywatności/etatu.
- [`17-STRATEGY-AND-CONTENT-ARCHITECTURE.md`](17-STRATEGY-AND-CONTENT-ARCHITECTURE.md) — strategia pozycjonowania, rozdzielenie odbiorców, warianty podstron (`S1`/`S2`/`S3`) i 4-kategorialna taksonomia dowodów pracy.
- [`18-PROPOSED-COPY-PL-COMPLETE.md`](18-PROPOSED-COPY-PL-COMPLETE.md) — komplet gotowych tekstów po polsku (3 warianty Hero, 4 filary, Portfolio, 2 warianty „O gotovalues”, 4 podstrony usługowe, FAQ, Kontakt).
- [`19-REDESIGN-EXECUTIVE-SUMMARY-AND-DECISIONS.md`](19-REDESIGN-EXECUTIVE-SUMMARY-AND-DECISIONS.md) — niniejsze podsumowanie i bramka decyzyjna.

---

## 3. Decyzje wymagające Twojej akceptacji przed jakimikolwiek zmianami w kodzie

1. **Poprawki techniczne P0 (bezsporne — tak/nie):** czy robimy od razu pełny pakiet higieny technicznej (`www → apex` 308, `/jak-pracuje` bezpośrednio jako `200 OK` + `308` ze starego sluga, czysty `sitemap.xml`, nagłówki CSP w `next.config.ts`, dopisanie GA4 w banerze cookies, dodanie 6 zdarzeń konwersji)?
2. **Liczba filarów oferty:** **4 filary** (Automatyzacja i integracje · Dane i analityka · Aplikacje i oprogramowanie · Infrastruktura i wsparcie IT) czy zostajemy przy **3 filarach**?
3. **Wybór nagłówka Hero (z `18-PROPOSED-COPY-PL-COMPLETE.md`):**
   - **H1-A:** *„Mniej ręcznej pracy, porządek w danych i sprawne IT.”*
   - **H1-B:** *„Technologia, która realnie odciąża codzienną pracę.”*
   - **H1-C:** *„Automatyzacja, aplikacje, dane i wsparcie IT.”* (lub zostawić obecne *„Automatyzacja, aplikacje i wsparcie IT.”*)
4. **Podstrony usługowe (Punkt 10):**
   - **S1 (zalecany kompromis):** `/` + dedykowane `/wsparcie-it` + naprawione `/jak-pracuje` (minimum utrzymania, czysty rozdział odbiorców),
   - **S2 (pełny SEO):** 4 dedykowane podstrony (`/automatyzacja`, `/dane-i-analityka`, `/aplikacje`, `/wsparcie-it`) + `/jak-pracuje`,
   - **S3:** bez nowych podstron usługowych (tylko `/` + `/jak-pracuje` + `/blog`).
5. **Sekcja Portfolio — `Cavi`, `Akta`, OCR (Punkty 8 i 9):**
   - **PF-1:** przywracamy sekcję *„Projekty autorskie i rozwiązania”* z jawnym rozróżnieniem kategorii (`Projekt autorski gotovalues` vs `Rozwiązanie prywatne`), przy czym link do `Cavi` dodajemy dopiero po ukryciu nazwiska na `cavi.gotova.pl/polityka-prywatnosci` (albo na razie karta `Cavi` bez linku zewnętrznego),
   - **PF-2:** zostawiamy stronę bez sekcji portfolio.
6. **Sekcja „O gotovalues” (Punkt 7):**
   - **P1 (zalecany przy pracy w Urzędzie):** rozbudowany opis kompetencji biznesowych, analitycznych i technicznych pod marką `gotovalues` + ukryte dane osobowe w `OwnerReveal`,
   - **P2:** zostawić obecne bardzo krótkie „O mnie”.
7. **Porządki na blogu (Punkt 12):**
   - Czy oczyszczamy 8 wpisów z niepotwierdzonych deklaracji klienckich (szczególnie `[08]` *„Najlepsze wdrożenia, jakie prowadziłem”*) i absolutów oraz scalamy 2 najsłabsze krótkie duplikaty (`[16]`, `[17]`) przez przekierowanie 301?
8. **Analityka (Punkt 13):**
   - Czy zostawiamy wszystkie 3 narzędzia (PostHog + GA4 + Clarity) i podpinamy zdarzenia konwersji, czy upraszczamy do **PostHog + GA4** (albo samego **PostHog + Clarity**)?
