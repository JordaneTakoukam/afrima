import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { categories } from '@/data/categories';
import { pickLocale } from '@/lib/utils';
import type { Category, Locale } from '@/lib/types';

export function CategoriesShowcase() {
  const t = useTranslations('CategoriesShowcase');
  const locale = useLocale() as Locale;

  // 1 feature card + 4 small cards (mosaic) + remaining cards as a row
  const [feature, ...rest] = categories;
  const small = rest.slice(0, 4);
  const trailing = rest.slice(4); // 2 extra → row below

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8">
      <SectionHeading kicker="Categories" title={t('title')} subtitle={t('subtitle')} />

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[260px]">
        {/* Feature card — spans 7 cols, 2 rows */}
        <CategoryCard
          category={feature}
          locale={locale}
          className="lg:col-span-7 lg:row-span-2 aspect-[4/5] md:aspect-[16/10] lg:aspect-auto"
          big
        />
        {/* 4 small cards in 2×2 grid on the right */}
        {small.map((c) => (
          <CategoryCard
            key={c.slug}
            category={c}
            locale={locale}
            className="lg:col-span-3 aspect-[4/3] lg:aspect-auto"
          />
        ))}
      </div>

      {trailing.length ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {trailing.map((c) => (
            <CategoryCard
              key={c.slug}
              category={c}
              locale={locale}
              className="aspect-[16/9] md:aspect-[21/9]"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function CategoryCard({
  category,
  locale,
  className,
  big,
}: {
  category: Category;
  locale: Locale;
  className?: string;
  big?: boolean;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group relative block overflow-hidden bg-ink ${className ?? ''}`}
    >
      <Image
        src={category.cover}
        alt={pickLocale(category.name, locale)}
        fill
        sizes={big ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 1024px) 50vw, 30vw'}
        className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-bone md:inset-x-7 md:bottom-7">
        <div className="min-w-0">
          <div
            className={`font-mono leading-none text-ochre ${
              big ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'
            }`}
            data-num
          >
            {category.numberLabel}
          </div>
          <div
            className={`mt-2 font-display leading-tight ${
              big ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'
            }`}
          >
            {pickLocale(category.name, locale)}
          </div>
          <div
            className={`mt-1 line-clamp-2 max-w-md text-bone/80 ${
              big ? 'text-sm md:text-base' : 'text-xs md:text-sm'
            }`}
          >
            {pickLocale(category.description, locale)}
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-bone/15 p-2 backdrop-blur transition-transform duration-300 group-hover:rotate-45 group-hover:bg-bone group-hover:text-ink">
          <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
        </div>
      </div>
    </Link>
  );
}
