import { SafeImage as Image } from '@/components/shared/SafeImage';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/product/ProductCard';
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
}) {
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
  const t = await getTranslations('Category');
  const category = categoriesBySlug[slug];
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="absolute inset-0">
          <Image src={category.cover} alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/30" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28 text-bone">
          <div className="font-mono text-3xl text-ochre md:text-6xl" data-num>{category.numberLabel}</div>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] md:text-8xl">
            {pickLocale(category.name, locale as Locale)}
          </h1>
          <p className="mt-4 max-w-2xl text-bone/85 md:text-lg">
            {pickLocale(category.description, locale as Locale)}
          </p>
          {category.subcategories ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {category.subcategories.map((s, i) => (
                <span key={i} className="rounded-full border border-bone/30 px-3 py-1 text-xs font-mono uppercase tracking-wider">
                  {pickLocale(s, locale as Locale)}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink/60" data-num>
            {t('results', { count: products.length })}
          </div>
        </div>

        {products.length === 0 ? (
          <p className="mt-12 text-ink/60">{t('noResults')}</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale as Locale} />
            ))}
          </div>
        )}

        <div className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl">More on {pickLocale(category.name, locale as Locale)}</h2>
          <p className="mt-3 max-w-3xl text-ink/75 leading-relaxed">
            {pickLocale(category.longDescription, locale as Locale)}
          </p>
        </div>
      </section>
    </>
  );
}
