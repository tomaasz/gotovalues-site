import type { Metadata } from "next";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";
import { escapeMap } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Jak pracuję — od procesu do rozwiązania",
  alternates: { canonical: "/jak-pracuje" },
  description:
    "Jak gotovalues prowadzi wdrożenia i prace zdalne: najpierw proces i gotowe narzędzia, potem integracje, automatyzacja albo lekka aplikacja webowa — w małych, planowanych etapach.",
  openGraph: {
    title: "Jak pracuję — od procesu do rozwiązania | gotovalues",
    description:
      "Najpierw diagnoza procesu i gotowe narzędzia, potem integracje, automatyzacja albo dedykowana aplikacja webowa.",
    url: "https://gotovalues.com/jak-pracuje",
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "gotovalues — procesy, dane, aplikacje i zdalne IT dla firm",
  provider: {
    "@type": "Person",
    name: "Tomasz Gołaszewski",
    url: "https://gotovalues.com",
  },
  areaServed: "PL",
  serviceType: "Process automation, lightweight web applications and planned remote IT support",
  url: "https://gotovalues.com/jak-pracuje",
};

export default function ComparisonLandingPage() {
  const landing = siteContent.comparisonLanding;

  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">{landing.eyebrow}</p>
          <h1>{landing.headline}</h1>
          <p className="lede">{landing.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={landing.cta.href}>
              {landing.cta.label}
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Zasada pracy</span>
            <ul>
              <li>nie zaczynam od kodu, tylko od procesu i realnych danych</li>
              <li>nie wciskam aplikacji, gdy wystarczy konfiguracja gotowego narzędzia</li>
              <li>dzielę pracę na małe, planowane etapy z jasną wyceną przed startem</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">proces</div>
            <div className="hero-chip">dane</div>
            <div className="hero-chip">integracje</div>
            <div className="hero-chip">aplikacja</div>
            <div className="hero-chip">zdalne IT</div>
          </div>
        </div>
      </section>

      <section className="section" id="porownanie">
        <SectionHeading
          eyebrow="Podejście"
          heading="Dobór właściwego poziomu rozwiązania zamiast jednego schematu"
        />
        <div className="pillar-grid">
          {landing.audiences.map((audience) => (
            <article className="surface pillar-card" key={audience.slug}>
              <h3>{audience.title}</h3>
              <p>{audience.pain}</p>
              <ul>
                {audience.gotovaluesAdvantage.map((advantage) => (
                  <li key={advantage}>{advantage}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <SectionHeading
          eyebrow="Decyzja"
          heading="Kiedy wystarczy konfiguracja, kiedy automatyzacja, a kiedy większy zespół?"
        />
        <div className="faq-grid">
          <article className="surface pillar-card">
            <h3>Kiedy wystarczy uporządkowanie narzędzi?</h3>
            <p>
              Gdy problem wynika z rozproszonych arkuszy, poczty, uprawnień albo braku kopii zapasowych.
              Zamiast pisać nowy system, porządkuję istniejące narzędzia i konfiguruję je zdalnie.
            </p>
          </article>
          <article className="surface pillar-card">
            <h3>Kiedy budować integrację lub lekką aplikację?</h3>
            <p>
              Gdy zespół ręcznie przepisuje te same dane między programami albo potrzebuje jednego
              prostego widoku pracy z walidacją wyjątków, którego gotowe narzędzia nie domykają.
            </p>
          </article>
          <article className="surface pillar-card">
            <h3>Kiedy potrzebny jest większy zespół?</h3>
            <p>
              Przy dużym projekcie na wiele działów, serwisie z dojazdem na miejsce lub wymaganiu
              dyżurów 24/7. Jeśli temat wykracza poza mój zakres, mówię to wprost na początku.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="kontakt">
        <SectionHeading
          eyebrow="Kontakt"
          heading="Opisz jeden proces albo problem — wrócę z oceną najprostszego kroku."
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>{siteContent.contact.intro}</p>
            <ul className="contact-points">
              <li>wystarczy przykład z codziennej pracy, bez gotowej specyfikacji</li>
              <li>odpowiem, czy wystarczy konfiguracja, integracja, czy lekkie narzędzie</li>
              <li>jeśli temat nie wymaga wdrożenia albo wykracza poza mój zakres — powiem to wprost</li>
            </ul>
            <ContactSignals />
          </div>
          <ContactForm
            messageLabel="Opisz proces lub problem"
            messagePlaceholder="Opisz krótko, co zajmuje za dużo ręcznej pracy albo jakie narzędzia chcesz uporządkować lub połączyć."
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/[<>&]/g, (c) => escapeMap[c]) }}
      />
    </main>
  );
}
