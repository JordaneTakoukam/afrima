import { cn } from '@/lib/utils';

/** AFRIMA brand mark — a shopping bag with a warm gold handle. */
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
        role="img"
        aria-label="AFRIMA"
        className="shrink-0"
      >
        <rect width="40" height="40" rx="11" fill="#E2510E" />
        <path
          d="M10.5 16 H29.5 L28 30.2 A2.7 2.7 0 0 1 25.3 32.6 H14.7 A2.7 2.7 0 0 1 12 30.2 Z"
          fill="#FBFAF8"
        />
        <path
          d="M15.2 16.4 V13.7 A4.8 4.8 0 0 1 24.8 13.7 V16.4"
          stroke="#FBBF24"
          strokeWidth="2.7"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="20" cy="23.3" r="3" fill="#E2510E" />
      </svg>
      {showText ? (
        <span
          className={cn(
            'font-display text-2xl font-semibold tracking-tight md:text-3xl',
            textClassName,
          )}
        >
          AFRIMA
        </span>
      ) : null}
    </span>
  );
}
