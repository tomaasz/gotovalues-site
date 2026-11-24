# Phase 1: Homepage positioning and trust - Context

**Gathered:** 2026-11-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Uprościć homepage tak, aby szybko prowadził klienta do kontaktu i pokazywał, że gotovalues może pomóc przy konkretnych problemach operacyjnych. Faza obejmuje komunikat strony głównej, sekcję „O mnie”, dowody wiarygodności i sposób dojścia do formularza. Nie zmienia architektury strony ani nie dodaje nowych możliwości poza zakresem fazy.

</domain>

<decisions>
## Implementation Decisions

### Sekcja „O mnie”
- **D-01:** Sekcja pozostaje krótka: tożsamość, krótki opis i najwyżej kilka punktów zaufania.
- **D-02:** Nie rozbudowywać historii zawodowej ani nie tworzyć wywodu o Tomaszu.
- **D-03:** Klient ma przede wszystkim zobaczyć, co można dla niego zrobić. Informacje o autorze są drugorzędne.

### Dowody i treść strony
- **D-04:** Głównym tematem są problemy klienta, takie jak dokumenty, ręczna praca, statusy, wyjątki i dane.
- **D-05:** Ograniczyć przechwałki, wizje, deklaracje i długie wyjaśnienia. Strona ma być oszczędna, bo „tylko słabi się tłumaczą”.
- **D-06:** Homepage nie potrzebuje osobnej sekcji produktów ani rozbudowanego opisu Cavi i Akta. Produkty mogą pozostać dostępne na osobnej stronie.
- **D-07:** Nie budować osobnej strony usług jako warunku zrozumienia oferty w tej fazie. Zakres ma wynikać z rozmowy z klientem.

### Gęstość i kontakt
- **D-08:** Używać krótkich nagłówków i jednego zdania tylko tam, gdzie bez niego problem byłby niejasny.
- **D-09:** Pierwszy ekran ma być przede wszystkim wizualny i zawierać przycisk „Napisz”, bez dodatkowego opisu.
- **D-10:** Formularz jest głównym miejscem, gdzie klient opisuje problem. Ma mieć otwarte pole oraz kilka krótkich przykładów podpowiedzi.
- **D-11:** Główny przycisk kontaktu ma brzmieć „Napisz”.

### the agent's Discretion
- Dobór konkretnych krótkich przykładów problemów w formularzu, o ile pozostają rzeczowe i nie tworzą nowych obietnic.
- Zachowanie istniejących wizualnych elementów strony, jeśli nie wymagają tekstu do zrozumienia.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Source plans
- `docs/plans/2026-03-17-homepage-copy-design.md` — zatwierdzony kierunek problem-first dla homepage.
- `docs/plans/2026-03-17-homepage-conversion-copy-design.md` — zakres uproszczenia copy bez zmiany layoutu.
- `docs/plans/2026-03-17-homepage-copy-implementation.md` — ograniczenia content-first i miejsca zmian.
- `docs/plans/2026-03-17-about-trust-design.md` — pierwotny opis sekcji „O mnie”, który został ograniczony decyzjami tej fazy.
- `docs/plans/2026-03-17-trust-copy-refresh-implementation.md` — istniejące pola `siteContent.about` i kontaktu, które należy ocenić przed zmianą.

### Existing code
- `src/content/site.ts` — centralne źródło treści homepage.
- `src/app/page.tsx` — kompozycja homepage i granice sekcji.
- `src/components/home/home-sheets.tsx` — istniejące wizualne elementy homepage.
- `src/components/contact-form.tsx` — formularz i jego mikrocopy.
- `src/lib/contact.ts` — walidacja i budowa payloadu kontaktowego.
- `tests/site-content.test.ts` — testy inwariantów treści.
- `tests/contact.test.ts` — testy formularza i payloadu.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `siteContent` w `src/content/site.ts` — zmiany treści można prowadzić centralnie bez nowych abstrakcji.
- Komponenty homepage w `src/components/home/home-sheets.tsx` — zachowują istniejący wizualny układ.
- `ContactForm` w `src/components/contact-form.tsx` — istniejący punkt wejścia dla opisu problemu.

### Established Patterns
- Content-first: copy i dane są trzymane w `src/content/site.ts`.
- App Router: homepage jest składana w `src/app/page.tsx`.
- Testy treści i formularza są w `tests/`.
- Formularz ma dostępne komunikaty statusu i walidację na granicy API.

### Integration Points
- Homepage łączy `SiteHeader`, arkusze wizualne i formularz kontaktowy.
- Formularz wysyła dane do `src/app/api/contact/route.ts` przez logikę z `src/lib/contact.ts`.

</code_context>

<specifics>
## Specific Ideas

- „Klienci powinni wiedzieć co mogę dla nich zrobić, a nie czytać wywody o mnie.”
- „Ogólnie chciałbym aby strona zawierała mniej opisów, przechwałek, wizji.”
- „Tylko słabi się tłumaczą.”
- Preferowany główny przycisk to „Napisz”.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Homepage positioning and trust*
*Context gathered: 2026-11-25*
