---
last_mapped_commit: d4a10f716533106319f4f68c685d17fd7f0ea026
last_mapped_at: 2026-11-24
---
<!-- refreshed: 2026-11-24 -->
# Architecture

**Analysis Date:** 2026-11-24

## System Overview

```text
Next.js App Router pages and route handlers (`src/app/`)
        │
        ├── shared content (`src/content/`)
        ├── UI/components (`src/components/`, `packages/ui/`)
        └── domain helpers (`src/lib/`)
                 │
                 ├── Resend email API (`src/app/api/contact/route.ts`)
                 ├── PostHog/Clarity/GA providers
                 └── static/content responses and metadata
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App routes | Render pages, metadata, feeds, robots and JSON endpoints | `src/app/` |
| Home composition | Assemble the landing page sheets and sections | `src/app/page.tsx`, `src/components/home/` |
| Shared UI | Reusable controls and layout components | `src/components/`, `packages/ui/src/` |
| Content model | Typed marketing, FAQ and blog content | `src/content/site.ts`, `src/content/faq.ts`, `src/content/blog.ts` |
| Domain helpers | Validation, email rendering, logging and MCP catalog logic | `src/lib/` |

## Pattern Overview

**Overall:** Next.js 16 App Router with React Server Components by default and small client leaves for forms, analytics and interactive UI.

**Key Characteristics:**
- Route modules are the primary entry points and compose shared components.
- Static marketing content is kept in typed TypeScript modules.
- API behavior is isolated in route handlers and delegates validation to `src/lib/`.

## Layers

**Presentation:**
- Purpose: Pages, layouts, styles and interactive leaves.
- Location: `src/app/`, `src/components/`, `src/app/globals.css`.
- Depends on: Content and library helpers.

**Content and domain:**
- Purpose: Typed copy, product data, FAQ/blog data and validation logic.
- Location: `src/content/`, `src/lib/`.
- Used by: App routes, API handlers and metadata endpoints.

**Workspace packages:**
- Purpose: Shared UI primitives and design tokens.
- Location: `packages/ui/src/`, `packages/design-tokens/src/`.

## Data Flow

### Primary page request

1. Next.js resolves a route in `src/app/**/page.tsx`.
2. The route reads typed content and composes shared components.
3. Server-rendered HTML includes metadata and JSON-LD where applicable.

### Contact submission

1. Client form posts JSON to `src/app/api/contact/route.ts`.
2. `contactFormSchema` in `src/lib/contact.ts` validates and normalizes fields.
3. The handler rate-limits by request IP, sends through Resend, logs, and returns JSON status.

**State Management:** Local React state in interactive components. Static content is module data. The contact API uses an in-memory rate-limit map.

## Key Abstractions

**Typed site content:** `src/content/site.ts` exports product, offer, approach and contact structures consumed by pages and AI routes.

**Shared UI primitives:** `packages/ui/src/index.ts` and `src/components/ui/` provide reusable controls with Tailwind/design-token styling.

## Entry Points

**Web application:** `src/app/layout.tsx` provides fonts, metadata, providers, consent and footer. `src/app/page.tsx` is the home page.

**API:** `src/app/api/contact/route.ts` handles contact form POST requests.

**Content endpoints:** `src/app/ai/**`, `src/app/feed.xml/route.ts`, `src/app/sitemap.ts`, and `src/app/robots.ts` expose machine-readable content.

## Architectural Constraints

- **Runtime:** Next.js server/client split with `typedRoutes` enabled in `next.config.ts`.
- **Global state:** Analytics and consent providers are mounted from `src/app/layout.tsx`.
- **Aliases:** `@/*` resolves to `src/*` through `tsconfig.json`.
- **Deployment:** Rewrites and redirects are centralized in `next.config.ts`.

## Error Handling

API handlers return explicit JSON status codes for malformed JSON, validation failures, rate limits, missing configuration and provider failures. Shared logging is implemented in `src/lib/logger.ts`.

## Cross-Cutting Concerns

**Logging:** `src/lib/logger.ts` and Sentry instrumentation.
**Validation:** Zod schemas in `src/lib/`.
**Analytics and consent:** `src/components/posthog-provider.tsx`, `src/components/clarity-provider.tsx`, `src/components/ga-provider.tsx`, `src/lib/cookie-consent.ts`.

---

*Architecture analysis: 2026-11-24*
