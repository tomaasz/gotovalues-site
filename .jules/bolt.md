## 2026-03-27 - [Lazy load ContactForm chunk on scroll instead of load]
**Learning:** Next.js `dynamic()` with `ssr: false` still fetches the chunk on hydration. In order to save bandwidth and main thread blocking, using IntersectionObserver prevents fetching a chunk until it scrolls near the viewport.
**Action:** When lazy-loading heavy components that are below the fold with next/dynamic, use IntersectionObserver to truly delay chunk download.

## 2026-03-29 - [Bounded Memory for Rate Limiting Maps]
**Learning:** Using a simple JavaScript `Map` for rate limiting in memory-constrained environments like Cloudflare Workers/V8 isolates introduces a memory leak vulnerability. An attacker can easily spoof IPs or launch a distributed attack to fill the map and cause an Out-Of-Memory (OOM) crash.
**Action:** Always implement a size threshold (e.g., `map.size > X`) to sweep expired entries or clear the map entirely when implementing in-memory rate limiting.
- 2025-03-31: To optimize Next.js client component bundle sizes, prefer inlining simple SVGs over importing from icon libraries like `lucide-react` when only a single or very few icons are used.
