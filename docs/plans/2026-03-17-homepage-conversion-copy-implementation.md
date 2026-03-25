# Homepage Conversion Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve homepage conversion copy for lead generation among operational and production-oriented companies without changing layout.

**Architecture:** Keep the current page structure and component boundaries intact. Move the conversion improvement through copy updates in shared content objects, homepage section framing, and contact form microcopy.

**Tech Stack:** Next.js App Router, TypeScript, React, Node test runner

---

### Task 1: Rewrite homepage content sources

**Files:**
- Modify: `src/content/site.ts`
- Test: `tests/site-content.test.ts`

**Step 1: Update brand, offer, products, and about copy**

- tighten the hero eyebrow, headline, intro, and CTA labels
- sharpen offer pillar descriptions around operational pain and outcomes
- improve homepage-facing product proof copy
- strengthen the about copy as process-first positioning

**Step 2: Add or update assertions in `tests/site-content.test.ts` if needed**

- keep existing structural checks
- add lightweight assertions only for any newly important content invariants

### Task 2: Rewrite homepage section framing

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Update homepage section headings and support copy**

- hero panel labels
- offer section heading
- products section heading and link label
- about section heading
- contact section heading and supporting bullets

### Task 3: Improve contact form microcopy

**Files:**
- Modify: `src/components/contact-form.tsx`
- Modify: `src/lib/contact.ts`
- Test: `tests/contact.test.ts`

**Step 1: Update labels, placeholders, select options, helper text, button label, and success message framing**

- bias toward describing one concrete process or bottleneck
- make the service selector easier to understand for a non-technical buyer

**Step 2: Keep form payload readable**

- if service labels change, update email payload expectations in tests

### Task 4: Verify the pass

**Files:**
- No file changes required

**Step 1: Run tests**

Run: `npm test`
Expected: `6/6` passing or updated total with `0` failures

**Step 2: Run lint**

Run: `npm run lint`
Expected: exit code `0`

**Step 3: Run production build**

Run: `npm run build`
Expected: exit code `0`
