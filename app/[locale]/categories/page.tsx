import { SafeImage as Image } from '@/components/shared/SafeImage';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CategoryIcon } from '@/components/shared/CategoryIcon';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CategoriesPage' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function CategoriesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('CategoriesPage');
  const loc = locale as Locale;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
        AFRIMA
      </div>
      <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-6xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-xl text-ink/70 md:text-lg">{t('subtitle')}</p>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {categories.map((c) => {
          const count = getProductsByCategory(c.slug).length;
          return (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface card-shadow card-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bone-deep">
                <Image
                  src={c.cover}
                  alt={pickLocale(c.name, loc)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fallbackText={pickLocale(c.name, loc)}
                  fallbackSeed={c.slug}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
                <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-clay card-shadow">
                  <CategoryIcon name={c.icon} size={20} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {pickLocale(c.name, loc)}
                  </h2>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-clay" />
                </div>
                <p className="mt-1 flex-1 text-sm text-ink/70">
                  {pickLocale(c.description, loc)}
                </p>
                <div
                  className="mt-3 font-mono text-[11px] uppercase tracking-wide text-clay"
                  data-num
                >
                  {t('productCount', { count })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
