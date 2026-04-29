import { cn } from '@/lib/utils';

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  cta,
  className,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  cta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 md:flex-row md:items-end md:justify-between',
        align === 'center' ? 'text-center md:flex-col md:items-center' : '',
        className,
      )}
    >
      <div className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {kicker ? (
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-clay">{kicker}</div>
        ) : null}
        <h2 className="mt-2 font-display text-4xl leading-[1.05] text-ink md:text-6xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 max-w-xl text-base text-ink/70 md:text-lg">{subtitle}</p>
        ) : null}
      </div>
      {cta ? <div className="md:pb-2">{cta}</div> : null}
    </div>
  );
}
