---
name: gotovalues
description: The client's operational process drawn as a technical working drawing on one paper sheet.
colors:
  paper: "#faf8f5"
  ink: "#2a2623"
  sage: "#4e8b76"
  sage-deep: "#2f5e4e"
  ink-soft: "#5a524c"
  grid: "#e3eae6"
  sage-wash: "rgb(78 139 118 / 0.1)"
  danger: "#8f3c34"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 88"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 88"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.6vw, 1.45rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 88"
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"tnum\""
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.06em"
  annotation:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.74rem"
    fontWeight: 400
    letterSpacing: "0.02em"
rounded:
  none: "0"
  control: "2px"
  balloon: "50%"
spacing:
  sheet-pad: "clamp(16px, 2.4vw, 32px)"
  grid-step: "24px"
  cell: "10px 14px"
  sheet-gap: "40px"
  sheet-gap-mobile: "28px"
  max-width: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.sage-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.sage-wash}"
  title-block-submit:
    backgroundColor: "{colors.sage-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "56px"
  title-block-submit-hover:
    backgroundColor: "{colors.ink}"
  title-block-cell:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "{spacing.cell}"
  title-block-cell-focus:
    backgroundColor: "{colors.sage-wash}"
  field-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  position-balloon:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.annotation}"
    rounded: "{rounded.balloon}"
    size: "26px"
  revision-row-selected:
    backgroundColor: "{colors.sage-wash}"
    textColor: "{colors.ink}"
  revision-id-selected:
    backgroundColor: "{colors.sage-deep}"
    textColor: "{colors.paper}"
    width: "52px"
  sheet:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "{spacing.sheet-pad}"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.sage-deep}"
---

# Design System: gotovalues

## Overview

**Creative North Star: "The Working Drawing"**

Every page is a sheet from a technical drawing set (ISO 128 conventions): a paper sheet with a framed border, a faint sage drafting grid, ink linework at three line weights, numbered position balloons, dimension lines, a title block and a revision table. Content is presented as parts of a drawing, not as marketing panels. The offer is a parts list (*wykaz części*), the products are detail views (*szczegół A / B*), the FAQ is the notes field (*uwagi*), the author is the *opracował* cell, and the contact form is the title block itself.

The world is built from three logo colours and nothing else. All tone comes from line weight, dashing and 45° hatching, never from grey fills, blur or tonal gradients. Density is that of a real drawing: tight ruled cells, small monospace annotation, then one large, semi-condensed grotesk title per sheet. Motion belongs to the drawing. The process diagram redraws stroke by stroke when the visitor picks a revision, and stays still on first paint and under reduced motion.

The user explicitly rejected these directions: the dark AI-startup look (neon, gradients, robots), the faceless corporate software-house look, a magazine or overly artistic look, and any colour that is not in the logo.

**Key Characteristics:**
- One paper sheet per section, framed in a 2px ink rule, square corners.
- Three colours (paper, ink, sage) plus derived deep sage, soft ink, a sage-tinted grid and one danger red for form errors.
- Archivo variable at 88% width for everything set in words; JetBrains Mono only for positions, revisions and measurements.
- Line weight is the hierarchy: 2px outline, 1.5px parts, 1px dimension and cell rules.
- Circles are reserved for position balloons and the sage stop-dot.
- Flat. Depth is never simulated.

## Colors

The palette is fixed by the "Trasa do wartości" logo (see `brand/logo/README.md`): warm paper, warm near-black ink, and one muted green in two strengths.

### Primary
- **Route Sage** (sage): the logo's stop-dot colour. Graphics and large text only (3.75:1 on paper). Used for the accent route and integration bus in the process drawing (3.5px strokes), the stop-dot where the route reaches value, the hatch lines, list bullets, and the hover underline on nav links.
- **Deep Sage** (sage-deep): the working accent for anything that must be read or pressed (7:1 on paper). Used for links, filled controls (primary button, title-block submit), the selected revision ID cell, focus outlines, text selection, caret and `accent-color`. The shadcn `--ds-primary/accent/ring` tokens are overridden at site level to this value.

