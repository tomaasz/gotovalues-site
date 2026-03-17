# Contact Form CRO Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce homepage form friction so more visitors send a contact message.

**Architecture:** Keep the existing homepage layout and API route. Simplify the contact form by removing the service selector, shortening the first field, and updating validation plus email payload generation to match the lighter input model.

**Tech Stack:** Next.js App Router, React, TypeScript, Zod, Node test runner

---

### Task 1: Simplify the frontend form

**Files:**
- Modify: `src/components/contact-form.tsx`

**Step 1: Remove the service field from the payload**

- stop reading `service` from `FormData`

**Step 2: Simplify visible fields and microcopy**

- rename `Imię i nazwisko` to `Imię`
- keep `E-mail`
- keep optional `Firma`
- remove the select input entirely
- keep one main textarea with lower-friction guidance
- update button and helper text for easier submission

### Task 2: Simplify schema and email payload

**Files:**
- Modify: `src/lib/contact.ts`
- Modify: `src/app/api/contact/route.ts`

**Step 1: Remove `service` from the schema**

- update `ContactFormData`
- remove service labels and helpers

**Step 2: Rewrite email subject and body**

- make the subject independent of service
- keep name, email, company, and message readable
- keep the route response compatible with the updated success messaging

### Task 3: Update tests

**Files:**
- Modify: `tests/contact.test.ts`

**Step 1: Update invalid and valid payload fixtures**

- remove `service`
- keep coverage for validation and readable email output

**Step 2: Verify new email subject/body expectations**

- assert the simplified subject
- assert name, email, company, and message still appear in payloads

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
