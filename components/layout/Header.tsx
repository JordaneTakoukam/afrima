import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import { MegaMenu } from './MegaMenu';
import { SearchTrigger } from './SearchTrigger';
import { HeaderCounts } from './HeaderCounts';
import { Logo } from '@/components/shared/Logo';
import { Link } from '@/i18n/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bone/95 backdrop-blur supports-[backdrop-filter]:bg-bone/85">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:h-[72px] md:gap-6 md:px-8">
        <MobileMenu />

        <Link
          href="/"
          className="shrink-0 inline-flex items-center gap-2.5"
          aria-label="AFRIMA"
        >
          <Logo size={34} />
          <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
            AFRIMA
          </span>
        </Link>

        <nav className="ml-3 hidden lg:flex">
          <MegaMenu />
        </nav>

        <div className="ml-auto hidden md:block md:w-64 lg:w-80">
          <SearchTrigger />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-1 md:gap-1.5">
          <LocaleSwitcher className="hidden md:inline-flex" />
          <HeaderCounts />
        </div>
      </div>
    </header>
  );
}
