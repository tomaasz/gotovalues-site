# Phase 3: Brand and product proof - Context

**Gathered:** 2026-11-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Ujednolicić markę i proof produktów na istniejącej homepage, tak aby aktywne treści, metadata, endpointy AI, stopka, teksty mailowe i dane katalogu używały krótkiego, prawdziwego języka oraz zapisu `gotovalues` małymi literami. Produkty pozostają w istniejącej sekcji `#produkty`; faza nie dodaje osobnej trasy `/produkty` ani nowych produktów.

</domain>

<decisions>
## Implementation Decisions

### Porządki marki i copy
- **D-01:** Zakres obejmuje wszystkie aktywne powierzchnie: widoczne strony, metadata, endpointy AI, stopkę, teksty mailowe i dane katalogu.
- **D-02:** Ujednolicić zapis marki do `gotovalues` małymi literami wszędzie, gdzie jest to aktywna nazwa marki.
- **D-03:** Skrócić i uprościć także opisy techniczne w endpointach AI i katalogu; zachować sens, pola, schematy i prawdziwe informacje.
- **D-04:** Usunąć przechwałki, ogólne wizje i niesprawdzone obietnice, ale nie usuwać informacji potrzebnych do zrozumienia produktu lub działania endpointu.

### Produkty i proof
- **D-05:** Pozostawić produkty w sekcji `#produkty` na homepage; nie tworzyć osobnej strony `/produkty` w tej fazie.
- **D-06:** Cavi, Akta i prywatne wdrożenia pokazać równorzędnie w jednej siatce kart.
- **D-07:** Prywatne wdrożenia mają bardzo krótkie, anonimowe opisy; bez klienta, logo i linku. Nie rozbudowywać ich do poziomu publicznych produktów.
- **D-08:** Zachować dokładnie dwa publiczne linki produktowe: Cavi i Akta. Prywatne przykłady pozostają bez linków.

### the agent's Discretion
- Dobór konkretnych skróconych sformułowań, o ile pozostają rzeczowe i nie tworzą nowych obietnic.
- Zachowanie istniejących komponentów, schematów JSON i nazw pól, gdy ich zmiana nie jest potrzebna do usunięcia marketingowego nadmiaru.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project and requirements
- `.planning/ROADMAP.md` — zakres fazy 3, cele i kryteria sukcesu.
- `.planning/REQUIREMENTS.md` — `REQ-brand-products` i `REQ-products-proof`.
- `.planning/PROJECT.md` — ograniczenia architektury, dowodów i prawdziwości copy.
- `.planning/STATE.md` — decyzje z faz 1–2 i bieżący stan projektu.

### Existing code
- `src/content/site.ts` — centralne dane marki, produktów, proof i treści AI.
- `src/components/product-card.tsx` — istniejąca karta produktu i zasady linkowania public/private.
- `src/components/home/home-sheets.tsx` — kompozycja sekcji `#produkty` na homepage.
- `src/app/page.tsx` — granice homepage i sekcje publiczne.
- `src/app/layout.tsx` — metadata i globalne odwołania do marki.
- `src/app/ai.txt/route.ts`, `src/app/llms.txt/route.ts`, `src/app/ai/summary.json/route.ts`, `src/app/ai/service.json/route.ts`, `src/app/ai/faq.json/route.ts` — crawler-facing copy.
- `src/lib/mcp/catalog-data.ts`, `src/lib/mcp/catalog-schema.ts`, `src/lib/contact.ts` — katalog i teksty mailowe.
- `src/components/footer.tsx`, `src/components/site-header.tsx` — widoczne odwołania marki i produktów.

### Tests and prior decisions
- `tests/site-content.test.ts` — inwarianty marki, produktów i proof.
- `tests/seo.test.ts`, `tests/ai-endpoints.test.ts`, `tests/mcp-catalog.test.ts`, `tests/contact.test.ts` — kontrakty aktywnych powierzchni.
- `.planning/phases/01-homepage-positioning-and-trust/01-CONTEXT.md` — decyzje o oszczędnym problem-first copy i dokładnie dwóch publicznych produktach.
- `.planning/phases/02-contact-conversion/02-CONTEXT.md` — aktualny kontrakt kontaktu i ograniczenie marketingowego nadmiaru.
- `docs/plans/2026-03-17-products-page-design.md` — istniejące założenia proof produktów, jeśli plik istnieje.
- `docs/plans/2026-03-17-trust-copy-refresh-implementation.md` — źródłowe pola trust/proof, jeśli plik istnieje.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `siteContent.products` oraz `ProductCard` — istniejący model trzech typów proof i public/private link behavior.
- `home-sheets.tsx` — istniejąca sekcja produktów na homepage, bez potrzeby nowej trasy.
- Route handlers AI i MCP catalog — istniejące źródła crawler-facing opisów, które można skrócić centralnie lub lokalnie bez zmiany schematów.

### Established Patterns
- Content-first: marketingowe treści są trzymane w `src/content/site.ts`.
- Public products use external links; private deployments remain unlinked and anonymous.
- Testy kontraktowe chronią lowercase brand, dokładnie dwa publiczne produkty, URL-e Cavi/Akta i schematy endpointów.
- Next.js App Router i Server Components pozostają domyślną granicą.

### Integration Points
- `siteContent` zasila homepage, metadata i endpointy AI.
- `ProductCard` renderuje publiczne i prywatne przykłady.
- Katalog MCP ma własny schemat walidowany testami.
- Tekst maila kontaktowego musi pozostać czytelny i zgodny z kontraktem fazy 2.

</code_context>

<specifics>
## Specific Ideas

- „Klienci powinni wiedzieć co mogę dla nich zrobić, a nie czytać wywody o mnie.”
- „Strona ma zawierać mniej opisów, przechwałek i wizji.”
- Prywatne wdrożenia mają być bardzo skrócone, bez rozbudowanych kart.
- Produkty pozostają na homepage, bez nowej strony `/produkty`.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 3-Brand and product proof*
*Context gathered: 2026-11-26*
