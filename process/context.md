# process/context.md — Durable Project Context for AI Agents

> **Contract:** Agents should consult this file before starting complex tasks to maintain accurate mental models of the project.
> Last updated: 2026-11-27

---

## 1. System Overview & Core Purpose

`gotovalues.com` is the web presence for **gotovalues** (Tomasz Gołaszewski), focused on a remote-first, planned two-track offer for Polish small businesses, JDG and SMEs:

1. **Processes, data, automation & lightweight custom web tools** (remote across Poland, planned small stages).
2. **Planned remote IT organization & support** (domain email, Microsoft 365 / Google Workspace, backups, permissions, remote configuration — **no onsite visits, no physical repair, no 24/7 emergency SLA**).

Primary conversion funnel: `/api/contact` (Resend) via `TitleBlockForm` / `ContactForm`, plus bot-protected `PhoneReveal` (no raw phone digits in SSR HTML or JSON-LD). Public product/implementation examples (`Cavi`, `Akta`) are intentionally omitted from public pages per owner decision (2026-11-27).

---

## 2. Technical Stack

| Layer                   | Technology              | Details                                                        |
| ----------------------- | ----------------------- | -------------------------------------------------------------- |
| **Framework**           | Next.js 16              | App Router, `typedRoutes: true`                                |
| **UI Library**          | React 19                | Server Components default, Client Components at leaves         |
| **Language**            | TypeScript (strict)     | Zod validation schemas (`src/lib/contact.ts`)                  |
| **Styling**             | Tailwind CSS v4         | "The Working Drawing" (ISO 128 light paper/ink/sage, `DESIGN.md`) |
| **Component Workspace** | Hermes UI               | `packages/design-tokens`, `packages/ui`                        |
| **Email & Delivery**    | Resend                  | Contact form submission at `/api/contact`                      |
| **Observability**       | Sentry                  | Client/server error tracking                                   |
| **Analytics**           | PostHog, Clarity, GA    | Privacy-preserving tracking with cookie consent                |
| **Testing**             | Node Test Runner        | `npx tsx --test tests/*.test.ts tests/*.test.tsx`              |
| **CI / Hosting**        | GitHub Actions / Vercel | Vercel Git integration / manual fallback deploy                |

---

## 3. Directory Layout

```text
src/
├── app/                              # Next.js App Router
│   ├── api/contact/route.ts          # Contact form endpoint (Resend + rate limit)
│   ├── blog/                         # Technical blog (`/blog` + `/blog/[slug]`)
│   ├── jak-pracuje/                  # Redirects to `/vs-freelancer-automatyzator`
│   ├── vs-freelancer-automatyzator/  # Working-model page (canonical `/jak-pracuje`)
│   ├── polityka-prywatnosci/         # Privacy policy
│   ├── ai/, ai.txt/, llms.txt/       # AI crawler endpoints
│   ├── layout.tsx                    # Root layout (fonts, metadata, Schema.org)
│   ├── page.tsx                      # Homepage ("The Working Drawing")
│   ├── globals.css, home.css         # Styles
│   └── robots.ts, sitemap.ts         # Dynamic SEO handlers
├── components/                       # React components (`home/`, forms, `phone-reveal`)
├── content/                          # `site.ts`, `faq.ts`, `blog.ts`
└── lib/                              # Validation, logging, MCP catalog
packages/
├── design-tokens/                    # Hermes design tokens
└── ui/                               # Hermes shared UI components
tests/                                # Test suite (`tsx --test`)
docs/                                 # Runbooks (`deployment.md`) & `content-audit/`
process/                              # Agent durable context, decisions, routing, plans
```

Legacy routes (`/supportflow`, `/triageflow`, `/kalkulator-roi`, `/dla-produkcji`, `/dla-logistyki`, `/produkty`, `/support-ai`) permanently redirect (301) to `/` via `next.config.ts`.

---

## 4. Key Project Invariants & Conventions

1. **Brand Identity:** Always lowercase `gotovalues` in active Polish copy and headings.
2. **Language Separation:** User-facing copy is Polish; code, architecture docs, variable names, and commit messages are English.
3. **Operational Honesty:** Remote-only planned work (based in Zabrodzie, powiat wyszkowski). No onsite visits, no physical PC repair, no unverified absolutes (`24h`, `od ręki`, `zawsze`), no fabricated case studies.
4. **No Public Implementation Examples:** `Cavi` and `Akta` are not publicly displayed on `/` or `/llms.txt` unless owner explicitly reverses this decision.
5. **No Direct Secrets:** Credentials (`RESEND_API_KEY`, Vercel tokens) live only in runtime env / 1Password (`op://hosty-debianovh/vercel/token`).
