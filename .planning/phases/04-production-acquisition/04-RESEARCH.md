# Phase 4: Production acquisition - Research

**Researched:** 2026-11-26
**Domain:** Focused cold-outreach landing page at `/dla-produkcji` (Next.js 16 App Router, React 19, TypeScript)

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REQ-production-landing | `/dla-produkcji` addresses production-specific document, quality, and exception workflows, presents lightweight tools without promising ERP replacement, shows honest proof, explains a small first step, and has one short-contact CTA. | Route `src/app/dla-produkcji/page.tsx` and `siteContent.productionLanding` already exist, and `/dla-produkcji` is already in `sitemap.ts` and `llms.txt`. Gaps are concrete: competing SupportFlow CTA, off-page hero detour, missing private OCR/normalization proof cards, verbose inline TSX copy, and zero route render tests. |
</phase_requirements>

## Summary

Unlike a greenfield route, `/dla-produkcji` already exists in the codebase (`src/app/dla-produkcji/page.tsx`, 153 lines) and is already wired into `src/app/sitemap.ts` (priority `0.8`), `src/app/llms.txt/route.ts`, and four blog posts (`src/content/blog.ts`). However, auditing the existing implementation against `REQ-production-landing`, Phases 1–3 decisions, and `docs/plans/2026-03-17-production-landing-design.md` reveals five concrete gaps:

1. **Competing primary CTA & off-page bounce:** Lines 115–127 render a `#zobacz-tez` section pitching `SupportFlow AI` with a second `button-primary` CTA right above `#kontakt`, plus an inline `style={{ ... }}` override. The hero also includes a secondary button (`href="/#produkty"`) that sends cold-outreach visitors away from `/dla-produkcji` instead of keeping them on the page.
2. **Incomplete proof for manufacturing visitors:** Lines 88–95 render only `siteContent.products.public` (`Cavi`, `Akta`) and omit `siteContent.products.private` (`OCR dla dokumentów operacyjnych`, `Workflow tłumaczenia i normalizacji akt`), which are the closest operational proof for document-heavy manufacturing teams.
3. **Inline prose drift outside `siteContent`:** Hero panel bullets, chips, section headings, and contact guidance are hardcoded in `src/app/dla-produkcji/page.tsx` rather than sourced from `siteContent.productionLanding`, and several headings are verbose multi-clause sentences (e.g., 20-word `<h2>`).
4. **Explicit non-ERP framing & Phase 2–3 tone alignment:** While the page hints at "bez wymiany całego środowiska", making "bez wymiany ERP" explicit in solutions/metadata and tightening copy to match the calm, factual tone from Phases 1–3 directly addresses the primary manufacturing objection.
5. **No route render test coverage:** `tests/site-content.test.ts` checks 6 fields of `siteContent.productionLanding`, and `tests/seo.test.ts` does not assert `/dla-produkcji` in `sitemap.xml` or `llms.txt`. There is no component/page render test for `ProductionLandingPage`.

**Primary recommendation:** Refactor `/dla-produkcji` in two small waves — first consolidate and tighten `siteContent.productionLanding` + SEO/content tests (`04-01`), then clean up `src/app/dla-produkcji/page.tsx` to remove competing CTAs, include honest public + private proof via `ProductCard`, keep the Phase 2 four-field `ContactForm`, and lock every invariant with `tests/production-landing.test.tsx` (`04-02`).

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| Production landing copy | Frontend Server / Content (`src/content/site.ts`) | Metadata / SEO | Typed `siteContent.productionLanding` keeps route copy centralized and testable without drift. |
| Production landing route | Frontend Server (RSC: `src/app/dla-produkcji/page.tsx`) | Browser / Client (`ContactFormLazy`) | Page stays a static Server Component; only `ContactFormLazy` hydrates client state. |
| Product proof cards | Shared Server Component (`src/components/product-card.tsx`) | CSS (`src/app/globals.css`) | Reuses existing `ProductCard` (`compact` prop) which already enforces `category === 'public' && Boolean(url)` for links and `<article>` for private records. |
| Contact conversion | Shared Client Leaf (`src/components/contact-form-lazy.tsx`) | API (`src/app/api/contact/route.ts`) | Preserves the Phase 2 four-field form and API contract unchanged. |
| Crawler discovery | SEO routes (`src/app/sitemap.ts`, `src/app/llms.txt/route.ts`) | Tests (`tests/seo.test.ts`) | `/dla-produkcji` is already published; extend tests to guard against accidental removal. |

## Pitfalls to Avoid

- **Breaking `/dla-logistyki` or Storybook:** Both reuse `ProductCard` (`compact`) and `globals.css` classes (`.hero`, `.pillar-grid`, `.product-grid`, `.contact-card`). Do not alter shared `ProductCard` default semantics or break `.product-grid` for other routes.
- **Leaking links or client names in private proof:** Private items in `siteContent.products.private` must remain unlinked `<article>` cards with concise anonymous descriptions (`T-04-01`).
- **Adding a second primary CTA or competing offer:** Remove `#zobacz-tez` (`SupportFlow AI`) and keep one single primary short-contact CTA leading to `#kontakt`.
- **Promising ERP replacement or unverified ROI metrics:** Keep copy grounded in lightweight tools around existing processes (documents, quality, complaints, batch statuses, exceptions) without ERP replacement claims.
- **Modifying `/api/contact` or Phase 2 contact schema:** Reuse `ContactFormLazy` as-is.

## Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|---|---|---|---|---|
| REQ-production-landing | Structured content covers documents, quality, exceptions, non-ERP tools, honest proof, small first step, and single `#kontakt` CTA; route present in `sitemap.xml` & `llms.txt` | unit | `npx tsx --test tests/site-content.test.ts tests/seo.test.ts` | ✅ existing; extend assertions |
| REQ-production-landing | `/dla-produkcji` renders symptoms, non-ERP tools, exact 2 public proof links + 2 unlinked private articles, small first step, single primary `#kontakt` CTA, no SupportFlow detour, and 4-field contact form | component / SSR render | `npx tsx --test tests/production-landing.test.tsx tests/site-content.test.ts tests/seo.test.ts` | 🆕 create `tests/production-landing.test.tsx` |
| Regression gate | Full test suite, ESLint, production Next.js build, and whitespace check | full suite | `npx tsx --test tests/*.test.ts tests/*.test.tsx && pnpm lint && pnpm build && git diff --check HEAD` | ✅ existing |
