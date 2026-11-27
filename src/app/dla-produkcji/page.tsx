import type { Metadata } from "next";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Dla produkcji",
  alternates: { canonical: "/dla-produkcji" },
  description: siteContent.productionLanding.metadataDescription,
};

export default function ProductionLandingPage() {
  const content = siteContent.productionLanding;

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
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">{content.panel.label}</span>
            <ul>
              {content.panel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hero-panel-grid">
            {content.panel.chips.map((chip) => (
              <div className="hero-chip" key={chip}>
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="objawy">
        <SectionHeading
          eyebrow={content.sections.symptoms.eyebrow}
          heading={content.sections.symptoms.heading}
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

      <section className="section" id="rozwiazania">
        <SectionHeading
          eyebrow={content.sections.solutions.eyebrow}
          heading={content.sections.solutions.heading}
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

      <section className="section" id="jak-pracuje">
        <SectionHeading
          eyebrow={content.sections.firstStep.eyebrow}
          heading={content.sections.firstStep.heading}
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
          eyebrow={content.sections.contact.eyebrow}
          heading={content.sections.contact.heading}
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>{content.sections.contact.intro}</p>
            <ul className="contact-points">
              {content.sections.contact.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ContactSignals />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
