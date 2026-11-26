---
phase: 01-homepage-positioning-and-trust
plan: 02
subsystem: ui
tags: [nextjs, react, contact-form, accessibility, testing]
requires:
  - 01-01
provides:
  - "Jedno krótkie zaproszenie do opisania procesu w kontakcie"
  - "Spójne CTA Napisz i statusy wysyłki w obu formularzach"
  - "Zachowany payload /api/contact i semantyka dostępności formularza"
affects: [phase-02-contact-conversion]

actuals:
  tokens: 3800
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Contact copy remains concise and problem-first"
    - "Both forms keep stable field names and live status regions"

key-files:
  created: []
  modified:
    - src/content/site.ts
    - src/components/contact-form.tsx
    - src/components/home/home-sheets.tsx
    - src/components/home/title-block-form.tsx
    - tests/contact-form.test.tsx
    - tests/homepage-copy.test.tsx

key-decisions:
  - "Kontakt zaczyna się od jednego krótkiego opisu procesu, bez dodatkowych obietnic."
  - "Oba formularze używają dokładnie CTA Napisz oraz komunikatu Wysyłanie…."
  - "Payload, walidacja, honeypot, rate limiting, escaping i granice Server/Client pozostają bez zmian."

requirements-completed: [REQ-homepage-conversion]

plan_head_before: b642138e9bf453ea86730bda5a4fd42389be8bcc
plan_head_after: a170d34
commits: 2
duration: 12m
completed: 2026-11-26
status: complete
---

# Phase 1 Plan 2: Contact conversion Summary

**Spójna, krótka ścieżka kontaktu z CTA `Napisz`, przykładami problemów i zachowanym kontraktem API.**

## Performance

- **Tasks:** 2
- **Commits:** 2
- **Plan base:** `b642138`

## Accomplishments

- Skrócono intro kontaktu i nagłówek sekcji do jednego konkretnego procesu.
- Ujednolicono CTA pełnego i skróconego formularza do `Napisz`; stan wysyłki brzmi `Wysyłanie…`.
- Zachowano istniejące pola, serializację payloadu, walidację, honeypot i endpoint `/api/contact`.
- Dodano status `role="status"` i `aria-live="polite"` do obu ścieżek oraz testy CTA, przykładów i payloadu.

## Task Commits

1. **Task 1: End-to-end contact path from one problem prompt to existing API** — `16127eb`
2. **Task 2: Spójność CTA, statusów i dostępności całej ścieżki** — `a170d34`

## Verification

- `npx tsx --test tests/contact-form.test.tsx tests/contact.test.ts` — 13 passed
- `npx tsx --test tests/homepage-copy.test.tsx tests/contact-form.test.tsx tests/contact.test.ts` — 17 passed
- `npx tsx --test tests/*.test.ts tests/*.test.tsx` — 80 passed
- `pnpm lint` — passed
- `pnpm build` — passed
- `git diff --check` — passed

## Deviations from Plan

None — plan executed exactly as written.

## Threat Surface

No new endpoints, auth paths, file access patterns or schema changes were introduced.

## Self-Check: PASSED

- Summary file exists at the planned phase path.
- Task commits `16127eb` and `a170d34` are ancestors of the current HEAD.
- Existing unrelated `.pyc` and `.gitignore` changes remain untouched.
