---
phase: 04-production-acquisition
plan: 01
subsystem: content
tags: [production-landing, copy, seo, metadata]
requires: []
provides:
  - "Complete centralized siteContent.productionLanding payload with explicit non-ERP framing"
  - "Concise section headings, hero panel items, proof framing, small first step, and contact points"
  - "SEO and content regression assertions covering /dla-produkcji in sitemap.xml and llms.txt"
affects: [04-02]
tech-stack:
  added: []
  patterns:
    - "Content-first model in src/content/site.ts owns all /dla-produkcji prose and metadata"
key-files:
  modified:
    - src/content/site.ts
    - tests/site-content.test.ts
    - tests/seo.test.ts
key-decisions:
  - "Made 'bez wymiany ERP' explicit in headline, metadata description, solutions heading, and first solution card."
  - "Kept lowercase gotovalues and excluded all SupportFlow/helpdesk references from productionLanding."
commits: 1
plan_head_before: 2023aff
plan_head_after: 2b3ee84
completed: 2026-11-27
status: complete
---

# Phase 4 Plan 1: Production Landing Content and SEO Contract Summary

Consolidated all `/dla-produkcji` copy into `siteContent.productionLanding` with explicit non-ERP positioning and locked crawler/content invariants in tests.

## Accomplishments

- Expanded `siteContent.productionLanding` (`src/content/site.ts`) with `metadataDescription`, `panel`, and `sections` (`symptoms`, `solutions`, `proof`, `firstStep`, `contact`) while tightening existing copy to concise, factual Polish.
- Made lightweight non-ERP positioning ("bez wymiany ERP") explicit across hero, metadata, and solutions without adding unverified claims.
- Extended `tests/site-content.test.ts` to assert document/quality/exception terms, non-ERP framing, single `#kontakt` CTA, and absence of SupportFlow/helpdesk references.
- Extended `tests/seo.test.ts` to verify `/dla-produkcji` presence in both `sitemap.xml` and `llms.txt`.

## Task Commits

1. `2b3ee84` — `feat(04-01): consolidate production landing copy and SEO tests`

## Verification

- `npx tsx --test tests/site-content.test.ts tests/seo.test.ts`: 16 passed, 0 failed.
- `git diff --check HEAD`: passed.

## Deviations from Plan

None — plan executed as written.

## Self-Check: PASSED

- Summary exists at the planned path.
- Task commit `2b3ee84` is an ancestor of HEAD.
