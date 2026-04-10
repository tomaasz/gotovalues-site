'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { logger } from '@/lib/logger';

// ⚡ Bolt: Lazy load the heavy ContactForm client component because it's only visible below the fold.
// 🎯 Why: Reduces main thread blocking and JS bundle size for the initial page load by extracting react-dom/client and form state management into a separate chunk.
// 📊 Impact: Expected ~30-50kb reduction in initial JS payload.
// 🔬 Measurement: Verify reduction in "First Load JS" size for `/` and `/dla-produkcji` routes in `pnpm build` output.
const ContactFormChunk = dynamic(
  () =>
    import('./contact-form')
      .then((mod) => mod.ContactForm)
      .catch((error) => {
        logger.error('Failed to load ContactForm chunk', {
          error: error instanceof Error ? error.message : String(error),
        });
        const Fallback = () => (
          <div className="form-feedback form-feedback-error">
            Nie udało się załadować formularza. Odśwież stronę lub spróbuj ponownie później.
          </div>
        );
        Fallback.displayName = 'ContactFormFallback';
        return Fallback;
      }),
  {
    ssr: false, // Defer fetching/rendering this client-only interactive form to the client side.
  },
);

// ⚡ Bolt: Wrap with IntersectionObserver to only trigger chunk download on scroll
export function ContactFormLazy() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }, // Load slightly before it comes into view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '400px' }}>
      {shouldLoad ? <ContactFormChunk /> : null}
    </div>
  );
}
