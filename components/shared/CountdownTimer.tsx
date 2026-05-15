'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export function CountdownTimer({
  endsAt,
  size = 'md',
  className,
  variant = 'ink',
}: {
  endsAt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'ink' | 'berry' | 'bone';
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only clock start, avoids an SSR hydration mismatch
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const target = new Date(endsAt).getTime();
  const diff = now ? Math.max(0, target - now.getTime()) : 0;

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const sizes = {
    sm: 'text-xs px-1.5 py-1',
    md: 'text-sm px-2 py-1.5',
    lg: 'text-2xl md:text-3xl px-3 py-2',
  }[size];

  const colors = {
    ink: 'bg-ink text-bone',
    berry: 'bg-berry text-bone',
    bone: 'bg-bone-deep text-ink border border-ink/20',
  }[variant];

  // Avoid hydration mismatch — render placeholder until mounted
  if (!now) {
    return (
      <div className={cn('inline-flex items-center gap-1 font-mono tabular-nums', className)} data-num>
        <span className={cn(colors, sizes, 'rounded-sm font-semibold')}>00</span>
        <span className={colors === 'bg-bone-deep text-ink border border-ink/20' ? 'text-ink/50' : 'opacity-60'}>:</span>
        <span className={cn(colors, sizes, 'rounded-sm font-semibold')}>00</span>
        <span className={colors === 'bg-bone-deep text-ink border border-ink/20' ? 'text-ink/50' : 'opacity-60'}>:</span>
        <span className={cn(colors, sizes, 'rounded-sm font-semibold')}>00</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 font-mono tabular-nums',
        className,
      )}
      data-num
      role="timer"
      aria-live="polite"
    >
      <span className={cn(colors, sizes, 'rounded-sm font-semibold')}>{pad(hours)}</span>
      <span className={'opacity-70 ' + (variant === 'bone' ? 'text-ink' : '')}>:</span>
      <span className={cn(colors, sizes, 'rounded-sm font-semibold')}>{pad(minutes)}</span>
      <span className={'opacity-70 ' + (variant === 'bone' ? 'text-ink' : '')}>:</span>
      <span className={cn(colors, sizes, 'rounded-sm font-semibold ticker-tick')}>
        {pad(seconds)}
      </span>
    </div>
  );
}
