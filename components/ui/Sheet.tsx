'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: 'left' | 'right' | 'top' | 'bottom';
}) {
  const sideClasses = {
    right: 'inset-y-0 right-0 h-full w-full max-w-sm border-l border-ink/15',
    left: 'inset-y-0 left-0 h-full w-full max-w-sm border-r border-ink/15',
    top: 'inset-x-0 top-0 w-full',
    bottom: 'inset-x-0 bottom-0 w-full',
  }[side];

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-ink/40 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
      <DialogPrimitive.Content
        className={cn(
          'fixed z-50 bg-bone p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out',
          sideClasses,
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded p-1 text-ink/70 hover:bg-ink/5">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