### Neutral
- **Drawing Paper** (paper): every background. Sheets, cells, inputs and the page are all paper. There is no second surface colour.
- **Drafting Ink** (ink): all linework, headings, body text, the solid "Decyzja" node, and the hover state of filled buttons.
- **Soft Ink** (ink-soft): secondary text, annotation, table headers, placeholders, cell labels (7.4:1 on paper). It is derived from ink, so it stays warm and never reads as a neutral grey.
- **Drafting Grid** (grid): sage-tinted 1px lines on a 24px step behind the first-viewport drawing only.
- **Sage Wash** (sage-wash): the only tint fill. Used for the selected and hovered revision row, the focused title-block cell, the secondary button hover, and the matte behind product screenshots in detail views.
- **Error Red** (danger): form error status and the required-field marker only.

### Named Rules
**The Three Colour Rule.** Paper, ink and sage are the whole palette. Every other value is derived from them. A new surface that needs another hue is the wrong surface.

**The Readable Sage Rule.** Text, links and filled controls use deep sage. Light sage is for strokes, dots, hatching and text above roughly 24px.

**The Hatch, Not Grey Rule.** To mark something as different (manual work, private, not shown), hatch it with 45° hard-stop lines (`--gv-hatch` in sage, `--gv-hatch-ink` in ink) or dash its outline. Never fill it grey.

## Typography

**Display Font:** Archivo variable, width axis (with system-ui, sans-serif)
**Body Font:** Archivo variable, width axis (same family)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** An industrial grotesk at 88% width (`font-stretch`) works like drawing lettering: dense, upright and unadorned. The monospace is the draughtsman's annotation and appears only where a drawing would carry numbers or codes. Both families are self-hosted through next/font (`--font-display`, `--font-mono`), with Polish glyph subsets.

### Hierarchy
- **Display** (700, `clamp(2.6rem, 5.4vw, 5.25rem)`, 1.02, -0.025em, 88% width): the drawing title, one per page, balanced wrap. On the homepage the first-viewport sheet title is set at `clamp(2.5rem, 4.7vw, 4.6rem)` with 0.98 leading so it fits the title cell. Legal pages use `clamp(2.2rem, 4vw, 3.1rem)`.
- **Headline** (700, `clamp(1.75rem, 3vw, 2.6rem)`, 1.02): the sheet heading above a 2px ink rule, held to about 24ch.
- **Title** (700, `clamp(1.2rem, 1.6vw, 1.45rem)`, -0.01em): sub-blocks inside a sheet (detail views, private deployments, technical notes). The parts-list name column uses the same face at 1.2rem.
- **Lede** (400, 1.08rem, 1.55, max 48ch, soft ink): one sentence under a title.
- **Body** (400, 1rem, 1.55 to 1.65, max 62 to 76ch): running copy, mostly in soft ink, with ink for emphasis and impact lines. Tabular figures are on site-wide.
- **Label** (700, 0.72 to 0.78rem, 0.06em tracking, uppercase, soft ink): field names in title-block and author-table cells, plus the revision table caption. This mirrors the printed field names of a real title block.
- **Annotation** (mono, 0.74rem): zone letters A to F and 1 to 4, dimension text, table column heads, detail callouts, tech-stack lines. Balloon numerals are mono 600 at 0.7 to 0.78rem (11px in the SVG).

### Named Rules
**The One Grotesk Rule.** Every word is set in Archivo. Hierarchy comes from size, weight and width. Never add a second display face.

**The Mono Is Measurement Rule.** JetBrains Mono appears only where a drawing would carry numbers, codes or dimensions (positions, revisions, zones, stacks). Never use it for prose or headings.

**The Field Label Rule.** Uppercase tracked labels name a cell they sit inside. They never float above a heading as a kicker.

## Layout

