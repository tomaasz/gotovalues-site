# Phase 2: Contact conversion - Research

**Researched:** 2026-11-26
**Domain:** Low-friction contact form conversion in Next.js 16 App Router
**Confidence:** HIGH for repository architecture; MEDIUM for conversion recommendations

## User Constraints

Phase 2 inherits the approved product direction from Phase 1: keep the homepage sparse and problem-first; make the form the place where a visitor describes one concrete operational problem; use the exact primary CTA `Napisz`; keep Polish user-facing copy; preserve the existing Next.js App Router, typed `siteContent`, visual homepage composition, and safe `/api/contact` boundary. Do not add ERP-replacement claims, unsupported metrics, a new services page, or a new public product route. The unresolved `service` selector decision is explicitly deferred to this phase.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REQ-contact-form-friction | The contact form uses first name, email, optional company, and one main message field with low-friction helper and success copy and a simple email payload. | Existing client form, Zod schema, email builder, and API route already form a complete seam; the phase should remove unnecessary classification fields while preserving validation, escaping, spam controls, and accessible feedback. |

## Summary

The current contact path is a client component that serializes browser `FormData` to `/api/contact`; the route validates with the existing Zod schema, applies a bounded in-memory rate limit and honeypot, then builds escaped plain-text/HTML mail for Resend. The low-friction direction already documented in the repository is to retain `Imię`, `E-mail`, optional `Firma`, and one main message, while removing the `service` classification step. [VERIFIED: src/components/contact-form.tsx:1-83,85-219; src/lib/contact.ts:5-15,17-68; src/app/api/contact/route.ts:13-139] 

The implementation must be a coordinated frontend/schema/email/test change. Removing a field only from the UI would leave stale payload assumptions; removing it only from the schema would permit confusing email output. Keep the existing API endpoint and error response shape, retain `supportSystem`, `weeklyTicketVolume`, and `pilotInterest` only if the phase explicitly decides they remain useful; the approved CRO source plan recommends the simpler first-contact model and identifies the selector as unnecessary before a conversation. [VERIFIED: docs/plans/2026-03-17-contact-form-cro-design.md:25-64; docs/plans/2026-03-17-contact-form-cro-implementation.md:7-55]

**Primary recommendation:** remove the unnecessary service/classification input end-to-end, keep four visible inputs (`Imię`, `E-mail`, optional `Firma`, `message`), and verify exact payload/email, accessible labels/statuses, and security invariants with focused tests plus the full suite.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Form fields, helper copy, native constraints, pending/success/error UI | Browser / Client | Frontend Server | `ContactForm` owns local state and browser `FormData`; it must remain an interactive leaf. [VERIFIED: src/components/contact-form.tsx:1-83,85-219] |
| Payload schema and normalization | API / Backend | Browser / Client | `contactFormSchema` is the authoritative server boundary; client labels must not be trusted for validation. [VERIFIED: src/lib/contact.ts:5-15; src/app/api/contact/route.ts:65-82] |
| Email subject/body and HTML escaping | API / Backend | External mail service | `buildContactEmail` converts validated data into readable text/HTML and escapes user-controlled values. [VERIFIED: src/lib/contact.ts:17-68] |
| Rate limiting, honeypot, generic API errors | API / Backend | CDN/edge | The route owns abuse controls and must remain stable while form friction changes. [VERIFIED: src/app/api/contact/route.ts:13-63,85-139] |
| Regression and accessibility behavior | Test/runtime | Browser / Client | Node tests render the component and invoke the form action; browser smoke checks remain useful for real focus and network transitions. [VERIFIED: tests/contact-form.test.tsx:1-124; package.json:5-18] |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | `16.4.6` | App Router and route handler | Existing application framework; no migration is justified. [VERIFIED: package.json:5-21] |
| React | `19.3.1` | Client form component and state | Existing UI runtime. [VERIFIED: package.json:22-25] |
| Zod | `^4.6.7` | Server-side schema validation | Existing authoritative contact schema. [VERIFIED: package.json:20-21; src/lib/contact.ts:1-15] |
| Node test runner + tsx | `tsx ^4.23.15` | Fast component/API regression tests | Existing `npm test` script and test files. [VERIFIED: package.json:5-18] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@testing-library/react` | `^16.3.3` | Accessible component queries | Use for labels, button names, live region, and rendered form behavior. [VERIFIED: package.json:26-38; tests/contact-form.test.tsx:1-53] |
| Resend | `^6.38.0` | Existing mail delivery boundary | Keep route integration unchanged; tests mock delivery. [VERIFIED: package.json:16-21; src/app/api/contact/route.ts:106-139] |

No new package is required. Installation: none.

## Architecture Patterns

### System Architecture Diagram

```text
Visitor browser
  -> ContactForm (labels + native required/type constraints + pending state)
  -> FormData serialization (name, email, company, message, bot_field)
  -> POST /api/contact
  -> rate limit + JSON parse + Zod schema + honeypot
  -> buildContactEmail (plain text + escaped HTML)
  -> Resend
  -> generic JSON success/error response
  -> role=status / aria-live feedback in browser
