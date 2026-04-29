import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import { MegaMenu } from './MegaMenu';
import { SearchTrigger } from './SearchTrigger';
import { HeaderCounts } from './HeaderCounts';
import { Logo } from '@/components/shared/Logo';
import { Link } from '@/i18n/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-bone/95 backdrop-blur supports-[backdrop-filter]:bg-bone/85">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:h-20 md:gap-4 md:px-8">
        <MobileMenu />

        <Link href="/" className="shrink-0 group inline-flex items-center gap-2">
          <Logo size={28} className="md:hidden" />
          <Logo size={32} className="hidden md:inline-flex" />
          <span className="font-display text-2xl italic tracking-tight md:text-3xl">
            AFRIMA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-2">
          <MegaMenu />
        </nav>

        <div className="ml-auto hidden md:block flex-1 max-w-md">
          <SearchTrigger />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-3 md:gap-2">
          <LocaleSwitcher className="hidden md:inline-flex" />
          <HeaderCounts />
        </div>
      </div>
    </header>
  );
}
