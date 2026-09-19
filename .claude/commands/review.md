Perform a comprehensive code review of current changes: $ARGUMENTS

Review steps:

1. Run `git status` and `git diff` to inspect modified and untracked files.
2. Check compliance with project rules:
   - TypeScript strict typing (no loose types, proper props interfaces)
   - React 19 / Next.js 16 Server vs Client component boundaries
   - Brand casing: `gotovalues` in lowercase
   - Zero hardcoded secrets or environment variables
   - Accessibility & semantic HTML
3. Run verification:
   - `npx tsx --test tests/*.test.ts tests/*.test.tsx`
   - `pnpm lint`
4. Summarize findings in `process/reviews/` or output a concise review verdict.
