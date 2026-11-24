---
last_mapped_commit: d4a10f716533106319f4f68c685d17fd7f0ea026
last_mapped_at: 2026-11-24
---
# External Integrations

**Analysis Date:** 2026-11-24

## APIs & External Services

**Email:**
- Resend - sends contact form submissions from `src/app/api/contact/route.ts`.
  - SDK/Client: `resend` package.
  - Auth: `RESEND_API_KEY`.
  - Routing: `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.

**Analytics:**
- PostHog - consent-gated event/product analytics in `src/components/posthog-provider.tsx`.
  - SDK/Client: `posthog-js`.
  - Auth/config: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.
  - Proxy: `next.config.ts` rewrites `/r9f3c0/*` to EU PostHog endpoints.
- Microsoft Clarity - consent-gated heatmaps and session recordings in `src/components/clarity-provider.tsx`.
  - Auth/config: `NEXT_PUBLIC_CLARITY_ID`.
- Google Analytics 4 - consent-mode analytics in `src/components/ga-provider.tsx`.
  - Auth/config: `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

## Data Storage

**Databases:**
- None detected. The site stores content in TypeScript modules under `src/content/`.

**File Storage:**
- Static assets are committed under `public/` and `brand/`.

**Caching:**
- Next.js runtime and hosting cache only. No separate cache client detected.

## Authentication & Identity

**Auth Provider:**
- Not applicable. Public marketing pages and contact submission endpoint do not expose user accounts.

## Monitoring & Observability

**Error Tracking:**
- `@sentry/nextjs` is a declared dependency. Verify runtime initialization files before adding new instrumentation.

**Logs:**
- Application logging uses the project logger in `src/lib/logger.ts`, including contact and analytics failures.

## CI/CD & Deployment

**Hosting:**
- Vercel deployment is documented in `docs/deployment.md` and is driven by pushes to `main`.

**CI Pipeline:**
- GitHub Actions workflows under `.github/workflows/` run build, lint/test-related checks, security scanning, and guarded bot PR merges.
- CI uses pnpm and Node setup actions. GitGuardian scanning is enabled when its CI secret is configured.

## Environment Configuration

**Required env vars:**
- Contact delivery: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL`.
- Consent-gated analytics: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_CLARITY_ID`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` as applicable.

**Secrets location:**
- Environment variables supplied by local environment or deployment provider. Secret file contents are intentionally not inspected or documented.

## Webhooks & Callbacks

**Incoming:**
- No third-party webhook endpoints detected. `src/app/api/contact/route.ts` is an inbound form API route.

**Outgoing:**
- Contact submissions call Resend's email API.
- Analytics providers receive browser events only after consent.

---

*Integration audit: 2026-11-24*
