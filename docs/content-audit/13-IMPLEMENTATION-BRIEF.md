# 13 — Brief wdrożeniowy dla przyszłego planowania GSD (`gotovalues.com`)

**Data:** 2026-11-27  
**Status:** **SZKIC PLANISTYCZNY — NIE URUCHAMIAĆ PRZED ZATWIERDZENIEM DECYZJI WŁAŚCICIELA** (zob. [`12-FINAL-REPORT.md` §8](12-FINAL-REPORT.md))  
**Przeznaczenie:** gotowe wejście techniczne i redakcyjne do przyszłej fazy GSD (po wyborze kierunku A/B/C/D i udzieleniu odpowiedzi na pytania właściciela).

---

## 1. Bramka startowa (warunki przed napisaniem pierwszej linii kodu)

Przed otwarciem nowej fazy w `.planning/ROADMAP.md` lub utworzeniem brancha wdrożeniowego właściciel musi zatwierdzić:

1. **Kierunek strategiczny:** Wariant A, B, C lub D.
2. **Zakres lokalnego IT i promień dojazdu:** planowane porządkowanie vs awarie/helpdesk; tylko Zabrodzie/powiat wyszkowski vs szerszy region.
3. **Warstwa dowodowa:** brak przykładów vs własne narzędzia (`Cavi`/`Akta` jasno oznaczone jako produkty własne) vs zanonimizowane artefakty / demo na danych syntetycznych.
4. **Decyzja per trasa (routing/indeksacja):**
   - `/supportflow` (zostaje / `noindex` / redirect 301 / usunięcie)
   - `/triageflow` (zostaje / `noindex` / redirect 301 / usunięcie)
   - `/kalkulator-roi` (zostaje / dopasowanie CTA / `noindex`)
   - `/dla-produkcji` oraz `/dla-logistyki` (zostają + odświeżenie / `noindex`)
   - `/jak-pracuje` (zostaje + poprawa tytułu i copy)
   - ewentualna nowa podstrona lokalna (np. `/uslugi-it-dla-firm` — tylko dla Wariantu A lub C po potwierdzeniu oferty lokalnej).
5. **Weryfikacja wrażliwych twierdzeń:**
   - źródło wpisu `case-study-firma-produkcyjna-120h-automatyzacja` (`~120h`),
   - realność czasu odpowiedzi (`24h` / `1 dzień roboczy` vs neutralne `w dni robocze`),
   - zakres deklaracji prawnych/operacyjnych (`własność kodu`, `NDA`, `backup`, `rozliczenia`),
   - zakres biografii w sekcji `O mnie` (leasing, zarządzanie aktywami, wycena maszyn, cyfryzacja).
6. **Redakcja końcowa copy:** przyjęcie skróconej i oczyszczonej wersji tekstów z [`08-PROPOSED-COPY.md`](08-PROPOSED-COPY.md) z naniesieniem poprawek z [`11-CRITICAL-REVIEW.md` §7 i §9](11-CRITICAL-REVIEW.md).

---

## 2. Zalecany podział na fale wdrożenia

Zamiast jednego gigantycznego commita wdrożenie warto podzielić na 4 kontrolowane fale (z pełną weryfikacją po każdej z nich):

### Fala 0 — Higiena i poprawki bezdyskusyjne (*no-regret fixes*)
*Cel:* usunąć oczywiste błędy kontekstu, SEO i ryzyko wiarygodności (niezależnie od docelowego wariantu strategicznego).
- Zabezpieczyć lub poprawić wpis `case-study-firma-produkcyjna-120h-automatyzacja` (zgodnie z werdyktem właściciela).
- Poprawić duplikat nazwy marki i anglicyzm w `<title>` strony `/jak-pracuje`.
- Usunąć twardo wpisany lokalny placeholder (*„rwie się Wi-Fi, komputer wymaga serwisu”*) z `src/components/contact-form.tsx` na trasach procesowych — wprowadzić opcjonalne propsy kontekstowe (`messageLabel`, `messagePlaceholder`, `submitLabel`) z bezpiecznym neutralnym domyślnym tekstem.
- Usunąć niepotwierdzone absoluty (`od ręki`, `zawsze`, `bez ukrytych kosztów`, `24h`), jeśli właściciel ich nie podtrzyma.

