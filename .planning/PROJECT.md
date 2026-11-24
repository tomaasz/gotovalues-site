# gotovalues-site

## What This Is

gotovalues-site is the public website for gotovalues, aimed at local production and processing companies that need practical software for real operational work. The site explains the offer, shows public product proof, and invites a conversation about one concrete process problem.

## Core Value

Public visitors can quickly understand how gotovalues helps with operational problems and can send a low-friction contact request.

## Business Context

- **Customer**: Local production and processing companies evaluating custom tools and practical AI.
- **Revenue model**: Direct project and implementation work.
- **Success metric**: Visitors understand the offer and submit a useful contact request, with `/produkty` and `/dla-produkcji` supporting evaluation and outreach.

## Requirements

### Validated

(None yet — ship to validate.)

### Active

- [ ] Improve homepage positioning, conversion copy, and trust signals.
- [ ] Reduce contact-form friction and keep the payload simple.
- [ ] Apply the lowercase gotovalues brand and strengthen the products proof page.
- [ ] Add the focused `/dla-produkcji` acquisition page.

### Out of Scope

- Replacing an ERP — the offer is lightweight tools for focused workflows.
- A new page architecture or heavy component system — the existing Next.js structure remains the base.
- Unverified customer claims or generic portfolio language — source material requires evidence-based copy.

## Context

- The codebase is a Next.js 16 App Router application with React 19, typed content in `src/content/site.ts`, shared components under `src/components/`, and contact handling in `src/app/api/contact/route.ts`.
- Existing source plans provide seven requirements and eight implementation constraints. No ADR-classified document was found.
- The ingest report records a competing variant about whether the contact-form `service` selector remains. This is unresolved and must be decided during the contact-form phase.

## Constraints

- **Content architecture**: Keep marketing copy and structured data in `src/content/site.ts` and preserve current page/component boundaries.
- **Contact API contract**: Keep name, email, optional company, and message readable. The `service` field direction remains pending.
- **Verification**: Run the repository's tests, lint, and production build for affected work. Contact changes update `tests/contact.test.ts`.
- **Deployment**: Preserve the existing Next.js/Vercel and Cloudflare build paths where relevant.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use the existing Next.js App Router and typed content model | The current codebase already serves the public site and shared components | ✓ Good |
| Keep the site content-first and avoid heavy new abstractions | Source implementation plans require minimal structural change | — Pending |
| Resolve the contact-form `service` selector conflict during its phase | Ingested plans contain equal-precedence directions | — Pending |

---
*Last updated: 2026-11-25 after brownfield onboarding and document ingest*
