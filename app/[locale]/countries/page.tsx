import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { countries } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('CountryGrid');

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-clay">22 / 54</div>
      <h1 className="mt-3 font-display text-5xl leading-tight md:text-7xl">{t('title')}</h1>
      <p className="mt-3 max-w-2xl text-ink/70">{t('subtitle')}</p>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {countries.map((c, i) => (
          <Link
            key={c.slug}
            href={`/countries/${c.slug}`}
            className={`group flex flex-col gap-2 border-2 border-ink bg-bone p-5 transition-all duration-300 hover:-translate-y-1 ${
              i % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'
            }`}
          >
            <div className="text-4xl" aria-hidden>{c.flag}</div>
            <div className="font-display text-xl">{pickLocale(c.name, locale as Locale)}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/50" data-num>
              {t('products', { count: c.productCount })}
            </div>
            <div className="mt-1 text-xs text-ink/60 line-clamp-2">{pickLocale(c.description, locale as Locale)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