The page is a stack of sheets inside a centred shell (`min(100% - 32px, 1180px)`), separated by 40px (28px under 640px). The sticky header is a paper strip with a 2px ink rule underneath. Each sheet pads by `clamp(16px, 2.4vw, 32px)` and opens with a head row: a headline and an optional link, justified apart, above a 2px ink rule.

The first-viewport sheet is a full drawing frame. A 1px outer border carries zone letters (A to F along the top, 1 to 4 down the left), and a 2px inner frame holds a two-column grid (`1.15fr / minmax(340px, 0.85fr)`). The drawing and its revision table sit on the left over the 24px drafting grid. The title cell sits top right, with the title-block form and meta cells below it. Under 1080px it stacks as title, then title block, then drawing. Under 640px the zone rulers are hidden and SVG labels grow (19px node text, 14px balloons) so they stay legible at about 0.55 scale.

Content inside sheets lives in ruled tables and cells, not free-floating cards: the parts list as a bordered table, detail views as a two-column grid with a 24px gap, author and contact facts as a definition table (132px label column). Breakpoints: 1080px (sheet grid), 860px (two-column blocks become one, the parts list turns into stacked rows), 640px (fine cell reflow). Legacy surfaces also break at 980px and 720px.

## Elevation & Depth

The system is completely flat (`--shadow: none`). Depth is shown the way a drawing shows it: by line weight (2px outline, 1.5px parts, 1px dimension and cell rules), by dashing for manual or provisional elements, and by hatching for sectioned or hidden parts. The sticky header and the cookie strip separate from content with a 2px ink rule, not a shadow. The one `box-shadow` in use is a 2px deep-sage spread ring on focused form fields. It is a focus stroke, not elevation.

### Named Rules
**The Line Weight Rule.** Only the three line tokens separate things: `--gv-line-thick` (2px), `--gv-line` (1.5px), `--gv-line-thin` (1px). Never add blur, glow or offset shadows.

## Shapes

Drawings have no rounded panels. Sheets, frames, tables, the title block and the submit bar are square (0). Buttons, inputs, chips and focus outlines take a barely-there 2px corner (`--gv-radius`). Circles have one job: position balloons (26px, 22px in compact lists, 34px for detail letters), numbered note and FAQ markers, 7px sage list bullets, and the sage stop-dot. SVG strokes use miter joins and square caps. Manual edges are 7/5 dashed with butt caps. Icons are drawn as 1.5px square-capped strokes inline in SVG. The FAQ plus/minus is two drawn bars, not a glyph.

## Components

### Buttons
Filled and squared, like a stamped field.
- **Shape:** slight 2px corner, 48px minimum height, 0 20px padding, 1.5px border, bold label.
- **Primary:** deep sage fill with paper text. Hover goes to an ink fill.
- **Secondary:** paper fill, ink text, ink border. Hover adds the sage wash.
- **Title-block submit:** a full-width square bar, 56px tall, deep sage, fused into the title block grid. Hover goes to ink. The focus outline is paper, inset 5px.
- **Focus:** a 2px deep-sage outline offset 3px, on every link, button and summary.
- **Disabled:** reduced opacity (0.6 general, 0.75 while sending, with a progress cursor).

### Inputs / Fields
- **Title-block cell (signature):** a ruled cell with an uppercase soft-ink label and a transparent input on a 1px dashed soft-ink baseline. On focus the whole cell takes the sage wash and the baseline becomes a 2px solid deep-sage rule. Placeholders are soft ink at full opacity.
- **Standard field (full contact form):** paper fill, 1.5px ink border, 2px corner, 12px 14px padding. Focus switches the border to deep sage and adds a 2px deep-sage ring.
- **Status:** a ruled line under the form. Success is deep sage, error is danger red.

### Navigation
The header nav is Archivo 600 at 0.9rem in ink, with a transparent 1.5px underline at 6px offset. On hover or focus the text turns deep sage and the underline turns sage. Footer links are soft ink and go deep sage on hover. Inline links (`gv-link`) are deep sage, bold, with a permanent 1.5px underline at 5px offset that turns ink on hover. External links carry the drawn arrow icon and a screen-reader note.

