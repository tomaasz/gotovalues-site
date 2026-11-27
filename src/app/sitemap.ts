import { MetadataRoute } from 'next';

import { blogPosts } from '@/content/blog';

const BASE_URL = 'https://gotovalues.com';
const SITE_UPDATED = new Date('2026-11-27');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/automatyzacja`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dane-i-analityka`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/aplikacje`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/wsparcie-it`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/jak-pracuje`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
