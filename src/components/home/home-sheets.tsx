import { ContactFormLazy } from '@/components/contact-form-lazy';
import { ProcessDrawing } from '@/components/home/process-drawing';
import { OwnerReveal } from '@/components/owner-reveal';
import { PhoneReveal } from '@/components/phone-reveal';
import { ProductCard } from '@/components/product-card';
import { faqs } from '@/content/faq';
import { siteContent } from '@/content/site';

const ZONES_X = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
const ZONES_Y = ['1', '2', '3', '4'] as const;

/** Sheet 1 — first viewport: the process drawing with its title block. */
export function DrawingSheet() {
  const { brand, offer } = siteContent;

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
            <ol className="gv-tb-scope">
              {offer.pillars.map((pillar, index) => (
                <li key={pillar.title}>
                  <span className="gv-pos">{index + 1}</span>
                  <div>
                    <strong>{pillar.title}</strong>
                    <p>{pillar.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="gv-tb-actions">
              <a className="gv-tb-submit gv-tb-cta" href={brand.cta.primary.href}>
                {brand.cta.primary.label}
              </a>
              <a className="gv-link gv-tb-secondary" href={brand.cta.secondary.href}>
                {brand.cta.secondary.label}
              </a>
            </div>
          </div>
          <dl className="gv-tb-meta">
            <div>
              <dt>Zakres</dt>
              <dd>automatyzacja, aplikacje, serwery, IT</dd>
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

/** Sheet 2 — offer as a numbered parts list plus technical notes. */
export function PartsListSheet() {
  const { offer, approach } = siteContent;

  return (
    <section className="gv-sheet" id="oferta" aria-labelledby="gv-parts-title">
      <div className="gv-sheet-head">
        <h2 id="gv-parts-title">Zakres usług</h2>
      </div>

      <div className="gv-table-wrap">
        <table className="gv-parts">
          <thead>
            <tr>
              <th scope="col">Poz.</th>
              <th scope="col">Nazwa</th>
              <th scope="col">Zakres</th>
              <th scope="col">Elementy</th>
            </tr>
          </thead>
          <tbody>
            {offer.pillars.map((pillar, index) => (
              <tr key={pillar.title}>
                <td>
                  <span className="gv-pos">{index + 1}</span>
                </td>
                <th scope="row">{pillar.title}</th>
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

/** Sheet 3 — unified product proof grid (not rendered on homepage per owner decision). */
export function ProofSheet() {
  const { products } = siteContent;
  const allProducts = [...products.public, ...products.private];
  const detailCodes = ['A', 'B', 'C', 'D'];

  return (
    <section className="gv-sheet" id="produkty" aria-labelledby="gv-proof-title">
      <div className="gv-sheet-head gv-proof-head">
        <h2 id="gv-proof-title">Przykłady produktów i wdrożeń</h2>
        <p className="gv-proof-intro">
          Dwa publiczne produkty z linkami oraz krótkie, anonimowe przykłady wdrożeń prywatnych bez linków.
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

/** Sheet 4 — author block ("O mnie"). */
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

/** Sheet 5 — notes (FAQ). Content mirrors the FAQPage JSON-LD. */
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

/** Sheet 6 — full contact form. */
export function ContactSheet() {
  const { contact } = siteContent;

  return (
    <section className="gv-sheet gv-contact" id="kontakt" aria-labelledby="gv-contact-title">
      <div className="gv-contact-copy">
        <h2 id="gv-contact-title">Opisz krótko temat lub proces</h2>
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
