---
phase: "01"
slug: "homepage-positioning-and-trust"
status: draft
nyquist_compliant: false
wave_0_complete: false
created: "2026-11-26"
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `tsx` / Node test runner + Testing Library for React components |
| **Config file** | `vitest.config.ts` exists for browser-oriented tests; phase checks use the existing `tsx` test command |
| **Quick run command** | `npx tsx --test tests/site-content.test.ts tests/contact-form.test.tsx` |
| **Full suite command** | `npx tsx --test tests/*.test.ts tests/*.test.tsx` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsx --test tests/site-content.test.ts tests/contact-form.test.tsx`.
- **After every plan wave:** Run `npx tsx --test tests/*.test.ts tests/*.test.tsx` and `pnpm lint`.
- **Before `$gsd-verify-work`:** Full suite, lint and `pnpm build` must be green.
- **Max feedback latency:** 60 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | REQ-homepage-positioning | T-01-01 / T-01-02 | Existing contact serialization and server boundary remain unchanged while first-viewport copy changes. | component + content | `npx tsx --test tests/homepage-copy.test.tsx tests/site-content.test.ts` | ⚠️ W0 create/update | ⬜ pending |
| 01-01-02 | 01 | 1 | REQ-about-trust | T-01-03 | Content contains only public, evidence-backed trust signals and no secrets or invented customer details. | content | `npx tsx --test tests/site-content.test.ts tests/homepage-copy.test.tsx` | ✅ / ⚠️ update | ⬜ pending |
| 01-02-01 | 02 | 2 | REQ-homepage-conversion | T-01-04 / T-01-05 | Existing field names, payload, honeypot and API boundary remain intact. | component + API contract | `npx tsx --test tests/contact-form.test.tsx tests/contact.test.ts` | ✅ / ⚠️ update | ⬜ pending |
| 01-02-02 | 02 | 2 | REQ-homepage-conversion | T-01-06 / T-01-07 | Public copy contains no secrets; labels, live status and next-step errors stay accessible. | component + content | `npx tsx --test tests/homepage-copy.test.tsx tests/contact-form.test.tsx tests/contact.test.ts` | ⚠️ W0 create/update | ⬜ pending |

---

## Wave 0 Requirements

- [ ] `tests/homepage-copy.test.tsx` — add focused render assertions for the visual first viewport, exact `Napisz` CTA, short examples, section headings and Server Component composition.
- [ ] `tests/site-content.test.ts` — update existing assertions for concise About (maximum three trust points), problem-first offer, lowercase `gotovalues` and exactly two linked public products.
- [ ] `tests/contact-form.test.tsx` — extend existing component tests for labels, examples, status/live feedback and the unchanged JSON payload.
- [ ] Existing `tsx` and Testing Library dependencies — already present; no installation is needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|-----------|-------------------|
| Working-drawing visual hierarchy, keyboard focus visibility and responsive sheet order remain intact after copy shortening. | REQ-homepage-positioning / REQ-homepage-conversion | Pixel/layout and keyboard feel are not fully captured by the Node render tests. | Open the homepage at desktop and narrow viewport widths, tab through both forms, confirm the drawing remains the dominant first viewport, focus remains visible and no sheet loses its intended order. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies.
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify.
- [ ] Wave 0 covers all MISSING references.
- [ ] No watch-mode flags.
- [ ] Feedback latency < 60s.
- [ ] `nyquist_compliant: true` set in frontmatter after execution and validation.

**Approval:** pending
