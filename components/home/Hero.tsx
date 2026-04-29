'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { AdinkraPattern, NoiseOverlay } from '@/components/shared/AdinkraPattern';
import { Button } from '@/components/ui/Button';

const stagger = { initial: {}, animate: { transition: { staggerChildren: 0.08 } } };
const word = {
  initial: { y: '110%', opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=900&q=80&auto=format&fit=crop',
    label: { en: 'Toghu', fr: 'Toghu' },
    rotate: '-3deg',
    offset: 'translate-y-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop',
    label: { en: 'Shea', fr: 'Karité' },
    rotate: '2deg',
    offset: '-translate-y-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&q=80&auto=format&fit=crop',
    label: { en: 'Atlas', fr: 'Atlas' },
    rotate: '-1deg',
    offset: 'translate-y-4',
  },
];

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <AdinkraPattern opacity={0.06} />
      <NoiseOverlay />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 py-12 md:grid-cols-12 md:gap-6 md:px-8 md:py-20 lg:py-28">
        {/* Left text */}
        <motion.div
          className="md:col-span-7 lg:col-span-7 flex flex-col justify-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={word} className="font-mono text-xs uppercase tracking-[0.3em] text-clay">
            {t('kicker')}
          </motion.div>
          <h1 className="mt-4 font-display text-[15vw] leading-[0.85] tracking-tight text-ink md:text-[8vw] lg:text-[7.5rem]">
            <span className="overflow-hidden block">
              <motion.span variants={word} className="block">{t('line1')}</motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span variants={word} className="block italic text-ochre">{t('line2')}</motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span variants={word} className="block">{t('line3')}</motion.span>
            </span>
          </h1>

          <motion.p variants={word} className="mt-6 max-w-md text-base text-ink/70 md:text-lg">
            {t('subtitle')}
          </motion.p>

          <motion.div variants={word} className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="ink">
              <Link href="/categories/fashion-textiles">
                {t('ctaShop')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/artisans">{t('ctaArtisans')}</Link>
            </Button>
          </motion.div>

          <motion.div variants={word} className="mt-10 flex flex-wrap items-end gap-8">
            <Stat n="22" label={t('stat1')} />
            <Stat n="250+" label={t('stat2')} />
            <Stat n="800+" label={t('stat3')} />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60" data-num>
                4.8 / 5 · 12,000+ buyers
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right images collage */}
        <motion.div
          className="md:col-span-5 lg:col-span-5 relative h-[420px] md:h-[600px]"
          initial="initial"
          animate="animate"
          variants={{ initial: {}, animate: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
        >
          {heroImages.map((img, i) => {
            const positions = [
              'top-0 left-0 md:left-2 w-[55%] md:w-[60%]',
              'top-12 right-0 w-[60%] md:w-[55%]',
              'bottom-0 left-12 md:left-20 w-[55%] md:w-[55%]',
            ];
            return (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, scale: 0.9, y: 20 },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
                  },
                }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                style={{ transform: `rotate(${img.rotate})` }}
                className={`absolute aspect-[3/4] ${positions[i]} ${img.offset} editorial-shadow`}
              >
                <Image
                  src={img.src}
                  alt={locale === 'fr' ? img.label.fr : img.label.en}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  priority={i === 0}
                  className="object-cover ink-border"
                />
                <div className="absolute -top-3 left-3 inline-flex items-center bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">
                  0{i + 1} / {locale === 'fr' ? img.label.fr : img.label.en}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-ink md:text-4xl" data-num>{n}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">{label}</div>
    </div>
  );
}
