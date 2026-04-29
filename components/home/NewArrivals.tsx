import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import type { Locale } from '@/lib/types';

export function NewArrivals() {
  const t = useTranslations('NewArrivals');
  const locale = useLocale() as Locale;

  const newOnes = products.filter((p) => p.newArrival).slice(0, 6);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8">
      <SectionHeading kicker="Just landed" title={t('title')} subtitle={t('subtitle')} />
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
        {newOnes.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
