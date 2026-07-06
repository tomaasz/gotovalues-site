import type { Metadata } from "next";
import Link from "next/link";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "gotovalues — jak pracuję: AI, web apps, procesy",
  alternates: { canonical: "/jak-pracuje" },
  description:
    "Jak gotovalues prowadzi wdrożenia AI i aplikacji webowych: najpierw proces i gotowe narzędzia, potem integracje, automatyzacja albo dedykowana aplikacja, jeśli ma to sens biznesowy.",
  openGraph: {
    title: "gotovalues — jak pracuję",
    description:
      "Proces, gotowe narzędzia, automatyzacja i dedykowane aplikacje — bez sztucznego przeciwstawiania freelancerów, low-code i software house'ów.",
    url: "https://gotovalues.com/jak-pracuje",
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "gotovalues — AI, automatyzacja i lekkie aplikacje webowe",
  provider: {
    "@type": "Person",
    name: "Tomasz Gołaszewski",
    url: "https://gotovalues.com",
  },
  areaServed: "PL",
  serviceType: "AI automation and lightweight web applications for SMEs",
  url: "https://gotovalues.com/jak-pracuje",
};

export default function ComparisonLandingPage() {
  const landing = siteContent.comparisonLanding;
  const proof = siteContent.proofOfCompetence;

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
            <Link className="button button-secondary" href="/#produkty">
              Zobacz przykłady
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Zasada pracy</span>
            <ul>
              <li>nie zaczynam od kodu, tylko od procesu</li>
              <li>nie wciskam automatyzacji, gdy wystarczy gotowe narzędzie</li>
              <li>buduję własny UI i integracje, gdy proces tego wymaga</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">proces</div>
            <div className="hero-chip">AI</div>
            <div className="hero-chip">web app</div>
            <div className="hero-chip">integracje</div>
            <div className="hero-chip">niski koszt</div>
          </div>
        </div>
      </section>

      <section className="section" id="porownanie">
        <SectionHeading
          eyebrow="Decyzja"
          heading="Nie chodzi o etykietę dostawcy — chodzi o dobór właściwego poziomu rozwiązania"
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

      <section className="section" id="dowody">
        <SectionHeading eyebrow={proof.eyebrow} heading={proof.headline} />
        <div className="pillar-grid">
          {proof.items.map((item) => (
            <article className="surface pillar-card" key={item.name}>
              <h3>
                <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </h3>
              <p>{item.summary}</p>
              <ul>
                {item.evidence.map((evidence) => (
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <SectionHeading
          eyebrow="FAQ"
          heading="Jak zdecydować: gotowiec, automatyzacja, dedykowana aplikacja czy większy zespół?"
        />
        <div className="faq-grid">
          <article className="surface pillar-card">
            <h3>Kiedy wystarczy sam wykonawca?</h3>
            <p>
              Gdy masz gotową specyfikację, niewielki zakres i potrzebujesz tylko wykonania. Jeśli trzeba
              dopiero ustalić proces, ograniczyć zakres i dobrać narzędzie, zaczynam od tej pracy przed kodem.
            </p>
          </article>
          <article className="surface pillar-card">
            <h3>Kiedy wystarczy low-code?</h3>
            <p>
              Gdy proces to proste przeniesienie danych między znanymi narzędziami. Jeśli potrzebujesz własnego
              interfejsu, kontroli kosztów AI, wyjątków i walidacji, dokładam kod tylko tam, gdzie daje przewagę.
            </p>
          </article>
          <article className="surface pillar-card">
            <h3>Kiedy potrzebny jest większy zespół?</h3>
            <p>
              Przy dużym projekcie, wielu zespołach i budżecie enterprise. gotovalues jest dla firm, które chcą
              rozwiązać konkretny proces w wąskim zakresie, szybciej i bez nadmiarowej organizacji.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="kontakt">
        <SectionHeading
          eyebrow="Kontakt"
          heading="Opisz jeden proces — pomogę dobrać najprostsze rozwiązanie, które faktycznie odciąży zespół."
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>{siteContent.contact.intro}</p>
            <ul className="contact-points">
              <li>wystarczy przykład z codziennej pracy, bez gotowej specyfikacji</li>
              <li>odpowiem, czy warto budować, integrować, czy użyć gotowego narzędzia</li>
              <li>jeśli problem nie ma sensu biznesowego — powiem to wprost</li>
            </ul>
            <ContactSignals />
          </div>
          <ContactForm />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
