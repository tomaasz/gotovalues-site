# Phase 4 Validation Contract

## Requirements
- `REQ-production-landing`: `/dla-produkcji` addresses production-specific document, quality, and exception workflows, presents lightweight tools without promising ERP replacement, shows honest proof (public Cavi/Akta + anonymous private OCR/normalization), explains a small first step, and offers one short-contact CTA into the four-field contact form.

## Nyquist checks
| ID | Behavior | Test | Command |
|---|---|---|---|
| V1 | Structured `productionLanding` content and SEO discovery (`sitemap.xml`, `llms.txt`) | content + SEO tests | `npx tsx --test tests/site-content.test.ts tests/seo.test.ts` |
| V2 | `/dla-produkcji` rendered symptoms, non-ERP framing, honest proof (exact 2 public links + 2 unlinked private articles), small first step, single primary `#kontakt` CTA, no SupportFlow detour | production landing render test | `npx tsx --test tests/production-landing.test.tsx tests/product-card.test.tsx tests/site-content.test.ts` |
| V3 | Full regression and production build gate | all tests, lint, build, diff check | `npx tsx --test tests/*.test.ts tests/*.test.tsx && pnpm lint && pnpm build && git diff --check HEAD` |

## Security invariants
- Private proof cards never render links, client names, or logos.
- Contact form payload, honeypot, validation, and `/api/contact` protections remain unchanged from Phase 2.
- No new packages or lockfile changes are introduced.
