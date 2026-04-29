import { Camera, AtSign, PlayCircle, Globe, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-bone">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 pb-32 md:pb-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-display text-3xl italic">
              AFRIMA<span className="text-clay">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-bone/70">{t('tagline')}</p>
            <div className="mt-6 flex items-center gap-3">
              <a className="text-bone/70 hover:text-bone" href="#" aria-label="Instagram"><Camera className="h-5 w-5" /></a>
              <a className="text-bone/70 hover:text-bone" href="#" aria-label="Twitter"><AtSign className="h-5 w-5" /></a>
              <a className="text-bone/70 hover:text-bone" href="#" aria-label="YouTube"><PlayCircle className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('shop')}</FooterTitle>
            <FooterList>
              <Link href="/categories/fashion-textiles">{t('categories')}</Link>
              <Link href="/countries">{t('countries')}</Link>
              <Link href="/deals">{t('deals')}</Link>
              <Link href="/categories/fashion-textiles">{t('newArrivals')}</Link>
            </FooterList>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('discover')}</FooterTitle>
            <FooterList>
              <Link href="/artisans">{t('artisans')}</Link>
              <Link href="/culture">{t('stories')}</Link>
              <Link href="/about">{t('about')}</Link>
              <Link href="/about">{t('sustainability')}</Link>
            </FooterList>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('help')}</FooterTitle>
            <FooterList>
              <span>{t('faq')}</span>
              <span>{t('shipping')}</span>
              <span>{t('returns')}</span>
              <span>{t('contact')}</span>
            </FooterList>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('legal')}</FooterTitle>
            <FooterList>
              <span>{t('terms')}</span>
              <span>{t('privacy')}</span>
              <span>{t('cookies')}</span>
            </FooterList>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-6 text-xs text-bone/60 md:flex-row md:items-center">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span>{t('rights')}</span>
            <span aria-hidden className="hidden sm:inline text-bone/30">·</span>
            <span>{t('demo')}</span>
          </div>
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider">
            <Globe className="h-3.5 w-3.5" /> FCFA · WORLDWIDE
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-bone/10 pt-6 text-xs text-bone/55 md:flex-row md:items-center md:justify-between">
          <div className="font-mono uppercase tracking-[0.2em]">
            Co-creator: <span className="text-bone/85">Magne Takoukam Chloé Martine</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Heart className="h-3 w-3 text-clay" />
            <span className="font-mono uppercase tracking-[0.2em]">
              Built by{' '}
              <a
                href="https://idrissjordane.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone underline-offset-4 hover:underline"
              >
                Idriss Jordane
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
      {children}
    </div>
  );
}

function FooterList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-bone/85 [&>li]:cursor-pointer [&>*:hover]:text-bone">
      {Array.isArray(children) ? children.map((c, i) => <li key={i}>{c}</li>) : <li>{children}</li>}
    </ul>
  );
}
