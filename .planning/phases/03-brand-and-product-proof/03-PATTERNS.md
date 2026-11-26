# Phase 3 Patterns

## Content and brand source
- Use `brandName` and `siteContent` as the source of active copy; do not add per-route brand constants.
- Keep product records typed as `ProductCard`; preserve public `url` and omit `url` for private records.

## Route contracts
- Shorten prose only. Preserve JSON keys, content types, catalog enums, `publisher`, `methodology_url`, URLs and existing email escaping.
- Do not change contact payload or API validation from Phase 2.

## Product proof UI
- Reuse `ProductCard` and existing technical-drawing styles. The homepage remains the only product destination in this phase.
- Public and private proof may share a grid, but private records must render as non-linking articles with concise copy.

## Verification
- Extend existing content, SEO, AI endpoint, MCP catalog, contact and homepage/product-card tests.
- Run focused tests per plan, then full `npx tsx --test tests/*.test.ts tests/*.test.tsx`, `pnpm lint`, `pnpm build`, and `git diff --check`.
