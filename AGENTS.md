# AGENTS.md – AI Agents Architecture & Harness Rules

This document defines the agent harness rules and contracts for **gotovalues-site** (`gotovalues.com`) across all AI tools (OpenAI Codex CLI, Claude Code, Antigravity CLI/IDE, Hermes Agent).

---

## Superpowers System

<EXTREMELY_IMPORTANT>
You have superpowers. Superpowers teach you new skills and capabilities.

Use native skill discovery (symlink-based setup), not the deprecated bootstrap command.

1. Verify skills are discoverable: `ls -la ~/.agents/skills/superpowers` (or project `.agents/skills/`)
2. If missing, follow: `~/.codex/superpowers/.codex/INSTALL.md`
3. Restart Codex after installation changes.
   </EXTREMELY_IMPORTANT>

## Skill Preflight (Mandatory)

Run this before any non-trivial response (including clarifying questions about implementation work):

1. Verify skill discovery path exists: `ls -la ~/.agents/skills/superpowers` or project `.agents/skills`
2. Identify explicitly named skills from the user prompt.
3. Identify implied skills based on task intent (e.g. Next.js App Router, Tailwind/Hermes UI, Vercel Deploy).
4. Select the minimal skill set that covers the task.
5. Open the selected `SKILL.md` files before implementation.
6. In the first working update, state: `Skills planned: <skill-1>, <skill-2>, ...`.

## Skill Usage Reporting (Mandatory)

For all non-trivial tasks, include a line in the final response:
`Skills used: <skill-1>, <skill-2>, ...`

If no skill is used, include:
`Skills used: none (reason: <why no listed skill applied>)`

## Quality Gate

A non-trivial task is incomplete if the response does not include a valid `Skills used:` line.
If missing, the agent must self-correct and provide the missing skill report before considering the task done.

---

## Core Agent Rules & Constraints

### 1. Global Contract & Knowledge Vault

- Root knowledge base: `~/obsidian-vault`.
- Always read `~/obsidian-vault/agents/GLOBAL.md` for shared rules.
- Maintain the project handoff in `~/obsidian-vault/projects/gotovalues.md` (section `<!-- HANDOFF:BEGIN -->`).
- **Iceberg Technique:** Avoid loading unnecessary files. Prefer focused reading with line ranges or grep over entire file dumps.
- **Zero Secrets Rule:** Never output, save, or commit credentials, API keys, tokens, or `.env*` contents to the repository or Obsidian vault.

### 2. Blast Radius & Change Verification

- Before modifying shared components (`src/components/ui/`, `packages/ui`, `packages/design-tokens`), check all consumers.
- Preserve untracked and unrelated work-in-progress files in the working tree.
- After code modifications, run verification:
  ```bash
  npx tsx --test tests/*.test.ts tests/*.test.tsx
  pnpm lint
  ```

### 3. Tech Stack & Invariants

- **Next.js 16 (App Router):** Keep route handlers in `src/app/api/`, use React Server Components by default, and isolate Client Components (`'use client'`) to interactive leaves.
- **Brand & Content:** Use `gotovalues` in lowercase for Polish marketing copy. Exactly two public linked products (`Cavi` and `Akta`).
- **Deployment:** Vercel production release requires manual deploy via 1Password token `op://hosty-debianovh/vercel/token`. See `docs/deployment.md`.

---

## Lean AI Coding Harness Routing

- **Subscription lanes:** Prefer subscription-backed tools:
  - Codex CLI account pool (`/home/tomaasz/.local/bin/codex-pool`)
  - Claude Code (`claude`)
  - Antigravity CLI (`agy`)
- **Research lane:** Use Antigravity CLI (`agy -p "..."`) for external technology research, competitor analysis, and architectural review briefs. Save outputs to `process/research/YYYY-MM-DD-<topic>.md`.
- **Durable Process Tracking:**
  - `process/context.md`: Technical and architectural snapshot.
  - `process/decisions.md`: Architecture decision records.
  - `process/routing.md`: Cost policy and model route selection.
  - `process/plans/`: Written task plans before non-trivial edits.
