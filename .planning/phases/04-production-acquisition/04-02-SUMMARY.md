---
phase: 04-production-acquisition
plan: 02
subsystem: ui
tags: [production-landing, conversion, proof, accessibility, testing]
requires:
  - 04-01
provides:
  - "Focused /dla-produkcji Server Component route with one primary #kontakt CTA and zero SupportFlow detours"
  - "Honest 4-card proof grid combining Cavi, Akta, and anonymous private OCR/normalization workflows"
  - "Component render test suite locking production symptoms, non-ERP framing, link boundary, and single CTA"
affects: []
tech-stack:
  added: []
  patterns:
    - "ProductionLandingPage consumes siteContent.productionLanding with zero inline marketing prose or inline style overrides"
    - "Shared ProductCard enforces exactly two public links (Cavi, Akta) and unlinked private articles"
key-files:
  modified:
    - src/app/dla-produkcji/page.tsx
  created:
    - tests/production-landing.test.tsx
key-decisions:
  - "Removed #zobacz-tez SupportFlow detour and secondary /#produkty hero button to keep cold-outreach visitors focused on #kontakt."
  - "Reused existing .product-grid and ProductCard compact styles cleanly with zero globals.css mutations needed."
commits: 1
plan_head_before: 2b3ee84
plan_head_after: a6ba4df
completed: 2026-11-27
status: complete
---

# Phase 4 Plan 2: Focused `/dla-produkcji` Landing Page & Render Tests Summary

Refactored `/dla-produkcji` into a focused cold-outreach landing page with explicit non-ERP positioning, honest public+private proof, a small first step, and one short-contact CTA, verified by a dedicated render test suite.

## Accomplishments

- Refactored `src/app/dla-produkcji/page.tsx` to read all section copy and metadata description from `siteContent.productionLanding` with zero hardcoded marketing prose and zero inline `style={{ ... }}` attributes.
- Removed the competing `#zobacz-tez` SupportFlow AI section (second `button-primary`) and the off-page `/#produkty` hero button so visitors see one single primary CTA (`href="#kontakt"`).
- Rendered both `siteContent.products.public` (`Cavi`, `Akta`) and `siteContent.products.private` (`OCR dla dokumentów operacyjnych`, `Workflow tłumaczenia i normalizacji akt`) inside `#proof` using existing `ProductCard` (`compact`), preserving exact two external links and unlinked anonymous private `<article>` cards.
- Preserved `SiteHeader`, `SectionHeading`, `ContactSignals`, and the Phase 2 four-field `ContactFormLazy` without altering `/api/contact`, `src/app/globals.css`, or other landing routes (`/dla-logistyki`).
- Created `tests/production-landing.test.tsx` verifying metadata, production symptoms, explicit non-ERP solutions, 4-card proof boundary (exact 2 public links + 2 unlinked private articles), small first step, single primary `#kontakt` CTA, and absence of SupportFlow detours.

## Task Commits

1. `a6ba4df` — `feat(04-02): focus /dla-produkcji with unified proof and single CTA`

## Verification

- `npx tsx --test tests/*.test.ts tests/*.test.tsx`: 91 passed, 0 failed (11 suites).
- `pnpm lint`: passed with 0 errors/warnings.
- `pnpm build`: passed (Next.js 16.4.6 Turbopack + strict TypeScript 6.0 + 40/40 static pages including `/dla-produkcji`).
- `git diff --check HEAD`: passed.

## Deviations from Plan

- No changes to `src/app/globals.css` were required: existing `.product-grid` (2 columns desktop, 1 column under 980px) and `.section-heading` already lay out the 4-card proof grid and single-CTA hero cleanly without touching shared route styles.

## Self-Check: PASSED

- Summary exists at the planned path.
- Task commit `a6ba4df` is on HEAD.
- Unrelated `.gitignore`, `__pycache__`, `.claude/settings.local.json`, and `.planning/milestone.lock` remain untouched.
