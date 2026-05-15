import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-muted-foreground focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
