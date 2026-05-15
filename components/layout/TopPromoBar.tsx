import { useTranslations } from 'next-intl';
import { Truck, CreditCard, ShieldCheck, Tag, Headphones, RotateCcw } from 'lucide-react';

export function TopPromoBar() {
  const t = useTranslations('PromoBar');
  const items = [
    { Icon: Truck, label: t('delivery') },
    { Icon: CreditCard, label: t('payment') },
    { Icon: ShieldCheck, label: t('warranty') },
    { Icon: Tag, label: t('wholesale') },
    { Icon: Headphones, label: t('support') },
    { Icon: RotateCcw, label: t('returns') },
  ];

  return (
    <div className="bg-ink text-bone">
      <div className="overflow-hidden">
        <div className="flex w-max marquee gap-10 py-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          {[...items, ...items, ...items].map((it, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2">
              <it.Icon className="h-3.5 w-3.5 text-ochre" aria-hidden />
              <span>{it.label}</span>
              <span aria-hidden className="text-ochre/50">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
