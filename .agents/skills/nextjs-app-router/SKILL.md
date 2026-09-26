---
name: nextjs-app-router
description: Patterns and best practices for Next.js 16 (App Router) and React 19 in gotovalues-site.
---

# Next.js 16 App Router & React 19 in gotovalues-site

This skill guides development in `gotovalues-site`, utilizing Next.js 16 with App Router, `typedRoutes: true`, and React 19.

## Key Architecture Principles

1. **Server Components by Default:**
   - All components in `src/app/` are React Server Components (RSC) unless explicitly marked with `'use client'`.
   - Data fetching and heavy markdown/content parsing must happen on the server.
   - Keep `'use client'` at the lowest possible leaf level (e.g., interactive buttons, forms, animations).

2. **Route Handlers (`src/app/api/`):**
   - Use Next.js `NextRequest` and `NextResponse`.
   - Always validate incoming payloads with Zod (`src/lib/`).
   - Catch parsing errors, return explicit HTTP status codes (`400` validation error, `429` rate limit, `503` missing server credentials, `500` external error).
   - Log structured errors via standard JSON logging without leaking sensitive environment keys.

3. **SEO & Metadata:**
   - Static and dynamic metadata should be configured via `metadata` exports in `page.tsx` or `layout.tsx`.
   - `robots.ts` and `sitemap.ts` live in `src/app/` and dynamically generate crawler configuration.
   - AI and LLM crawlers are supported via `ai.txt` and `llms.txt` in `src/app/`.

4. **Testing:**
   - Run unit and route tests with:
     ```bash
     npx tsx --test tests/*.test.ts tests/*.test.tsx
     ```

