import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CategoryIcon } from '@/components/shared/CategoryIcon';
import { categories } from '@/data/categories';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function CategoriesShowcase() {
  const t = useTranslations('Categories');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-28">
      <SectionHeading kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-border bg-ink card-lift md:aspect-[5/4]"
          >
            <Image
              src={c.cover}
              alt={pickLocale(c.name, locale)}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
              fallbackText={pickLocale(c.name, locale)}
              fallbackSeed={c.slug}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/35 to-ink/5" />
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-bone md:p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-bone/15 backdrop-blur">
                  <CategoryIcon name={c.icon} size={20} />
                </span>
                <span className="rounded-full bg-bone/15 p-2 backdrop-blur transition-all duration-300 group-hover:bg-clay">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold leading-tight md:text-2xl">
                  {pickLocale(c.name, locale)}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-bone/75 md:text-sm">
                  {pickLocale(c.tagline, locale)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
