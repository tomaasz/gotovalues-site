---
phase: "1"
slug: "homepage-positioning-and-trust"
status: draft
shadcn_initialized: true
preset: none
created: "2026-11-26"
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for the homepage positioning and trust refresh. This is a content-first change inside the existing technical-drawing UI; it does not introduce routes, packages, or a second visual language.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui (installed, local components) |
| Preset | none (the project uses the default Radix base) |
| Component library | Radix primitives through shadcn/ui; existing homepage sheets remain custom components |
| Icon library | lucide-react 1.72.0; existing inline SVG drawing icons remain unchanged |
| Font | Archivo variable for display/body; JetBrains Mono for drawing annotations, positions, and measurements |

The homepage visual source of truth is `@hermes/design-tokens/gotovalues-drawing` and the existing `src/app/home.css`. Reuse `--gv-paper`, `--gv-ink`, `--gv-sage`, `--gv-sage-deep`, line weights, hatching, square sheet geometry, and the current sheet/component boundaries. Do not add gradients, dark AI-startup styling, rounded marketing cards, new hues, or a new CSS/component abstraction.

## Component Inventory

> The inventory is a non-exhaustive list of known-good local primitives. The custom drawing sheets are not shadcn exports and remain the preferred composition for this phase.

Enumerated by `npx shadcn info 2>/dev/null` — 9 components — shadcn@4.23.1 — 2026-11-26.
Filesystem cross-check: `find src/components/ui -maxdepth 1 -type f -name '*.tsx' | wc -l` — 9 files (no mismatch).

| Component | Import path | Notes |
|-----------|-------------|-------|
| Badge | `@/components/ui/badge` | Use only for an existing compact status/tag; no new marketing badges in this phase. |
| Button | `@/components/ui/button` | Existing generic button primitive; the title-block submit keeps the custom drawing button styling. |
| Card | `@/components/ui/card` | Available for existing consumers; do not introduce card panels into the homepage sheets. |
| Checkbox | `@/components/ui/checkbox` | Available for existing consumers; no new checkbox interaction in this phase. |
| Dialog | `@/components/ui/dialog` | Available for existing consumers; no new modal flow in this phase. |
| Input | `@/components/ui/input` | Available for existing consumers; homepage forms retain their current labeled inputs and drawing-cell styling. |
| Label | `@/components/ui/label` | Available for existing consumers; preserve explicit labels on every homepage form control. |
| Select | `@/components/ui/select` | Available for existing consumers; existing contact-form selects retain their current field contract. |
| Textarea | `@/components/ui/textarea` | Available for existing consumers; the open problem description remains a native textarea with visible label and examples. |

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Label-to-control and icon gaps |
| sm | 8px | Compact cell padding and inline control spacing |
| md | 16px | Default field/table cell and annotation spacing |
| lg | 24px | Sheet heading separation, grid step, and content gaps |
| xl | 32px | Sheet padding at wide viewports and larger layout gaps |
| 2xl | 48px | Major sheet-to-sheet/content breaks |
| 3xl | 64px | Page-level breathing room and large drawing offsets |

Exceptions: preserve existing token geometry where it is part of the drawing language: 40px desktop sheet gap, 28px mobile sheet gap, 56px title-block submit height, 24px drafting-grid step, and 2px control radius. These are existing values, not new phase-specific spacing.

## Typography

Use only the two phase weights shown below: regular 400 and bold 700. Responsive sizing continues to come from the existing `clamp()` tokens; the table gives the implementation's four semantic size anchors.

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.55 |
| Label | 12px | 700 | 1.2 |
| Heading | 32px | 700 | 1.02 |
| Display | 64px | 700 | 0.98 |

Display maps to `--gv-title-size` and the first-viewport title clamp; Heading maps to `--gv-h2-size`; labels and annotations use the existing compact drawing tokens. Keep one monumental first-viewport title and short headings. Do not add explanatory paragraphs solely to fill space.

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#faf8f5` (`--gv-paper`) | Page, sheets, form cells, inputs, and image surfaces |
| Secondary (30%) | `#e3eae6` (`--gv-grid`) | Drafting grid, structural separators, and subtle non-text state texture; never a new filled card surface |
| Accent (10%) | `#2f5e4e` (`--gv-sage-deep`) | Primary CTA, text links, focus rings, caret, selected revision ID, and successful status text |
| Destructive | `#8f3c34` (`--gv-danger`) | Form validation/submission errors and required-field markers only |

Accent reserved for: the `Napisz`/submit actions, in-page and product links, keyboard focus outlines, the selected revision identifier, caret/selection affordances, and success feedback. Use light sage `#4e8b76` (`--gv-sage`) only for diagram strokes, route dots, hatching, bullets, and other large decorative graphics where the existing contrast rule permits it. All ordinary text remains ink or soft ink.

## Copywriting Contract

Copy is Polish, direct, problem-first, and lowercase `gotovalues`. Keep the visitor's problem ahead of biography. The first viewport is visual and has one primary action; the form is the place for detail.

| Element | Copy |
|---------|------|
| Primary CTA | `Napisz` |
| Empty state heading | `Brak przykładów do pokazania` (fallback only; the current homepage has no user-generated empty collection) |
| Empty state body | `Napisz, jaki proces chcesz uporządkować.` |
| Error state | `Nie udało się wysłać opisu. Spróbuj ponownie albo napisz na kontakt@gotovalues.com.`; validation should explain that the process description needs at least 20 characters and how to fix it. |
| Destructive confirmation | Brak destrukcyjnych działań w tej fazie; no confirmation dialog is needed. |

