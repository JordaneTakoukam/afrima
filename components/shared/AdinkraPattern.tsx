import { cn } from '@/lib/utils';

const lightSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g fill='none' stroke='%23faf7f2' stroke-width='1.2' opacity='0.6'><circle cx='80' cy='80' r='30'/><circle cx='80' cy='80' r='50'/><path d='M80 30 v100 M30 80 h100 M44 44 l72 72 M44 116 l72 -72'/><circle cx='80' cy='80' r='6' fill='%23faf7f2'/></g></svg>`;

export function AdinkraPattern({
  className,
  opacity = 0.05,
  light = false,
}: {
  className?: string;
  opacity?: number;
  light?: boolean;
}) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0', !light && 'bg-adinkra', className)}
      style={{
        opacity,
        ...(light ? { backgroundImage: `url("${lightSvg}")`, backgroundSize: '160px 160px' } : {}),
      }}
      aria-hidden
    />
  );
}

export function NoiseOverlay({
  className,
  opacity = 0.04,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 bg-grain', className)}
      style={{ opacity }}
      aria-hidden
    />
  );
}
