import Link from "next/link";

import { siteContent } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

export default function HomePage() {
  const featuredProducts = siteContent.products.public;
  const contactSignals = siteContent.contact.signals;

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="brand-mark" href="/">
          {siteContent.brand.name}
        </Link>
        <nav className="site-nav" aria-label="Główna nawigacja">
          <a href="#oferta">Oferta</a>
          <Link href="/produkty">Produkty</Link>
          <a href="#o-mnie">O mnie</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </header>

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">{siteContent.brand.eyebrow}</p>
          <h1>{siteContent.brand.headline}</h1>
          <p className="lede">{siteContent.brand.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={siteContent.brand.cta.primary.href}>
              {siteContent.brand.cta.primary.label}
            </a>
            <Link className="button button-secondary" href={siteContent.brand.cta.secondary.href}>
              {siteContent.brand.cta.secondary.label}
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Typowe punkty wejścia</span>
            <ul>
              <li>dokumenty, statusy i decyzje rozrzucone między kilka miejsc</li>
              <li>ręczne przepisywanie, sprawdzanie i pilnowanie wyjątków</li>
              <li>proces, którego nie da się sensownie zamknąć w gotowym systemie</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">workflow</div>
            <div className="hero-chip">dokumenty</div>
            <div className="hero-chip">OCR</div>
            <div className="hero-chip">custom tools</div>
          </div>
        </div>
      </section>

      <section className="section" id="oferta">
        <SectionHeading
          eyebrow="Oferta"
          heading="Najczęściej wchodzę tam, gdzie proces niby działa, ale codziennie kosztuje czas i uwagę zespołu."
        />
        <div className="pillar-grid">
          {siteContent.offer.pillars.map((pillar) => (
            <article className="surface pillar-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <ul>
                {pillar.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="produkty">
        <SectionHeading
          inline
          eyebrow="Produkty"
          heading="Działające produkty i prywatne wdrożenia pokazują, jak przekładam problem operacyjny na konkretne narzędzie."
        >
          <Link className="text-link" href="/produkty">
            Przejdź do pełnej strony produktów
          </Link>
        </SectionHeading>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard compact key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section" id="o-mnie">
        <SectionHeading eyebrow="O mnie" heading={siteContent.about.headline} />
        <div className="surface about-card">
          <p>
            <strong>{siteContent.about.role}</strong>
          </p>
          <p>
            <a
              className="text-link"
              href={siteContent.about.profileLink.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteContent.about.profileLink.label}
            </a>
          </p>
          <p>{siteContent.about.summary}</p>
          <p>{siteContent.about.detail}</p>
          <div className="about-points">
            {siteContent.about.points.map((point) => (
              <div key={point.label}>
                <strong>{point.label}</strong>
                <span>{point.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="kontakt">
        <SectionHeading
          eyebrow="Kontakt"
          heading="Opisz jeden proces, który dziś zabiera ludziom czas, a powiem Ci, czy warto porządkować go dedykowanym narzędziem."
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>{siteContent.contact.intro}</p>
            <ul className="contact-points">
              <li>wystarczy jeden konkretny przykład z codziennej pracy</li>
              <li>ocenię, czy problem nadaje się na lekki system, workflow albo funkcję AI</li>
              <li>jeśli nie ma sensu budować customowego narzędzia, powiem to wprost</li>
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
