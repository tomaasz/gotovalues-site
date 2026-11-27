import Link from 'next/link';

import { ContactFormLazy } from '@/components/contact-form-lazy';
import { ProcessDrawing } from '@/components/home/process-drawing';
import { OwnerReveal } from '@/components/owner-reveal';
import { PhoneReveal } from '@/components/phone-reveal';
import { ProductCard } from '@/components/product-card';
import { faqs } from '@/content/faq';
import { siteContent } from '@/content/site';

const ZONES_X = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
const ZONES_Y = ['1', '2', '3', '4'] as const;

/** Sheet 1 — first viewport: the process drawing with audience split and CTA. */
export function DrawingSheet() {
  const { brand } = siteContent;

  return (
    <section className="gv-sheet gv-sheet-main" aria-labelledby="gv-title">
      <div className="gv-zones gv-zones-x" aria-hidden="true">
        {ZONES_X.map((zone) => (
          <span key={zone}>{zone}</span>
        ))}
      </div>
      <div className="gv-zones gv-zones-y" aria-hidden="true">
        {ZONES_Y.map((zone) => (
          <span key={zone}>{zone}</span>
        ))}
      </div>

      <div className="gv-sheet-grid">
        <header className="gv-sheet-title">
          <h1 id="gv-title">{brand.headline}</h1>
          <p className="gv-lede">{brand.intro}</p>
        </header>

        <div className="gv-sheet-drawing">
          <ProcessDrawing />
        </div>

        <div className="gv-title-block" id="opisz-proces">
          <div className="gv-tb-summary">
            <div className="gv-tb-audiences">
              {brand.audiencePaths.map((path, index) => (
                <div className="gv-tb-audience" key={path.title}>
                  <span className="gv-pos">{index + 1}</span>
                  <div>
                    <p className="gv-tb-audience-eyebrow">{path.eyebrow}</p>
                    <strong>{path.title}</strong>
                    <p>{path.description}</p>
                    {path.href.startsWith('/') ? (
                      <Link className="gv-link gv-tb-audience-link" href={path.href as '/wsparcie-it'}>
                        {path.linkLabel} →
                      </Link>
                    ) : (
                      <a className="gv-link gv-tb-audience-link" href={path.href}>
                        {path.linkLabel} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="gv-tb-actions">
              <a className="gv-tb-submit gv-tb-cta" href={brand.cta.primary.href}>
                {brand.cta.primary.label}
              </a>
            </div>
          </div>
          <dl className="gv-tb-meta">
            <div>
              <dt>Obszar</dt>
              <dd>automatyzacja · dane · aplikacje · IT</dd>
            </div>
            <div>
              <dt>Kontakt</dt>
              <dd>bezpośrednio, bez pośredników</dd>
            </div>
            <div>
              <dt>Tryb</dt>
              <dd>zdalnie · lokalnie po umówieniu</dd>
            </div>
            <div>
              <dt>Marka</dt>
              <dd>gotovalues</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Sheet 2 — 4 offer pillars as a numbered parts list plus working principles. */
export function PartsListSheet() {
  const { offer, approach } = siteContent;

  return (
    <section className="gv-sheet" id="oferta" aria-labelledby="gv-parts-title">
      <div className="gv-sheet-head">
        <h2 id="gv-parts-title">Zakres usług</h2>
        <p className="gv-lede">
          Każdy temat zaczynam od diagnozy — jeśli wystarczy konfiguracja obecnych narzędzi, nie proponuję budowy systemu od zera.
        </p>
      </div>

      <div className="gv-table-wrap">
        <table className="gv-parts">
          <thead>
            <tr>
              <th scope="col">Poz.</th>
              <th scope="col">Obszar</th>
              <th scope="col">Wartość</th>
              <th scope="col">Elementy</th>
            </tr>
          </thead>
          <tbody>
            {offer.pillars.map((pillar, index) => (
              <tr key={pillar.title}>
                <td>
                  <span className="gv-pos">{index + 1}</span>
                </td>
                <th scope="row">
                  <span>{pillar.title}</span>
                  <Link className="gv-link gv-pillar-link" href={pillar.href}>
                    {pillar.ctaLabel} →
                  </Link>
                </th>
                <td>{pillar.description}</td>
                <td>
                  <ul>
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gv-notes-block">
        <h3>Jak pracuję</h3>
        <ol className="gv-tech-notes">
          {approach.points.map((point) => (
            <li key={point.title}>
              <strong>{point.title}.</strong> {point.description}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Sheet 3 — product proof grid (intentionally not rendered on homepage per PF-2 owner decision). */
export function ProofSheet() {
  const { products } = siteContent;
  const allProducts = [...products.public, ...products.private];
  const detailCodes = ['A', 'B', 'C', 'D'];

  return (
    <section className="gv-sheet" id="produkty" aria-labelledby="gv-proof-title">
      <div className="gv-sheet-head gv-proof-head">
        <h2 id="gv-proof-title">Projekty autorskie i rozwiązania</h2>
        <p className="gv-proof-intro">
          Własne projekty webowe oraz krótkie, zanonimizowane rozwiązania prywatne bez linków.
        </p>
      </div>

      <div className="gv-proof-grid" data-proof-grid="unified">
        {allProducts.map((product, index) => (
          <ProductCard
            key={product.name}
            product={product}
            variant="sheet"
            detailCode={detailCodes[index]}
          />
        ))}
      </div>
    </section>
  );
}

/** Sheet 4 — concise brand-first "O gotovalues" block with click-to-reveal owner details. */
export function AuthorSheet() {
  const { about } = siteContent;

  return (
    <section className="gv-sheet gv-author" id="o-mnie" aria-labelledby="gv-author-title">
      <div className="gv-author-copy">
        <h2 id="gv-author-title">{about.title}</h2>
        <p className="gv-lede">{about.headline}</p>
        <p>{about.summary}</p>
        <OwnerReveal variant="profile" />
      </div>
      <dl className="gv-author-table">
        <div>
          <dt>Rola</dt>
          <dd>{about.role}</dd>
        </div>
        {about.points.map((point) => (
          <div key={point.label}>
            <dt>{point.label}</dt>
            <dd>{point.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Sheet 5 — FAQ. Content mirrors the FAQPage JSON-LD. */
export function NotesSheet() {
  return (
    <section className="gv-sheet" id="faq" aria-labelledby="gv-notes-title">
      <div className="gv-sheet-head">
        <h2 id="gv-notes-title">Pytania przed współpracą</h2>
      </div>
      <ol className="gv-faq">
        {faqs.map((faq) => (
          <li key={faq.q}>
            <details>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Sheet 6 — single contact form on the homepage. */
export function ContactSheet() {
  const { contact } = siteContent;

  return (
    <section className="gv-sheet gv-contact" id="kontakt" aria-labelledby="gv-contact-title">
      <div className="gv-contact-copy">
        <h2 id="gv-contact-title">Opisz temat lub problem</h2>
        <p>{contact.intro}</p>
        <dl className="gv-author-table">
          <div>
            <dt>Telefon</dt>
            <dd>
              <PhoneReveal />
            </dd>
          </div>
          {contact.signals.map((signal) => (
            <div key={signal.label}>
              <dt>{signal.label}</dt>
              <dd>
                {'href' in signal ? (
                  <a className="gv-link" href={signal.href}>
                    {signal.value}
                  </a>
                ) : (
                  signal.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="gv-contact-form">
        <ContactFormLazy />
      </div>
    </section>
  );
}
