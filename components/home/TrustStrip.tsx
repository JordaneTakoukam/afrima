import { useTranslations } from 'next-intl';

export function TrustStrip() {
  const t = useTranslations('Trust');
  return (
    <div className="border-y border-ink/15 bg-bone-deep">
      <div className="overflow-hidden">
        <div className="flex w-max marquee gap-8 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="shrink-0">{t('items')}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
