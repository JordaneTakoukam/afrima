import {
  Shirt,
  Palette,
  Sparkles,
  Utensils,
  Armchair,
  Drum,
  Package,
} from 'lucide-react';

const MAP = {
  textiles: Shirt,
  artisanat: Palette,
  beaute: Sparkles,
  gastronomie: Utensils,
  maison: Armchair,
  culture: Drum,
} as const;

/** Renders the lucide icon for a category's `icon` key. */
export function CategoryIcon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = MAP[name as keyof typeof MAP] ?? Package;
  return <Icon className={className} size={size} />;
}
