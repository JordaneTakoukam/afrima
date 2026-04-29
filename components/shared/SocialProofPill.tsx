import { cn } from '@/lib/utils';

export function SocialProofPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink/15 bg-bone px-3 py-1 text-xs text-ink/80',
        className,
      )}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
      </span>
      <span className="font-mono uppercase tracking-wider text-[10px]">{children}</span>
    </span>
  );
}
