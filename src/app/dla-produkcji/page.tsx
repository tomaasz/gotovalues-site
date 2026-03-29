import type { Metadata } from "next";
import Link from "next/link";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Dla produkcji",
  description:
    "Dedykowane narzędzia dla firm produkcyjnych i przetwórczych: dokumenty jakościowe, reklamacje, statusy i wyjątki operacyjne bez dokładania kolejnego Excela.",
};

export default function ProductionLandingPage() {
  const content = siteContent.productionLanding;
  const contactSignals = siteContent.contact.signals;

  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <header className="site-header">
        <Link className="brand-mark" href="/">
          {siteContent.brand.name}
        </Link>
        <nav className="site-nav" aria-label="Główna nawigacja">
          <Link href="/">Strona główna</Link>
          <Link href="/produkty">Produkty</Link>
          <Link href="#kontakt">Kontakt</Link>
        </nav>
      </header>

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.headline}</h1>
          <p className="lede">{content.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={content.cta.href}>
              {content.cta.label}
            </a>
            <Link className="button button-secondary" href="/produkty">
              Zobacz przykłady wdrożeń
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Typowe obszary problemu</span>
            <ul>
              <li>dokumenty jakościowe, reklamacje i protokoły</li>
              <li>statusy partii, decyzji i wyjątków operacyjnych</li>
              <li>ręczne przepisywanie danych między plikami i systemami</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">jakość</div>
            <div className="hero-chip">reklamacje</div>
            <div className="hero-chip">partie</div>
            <div className="hero-chip">workflow</div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Objawy"
          heading="Najczęściej problem nie polega na braku systemu. Polega na tym, że realna praca zakładu i tak wraca do maila, Excela i ręcznych obejść."
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
          heading="Buduję lekkie narzędzia wokół procesu, zamiast proponować wymianę całego środowiska pracy."
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
        <SectionHeading inline eyebrow="Proof" heading={content.proofHeading}>
          <Link className="text-link" href="/produkty">
            Zobacz pełną stronę produktów
          </Link>
        </SectionHeading>
        <div className="product-grid">
          {siteContent.products.public.map((product) => (
            <ProductCard compact key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section" id="jak-pracuje">
        <SectionHeading
          eyebrow="Pierwszy krok"
          heading="Nie zaczynam od dużego wdrożenia. Zaczynam od jednego procesu, który dziś zjada czas ludziom operacyjnym."
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

      <section className="section" id="kontakt">
        <SectionHeading
          eyebrow="Kontakt"
          heading="Jeśli widzisz taki problem u siebie, opisz go w kilku zdaniach. Wrócę z oceną, czy warto budować narzędzie pod ten proces."
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>
              Najlepiej sprawdzają się tematy związane z dokumentami jakościowymi, reklamacjami,
              statusami, wyjątkami operacyjnymi i ręcznym przepływem danych między ludźmi,
              plikami i systemami.
            </p>
            <ul className="contact-points">
              <li>wystarczy jeden konkretny przykład z zakładu albo back office</li>
              <li>nie potrzebujesz gotowej specyfikacji ani listy funkcji</li>
              <li>jeśli problem nie wymaga customowego narzędzia, powiem to wprost</li>
            </ul>
            <div className="about-points">
              {contactSignals.map((signal) => (
                <div key={signal.label}>
                  <strong>{signal.label}</strong>
                  {"href" in signal ? <a href={signal.href}>{signal.value}</a> : <span>{signal.value}</span>}
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
