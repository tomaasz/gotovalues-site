---
name: vercel-deploy
description: Production release procedure, token management, and smoke verification on Vercel.
---

# Vercel Production Deployment for gotovalues-site

This skill documents the safe deployment process to Vercel for `gotovalues.com`.

## Deployment Boundary

- **Target:** Vercel production project `gotovalues`.
- **CI Role:** GitHub Actions validates code (`lint`, `test`, `build`), but **never publishes**.
- **Execution:** Releases are manual and performed only from a clean, fully merged `main` branch.

## Pre-flight Checklist

```bash
cd ~/projekty/gotovalues-site
git fetch origin main
git switch main
git pull --ff-only origin main
pnpm install --frozen-lockfile
npx tsx --test tests/*.test.ts tests/*.test.tsx
pnpm lint
pnpm build
```

## Production Deployment Execution

The Vercel token is stored in 1Password. Read it only for the duration of the command:

```bash
VERCEL_TOKEN="$(op read 'op://hosty-debianovh/vercel/token')" \
  npx --yes vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"
```

> [!CAUTION]
> Never print, log, or commit the `VERCEL_TOKEN`. Do not store it in `.env` files.

## Post-Deploy Smoke Verification

A simple HTTP 200 is not sufficient because client-side and lazy-loaded chunks may fail.

1. **Header Check:**
   ```bash
   curl -fsSI https://gotovalues.com/supportflow
   ```

2. **DOM Verification:**
   Verify that the lazy-loaded SupportFlow contact form renders correctly. Check for:
   - `#support-system-input`
   - `#weekly-ticket-volume-input`
   - `#pilot-interest-input`

## Rollback Procedure

If a regression occurs, promote the previous known-good deployment via the Vercel dashboard or CLI:
```bash
VERCEL_TOKEN="$(op read 'op://hosty-debianovh/vercel/token')" \
  npx --yes vercel@latest rollback <deployment-id-or-url> --token "$VERCEL_TOKEN"
```

