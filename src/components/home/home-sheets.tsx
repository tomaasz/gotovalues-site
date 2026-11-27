import { ContactFormLazy } from '@/components/contact-form-lazy';
import { ProcessDrawing } from '@/components/home/process-drawing';
import { TitleBlockForm } from '@/components/home/title-block-form';
import { PhoneReveal } from '@/components/phone-reveal';
import { ProductCard } from '@/components/product-card';
import { faqs } from '@/content/faq';
import { siteContent } from '@/content/site';

const ZONES_X = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
const ZONES_Y = ['1', '2', '3', '4'] as const;

function ExternalIcon() {
  return (
    <svg className="gv-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M6 3h7v7M13 3 4 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/** Sheet 1 — first viewport: the process drawing with its title block. */
export function DrawingSheet() {
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
          <h1 id="gv-title">Sprawne IT dla małej firmy i JDG.</h1>
        </header>

        <div className="gv-sheet-drawing">
          <ProcessDrawing />
        </div>

        <div className="gv-title-block" id="opisz-proces">
          <TitleBlockForm />
          <dl className="gv-tb-meta">
            <div>
              <dt>Zakres</dt>
              <dd>sieci, serwis, helpdesk, narzędzia</dd>
            </div>
            <div>
              <dt>Opracował</dt>
              <dd>Tomasz Gołaszewski</dd>
            </div>
            <div>
              <dt>Obszar</dt>
              <dd>Zabrodzie, pow. wyszkowski + zdalnie</dd>
            </div>
            <div>
              <dt>Firma</dt>
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
        <h2 id="gv-parts-title">Usługi IT dla małych firm i JDG</h2>
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
        <h3>Jak pracuję na co dzień</h3>
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

/** Sheet 3 — unified product proof grid: public links and anonymous private deployments. */
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

/** Sheet 4 — author block ("Opracował"). */
export function AuthorSheet() {
  const { about } = siteContent;

  return (
    <section className="gv-sheet gv-author" id="o-mnie" aria-labelledby="gv-author-title">
      <div className="gv-author-copy">
        <h2 id="gv-author-title">Opracował: Tomasz Gołaszewski</h2>
        <p className="gv-lede">{about.headline}</p>
        <p>{about.summary}</p>
        <a className="gv-link" href={about.profileLink.href} target="_blank" rel="noopener noreferrer">
          {about.profileLink.label}
          <ExternalIcon />
          <span className="sr-only"> (otwiera się w nowej karcie)</span>
        </a>
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
        <h2 id="gv-notes-title">Uwagi: pytania przed współpracą</h2>
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
        <h2 id="gv-contact-title">Opisz, z czym potrzebujesz pomocy</h2>
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
