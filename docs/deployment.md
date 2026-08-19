# Production deployment — Vercel

## Current source of truth

`gotovalues.com` is currently served by **Vercel**, project `gotovalues`. DNS or other edge infrastructure does not change the deployment target.

GitHub Actions validates the code but does **not** publish production. A production release requires an explicit Vercel deployment from a clean, merged `main` checkout.

## Before deployment

```bash
cd ~/projekty/gotovalues-site
git fetch origin main
git switch main
git pull --ff-only origin main
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm build
```

The Vercel API token is held in 1Password, not in repository files. The Hermes Service Account reads it from:

```text
op://hosty-debianovh/vercel/token
```

The repository link lives in `.vercel/project.json`; it is ignored by git. If the link is missing or invalid, retrieve the canonical project owner/project IDs from the authorized Vercel API before attempting a deploy. Do not guess team IDs.

## Deploy

In a local, authorized shell, inject the token only for the command invocation and deploy the already-verified `main`:

```bash
VERCEL_TOKEN="$(op read 'op://hosty-debianovh/vercel/token')" \
  npx --yes vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"
```

Do not print, commit, or place the token in `.env` files. The CLI output must say that `https://gotovalues.com` was aliased to the ready production deployment.

## Verify production

A `200` response alone is not sufficient for client-side or lazy-loaded UI. Verify both:

```bash
curl -fsSI https://gotovalues.com/supportflow
```

For a lazy-loaded form, use a browser-capable check: open `/supportflow`, scroll to `#kontakt`, wait for the form chunk, and assert the relevant DOM ids. For the SupportFlow qualification release, the required ids are:

```text
support-system-input
weekly-ticket-volume-input
pilot-interest-input
```

## Rollback

Use the Vercel dashboard or Vercel CLI to promote a known-good earlier production deployment. Then repeat the live browser verification above. Do not attempt a Cloudflare/Wrangler rollback for this site unless the hosting architecture is intentionally changed and documented first.

## Evidence from the 2026-08-19 release

- merged source: PR #294, commit `4fb042a`;
- production deployment: `dpl_2zHqkVRGLYQf8eyrzjppFp8dBPo4`;
- all three SupportFlow qualification controls were present after the lazy form loaded.
