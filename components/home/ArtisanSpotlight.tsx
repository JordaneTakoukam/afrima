import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Quote } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { AdinkraPattern } from '@/components/shared/AdinkraPattern';
import { artisans } from '@/data/artisans';
import { countriesBySlug } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function ArtisanSpotlight() {
  const t = useTranslations('Artisan');
  const locale = useLocale() as Locale;

  const artisan = artisans[0]; // Adèle Mboué — Toghu master
  const country = countriesBySlug[artisan.country];

  return (
    <section className="relative bg-ink text-bone">
      <AdinkraPattern opacity={0.08} light />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-6 lg:col-span-7 relative aspect-[4/5] md:aspect-auto md:min-h-[600px]">
          <Image
            src={artisan.photo}
            alt={artisan.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover sepia-[0.15] saturate-[1.1] [filter:contrast(1.05)_sepia(0.1)]"
          />
          <div className="absolute -left-3 top-6 inline-flex items-center bg-clay px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-bone md:-left-6">
            Artisan / 01
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-ochre">
            {t('kicker')}
          </div>
          <h2 className="mt-2 font-display text-5xl leading-[0.95] md:text-7xl">
            <span>{artisan.name.split(' ')[0]} </span>
            <span className="italic text-ochre">
              {artisan.name.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-bone/60">
            {country?.flag} {pickLocale(country!.name, locale)} · {pickLocale(artisan.craft, locale)}
          </div>

          <div className="mt-8 flex gap-3">
            <Quote className="h-6 w-6 shrink-0 text-ochre" />
            <p className="font-display text-xl italic leading-relaxed text-bone/95 md:text-2xl">
              {pickLocale(artisan.quote, locale)}
            </p>
          </div>

          <p className="mt-6 max-w-md text-sm text-bone/75 md:text-base">
            {pickLocale(artisan.bio, locale)}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link
              href={`/artisans/${artisan.slug}`}
              className="inline-flex items-center gap-2 border-b-2 border-ochre pb-1 font-mono text-sm uppercase tracking-wider text-bone hover:text-ochre"
            >
              {pickLocale({ en: 'Discover her creations', fr: 'Découvrir ses créations' }, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="font-mono text-[11px] uppercase tracking-wider text-bone/60" data-num>
              {t('yearsExp', { count: artisan.yearsOfExperience })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
