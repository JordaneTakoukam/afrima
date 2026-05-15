'use client';

import { motion } from 'framer-motion';
import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useTranslations } from 'next-intl';
import { ArrowRight, Truck, CreditCard, ShieldCheck, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

const IMG = (id: string) => `/products/${id}.jpg`;

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const rise = {
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
};

export function Hero() {
  const t = useTranslations('Hero');

  const features = [
    { Icon: Truck, label: t('feature1') },
    { Icon: CreditCard, label: t('feature2') },
    { Icon: ShieldCheck, label: t('feature3') },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-bone">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-clay/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-ochre/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-12 md:gap-8 md:px-8 md:py-28">
        {/* Text */}
        <motion.div
          className="md:col-span-6"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-clay"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            {t('kicker')}
          </motion.span>

          <motion.h1
            variants={rise}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {t('titleA')} <span className="text-clay">{t('titleB')}</span>.
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-md text-base text-ink/70 md:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={rise} className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="primary">
              <Link href="/categories">
                {t('ctaShop')}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/deals">{t('ctaDeals')}</Link>
            </Button>
          </motion.div>

          <motion.ul
            variants={rise}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5"
          >
            {features.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-ink/75">
                <Icon className="h-4 w-4 text-clay" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Image collage */}
        <motion.div
          className="relative md:col-span-6"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-3 md:space-y-4">
              <Tile src={IMG('photo-1555041469-a586c61ea9bc')} alt="Canapé & mobilier" tall priority />
              <Tile src={IMG('queen-rishma-creme-1')} alt="Soins & beauté" />
            </div>
            <div className="space-y-3 pt-8 md:space-y-4">
              <Tile src={IMG('photo-1511707171634-5f897ff02aa9')} alt="Smartphone" priority />
              <Tile src={IMG('photo-1556911220-bff31c812dba')} alt="Cuisine & ustensiles" tall />
            </div>
          </div>

          <motion.div
            variants={rise}
            className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-2.5 card-shadow"
          >
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink/70" data-num>
              4.7 / 5 · 12 000+
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Tile({
  src,
  alt,
  tall,
  priority,
}: {
  src: string;
  alt: string;
  tall?: boolean;
  priority?: boolean;
}) {
  return (
    <motion.div
      variants={rise}
      className={`relative overflow-hidden rounded-xl border border-border bg-bone-deep card-shadow ${
        tall ? 'aspect-[4/5]' : 'aspect-square'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 45vw, 25vw"
        priority={priority}
        className="object-cover"
        fallbackText={alt}
        fallbackSeed={src}
      />
    </motion.div>
  );
}
