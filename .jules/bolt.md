## 2026-03-27 - [Lazy load ContactForm chunk on scroll instead of load]
**Learning:** Next.js `dynamic()` with `ssr: false` still fetches the chunk on hydration. In order to save bandwidth and main thread blocking, using IntersectionObserver prevents fetching a chunk until it scrolls near the viewport.
**Action:** When lazy-loading heavy components that are below the fold with next/dynamic, use IntersectionObserver to truly delay chunk download.

## 2026-03-29 - [Bounded Memory for Rate Limiting Maps]
**Learning:** Using a simple JavaScript `Map` for rate limiting in memory-constrained environments like Cloudflare Workers/V8 isolates introduces a memory leak vulnerability. An attacker can easily spoof IPs or launch a distributed attack to fill the map and cause an Out-Of-Memory (OOM) crash.
**Action:** Always implement a size threshold (e.g., `map.size > X`) to sweep expired entries or clear the map entirely when implementing in-memory rate limiting.
- 2026-03-31: Use deterministic O(1) LRU eviction strategy for rate limiting map. In bounded environments, random O(N) sweeping inside high-frequency endpoints can lead to main thread blocking. A `Map` preserves insertion order, so by freshening entries (`map.delete(key); map.set(key, value)`) on every access, the oldest LRU entry is always `map.keys().next().value`. We can safely enforce map limits with an O(1) delete (`map.delete(map.keys().next().value)`).
- 2025-03-31: To optimize Next.js client component bundle sizes, prefer inlining simple SVGs over importing from icon libraries like `lucide-react` when only a single or very few icons are used.

## 2026-04-02 - [Next.js Image Optimization]
**Learning:** Removing the `unoptimized` prop from `<Image />` in Next.js enables automatic WebP/AVIF generation and resizing by the default Image Optimization API. This should be removed from images that don't specifically need to skip optimization to directly improve load performance.
