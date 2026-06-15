import type { Metadata } from "next";
import Link from "next/link";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Dla logistyki i spedycji",
  description:
    "Dedykowane narzędzia dla firm logistycznych i spedycyjnych: statusy przesyłek, dokumenty przewozowe, rozliczenia z przewoźnikami i integracja systemów bez wymiany środowiska.",
  openGraph: {
    title: "Dla logistyki i spedycji — gotovalues",
    description:
      "Porządkuję statusy zleceń, dokumenty przewozowe i wymianę danych w logistyce — lekkie narzędzia i integracje bez wymiany TMS/ERP.",
    url: "https://gotovalues.com/dla-logistyki",
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

export default function LogisticsLandingPage() {
  const content = siteContent.logisticsLanding;

  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.headline}</h1>
          <p className="lede">{content.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={content.cta.href}>
              {content.cta.label}
            </a>
            <Link className="button button-secondary" href="/#produkty">
              Zobacz przykłady wdrożeń
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Typowe obszary problemu</span>
            <ul>
              <li>statusy przesyłek rozsiane po portalach przewoźników</li>
              <li>ręczne przepisywanie danych między TMS, ERP i mailem</li>
              <li>dokumenty przewozowe i POD-y trudne do odnalezienia</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">statusy przesyłek</div>
            <div className="hero-chip">przewoźnicy</div>
            <div className="hero-chip">dokumenty</div>
            <div className="hero-chip">integracje</div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Objawy"
          heading="Najczęściej problem nie polega na braku systemu. Polega na tym, że realna praca spedycji i tak wraca do maila, Excela i portali kurierskich."
        />
        <div className="pillar-grid">
          {content.symptoms.map((item) => (
            <article className="surface pillar-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Co porządkuję"
          heading="Buduję lekkie narzędzia wokół procesu i łączę istniejące systemy, zamiast proponować wymianę całego środowiska."
        />
        <div className="pillar-grid">
          {content.solutions.map((item) => (
            <article className="surface pillar-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Proof" heading={content.proofHeading} />
        <div className="product-grid">
          {siteContent.products.public.map((product) => (
            <ProductCard compact key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section" id="jak-pracuje">
        <SectionHeading
          eyebrow="Pierwszy krok"
          heading="Nie zaczynam od dużego wdrożenia. Zaczynam od jednego procesu, który dziś zjada czas spedytorom i back office."
        />
        <div className="surface about-card">
          <p>{content.closing}</p>
          <div className="about-points">
            {content.processSteps.map((step) => (
              <div key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface" id="zobacz-tez">
        <SectionHeading
          eyebrow="Zobacz także"
          heading="Integracja systemów i automatyzacja triażu"
        />
        <p style={{ maxWidth: "var(--measure)", marginBottom: "var(--space-m)" }}>
          Sporo wartości w logistyce daje samo połączenie systemów oraz
          automatyczne segregowanie zgłoszeń i dokumentów. Zobacz, jak do tego
          podchodzę.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/blog/integracja-systemow-it-w-firmie">
            Integracja systemów IT
          </Link>
          <Link className="button button-secondary" href="/triageflow">
            TriageFlow — triage zgłoszeń
          </Link>
        </div>
      </section>

      <section className="section" id="kontakt">
        <SectionHeading
          eyebrow="Kontakt"
          heading="Jeśli widzisz taki problem u siebie, opisz go w kilku zdaniach. Wrócę z oceną, czy warto budować narzędzie pod ten proces."
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>
              Najlepiej sprawdzają się tematy związane ze statusami przesyłek,
              awizacjami, dokumentami przewozowymi, rozliczeniami z przewoźnikami
              i ręcznym przepływem danych między portalami, plikami i systemami.
            </p>
            <ul className="contact-points">
              <li>wystarczy jeden konkretny przykład ze spedycji albo back office</li>
              <li>nie potrzebujesz gotowej specyfikacji ani listy funkcji</li>
              <li>jeśli problem rozwiąże gotowa integracja, powiem to wprost</li>
            </ul>
            <ContactSignals />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
