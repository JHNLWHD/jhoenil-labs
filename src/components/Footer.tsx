import React from 'react';
import { siteConfig } from '@/data/content';

const quickLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="section-shell grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="max-w-xs">
          <div className="font-display text-xl font-medium">Jhoenil Labs</div>
          <p className="mt-3 text-sm text-muted-foreground">
            I build the software your business runs on — web, mobile, and systems that replace
            manual work.
          </p>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Footer">
          <span className="mb-1 text-sm font-medium">Explore</span>
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <span className="mb-1 text-sm font-medium">Connect</span>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            LinkedIn
          </a>
          {siteConfig.githubUrl && (
            <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              GitHub
            </a>
          )}
          <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>

      <div className="section-shell mt-10 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © {currentYear} Jhoenil Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
