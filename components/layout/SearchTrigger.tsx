'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useState } from 'react';

export function SearchTrigger() {
  const t = useTranslations('Nav');
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
      className="group flex items-center gap-2 rounded-lg border border-border bg-surface px-3 transition-colors focus-within:border-clay"
    >
      <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="h-10 w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        aria-label={t('search')}
      />
    </form>
  );
}
