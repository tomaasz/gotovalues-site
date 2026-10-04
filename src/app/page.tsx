import {
  AuthorSheet,
  ContactSheet,
  DrawingSheet,
  NotesSheet,
  PartsListSheet,
  ProofSheet,
} from '@/components/home/home-sheets';
import { SiteHeader } from '@/components/site-header';
import { faqs } from '@/content/faq';

import './home.css';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function HomePage() {
  return (
    <main id="main" className="page-shell gv-home" tabIndex={-1}>
      <SiteHeader />
      <DrawingSheet />
      <PartsListSheet />
      <ProofSheet />
      <AuthorSheet />
      <NotesSheet />
      <ContactSheet />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
