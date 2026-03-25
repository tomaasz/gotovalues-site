# Homepage Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refocus the homepage copy around local production/processing firms that need custom tools for messy operational processes.

**Architecture:** Keep the current homepage structure and component layout. Update content-first strings in `src/content/site.ts`, then replace the remaining hard-coded homepage section text in `src/app/page.tsx` so the whole page tells one consistent story.

**Tech Stack:** Next.js App Router, TypeScript, Node test runner

---

### Task 1: Update the homepage content source

**Files:**
- Modify: `src/content/site.ts`

**Steps:**
1. Replace the hero eyebrow, headline, intro, and CTA labels with the approved campaign-oriented copy.
2. Rewrite the two offer pillar descriptions so they support the production/process audience.
3. Update the about text to reinforce practical implementation instead of general positioning.

### Task 2: Replace remaining hard-coded homepage copy

**Files:**
- Modify: `src/app/page.tsx`

**Steps:**
1. Update hero-side panel text to reflect process discovery, MVP scope, and operational rollout.
2. Rewrite section headings for offer, products, about, and contact to align with the approved positioning.
3. Update about-point and contact-bullet text so the page speaks to client pain, not recruiter value.

### Task 3: Verify the page still builds cleanly

**Files:**
- Modify: none

**Steps:**
1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
