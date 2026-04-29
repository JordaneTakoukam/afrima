'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AdinkraPattern } from '@/components/shared/AdinkraPattern';

export function Newsletter() {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState('');

  return (
    <section className="relative bg-ochre text-ink">
      <AdinkraPattern opacity={0.08} />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink/70">
            {t('kicker')}
          </div>
          <h2 className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">
            {t('title')}
          </h2>
        </div>
        <div className="md:col-span-6 flex flex-col justify-center">
          <p className="text-base text-ink/80 md:text-lg">{t('subtitle')}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) {
                toast.success(t('success'));
                setEmail('');
              }
            }}
            className="mt-6 flex flex-col gap-2 sm:flex-row"
          >
            <Input
              type="email"
              placeholder={t('placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-ink/30 bg-bone/95"
              required
            />
            <Button variant="ink" size="md" type="submit">
              {t('subscribe')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
