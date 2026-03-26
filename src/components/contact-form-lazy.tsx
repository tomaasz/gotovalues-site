'use client';

import dynamic from "next/dynamic";

// ⚡ Bolt: Lazy load the heavy ContactForm client component because it's only visible below the fold.
// 🎯 Why: Reduces main thread blocking and JS bundle size for the initial page load by extracting react-dom/client and form state management into a separate chunk.
// 📊 Impact: Expected ~30-50kb reduction in initial JS payload.
// 🔬 Measurement: Verify reduction in "First Load JS" size for `/` and `/dla-produkcji` routes in `pnpm build` output.
export const ContactFormLazy = dynamic(() => import("./contact-form").then((mod) => mod.ContactForm), {
  ssr: false, // Defer fetching/rendering this client-only interactive form to the client side.
});
