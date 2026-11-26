---
phase: 02-contact-conversion
plan: 02
subsystem: ui
tags: [nextjs, react, contact-form, accessibility, testing]
requires:
  - 02-01
provides:
  - "Spójny czteropolowy formularz pełny i skrócony"
  - "Dostępne statusy i regresje CTA bez selektorów kwalifikacyjnych"
affects: [phase-03-brand-product-proof]

actuals:
  tokens: 2200
  tasks: 2
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Compact and full contact forms share the exact four-field payload"
    - "Component tests assert accessible labels, order, live status and pending copy"

key-files:
  created: []
  modified:
    - src/components/home/title-block-form.tsx
    - tests/contact-form.test.tsx
    - tests/homepage-copy.test.tsx

key-decisions:
  - "Skrócony formularz ma także opcjonalne pole Firma, zgodne z pełnym formularzem."
  - "Oba formularze nie pokazują ani nie serializują pól service/SupportFlow."
  - "Status wysyłania pozostaje Wysyłanie… w jednym regionie role=status aria-live=polite."

requirements-completed: [REQ-contact-form-friction]

plan_head_before: 4f9d1a3a391868a10a315f34f362b8a0c68bc8e6
plan_head_after: 4e148c1423d31262298d2e6c6d4528bcf1d7c1f1
commits: 3
completed: 2026-11-26
status: complete
---

# Phase 2 Plan 2: Unified contact forms Summary

**Spójne, niskotarciowe formularze kontaktowe z opcjonalną firmą, CTA `Napisz` i dostępnymi statusami.**

## Accomplishments

- Dodano opcjonalne pole `Firma` do skróconego formularza homepage i usunięto pozostałe pola kwalifikacyjne z jego payloadu.
- Zachowano cztery zatwierdzone pola (`name`, `email`, `company`, `message`) oraz `bot_field` w obu formularzach.
- Dodano testy kolejności kontrolek, braku pól kwalifikacyjnych i widocznego stanu `Wysyłanie…`.
- Zachowano istniejący endpoint, walidację, honeypot, rate limiting, escaping i granice Server/Client.

## Task Commits

1. **Unify full and compact form experience** — `26ca946`
2. **Lock accessible copy and interaction invariants** — `2228378`
3. **Fix typed fetch test mock** — `4e148c1`

## Verification

- `npx tsx --test tests/contact-form.test.tsx tests/homepage-copy.test.tsx` — 10 passed
- `npx tsx --test tests/*.test.ts tests/*.test.tsx` — 83 passed
- `pnpm lint` — passed
- `pnpm build` — passed
- `git diff --check` — passed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Type error] Typed the fetch test mock parameters.**
- **Found during:** full production build
- **Issue:** TypeScript reported implicit `any` parameters in a new test mock.
- **Fix:** Added `RequestInfo | URL` and `RequestInit` annotations.
- **Files modified:** `tests/contact-form.test.tsx`
- **Commit:** `4e148c1`

## Threat Surface

No new endpoints, auth paths, file access patterns or schema boundaries were introduced.

## Self-Check: PASSED

- Summary file exists at the planned phase path.
- Task commits `26ca946`, `2228378` and `4e148c1` are ancestors of the current HEAD.
- Existing unrelated `.gitignore` and `__pycache__` changes remain untouched.
