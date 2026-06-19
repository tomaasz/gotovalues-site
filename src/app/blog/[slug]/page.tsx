import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import { blogPosts, getPost, getPostMetadata } from "@/content/blog";
import { SiteHeader } from "@/components/site-header";
import { escapeMap } from "@/lib/utils";

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/[<>&]/g, (c) => escapeMap[c]),
        }}
      />

      <article className="surface blog-post">
        <nav className="blog-post-nav">
          <Link href="/blog" className="text-link">
            ← Blog
          </Link>
        </nav>

        <header className="blog-post-header">
          <time dateTime={post.date} className="blog-post-date">
            {new Date(post.date).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <h1>{post.title}</h1>

          <ul className="tag-list">
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
    </main>
  );
}
