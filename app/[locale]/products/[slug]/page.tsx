import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ProductDetail } from '@/components/product/ProductDetail';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { products, productsBySlug } from '@/data/products';
import type { Locale } from '@/lib/types';
import { pickLocale } from '@/lib/utils';

export function generateStaticParams() {
  return products.flatMap((p) =>
    ['en', 'fr'].map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = productsBySlug[slug];
  if (!product) return {};
  return {
    title: pickLocale(product.name, locale as Locale),
    description: pickLocale(product.description, locale as Locale),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = productsBySlug[slug];
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} locale={locale as Locale} />
      <RelatedProducts product={product} locale={locale as Locale} />
    </>
  );
}
