# Phase 1: Homepage positioning and trust - Research

**Researched:** 2026-11-25
**Domain:** Polish B2B homepage copy, trust proof, and contact path in a Next.js 16 App Router site
**Confidence:** HIGH for repository structure and locked constraints; MEDIUM for framework guidance; LOW for external conversion benchmarks (not fetched)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Sekcja „O mnie”
- **D-01:** Sekcja pozostaje krótka: tożsamość, krótki opis i najwyżej kilka punktów zaufania.
- **D-02:** Nie rozbudowywać historii zawodowej ani nie tworzyć wywodu o Tomaszu.
- **D-03:** Klient ma przede wszystkim zobaczyć, co można dla niego zrobić. Informacje o autorze są drugorzędne.

#### Dowody i treść strony
- **D-04:** Głównym tematem są problemy klienta, takie jak dokumenty, ręczna praca, statusy, wyjątki i dane.
- **D-05:** Ograniczyć przechwałki, wizje, deklaracje i długie wyjaśnienia. Strona ma być oszczędna, bo „tylko słabi się tłumaczą”.
- **D-06:** Homepage nie potrzebuje osobnej sekcji produktów ani rozbudowanego opisu Cavi i Akta. Produkty mogą pozostać dostępne na osobnej stronie.
- **D-07:** Nie budować osobnej strony usług jako warunku zrozumienia oferty w tej fazie. Zakres ma wynikać z rozmowy z klientem.

#### Gęstość i kontakt
- **D-08:** Używać krótkich nagłówków i jednego zdania tylko tam, gdzie bez niego problem byłby niejasny.
- **D-09:** Pierwszy ekran ma być przede wszystkim wizualny i zawierać przycisk „Napisz”, bez dodatkowego opisu.
- **D-10:** Formularz jest głównym miejscem, gdzie klient opisuje problem. Ma mieć otwarte pole oraz kilka krótkich przykładów podpowiedzi.
- **D-11:** Główny przycisk kontaktu ma brzmieć „Napisz”.

### the agent's Discretion
- Dobór konkretnych krótkich przykładów problemów w formularzu, o ile pozostają rzeczowe i nie tworzą nowych obietnic.
- Zachowanie istniejących wizualnych elementów strony, jeśli nie wymagają tekstu do zrozumienia.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REQ-about-trust | The homepage About section identifies Tomasz Gołaszewski, shows relevant process, asset, data, and tool experience, and reads as a credible operational partner while staying concise. | `siteContent.about` and `AuthorSheet` are the existing content/rendering seam; shorten the existing two paragraphs and four-point table to the locked short form, retaining only evidence-backed process/data/tool signals. |
| REQ-homepage-positioning | Homepage messaging targets local production and processing companies needing custom web applications and practical AI for operational processes, using a direct business-first tone. | Existing approved brief is problem-first; update the central brand/offer copy and the visible sheet headings while preserving the working-drawing visual world and existing component boundaries. |
| REQ-homepage-conversion | Hero, offer, proof, About, contact, and form copy explain fit, demonstrate process understanding, and invite a conversation about one concrete problem without unverified claims. | The homepage already has six sheets, a title-block form, and a validated `/api/contact` boundary; phase work should align their copy, make `Napisz` the primary CTA, and avoid adding claims, layout, or API behavior. |
</phase_requirements>

## Summary

Phase 1 is a content-first refresh of an already implemented homepage. The visual architecture is intentionally distinctive: `src/app/page.tsx` only composes `DrawingSheet`, `PartsListSheet`, `ProofSheet`, `AuthorSheet`, `NotesSheet`, and `ContactSheet`, while the visible copy lives mainly in `src/content/site.ts` and hard-coded labels in `src/components/home/home-sheets.tsx` and `src/components/home/title-block-form.tsx` [VERIFIED: src/app/page.tsx:24-40; src/components/home/home-sheets.tsx:21-278; src/components/home/title-block-form.tsx:20-119]. The approved direction is therefore a copy pass inside existing seams, not a new landing-page layout.

