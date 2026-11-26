# Phase 1: Homepage positioning and trust - Pattern Map

**Mapped:** 2026-11-26  
**Files analyzed:** 8 likely modified/preserved files  
**Analogs found:** 8 / 8

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/content/site.ts` | content/config module | transform/static data | existing `siteContent` object in same file | exact |
| `src/components/home/home-sheets.tsx` | server components | request-response/static render | existing sheet components in same file | exact |
| `src/components/home/title-block-form.tsx` | client component | request-response | existing compact form in same file | exact |
| `src/components/contact-form.tsx` | client component | request-response | existing full form in same file | exact |
| `src/app/page.tsx` | route/page composition | request-response/static render | existing `HomePage` in same file | exact |
| `src/lib/contact.ts` | validation/service utility | transform/request-response | existing schema and email builder in same file | exact (preserve) |
| `src/app/api/contact/route.ts` | route handler | request-response | existing POST handler in same file | exact (preserve) |
| `tests/site-content.test.ts` / `tests/contact.test.ts` | tests | batch/assertion | existing node:test suites | exact |

## Pattern Assignments

### `src/content/site.ts` (content/config, static transform)

**Analog:** current typed `siteContent` object, `src/content/site.ts:27-48,49-82,174-228`.

**Imports and typing pattern** (`src/content/site.ts:1-25`):

```typescript
export const brandName = "gotovalues";

