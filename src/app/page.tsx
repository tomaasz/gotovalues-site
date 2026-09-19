import { SiteHeader } from '@/components/site-header';
import { VibeCodingHeroSection } from '@/components/vibe-coding-hero-section';

export default function HomePage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />
      <VibeCodingHeroSection />
    </main>
  );
}
