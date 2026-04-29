import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider',
  {
    variants: {
      variant: {
        ink: 'bg-ink text-bone',
        bone: 'bg-bone text-ink border border-ink/20',
        clay: 'bg-clay text-bone',
        ochre: 'bg-ochre text-ink',
        gold: 'bg-gold text-ink',
        leaf: 'bg-leaf text-bone',
        berry: 'bg-berry text-bone',
        outline: 'border border-ink/40 text-ink',
        soft: 'bg-bone-deep text-ink',
      },
    },
    defaultVariants: { variant: 'ink' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
