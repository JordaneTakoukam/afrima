'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <Logo size={52} />
      <div className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-clay" data-num>
        {t('code')}
      </div>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-md text-ink/70">{t('body')}</p>
      <Button asChild variant="primary" size="md" className="mt-8">
        <Link href="/">{t('cta')}</Link>
      </Button>
    </div>
  );
}
