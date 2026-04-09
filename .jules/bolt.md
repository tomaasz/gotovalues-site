## 2026-04-07

When using `next/font/google` for variable fonts (like `Fraunces` or `Manrope`), explicitly configure `display: 'swap'`, `preload: true`, and strictly define used `axes` (e.g., `['SOFT', 'WONK']`) or `weight` arrays. Without these explicit restrictions, Next.js may download the entire unoptimized variable font bundle, containing unused font axes and subsets, bloating the FCP and page load times.

## 2026-04-08

For high-performance string sanitization (e.g., HTML escaping) in environments like `layout.tsx` (e.g., JSON-LD injection), prefer a single `.replace()` with a global regular expression over chaining multiple `.replace()` calls. This prevents the browser from making multiple passes and reallocating intermediate strings, improving performance by up to 30-60%.
When acting as the 'Bolt' performance agent, focus on finding ONE specific performance issue (e.g., unnecessary re-renders, large bundle imports). Keep optimizations under 50 lines, title the commit/PR '⚡ Bolt: [fix]', and submit no PR if nothing is found. Avoid modifying package.json/tsconfig.json unless instructed, and log codebase-specific learnings in `.jules/bolt.md`.
When using `next/font/google` for variable fonts, explicitly configure `display: 'swap'` and `preload: true`. Define used `axes` (e.g., `['SOFT', 'WONK']`) if applicable, but NEVER specify discrete `weight` arrays for variable fonts, as Next.js automatically optimizes them into a single compressed file. Specifying weights causes a de-optimization by falling back to multiple static files.
