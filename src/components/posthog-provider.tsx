"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState, useRef } from "react";
import type { PostHog } from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_wvuRonMauXNxWV5LMURRVUEmmpMxUSy6pEUZVo9eL5Z3";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://t.gotovalues.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queue = useRef<[string, any[]][]>([]);

  const [client, setClient] = useState<PostHog>(() =>
    new Proxy({} as PostHog, {
      get: (_, prop) => {
        if (typeof prop === "string") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (...args: any[]) => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const targetMethod = (ph as any)[p];
        if (typeof targetMethod === "function") {
          targetMethod.apply(ph, a);
        }
      });
      queue.current = [];
      setClient(ph);
    });
  }, []);

  return <PHProvider client={client}>{children}</PHProvider>;
}
