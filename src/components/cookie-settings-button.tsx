"use client";

import { reopenCookieBanner } from "@/lib/cookie-consent";

/**
 * Re-opens the cookie consent banner so visitors can change or withdraw
 * consent at any time. Rendered as a plain link-styled button so it blends
 * into footer / legal navigation.
 */
export function CookieSettingsButton({
  className,
  children = "Ustawienia cookies",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={() => reopenCookieBanner()} className={className}>
      {children}
    </button>
  );
}
