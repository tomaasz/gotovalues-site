import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { brandName } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  alternates: { canonical: "/polityka-prywatnosci" },
  description: `Polityka prywatności serwisu ${brandName} — informacje o przetwarzaniu danych osobowych zgodnie z RODO.`,
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <article className="surface legal-page">
        <p className="eyebrow">Dokument prawny</p>
        <h1>Polityka prywatności</h1>
        <p className="legal-updated">Ostatnia aktualizacja: 10 lipca 2026</p>

        <section>
          <h2>1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest Tomasz Gołaszewski, prowadzący działalność pod
            marką {brandName}, adres e-mail:{" "}
            <a href="mailto:kontakt@gotovalues.com">kontakt@gotovalues.com</a>.
          </p>
        </section>

        <section>
          <h2>2. Jakie dane zbieram i w jakim celu</h2>

          <h3>Formularz kontaktowy</h3>
          <p>
            Przy wysyłce formularza kontaktowego przetwarzam: imię, adres e-mail, nazwę firmy
            (opcjonalnie) oraz treść wiadomości. Dane te wykorzystuję wyłącznie w celu odpowiedzi na
            zapytanie i ewentualnego nawiązania współpracy. Podstawa prawna: art. 6 ust. 1 lit. b
            i f RODO (podjęcie działań przed zawarciem umowy oraz prawnie uzasadniony interes
            administratora).
          </p>

          <h3>Analityka i statystyki (tylko za Twoją zgodą)</h3>
          <p>
            Jeśli wyrazisz zgodę na pliki cookie analityczne, serwis korzysta z narzędzi
            analitycznych, które zbierają informacje o sposobie korzystania ze strony (m.in.
            odwiedzane podstrony, czas i źródło wizyty, interakcje ze stroną oraz przybliżona
            lokalizacja na podstawie adresu IP). Dane te służą wyłącznie analizie i ulepszaniu
            serwisu — nie wykorzystuję ich do reklamy ani profilowania. Bez Twojej zgody narzędzia
            te w ogóle się nie uruchamiają. Podstawa prawna: art. 6 ust. 1 lit. a RODO (zgoda),
            którą możesz w każdej chwili wycofać.
          </p>
          <ul>
            <li>
              <strong>PostHog</strong> (PostHog, Unia Europejska) — statystyki ruchu i zdarzeń na
              stronie, ładowane przez własną domenę serwisu.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> (Microsoft) — mapy ciepła (heatmapy) oraz nagrania
              sesji, które mogą rejestrować ruch kursora, kliknięcia i przewijanie strony (treść pól
              oznaczonych jako wrażliwe jest maskowana). Clarity jest zintegrowany z Google
              Analytics 4 — zbiorcze statystyki mogą trafiać do usługi Google.
            </li>
          </ul>

          <h3>Dane techniczne</h3>
          <p>
            Serwer automatycznie rejestruje adres IP w celu ograniczenia nadużyć (rate limiting).
            Dane te nie są trwale przechowywane i nie służą identyfikacji użytkownika.
          </p>
        </section>

        <section>
          <h2>3. Pliki cookies i zgoda</h2>
          <p>Serwis wykorzystuje dwie kategorie plików cookie oraz podobnych technologii (np. localStorage):</p>
          <ul>
            <li>
              <strong>Niezbędne</strong> — zawsze aktywne. Konieczne do podstawowego działania
              strony, m.in. do zapamiętania Twojej decyzji dotyczącej cookies. Nie wymagają zgody.
            </li>
            <li>
              <strong>Analityczne</strong> — PostHog i Microsoft Clarity (opisane w pkt 2).
              Uruchamiają się dopiero po wyrażeniu zgody w banerze cookie. Jeśli nie wyrazisz zgody,
              narzędzia te w ogóle się nie ładują.
            </li>
          </ul>
          <p>
            Przy pierwszej wizycie wyświetlamy baner, w którym możesz zaakceptować cookies
            analityczne (&bdquo;Akceptuj&rdquo;) albo z nich zrezygnować (&bdquo;Tylko
            niezbędne&rdquo;). Swoją decyzję
            możesz w każdej chwili zmienić lub wycofać —{" "}
            <CookieSettingsButton className="legal-inline-button" />{" "}
            — albo usuwając dane witryny w ustawieniach przeglądarki. Wycofanie zgody nie wpływa na
            zgodność z prawem przetwarzania, którego dokonano przed jej wycofaniem.
          </p>
        </section>

        <section>
          <h2>4. Odbiorcy danych</h2>
          <p>Dane osobowe mogą być przekazywane następującym podmiotom:</p>
          <ul>
            <li>
              <strong>Resend</strong> — usługa do wysyłki e-maili (przetwarzanie formularza
              kontaktowego)
            </li>
            <li>
              <strong>Vercel</strong> — hosting i dostarczanie treści serwisu
            </li>
            <li>
              <strong>PostHog</strong> — analityka ruchu (za zgodą; serwery w Unii Europejskiej)
            </li>
            <li>
              <strong>Microsoft</strong> — mapy ciepła i nagrania sesji w Microsoft Clarity (za zgodą)
            </li>
            <li>
              <strong>Google</strong> — zbiorcze statystyki z Google Analytics 4 (za zgodą, przez
              integrację z Microsoft Clarity)
            </li>
          </ul>
          <p>
            Wymienione podmioty mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym (EOG),
            zapewniając odpowiedni poziom ochrony zgodnie z decyzjami Komisji Europejskiej lub
            standardowymi klauzulami umownymi.
          </p>
        </section>

        <section>
          <h2>5. Okres przechowywania danych</h2>
          <p>
            Dane z formularza kontaktowego przechowuję przez okres niezbędny do realizacji
            korespondencji i ewentualnej współpracy, nie dłużej niż 2 lata od ostatniego kontaktu.
            Dane analityczne Google Analytics są przechowywane zgodnie z polityką retencji Google
            (domyślnie 14 miesięcy).
          </p>
        </section>

        <section>
          <h2>6. Twoje prawa</h2>
          <p>Na podstawie RODO przysługuje Ci prawo do:</p>
          <ul>
            <li>dostępu do swoich danych osobowych</li>
            <li>sprostowania danych</li>
            <li>usunięcia danych (&bdquo;prawo do bycia zapomnianym&rdquo;)</li>
            <li>ograniczenia przetwarzania</li>
            <li>przenoszenia danych</li>
            <li>wniesienia sprzeciwu wobec przetwarzania</li>
            <li>
              wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych
              (PUODO)
            </li>
          </ul>
          <p>
            W celu realizacji swoich praw skontaktuj się ze mną:{" "}
            <a href="mailto:kontakt@gotovalues.com">kontakt@gotovalues.com</a>.
          </p>
        </section>

        <section>
          <h2>7. Dobrowolność podania danych</h2>
          <p>
            Podanie danych w formularzu kontaktowym jest dobrowolne, ale niezbędne do przesłania
            zapytania i otrzymania odpowiedzi.
          </p>
        </section>

        <section>
          <h2>8. Zmiany w polityce prywatności</h2>
          <p>
            Zastrzegam sobie prawo do aktualizacji niniejszej polityki. O istotnych zmianach
            poinformuję poprzez aktualizację daty na górze dokumentu.
          </p>
        </section>
      </article>
    </main>
  );
}
