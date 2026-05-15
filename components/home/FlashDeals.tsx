import { useLocale, useTranslations } from 'next-intl';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { ProductCard } from '@/components/product/ProductCard';
import { productsBySlug } from '@/data/products';
import { deals } from '@/data/deals';
import type { Locale } from '@/lib/types';

export function FlashDeals() {
  const t = useTranslations('Deals');
  const locale = useLocale() as Locale;

  const dealProducts = deals
    .map((d) => productsBySlug[d.productSlug])
    .filter(Boolean)
    .slice(0, 8);

  const earliestEnd = deals.reduce(
    (acc, d) => (new Date(d.endsAt).getTime() < new Date(acc).getTime() ? d.endsAt : acc),
    deals[0]?.endsAt ?? new Date().toISOString(),
  );

  if (!dealProducts.length) return null;

  return (
    <section className="border-y border-border bg-clay/[0.04]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-clay">
              <Zap className="h-3.5 w-3.5" /> {t('live')}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-2 max-w-xl text-ink/70">{t('subtitle')}</p>
          </div>
          <div className="flex flex-col gap-1.5 md:items-end">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {t('endsIn')}
            </span>
            <CountdownTimer endsAt={earliestEnd} variant="berry" size="lg" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {dealProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={locale} priority={i < 4} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 rounded-lg border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
