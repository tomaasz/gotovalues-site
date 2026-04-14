"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState, useRef } from "react";
import type { PostHog } from "posthog-js";

import { logger } from "@/lib/logger";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_wvuRonMauXNxWV5LMURRVUEmmpMxUSy6pEUZVo9eL5Z3";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://t.gotovalues.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const queue = useRef<[string, unknown[]][]>([]);

  const [client, setClient] = useState<PostHog>(() =>
    new Proxy({} as PostHog, {
      get: (_, prop) => {
        if (prop === "then") return undefined;
        if (typeof prop === "string") {
          return (...args: unknown[]) => {
            queue.current.push([prop, args]);
            return undefined;
          };
        }
        return undefined;
      }
    })
  );

  useEffect(() => {
    if (!POSTHOG_KEY) return;
    import("posthog-js").then((mod) => {
      const ph = mod.default;
      ph.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      });
      queue.current.forEach(([p, a]) => {
        const targetMethod = (ph as unknown as Record<string, unknown>)[p];
        if (typeof targetMethod === "function") {
          targetMethod.apply(ph, a);
        }
      });
      queue.current = [];
      setClient(ph);
    }).catch((error) => {
      logger.warn("Failed to load posthog-js", {
        error: error instanceof Error ? error.message : String(error),
      });
    });
  }, []);

  return <PHProvider client={client}>{children}</PHProvider>;
}