type OfferPillar = { title: string; description: string; bullets: string[] };
export type ProductCard = {
  name: string;
  category: "public" | "private";
  summary: string;
  stack: string[];
  impact: string;
  url?: string;
  screenshot: { src: string; alt: string };
};
```

**Core content pattern** (`src/content/site.ts:27-48,174-208,210-228`): keep homepage copy as one exported object, with nested semantic sections and `satisfies` checks for arrays. Update strings in this source rather than duplicating them in page composition.

**Constraints to preserve:** lowercase `brandName`; exactly two linked public products; About remains identity + short evidence; contact intro/signals remain structured data.

### `src/components/home/home-sheets.tsx` (server component, static render)

**Analog:** existing `DrawingSheet`, `PartsListSheet`, `ProofSheet`, `AuthorSheet`, and `ContactSheet`, `src/components/home/home-sheets.tsx:21-72,74-129,132-190,193-223,247-278`.

**Imports pattern** (`lines 1-8`):

```typescript
import Image from 'next/image';
import Link from 'next/link';
import { ContactFormLazy } from '@/components/contact-form-lazy';
import { ProcessDrawing } from '@/components/home/process-drawing';
import { TitleBlockForm } from '@/components/home/title-block-form';
import { siteContent } from '@/content/site';
```

**Core rendering pattern** (`lines 22-49,75-104,194-220,248-275`): destructure the relevant `siteContent` section, render semantic sheet sections, and map arrays into existing table/list markup. Keep `page.tsx` as the composition shell. Visible hard-coded headings (`Wykaz części`, product heading, About heading, contact heading) are edited here when the copy decision requires it.

**Accessibility pattern:** retain `aria-labelledby`, stable section IDs, table header scopes, external-link `rel="noopener noreferrer"`, and the visually hidden new-tab note.

### `src/components/home/title-block-form.tsx` (client component, request-response)

**Analog:** existing `TitleBlockForm`, `src/components/home/title-block-form.tsx:1-18,20-77,81-118`.

**Client/status pattern** (`lines 1-21,23-38`):

```typescript
'use client';
const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });
const message = String(data.get('message') ?? '').trim();
if (message.length < MIN_MESSAGE) {
  setStatus({ kind: 'error', invalidMessage: true, message: '...' });
  return;
}
```

**API boundary pattern** (`lines 40-67`): POST JSON to `/api/contact` with the existing field names, handle non-OK responses, reset on success, and expose status in the form. Copy-only edits should change labels/placeholders/button text (the submit currently renders `Wyślij opis procesu` at lines 108-110), not payload keys or validation.

**Accessibility pattern** (`lines 82-117`): labels are associated with controls, `required`/`minLength`/`maxLength` remain on fields, and status uses `role="status"` with `aria-describedby`.

### `src/components/contact-form.tsx` (client component, request-response)

**Analog:** existing `ContactForm`, `src/components/contact-form.tsx:1-83,85-219`.

**Submission pattern** (`lines 16-47`): read `FormData`, reject the honeypot, serialize the current schema-shaped payload, and POST JSON to `/api/contact`.

**Error/status pattern** (`lines 50-81,214-217`): parse structured API issues, combine form and field errors, use `startTransition` for state updates, and render feedback inside `aria-live="polite" aria-atomic="true"`.

**Copy seam** (`lines 167-211`): the message label, example placeholder, submit label (`Wyślij krótki opis`), and helper text are safe Phase 1 microcopy seams. Preserve field names and optional qualification controls; selector/schema friction is deferred to Phase 2.

### `src/app/page.tsx` (server page composition, static request-response)

**Analog:** current `HomePage`, `src/app/page.tsx:1-40`.

**Composition pattern** (`lines 24-40`):

```tsx
export default function HomePage() {
  return (
    <main id="main" className="page-shell gv-home" tabIndex={-1}>
      <SiteHeader />
      <DrawingSheet />
      <PartsListSheet />
      <ProofSheet />
      <AuthorSheet />
      <NotesSheet />
      <ContactSheet />
      {/* FAQ JSON-LD remains escaped and server-rendered. */}
    </main>
  );
}
```

Keep this file composition-only. Do not move copy into it, promote it to a Client Component, or alter the FAQ JSON-LD while making a content refresh.

### `src/lib/contact.ts` and `src/app/api/contact/route.ts` (validation/API, request-response)

**Analogs:** current implementation in `src/lib/contact.ts:1-69` and `src/app/api/contact/route.ts:1-140` (both tracked; preserve rather than redesign).

**Validation pattern** (`contact.ts:5-15`): one Zod schema owns trim, required/optional fields, length limits, email validation, and server-side honeypot validation.

**API pattern** (`route.ts:65-83,109-139`): parse JSON, `safeParse` the schema, return structured 400 issues, send through `buildContactEmail`, and return explicit 5xx/200 messages. Keep rate limiting, escaping, and environment-variable handling unchanged. Marketing copy changes must not alter this payload boundary.

## Shared Patterns

### Content-first source of truth

**Source:** `src/content/site.ts:27-48,174-228`  
**Apply to:** all homepage copy and trust/contact data.

Edit canonical strings in `siteContent`; components should consume them through destructuring and array mapping. Avoid a second copy/config layer.

### Server composition with client leaves

**Sources:** `src/app/page.tsx:24-40`, `src/components/home/title-block-form.tsx:1`, `src/components/contact-form.tsx:1`  
**Apply to:** page and interactive forms.

Keep static sheets and page as Server Components. Keep `useState`, fetch submission, and status feedback isolated to the existing client form leaves.

### Accessible form feedback

**Sources:** `src/components/home/title-block-form.tsx:82-117`, `src/components/contact-form.tsx:214-217`  
**Apply to:** any changed form microcopy.

Retain explicit labels, native required constraints, `role="status"`, and the `aria-live` region while changing wording.

### Contact security and error handling

**Sources:** `src/lib/contact.ts:5-15,42-69`, `src/app/api/contact/route.ts:13-83,109-139`  
**Apply to:** both forms and API boundary.

Use the existing schema, honeypot, rate limit, structured errors, logger calls, and HTML escaping. No client-only validator, new CAPTCHA, or API rewrite belongs in this phase.

## No Analog Found

None. This phase is a content refresh inside existing homepage, form, and test seams; every planned file has a tracked implementation to preserve.

## Metadata

**Analog search scope:** `src/content`, `src/components/home`, `src/components`, `src/app`, `src/lib`, `tests`  
**Files scanned:** 8 target files plus contact API boundary  
**Pattern extraction date:** 2026-11-26
