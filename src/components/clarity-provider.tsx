"use client";

import { useEffect } from "react";

import { subscribeAnalyticsConsent } from "@/lib/cookie-consent";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Microsoft Clarity (heatmaps + session recordings).
 *
 * Loads the Clarity tag only when NEXT_PUBLIC_CLARITY_ID is configured AND the
 * visitor has granted analytics consent (now or later, via the cookie banner).
 */
export function ClarityProvider() {
  useEffect(() => {
    if (!CLARITY_ID) return;

    return subscribeAnalyticsConsent(() => {
      if (document.getElementById("ms-clarity")) return;

      const script = document.createElement("script");
      script.id = "ms-clarity";
      script.type = "text/javascript";
      script.innerHTML =
        `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};` +
        `t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;` +
        `y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})` +
        `(window,document,"clarity","script","${CLARITY_ID}");`;
      document.head.appendChild(script);
    });
  }, []);

  return null;
}
