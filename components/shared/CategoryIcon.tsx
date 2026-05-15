import {
  Smartphone,
  Laptop,
  Tv,
  Refrigerator,
  CookingPot,
  ShowerHead,
  Sparkles,
  Sofa,
  Package,
} from 'lucide-react';

const MAP = {
  phones: Smartphone,
  computers: Laptop,
  tv: Tv,
  appliances: Refrigerator,
  kitchen: CookingPot,
  bathroom: ShowerHead,
  beaute: Sparkles,
  home: Sofa,
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
