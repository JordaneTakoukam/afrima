import { useTranslations } from 'next-intl';
import { Truck, Star, Hand, Globe2, Award, Tag } from 'lucide-react';

export function TopPromoBar() {
  const t = useTranslations('PromoBar');
  const items = [
    { Icon: Truck, label: t('shipping') },
    { Icon: Star, label: t('trust') },
    { Icon: Hand, label: t('direct') },
    { Icon: Globe2, label: t('countries') },
    { Icon: Award, label: t('auth') },
    { Icon: Tag, label: t('from') },
  ];

  return (
    <div className="bg-ink text-bone">
      <div className="overflow-hidden">
        <div className="flex w-max marquee gap-8 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em]">
          {[...items, ...items, ...items].map((it, i) => (
            <span key={i} className="flex items-center gap-2 shrink-0">
              <it.Icon className="h-3.5 w-3.5 text-ochre" aria-hidden />
              <span>{it.label}</span>
              <span aria-hidden className="text-ochre/60">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
