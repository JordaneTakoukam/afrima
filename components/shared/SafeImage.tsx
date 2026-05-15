'use client';

import Image, { type ImageProps } from 'next/image';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

const PALETTES = [
  { from: '#78350F', to: '#C2410C', text: '#FAF7F2' }, // earth → clay
  { from: '#1C1917', to: '#78350F', text: '#FAF7F2' }, // ink → earth
  { from: '#9F1239', to: '#1C1917', text: '#FAF7F2' }, // berry → ink
  { from: '#166534', to: '#1C1917', text: '#FAF7F2' }, // leaf → ink
  { from: '#D97706', to: '#9A3412', text: '#1C1917' }, // ochre → clay-deep
  { from: '#EAB308', to: '#C2410C', text: '#1C1917' }, // gold → clay
  { from: '#FAF7F2', to: '#E7DDC9', text: '#1C1917' }, // bone → bone-deep
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickPalette(seed: string) {
  return PALETTES[hash(seed) % PALETTES.length];
}

export type SafeImageProps = Omit<ImageProps, 'onError'> & {
  fallbackText?: string;
  fallbackSeed?: string;
  fallbackKicker?: string;
};

export function SafeImage({
  src,
  alt,
  fallbackText,
  fallbackSeed,
  fallbackKicker,
  className,
  priority,
  ...props
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);
  const text = fallbackText ?? (typeof alt === 'string' ? alt : 'AFRIMA');
  const seed = fallbackSeed ?? text;
  const palette = useMemo(() => pickPalette(seed), [seed]);

  if (errored) {
    return (
      <div
        className={cn(
          'absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden p-6 text-center',
          className,
        )}
        style={{
          background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
          color: palette.text,
        }}
      >
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g fill='none' stroke='white' stroke-width='1.4' opacity='0.7'><circle cx='80' cy='80' r='30'/><circle cx='80' cy='80' r='50'/><path d='M80 30 v100 M30 80 h100 M44 44 l72 72 M44 116 l72 -72'/><circle cx='80' cy='80' r='6' fill='white'/></g></svg>\")",
            backgroundSize: '120px 120px',
          }}
          aria-hidden
        />
        {fallbackKicker ? (
          <div
            className="relative font-mono text-[10px] uppercase tracking-[0.3em] opacity-70"
            style={{ color: palette.text }}
          >
            {fallbackKicker}
          </div>
        ) : null}
        <div
          className="relative mt-1 font-display text-base leading-tight md:text-2xl"
          style={{ color: palette.text }}
        >
          {text}
        </div>
        <div
          className="relative mt-2 font-mono text-[9px] uppercase tracking-[0.3em] opacity-60"
          style={{ color: palette.text }}
        >
          AFRIMA
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
      // next/image 16: an above-the-fold/LCP image is opted out of lazy
      // loading with loading="eager" + fetchPriority="high".
      loading={priority ? 'eager' : undefined}
      fetchPriority={priority ? 'high' : undefined}
      {...props}
    />
  );
}
