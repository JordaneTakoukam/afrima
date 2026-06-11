'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { categoriesBySlug } from '@/data/categories';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

const TRENDING = ['Pagne', 'Boubou', 'NDOP', 'Karité', 'Savon noir', 'Raphia', 'Café', 'Toghu'];

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
    if (!term) return [];
    return products.filter((p) => {
      const name = `${pickLocale(p.name, 'en')} ${pickLocale(p.name, 'fr')}`.toLowerCase();
      const desc = `${pickLocale(p.description, 'en')} ${pickLocale(p.description, 'fr')}`.toLowerCase();
      const cat = categoriesBySlug[p.category];
      const catName = cat
        ? `${pickLocale(cat.name, 'en')} ${pickLocale(cat.name, 'fr')}`.toLowerCase()
        : '';
      return (
        name.includes(term) ||
        desc.includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        catName.includes(term)
      );
    });
  }, [q]);

  const featured = useMemo(
    () => products.filter((p) => p.featured || p.bestseller).slice(0, 8),
    [],
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-semibold md:text-6xl">{t('title')}</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 focus-within:border-clay"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('placeholder')}
          className="h-12 w-full bg-transparent text-base placeholder:text-muted-foreground focus:outline-none"
        />
        {q ? (
          <button
            type="button"
            onClick={() => setQ('')}
            aria-label={t('clear')}
            className="rounded-md p-1 text-muted-foreground hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </form>

      {!q ? (
        <>
          <div className="mt-8">
            <div className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {t('trending')}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {TRENDING.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQ(s)}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </>
      ) : results.length ? (
        <>
          <div
            className="mt-8 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
            data-num
          >
            {t('results', { count: results.length, query: q })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
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
