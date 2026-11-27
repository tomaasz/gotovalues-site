"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_REOPEN_EVENT,
  DEFAULT_CONSENT,
  getCookieConsent,
  saveCookieConsent,
} from "@/lib/cookie-consent";

function subscribe(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
}

const getSnapshot = () => getCookieConsent() === null;
const getServerSnapshot = () => false;

export function CookieConsent() {
  const needsConsent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [expanded, setExpanded] = useState(false);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const onReopen = () => setReopened(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
  }, []);

  const respond = useCallback((analytics: boolean) => {
    const previous = getCookieConsent();
    saveCookieConsent(
      analytics ? { necessary: true, analytics: true } : DEFAULT_CONSENT,
    );
    setReopened(false);
    if (!analytics && previous?.analytics) window.location.reload();
  }, []);

  if (!needsConsent && !reopened) return null;

  return (
    <section
      aria-label="Ustawienia prywatności i plików cookie"
      className="fixed inset-x-0 bottom-0 z-50 max-h-[45vh] overflow-y-auto border-t-2 border-foreground bg-background px-4 py-3 text-foreground"
    >
      <div className="mx-auto max-w-[1180px] space-y-2 md:flex md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2 md:space-y-0">
        <p className="text-xs leading-relaxed text-muted-foreground md:flex-1">
          <span className="font-semibold text-foreground">Pliki cookie. </span>
          Korzystam z niezbędnych plików, aby strona działała poprawnie. Za Twoją zgodą
          zbieram też proste, anonimowe statystyki odwiedzin, żeby wiedzieć, które
          informacje są najbardziej przydatne.{" "}
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

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => respond(false)}>
            Tylko niezbędne
          </Button>
          <Button size="sm" onClick={() => respond(true)}>
            Akceptuj
          </Button>
        </div>

        {expanded && (
          <dl
            id="cookie-details"
            className="space-y-2 border-t border-border pt-3 text-xs md:basis-full"
          >
            <div>
              <dt className="font-medium">Niezbędne — zawsze aktywne</dt>
              <dd className="text-muted-foreground">
                Zapamiętują Twój wybór dotyczący prywatności i zapewniają poprawne działanie strony.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Statystyki odwiedzin — tylko za zgodą</dt>
              <dd className="text-muted-foreground">
                Zliczają odwiedziny podstron oraz podstawowe akcje na stronie (np. użycie formularza
                lub odsłonięcie numeru telefonu), bez reklam i bez profilowania.
              </dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  );
}
