import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Zap } from 'lucide-react';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { deals } from '@/data/deals';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Deals' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function DealsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Deals');
  const loc = locale as Locale;

  const dealProducts = products.filter((p) => p.flashDeal || p.originalPrice);
  const earliest = deals.reduce(
    (acc, d) => (new Date(d.endsAt).getTime() < new Date(acc).getTime() ? d.endsAt : acc),
    deals[0]?.endsAt ?? new Date().toISOString(),
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-clay">
            <Zap className="h-3.5 w-3.5" /> {t('live')}
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-2 max-w-xl text-ink/70 md:text-lg">{t('subtitle')}</p>
        </div>
        <div className="flex flex-col gap-1.5 md:items-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {t('endsIn')}
          </span>
          <CountdownTimer endsAt={earliest} variant="berry" size="lg" />
        </div>
      </div>

      {dealProducts.length === 0 ? (
        <p className="mt-12 text-ink/60">{t('empty')}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {dealProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={loc} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
