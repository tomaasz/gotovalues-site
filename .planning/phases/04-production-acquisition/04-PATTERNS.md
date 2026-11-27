# Phase 4 Patterns

## Content-first architecture
- Store all `/dla-produkcji` marketing copy (hero, panel items, section headings, symptoms, solutions, proof framing, process steps, contact guidance, and single CTA) in `siteContent.productionLanding` (`src/content/site.ts`).
- Keep lowercase `gotovalues` brand usage everywhere; do not introduce unverified claims, case-study numbers, or ERP replacement promises.

## Component and route boundaries
- Keep `src/app/dla-produkcji/page.tsx` a pure React Server Component exporting static `metadata` with canonical `/dla-produkcji`.
- Reuse `SiteHeader`, `SectionHeading`, `ProductCard`, `ContactSignals`, and `ContactFormLazy` without adding client state or a new design system.
- Render all `siteContent.products.public` and `siteContent.products.private` records in the proof section via `ProductCard` so exactly `Cavi` and `Akta` link externally and private OCR/normalization workflows render as unlinked `<article>` cards.
- Keep ONE primary short-contact CTA (`href="#kontakt"`) and no competing cross-sell sections (remove `#zobacz-tez` SupportFlow detour).

## Styling and accessibility
- Use existing utility classes in `src/app/globals.css` and `--gv-*` design tokens; avoid inline `style={{ ... }}`.
- Preserve semantic heading order (`h1` -> `h2` -> `h3`), accessible labels, keyboard focus rings, and responsive stacking on mobile (`375px`) and desktop (`1280px`).

## Verification
- Extend `tests/site-content.test.ts` and `tests/seo.test.ts`.
- Create `tests/production-landing.test.tsx` to verify rendered structure, single CTA, exact link boundary, and absence of competing offers.
- Run full `npx tsx --test tests/*.test.ts tests/*.test.tsx`, `pnpm lint`, `pnpm build`, and `git diff --check HEAD`.
