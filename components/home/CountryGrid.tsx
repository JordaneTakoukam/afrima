import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { countries } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function CountryGrid() {
  const t = useTranslations('CountryGrid');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8">
      <SectionHeading
        kicker="22 / 54"
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {countries.map((c, i) => {
          const rotate = i % 2 ? 'hover:rotate-1' : 'hover:-rotate-1';
          return (
            <Link
              key={c.slug}
              href={`/countries/${c.slug}`}
              className={`group relative flex flex-col gap-2 border-2 border-ink bg-bone p-4 transition-all duration-300 hover:-translate-y-1 ${rotate}`}
            >
              <div className="text-3xl" aria-hidden>{c.flag}</div>
              <div className="font-display text-lg leading-tight">
                {pickLocale(c.name, locale)}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink/50" data-num>
                {t('products', { count: c.productCount })}
              </div>
              <div className="text-[11px] text-ink/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {pickLocale(c.signatureProduct, locale)}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
