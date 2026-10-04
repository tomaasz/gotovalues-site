import { SiteHeader } from '@/components/site-header';
import { VibeCodingHeroSection } from '@/components/vibe-coding-hero-section';
import { faqs } from '@/content/faq';

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
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />
      <VibeCodingHeroSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
