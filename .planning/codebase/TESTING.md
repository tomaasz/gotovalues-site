---
last_mapped_commit: d4a10f716533106319f4f68c685d17fd7f0ea026
last_mapped_at: 2026-11-24
---
# Testing Patterns

**Analysis Date:** 2026-11-24

## Test Framework

**Runner:**
- Node's built-in `node:test` runner executes the repository tests through `tsx`.
- Storybook stories are covered by a Vitest project configured in `vitest.config.ts` with `@storybook/addon-vitest` and Playwright Chromium.
- Playwright runs browser end-to-end tests from `e2e/` using `playwright.config.ts`.

**Assertion Library:**
- Unit and integration tests use `node:assert` and `node:assert/strict`.
- Component tests use Testing Library queries from `@testing-library/react`.
- Browser tests use Playwright's `expect` assertions.

**Run Commands:**
```bash
pnpm test              # tests/*.test.ts and tests/*.test.tsx through tsx
pnpm lint              # ESLint over src, tests, e2e, and config files
pnpm test:e2e          # Playwright Chromium suite with a Next dev server
pnpm exec vitest       # Storybook/Vitest project when needed
```

## Test File Organization

**Location:** Unit, API, SEO, and component tests live in the top-level `tests/` directory. Browser journeys live in `e2e/`.

**Naming:** Use `.test.ts` or `.test.tsx` for Node/DOM tests and `.spec.ts` for Playwright tests.

**Structure:** Tests generally mirror the feature under test, for example `tests/contact-api.test.ts` covers `src/app/api/contact/route.ts`.

## Test Structure

**Suite Organization:**
```typescript
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

describe('SEO config', () => {
  test('robots.txt is configured correctly', () => {
    assert.ok(robots());
  });
});
```

**Patterns:**
- Group related cases with `describe` or a parent `test` and nested `t.test` cases.
- Use `test.afterEach` or `afterEach` to restore mocks and clean up rendered DOM.
- Assert status codes and stable user-visible messages for route handlers.

## Mocking

**Framework:** Use `mock` from `node:test`.

**Patterns:**
```typescript
mock.method(global, 'fetch', async () => new Response(JSON.stringify({ id: 'mocked_id' })));
mock.restoreAll();
```

**What to Mock:** External HTTP calls such as Resend fetches and browser globals in `tests/contact-api.test.ts`.

**What NOT to Mock:** Pure schema, formatting, SEO metadata, and deterministic calculation logic should be tested directly.

## Fixtures and Factories

**Test Data:** Tests construct small inline payloads and `Request` instances. Reusable fixtures are not centralized.

**Location:** Keep feature-specific payloads near the test that explains their expected behavior.

## Coverage

**Requirements:** No enforced numeric coverage threshold is declared in `package.json` or `vitest.config.ts`.

**View Coverage:** `pnpm exec vitest --coverage` is available through the installed V8 coverage package when a coverage report is needed.

## Test Types

**Unit Tests:** Pure helpers, content, SEO metadata, and calculations are tested in `tests/*.test.ts`.

**Integration Tests:** API route tests call exported handlers with real `Request` objects and mocked network boundaries.

**E2E Tests:** `e2e/roi-calculator.spec.ts` starts the app on port 3199 and verifies a complete user interaction in Chromium.

## Common Patterns

**Async Testing:** Use `async` test callbacks with `await`, and Testing Library's `act`/`waitFor` around client state transitions.

**Error Testing:** Assert both HTTP status and response message, including malformed JSON, validation failures, rate limits, and provider errors in `tests/contact-api.test.ts`.

---

*Testing analysis: 2026-11-24*
