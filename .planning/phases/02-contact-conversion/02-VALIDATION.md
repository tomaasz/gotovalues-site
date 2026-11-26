# Phase 2 validation contract

## Requirement coverage

| Requirement | Observable behavior | Automated check |
|---|---|---|
| REQ-contact-form-friction | Only name, email, optional company, message and hidden bot field are submitted | `npx tsx --test tests/contact-form.test.tsx tests/contact.test.ts tests/contact-api.test.ts` |
| REQ-contact-form-friction | Generated email contains readable context and no removed classification fields | `npx tsx --test tests/contact.test.ts tests/contact-api.test.ts` |
| REQ-contact-form-friction | Success, validation, network, honeypot and rate-limit feedback remain understandable | `npx tsx --test tests/contact-form.test.tsx tests/contact-api.test.ts` |

## Phase gate

`npx tsx --test tests/*.test.ts tests/*.test.tsx`, `pnpm lint`, `pnpm build`, and `git diff --check` must pass.

## Threat refs

- T-02-01: direct malformed or oversized POST — retain Zod bounds and API validation.
- T-02-02: spam submission — retain `bot_field` and rate limiting.
- T-02-03: HTML email injection — retain `escapeHtml` in mail builder.
- T-02-04: information leakage — preserve generic client errors and structured server logs.
