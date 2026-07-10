/**
 * Cookie consent for gotovalues.com.
 *
 * Two categories only: `necessary` (always on) and `analytics` (PostHog +
 * Microsoft Clarity). There are no marketing/ad tags on this site, so we don't
 * offer a marketing category that would do nothing.
 *
 * Consent is stored in localStorage and broadcast via a window CustomEvent so
 * the analytics providers can load the moment a visitor opts in — no reload.
 */

export const CONSENT_KEY = "gotovalues-cookie-consent";
export const CONSENT_CHANGED_EVENT = "cookie-consent-changed";
export const CONSENT_REOPEN_EVENT = "cookie-consent-reopen";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
};

export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
};

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    return { necessary: true, analytics: Boolean(parsed.analytics) };
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent<CookieConsent>(CONSENT_CHANGED_EVENT, { detail: consent }),
  );
}

/** Re-open the consent banner so a visitor can change or withdraw consent. */
export function reopenCookieBanner(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT));
}

/**
 * Run `onGranted` as soon as analytics consent exists — either right now (if
 * already granted) or later when the visitor opts in. Returns an unsubscribe
 * function. `onGranted` may fire more than once; callers must guard against
 * double initialisation.
 */
export function subscribeAnalyticsConsent(onGranted: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (getCookieConsent()?.analytics) onGranted();

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<CookieConsent>).detail;
    if (detail?.analytics) onGranted();
  };

  window.addEventListener(CONSENT_CHANGED_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, handler);
}
