import type { Metadata } from "next";
import Link from "next/link";

import { blogPosts } from "@/content/blog";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Blog — automatyzacja, dane, aplikacje i IT",
  alternates: { canonical: "/blog" },
  description:
    "Praktyczne artykuły o automatyzacji procesów, danych i raportowaniu, dedykowanych aplikacjach webowych oraz porządkowaniu środowiska IT.",
  openGraph: {
    title: "Blog — automatyzacja, dane, aplikacje i IT | gotovalues",
    description:
      "Praktyczne artykuły o automatyzacji procesów, danych i raportowaniu, dedykowanych aplikacjach webowych oraz porządkowaniu środowiska IT.",
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
          <h1>Praktycznie o automatyzacji, danych i aplikacjach.</h1>
          <p className="lede">
            Konkretne przewodniki, przykłady obliczeniowe i kryteria wyboru narzędzi — bez
            marketingowych obietnic i zbędnego żargonu.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/#kontakt">
              Opisz proces do uporządkowania
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
        <div className="pillar-grid">
          {blogPosts.map((post) => (
            <article className="surface pillar-card blog-card" key={post.slug}>
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
