---
phase: 03-brand-and-product-proof
plan: 02
subsystem: ui
tags: [homepage, products, proof, accessibility, css]
requires:
  - 03-01
provides:
  - "Unified #produkty responsive proof grid combining Cavi, Akta, and anonymous private deployments"
  - "ProductCard sheet variant enforcing public external links and unlinked private articles"
  - "Calm heading scale, technical-drawing hatching for private items, focus-visible and reduced-motion styles"
affects: [04]
tech-stack:
  added: []
  patterns:
    - "Single ProductCard component supports both landing pages (default) and homepage sheet (sheet variant)"
    - "Public cards render as external anchor wrappers; private cards render as non-linking articles with hatched section-cut framing"
key-files:
  modified:
    - src/components/product-card.tsx
    - src/components/home/home-sheets.tsx
    - src/app/home.css
    - tests/homepage-copy.test.tsx
    - tests/product-card.test.tsx
key-decisions:
  - "Extended ProductCard with variant='sheet' and detailCode instead of creating a second card model."
  - "Enforced category === 'public' before rendering an anchor so private items can never leak external links (T-03-04)."
  - "Used technical-drawing 45-degree sage hatching (--gv-hatch) and dashed framing for private cards to preserve DESIGN.md's three-colour palette."
commits: 1
plan_head_before: d99de95
plan_head_after: 9cfa5e9
completed: 2026-11-26
status: complete
---

# Phase 3 Plan 2: Unified Homepage Product Proof Grid Summary

Refactored `#produkty` on the homepage into one calm, accessible responsive grid that presents Cavi, Akta, and anonymous private deployments together while preserving the two-link public boundary.

## Accomplishments

- Extended `ProductCard` (`src/components/product-card.tsx`) with `variant="sheet"` and `detailCode`, keeping the default variant unchanged for `/dla-produkcji`, `/dla-logistyki`, and Storybook.
- Enforced `product.category === "public" && Boolean(product.url)` before rendering an anchor wrapper so private deployments always render as unlinked `<article>` elements.
- Refactored `ProofSheet` (`src/components/home/home-sheets.tsx`) to render all public and private products inside one `[data-proof-grid="unified"]` grid with a concise section purpose line, removing the separate `.gv-private` list.
- Styled `.gv-proof-*` in `src/app/home.css` using existing `--gv-*` tokens: calm heading scale, responsive 1-to-3-column `auto-fit` grid, visible deep-sage keyboard focus outlines, 45° hatched section-cut panel for private items, and `prefers-reduced-motion: reduce` support.
- Extended `tests/homepage-copy.test.tsx` and `tests/product-card.test.tsx` to assert the unified grid, exact two public URLs (`Cavi`, `Akta`), unlinked private articles, semantic headings, accessible image labels, and external-link screen-reader notes.

## Task Commits

1. `9cfa5e9` — `feat(03-02): unify homepage product proof grid`

## Verification

- `npx tsx --test tests/*.test.ts tests/*.test.tsx`: 87 passed, 0 failed (10 suites).
- `pnpm lint`: passed with 0 errors/warnings.
- `pnpm build`: passed (Next.js 16.4.6 Turbopack + strict TypeScript + 40/40 static pages).
- `git diff --check HEAD`: passed.
- Verified `src/app/produkty` does not exist and lockfile was not modified.

## Deviations from Plan

None — plan executed as written. Both tasks were verified together and committed cleanly.

## Self-Check: PASSED

- Summary exists at the planned path.
- Task commit `9cfa5e9` is on HEAD.
- Unrelated `.gitignore`, `__pycache__`, `.claude/settings.local.json`, and planning runtime files remain untouched.
