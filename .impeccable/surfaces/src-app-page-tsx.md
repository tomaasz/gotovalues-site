---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/layout.tsx","src/app/globals.css"]
---

# Surface brief: homepage (and site-wide visual world)

Scope: replacement visual world for the whole site; first surface is the homepage (`src/app/page.tsx`), replacing the "Vibe Coding" hero. Mode: Persuade.

Audience and job: owner or operations manager of a Polish MŚP; after one viewport they must believe "this person understands my operational process and will show how to put it in order". Primary action: describe one process in the contact form (`/api/contact`), present in working form in the first viewport.

Proof: Cavi and Akta (only linked products), two private deployments without links, founder background. No invented figures, testimonials, logos or prices.

Constraints: logo "Trasa do wartości" and its colours (ink #2A2623, sage #4E8B76, paper #FAF8F5) are fixed; first-person singular voice; lowercase gotovalues. User rejects: dark AI-startup look (neon, gradients, robots), faceless software-house/corporate look, overly artistic or magazine look, colours foreign to the logo.

Unresolved: display/body typefaces (Fraunces is on the default-face ban list and must be replaced or justified); how far the drawing grammar reaches into blog and legal pages (Read mode).

## Direction contract

THESIS: The client's process drawn as a working drawing of a part to be made: numbered positions, dimension lines, a title block and a revision table, instead of slogans. Refuses the category default of headline + subcopy + button over a row of equal service cards.

OWN-WORLD: Drafting sheet on paper #FAF8F5 with a faint sage-tinted grid, ink #2A2623 linework, sage #4E8B76 and deep sage #2F5E4E as the only accents. Three colours only; every tone built from hatching and line rasters, never grey fills or gradients (raise from one-bit desktop). Components are drawing parts: framed boxes, circled position balloons, leader lines to every named part (raise from portrait plate), title-block cells, monospace annotation.

STORY: The visitor recognises their own mess (Excel, e-mail, PDF, decision) drawn precisely, understands the fixed stations A off-the-shelf tool → B integration → C own application with a preview before committing (raise from darkroom; revision table as visible chronology, raise from sticker case), sees the offer as a numbered parts list with Cavi and Akta as proof (raise from kiln shelf: every element carries its position number), and describes one process.

FIRST VIEWPORT: One sheet inside a drawing frame. Left two thirds: the process drawing, positions 1–4, ending in the sage stop-dot from the logo. Top right: drawing title as the headline in one grotesk at a single monumental scale (raise from alphabet storm). Right middle: revision table A/B/C. Bottom right title block: the working form field "Opisz jeden proces" with submit, author line "gotovalues · Tomasz Gołaszewski". Parts list begins at the fold.

FORM: Assigned direction, candidate 4 of 7 on the ordered list (ISO technical drawing with title block and revision table); seed key 17b78b8c.

Signature interaction: the process drawing redraws itself stroke by stroke as revisions A → B → C are selected (static final state under reduced motion).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
