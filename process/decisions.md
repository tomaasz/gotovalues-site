# process/decisions.md — Architecture Decision Records (ADRs)

This file tracks durable architectural, technology, and organizational decisions for `gotovalues-site`.

---

## 2026-10-04: Brand Logotype & Design-Skill Stack

- **Context:** The site used a stock Fraunces "g" as its mark and had no single visual-language source; the dark "vibe coding" hero drifts from the paper/ink/sage brand palette.
- **Decision:**
  1. Logo direction A "Trasa do wartości" (route g ending in a sage station dot), built with `kaankiziltug/logo-design-skill`; masters, guide and generator live in `brand/logo/`.
  2. Install project-local design skills: **Impeccable** (`pbakaus/impeccable`, engine v0.1.11, installed with `--no-hooks`) as the primary design workflow, and **UI UX Pro Max** (`ui-ux-pro-max-cli`: `ui-ux-pro-max`, `design-system`, `brand`, `design`, `ui-styling`) as the design-system generator/reference. `slides` and `banner-design` were removed as out of scope.
  3. Single source of truth for the visual system: Impeccable `PRODUCT.md` + `DESIGN.md` → `packages/design-tokens`. Other skills (Anthropic `frontend-design`, Vercel `web-design-guidelines`, `jakubkrehel/skills`) act as auditors only.
  4. Canonical copies in `.agents/skills/`; `.claude/skills` / `.gemini/skills` symlink identical skills (Impeccable keeps per-provider builds). Impeccable engine binaries are git-ignored (the launcher downloads them on first run).
  5. The `design` skill's Gemini image-generation scripts (paid API key) are not used.
- **Research:** `process/research/2026-10-04-design-system-skills.md`.
- **Status:** Accepted.

---

## 2026-09-27: Standing Approval to Ship to Main & Production

- **Context:** Agents stopped at every merge/deploy because the contract forbade auto-merge, leaving finished work and bot PRs waiting on the owner.
- **Decision:** Agents may merge green PRs, push verified work to `main`, release to production (Vercel Git integration; manual CLI as fallback) and keep the repo tidy (delete merged worktrees/branches, local and remote). Guardrails: no force-push or history rewrite on `main`, no merging red CI, no secrets, post-deploy smoke check.
- **Supersedes:** the "manual deploy only" part of 2026-05-12 "Vercel-First Deployment Boundary".
- **Status:** Accepted.

---

## 2026-09-20: Multi-Agent Harness & Process State Setup

- **Context:** The repository is developed using multiple AI coding agents (Claude Code, Codex CLI account pool, Antigravity CLI/IDE, Hermes Agent) across several hosts. Without a unified contract and durable state, agents duplicate context exploration and risk violating deployment or brand rules.
- **Decision:**
  1. Create `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` as unified root guidelines.
  2. Implement the `process/` directory structure (`context.md`, `decisions.md`, `routing.md`, `plans/`, `research/`, `reviews/`).
  3. Deploy focused agent roles in `.claude/agents/` and `.codex/agents/`, alongside domain skills in `.agents/skills/`.
  4. Link the repository to the central `~/obsidian-vault/agents/GLOBAL.md` and establish `~/obsidian-vault/projects/gotovalues.md` with an active Handoff block.
- **Status:** Accepted.

---

## 2026-08-19: SupportFlow Pilot Qualification in Contact Funnel

- **Context:** Inbound interest needed qualification for ticket volume and current support tooling without adding multiple separate forms.
- **Decision:** Integrated three qualification fields (`supportSystem`, `weeklyTicketVolume`, `pilotInterest`) directly into `/api/contact` and `ContactForm`, tested via DOM presence assertion in post-deployment verification.
- **Status:** Accepted.

---

## 2026-05-12: Vercel-First Deployment Boundary

- **Context:** Production is hosted on Vercel (`gotovalues` project). GitHub Actions CI was evaluating build artifacts.
- **Decision:** CI is designated strictly as a validation gate (`lint`, `test`, `build`). It must never automatically deploy to production. Production deployments are triggered manually from clean `main` using credentials retrieved on-demand from 1Password (`op://hosty-debianovh/vercel/token`).
- **Status:** Accepted.

---

## 2026-03-17: Next.js 16 + React 19 Migration

- **Context:** Legacy static site was migrated to Next.js App Router to enable modular components, dynamic contact forms, and typed routes.
- **Decision:** Monorepo structure using pnpm workspaces with shared `@hermes/ui` and `@hermes/design-tokens`.
- **Status:** Accepted.
