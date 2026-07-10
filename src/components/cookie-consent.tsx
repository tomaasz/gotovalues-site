"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  CONSENT_CHANGED_EVENT,
  DEFAULT_CONSENT,
  getCookieConsent,
  saveCookieConsent,
} from "@/lib/cookie-consent";

// The banner's visibility is derived from an external store (localStorage +
// the consent-changed event) rather than effect-driven state — so it hides
// automatically once the visitor responds, with no hydration mismatch.
function subscribe(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
}

// true → no decision stored yet → show the banner.
const getSnapshot = () => getCookieConsent() === null;
const getServerSnapshot = () => false;

export function CookieConsent() {
  const needsConsent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [expanded, setExpanded] = useState(false);

  const respond = useCallback((analytics: boolean) => {
    saveCookieConsent(
      analytics ? { necessary: true, analytics: true } : DEFAULT_CONSENT,
    );
  }, []);

  if (!needsConsent) return null;

  return (
    <section
      aria-label="Zgoda na pliki cookie"
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-lg md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold">Pliki cookie</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Używamy niezbędnych plików cookie, aby strona działała. Za Twoją zgodą
          korzystamy też z analityki, by rozumieć, jak używasz strony, i ją
          ulepszać.{" "}
          <Link
            href="/polityka-prywatnosci"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Polityka prywatności
          </Link>
        </p>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="cookie-details"
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          {expanded ? "Ukryj szczegóły" : "Szczegóły"}
        </button>

        {expanded && (
          <dl
            id="cookie-details"
            className="space-y-2 border-t border-border pt-3 text-xs"
          >
            <div>
              <dt className="font-medium">Niezbędne — zawsze aktywne</dt>
              <dd className="text-muted-foreground">
                Potrzebne do podstawowego działania strony.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Analityczne — za zgodą</dt>
              <dd className="text-muted-foreground">
                PostHog i Microsoft Clarity: statystyki oraz nagrania sesji
                (heatmapy). Uruchamiają się dopiero po akceptacji.
              </dd>
            </div>
          </dl>
        )}

        <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
          <Button variant="ghost" size="sm" onClick={() => respond(false)}>
            Tylko niezbędne
          </Button>
          <Button size="sm" onClick={() => respond(true)}>
            Akceptuj
          </Button>
        </div>
      </div>
    </section>
  );
}