The locked message is problem-first and sparse: production/processing teams should recognise documents, manual work, statuses, exceptions, and data friction; the first viewport should remain visual and use `Napisz`; the form is where the visitor gives detail. The current About payload contains two paragraphs plus four trust points and the current first viewport contains a visible lede and a hard-coded `Wyślij opis procesu` button, so the plan must reconcile those current strings with D-01–D-11 rather than blindly follow the older 2026-03-17 implementation note [VERIFIED: src/content/site.ts:174-208; src/components/home/home-sheets.tsx:38-67; src/components/home/title-block-form.tsx:81-110].

The repository is healthy before this phase: the full TypeScript test suite passed (75 tests), `pnpm lint` passed, and `pnpm build` passed on Next.js 16.4.6 during this research session. No package installation or architecture migration is needed. The only external research item requested by the research seam was a generic conversion benchmark; no web provider was available, so no benchmark claim is admitted. Use the user's locked decisions and the repository's approved copy briefs as the authority.

**Primary recommendation:** Keep the working-drawing homepage intact; shorten and align its central content source and the few hard-coded sheet/form labels, then add content-level and focused render assertions for the new concise positioning.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Homepage composition and semantic sections | Frontend Server (SSR) | Browser / Client | `HomePage` is a server component that composes the sheet components; static copy can render in initial HTML [CITED: https://nextjs.org/docs/app/getting-started/server-and-client-components]. |
| Central marketing content and trust facts | Frontend Server (SSR) | — | `siteContent` is the current typed source of truth for brand, offer, products, about, and contact data [VERIFIED: src/content/site.ts:27-48,49-82,174-228]. |
| Process drawing revision interaction | Browser / Client | Frontend Server (SSR) | `ProcessDrawing` owns state and redraw behavior behind `'use client'`; preserve it as a leaf [VERIFIED: src/components/home/process-drawing.tsx:1-8,166-216]. |
| First-viewport title-block form interaction | Browser / Client | API / Backend | `TitleBlockForm` owns local status and submits JSON to `/api/contact`; it should receive copy-only changes in this phase [VERIFIED: src/components/home/title-block-form.tsx:1-5,20-76]. |
| Full contact form interaction | Browser / Client | API / Backend | `ContactForm` is a client component with accessible live feedback; Phase 1 should not redesign its field contract because friction is a Phase 2 requirement [VERIFIED: src/components/contact-form.tsx:1-16,85-219; .planning/REQUIREMENTS.md:14-16]. |
| Contact validation, rate limit, and mail delivery | API / Backend | External mail service | The POST route parses JSON, validates with Zod, rate-limits, and sends through Resend [VERIFIED: src/app/api/contact/route.ts:13-139; src/lib/contact.ts:5-15]. |
| Typography, drawing sheets, and visual assets | CDN / Static | Frontend Server (SSR) | Existing CSS/tokens and local images define the fixed working-drawing identity; preserving them avoids scope expansion [VERIFIED: .impeccable/surfaces/src-app-page-tsx.md:1-28; DESIGN.md:1-80]. |

## User Constraints (from AGENTS.md)

- Use `gotovalues` in lowercase for Polish marketing copy and keep exactly two public linked products (`Cavi` and `Akta`) [VERIFIED: AGENTS.md:65-70].
- Keep Next.js 16 App Router route handlers in `src/app/api/`, use Server Components by default, and isolate Client Components to interactive leaves [VERIFIED: AGENTS.md:65-68].
- Keep marketing copy and structured data in the typed content source; preserve current page/component boundaries [VERIFIED: .planning/PROJECT.md:28-36].
- After code changes run `npx tsx --test tests/*.test.ts tests/*.test.tsx` and `pnpm lint`; affected work also needs a production build [VERIFIED: AGENTS.md:55-63; .planning/PROJECT.md:32-36].
- Do not invent customer testimonials, logos, named case studies, benchmarks, savings percentages, pricing, team size, or certifications [VERIFIED: PRODUCT.md:33-48].

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | `16.4.6` | App Router, SSR/RSC, route handlers, metadata | Existing application and project skill standard; registry returned version `16.4.6` on 2026-11-25 [VERIFIED: npm registry; package.json:11-16]. Package-legitimacy marked this release `SUS` only because it is newly published; do not upgrade or reinstall it in this phase. |
| `react` / `react-dom` | `19.3.1` | Server/client component runtime and interactive leaves | Existing app runtime; registry returned `19.3.1` on 2026-11-25 [VERIFIED: npm registry; package.json:17-21]. |
| TypeScript | `^6.0.3` | Strict typed content and component contracts | Existing strict TypeScript setup [VERIFIED: package.json:31-44; tsconfig.json:8-18]. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `zod` | `^4.6.7` | Server-side contact payload validation | Keep at the existing API boundary; do not move validation into marketing components [VERIFIED: npm registry; package.json:11-21; src/lib/contact.ts:1-15]. |
| `@hermes/design-tokens` / `@hermes/ui` | `workspace:*` | Shared token and UI packages already installed | Reuse only if an existing homepage component already consumes them; phase 1 should not add a new component layer [VERIFIED: package.json:11-16]. |
| `tsx` | `^4.23.15` | Node test runner entry point | Run the repository's existing test command; no new test framework [VERIFIED: package.json:5-10,31-44]. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Existing typed `siteContent` | CMS or new copy abstraction | Adds architecture and review surface without helping this copy-only phase; explicitly conflicts with the content-first constraint. |
| Existing `TitleBlockForm` and `ContactForm` | New form library or server action rewrite | Risks changing the API payload and duplicates the Phase 2 friction work; keep the current client/API boundary. |
| Existing working-drawing CSS | Tailwind/shadcn redesign | Would violate the fixed visual contract and user discretion to retain existing visual elements. |

**Installation:** None. This phase uses already-installed dependencies and must not add packages.

**Version verification:** `npm view next version`, `npm view react version`, and `npm view zod version` returned `16.4.6`, `19.3.1`, and `4.6.7` respectively on 2026-11-25. No `postinstall` scripts were reported for these packages.

## Package Legitimacy Audit

No packages are installed by this phase. The audit below documents existing runtime dependencies only; it is not an instruction to reinstall them.

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| `next@16.4.6` | npm | published 2026-11-09 | 97,089,813/week | github.com/vercel/next.js | SUS (too-new signal) | Keep existing lockfile; no upgrade/install in Phase 1. If an upgrade is proposed, add a human verification checkpoint. |
| `react@19.3.1` | npm | published 2026-10-14 | 274,654,160/week | github.com/facebook/react | OK | Existing dependency; no install. |
| `zod@4.6.7` | npm | published 2026-10-12 | 468,631,616/week | github.com/colinhacks/zod | OK | Existing dependency; no install. |

**Packages removed due to [SLOP] verdict:** none.
**Packages flagged as suspicious [SUS]:** `next@16.4.6` only because the legitimacy seam flagged recency; this is not a phase install and should remain untouched.

## Architecture Patterns

### System Architecture Diagram

```text
Visitor
  │
  ▼
Next.js App Router `src/app/page.tsx` (Server Component)
  │ renders static content from `src/content/site.ts`
  ├── DrawingSheet ──┬── ProcessDrawing (Client: revision state)
  │                  └── TitleBlockForm (Client: short problem form)
  ├── PartsListSheet (offer + working style)
  ├── ProofSheet (existing Cavi/Akta proof; keep concise)
  ├── AuthorSheet (short identity + trust points)
  ├── NotesSheet (existing FAQ)
  └── ContactSheet ── ContactFormLazy → ContactForm (Client: full form)
                              │ JSON POST
                              ▼
                       `src/app/api/contact/route.ts`
                              │ Zod + rate limit + escaped email
                              ▼
                           Resend
```

The phase changes copy and labels along the highlighted content path. It does not add a route, replace the drawing, or alter the API payload.

### Recommended Project Structure

```text
src/
├── content/site.ts                         # canonical homepage copy and proof data
├── app/page.tsx                             # composition only; keep unchanged unless needed for section boundaries
├── components/home/home-sheets.tsx         # section headings, hard-coded labels, rendering
├── components/home/title-block-form.tsx    # first-viewport CTA/helper copy
├── components/contact-form.tsx              # full form microcopy; structural friction belongs to Phase 2
└── app/api/contact/route.ts                 # existing validation/mail boundary; no phase-1 behavior change
tests/
└── site-content.test.ts                     # content invariants; add concise-copy assertions here
```

### Pattern 1: Content-first rendering

**What:** Keep reusable marketing strings and structured proof in `siteContent`; components map the data into the existing sheet layout.
**When to use:** Every homepage copy change, especially hero/offer/about/contact text.
**Example:** `PartsListSheet` reads `siteContent.offer` and `AuthorSheet` reads `siteContent.about` [VERIFIED: src/components/home/home-sheets.tsx:74-129,193-222].

### Pattern 2: Server composition with client leaves

**What:** Leave `page.tsx` and static sheets as Server Components; keep stateful drawing/forms in files with `'use client'`.
**When to use:** Any interaction or status message; do not promote the entire homepage to a Client Component.
**Example:**

```tsx
// Source: https://nextjs.org/docs/app/getting-started/server-and-client-components
// page.tsx remains a Server Component; interactive children are isolated leaves.
export default function Page() {
  return <InteractiveLeaf />
}
```

### Pattern 3: Preserve the existing contact boundary

**What:** Client form serializes the current payload and POSTs to `/api/contact`; the route validates with the existing Zod schema and returns explicit statuses.
**When to use:** Copy-only work that changes labels/placeholders but not fields or delivery behavior.
**Example:**

```tsx
// Source: repository implementation, src/components/home/title-block-form.tsx:40-53
await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, company: '', message, bot_field: '' }),
})
```

The actual repository includes the remaining optional fields as empty strings; any field-contract change belongs to Phase 2.

### Anti-Patterns to Avoid

- **Editing only `src/app/page.tsx`:** it is a composition shell; visible homepage copy is in `home-sheets.tsx`, `title-block-form.tsx`, and `siteContent` [VERIFIED: src/app/page.tsx:24-40; src/components/home/home-sheets.tsx:38-278].
- **Keeping unused long copy as the de facto message:** `siteContent.brand.intro` and some CTA fields are not rendered by the current sheets; do not mistake an old field for visible proof. Confirm every changed string's consumer.
- **Turning About into a CV:** violates D-01–D-03 and makes the author displace the offer.
- **Adding a product carousel/testimonials/statistics:** no evidence exists and the phase explicitly keeps products secondary.
- **Rewriting the API or form schema:** contact friction and payload simplification are Phase 2; this phase needs copy alignment only.
- **Introducing a second visual language:** the working-drawing contract bans gradients, dark AI-startup styling, rounded cards, and new hues [VERIFIED: .impeccable/surfaces/src-app-page-tsx.md:12-28; DESIGN.md:20-80].

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Contact validation | A second client-only validator or ad-hoc parsing | Existing `contactFormSchema` in `src/lib/contact.ts` | Server validation already handles required/optional fields, length limits, email format, and honeypot [VERIFIED: src/lib/contact.ts:5-15]. |
| Email HTML safety | String interpolation without escaping | Existing `escapeHtml` in `buildContactEmail` | Prevents user-controlled name/company/message content from becoming HTML [VERIFIED: src/lib/contact.ts:42-68]. |
| Spam controls | New CAPTCHA or bespoke rate limiter | Existing route rate limit and honeypot | Phase 1 is not a delivery/security redesign; preserve tested behavior [VERIFIED: src/app/api/contact/route.ts:8-63]. |
| Content management | CMS, markdown pipeline, or translation framework | Typed `siteContent` object | Current homepage is intentionally content-first and statically rendered. |
| Visual system | New card/button primitives | Existing `home.css` and design tokens | The fixed working-drawing surface is the approved identity. |

**Key insight:** The hard problem in this phase is choosing truthful, short copy and ensuring all visible seams agree. New abstractions would increase inconsistency and move the work away from the user's request.

## Runtime State Inventory

This is a copy refresh, not a rename, migration, or refactor. No runtime state migration is required.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None found for the phase's copy changes; no persisted homepage content store is used. | None. `siteContent` is source code, not a data migration. |
| Live service config | No homepage copy configuration outside the repository was identified. | None. |
| OS-registered state | None relevant. | None. |
| Secrets/env vars | Contact API reads existing mail environment variables, but phase 1 does not rename or change them [VERIFIED: src/app/api/contact/route.ts:85-104]. | Keep secrets out of source and out of research artifacts. |
| Build artifacts / installed packages | `.next` is generated output; package versions are already in `pnpm-lock.yaml` and `package.json`. | Rebuild in verification; do not commit generated output. |

## Common Pitfalls

### Pitfall 1: Planning against the old component map

**What goes wrong:** A plan edits `src/app/page.tsx` for copy that is actually rendered by `home-sheets.tsx` or `title-block-form.tsx`.
**Why it happens:** The older implementation plan predates the current working-drawing composition.
**How to avoid:** Trace each visible string from `siteContent` or the hard-coded component label to its consumer before editing.
**Warning signs:** Tests pass but the rendered homepage still shows `Porządkuję jeden proces naraz`, `Wykaz części`, or `Wyślij opis procesu`.

### Pitfall 2: The first viewport remains explanatory

**What goes wrong:** A long hero lede or process explanation contradicts D-09.
**Why it happens:** The current drawing header renders `brand.headline` beneath the h1 [VERIFIED: src/components/home/home-sheets.tsx:38-42].
**How to avoid:** Make the first viewport visual, keep at most a necessary short label, and make the title-block action `Napisz`; move examples into the form field.
**Warning signs:** The initial viewport contains a paragraph before the visitor reaches the title block.

### Pitfall 3: About copy grows back into a biography

**What goes wrong:** Four detailed points and two long paragraphs make the section about Tomasz rather than the client's problem.
**Why it happens:** Existing `about` content was designed for a broader trust refresh [VERIFIED: src/content/site.ts:174-208].
**How to avoid:** Keep identity plus one compact description and no more than a few proof points; retain only process/assets/data/tools evidence.
**Warning signs:** A visitor must read the About section to understand the offer, or the copy lists employers, awards, or a full technology inventory.

### Pitfall 4: Duplicate form paths drift

**What goes wrong:** The title-block form and full contact form use different labels or payload assumptions after a copy edit.
**Why it happens:** They are separate client components with shared API destination but different UI scopes [VERIFIED: src/components/home/title-block-form.tsx:20-119; src/components/contact-form.tsx:12-219].
**How to avoid:** Keep phase-1 edits to labels, helper text, and examples; keep JSON keys and API schema unchanged. Put field simplification in Phase 2.
**Warning signs:** `tests/contact.test.ts` or `tests/contact-form.test.tsx` fail, or one form promises a different follow-up than the other.

### Pitfall 5: Unsupported proof sneaks into concise copy

**What goes wrong:** Short copy gets padded with savings percentages, client logos, testimonials, or delivery guarantees.
**Why it happens:** Generic B2B conversion patterns are not evidence for this business.
**How to avoid:** Use only current public products, private deployment categories, and the founder facts already present in the repository; no invented numbers [VERIFIED: PRODUCT.md:33-48].
**Warning signs:** A claim cannot be linked to an existing product, code path, or approved source brief.

### Pitfall 6: Accessibility regresses while shortening text

**What goes wrong:** Removing context also removes labels, heading relationships, focus targets, or live feedback.
**Why it happens:** Copy is treated as decorative rather than semantic UI.
**How to avoid:** Preserve `aria-labelledby`, field labels, `role="status"`, `aria-live="polite"`, required indicators, and keyboard-visible focus [VERIFIED: src/components/home/home-sheets.tsx:26-27,197-221; src/components/home/title-block-form.tsx:82-117; src/components/contact-form.tsx:214-218].
**Warning signs:** A screen-reader or component test cannot find the form field/button by its accessible label.

## Code Examples

Verified patterns from official sources:

### Static page metadata stays in a Server Component

```tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '...',
  description: '...',
}
```

For this phase, metadata is already defined in `src/app/layout.tsx`; a copy refresh should only change it if the requirement explicitly includes metadata. The current phase requirements do not require a metadata architecture change [VERIFIED: src/app/layout.tsx:34-80].

### Route handler boundary remains explicit

```ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/route
export async function POST(request: Request) {
  const payload = await request.json()
  return Response.json({ ok: true })
}
```

The project-specific handler additionally validates with Zod and sends mail; do not replace it for homepage copy work [VERIFIED: src/app/api/contact/route.ts:65-139].

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|-------------|--------|
| Treat `src/app/page.tsx` as the homepage copy file | Compose server-rendered sheets and keep copy in `siteContent` plus local sheet/form labels | Current repository state verified 2026-11-25 | Planner must target `src/components/home/home-sheets.tsx` and `src/components/home/title-block-form.tsx`, not only `page.tsx`. |
| Large abstract agency/AI positioning | Problem-first operational language with one concrete contact action | Approved brief dated 2026-03-17 and locked phase decisions dated 2026-11-25 | Copy should name documents/manual work/statuses/exceptions and avoid generic vision language. |
| Client logic spread across the page | Server Components by default; client leaves for state/forms | Next.js App Router guidance [CITED: https://nextjs.org/docs/app/getting-started/server-and-client-components] | Keep copy components server-rendered and do not add `'use client'` to the page. |

**Deprecated/outdated:**
- The older implementation note that lists `src/app/page.tsx` as the hard-coded copy location is stale relative to the current sheet composition; use it as intent, not as a file map.
- Generic conversion advice requiring testimonials, carousels, or invented metrics is not applicable because this repository has no such evidence and the user explicitly wants less explanation.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The homepage should keep the current six-sheet working-drawing layout for this phase. | Summary / Architecture | A redesign would materially expand scope; this is supported by the phase boundary and existing design contract, but no new visual direction was requested. |
| A2 | Three trust points are a useful implementation target for “najwyżej kilka”, although the exact count is discretionary. | Architecture / Pitfalls | A different count could be preferred; keep the planner's copy review checkpoint. |
| A3 | `siteContent.brand.intro` and CTA fields may remain as compatibility data if not rendered, unless the planner confirms consumers. | Anti-Patterns | Removing unused fields could affect non-home routes or tests; verify references before deleting. |

## Open Questions

1. **Should the first-viewport lede be removed entirely or reduced to one sentence?**
   - What we know: D-09 says visual first screen with `Napisz` and no additional description; `DrawingSheet` currently renders `brand.headline` below the h1 [VERIFIED: .planning/phases/01-homepage-positioning-and-trust/01-CONTEXT.md:27-31; src/components/home/home-sheets.tsx:38-42].
   - What's unclear: Whether the design review wants an empty lede slot or a single problem sentence.
   - Recommendation: Plan the default as no explanatory paragraph in the first viewport; retain only a short accessible label if removing the node would harm structure.

2. **Which exact three About proof points should survive?**
   - What we know: Existing points cover experience, scope, collaboration style, and technologies [VERIFIED: src/content/site.ts:187-207].
   - What's unclear: The user locked brevity, not the exact selection.
   - Recommendation: Prefer process experience, document/data/tool delivery, and direct collaboration; leave the final wording for the copy task and test only the invariant, not a long exact phrase.

3. **Should the full `ContactForm` microcopy change in Phase 1?**
   - What we know: D-10 requires examples near the open field, and the title-block form already has one example; Phase 2 owns low-friction field structure [VERIFIED: src/components/home/title-block-form.tsx:81-110; .planning/REQUIREMENTS.md:14-16].
   - What's unclear: Whether to align the full form's helper text now or defer all its changes.
   - Recommendation: Align only wording that is necessary for homepage consistency; do not remove or rename fields until Phase 2 resolves the `service`/selector conflict.

4. **External conversion benchmarks?**
   - What we know: The research seam requested a web query, but no web provider was available in this session.
   - What's unclear: No current benchmark or external expert source was verified.
   - Recommendation: Do not use benchmark claims or generic numerical conversion targets in the plan.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | Next build, tests, lint | ✓ | `v26.13.0` | — |
| pnpm | repository scripts and lockfile | ✓ | `11.23.0` | `npm` can run scripts, but preserve pnpm lockfile. |
| npm | registry/version verification | ✓ | `12.2.3` | — |
| Python 3 | UI/UX local search skill only | ✓ | `3.13.5` | — |
| Vercel/Resend production services | Not needed for copy planning or local test/build | Not probed | — | Local route tests mock delivery; no deployment action in research. |

**Missing dependencies with no fallback:** none for this phase.
**Missing dependencies with fallback:** none.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node test runner via `tsx` `^4.23.15`, Testing Library for React components |
| Config file | `vitest.config.ts` exists for browser-oriented tests, but phase tests use the package script and Node test runner |
| Quick run command | `npx tsx --test tests/site-content.test.ts tests/contact-form.test.tsx` |
| Full suite command | `npx tsx --test tests/*.test.ts tests/*.test.tsx` |

The baseline full suite passed 75 tests, `pnpm lint` passed, and `pnpm build` passed on 2026-11-25.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| REQ-about-trust | About data remains concise, identifies Tomasz, and retains process/data/tool proof | unit/content | `npx tsx --test tests/site-content.test.ts` | ✅; update existing trust test |
| REQ-homepage-positioning | Central brand and offer strings target operational production/process problems and avoid unsupported claims | unit/content | `npx tsx --test tests/site-content.test.ts` | ✅; extend invariant assertions |
| REQ-homepage-conversion | Visible sheet/form CTA and helper copy invite one concrete process without changing contact payload | component + content | `npx tsx --test tests/contact-form.test.tsx tests/site-content.test.ts` | ⚠️ no homepage sheet test exists; add a focused render test only if labels are changed in components |

### Sampling Rate

- **Per task commit:** `npx tsx --test tests/site-content.test.ts tests/contact-form.test.tsx`
- **Per wave merge:** `npx tsx --test tests/*.test.ts tests/*.test.tsx` and `pnpm lint`
- **Phase gate:** full suite, lint, and `pnpm build` green before `$gsd-verify-work`

### Wave 0 Gaps

- [ ] If the plan changes hard-coded sheet labels, add `tests/home-sheets.test.tsx` (or an equivalent focused test) for the first-viewport heading/button and About rendering; currently no homepage sheet test file exists.
- [ ] Update `tests/site-content.test.ts` assertions that currently expect four About points and the old CTA framing [VERIFIED: tests/site-content.test.ts:49-52,91-98].
- [ ] Do not add a new test framework or fixture package.

## Security Domain

Security enforcement is enabled by default. This phase is mostly copy-only, but it touches user-facing form labels and must preserve the existing controls.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Public contact form has no account authentication; do not introduce auth in this phase. |
| V3 Session Management | no | No session state in homepage flow. |
| V4 Access Control | no | Public form sends only its own visitor payload; existing route has no privileged operation. |
| V5 Input Validation | yes | Keep Zod schema validation, HTML required/type constraints, max lengths, and server-side honeypot [VERIFIED: src/lib/contact.ts:5-15; src/components/contact-form.tsx:97-180]. |
| V6 Cryptography | no | No new cryptographic material; do not add tokens or secrets to copy. |

### Known Threat Patterns for Next.js/React contact surfaces

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| User text inserted into HTML mail | Tampering / XSS | Preserve `escapeHtml` before HTML email interpolation [VERIFIED: src/lib/contact.ts:42-68]. |
| Direct spam POSTs or honeypot bypass | Denial of service | Preserve server-side honeypot and bounded in-memory rate limiter [VERIFIED: src/app/api/contact/route.ts:8-63; src/lib/contact.ts:13-15]. |
| Accidental secret disclosure in copy or logs | Information disclosure | Keep API keys/env values out of content and structured logs; route logs only status/error metadata [VERIFIED: src/app/api/contact/route.ts:85-104,119-139]. |
| Accessibility context removed while shortening | Repudiation/usability | Preserve labels, heading IDs, live regions, and visible focus styles; test accessible names. |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/01-homepage-positioning-and-trust/01-CONTEXT.md` — locked phase decisions and scope, read in full this session.
- `.planning/REQUIREMENTS.md` — phase requirement IDs and out-of-scope boundaries, read in full this session.
- `src/content/site.ts`, `src/app/page.tsx`, `src/components/home/home-sheets.tsx`, `src/components/home/title-block-form.tsx`, `src/components/contact-form.tsx`, `src/lib/contact.ts`, and `src/app/api/contact/route.ts` — current source of truth and integration seams, opened with line ranges this session.
- `DESIGN.md`, `PRODUCT.md`, `.impeccable/surfaces/src-app-page-tsx.md`, and `AGENTS.md` — visual, product, and project constraints, read this session.
- npm registry queries for `next`, `react`, and `zod` — current versions and publish metadata, queried 2026-11-25.

### Secondary (MEDIUM confidence)

- [CITED: https://nextjs.org/docs/app/getting-started/server-and-client-components] — current App Router Server/Client Component boundary guidance; corroborated by local `node_modules/next/dist/docs` for Next 16.4.6.
- [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-metadata] — static metadata export and server-only metadata rules; local Next 16.4.6 docs opened this session.
- [CITED: https://nextjs.org/docs/app/api-reference/file-conventions/route] — Route Handler request/response contract; local Next 16.4.6 docs opened this session.
- [CITED: https://nextjs.org/docs/app/guides/forms] — native form/FormData and schema validation guidance; local Next 16.4.6 docs opened this session.

### Tertiary (LOW confidence)

- No external web conversion source was available; no low-confidence external claim is used in the recommendations.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified against the local package manifest and npm registry; Next receives a SUS recency warning, so no upgrade is recommended.
- Architecture: HIGH — current files and local Next 16 docs were inspected directly.
- Pitfalls: HIGH for repository-specific drift and scope; MEDIUM for general framework guidance; no external conversion benchmark admitted.

**Research date:** 2026-11-25
**Valid until:** 2026-12-25 for stable repository architecture; recheck package versions before any dependency upgrade.

## Project Constraints (from AGENTS.md)

- Use lowercase `gotovalues` in Polish marketing copy and keep exactly two public linked products, Cavi and Akta.
- Keep App Router route handlers under `src/app/api/`; use Server Components by default and isolate interactive Client Components.
- Preserve the typed content-first architecture and current page/component boundaries.
- Run the repository test command and `pnpm lint` after code changes; run the production build for the phase gate.
- Never add secrets, `.env` contents, unverified claims, invented testimonials, logos, named case studies, benchmarks, savings percentages, prices, team-size claims, or certifications.

