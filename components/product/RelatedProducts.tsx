import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import type { Locale, Product } from '@/lib/types';

export function RelatedProducts({ product, locale }: { product: Product; locale: Locale }) {
  const t = useTranslations('Product');
  const related = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.country === product.country))
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
      <h2 className="font-display text-3xl leading-tight md:text-5xl">{t('relatedTitle')}</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
