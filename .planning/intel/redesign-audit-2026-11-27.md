# GSD Context Reference — Redesign strategii komunikacji i treści (2026-11-27, faza 2)

- **Data:** 2026-11-27
- **Tryb:** `/gsd-explore` — analiza, weryfikacja krytyczna 14 rekomendacji, architektura i komplet propozycji tekstów (ZERO zmian w kodzie produkcyjnym, ZERO commitów, ZERO deployu)
- **Stan bazowy produkcji:** `main` @ `8cb79af` (`https://gotovalues.com/`)
- **Status:** STOP na bramce 8 decyzji właściciela (`docs/content-audit/19-REDESIGN-EXECUTIVE-SUMMARY-AND-DECISIONS.md` §3).

## Dokumenty tej fazy (`docs/content-audit/`)

- `docs/content-audit/15-REDESIGN-TECHNICAL-BLOG-ANALYTICS-AUDIT.md` — audyt techniczny (deployment/cache/`www` vs apex/pętla 307 canonical `/jak-pracuje`/brak CSP z `public/_headers`), ocena użyteczności rysunku ISO 128, pełny audyt 17 wpisów bloga oraz audyt analityki (0 zdarzeń konwersji, luka GA4 w banerze cookies).
- `docs/content-audit/16-RECOMMENDATIONS-CRITICAL-VERIFICATION.md` — krytyczna weryfikacja wszystkich 14 rekomendacji wobec ograniczeń właściciela (praca w Urzędzie, brak działalności, ochrona nazwiska przed wyszukiwarkami, wykryty wyciek nazwiska na `cavi.gotova.pl/polityka-prywatnosci`).
- `docs/content-audit/17-STRATEGY-AND-CONTENT-ARCHITECTURE.md` — pozycjonowanie pod marką `gotovalues`, 4 vs 3 filary, rozdzielenie odbiorców (Firmy vs Wsparcie IT/indywidualni), warianty podstron (`S1`/`S2`/`S3`), 4-kategorialna taksonomia portfolio/dowodów.
- `docs/content-audit/18-PROPOSED-COPY-PL-COMPLETE.md` — komplet polskich treści (3 warianty Hero, 4 filary, Portfolio z jawnymi etykietami, 2 warianty „O gotovalues”, 4 podstrony usługowe, FAQ, Kontakt).
- `docs/content-audit/19-REDESIGN-EXECUTIVE-SUMMARY-AND-DECISIONS.md` — synteza wykonawcza i 8-punktowa lista decyzji właściciela.

## Kluczowe znaleziska P0 (niezależne od strategii treści)

1. `https://www.gotovalues.com/` zwraca `200 OK` zamiast `308 → https://gotovalues.com/` (osobny cache dla `www` i apex).
2. `/jak-pracuje` zwraca `307 → /vs-freelancer-automatyzator`, która ma `canonical: /jak-pracuje`, a obie są w `sitemap.xml`.
3. `public/_headers` jest ignorowany przez Vercel (`csp: false` live).
4. `cookie-consent.tsx` nie wymienia GA4 mimo ładowania `GaProvider`; 0 custom conversion events w PostHog/GA4/Clarity.
5. `https://cavi.gotova.pl/polityka-prywatnosci` zawiera nazwisko właściciela w jawnym HTML (`hasSurname: true`) — bloker prywatności przed linkowaniem `Cavi` z `gotovalues.com`.
6. 8 wpisów na blogu (zwłaszcza `automatyzacja-obiegu-dokumentow`) nadal zawiera niepotwierdzone deklaracje o wdrożeniach u klientów; 0 zewnętrznych źródeł w 17/17 wpisach.

## Następny krok

Nie otwierać fazy wdrożeniowej ani nie edytować `.planning/ROADMAP.md` przed uzyskaniem odpowiedzi właściciela na 8 decyzji z `docs/content-audit/19-REDESIGN-EXECUTIVE-SUMMARY-AND-DECISIONS.md`.
