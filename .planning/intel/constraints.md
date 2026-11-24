# Technical Constraints

## About content model and rendering
- source: docs/plans/2026-03-17-about-trust-implementation.md
- type: schema
- content: Keep the change content-first. Extend `siteContent.about` in `src/content/site.ts` with `headline`, `role`, `summary`, `detail`, and `points`, render it from `src/app/page.tsx`, preserve the existing section style, avoid a heavy new component, and verify with `npm test`, `npm run lint`, and `npm run build`.

## Contact form payload simplification
- source: docs/plans/2026-03-17-contact-form-cro-implementation.md
- type: api-contract
- content: Remove `service` from the form data schema, frontend payload, API route, and generated email. Keep name, email, optional company, and message readable, keep the route response compatible with success messaging, and update `tests/contact.test.ts`.

## Brand centralization and products styling
- source: docs/plans/2026-03-17-gotovalues-brand-products.md
- type: nfr
- content: Keep the existing Next.js structure and data model. Centralize the lowercase brand in `src/content/site.ts`, update active metadata and mail references, rebalance shared typography and product cards in `src/app/globals.css`, and verify with tests, lint, build, Cloudflare build, and live `/produkty` health.

## Homepage conversion implementation
- source: docs/plans/2026-03-17-homepage-conversion-copy-implementation.md
- type: nfr
- content: Preserve current page structure and component boundaries. Apply changes through `src/content/site.ts`, `src/app/page.tsx`, and contact-form microcopy, keep structural content tests, and verify with `npm test`, `npm run lint`, and `npm run build`.

## Homepage copy implementation
- source: docs/plans/2026-03-17-homepage-copy-implementation.md
- type: nfr
- content: Keep the existing homepage structure and component layout. Update content-first strings in `src/content/site.ts` and remaining hard-coded section text in `src/app/page.tsx`, then run tests, lint, and production build.

## Production landing route
- source: docs/plans/2026-03-17-production-landing-implementation.md
- type: protocol
- content: Add a focused `/dla-produkcji` route using existing layout language, CSS utilities, `ProductCard`, and `ContactForm`. Add structured content in `src/content/site.ts`, route metadata, lightweight content tests, and only minimal CSS if existing utilities cannot express the page.

## Products page implementation
- source: docs/plans/2026-03-17-products-copy-implementation.md
- type: nfr
- content: Keep the existing products page and card component structure. Update metadata and section copy in `src/app/produkty/page.tsx`, rewrite product summaries and impact text in `src/content/site.ts`, and verify with tests, lint, build, Cloudflare build, and deployment.

## Trust signals across contact surfaces
- source: docs/plans/2026-03-17-trust-copy-refresh-implementation.md
- type: schema
- content: Extend the central `siteContent` object with direct-collaboration copy and shared contact signals, then render them on the homepage and `/dla-produkcji` while preserving the current section layout. Test content invariants and run tests, lint, and build.
