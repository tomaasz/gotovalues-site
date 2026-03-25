# Production Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a focused landing page at `/dla-produkcji` for cold outreach into production and processing companies.

**Architecture:** Reuse the current marketing-site layout language, section classes, contact form, and product proof components. Keep the page specific in copy and simple in implementation: one new route, optional shared content additions, and light test coverage for any new content invariants.

**Tech Stack:** Next.js App Router, React, TypeScript, existing CSS utilities, Node test runner

---

### Task 1: Add landing-page content source

**Files:**
- Modify: `src/content/site.ts`
- Test: `tests/site-content.test.ts`

**Step 1: Add a structured content object for the production landing page**

- hero eyebrow, headline, intro, CTA
- symptom bullets
- solution cards
- proof framing
- process steps
- CTA copy

**Step 2: Add lightweight tests for content invariants**

- route-facing content mentions production context
- CTA stays focused on one concrete process

### Task 2: Implement the `/dla-produkcji` page

**Files:**
- Create: `src/app/dla-produkcji/page.tsx`

**Step 1: Build the page with existing components and section classes**

- header with minimal nav
- hero
- symptom section
- solution section
- proof section using existing `ProductCard`
- process section
- contact section using `ContactForm`

**Step 2: Add route metadata**

- title and description aligned to production/process-document positioning

### Task 3: Verify visual and copy coherence

**Files:**
- Modify if needed: `src/app/globals.css`

**Step 1: Only add CSS if the route cannot be expressed cleanly with existing utilities**

- keep changes minimal
- no bespoke heavy layout unless blocked

### Task 4: Verify the pass

**Files:**
- No file changes required

**Step 1: Run tests**

Run: `npm test`
Expected: all tests pass with `0` failures

**Step 2: Run lint**

Run: `npm run lint`
Expected: exit code `0`

**Step 3: Run production build**

Run: `npm run build`
Expected: exit code `0`
