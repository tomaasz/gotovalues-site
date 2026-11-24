---
last_mapped_commit: d4a10f716533106319f4f68c685d17fd7f0ea026
last_mapped_at: 2026-11-24
---
# Technology Stack

**Analysis Date:** 2026-11-24

## Languages

**Primary:**
- TypeScript 6.x - Next.js application, API route handlers, shared UI and tests in `src/`, `tests/`, and `e2e/`.
- JavaScript/ESM - build and lint configuration such as `next.config.ts`, `vitest.config.ts`, and `eslint.config.mjs`.

**Secondary:**
- CSS - Tailwind and project styles in `src/app/globals.css` and package UI sources.

## Runtime

**Environment:**
- Node.js >=20.0.0, declared in `package.json`.

**Package Manager:**
- pnpm workspace - lockfile `pnpm-lock.yaml` is present.

## Frameworks

**Core:**
- Next.js 16.4.6 with App Router - routes and server/client components under `src/app/`.
- React 19.3.1 and React DOM 19.3.1 - UI rendering.
- Tailwind CSS 4.3.5 with `@tailwindcss/postcss` - styling.

**Testing:**
- Vitest 4.1.11, Testing Library React 16.3.3, and Storybook 10.6.7 - component and unit-oriented tests.
- Playwright 1.65.0 - browser tests in `e2e/` and Vitest browser provider.

**Build/Dev:**
- TypeScript strict mode with `@/*` mapped to `src/*` in `tsconfig.json`.
- ESLint 9 with `eslint-config-next` and Storybook plugin.
- Storybook Vite integration for component development and story tests.

## Key Dependencies

**Critical:**
- `@hermes/ui` and `@hermes/design-tokens` workspace packages - shared UI primitives and design tokens.
- `zod` 4.6.7 - schema validation, including AI catalog data.
- `resend` 6.38.0 - contact form email delivery.

**Infrastructure:**
- `@sentry/nextjs` 11.12.0 - error monitoring integration.
- `posthog-js` 1.448.0 - consent-gated product analytics.
- `lucide-react` 1.72.0 - icon components.

## Configuration

**Environment:**
- Runtime values are read through `process.env` in `src/app/api/contact/route.ts` and analytics providers. `.env*` files may exist and must not be read into committed documentation.
- Public analytics identifiers include `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_CLARITY_ID`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

**Build:**
- `next.config.ts` enables typed routes, PostHog rewrites, and legacy redirects.
- `postcss.config.mjs`, `tsconfig.json`, `vitest.config.ts`, and `playwright.config.ts` define CSS, TypeScript, test, and browser-test behavior.

## Platform Requirements

**Development:**
- Node.js 20 or newer and pnpm. Use `pnpm dev`, `pnpm lint`, `pnpm test`, and `pnpm test:e2e` from `package.json`.

**Production:**
- Next.js production server or the repository's Vercel deployment integration, with required Resend and analytics environment configuration.

---

*Stack analysis: 2026-11-24*
