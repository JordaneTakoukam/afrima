import { SafeImage as Image } from '@/components/shared/SafeImage';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { artisans } from '@/data/artisans';
import { countriesBySlug } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export default async function ArtisansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Artisan');

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-clay">{t('kicker')}</div>
      <h1 className="mt-3 font-display text-5xl leading-tight md:text-7xl">{t('title')}</h1>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {artisans.map((a) => {
          const country = countriesBySlug[a.country];
          return (
            <Link key={a.slug} href={`/artisans/${a.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
                <Image
                  src={a.photo}
                  alt={a.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 font-display text-2xl group-hover:text-clay">{a.name}</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-ink/60">
                {country?.flag} {country ? pickLocale(country.name, locale as Locale) : ''} · {pickLocale(a.craft, locale as Locale)}
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-ink/70">{pickLocale(a.bio, locale as Locale)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
