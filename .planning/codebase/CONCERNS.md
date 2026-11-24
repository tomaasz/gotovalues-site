---
last_mapped_commit: d4a10f716533106319f4f68c685d17fd7f0ea026
last_mapped_at: 2026-11-24
---
# Codebase Concerns

**Analysis Date:** 2026-11-24

## Tech Debt

**Large content modules:**
- Issue: Blog and site copy are held in very large TypeScript modules.
- Files: `src/content/blog.ts`, `src/content/site.ts`
- Impact: Content edits require rebuilding the application module and increase review and bundle risk.
- Fix approach: Split content by domain or migrate stable editorial data to typed markdown/MDX with a validated loader.

**Large product pages:**
- Issue: Product landing pages combine metadata, JSON-LD, copy, pricing, and rendering in one file.
- Files: `src/app/supportflow/page.tsx`, `src/app/triageflow/page.tsx`
- Impact: Copy changes and layout changes are hard to review independently and duplicated patterns can drift.
- Fix approach: Extract shared product-page data and presentational sections while keeping route metadata local.

## Known Bugs

**In-memory contact rate limiter:**
- Symptoms: Limits reset on process restart and are local to one runtime instance.
- Files: `src/app/api/contact/route.ts`
- Trigger: Multiple Vercel/edge instances or a cold start.
- Workaround: Keep the limit as a best-effort spam guard and add a shared provider for production enforcement.

## Security Considerations

**Untrusted blog HTML rendering:**
- Risk: Blog bodies are inserted directly into the DOM.
- Files: `src/app/blog/[slug]/page.tsx`, `src/content/blog.ts`
- Current mitigation: JSON-LD values are escaped before insertion, but post body rendering has no equivalent sanitizer at the route.
- Recommendations: Sanitize editorial HTML at ingestion/build time with an explicit allowlist and test dangerous markup.

**Client-side analytics scripts:**
- Risk: Dynamically injected analytics code expands the trusted client surface.
- Files: `src/components/clarity-provider.tsx`, `src/components/ga-provider.tsx`, `src/app/layout.tsx`
- Current mitigation: Providers are isolated components and consent state is checked.
- Recommendations: Keep scripts behind consent, use CSP-compatible loading, and cover opt-in/opt-out behavior with browser tests.

## Performance Bottlenecks

**Monolithic blog module:**
- Problem: `src/content/blog.ts` is over 2,500 lines and is imported by blog routes.
- Files: `src/content/blog.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- Cause: All editorial entries are represented in one eagerly imported module.
- Improvement path: Split entries or load static content per slug so listing and detail routes do not carry unnecessary data.

**Repeated product-page markup:**
- Problem: Large pages duplicate arrays and section markup.
- Files: `src/app/supportflow/page.tsx`, `src/app/triageflow/page.tsx`
- Cause: Pages evolved independently around the same marketing structure.
- Improvement path: Share typed section components and data structures after snapshotting current copy.

## Fragile Areas

**Contact delivery path:**
- Files: `src/app/api/contact/route.ts`, `src/lib/contact.ts`, `tests/contact-api.test.ts`
- Why fragile: Correct behavior depends on runtime environment variables, Resend response shapes, and mutable module-level rate-limit state.
- Safe modification: Preserve the 400/429/500/503 contract, add isolated tests for provider failures, and avoid asserting on secret values.
- Test coverage: Main status paths exist, but concurrent requests and multi-instance behavior are not covered.

**Consent persistence and hydration:**
- Files: `src/lib/cookie-consent.ts`, `src/components/cookie-consent.tsx`
- Why fragile: Browser-only storage and custom events interact with server rendering and hydration timing.
- Safe modification: Exercise first render, storage read/write, cross-component updates, and denied consent in a browser environment.
- Test coverage: No dedicated consent test was detected in `tests/`.

## Scaling Limits

**Serverless memory state:**
- Current capacity: The contact limiter caps one process map at 2,000 IP keys.
- Limit: State is not shared across instances and eviction is insertion-order based.
- Scaling path: Use a managed rate-limit store or platform-native protection with a bounded TTL policy.

## Dependencies at Risk

**Fast-moving framework/toolchain:**
- Risk: The project tracks Next.js 16, React 19, TypeScript 6, Vite 8, and Storybook 10 together.
- Impact: Minor upgrades can change App Router, test runner, or Storybook behavior across several layers.
- Migration plan: Keep lockfile updates isolated, run `pnpm lint`, unit tests, build, and E2E checks for each upgrade.

## Missing Critical Features

**Operational visibility for contact delivery:**
- Problem: Logs record delivery failures, but there is no durable queue or retry path visible in the route.
- Blocks: Reliable recovery when the mail provider is temporarily unavailable.

## Test Coverage Gaps

**Editorial sanitization:**
- What's not tested: Dangerous HTML handling for blog content.
- Files: `src/app/blog/[slug]/page.tsx`
- Risk: A future content edit can introduce executable or unsafe markup.
- Priority: High

**Browser-only behavior:**
- What's not tested: Cookie consent and analytics gating across hydration and navigation.
- Files: `src/lib/cookie-consent.ts`, `src/components/cookie-consent.tsx`, `src/components/ga-provider.tsx`, `src/components/clarity-provider.tsx`
- Risk: Privacy controls can regress without failing server-side tests.
- Priority: Medium

**Route-level product metadata:**
- What's not tested: JSON-LD validity and consistency of pricing metadata across product routes.
- Files: `src/app/supportflow/page.tsx`, `src/app/triageflow/page.tsx`, `src/app/vs-freelancer-automatyzator/page.tsx`
- Risk: Search previews and structured data can silently drift from visible copy.
- Priority: Medium

---

*Concerns audit: 2026-11-24*
