import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { SITE } from '@/lib/constants';

const BASE = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ['', '/categories', '/deals', '/about', '/search', '/cart', '/wishlist'];
  const dynamicPaths = [
    ...categories.map((c) => `/categories/${c.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
    alternates: {
      languages: {
        fr: `${BASE}${path}`,
        en: `${BASE}/en${path}`,
      },
    },
  }));
}
