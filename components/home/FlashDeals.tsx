import { useLocale, useTranslations } from 'next-intl';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { deals } from '@/data/deals';
import type { Locale } from '@/lib/types';

export function FlashDeals() {
  const t = useTranslations('FlashDeals');
  const locale = useLocale() as Locale;

  const dealProducts = deals
    .map((d) => products.find((p) => p.slug === d.productSlug)!)
    .filter(Boolean);

  const earliestEnd = deals.reduce(
    (acc, d) => (new Date(d.endsAt).getTime() < new Date(acc).getTime() ? d.endsAt : acc),
    deals[0]?.endsAt ?? new Date().toISOString(),
  );

  return (
    <section className="relative bg-gradient-to-br from-bone via-bone-deep to-bone py-16 md:py-20">
      <div className="absolute inset-0 bg-clay/5" />
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-clay">
              <Zap className="h-3.5 w-3.5" /> Live now
            </div>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink md:text-6xl">
              <span>⚡ </span>{t('title')}
            </h2>
            <p className="mt-2 max-w-xl text-ink/70">{t('subtitle')}</p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
              {t('endsIn')}
            </div>
            <CountdownTimer endsAt={earliestEnd} variant="berry" size="lg" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {dealProducts.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-mono text-sm uppercase tracking-wider text-ink hover:text-clay hover:border-clay"
          >
            {t('viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
