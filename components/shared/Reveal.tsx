'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: { children: React.ReactNode; delay?: number; className?: string } & Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'whileInView' | 'viewport' | 'transition' | 'variants'
>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
