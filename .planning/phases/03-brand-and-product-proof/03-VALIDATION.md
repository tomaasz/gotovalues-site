# Phase 3 Validation Contract

## Requirements
- REQ-brand-products: active brand strings and descriptions are lowercase, concise and contract-preserving across page, metadata, mail, AI and catalog surfaces.
- REQ-products-proof: homepage `#produkty` explains purpose, renders Cavi/Akta/private proof in one accessible grid, keeps exactly two public links and keeps private proof anonymous/unlinked.

## Nyquist checks
| ID | Behavior | Test | Command |
|---|---|---|---|
| V1 | Lowercase brand and concise active copy | content/SEO/AI/MCP/contact tests | `npx tsx --test tests/site-content.test.ts tests/seo.test.ts tests/ai-endpoints.test.ts tests/mcp-catalog.test.ts tests/contact.test.ts` |
| V2 | One product grid with exactly two links and private articles | homepage/product-card tests | `npx tsx --test tests/site-content.test.ts tests/homepage-copy.test.tsx tests/product-card.test.tsx` |
| V3 | Full regression and production checks | all tests, lint, build, whitespace | `npx tsx --test tests/*.test.ts tests/*.test.tsx && pnpm lint && pnpm build && git diff --check` |

## Security invariants
- No private customer names, logos, links or secrets are introduced.
- No API schema, response key, contact escaping, honeypot or rate limiter changes.
- No dependency installation or external dashboard changes.
