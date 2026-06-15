import type { Metadata } from "next";
import Link from "next/link";

import { RoiCalculator } from "@/components/roi-calculator";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Kalkulator ROI automatyzacji procesów",
  alternates: { canonical: "/kalkulator-roi" },
  description:
    "Policz, ile czasu i pieniędzy odzyskasz dzięki automatyzacji procesu. Wpisz liczbę wykonań, czas i koszt godziny — wynik liczy się na żywo.",
  openGraph: {
    title: "Kalkulator ROI automatyzacji procesów — gotovalues",
    description:
      "Policz na żywo, ile godzin i złotych odzyskasz dzięki automatyzacji powtarzalnego procesu w firmie.",
    url: "https://gotovalues.com/kalkulator-roi",
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RoiCalculatorPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">Kalkulator</p>
          <h1>Ile zwróci Ci automatyzacja procesu?</h1>
          <p className="lede">
            Większość rozczarowań automatyzacją bierze się z tego, że nikt
            wcześniej nie policzył, czy się opłaca. Wpisz kilka liczb o swoim
            procesie — pokażę szacunek oszczędności i okres zwrotu.
          </p>
          <div className="hero-actions">
            <Link
              className="button button-secondary"
              href="/blog/automatyzacja-procesow-w-firmie-przewodnik"
            >
              Przewodnik: jak liczyć ROI
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Co liczy kalkulator</span>
            <ul>
              <li>godziny tracone dziś na powtarzalny proces</li>
              <li>oszczędność miesięczną i roczną w złotych</li>
              <li>okres zwrotu z kosztu wdrożenia</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">oszczędność czasu</div>
            <div className="hero-chip">ROI</div>
            <div className="hero-chip">okres zwrotu</div>
            <div className="hero-chip">na żywo</div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Policz sam"
          heading="Wpisz liczby swojego procesu"
        />
        <RoiCalculator />
      </section>
    </main>
  );
}
