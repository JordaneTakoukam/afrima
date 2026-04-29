'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { countriesBySlug } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

const TABS = ['cameroon', 'morocco', 'ghana', 'mali', 'kenya', 'senegal', 'nigeria', 'ethiopia'] as const;

export function TrendingByCountry() {
  const t = useTranslations('Trending');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<(typeof TABS)[number]>('cameroon');

  // Pad with similar-region products if a country has fewer than 8 products
  const list = useMemo<Product[]>(() => {
    const own = products.filter((p) => p.country === active);
    const country = countriesBySlug[active];
    if (own.length >= 8) return own.slice(0, 12);
    const fillers = products.filter(
      (p) => p.country !== active && countriesBySlug[p.country]?.region === country?.region,
    );
    return [...own, ...fillers].slice(0, 12);
  }, [active]);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8">
      <SectionHeading
        kicker="Across the continent"
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="mt-8 flex flex-nowrap items-center gap-2 overflow-x-auto border-b border-ink/15 pb-4 scrollbar-hide md:flex-wrap md:overflow-visible">
        {TABS.map((slug) => {
          const c = countriesBySlug[slug];
          const isActive = slug === active;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setActive(slug)}
              className={`group relative inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors ${
                isActive ? 'bg-ink text-bone' : 'text-ink/70 hover:bg-ink/5'
              }`}
            >
              <span aria-hidden>{c.flag}</span>
              <span>{pickLocale(c.name, locale)}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