### Fala 1 — Rdzeń strony głównej, metadane i spójność globalna
*Cel:* zlikwidować rozdwojenie tożsamości serwisu i wdrożyć zatwierdzony wariant pozycjonowania.
- Zaktualizować globalne metadane i `<title>` w `src/app/layout.tsx` (plus `Schema.org` zgodnie z zatwierdzonym zakresem usług i obszarem działania — bez dodawania niepotwierdzonych miast i bez surowego numeru telefonu w JSON-LD!).
- Przepisać treści strony głównej w `src/content/site.ts` (H1, opcjonalny bardzo krótki lede, filary oferty, zasady współpracy, `O mnie`, 5–6 konkretnych FAQ, kontakt) — **z zachowaniem twardych limitów objętościowych z `DESIGN.md` i `11-CRITICAL-REVIEW.md` §4.3**.
- Zaktualizować diagram SVG i tabelę rewizji na arkuszu 1 (zachowując reguły `prefers-reduced-motion: reduce` w `src/app/home.css` i proporcje pierwszego ekranu).
- Zsynchronizować nawigację (`src/components/site-header.tsx` lub odpowiednik) i stopkę (`src/components/footer.tsx` / `site-footer.tsx`) z zatwierdzoną mapą oferty.
- Zachować zabezpieczenie numeru telefonu `PhoneReveal` (0 surowych cyfr telefonu w SSR HTML i JSON-LD).

### Fala 2 — Architektura podstron, SEO/GEO i warstwa dowodowa
*Cel:* doprowadzić wszystkie zaindeksowane podstrony, mapę witryny i pliki AI do 100% zgodności z nową strategią.
- Zastosować decyzje dla `/supportflow`, `/triageflow`, `/kalkulator-roi`, `/dla-produkcji`, `/dla-logistyki` (odświeżenie treści i kontekstowego formularza lub `noindex` / przekierowania 301 w `next.config.*`).
- Opcjonalnie (jeśli Wariant A lub C): utworzyć dedykowaną stronę lokalnego wsparcia IT z osobnym CTA, formularzem, godzinami/granicami i obszarem obsługi.
- Jeśli wybrano minimalną warstwę dowodową: dodać ją zgodnie z decyzją właściciela, z jednoznacznym oznaczeniem (np. „Własne narzędzie” lub „Przykład techniczny na danych syntetycznych”).
- Zaktualizować `src/app/sitemap.ts` (tylko aktywne, indeksowane trasy) oraz `src/app/llms.txt/route.ts`, `public/llms.txt` i endpointy `src/app/ai/*` (dopiero po zamknięciu decyzji o trasach i produktach).
- Zaplanować wewnętrzne linkowanie z 17 wpisów blogowych (`src/content/blog.ts` / pliki MD/TS bloga) do właściwych stron docelowych.

### Fala 3 — Synchronizacja dokumentacji wewnętrznej, walidacja UX i pomiar
*Cel:* zapobiec kolejnemu rozjazdowi między kodem a dokumentacją agentową oraz zmierzyć realny efekt zmian.
- Zaktualizować dokumenty źródłowe projektu, aby odzwierciedlały zatwierdzoną strategię:
  - `PRODUCT.md`
  - `process/context.md` i `process/decisions.md`
  - `AGENTS.md` i `GEMINI.md` (np. reguła dotycząca publicznego linkowania produktów `Cavi`/`Akta`, jeśli pozostają ukryte)
  - `.planning/PROJECT.md` i `~/obsidian-vault/projects/gotovalues.md`
- Przeprowadzić test wizualny na żywo (Playwright): desktop `1440×900` i `1280×800`, mobile `375×812`, `prefers-reduced-motion: reduce` oraz baner cookies w orientacji poziomej na mobile.
- Dodać lub zweryfikować zdarzenia analityczne (PostHog) rozróżniające ścieżki leadów: wysłanie formularza (z parametrem ścieżki/trasy), odsłonięcie telefonu (`PhoneReveal`), kliknięcie `tel:`.
- Wykonać szybki jakościowy test 5-sekundowy na realnych odbiorcach (5 osób z profilu lokalnego + 5 osób z profilu procesowego MŚP, jeśli Wariant A).

---

## 3. Mapa wpływu na pliki repozytorium

### Pliki aplikacji (do weryfikacji dokładnych ścieżek przed edycją)