```

### Pattern 1: One problem, four visible inputs

**What:** Ask for the minimum context needed to start a human conversation: first name, email, optional company, and one free-text problem description. [CITED: docs/plans/2026-03-17-contact-form-cro-design.md]

**When to use:** First-contact forms where the visitor may understand their operational pain but not the provider's service taxonomy.

**Example:** Keep `name`, `email`, `company`, and `message` in the request; remove `service` and any equivalent classification control from UI, client payload, schema, and email rendering.

### Pattern 2: Preserve the API boundary

**What:** Keep the existing POST route, generic error messages, server-side schema validation, honeypot, rate limiter, and escaped mail builder. [VERIFIED: src/app/api/contact/route.ts:13-139; src/lib/contact.ts:5-68]

**When to use:** Any copy or friction change that does not require a transport redesign.

### Pattern 3: Accessible native form feedback

**What:** Preserve visible `<label>` elements tied to stable `id`/`name`, native `required` and input types, disabled pending submit, and one `role="status"` region with `aria-live="polite"`. [VERIFIED: src/components/contact-form.tsx:85-219; tests/contact-form.test.tsx:44-53]

**When to use:** All success, validation, network-error, and rate-limit states.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Server validation | Client-only parsing or duplicated ad-hoc checks | Existing `contactFormSchema` in `src/lib/contact.ts` | The API must reject direct or malformed POSTs consistently. |
| HTML mail safety | Raw interpolation of visitor text | Existing `escapeHtml` in `buildContactEmail` | Prevents user-controlled values from becoming HTML. |
| Spam controls | New CAPTCHA or alternate limiter for this phase | Existing honeypot and bounded rate limiter | Security behavior is already covered and outside conversion scope. |
| Form state machine | New form library or server-action rewrite | Existing `useState`, `fetch`, and live status region | Avoids changing framework boundaries and payload contracts unnecessarily. |

## Common Pitfalls

### Pitfall 1: Removing a field only from the visual form
**What goes wrong:** UI and schema/email disagree; stale values remain in tests or generated mail.
**How it happens:** The form, schema, email builder, and route are separate files.
**How to avoid:** Update all four layers in one tracer task and assert absence/presence in payload and email tests.
**Warning signs:** TypeScript accepts a field that the UI no longer renders, or tests still expect a service label.

### Pitfall 2: Keeping qualification fields that recreate the sales brief
**What goes wrong:** The first contact still feels like screening instead of a short note to a person.
**How to avoid:** Treat `supportSystem`, volume, and pilot qualification as explicit scope decisions; the CRO plan's approved baseline is the four-field form.

### Pitfall 3: Breaking accessibility while shortening copy
**What goes wrong:** Short labels lose association, status becomes invisible to assistive technology, or the pending button has no clear name.
**How to avoid:** Query by accessible label/name in tests and preserve `role=status`, `aria-live=polite`, `aria-atomic=true`, focus styles, and stable ids.

### Pitfall 4: Weakening security while simplifying payload
**What goes wrong:** A direct POST bypasses client checks, or HTML email becomes injectable.
**How to avoid:** Keep Zod, `bot_field`, rate limiting, generic server errors, and `escapeHtml`; add regression assertions rather than moving logic client-side.

## Code Examples

### Contact schema shape

```typescript
// Source: src/lib/contact.ts:5-15 (opened this session)
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Podaj imię.').max(100, 'Imię jest za długie.'),
  email: z.string().trim().email('Podaj poprawny adres e-mail.').max(255, 'E-mail jest za długi.'),
  company: z.string().trim().max(120).optional().default(''),
  supportSystem: z.string().trim().max(120).optional().default(''),
  weeklyTicketVolume: z.string().trim().max(60).optional().default(''),
  pilotInterest: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(20, 'Opisz krótko, czego potrzebujesz.').max(5000, 'Wiadomość jest za długa.'),
  bot_field: z.string().max(0, 'Spam detected').optional().default(''),
});
```

The phase plan must decide whether the three SupportFlow qualification fields remain optional or are removed as part of the low-friction requirement; do not silently change them without updating email and tests. [VERIFIED: src/lib/contact.ts:5-15]

### Existing submission boundary

```typescript
// Source: src/components/contact-form.tsx:37-48 (opened this session)
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

## Project Constraints (from AGENTS.md)

- Keep Next.js 16 App Router route handlers in `src/app/api/`; use Server Components by default and isolate client behavior in interactive leaves.
- Preserve lowercase `gotovalues` in user-facing marketing copy and exactly two public linked products, Cavi and Akta.
- Do not expose secrets or `.env` values in source, tests, planning docs, or Obsidian.
- Preserve unrelated working-tree changes; do not use destructive blanket restore/clean commands.
- After implementation run `npx tsx --test tests/*.test.ts tests/*.test.tsx` and `pnpm lint`; phase plans also require `pnpm build` and `git diff --check`.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node test runner via `tsx --test`, Testing Library + jsdom for component tests |
| Config file | `package.json` scripts; jsdom imported in component tests |
| Quick run command | `npx tsx --test tests/contact.test.ts tests/contact-form.test.tsx` |
| Full suite command | `npx tsx --test tests/*.test.ts tests/*.test.tsx` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|---------|----------|-----------|-------------------|--------------|
| REQ-contact-form-friction | Renders only the intended low-friction fields with accessible labels and `Napisz` | component | `npx tsx --test tests/contact-form.test.tsx` | ✅ |
| REQ-contact-form-friction | Exact accepted payload and readable email include name/email/company/message and exclude removed classification | unit/integration | `npx tsx --test tests/contact.test.ts tests/contact-api.test.ts` | ✅ |
| REQ-contact-form-friction | Success, validation, network, honeypot, and rate-limit feedback remain understandable | component/API | `npx tsx --test tests/contact-form.test.tsx tests/contact-api.test.ts` | ✅ |

