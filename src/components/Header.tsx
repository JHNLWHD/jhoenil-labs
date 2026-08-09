import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BookACall from '@/components/BookACall';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-2" aria-label="Jhoenil Wahid — home">
          <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-9 w-auto md:h-10" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <BookACall className="btn-primary hidden md:inline-flex" />
          {/* Compact, always-visible CTA on mobile */}
          <BookACall className="btn-primary px-4 py-2 text-xs md:hidden" />

          <button
            className="p-1 text-foreground md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="section-shell flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <BookACall className="btn-primary w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
