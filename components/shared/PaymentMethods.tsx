import { PAYMENT_METHODS } from '@/data/payment';
import { pickLocale, cn } from '@/lib/utils';
import type { Locale } from '@/lib/types';

/** Row of accepted-payment chips (MTN MoMo, Orange Money, card, PayPal, bank). */
export function PaymentMethods({
  locale,
  className,
  tone = 'light',
}: {
  locale: Locale;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {PAYMENT_METHODS.map((m) => (
        <span
          key={m.id}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5',
            tone === 'dark'
              ? 'border-bone/20 bg-bone/5'
              : 'border-border bg-surface',
          )}
        >
          <span
            className="h-2.5 w-2.5 rounded-[3px]"
            style={{ background: m.color }}
            aria-hidden
          />
          <span
            className={cn(
              'font-mono text-[11px] font-semibold uppercase tracking-wide',
              tone === 'dark' ? 'text-bone' : 'text-ink',
            )}
          >
            {pickLocale(m.name, locale)}
          </span>
        </span>
      ))}
    </div>
  );
}