### Sheet
A paper panel with a 2px ink frame, square corners and fluid padding. Its head row carries the headline over a 2px ink rule. Sheet headings use drawing vocabulary in Polish (*Wykaz części*, *Szczegóły*, *Uwagi*, *Zlecenie*, *Opracował*).

### Revision Table (signature control)
A bordered fieldset. Each row has three columns (52px mono ID, name, when) separated by 1px rules. A transparent radio input covers each row. Hover and checked rows take the sage wash, and the checked ID cell is filled deep sage with paper text. Keyboard focus shows a 2px deep-sage outline inset 4px. Choosing a revision triggers the redraw.

### Process Drawing (signature)
An inline SVG built from paper boxes with 2px ink outlines. Node kinds are told apart by stroke alone: dashed 1.5px for manual work, 3px deep sage for a tool, 3.5px for your own application, and a solid ink fill with paper text for the decision. Node labels are 13px Archivo 600 with a paper halo. Every node has a numbered balloon. The route ends in the sage stop-dot. A dimension line underneath (1px rule with 11px end ticks, mono text) states the current revision. The redraw draws edges over 900ms on the exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) with a 110ms stagger, places nodes over 520ms, and pops the dot at 980ms. Under reduced motion it renders the final state. First paint is always static.

### Parts List and Notes
The parts list is a bordered table with a mono header row over a 2px rule. Each row has a balloon number, a semi-condensed title, a soft-ink description and sage-dot bullets. Under 860px each row becomes a stacked card with a ruled balloon column. Technical notes and the FAQ number themselves with mono circled counters. FAQ rows are separated by 1px rules, the question goes deep sage on hover, and the plus/minus is drawn in strokes.

### Detail View and Private Parts
A detail view is framed in 1.5px ink. Its callout strip has a 34px circled letter and the mono text "szczegół A". The screenshot sits on a sage-wash matte inside a 1px ink frame. Private deployments sit in a ruled two-column list, each item marked by a 24px hatched strip on its left edge: a section cut, meaning "private, not shown". They have no links.

### Cookie Consent
A fixed bottom strip in paper with a 2px ink top rule and small (xs) text. "Akceptuj" is the deep-sage primary button and "Tylko niezbędne" is a ghost button, both at small size.

## Do's and Don'ts

### Do:
- **Do** build every section as a sheet: paper, 2px ink frame, square corners, headline over a 2px ink rule.
- **Do** give every named part a position number in a circled mono balloon, and keep the numbering consistent between drawing and list.
- **Do** express difference through line weight (2 / 1.5 / 1px), dashing (manual, provisional) and 45° hatching (private, cut), all drawn as hard-stop line rasters.
- **Do** use deep sage for text, links and filled controls, and light sage only for strokes, dots and hatching.
- **Do** set titles in Archivo 700 at 88% width with -0.025em tracking, and annotations in JetBrains Mono at 0.74rem.
- **Do** animate only drawing acts (strokes drawing, nodes placing, the dot appearing) on the exponential ease-out, triggered by the visitor, with a static reduced-motion state.
- **Do** keep user-facing copy in Polish and the brand lowercase: gotovalues.

### Don't:
- **Don't** introduce any hue outside paper, ink and sage (danger red is for form errors only), and don't use neutral greys. Derive from ink or sage instead.
- **Don't** use gradients as tonal fills or blends. The only allowed `linear-gradient` uses are hard-stop rasters (grid, hatching, drawn strokes).
- **Don't** add shadows, blur, glow or glassmorphism. The world is flat.
- **Don't** round panels or images. 2px is the maximum corner on controls, and circles are only for balloons, counters, bullets and the stop-dot.
- **Don't** put an uppercase tracked kicker or eyebrow above a heading. Uppercase labels only name the cell they sit in.
- **Don't** use JetBrains Mono for prose or headings, and don't add a second display face.
- **Don't** autoplay motion on first paint.
- **Don't** use the dark AI-startup look (neon, gradients, robots), the faceless corporate software-house look, or a magazine or art-piece look.
