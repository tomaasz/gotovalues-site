---
phase: 01-homepage-positioning-and-trust
plan: 01
subsystem: ui
tags: [nextjs, react, homepage, copy, accessibility, testing]

requires: []
provides:
  - "Problem-first homepage copy for documents, manual work, statuses, exceptions and data"
  - "Single first-viewport Napisz action with unchanged contact payload"
  - "Compact proof and Tomasz trust section with exactly Cavi and Akta as public links"
affects: [phase-02-contact-conversion]

actuals:
  tokens: 5357
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Homepage copy remains content-first in siteContent"
    - "Render and payload invariants are covered with node:test and Testing Library"

key-files:
  created:
    - tests/homepage-copy.test.tsx
  modified:
    - src/content/site.ts
    - src/components/home/home-sheets.tsx
    - src/components/home/title-block-form.tsx
    - tests/site-content.test.ts

key-decisions:
  - "The first viewport keeps the technical drawing visually dominant and removes the competing lede."
  - "The primary action is exactly `Napisz`; the open field carries concrete process examples."
  - "About is limited to Tomasz's identity, one short description and three evidence points."
  - "Proof stays compact: only Cavi and Akta are linked publicly; private examples remain anonymous and unlinked."

patterns-established:
  - "Short Polish problem-first copy precedes biography and avoids unsupported claims or metrics."
  - "Existing server/client boundaries and contact API field names remain unchanged."

requirements-completed: [REQ-homepage-positioning, REQ-about-trust]

coverage:
  - id: D1
    description: "First viewport presents operational problems with one Napisz action and concrete form examples."
    requirement: REQ-homepage-positioning
    verification:
      - kind: automated_ui
        ref: "tests/homepage-copy.test.tsx#keeps the first viewport problem-first with one Napisz action"
        status: pass
    human_judgment: false
  - id: D2
    description: "Contact request keeps the existing payload keys and /api/contact boundary."
    requirement: REQ-homepage-positioning
    verification:
      - kind: integration
        ref: "tests/homepage-copy.test.tsx#submits the unchanged contact payload shape"
        status: pass
    human_judgment: false
  - id: D3
    description: "Offer, proof and About are concise, problem-first, and retain only Cavi and Akta public links."
    requirement: REQ-about-trust
    verification:
      - kind: unit
        ref: "tests/site-content.test.ts#keeps offer and proof anchored in operational problems"
        status: pass
      - kind: unit
        ref: "tests/site-content.test.ts#keeps trust signals in about and contact content"
        status: pass
    human_judgment: false

plan_head_before: 169fba3f9f96350efff95a7fafa02ae4ab99ddfa
plan_head_after: 9e6e21ccb081104cdce13798933a89f71ca82476
commits: 2
duration: 9min
completed: 2026-11-26
status: complete
---

# Phase 1 Plan 1: Homepage positioning and trust Summary

**Problem-first homepage copy with a visual-first `Napisz` entry point, compact proof, and concise Tomasz trust signals.**

## Performance

- **Duration:** 9 min
- **Started:** 2026-11-26T13:05:00Z (approximate continuation start)
- **Completed:** 2026-11-26T13:14:37Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Replaced long, boastful first-viewport copy with direct operational problems and removed the competing lede from the drawing title block.
- Changed the compact form action to exactly `Napisz`, preserved validation, status feedback, honeypot and every existing contact payload key, and added render/payload tests.
- Shortened offer, product proof and About content; retained exactly the two approved public links (`Cavi`, `Akta`) and capped About at three trust points.

## Task Commits

1. **Task 1: End-to-end first viewport from problem recognition to `Napisz`** - `94aba91` (feat)
2. **Task 2: Problem-first oferta, kompaktowy proof i krótkie About** - `9e6e21c` (refactor)

## Files Created/Modified

- `src/content/site.ts` - concise Polish brand, offer, proof and About source content.
- `src/components/home/home-sheets.tsx` - visual-first drawing title, compact proof and short author rendering.
- `src/components/home/title-block-form.tsx` - concrete examples and exact `Napisz` submit label.
- `tests/homepage-copy.test.tsx` - first-viewport and unchanged-payload render tests.
- `tests/site-content.test.ts` - offer, proof, lowercase brand and About invariants.

## Decisions Made

- Keep the drawing as the first-viewport visual anchor and let the form carry problem examples.
- Keep private proof anonymous and unlinked, with no new products, routes or claims.
- Preserve the existing contact API boundary for Phase 2 to handle any form structure decisions.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- The executor started on protected `main`; work was safely continued on `agent-01-01` so task commits satisfy the branch safety contract.
- The jsdom test environment exposed Node's `FormData` constructor; the new payload test temporarily uses the jsdom implementation while invoking the existing submit handler, without changing production code.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

The homepage positioning and trust copy are ready for the dependent contact-conversion plan. The API contract, validation, honeypot, rate limiting, escaping and server/client boundaries remain unchanged.

## Self-Check: PASSED

- Summary file exists at the planned phase path.
- Task commits `94aba91` and `9e6e21c` are ancestors of the current HEAD.

---
*Phase: 01-homepage-positioning-and-trust*
*Completed: 2026-11-26*
