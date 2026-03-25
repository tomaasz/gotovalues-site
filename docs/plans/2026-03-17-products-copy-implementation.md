# Products Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reposition the products page as proof for buyers evaluating custom tools, workflow systems, and practical AI implementations.

**Architecture:** Keep the current products page and card component structure. Update the metadata and section copy in `src/app/produkty/page.tsx`, then rewrite product summaries and impact text in `src/content/site.ts` so every card speaks in business/process language.

**Tech Stack:** Next.js App Router, TypeScript, Node test runner

---

### Task 1: Rewrite products-page framing copy

**Files:**
- Modify: `src/app/produkty/page.tsx`
- Modify: `src/app/layout.tsx`

**Steps:**
1. Tighten metadata description to match the new target segment.
2. Rewrite the products-page hero and section headings around proof, workflow, documents, and process support.
3. Add one clearer note for private implementations so buyers understand why they matter.

### Task 2: Rewrite product cards in business language

**Files:**
- Modify: `src/content/site.ts`

**Steps:**
1. Rephrase public product summaries so they read as proof of tool-building ability.
2. Rephrase private product summaries and impacts around operational value, document handling, and workflow design.
3. Keep all claims grounded in the real project scope already represented on the page.

### Task 3: Verify and redeploy

**Files:**
- Modify: none

**Steps:**
1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Run `npm run cf:build`.
5. Deploy with `npm run cf:deploy`.
