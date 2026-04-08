## 2026-04-07

When using `next/font/google` for variable fonts (like `Fraunces` or `Manrope`), explicitly configure `display: 'swap'`, `preload: true`, and strictly define used `axes` (e.g., `['SOFT', 'WONK']`) or `weight` arrays. Without these explicit restrictions, Next.js may download the entire unoptimized variable font bundle, containing unused font axes and subsets, bloating the FCP and page load times.

## 2026-04-08

For high-performance string sanitization (e.g., HTML escaping) in environments like `layout.tsx` (e.g., JSON-LD injection), prefer a single `.replace()` with a global regular expression over chaining multiple `.replace()` calls. This prevents the browser from making multiple passes and reallocating intermediate strings, improving performance by up to 30-60%.
