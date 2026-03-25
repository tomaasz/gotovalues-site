# gotovalues Brand And Products Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the approved `gotovalues` rebrand and rebalance the products page toward a more product-first visual hierarchy.

**Architecture:** Keep the existing Next.js structure and data model. Centralize the active brand string in content, update all current UI/mail metadata references, then adjust shared CSS so the change lands consistently across homepage, products, and contact messaging.

**Tech Stack:** Next.js App Router, TypeScript, CSS, Node test runner, Cloudflare Workers via OpenNext

---

### Task 1: Document And Centralize Brand Name

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/app/layout.tsx`
- Modify: `README.md`
- Modify: `.env.example`

**Steps:**
1. Add a single exported active brand name in `src/content/site.ts`.
2. Point app metadata and docs to the same lowercase brand.
3. Update example sender display name to match the approved brand.

### Task 2: Rebrand Active UI And Email Copy

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/produkty/page.tsx`
- Modify: `src/lib/contact.ts`
- Modify: `src/app/api/contact/route.ts`
- Modify: `tests/contact.test.ts`
- Modify: `tests/site-content.test.ts`

**Steps:**
1. Replace hard-coded header brand labels with the content-driven brand.
2. Update products-page metadata and hero copy to the shorter approved wording.
3. Update generated email subject/body and default sender display name.
4. Tighten tests so the active lowercase brand stays covered.

### Task 3: Rebalance Typography And Product Cards

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/produkty/page.tsx`

**Steps:**
1. Reduce heading scale and soften shared display styling.
2. Turn the products hero into a contained surface with a shorter line length.
3. Make product cards visually stronger through padding, contrast, background, and shadow.
4. Improve supporting text and tag legibility without changing the overall palette.

### Task 4: Verify And Ship

**Files:**
- Modify: `.env.local` (local only)

**Steps:**
1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Run `npm run cf:build`.
5. Update local and Cloudflare `CONTACT_FROM_EMAIL` display name to `gotovalues`.
6. Deploy with `npm run cf:deploy`.
7. Verify `GET /produkty` on the live Workers URL returns `200`.
