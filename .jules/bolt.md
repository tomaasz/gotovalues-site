## 2026-04-07

When using `next/font/google` for variable fonts (like `Fraunces` or `Manrope`), explicitly configure `display: 'swap'`, `preload: true`, and strictly define used `axes` (e.g., `['SOFT', 'WONK']`) or `weight` arrays. Without these explicit restrictions, Next.js may download the entire unoptimized variable font bundle, containing unused font axes and subsets, bloating the FCP and page load times.
