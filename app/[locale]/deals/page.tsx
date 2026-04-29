import { setRequestLocale, getTranslations } from 'next-intl/server';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { deals } from '@/data/deals';
import type { Locale } from '@/lib/types';

export default async function DealsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('FlashDeals');

  const dealProducts = products.filter((p) => p.flashDeal || p.originalPrice);

  const earliest = deals.reduce(
    (acc, d) => (new Date(d.endsAt).getTime() < new Date(acc).getTime() ? d.endsAt : acc),
    deals[0]?.endsAt ?? new Date().toISOString(),
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
      <div className="flex flex-col items-start gap-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-clay">
          ⚡ Live
        </div>
        <h1 className="font-display text-6xl leading-[0.95] md:text-9xl">
          {t('title')}
        </h1>
        <p className="max-w-xl text-ink/70 md:text-lg">{t('subtitle')}</p>
        <div className="mt-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">{t('endsIn')}</div>
          <div className="mt-2"><CountdownTimer endsAt={earliest} variant="berry" size="lg" /></div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {dealProducts.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale as Locale} />
        ))}
      </div>
    </div>
  );
}
