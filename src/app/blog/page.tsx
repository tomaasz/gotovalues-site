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

      <SectionHeading
        as="section"
        level="h1"
        className="hero-copy surface"
        eyebrow="Blog"
        heading="Praktycznie o aplikacjach, AI i procesach."
      >
        <p className="lede">
          Artykuły pisane z perspektywy kogoś, kto codziennie buduje narzędzia
          do porządkowania procesów — bez marketingowych obietnic i
          buzzwordów.
        </p>
      </SectionHeading>

      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: "var(--surface, #161b22)",
                border: "1px solid var(--border, #30363d)",
                borderRadius: "8px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <time
                dateTime={post.date}
                style={{
                  fontSize: "12px",
                  color: "var(--grey, #6e7681)",
                }}
              >
                {new Date(post.date).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <h2 style={{ fontSize: "20px", margin: 0 }}>
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    color: "var(--fg, #c9d1d9)",
                    textDecoration: "none",
                  }}
                >
                  {post.title}
                </Link>
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--fg-dim, #8b949e)",
                  lineHeight: 1.6,
                }}
              >
                {post.description}
              </p>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      background: "var(--surface-2, #21262d)",
                      borderRadius: "10px",
                      color: "var(--fg-dim, #8b949e)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                style={{
                  marginTop: "auto",
                  fontSize: "14px",
                  color: "var(--accent, #58a6ff)",
                  textDecoration: "none",
                }}
              >
                Czytaj dalej →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
