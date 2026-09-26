# CLAUDE.md — AI Agent Instructions for gotovalues-site

## Loop Engineering / Hermes Contract

Before any non-trivial work in this repository, Claude Code / other agents must read and follow the repo-local loop contract:

1. Read `AGENTS.md` if present (tool-neutral source of truth; keep aligned).
2. Read `~/obsidian-vault/agents/GLOBAL.md` for cross-agent conventions, zero-secrets rules, and the Iceberg reading technique.
3. Read `process/context.md`, `process/decisions.md`, and `process/routing.md`.
4. Read the relevant plan in `process/plans/` or create one before making substantial changes.
5. Preserve unrelated dirty files (e.g. untracked or in-progress components) and runtime artifacts.
6. After verified successful work, commit and push to `origin/main` by default unless push is blocked.
7. Never commit secrets, `.env*`, tokens, credentials, or runtime state.
8. Never force-push, auto-merge, or bypass human gates.
9. After work, update `~/obsidian-vault/projects/gotovalues.md` (the Handoff block) to hand off state to other agents.

---

## Project Overview

`gotovalues.com` is the official company website and product showcase for **gotovalues**, built with:

- **Framework:** Next.js 16 (App Router, `typedRoutes: true`)
- **UI & Runtime:** React 19, TypeScript (strict mode)
- **Monorepo / Workspaces:** pnpm workspace (`packages/design-tokens`, `packages/ui`)
- **Styling:** Tailwind CSS v4, PostCSS, clsx, Lucide React
- **Email & API:** Resend (`/api/contact`) with Zod validation and rate limiting
- **Observability & Analytics:** Sentry (`@sentry/nextjs`), PostHog (`posthog-js`), Microsoft Clarity
- **Testing:** Node test runner (`tsx --test`), Vitest, Storybook 10, Playwright
- **Hosting:** Vercel (Production project `gotovalues`)

---

## Key Conventions & Business Rules

### 1. Language & Content

- **User-Facing Content:** Polish (PL) throughout marketing copy, blog, landing pages, and metadata.
- **Code & Technical Identifiers:** English (US) for functions, variables, file names, commits, and technical comments.
- **Brand Casing:** Always lowercase `gotovalues` in body copy and headings (enforced by unit tests).

### 2. Products & Positioning

- **Public Products:** Exactly two public products with external links:
  - `Cavi` (AI resume builder / career platform)
  - `Akta` (Genealogical archive portal & OCR search engine)
- **Private Implementations:** Must remain unlinked and without external preview URLs.
- **Tone:** Technical, consultative, evidence-based, focused on concrete automation and software development outcomes (never hype-driven).

### 3. Contact & SupportFlow Qualification

- Contact form route: `/api/contact` (POST).
- Includes SupportFlow pilot qualification fields:
  - `supportSystem`
  - `weeklyTicketVolume`
  - `pilotInterest`
- Always validate submissions through Zod schemas in `src/lib/`.
- Handle rate limits (429) and missing server credentials (503) gracefully.

---

## Verification & Commands

Run all checks from the repository root:

```bash
# Unit & integration tests (fast, reliable)
npx tsx --test tests/*.test.ts tests/*.test.tsx

# Linting & code standards
pnpm lint

# Production build check
pnpm build

# Component workshop / Storybook
pnpm storybook
```

> [!NOTE]
> If `pnpm test` triggers an interactive prompt regarding workspace node_modules, use `npx tsx --test tests/*.test.ts tests/*.test.tsx` directly for test execution.

---

## Vercel Production Deployment Boundary

`gotovalues.com` is strictly deployed to **Vercel** (`gotovalues` project).

- GitHub Actions only runs CI validation (lint/build/test); **CI does not deploy to production**.
- Deployment is manual and performed only from a clean, merged `main` checkout.
- Detailed runbook: [`docs/deployment.md`](docs/deployment.md).
- Vercel API token is stored securely in 1Password: `op://hosty-debianovh/vercel/token`. Never place the token in `.env` or repository files.

### Deploy Command

```bash
VERCEL_TOKEN="$(op read 'op://hosty-debianovh/vercel/token')" \
  npx --yes vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"
```

### Post-Deploy Verification (Smoke Check)

A simple HTTP 200 is not sufficient. You must verify both headers and lazy-loaded components:

1. `curl -fsSI https://gotovalues.com/supportflow`
2. Browser check on `/supportflow#kontakt`: confirm that lazy-loaded inputs are rendered:
   - `support-system-input`
   - `weekly-ticket-volume-input`
   - `pilot-interest-input`

---

## Lean AI Coding Harness Routing

This repository utilizes the multi-agent harness for Claude Code, Codex CLI pool, Antigravity CLI (`agy`), and Hermes coordination:

- **Subscription-backed CLIs:** Prefer these for routine tasks (Claude Code, Codex CLI pool, Antigravity CLI).
  - _Temporary override note:_ If Claude weekly limit is exhausted, prefer Codex CLI pool (`~/.local/bin/codex-pool`) for implementation/reviews, and `agy` for research.
- **Per-Token API Spend:** Use LiteLLM routes (`deepseek-v4-pro`, `deepseek-v4-flash`, `baishan-gpt`) deliberately and only when justified.
- **Antigravity Research Lane:** Use `agy` for deep external research and architecture reviews:
  ```bash
  agy -p "Deep research task: <topic>. Return: 1) executive summary, 2) key findings, 3) tradeoffs, 4) risks/unknowns, 5) sources/links, 6) recommendation, 7) follow-up actions."
  ```

### Harness Roles & Files

- `.claude/agents/`:
  - `architect.md` — system architecture & refactoring plans
  - `code-reviewer.md` — code quality, performance, and accessibility reviews
  - `debugger.md` — issue diagnosis and regression tracing
  - `security-reviewer.md` — secrets detection, input sanitization, and API security
  - `test-writer.md` — unit/integration test coverage
- `.claude/commands/`:
  - `plan.md` — `/plan <arguments>` creates/updates plans in `process/plans/`
  - `review.md` — `/review` performs structured multi-file code review
- `.codex/agents/`:
  - `reviewer.md`, `fixer.md`
- `process/`:
  - `context.md` — durable project context
  - `decisions.md` — architecture decision records
  - `routing.md` — cost and model selection policy
  - `plans/`, `research/`, `reviews/`
