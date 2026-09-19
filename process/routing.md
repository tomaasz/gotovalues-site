# Agent Routing Policy — gotovalues-site

This document defines the lightweight agent routing policy for AI development in `gotovalues-site`.

---

## Cost Classes

- **`subscription`**: Already covered under the owner's plan subscriptions. **Prefer these lanes** when appropriate:
  - **Codex CLI Account Pool (`codex-pool`)**: Three separate ChatGPT/Codex OAuth accounts (`account-1`, `account-2`, `account-3`). Binary at `/home/tomaasz/.local/bin/codex-pool`.
  - **Claude Code CLI (`claude`)**: Anthropic subscription.
  - **Antigravity CLI (`agy`)**: Google Gemini 2.5 / 3.x Flash/Pro subscription lane.
- **`per-token-cheap`**: Billed per token; general worker/backbone capacity:
  - DeepSeek via LiteLLM (`deepseek-v4-pro`, `deepseek-v4-flash`).
- **`per-token-premium`**: Billed per token at higher tiers; use deliberately:
  - BaishanAI GPT via LiteLLM.

---

## Temporary Availability Override

The owner's Claude weekly limit is currently exhausted until the next Wednesday at 17:00.
Until the owner indicates the limit has reset:

- Treat `claude` as unavailable.
- Route coding implementation and reviews to `codex-cli-pool`.
- Route deep research and second opinions to `agy-cli`.
- Fall back to DeepSeek or BaishanAI only when CLI lanes are unavailable or a specialized per-token model is justified.

---

## Default Route Table

| Task Type             | Preferred Route                                          | Fallback                                       | Notes                                                                       |
| --------------------- | -------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| `code_implementation` | `codex-cli-pool` (normally `claude` or `codex-cli-pool`) | `deepseek-v4-pro`, then `baishan-gpt`          | Use the 3-account Codex pool for multi-file component edits.                |
| `code_review`         | `codex-cli-pool`                                         | `claude` (after reset), then `deepseek-v4-pro` | Keep review independent from implementer.                                   |
| `debugging`           | `codex-cli-pool`                                         | `deepseek-v4-pro`                              | Isolate root cause before applying fix.                                     |
| `repo_research`       | `hermes-local`                                           | `claude` or `codex-cli`                        | Read local files via Iceberg technique.                                     |
| `external_research`   | `agy-cli`                                                | `deepseek-v4-flash`                            | Use `agy` for technology benchmarks, Next.js releases, competitor analysis. |
| `docs_planning`       | `hermes-local` or `claude`                               | `deepseek-v4-pro`                              | Save plans under `process/plans/`.                                          |

---

## Antigravity Research Command

When conducting external research or evaluating new libraries/patterns:

```bash
agy -p "Deep research task: <topic>. Return: 1) executive summary, 2) key findings, 3) tradeoffs, 4) risks/unknowns, 5) sources/links, 6) recommendation, 7) follow-up actions."
```

Save distilled conclusions under `process/research/YYYY-MM-DD-<topic>.md`. Do not submit proprietary or credentialed data to external research prompts.

---

## Guardrails

- Never pass secrets, `.env` contents, API keys, or credentials to any agent CLI.
- Adhere strictly to project invariants in `CLAUDE.md`, `AGENTS.md`, and `process/context.md`.
- Verify every change with automated tests (`npx tsx --test tests/*.test.ts tests/*.test.tsx`).
- Keep edits minimal, focused, and reviewable.
