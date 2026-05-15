import { SafeImage as Image } from '@/components/shared/SafeImage';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { CategoryProducts } from '@/components/category/CategoryProducts';
import { CategoryIcon } from '@/components/shared/CategoryIcon';
import { categories, categoriesBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return categories.flatMap((c) =>
    ['en', 'fr'].map((locale) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = categoriesBySlug[slug];
  if (!c) return {};
  return {
    title: pickLocale(c.name, locale as Locale),
    description: pickLocale(c.description, locale as Locale),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const category = categoriesBySlug[slug];
  if (!category) notFound();
  const loc = locale as Locale;
  const list = getProductsByCategory(category.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-ink">
        <div className="absolute inset-0">
          <Image
            src={category.cover}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-40"
            fallbackText={pickLocale(category.name, loc)}
            fallbackSeed={category.slug}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-4 py-14 text-bone md:px-8 md:py-20">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay text-bone">
            <CategoryIcon name={category.icon} size={24} />
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">
            {pickLocale(category.name, loc)}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-ochre">
            {pickLocale(category.tagline, loc)}
          </p>
          <p className="mt-4 max-w-2xl text-bone/80 md:text-lg">
            {pickLocale(category.description, loc)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
        <CategoryProducts products={list} locale={loc} />
      </section>
    </>
  );
}
