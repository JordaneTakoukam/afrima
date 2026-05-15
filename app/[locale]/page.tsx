import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { CategoriesShowcase } from '@/components/home/CategoriesShowcase';
import { FlashDeals } from '@/components/home/FlashDeals';
import { BestsellersGrid } from '@/components/home/BestsellersGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PaymentsBand } from '@/components/home/PaymentsBand';
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
      <Reveal>
        <CategoriesShowcase />
      </Reveal>
      <Reveal>
        <FlashDeals />
      </Reveal>
      <Reveal>
        <BestsellersGrid />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <PaymentsBand />
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}
