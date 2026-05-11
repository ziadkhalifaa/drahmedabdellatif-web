import type { MetadataRoute } from 'next';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://drahmed.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/ar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/blog/published`, { cache: 'no-store' });
    const posts = await res.json();
    blogPosts = posts.flatMap((post: any) => [
      { url: `${BASE_URL}/en/blog/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: 'weekly' as const, priority: 0.8 },
      { url: `${BASE_URL}/ar/blog/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: 'weekly' as const, priority: 0.8 },
    ]);
  } catch {}

  return [...staticPages, ...blogPosts];
}
