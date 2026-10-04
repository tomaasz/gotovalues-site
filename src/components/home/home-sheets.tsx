import Image from 'next/image';
import Link from 'next/link';

import { ContactFormLazy } from '@/components/contact-form-lazy';
import { ProcessDrawing } from '@/components/home/process-drawing';
import { TitleBlockForm } from '@/components/home/title-block-form';
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
          <h1 id="gv-title">Porządkuję jeden proces naraz.</h1>
          <p className="gv-lede">{brand.headline}</p>
        </header>

        <div className="gv-sheet-drawing">
          <ProcessDrawing />
        </div>

        <div className="gv-title-block" id="opisz-proces">
          <TitleBlockForm />
          <dl className="gv-tb-meta">
            <div>
              <dt>Rysunek</dt>
              <dd>poglądowy proces operacyjny</dd>
            </div>
            <div>
              <dt>Opracował</dt>
              <dd>Tomasz Gołaszewski</dd>
            </div>
            <div>
              <dt>Odpowiedź</dt>
              <dd>do 24 h w dni robocze</dd>
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
        <h2 id="gv-parts-title">Wykaz części: co porządkuję i buduję</h2>
        <Link className="gv-link" href="/jak-pracuje">
          Jak wybieram między gotowcem, integracją a aplikacją
        </Link>
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
        <h3>Wymagania techniczne każdego wdrożenia</h3>
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

/** Sheet 3 — detail views: the two public products and private deployments. */
export function ProofSheet() {
  const { products } = siteContent;
  const detailLetters = ['A', 'B'];

  return (
    <section className="gv-sheet" id="produkty" aria-labelledby="gv-proof-title">
      <div className="gv-sheet-head">
        <h2 id="gv-proof-title">Szczegóły: działające produkty na tej samej infrastrukturze</h2>
      </div>

      <div className="gv-details">
        {products.public.map((product, index) => (
          <article className="gv-detail" key={product.name}>
            <div className="gv-detail-callout" aria-hidden="true">
              <span className="gv-detail-letter">{detailLetters[index]}</span>
              <span>szczegół {detailLetters[index]}</span>
            </div>
            <div className="gv-detail-view">
              <Image
                src={product.screenshot.src}
                alt={product.screenshot.alt}
                width={960}
                height={600}
                sizes="(max-width: 900px) 100vw, 560px"
              />
            </div>
            <div className="gv-detail-copy">
              <h3>{product.name}</h3>
              <p>{product.summary}</p>
              <p className="gv-detail-impact">{product.impact}</p>
              <p className="gv-detail-stack">{product.stack.join(' · ')}</p>
              {product.url ? (
                <a className="gv-link" href={product.url} target="_blank" rel="noopener noreferrer">
                  Otwórz {product.name}
                  <ExternalIcon />
                  <span className="sr-only"> (otwiera się w nowej karcie)</span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="gv-private">
        <h3>Wdrożenia prywatne</h3>
        <p className="gv-private-note">Opisane bez linków i nazw klientów.</p>
        <ul>
          {products.private.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.summary}</span>
              <span className="gv-detail-stack">{item.stack.join(' · ')}</span>
            </li>
          ))}
        </ul>
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
        <p>{about.detail}</p>
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
        <h2 id="gv-contact-title">Zlecenie: opisz proces do uporządkowania</h2>
        <p>{contact.intro}</p>
        <dl className="gv-author-table">
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
