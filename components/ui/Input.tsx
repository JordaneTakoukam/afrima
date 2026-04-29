import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'h-11 w-full rounded-none border border-ink/20 bg-bone px-4 text-sm placeholder:text-ink/40 focus:border-ink focus:outline-none',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
