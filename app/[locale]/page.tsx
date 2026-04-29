import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { FlashDeals } from '@/components/home/FlashDeals';
import { BestsellersGrid } from '@/components/home/BestsellersGrid';
import { CategoriesShowcase } from '@/components/home/CategoriesShowcase';
import { TrendingByCountry } from '@/components/home/TrendingByCountry';
import { ArtisanSpotlight } from '@/components/home/ArtisanSpotlight';
import { CulturalStories } from '@/components/home/CulturalStories';
import { NewArrivals } from '@/components/home/NewArrivals';
import { ValueProps } from '@/components/home/ValueProps';
import { Newsletter } from '@/components/home/Newsletter';
import { Reveal } from '@/components/shared/Reveal';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustStrip />
      <Reveal>
        <FlashDeals />
      </Reveal>
      <Reveal>
        <BestsellersGrid />
      </Reveal>
      <Reveal>
        <CategoriesShowcase />
      </Reveal>
      <Reveal>
        <TrendingByCountry />
      </Reveal>
      <Reveal>
        <ArtisanSpotlight />
      </Reveal>
      <Reveal>
        <CulturalStories />
      </Reveal>
      <Reveal>
        <NewArrivals />
      </Reveal>
      <Reveal>
        <ValueProps />
      </Reveal>
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}
