import Link from "next/link";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { siteContent, type ServiceLandingContent } from "@/content/site";
import { escapeMap } from "@/lib/utils";

export function ServiceLanding({ content }: { content: ServiceLandingContent }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${content.title} — gotovalues`,
    description: content.metaDescription,
    provider: {
      "@type": "Organization",
      name: "gotovalues",
      url: "https://gotovalues.com",
    },
    areaServed: "PL",
    serviceType: content.eyebrow,
    url: `https://gotovalues.com${content.slug}`,
  };

  const otherServices = siteContent.offer.pillars.filter((p) => p.href !== content.slug);

  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.headline}</h1>
          <p className="lede">{content.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#kontakt">
              {content.ctaLabel}
            </a>
            <Link className="button button-secondary" href="/jak-pracuje">
              Jak pracuję
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">{content.panelLabel}</span>
            <ul>
              {content.panelItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hero-panel-grid">
            {content.chips.map((chip) => (
              <div className="hero-chip" key={chip}>
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Sytuacje" heading={content.whenHeading} />
        <div className="pillar-grid">
          {content.whenItems.map((item) => (
            <article className="surface pillar-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Zakres" heading={content.scopeHeading} />
        <div className="pillar-grid">
          {content.scopeItems.map((item) => (
            <article className="surface pillar-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Przebieg" heading={content.processHeading} />
        <div className="faq-grid">
          {content.processSteps.map((step) => (
            <article className="surface pillar-card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="kontakt">
        <SectionHeading eyebrow="Kontakt" heading={content.contactHeading} />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>{content.contactIntro}</p>
            <ul className="contact-points">
              {content.contactPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ContactSignals />
          </div>
          <ContactForm
            messageLabel={content.formLabel}
            messagePlaceholder={content.formPlaceholder}
          />
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Pozostałe obszary" heading="Inne usługi gotovalues" />
        <div className="faq-grid">
          {otherServices.map((service) => (
            <article className="surface pillar-card" key={service.href}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link className="text-link" href={service.href}>
                {service.ctaLabel} →
              </Link>
            </article>
          ))}
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
