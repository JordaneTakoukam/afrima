'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { countries } from '@/data/countries';
import { categories } from '@/data/categories';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

const TRENDING = ['Toghu', 'Kente', 'Shea butter', 'Berber rug', 'Djembe', 'Argan'];

export function SearchClient({
  initialQuery,
  locale,
}: {
  initialQuery: string;
  locale: Locale;
}) {
  const t = useTranslations('Search');
  const [q, setQ] = useState(initialQuery);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as typeof products;
    return products.filter((p) => {
      const name = `${pickLocale(p.name, 'en')} ${pickLocale(p.name, 'fr')}`.toLowerCase();
      const desc = `${pickLocale(p.description, 'en')} ${pickLocale(p.description, 'fr')}`.toLowerCase();
      const country = countries.find((c) => c.slug === p.country);
      const countryName = country
        ? `${pickLocale(country.name, 'en')} ${pickLocale(country.name, 'fr')}`.toLowerCase()
        : '';
      const cat = categories.find((c) => c.slug === p.category);
      const catName = cat ? `${pickLocale(cat.name, 'en')} ${pickLocale(cat.name, 'fr')}`.toLowerCase() : '';
      return (
        name.includes(term) ||
        desc.includes(term) ||
        countryName.includes(term) ||
        catName.includes(term) ||
        (p.ethnicGroup ?? '').toLowerCase().includes(term)
      );
    });
  }, [q]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl md:text-6xl">{t('title')}</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex items-center gap-3 border-b-2 border-ink py-2"
      >
        <SearchIcon className="h-5 w-5 text-ink/60" />
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('placeholder')}
          className="w-full bg-transparent text-lg placeholder:text-ink/40 focus:outline-none"
        />
        {q ? (
          <button
            type="button"
            onClick={() => setQ('')}
            className="font-mono text-[11px] uppercase tracking-wider text-ink/60 hover:text-ink"
          >
            {t('clear')}
          </button>
        ) : null}
      </form>

      {!q ? (
        <div className="mt-10">
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink/60">
            {t('trendingSearches')}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {TRENDING.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQ(s)}
                className="rounded-full border border-ink/20 px-3 py-1.5 text-sm hover:border-ink hover:bg-ink hover:text-bone"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : results.length ? (
        <>
          <div className="mt-8 font-mono text-[11px] uppercase tracking-wider text-ink/60" data-num>
            {t('results', { count: results.length, query: q })}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </>
      ) : (
        <p className="mt-12 max-w-md text-ink/70">{t('noResults', { query: q })}</p>
      )}
    </div>
  );
}
