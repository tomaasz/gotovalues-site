import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { brandName } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: `Polityka prywatności serwisu ${brandName} — informacje o przetwarzaniu danych osobowych zgodnie z RODO.`,
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <article className="surface legal-page">
        <p className="eyebrow">Dokument prawny</p>
        <h1>Polityka prywatności</h1>
        <p className="legal-updated">Ostatnia aktualizacja: 31 marca 2026</p>

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

          <h3>Google Analytics</h3>
          <p>
            Serwis korzysta z Google Analytics w celu analizy ruchu na stronie. Google Analytics
            wykorzystuje pliki cookies do zbierania anonimowych informacji o sposobie korzystania z
            serwisu (m.in. odwiedzane podstrony, czas wizyty, źródło ruchu). Dane te nie pozwalają
            na bezpośrednią identyfikację użytkownika. Podstawa prawna: art. 6 ust. 1 lit. f RODO
            (prawnie uzasadniony interes administratora — analiza i optymalizacja serwisu).
          </p>

          <h3>Dane techniczne</h3>
          <p>
            Serwer automatycznie rejestruje adres IP w celu ograniczenia nadużyć (rate limiting).
            Dane te nie są trwale przechowywane i nie służą identyfikacji użytkownika.
          </p>
        </section>

        <section>
          <h2>3. Pliki cookies</h2>
          <p>
            Serwis wykorzystuje pliki cookies wyłącznie w zakresie niezbędnym do działania Google
            Analytics. Nie stosuję własnych plików cookies do śledzenia, profilowania ani reklamy.
            Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki.
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
              <strong>Cloudflare</strong> — hosting i dostarczanie treści serwisu
            </li>
            <li>
              <strong>Google</strong> — analityka ruchu (Google Analytics)
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
