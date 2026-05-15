import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-bone disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-clay text-bone hover:bg-clay-deep active:scale-[0.98]',
        ink: 'bg-ink text-bone hover:bg-ink-soft active:scale-[0.98]',
        outline:
          'border border-border bg-surface text-ink hover:border-ink hover:bg-bone-deep active:scale-[0.98]',
        ghost: 'text-ink hover:bg-bone-deep',
        gold: 'bg-gold text-ink hover:bg-ochre active:scale-[0.98]',
        link: 'text-clay underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 rounded-lg px-3.5 text-sm',
        md: 'h-11 rounded-lg px-5 text-sm',
        lg: 'h-14 rounded-lg px-7 text-base',
        icon: 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
