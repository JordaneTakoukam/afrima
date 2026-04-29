import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RatingStars({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(value);
        return (
          <Star
            key={i}
            size={size}
            className={filled ? 'fill-gold text-gold' : 'fill-transparent text-ink/25'}
          />
        );
      })}
    </div>
  );
}
