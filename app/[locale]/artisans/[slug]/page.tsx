import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ProductCard } from '@/components/product/ProductCard';
import { artisans, artisansBySlug } from '@/data/artisans';
import { countriesBySlug } from '@/data/countries';
import { getProductsByArtisan } from '@/data/products';
import { pickLocale } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return artisans.flatMap((a) =>
    ['en', 'fr'].map((locale) => ({ locale, slug: a.slug })),
  );
}

export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const artisan = artisansBySlug[slug];
  if (!artisan) notFound();

  const country = countriesBySlug[artisan.country];
  const products = getProductsByArtisan(artisan.slug);
  const others = artisans.filter((a) => a.slug !== artisan.slug).slice(0, 3);

  return (
    <>
      <section className="relative h-[80vh] min-h-[480px] overflow-hidden bg-ink">
        <Image
          src={artisan.photo}
          alt={artisan.name}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-80 sepia-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 top-1/3 mx-auto max-w-3xl px-6 text-center">
          <p className="mx-auto max-w-2xl font-display text-2xl italic leading-relaxed text-bone md:text-4xl">
            “{pickLocale(artisan.quote, locale as Locale)}”
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-12 mx-auto max-w-[1440px] px-4 text-center text-bone md:px-8">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-ochre">
            {country?.flag} {country ? pickLocale(country.name, locale as Locale) : ''} · {artisan.region}
          </div>
          <h1 className="mt-2 font-display text-6xl md:text-9xl">{artisan.name}</h1>
          <div className="mt-2 font-mono text-xs uppercase tracking-wider text-bone/70" data-num>
            {pickLocale(artisan.signature, locale as Locale)} · {artisan.yearsOfExperience} years
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <h2 className="font-display text-3xl md:text-5xl">{locale === 'fr' ? 'Le portrait' : 'The portrait'}</h2>
          <p className="mt-6 text-ink/80 leading-relaxed md:text-lg">
            {pickLocale(artisan.bio, locale as Locale)}
          </p>
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <dl className="border-t border-ink/15">
            {[
              [locale === 'fr' ? 'Pays' : 'Country', country ? `${country.flag} ${pickLocale(country.name, locale as Locale)}` : ''],
              [locale === 'fr' ? 'Région' : 'Region', artisan.region],
              [locale === 'fr' ? 'Métier' : 'Craft', pickLocale(artisan.craft, locale as Locale)],
              [locale === 'fr' ? "Années d'expérience" : 'Years of mastery', String(artisan.yearsOfExperience)],
              [locale === 'fr' ? 'Pièces' : 'Pieces', String(products.length)],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 gap-4 border-b border-ink/10 py-3 text-sm">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/50">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <h2 className="font-display text-3xl md:text-5xl">{locale === 'fr' ? 'Ses créations' : 'Their creations'}</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale as Locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <h2 className="font-display text-2xl md:text-3xl">{locale === 'fr' ? "D'autres artisans" : 'More artisans'}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {others.map((a) => (
            <Link key={a.slug} href={`/artisans/${a.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
                <Image src={a.photo} alt={a.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-3 font-display text-xl">{a.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink/60">{pickLocale(a.craft, locale as Locale)}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
