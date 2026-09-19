# process/decisions.md — Architecture Decision Records (ADRs)

This file tracks durable architectural, technology, and organizational decisions for `gotovalues-site`.

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
