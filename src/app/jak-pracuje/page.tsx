import type { Metadata } from "next";
import Link from "next/link";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";
import { escapeMap } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Jak pracuję — od diagnozy problemu do rozwiązania",
  alternates: { canonical: "/jak-pracuje" },
  description:
    "Jak gotovalues prowadzi prace: najpierw diagnoza procesu lub środowiska IT, potem dobór najprostszego poziomu — konfiguracji, integracji, analityki albo dedykowanej aplikacji.",
  openGraph: {
    title: "Jak pracuję — od diagnozy problemu do rozwiązania | gotovalues",
    description:
      "Najpierw diagnoza procesu i obecnych narzędzi, potem integracje, analityka danych, dedykowana aplikacja albo wsparcie IT.",
    url: "https://gotovalues.com/jak-pracuje",
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "gotovalues — jak pracuję",
  provider: {
    "@type": "Organization",
    name: "gotovalues",
    url: "https://gotovalues.com",
  },
  areaServed: "PL",
  serviceType: "Automation, data analytics, web applications and IT support",
  url: "https://gotovalues.com/jak-pracuje",
};

export default function HowIWorkPage() {
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
              <li>nie zaczynam od kodu, tylko od diagnozy procesu i danych</li>
              <li>nie wciskam aplikacji, gdy wystarczy konfiguracja obecnego narzędzia</li>
              <li>dzielę pracę na zamknięte etapy z jasną wyceną przed startem</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">automatyzacja</div>
            <div className="hero-chip">dane</div>
            <div className="hero-chip">aplikacje</div>
            <div className="hero-chip">serwery</div>
            <div className="hero-chip">wsparcie IT</div>
          </div>
        </div>
      </section>

      <section className="section" id="podejscie">
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

      <section className="section" id="decyzja">
        <SectionHeading
          eyebrow="Decyzja"
          heading="Kiedy wystarczy konfiguracja, kiedy automatyzacja, a kiedy większy zespół?"
        />
        <div className="faq-grid">
          <article className="surface pillar-card">
            <h3>Kiedy wystarczy uporządkowanie IT?</h3>
            <p>
              Gdy problem wynika z rozproszonych plików, poczty, uprawnień, braku kopii zapasowych
              lub przestarzałej konfiguracji sprzętu.{" "}
              <Link className="text-link" href="/wsparcie-it">
                Zobacz wsparcie IT →
              </Link>
            </p>
          </article>
          <article className="surface pillar-card">
            <h3>Kiedy budować integrację, raport lub aplikację?</h3>
            <p>
              Gdy tracisz godziny na przepisywanie danych między programami albo potrzebujesz jednego
              wiarygodnego widoku pracy i wyjątków.{" "}
              <Link className="text-link" href="/automatyzacja">
                Automatyzacja →
              </Link>{" "}
              ·{" "}
              <Link className="text-link" href="/aplikacje">
                Aplikacje →
              </Link>
            </p>
          </article>
          <article className="surface pillar-card">
            <h3>Kiedy potrzebny jest większy zespół?</h3>
            <p>
              Przy wdrożeniu na wiele działów jednocześnie lub wymaganiu całodobowych dyżurów 24/7.
              Jeśli temat wykracza poza mój zakres, mówię to wprost na początku.
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
              <li>odpowiem, czy wystarczy konfiguracja, integracja, czy dedykowane narzędzie</li>
              <li>jeśli temat wykracza poza mój zakres — powiem to wprost</li>
            </ul>
            <ContactSignals />
          </div>
          <ContactForm
            messageLabel="Opisz proces lub problem"
            messagePlaceholder="Opisz krótko, co zajmuje za dużo ręcznej pracy albo jakie narzędzia lub sprzęt chcesz uporządkować."
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/[<>&]/g, (c) => escapeMap[c]),
        }}
      />
    </main>
  );
}
