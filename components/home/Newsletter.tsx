'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Newsletter() {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState('');

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-28">
      <div className="overflow-hidden rounded-2xl bg-clay px-6 py-12 md:px-12 md:py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-bone/70">
              {t('kicker')}
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-bone md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-2 text-bone/85">{t('subtitle')}</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) {
                toast.success(t('success'));
                setEmail('');
              }
            }}
            className="flex flex-col gap-2.5 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                aria-label={t('placeholder')}
                className="h-12 w-full rounded-lg border border-transparent bg-bone pl-10 pr-3.5 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ink/20"
              />
            </div>
            <Button type="submit" variant="ink" size="lg">
              {t('subscribe')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
