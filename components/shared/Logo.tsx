import { cn } from '@/lib/utils';

export function Logo({
  className,
  size = 32,
  showText = false,
  textClassName,
}: {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-label="AFRIMA"
        className="shrink-0"
      >
        {/* Outer ring */}
        <circle cx="20" cy="20" r="19" fill="#1C1917" />
        {/* Sun disc */}
        <circle cx="20" cy="20" r="13" fill="#C2410C" />
        {/* Adinkra-inspired Gye Nyame mark */}
        <g stroke="#FAF7F2" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M20 8 v24 M8 20 h24" />
          <path d="M11 11 l18 18 M11 29 l18 -18" />
        </g>
        {/* Inner gold dot */}
        <circle cx="20" cy="20" r="3.2" fill="#EAB308" />
        <circle cx="20" cy="20" r="1.4" fill="#1C1917" />
      </svg>
      {showText ? (
        <span className={cn('font-display text-2xl italic tracking-tight md:text-3xl', textClassName)}>
          AFRIMA
        </span>
      ) : null}
    </span>
  );
}
