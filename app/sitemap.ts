import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { countries } from '@/data/countries';
import { categories } from '@/data/categories';
import { artisans } from '@/data/artisans';
import { stories } from '@/data/stories';

const BASE = 'https://afrima-app.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ['', '/countries', '/artisans', '/culture', '/deals', '/about', '/cart', '/wishlist'];

  const dynamicPaths = [
    ...products.map((p) => `/products/${p.slug}`),
    ...countries.map((c) => `/countries/${c.slug}`),
    ...categories.map((c) => `/categories/${c.slug}`),
    ...artisans.map((a) => `/artisans/${a.slug}`),
    ...stories.map((s) => `/culture/${s.slug}`),
  ];

  const urls = [...staticPaths, ...dynamicPaths];

  return urls.flatMap((path) => [
    {
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: {
          en: `${BASE}${path}`,
          fr: `${BASE}/fr${path}`,
        },
      },
    },
  ]);
}
