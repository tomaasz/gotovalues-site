# process/context.md — Durable Project Context for AI Agents

> **Contract:** Agents should consult this file before starting complex tasks to maintain accurate mental models of the project.
> Last updated: 2026-09-20

---

## 1. System Overview & Core Purpose

`gotovalues.com` is the primary web presence for **gotovalues**, serving two functions:

1. **Commercial Positioning & Lead Generation:** Showcasing competencies in analytics, workflow automation, and custom web/AI applications. Primary conversion funnel via `/api/contact` (with SupportFlow pilot qualification).
2. **Product Proof-of-Competence:** Showcasing public, live products developed by gotovalues:
   - **Cavi:** AI career management & resume builder platform.
   - **Akta:** Fast search portal and OCR analysis engine for 19th/20th-century historical records.
   - _Private Implementations:_ Documented without public links.

---

## 2. Technical Stack

| Layer                   | Technology              | Details                                                     |
| ----------------------- | ----------------------- | ----------------------------------------------------------- |
| **Framework**           | Next.js 16.3.1          | App Router, `typedRoutes: true`                             |
| **UI Library**          | React 19.2.8            | Server Components default, Client Components at leaves      |
| **Language**            | TypeScript 6.0          | Strict mode, explicit types, zod validation schemas         |
| **Styling**             | Tailwind CSS v4         | PostCSS, clsx, dark theme (zinc-950, emerald/amber accents) |
| **Component Workspace** | Hermes UI               | `packages/design-tokens`, `packages/ui`                     |
| **Email & Delivery**    | Resend 6.20.0           | Contact form submission at `/api/contact`                   |
| **Observability**       | Sentry 10.70.0          | Client/server error tracking                                |
| **Analytics**           | PostHog & Clarity       | Product telemetry, privacy-preserving tracking              |
| **Testing**             | Node Test Runner        | `tsx --test tests/*.test.ts tests/*.test.tsx`               |
| **CI / Hosting**        | GitHub Actions / Vercel | CI validates; production deployed manually to Vercel        |

---

## 3. Directory Layout

```text
src/
├── app/                        # Next.js App Router
│   ├── api/contact/route.ts    # Contact form endpoint (Resend + rate limit)
│   ├── dla-produkcji/          # Dedicated B2B landing
│   ├── dla-logistyki/          # Dedicated B2B landing
│   ├── jak-pracuje/            # Working process page
│   ├── kalkulator-roi/         # Interactive ROI calculator
│   ├── polityka-prywatnosci/   # Privacy policy
│   ├── supportflow/            # SupportFlow qualification page
│   ├── triageflow/             # TriageFlow landing
│   ├── vs-freelancer-automatyzator/ # Comparative positioning page
│   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind CSS v4 definitions
│   └── robots.ts, sitemap.ts   # Dynamic SEO handlers
├── components/                 # React components
│   ├── contact-form.tsx        # Contact form with SupportFlow fields
│   ├── cookie-consent.tsx      # Privacy consent banner
│   └── ui/                     # UI primitives (buttons, cards, badges)
├── lib/                        # Business logic, validation schemas, utilities
packages/
├── design-tokens/              # Hermes design tokens
└── ui/                         # Hermes shared UI components
tests/                          # Test suite (tsx --test)
docs/                           # Runbooks (deployment.md)
process/                        # Agent durable context, decisions, routing, plans
```

---

## 4. Key Project Invariants & Conventions

1. **Brand Identity:** The brand name must always be lowercase `gotovalues` in active content and headings.
2. **Language Separation:** User-facing text is written in Polish. Code, architecture documents, variable names, and commit messages are in English.
3. **Public vs Private Products:** Exactly two public products (`Cavi`, `Akta`) may have external links. All client case studies remain unlinked.
4. **Vercel Deployment:** Releases only via manual command with 1Password token `op://hosty-debianovh/vercel/token`. Never from CI.
5. **No Direct Secrets:** All credentials (`RESEND_API_KEY`, Vercel tokens) are injected via runtime environment or 1Password.
