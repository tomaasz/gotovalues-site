"use client";

import { useEffect } from "react";

import { logger } from "@/lib/logger";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    import("posthog-js").then((mod) => {
      mod.default.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      });
    }).catch((error) => {
      logger.warn("Failed to load posthog-js", {
        error: error instanceof Error ? error.message : String(error),
      });
    });
  }, []);

  return <>{children}</>;
}
