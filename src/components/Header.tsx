import { useEffect, useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const navItems = [
  { label: 'Explore', href: '#explore' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  // Rendered as a bordered button rather than a text link — it is the one
  // action we actually want organizers to take.
  { label: 'Submit Event', href: '#submit', cta: true }
];

const Header = ({ onSearch, searchQuery }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header floats transparently over the dark hero, then resolves into
  // paper with a hairline once you leave it. The compact search only appears
  // after the scroll — until then the hero's own search is the one in play.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out-soft',
        scrolled
          ? 'bg-background/92 backdrop-blur-md border-b border-border py-3'
          : 'bg-transparent border-b border-transparent py-6'
      ].join(' ')}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-8">
          {/* Wordmark — the roman/italic pairing is the brand's only flourish */}
          <a
            href="#top"
            className={[
              'font-display text-[1.75rem] md:text-[2rem] leading-none tracking-tight whitespace-nowrap transition-colors duration-500',
              scrolled ? 'text-foreground' : 'text-background'
            ].join(' ')}
          >
            Namaste<span className="italic font-light">Soul</span>
          </a>

          {/* Compact search — fades in only once the hero is behind you */}
          <div
            className={[
              'hidden md:block flex-1 max-w-xs transition-all duration-500 ease-out-soft',
              scrolled
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-1 pointer-events-none'
            ].join(' ')}
          >
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                aria-label="Search events"
                className="h-9 border-0 border-b border-border rounded-none bg-transparent pl-6 pr-0 text-sm
                           placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0
                           focus-visible:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.cta ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={[
                    'label-eyebrow border px-4 py-2.5 text-[0.8rem] font-semibold transition-colors duration-500',
                    scrolled
                      ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                      : 'border-background/60 text-background hover:bg-background hover:text-foreground'
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={[
                    'label-eyebrow link-underline text-[0.8rem] transition-colors duration-500',
                    scrolled
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-background/80 hover:text-background'
                  ].join(' ')}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Mobile trigger */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                aria-label="Open menu"
                className={[
                  'p-1 transition-colors duration-500',
                  scrolled ? 'text-foreground' : 'text-background'
                ].join(' ')}
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-96 bg-background border-l border-border p-0"
            >
              <div className="flex flex-col h-full px-8 py-10">
                <div className="font-display text-[2rem] mb-10">
                  Namaste<span className="italic font-light">Soul</span>
                </div>

                <div className="relative mb-10">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    aria-label="Search events"
                    className="h-11 border-0 border-b border-border rounded-none bg-transparent pl-7
                               focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                  />
                </div>

                <nav className="flex flex-col">
                  {navItems
                    .filter((item) => !item.cta)
                    .map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="font-display text-[2.1rem] py-4 border-b border-border
                                   hover:text-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}

                  <a
                    href="#submit"
                    onClick={() => setIsMenuOpen(false)}
                    className="label-eyebrow mt-8 flex items-center justify-center bg-primary px-6 py-4
                               text-[0.8rem] font-semibold text-primary-foreground transition-colors hover:bg-foreground"
                  >
                    Submit Event
                  </a>
                </nav>

                <p className="label-eyebrow text-muted-foreground mt-auto pt-10">
                  Netherlands · Updated daily
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