| Obszar | Pliki źródłowe | Zakres potencjalnych zmian |
|---|---|---|
| Treści główne i podstrony | `src/content/site.ts` | H1, lede, filary, zasady, `O mnie`, FAQ, kontakt, treści `/dla-produkcji`, `/dla-logistyki`, `/jak-pracuje`. |
| Layout, SEO i Schema.org | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` | `<title>`, `description`, OpenGraph, JSON-LD (`Person` / `ProfessionalService` / `LocalBusiness` wg wariantu), lista tras w sitemapie. |
| Komponenty strony głównej | `src/components/*` (arkusz rysunkowy, diagram SVG, tabela rewizji, `TitleBlockForm`), `src/app/home.css` | Aktualizacja tekstów na rysunku, zachowanie limitów wysokości first-viewport i reguł `prefers-reduced-motion`. |
| Formularze i telefon | `src/components/contact-form.tsx`, `src/components/phone-reveal.tsx`, `src/app/api/contact/route.ts` | Kontekstowe propsy formularza per trasa; utrzymanie ochrony numeru przed botami; ewentualne przekazanie źródła/ścieżki w payloadzie. |
| Nawigacja i stopka | `src/components/footer.tsx` (lub `site-footer.tsx`), nagłówek strony | Spójne linki odpowiadające wyłącznie aktywnym trasom oferty. |
| Trasy specjalne i blog | `src/app/jak-pracuje/*`, `src/app/dla-produkcji/*`, `src/app/dla-logistyki/*`, `src/app/supportflow/*`, `src/app/triageflow/*`, `src/app/kalkulator-roi/*`, `src/content/blog*`, `next.config.*` | Dostosowanie copy, meta tytułów, `noindex` lub przekierowań 301; weryfikacja artykułu `~120h`. |
| Warstwa AI / GEO | `src/app/llms.txt/route.ts`, `public/llms.txt`, `public/ai.txt`, `src/app/ai/*` | Jednolita, zwięzła mapa aktualnej oferty (bez usuniętych tras i sprzecznych opisów). |

### Testy wymagające przeglądu i aktualizacji po zmianach treści

W katalogu `tests/` istnieje 15 plików testowych (obecnie 93/93 przechodzą). Zmiana copy i routingu bezpośrednio dotknie:

- `tests/homepage-copy.test.tsx` — asercje na nagłówki, filary i mikrocopy strony głównej.
- `tests/site-content.test.ts` — asercje na strukturę `src/content/site.ts`, lokalizację, brak usuniętych produktów itp.
- `tests/contact-form.test.tsx` — asercje na etykiety, placeholdery (nowe propsy kontekstowe) i dostępność (`aria-invalid`, `role="status"`).
- `tests/seo.test.ts` — asercje na `<title>`, `description`, `sitemap.ts`, Schema.org.
- `tests/ai-endpoints.test.ts` — asercje na `/llms.txt` i endpointy `/ai/*`.
- `tests/faq.test.ts` — liczba i struktura FAQ.
- `tests/production-landing.test.tsx` — treści i formularz na `/dla-produkcji`.
- `tests/phone-reveal.test.tsx` — **regresja obowiązkowa**: zero surowych cyfr numeru telefonu w SSR HTML i JSON-LD, odsłonięcie dopiero po kliknięciu.
- `tests/product-card.test.tsx` — weryfikacja, jeśli zmieni się status kart `Cavi`/`Akta`.

---

## 4. Twarde kryteria akceptacji przyszłego wdrożenia

Każda fala wdrożeniowa po zatwierdzeniu decyzji musi przejść komplet bramek:

1. **Zgodność z prawdą i zakaz konfabulacji:** zero zmyślonych klientów, wyników, certyfikatów, niepotwierdzonych SLA ani niepotwierdzonych miast dojazdu.
2. **Dyscyplina `DESIGN.md` („The Working Drawing”):**
   - H1: maks. 2 wiersze na desktopie (`1280px`/`1440px`) i 3 na mobile (`375px`).
   - Lede (jeśli użyty): maks. 2 krótkie wiersze desktop / 4 mobile.
   - Diagram SVG + tabela rewizji mieszczą się czytelnie w rytmie pierwszego arkusza bez ściany tekstu.
   - Animacje respektują `prefers-reduced-motion: reduce`.
3. **Jakość i spójność treści (`09-TONE-OF-VOICE.md` + `11-CRITICAL-REVIEW.md`):**
   - `gotovalues` zawsze małą literą w polskim copy.
   - 100% zgodności między `/`, stopką, aktywnymi podstronami, `sitemap.ts` i `/llms.txt`.
   - Zero lokalnego placeholdera (Wi-Fi/komputer) na stronach procesowych.
4. **Weryfikacja techniczna (`AGENTS.md`):**
   - `npx tsx --test tests/*.test.ts tests/*.test.tsx` — 100% green.
   - `pnpm lint` — 0 błędów i 0 ostrzeżeń.
   - `pnpm build` — czysty build produkcyjny (w tym `typedRoutes: true`).
5. **Weryfikacja po wdrożeniu (Playwright + `curl`):**
   - Sprawdzenie wyrenderowanych tras na `https://gotovalues.com` (desktop + mobile), 0 błędów konsoli/JS, poprawny `PhoneReveal` (`RAW_HAS_PHONE=0` w surowym HTML i JSON-LD), poprawne kody HTTP dla ewentualnych przekierowań 301 i meta `noindex`.
