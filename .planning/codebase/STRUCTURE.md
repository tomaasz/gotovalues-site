---
last_mapped_commit: d4a10f716533106319f4f68c685d17fd7f0ea026
last_mapped_at: 2026-11-24
---
# Codebase Structure

**Analysis Date:** 2026-11-24

## Directory Layout

```text
gotovalues-site/
├── src/app/              # App Router pages, route handlers and global styles
├── src/components/       # Shared and feature UI components
├── src/content/          # Typed site, FAQ and blog content
├── src/lib/              # Validation, integrations and utilities
├── packages/ui/          # Workspace UI primitives
├── packages/design-tokens/ # Workspace design tokens and CSS
├── tests/                # Unit and component tests
├── e2e/                  # Playwright browser tests
├── content/blog/         # MDX blog source
├── public/                # Static images, brand assets and metadata files
└── docs/                  # Deployment and design/implementation plans
```

## Directory Purposes

**`src/app/`:** Route segments such as `blog`, `kalkulator-roi`, `supportflow`, plus API and machine-readable endpoints.

**`src/components/`:** Site-wide components such as `SiteHeader`, `Footer`, forms and feature sections. `src/components/ui/` contains local primitives.

**`src/content/`:** Keep user-facing copy and structured content in typed modules. Blog rendering uses `src/content/blog.ts` and `content/blog/`.

**`src/lib/`:** Keep reusable non-visual logic here, including `src/lib/contact.ts`, `src/lib/logger.ts` and `src/lib/mcp/`.

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: root HTML shell, metadata, providers and footer.
- `src/app/page.tsx`: homepage composition.
- `src/app/api/contact/route.ts`: contact API.

**Configuration:**
- `package.json`: scripts and dependencies.
- `tsconfig.json`: strict TypeScript and `@/*` alias.
- `next.config.ts`: typed routes, rewrites and redirects.
- `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`: quality tooling.

**Core Logic:**
- `src/content/site.ts`: canonical brand and product data.
- `src/lib/contact.ts`: schema validation and email construction.
- `src/lib/mcp/`: catalog schema and tool implementation.

**Testing:**
- `tests/*.test.ts` and `tests/*.test.tsx`: unit and component tests.
- `e2e/*.spec.ts`: Playwright end-to-end flows.
- `src/stories/`: Storybook component stories.

## Naming Conventions

**Files:** Route files use Next.js names such as `page.tsx`, `layout.tsx`, and `route.ts`. Components use kebab-case filenames such as `contact-form.tsx`.

**Directories:** Route segments are lowercase URL names. Shared modules are grouped by purpose under `components`, `content`, and `lib`.

## Where to Add New Code

**New Feature:** Add a route under `src/app/<slug>/`, feature components under `src/components/`, and tests under `tests/` or `e2e/` according to scope.

**New Component/Module:** Put reusable visual components in `src/components/`, primitives in `src/components/ui/` or `packages/ui/src/` when shared across packages.

**Utilities:** Put non-visual shared helpers in `src/lib/` and typed copy/data in `src/content/`.

## Special Directories

**`.next/`:** Generated Next.js build and development output. Do not edit or commit.

**`public/`:** Committed static assets served at the site root.

**`packages/`:** pnpm workspace packages consumed through workspace dependencies.

---

*Structure analysis: 2026-11-24*
