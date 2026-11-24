---
last_mapped_commit: d4a10f716533106319f4f68c685d17fd7f0ea026
last_mapped_at: 2026-11-24
---
# Coding Conventions

**Analysis Date:** 2026-11-24

## Naming Patterns

**Files:**
- React components use kebab-case filenames such as `src/components/contact-form.tsx`.
- Route handlers follow App Router paths under `src/app/api/**/route.ts`.

**Functions:**
- Functions and handlers use camelCase, with descriptive names such as `buildContactEmail` in `src/lib/contact.ts`.
- React components use PascalCase exports such as `ContactForm` in `src/components/contact-form.tsx`.

**Variables:**
- Local variables and object properties use camelCase. Form field names preserve the wire-format snake_case where required by HTML or the API.
- Constants use camelCase unless they are fixed configuration values that benefit from uppercase naming.

**Types:**
- TypeScript inference is preferred for schemas and component state. Explicit object types are used at API boundaries.

## Code Style

**Formatting:**
- TypeScript uses semicolons, single quotes in most source files, trailing commas, and two-space indentation.
- JSX attributes and multiline object literals are expanded for readability.

**Linting:**
- ESLint 9 uses `eslint.config.mjs` with Next.js core-web-vitals, Next TypeScript, and Storybook recommended rules.
- Generated directories such as `.next`, `build`, and `out` are ignored by the flat config.

## Import Organization

**Order:**
1. Node built-ins and third-party packages.
2. Project imports using the `@/*` alias.
3. Relative imports for nearby tests or modules.

**Path Aliases:**
- `@/*` resolves to `src/*` through `tsconfig.json`.

## Error Handling

**Patterns:**
- API routes validate request payloads with Zod and return explicit status codes and Polish user-facing messages, as in `src/app/api/contact/route.ts`.
- Client components catch fetch and parsing failures and expose a safe message through an `aria-live` region, as in `src/components/contact-form.tsx`.
- Errors are logged through the structured logger in `src/lib/logger.ts`, without emitting raw credentials.

## Logging

**Framework:** `src/lib/logger.ts` provides a small JSON logger over `console`.

**Patterns:**
- Use `logger.error`, `logger.warn`, and `logger.info` with a message and optional structured context.
- Include timestamps and levels through the shared formatter instead of hand-built log strings.

## Comments

**When to Comment:**
- Comments explain security sentinels, browser/runtime constraints, or non-obvious test setup, for example the honeypot validation in `src/lib/contact.ts`.

**JSDoc/TSDoc:**
- JSDoc is uncommon. Prefer readable names and focused inline comments for exceptional behavior.

## Function Design

**Size:** Keep functions focused on one transformation or request step. Extract reusable formatting and validation into `src/lib/`.

**Parameters:** Prefer typed object parameters for multi-field domain data, as used by `buildContactEmail`.

**Return Values:** Return explicit objects for API/domain helpers and discriminated status values for UI state.

## Module Design

**Exports:** Use named exports for components and helpers. Keep route handlers exported with the Next.js method names such as `POST`.

**Barrel Files:** Shared UI primitives are consumed from workspace package exports such as `@hermes/ui`; avoid adding local barrels without a demonstrated need.

---

*Convention analysis: 2026-11-24*
