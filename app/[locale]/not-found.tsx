import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-clay">404</div>
      <h1 className="mt-4 font-display text-6xl leading-tight text-ink md:text-7xl">
        Lost in the medina.
      </h1>
      <p className="mt-4 max-w-md text-ink/70">
        The page you are looking for does not exist — or moved to another stall in the souk.
      </p>
      <Button asChild variant="ink" size="md" className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
