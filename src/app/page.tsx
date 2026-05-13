import Link from "next/link";

import { siteContent } from "@/content/site";
import { blogPosts } from "@/content/blog";
import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  const featuredProducts = siteContent.products.public;
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

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

      <section className="section" id="podejscie">
        <SectionHeading
          eyebrow={siteContent.approach.eyebrow}
          heading={siteContent.approach.headline}
        />
        <div className="approach-grid">
          {siteContent.approach.points.map((point) => (
            <article className="approach-card" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="produkty">
        <SectionHeading
          eyebrow="Produkty"
          heading="Działające produkty i prywatne wdrożenia pokazują, jak przekładam problem operacyjny na konkretne narzędzie."
        />
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard compact key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section" id="support-ai">
        <SectionHeading
          inline
          eyebrow="SupportFlow AI"
          heading="Gotowy pakiet dla zespołów wsparcia: agenty AI, które klasyfikują zgłoszenia, piszą robocze odpowiedzi i eskalują trudne sprawy."
        >
          <Link className="text-link" href="/support-ai">
            Zobacz pakiety i proces wdrożenia →
          </Link>
        </SectionHeading>
        <div className="approach-grid">
          <article className="approach-card">
            <h3>2 tygodnie wdrożenia</h3>
            <p>Od warsztatu mapowania procesów do działającego agenta — bez agencyjnego narzutu.</p>
          </article>
          <article className="approach-card">
            <h3>Od 4 000 PLN</h3>
            <p>START z prototypem agenta triage, BUSINESS z trzema agentami i integracjami, ENTERPRISE z audytem i SLA.</p>
          </article>
          <article className="approach-card">
            <h3>Działa z Twoim helpdeskiem</h3>
            <p>Integracja z istniejącym systemem zgłoszeń, CRM-em i Slackiem — bez wymiany środowiska.</p>
          </article>
        </div>
      </section>

      <section className="section" id="blog">
        <SectionHeading
          inline
          eyebrow="Blog"
          heading="Praktycznie o aplikacjach, AI i procesach — bez marketingowych obietnic."
        >
          <Link className="text-link" href="/blog">
            Wszystkie wpisy →
          </Link>
        </SectionHeading>
        <div className="pillar-grid">
          {recentPosts.map((post) => (
            <article className="surface pillar-card" key={post.slug}>
              <time className="eyebrow" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.description}</p>
              <Link className="text-link" href={`/blog/${post.slug}`}>
                Czytaj dalej →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="o-mnie">
        <SectionHeading eyebrow={siteContent.about.title} heading={siteContent.about.headline} />
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
          heading="Opisz jeden proces, który dziś zabiera ludziom czas, a powiem Ci, czym go uporządkować — gotowym narzędziem, integracją albo dedykowanym rozwiązaniem."
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>{siteContent.contact.intro}</p>
            <ul className="contact-points">
              <li>wystarczy jeden konkretny przykład z codziennej pracy</li>
              <li>ocenię, czy wystarczy gotowe narzędzie, integracja, czy trzeba budować coś dedykowanego</li>
              <li>jeśli problem rozwiązuje darmowe lub tanie narzędzie z rynku — powiem to wprost</li>
            </ul>
            <ContactSignals />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
