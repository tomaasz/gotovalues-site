# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the owner or operations manager of a Polish small or medium-sized business (MŚP) whose team loses time on documents, statuses, exceptions and manual re-typing of data between Excel, e-mail, PDFs and portals. They are evaluating whether one specific process can be fixed without a large system, a team build-out or a budget in the tens of thousands up front.

Highlighted verticals (dedicated landings, not the only audience):

- production and processing: quality documents, complaints, batch statuses, operational decisions (`/dla-produkcji`);
- logistics and freight forwarding: order statuses, transport documents, advice notes, carrier settlements where TMS/ERP do not close the real work (`/dla-logistyki`).

Secondary: people checking proof of competence (public products Cavi and Akta, the technical blog) and AI assistants reading `llms.txt` / `ai.txt`.

## Product Purpose

gotovalues is the web presence of an independent consultant-engineer, Tomasz Gołaszewski. It explains the offer (analytics and automation, web applications and AI, complete products and platforms), proves competence with working products, and converts visitors into a short description of one process via the contact form (`/api/contact`, Resend).

Success: a qualified business visitor describes a concrete process to fix. Supporting tools: ROI calculator (`/kalkulator-roi`), SupportFlow pilot qualification (`/supportflow`), TriageFlow landing (`/triageflow`), working-model page (`/jak-pracuje`), comparison page (`/vs-freelancer-automatyzator`), blog.

## Positioning

An independent partner, speaking in the first person singular, who starts from the process rather than the technology: first check whether an off-the-shelf tool or integration solves the problem, and build a dedicated application or AI agent only when the real process requires it, without replacing the client's existing environment. A working deployment in weeks, not months.

What a neighbouring vendor cannot truthfully copy: years of operational experience in leasing, asset remarketing, machine valuation and process digitisation, combined with own public products built on the same stack (Cavi, Akta), and direct work with the client without agency overhead.

## Operating Context

Visitors arrive from search, LinkedIn and direct links, usually on desktop during work hours, also on mobile. They compare gotovalues with freelancers, automation specialists (Make/Zapier) and software houses. The first contact is a short description of a process, no specification required. Response within 24 h on working days; remote work with companies from Warsaw, Mazovia and all of Poland.

## Capabilities and Constraints

- Offer pillars: analytics and automation (dashboards, document/data automation, integrations); web applications and AI (search-heavy web apps, AI pipelines: classification, extraction, normalisation, validation; OCR with cost monitoring); complete products (auth, roles, admin panel, payments, PDF/DOCX, exports, browser extensions).
- Stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, shared `@hermes/design-tokens` and `@hermes/ui` packages, Vercel hosting.
- Content source of truth: `src/content/site.ts` (offer, products, about, landings) and `src/content/blog.ts`.
- User-facing copy is Polish; code and technical docs are English.
- **Not product truth:** the current homepage hero (`src/components/vibe-coding-hero-section.tsx`) speaks as "my" (a team), centres "Vibe Coding" and uses unverified figures ("nawet o 70% taniej", "10x", "w kilka dni"). Future work must use the first-person singular voice and must not reuse these figures until data exists. AI-assisted building may be mentioned as a working method, not as the headline.

## Brand Commitments

- Name always lowercase: `gotovalues`, including headings.
- Logo "Trasa do wartości" (route to value), adopted 2026-10-04: a geometric single-line "g" whose descender turns at a right angle and ends in a sage stop-dot. Masters, variants and usage guide in `brand/logo/` (`brand/logo/README.md`); web copies in `public/brand/`, icons in `public/favicon/`, OG image `public/images/og.png`. Logo colours are fixed: ink `#2A2623`, sage `#4E8B76`, paper `#FAF8F5`.
- Voice: direct, concrete, first person singular, honest about when not to build. No agency jargon, no hype.
- Exactly two publicly linked products: Cavi (`https://cavi.gotova.pl/`) and Akta (`https://akta.gotova.pl`). Private deployments are described without links or client names.

## Evidence on Hand

- Public products: Cavi (AI career management and CV builder), Akta (search and OCR over 19th/20th-century archival records). Illustrations: `public/images/products/`.
- Private deployments (no links): OCR for operational documents; translation and normalisation workflow for archival records. Illustrations: `public/images/private/`.
- Founder profile: Tomasz Gołaszewski, LinkedIn `https://www.linkedin.com/in/tomasz-golaszewski/`; background in leasing, asset management, machine valuation, process digitisation.
- Technical blog with articles on AI and automation (`src/content/blog.ts`).
- Absent and must not be fabricated: client testimonials, client logos, named case studies, benchmarks or savings percentages, pricing, team size, certifications.

## Product Principles

1. Process before technology: every page leads with the operational problem, not the tool.
2. Honesty over hype: claim only what working products and real experience prove; say when building is not the answer.
3. One person, direct contact: the visitor talks to the person who will build it.
4. Lightweight and cheap to run: favour solutions that fit the existing environment and have a low maintenance cost.
5. Proof by working software: Cavi, Akta and private deployments carry credibility, not adjectives.
