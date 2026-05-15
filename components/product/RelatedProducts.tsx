import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import type { Locale, Product } from '@/lib/types';

export function RelatedProducts({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useTranslations('Product');
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8">
      <h2 className="font-display text-2xl leading-tight md:text-4xl">
        {t('relatedTitle')}
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {related.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
