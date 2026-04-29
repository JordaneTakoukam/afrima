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
      className="group flex items-center gap-2 border border-ink/15 bg-bone-deep/40 px-3 transition-colors focus-within:border-ink"
    >
      <Search className="h-4 w-4 text-ink/50" aria-hidden />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('search')}
        className="h-10 w-full bg-transparent text-sm placeholder:text-ink/40 focus:outline-none"
        aria-label={t('search')}
      />
      <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-ink/15 bg-bone px-1.5 py-0.5 font-mono text-[10px] uppercase text-ink/50">
        ⌘K
      </kbd>
    </form>
  );
}
