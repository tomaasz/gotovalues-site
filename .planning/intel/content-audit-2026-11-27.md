# GSD Context Reference — Kompleksowy audyt treści i pozycjonowania (2026-11-27)

- **Data przeprowadzenia:** 2026-11-27
- **Tryb:** `/gsd-explore` — discovery / research / multi-agent audit ONLY
- **Stan bazowy kodu i produkcji:** `main` @ `802b6cc` (100% zgodności produkcji z repozytorium)
- **Wpływ na kod / roadmapę:** brak zmian w `src/`, `tests/`, `packages/`, `.planning/ROADMAP.md` oraz Git; proces zatrzymany na bramce decyzji właściciela.

## Lokalizacja pełnej dokumentacji audytu

Wszystkie 14 dokumentów znajduje się w `docs/content-audit/`:

1. `docs/content-audit/00-AUDIT-BRIEF.md` — zakres, zweryfikowane kompetencje właściciela, metodologia.
2. `docs/content-audit/01-CURRENT-STATE.md` — audyt produkcji vs repozytorium, mapa źródeł treści.
3. `docs/content-audit/02-BRAND-STRATEGY.md` — Agent 1 (Brand & Business Strategy).
4. `docs/content-audit/03-CONTENT-AUDIT.md` — Agent 2 (Content & Copywriting).
5. `docs/content-audit/04-UX-CRO-AUDIT.md` — Agent 3 (UX Writing & CRO).
6. `docs/content-audit/05-MARKET-SEO-RESEARCH.md` — Agent 4 (Market Research & SEO, 11 konkurentów PL).
7. `docs/content-audit/06-POSITIONING-OPTIONS.md` — 4 kierunki pozycjonowania (A, B, C, D) i rozbieżności.
8. `docs/content-audit/07-CONTENT-ARCHITECTURE.md` — docelowa architektura informacji, oferty i SEO/GEO.
9. `docs/content-audit/08-PROPOSED-COPY.md` — szkic nowych tekstów (wymaga skrócenia i oczyszczenia wg `11-CRITICAL-REVIEW.md` przed wdrożeniem).
10. `docs/content-audit/09-TONE-OF-VOICE.md` — standard języka i komunikacji marki `gotovalues`.
11. `docs/content-audit/10-CHANGE-REGISTER.md` — rejestr 18 zmian (`CH-01`–`CH-18`).
12. `docs/content-audit/11-CRITICAL-REVIEW.md` — Agent 5 (Critical Reviewer): fact-check, mapa sprzeczności, podważenie ryzykownych założeń, audyt `08-PROPOSED-COPY.md`, rozdział *no-regret fixes* od decyzji strategicznych.
13. `docs/content-audit/12-FINAL-REPORT.md` — synteza końcowa + 10-punktowa lista decyzji właściciela.
14. `docs/content-audit/13-IMPLEMENTATION-BRIEF.md` — brief wdrożeniowy dla przyszłego planowania GSD po zatwierdzeniu decyzji.

## Kluczowe ustalenia dla przyszłych sesji GSD

- **Diagnoza:** serwis ma pękniętą tożsamość — `/` sprzedaje lokalne IT dla JDG w Zabrodziu, a stopka, `/llms.txt`, 6 podstron i 17 wpisów blogowych sprzedają B2B automatyzację/AI/aplikacje. Estetyka `DESIGN.md` (ISO 128) wzmacnia ten dysonans.
- **Kierunki do wyboru przez właściciela:**
  - **Opcja A (warunkowo rekomendowana):** dwutorowy partner technologiczny (procesy/dane/aplikacje + uporządkowanie IT) — *tylko jeśli właściciel świadomie chce obu rytmów pracy i wyraźnie rozdzieli ścieżki/CTA*.
  - **Opcja B:** czysty konsultant procesów, danych, aplikacji i AI dla MŚP (wymaga planu na *trust vacuum* po usunięciu przykładów wdrożeń).
  - **Opcja C:** lokalny i zdalny partner IT dla małych firm i JDG (szybszy lokalny popyt/abonament, niższy sufit cenowy).
  - **Opcja D:** specjalizacja branżowa (produkcja i logistyka — tylko przy realnym dostępie do branży).
- **Ważne zastrzeżenia Agenta 5:**
  - Nie wdrażać `08-PROPOSED-COPY.md` 1:1 — najpierw skrócić pod limity `DESIGN.md` i zweryfikować obietnice operacyjne/prawne (`24h`, `NDA`, `własność kodu`, `backup`, artykuł `~120h`).
  - Nie traktować 17 wpisów blogowych jako potwierdzonego topical authority bez danych Search Console/analityki.
  - Po decyzji właściciela zsynchronizować również `PRODUCT.md`, `process/context.md`, `AGENTS.md` i `GEMINI.md`, aby usunąć konflikt między dokumentacją a kodem.

## Następny krok

Czekamy na decyzje Tomasza na 10 pytań z `docs/content-audit/12-FINAL-REPORT.md` (§8). Dopiero po ich zatwierdzeniu należy zaplanować nową fazę w `.planning/ROADMAP.md` na podstawie `docs/content-audit/13-IMPLEMENTATION-BRIEF.md`.
