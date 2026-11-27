import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { OwnerReveal } from "@/components/owner-reveal";
import { brandName } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  alternates: { canonical: "/polityka-prywatnosci" },
  description: `Polityka prywatności serwisu ${brandName} — informacje o przetwarzaniu danych osobowych zgodnie z RODO.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <article className="surface legal-page">
        <p className="eyebrow">Dokument prawny</p>
        <h1>Polityka prywatności</h1>
        <p className="legal-updated">Ostatnia aktualizacja: 27 listopada 2026</p>

        <section>
          <h2>1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych w serwisie {brandName} jest osoba fizyczna prowadząca
            serwis (<OwnerReveal variant="inline" />), kontakt e-mail:{" "}
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

          <h3>Proste statystyki odwiedzin (tylko za Twoją zgodą)</h3>
          <p>
            Jeśli wyrazisz zgodę na statystyki w banerze prywatności, serwis zbiera anonimowe dane o
            tym, które podstrony są odwiedzane oraz czy użytkownicy korzystają z podstawowych
            elementów strony (np. formularza kontaktowego lub odsłonięcia numeru telefonu). Dane te
            służą wyłącznie ulepszaniu treści i działania strony — bez reklam i bez profilowania.
            Bez Twojej zgody statystyki w ogóle się nie uruchamiają. Podstawa prawna: art. 6 ust. 1
            lit. a RODO (zgoda), którą możesz w każdej chwili wycofać.
          </p>

          <h3>Dane techniczne</h3>
          <p>
            Serwer automatycznie rejestruje adres IP w celu ochrony formularza przed spamem
            (ograniczenie liczby zapytań). Dane te nie są trwale przechowywane i nie służą
            identyfikacji użytkownika.
          </p>
        </section>

        <section>
          <h2>3. Pliki cookie i zgoda</h2>
          <p>Serwis wykorzystuje dwie kategorie plików cookie oraz pamięci przeglądarki:</p>
          <ul>
            <li>
              <strong>Niezbędne</strong> — zawsze aktywne. Zapamiętują Twój wybór dotyczący
              prywatności i zapewniają poprawne działanie strony. Nie wymagają zgody.
            </li>
            <li>
              <strong>Statystyki odwiedzin</strong> — uruchamiają się dopiero po kliknięciu
              &bdquo;Akceptuj&rdquo; w banerze prywatności. Jeśli wybierzesz &bdquo;Tylko
              niezbędne&rdquo;, skrypty statystyczne w ogóle się nie ładują.
            </li>
          </ul>
          <p>
            Swoją decyzję możesz w każdej chwili zmienić lub wycofać —{" "}
            <CookieSettingsButton className="legal-inline-button" />{" "}
            — albo usuwając dane witryny w ustawieniach przeglądarki. Wycofanie zgody nie wpływa na
            zgodność z prawem przetwarzania, którego dokonano przed jej wycofaniem.
          </p>
        </section>

        <section>
          <h2>4. Dostawcy techniczni (odbiorcy danych)</h2>
          <p>W zakresie niezbędnym do działania serwisu dane mogą być przekazywane następującym dostawcom:</p>
          <ul>
            <li>
              <strong>Resend</strong> — obsługa wysyłki wiadomości z formularza kontaktowego
            </li>
            <li>
              <strong>Vercel</strong> — hosting i udostępnianie strony internetowej
            </li>
            <li>
              <strong>PostHog</strong> (serwery w Unii Europejskiej) — anonimowe statystyki odwiedzin
              i zdarzeń (wyłącznie po wyrażeniu zgody)
            </li>
            <li>
              <strong>Google Analytics 4</strong> (Google) — podstawowe statystyki ruchu w trybie
              zgody Consent Mode, bez funkcji reklamowych (wyłącznie po wyrażeniu zgody)
            </li>
          </ul>
          <p>
            Wybrani dostawcy mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym (EOG),
            zapewniając odpowiedni poziom ochrony zgodnie z decyzjami Komisji Europejskiej lub
            standardowymi klauzulami umownymi.
          </p>
        </section>

        <section>
          <h2>5. Okres przechowywania danych</h2>
          <p>
            Dane z formularza kontaktowego przechowuję przez okres niezbędny do prowadzenia
            korespondencji i ewentualnej współpracy, nie dłużej niż 2 lata od ostatniego kontaktu.
            Dane statystyczne przechowywane są zgodnie z ustawieniami retencji narzędzi (do 14
            miesięcy).
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
            <li>wycofania zgody w dowolnym momencie</li>
            <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO)</li>
          </ul>
          <p>
            Aby skorzystać z powyższych praw, napisz na{" "}
            <a href="mailto:kontakt@gotovalues.com">kontakt@gotovalues.com</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