Required visible copy constraints:

- First viewport: no explanatory lede competing with the drawing; keep the single `Napisz` action and let the open field carry examples.
- Problem examples stay short and evidence-based, e.g. `dokumenty przychodzą mailem`, `statusy prowadzimy w Excelu`, `wyjątki giną między narzędziami`.
- About: identify Tomasz Gołaszewski and retain only concise process, asset/data, and tool evidence; no CV, awards, invented clients, testimonials, metrics, or delivery guarantees.
- Proof: retain exactly the two public linked products, `Cavi` and `Akta`; private deployments remain anonymous and clearly labeled.
- Preserve the existing response-time wording only where already approved by the repository; do not add new promises.

## Responsive Behavior

- Desktop (>1080px): retain the two-column first sheet (`drawing` beside `title`/`title block`), framed paper sheets, and 40px sheet rhythm. The title remains the dominant visual element; copy does not widen the title cell beyond its current measure.
- Tablet/small desktop (≤1080px): use the existing single-column first-sheet order: title, drawing, title block, legend, revision table. Keep the CTA and open message field visible without horizontal scrolling.
- Narrow tablet (≤860px): stack detail, author, contact, and private-deployment columns; preserve table headers semantically even when visually clipped for the responsive parts list.
- Mobile (≤640px): keep 8px main-sheet inset, hide decorative zone markers, stack all fields, retain a minimum 48px submit/control target, and allow message textareas to resize vertically. Do not reorder controls away from DOM/tab order.
- Offer table: retain the existing horizontal overflow wrapper on wider narrow screens and the semantic stacked-row transformation on mobile. Long labels must wrap rather than clip.
- Product/detail images: retain responsive `sizes` and descriptive alt text; no new hero imagery or background media is introduced.

## Accessibility & Interaction States

- Preserve semantic landmarks and heading relationships: one page `main`, each sheet as a labeled `section`, and visible `h1`/`h2` headings referenced by `aria-labelledby`.
- Every input, select, and textarea keeps a visible `<label>`, stable `id`/`name`, and existing `required`/length constraints. Placeholders are examples, never the only label.
- Preserve the native form controls and current `/api/contact` payload boundary. Do not change field names, add a second validator, or rewrite the API in this phase.
- Keep `role="status"`/`aria-live="polite"` feedback for sending, success, and error outcomes. Error copy must identify the problem and the next action; focus should remain visibly indicated with `:focus-visible`.
- Submit controls use native `type="submit"`, are disabled only while a valid submission is in flight, and expose a clear sending label (`Wysyłam opis…` / `Wysyłanie…`).
- Decorative SVGs, grid markers, and detail callouts stay `aria-hidden`; informative product images retain meaningful alt text. External links retain the existing new-tab announcement.
- Keep process-drawing revision rows keyboard-operable and preserve the reduced-motion path: `prefers-reduced-motion: reduce` renders the final drawing without stroke animations.

## UI Considerations

Applicable state considerations resolved: 9 covered, 2 backstop, 0 unresolved.

| Category | Element(s) | Status | Resolution / Reason |
|----------|------------|--------|---------------------|
| populated | First viewport, offer, proof, About, FAQ, contact | ✅ covered | All sections render from `siteContent` and existing sheet components; concise copy is visible without introducing a new layout. |
| zero-one-many | Public/private proof lists | ✅ covered | Exactly two public linked products (`Cavi`, `Akta`) remain; private examples stay labeled and anonymous. |
| partial | Product proof and About evidence | ✅ covered | Missing private links or customer names are represented as intentional private proof, never as broken/empty cards. |
| loading | Title-block and full contact submit | ✅ covered | Existing submit controls disable during POST and show a sending label while preserving field values. |
| success | Title-block and full contact submit | ✅ covered | Existing polite status feedback announces success and clears only after the server accepts the payload. |
| error | Validation, network, and API failure | ✅ covered | Error feedback uses the Copywriting Contract error row, gives a retry/contact path, and keeps the control visible. |
| reduced-motion | Process drawing redraw interaction | ✅ covered | Existing reduced-motion media query skips animation and exposes the final drawing state. |
| overflow | Parts list, revision table, long labels | ✅ covered | Existing responsive table transformation and overflow wrapper preserve access to every row; labels wrap rather than clip. |
| empty | Homepage collections | ✅ covered | No user-generated collection is exposed; if a future proof list is empty, use the documented empty-state copy rather than inventing proof. |
| long-text | About, offer descriptions, form messages | 🧪 backstop | Content/render tests and a narrow viewport visual check must confirm wrapping, readable line length, and no clipped title-block controls. |
| visual-density | Six-sheet homepage sequence | 🧪 backstop | A visual review must confirm that shorter copy leaves the technical-drawing hierarchy intact and does not create unexplained blank zones. |

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | Existing local primitives only: badge, button, card, checkbox, dialog, input, label, select, textarea | not required; no new registry block is added in Phase 1 |

No third-party registries or blocks are declared. No registry view/diff is required.

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS
- [ ] Dimension 7 Inventory Provenance: PASS

**Approval:** pending