### Sampling Rate
- **Per task commit:** `npx tsx --test tests/contact.test.ts tests/contact-form.test.tsx`
- **Per wave merge:** `npx tsx --test tests/*.test.ts tests/*.test.tsx`
- **Phase gate:** full suite, `pnpm lint`, `pnpm build`, and `git diff --check` before verification.

### Wave 0 Gaps
- No new test infrastructure required. Existing tests cover schema, email escaping, route behavior, and component status regions; add assertions for the chosen field contract before implementation.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | Public contact has no account authentication. |
| V3 Session Management | no | No session state is introduced. |
| V4 Access Control | no | Public route intentionally accepts anonymous contact requests. |
| V5 Input Validation | yes | Zod schema, native constraints, bounded lengths, honeypot. |
| V6 Cryptography | no | No cryptographic material is changed. |

### Known Threat Patterns for Next.js/React contact surfaces

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Direct malformed or oversized POST | Tampering / DoS | Preserve server Zod validation and bounded field lengths. |
| Bot submits hidden field | DoS | Preserve `bot_field` server validation and rate limiting. |
| Visitor text in HTML email | Tampering / XSS | Preserve `escapeHtml` for every user-controlled HTML value. |
| Error response leaks provider details | Information disclosure | Keep generic client-facing error messages and structured server logs. |

## Runtime State Inventory

This is a form contract/content change, not a rename or migration. No stored database records, OS registrations, external service configuration, or build artifacts contain the field contract as durable state. Mail environment variables remain unchanged; no secret values were read. [VERIFIED: src/app/api/contact/route.ts:85-104]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | tests/build | ✓ | `node >=20` declared; current runtime executed tests | — |
| pnpm | lint/build scripts | ✓ | commands available in this session | `npm run` equivalent if needed |
| Resend production credentials | real delivery | not required for local planning/tests | — | route tests mock delivery; manual production smoke test later |

## Sources

### Primary (HIGH confidence)
- `src/components/contact-form.tsx`, `src/lib/contact.ts`, `src/app/api/contact/route.ts` — source-of-truth implementation opened this session.
- `tests/contact.test.ts`, `tests/contact-form.test.tsx`, `tests/contact-api.test.ts` — current regression expectations.
- `package.json` — scripts and pinned framework/library versions.

### Secondary (MEDIUM confidence)
- `docs/plans/2026-03-17-contact-form-cro-design.md` — approved repository planning document recommending removal of the service selector.
- `docs/plans/2026-03-17-contact-form-cro-implementation.md` — implementation decomposition for the same direction.
- `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, and Phase 1 artifacts — current project constraints and deferred selector decision.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Phase 2 implementation should remove `service` and may also remove the three optional SupportFlow qualification fields to satisfy the strict four-field requirement. | Summary, Code Examples | Removing qualification data could affect downstream pilot triage; lock this explicitly during planning/discussion before implementation. |
| A2 | No real Resend delivery is needed during local execution. | Environment Availability | Production smoke testing would need credentials and a safe test recipient. |

## Open Questions

1. **Should `supportSystem`, `weeklyTicketVolume`, and `pilotInterest` remain optional hidden/secondary context, or should Phase 2 remove them entirely?**
   - What we know: The v1 requirement names only first name, email, optional company, and one main message; the existing schema and email include three optional qualification fields. [VERIFIED: .planning/REQUIREMENTS.md:14-16; src/lib/contact.ts:5-15]
   - Recommendation: Lock the strict four-field form for first contact unless pilot qualification is an explicit business need; if retained, keep them visibly secondary and update tests to prove the main path remains low friction.
2. **What exact replacement should be used for the unresolved `service` selector?**
   - What we know: The approved CRO design says remove it; an older copy plan suggests making it easier to understand. [CITED: docs/plans/2026-03-17-contact-form-cro-design.md; docs/plans/2026-03-17-homepage-conversion-copy-implementation.md]
   - Recommendation: Prefer removal because it aligns with the current phase requirement and avoids asking visitors to classify their problem.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions and scripts verified in `package.json`.
- Architecture: HIGH — client/API/schema/email seams opened this session.
- Pitfalls: HIGH — derived from current tests, security controls, and prior implementation notes.
- Conversion recommendation: MEDIUM — based on repository's approved CRO plan, not an external experiment.

**Research date:** 2026-11-26
**Valid until:** 2026-12-26 for stable repository architecture; reconfirm copy decisions if requirements change.
