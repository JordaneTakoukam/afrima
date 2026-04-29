'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...p }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex flex-wrap items-center gap-2 border-b border-ink/15',
        className,
      )}
      {...p}
    />
  );
}

export function TabsTrigger({ className, ...p }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'relative px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink data-[state=active]:text-ink data-[state=active]:after:absolute data-[state=active]:after:-bottom-[1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-clay',
        className,
      )}
      {...p}
    />
  );
}

export function TabsContent({ className, ...p }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn('mt-6 focus-visible:outline-none', className)}
      {...p}
    />
  );
}
