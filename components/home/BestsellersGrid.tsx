import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import type { Locale } from '@/lib/types';

export function BestsellersGrid() {
  const t = useTranslations('Bestsellers');
  const tNav = useTranslations('Nav');
  const locale = useLocale() as Locale;

  const bestsellers = products
    .filter((p) => p.bestseller || p.featured)
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 8);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
        cta={
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink/70 hover:text-clay"
          >
            {tNav('viewAll')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {bestsellers.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
