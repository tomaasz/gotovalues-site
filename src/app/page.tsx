import Link from "next/link";

import { siteContent } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
  const featuredProducts = siteContent.products.public;

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="brand-mark" href="/">
          GoToValues
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
            <span className="hero-panel-label">Sposób pracy</span>
            <ul>
              <li>analiza problemu i przepływu pracy</li>
              <li>prototyp lub MVP z jasnym zakresem</li>
              <li>wdrożenie, pomiary i kolejne iteracje</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">dashboardy</div>
            <div className="hero-chip">workflow</div>
            <div className="hero-chip">OCR</div>
            <div className="hero-chip">AI tools</div>
          </div>
        </div>
      </section>

      <section className="section" id="oferta">
        <div className="section-heading">
          <p className="eyebrow">Oferta</p>
          <h2>Dwa filary, jeden cel: mniej chaosu i lepsze narzędzia do pracy.</h2>
        </div>
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
        <div className="section-heading section-heading-inline">
          <div>
            <p className="eyebrow">Produkty</p>
            <h2>Publiczne projekty, które pokazują sposób myślenia i jakość wykonania.</h2>
          </div>
          <Link className="text-link" href="/produkty">
            Zobacz pełną stronę produktów
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard compact key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section" id="o-mnie">
        <div className="section-heading">
          <p className="eyebrow">O mnie</p>
          <h2>Łączę analitykę, produkt i realizację techniczną.</h2>
        </div>
        <div className="surface about-card">
          <p>{siteContent.about.body}</p>
          <div className="about-points">
            <div>
              <strong>Klienci</strong>
              <span>otrzymują konkretne wdrożenia zamiast slajdów i ogólników.</span>
            </div>
            <div>
              <strong>Rekruterzy</strong>
              <span>widzą realne produkty, stack i sposób rozwiązywania problemów.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="kontakt">
        <div className="section-heading">
          <p className="eyebrow">Kontakt</p>
          <h2>Jeśli chcesz uporządkować proces albo zbudować własną aplikację, napisz.</h2>
        </div>
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>
              Najlepiej sprawdzają się projekty, w których trzeba połączyć dane, workflow i
              czytelny interfejs dla ludzi, którzy mają na co dzień zbyt dużo ręcznej pracy.
            </p>
            <ul className="contact-points">
              <li>mini-audyt procesu lub istniejącego narzędzia</li>
              <li>wycena MVP, dashboardu albo automatyzacji</li>
              <li>kontakt bezpośrednio na skrzynkę e-mail</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
