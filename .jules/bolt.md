## 2026-03-27 - [Lazy load ContactForm chunk on scroll instead of load]
**Learning:** Next.js `dynamic()` with `ssr: false` still fetches the chunk on hydration. In order to save bandwidth and main thread blocking, using IntersectionObserver prevents fetching a chunk until it scrolls near the viewport.
**Action:** When lazy-loading heavy components that are below the fold with next/dynamic, use IntersectionObserver to truly delay chunk download.
