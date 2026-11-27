# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners of Polish small businesses, JDG and SMEs (MŚP) who want to eliminate repetitive manual work between email, spreadsheets and tools, need a lightweight custom web tool, or need planned remote help organizing their business IT (domain email, backups, permissions, tool configuration).

Secondary: visitors reading the technical blog (`/blog`) or working-model page (`/jak-pracuje`) and AI assistants reading `/llms.txt` and `/ai.txt`.

## Product Purpose

`gotovalues` is the web presence of Tomasz Gołaszewski. It communicates a focused, remote-first, planned offer (processes/data/automation, lightweight custom web tools, planned remote IT support), explains the process-first working model, and converts visitors into a concise contact message via `/api/contact` (Resend) or bot-protected `PhoneReveal`.

Active public routes: `/`, `/jak-pracuje` (redirecting to `/vs-freelancer-automatyzator`), `/blog`, `/blog/[slug]`, `/polityka-prywatnosci`, plus technical/AI routes (`/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/ai.txt`, `/ai/*`, `/feed.xml`). Legacy routes (`/supportflow`, `/triageflow`, `/kalkulator-roi`, `/dla-produkcji`, `/dla-logistyki`, `/produkty`, `/support-ai`) permanently redirect (301) to `/`.

## Positioning

Independent practitioner speaking in the first person singular (`ja`), operating remotely across Poland (based in Zabrodzie, powiat wyszkowski) alongside full-time work:

1. **Procesy, dane i automatyzacja** — connecting email, spreadsheets and systems, organizing data/reports, applying AI only where it saves concrete repetitive work.
2. **Dedykowane narzędzia i aplikacje** — lightweight web apps, internal panels, forms and clean business websites when off-the-shelf tools do not fit.
3. **Uporządkowanie IT i zdalne wsparcie** — domain email, Microsoft 365 / Google Workspace, automated backups, permissions and planned remote technical support.

Hard operational boundaries: **no onsite visits (dojazdy), no physical hardware repair, no 24/7 emergency SLA, no unverified absolutes (`24h`, `od ręki`, `zawsze`, `bez ukrytych kosztów`)**.

## Brand Commitments

- Name always lowercase: `gotovalues`, including headings.
- Logo "Trasa do wartości" (route to value): geometric single-line "g" ending in a sage stop-dot (`#2A2623` ink, `#4E8B76` sage, `#FAF8F5` paper).
- Voice: direct, concrete, first person singular, plain Polish without consulting jargon or hype.
- **No public product/implementation examples on the website** (owner decision, 2026-11-27): `Cavi`, `Akta` and private deployments are not publicly displayed on `/` or `/llms.txt`.
- **Zero fabrication:** never invent client case studies, metrics, testimonials, certifications, or real-client claims. Model/calculation articles on the blog must be explicitly labeled as illustrative scenarios.
- **Short "O mnie":** concise bio without exposing leasing or machine-valuation details.

## Capabilities and Constraints

- Stack: Next.js 16 App Router (`typedRoutes: true`), React 19, TypeScript strict, Tailwind CSS v4, shared `@hermes/design-tokens` and `@hermes/ui`, Vercel hosting.
- Content sources of truth: `src/content/site.ts`, `src/content/faq.ts`, `src/content/blog.ts`.
- Visual contract: `DESIGN.md` ("The Working Drawing" — ISO 128 technical drawing aesthetic).
- Phone protection: `PhoneReveal` keeps raw phone digits out of SSR HTML and JSON-LD until user click.
