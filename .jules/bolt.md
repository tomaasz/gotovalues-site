# ⚡ Bolt Learnings

- When Next.js `<Image />` component is used, ensuring it isn't explicitly skipped from optimizations via `unoptimized` prop will allow Next.js Optimization API to correctly resize and serve the image in modern WebP/AVIF formats directly improving LCP and page speed.