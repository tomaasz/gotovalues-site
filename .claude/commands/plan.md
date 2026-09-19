Create or update a plan for: $ARGUMENTS

Follow this process:

1. Inspect relevant project files, `process/context.md`, and `process/decisions.md`.
2. Ask clarifying questions only if an unverified assumption would materially change the architecture.
3. Write a concise plan to `process/plans/` containing:
   - Goal
   - Current state
   - Proposed changes (components, pages, styles)
   - Files likely affected
   - Verification & test strategy (`npx tsx --test`, `pnpm lint`, `pnpm build`)
   - Risks and rollback considerations
4. Do not start implementation until the plan is reviewed or accepted, unless the change is trivial.
