"use client";

import { useEffect } from "react";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Microsoft Clarity (heatmaps + session recordings).
 *
 * Loads the Clarity tag only when NEXT_PUBLIC_CLARITY_ID is configured.
 * Mirrors the lean, unconditional load of PostHogProvider — if the site adds
 * a cookie-consent gate later, gate both providers together.
 */
export function ClarityProvider() {
  useEffect(() => {
    if (!CLARITY_ID) return;
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
  }, []);

  return null;
}
