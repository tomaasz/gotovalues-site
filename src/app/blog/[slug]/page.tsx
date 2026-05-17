import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import { blogPosts, getPost, getPostMetadata } from "@/content/blog";
import { SiteHeader } from "@/components/site-header";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getPostMetadata(slug);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const escapeMap: Record<string, string> = {
    '<': '\\u003c',
    '>': '\\u003e',
    '&': '\\u0026',
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Tomasz Gołaszewski",
      url: "https://www.linkedin.com/in/tomasz-golaszewski/",
    },
    publisher: {
      "@type": "Organization",
      name: "gotovalues",
      url: "https://gotovalues.com",
    },
    url: `https://gotovalues.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gotovalues.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    inLanguage: "pl",
  };

  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <Script
        id={`json-ld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/[<>&]/g, (c) => escapeMap[c]) }}
      />

      <article
        className="surface"
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        <nav style={{ marginBottom: "32px" }}>
          <Link
            href="/blog"
            style={{
              fontSize: "14px",
              color: "var(--accent, #58a6ff)",
              textDecoration: "none",
            }}
          >
            ← Blog
          </Link>
        </nav>

        <header style={{ marginBottom: "32px" }}>
          <time
            dateTime={post.date}
            style={{
              fontSize: "13px",
              color: "var(--grey, #6e7681)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {new Date(post.date).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <h1
            style={{
              fontSize: "32px",
              fontWeight: 600,
              lineHeight: 1.3,
              margin: "0 0 12px 0",
            }}
          >
            {post.title}
          </h1>

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
        </header>

        <div
          className="blog-content"
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "var(--fg, #c9d1d9)",
          }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
    </main>
  );
}
