"use client";

import { useEffect } from "react";

import { subscribeAnalyticsConsent } from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  var dataLayer: unknown[];
}

let initialized = false;

// gtag pushes an Arguments-like array to dataLayer (not a plain object).
function gtag(...args: unknown[]) {
  globalThis.dataLayer = globalThis.dataLayer || [];
  globalThis.dataLayer.push(args);
}

/**
 * Google Analytics 4 (gtag.js) with Consent Mode v2.
 *
 * Loads only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set AND the visitor has
 * granted analytics consent (now or later, via the cookie banner). Because the
 * gate only fires on consent, analytics_storage is granted on load; ad storage
 * stays denied — this site runs no ad tags.
 */
export function GaProvider() {
  useEffect(() => {
    if (!GA_ID) return;

    return subscribeAnalyticsConsent(() => {
      if (initialized) return;
      initialized = true;

      globalThis.dataLayer = globalThis.dataLayer || [];
      gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      gtag("js", new Date());
      gtag("config", GA_ID);

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
    });
  }, []);

  return null;
}
