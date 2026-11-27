'use client';

type EventProps = Record<string, string | number | boolean | undefined>;

type PostHogClient = {
  capture: (event: string, properties?: EventProps) => void;
};

declare global {
  interface Window {
    __gvPosthog?: PostHogClient;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Lightweight, privacy-safe conversion tracking helper.
 * Emits non-PII events only when the visitor has granted analytics consent
 * and the underlying analytics provider is initialized.
 */
export function trackEvent(eventName: string, properties: EventProps = {}) {
  if (typeof window === 'undefined') return;

  const route = window.location?.pathname ?? '/';
  const payload: EventProps = { route, ...properties };

  try {
    window.__gvPosthog?.capture(eventName, payload);
  } catch {
    // Non-blocking telemetry
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
  } catch {
    // Non-blocking telemetry
  }
}
