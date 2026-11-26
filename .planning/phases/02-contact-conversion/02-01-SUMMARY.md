---
phase: 02-contact-conversion
plan: 01
subsystem: contact
tags: [contact-form, zod, api, resend, security, testing]
requires: []
provides:
  - "Czteropolowy kontrakt kontaktu z opcjonalną firmą i honeypotem"
  - "Usunięcie starych pól klasyfikujących z formularza, schema i e-maila"
  - "Regresje API, walidacji, rate limitingu, honeypota i escapingu"
affects: [02-02-PLAN.md]
tech-stack:
  added: []
  patterns:
    - "Zod strict schema rejects retired payload keys"
    - "Existing /api/contact transport and generic errors remain unchanged"
key-files:
  created: []
  modified:
    - src/components/contact-form.tsx
    - src/lib/contact.ts
    - tests/contact-form.test.tsx
    - tests/contact.test.ts
    - tests/contact-api.test.ts
decisions:
  - "Retain only name, email, optional company, message and bot_field."
  - "Reject retired classification fields at the authoritative schema boundary."
  - "Preserve endpoint, validation bounds, honeypot, rate limiting, escaping and generic errors."
actuals:
  tokens: 4200
  tasks: 2
  commits: 2
commits: 2
plan_head_before: 554f84a04c5432cceeca30e890f0593d262431be
plan_head_after: e9fb20a
completed: 2026-11-26
status: complete
---

# Phase 2 Plan 1: Four-field contact contract Summary

**Low-friction contact schema and email boundary with retired qualification fields removed and security controls preserved.**

## Accomplishments

- Removed `supportSystem`, `weeklyTicketVolume`, `pilotInterest` and any equivalent public classification input from the full contact form.
- Removed the same fields from the Zod schema and generated plain-text/HTML email.
- Made the schema strict so stale qualification keys are rejected rather than silently accepted.
- Added tests for exact normalized keys, stale-field rejection, readable email output, escaping and existing API error/security responses.

## Task Commits

1. `abcfc92` — simplify contact contract
2. `e9fb20a` — lock contact boundary regressions

## Verification

- `npx tsx --test tests/contact-form.test.tsx tests/contact.test.ts tests/contact-api.test.ts` — 22 passed

## Deviations from Plan

None — plan executed as written.

## Threat Surface

No new endpoints, auth paths, file access patterns or external dependencies were introduced.

## Self-Check: PASSED

- Summary exists at the planned path.
- Both task commits are ancestors of the current HEAD.
- Unrelated `.gitignore` and `__pycache__` changes remain untouched.
