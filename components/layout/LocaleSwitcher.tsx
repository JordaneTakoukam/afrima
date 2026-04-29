'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOCALES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
] as const;

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const handleSelect = (code: 'en' | 'fr') => {
    setOpen(false);
    if (code === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink hover:border-ink hover:bg-ink hover:text-bone transition-colors"
      >
        <Globe className="h-3.5 w-3.5" />
        <span aria-hidden>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-sm border border-ink/15 bg-bone shadow-xl"
        >
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(l.code)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 px-3 py-2.5 text-sm transition-colors',
                    active ? 'bg-ink/5 text-ink' : 'text-ink/80 hover:bg-ink/5',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
                      {l.code}
                    </span>
                  </span>
                  {active ? <Check className="h-3.5 w-3.5 text-clay" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
