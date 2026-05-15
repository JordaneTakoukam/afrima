'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

type Sort = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export function CategoryProducts({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  const t = useTranslations('Category');
  const [sort, setSort] = useState<Sort>('featured');
  const [brand, setBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const list = useMemo(() => {
    let l = products.slice();
    if (brand !== 'all') l = l.filter((p) => p.brand === brand);
    if (inStockOnly) l = l.filter((p) => p.inStock);
    switch (sort) {
      case 'newest':
        l.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
        break;
      case 'price-asc':
        l.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        l.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        l.sort((a, b) => b.rating - a.rating);
        break;
      default:
        l.sort(
          (a, b) =>
            Number(!!b.featured) - Number(!!a.featured) || b.soldCount - a.soldCount,
        );
    }
    return l;
  }, [products, sort, brand, inStockOnly]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip active={brand === 'all'} onClick={() => setBrand('all')}>
            {t('allBrands')}
          </Chip>
          {brands.map((b) => (
            <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>
              {b}
            </Chip>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/75">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 accent-clay"
            />
            {t('inStockOnly')}
          </label>
          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label={t('sortBy')}
              className="h-10 rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-ink focus:border-clay focus:outline-none"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="newest">{t('sortNewest')}</option>
              <option value="price-asc">{t('sortPriceAsc')}</option>
              <option value="price-desc">{t('sortPriceDesc')}</option>
              <option value="rating">{t('sortRating')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 font-mono text-[11px] uppercase tracking-wide text-muted-foreground" data-num>
        {t('results', { count: list.length })}
      </div>

      {list.length === 0 ? (
        <p className="mt-12 text-ink/60">{t('noResults')}</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={locale} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-ink bg-ink text-bone'
          : 'border-border bg-surface text-ink/75 hover:border-ink/40',
      )}
    >
      {children}
    </button>
  );
}
