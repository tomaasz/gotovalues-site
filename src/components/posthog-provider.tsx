"use client";

import { useEffect } from "react";

import { logger } from "@/lib/logger";
import { subscribeAnalyticsConsent } from "@/lib/cookie-consent";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let initialized = false;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;

    // Load PostHog only after the visitor grants analytics consent (now or later).
    return subscribeAnalyticsConsent(() => {
      if (initialized) return;
      initialized = true;
      import("posthog-js").then((mod) => {
        mod.default.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          // ui_host lets PostHog links/toolbar resolve when api_host is a
          // first-party reverse proxy path (see next.config rewrites).
          ui_host: "https://eu.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
        });
      }).catch((error) => {
        initialized = false;
        logger.warn("Failed to load posthog-js", {
          error: error instanceof Error ? error.message : String(error),
        });
      });
    });
  }, []);

  return <>{children}</>;
}
