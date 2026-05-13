import type { Metadata } from "next";
import Link from "next/link";

import { blogPosts } from "@/content/blog";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Blog — dedykowane aplikacje webowe, AI i automatyzacja procesów",
  description:
    "Praktyczne artykuły o budowie dedykowanych aplikacji webowych, automatyzacji procesów z AI, pipeline'ach przetwarzania dokumentów i porządkowaniu pracy operacyjnej w firmach.",
  openGraph: {
    title: "Blog — dedykowane aplikacje webowe, AI i automatyzacja",
    description:
      "Praktyczne artykuły o budowie dedykowanych aplikacji webowych, automatyzacji procesów z AI i porządkowaniu pracy operacyjnej.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">Blog</p>
          <h1>Praktycznie o aplikacjach, AI i procesach.</h1>
          <p className="lede">
            Artykuły pisane z perspektywy kogoś, kto codziennie buduje narzędzia
            do porządkowania procesów — bez marketingowych obietnic i
            buzzwordów.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/#kontakt">
              Opisz proces do uporządkowania
            </Link>
            <Link className="button button-secondary" href="/#produkty">
              Zobacz działające przykłady
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">O czym piszę</span>
            <ul>
              <li>kiedy Excel i gotowe systemy przestają wystarczać</li>
              <li>pipeline&apos;y AI do dokumentów, OCR i workflow</li>
              <li>realne koszty utrzymania i monitoring</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">aplikacje webowe</div>
            <div className="hero-chip">AI w firmie</div>
            <div className="hero-chip">automatyzacja</div>
            <div className="hero-chip">workflow</div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Wpisy"
          heading="Najnowsze artykuły"
        />
        <div className="product-grid">
          {blogPosts.map((post) => (
            <article className="surface pillar-card" key={post.slug}>
              <time className="eyebrow" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <h3>
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p>{post.description}</p>

              <ul className="tag-list" aria-label={`Tagi: ${post.tags.join(", ")}`}>
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <Link className="text-link" href={`/blog/${post.slug}`}>
                Czytaj dalej →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
