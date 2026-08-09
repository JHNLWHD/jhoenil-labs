import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock, Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BookACall from '@/components/BookACall';
import { cn } from '@/lib/utils';
import {
  currentWork,
  metrics,
  projects,
  services,
  siteConfig,
} from '@/data/content';

/**
 * /flagship — leads with the three PAID client engagements (i3pl Al Arabia,
 * SolarTech PH, the FMCG distributor systems), not the free/civic projects.
 * All three are confidential — there is nothing to screenshot — so the
 * design doesn't lean on imagery at all. It leans on typography, real facts,
 * and one solid color panel per client instead. The free/civic work (Kodigo,
 * Rotary, Spayce, COVID, MDIO) still appears, but as supporting range, after
 * the paid work — not as the opening hook.
 */

type ClientTheme = { bg: string; fg: string; sub: string; tag: string };

const THEMES: Record<string, ClientTheme> = {
  'i3pl Al Arabia': { bg: '#15171a', fg: '#ffffff', sub: 'rgba(255,255,255,0.65)', tag: 'rgba(255,255,255,0.1)' },
  'SolarTech PH': { bg: 'hsl(38 78% 47%)', fg: '#1a1204', sub: 'rgba(26,18,4,0.65)', tag: 'rgba(26,18,4,0.1)' },
  'FMCG distributor systems': { bg: 'hsl(16 62% 42%)', fg: '#fff8f4', sub: 'rgba(255,248,244,0.7)', tag: 'rgba(255,248,244,0.14)' },
};

const BLUE = 'hsl(212 74% 45%)';

const btnSolid =
  'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[hsl(212_74%_45%)]';
const btnLight =
  'inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100';

const paidClientNames = ['i3pl Al Arabia', 'SolarTech PH', 'FMCG distributor systems'];
const paidClients = paidClientNames
  .map((name) => currentWork.find((c) => c.client === name))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const navLinks = [
  { href: '#fs-clients', label: 'The work' },
  { href: '#fs-more', label: 'More work' },
  { href: '#fs-services', label: 'Services' },
  { href: '#fs-contact', label: 'Contact' },
];

const FlagshipHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900/10 bg-[#faf6f0]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" aria-label="Jhoenil Wahid — top" className="font-semibold tracking-[-0.01em]">
          Jhoenil<span style={{ color: BLUE }}>.</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BookACall className={cn(btnSolid, 'hidden md:inline-flex')} label="Book a discovery call" />
          <BookACall className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white md:hidden" withIcon={false} />
          <button className="p-1 text-neutral-900 md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-neutral-900/10 bg-[#faf6f0] md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-neutral-900/5 px-5 py-3 text-sm font-medium text-neutral-700">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

const FlagshipContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj as unknown as Record<string, string>).toString(),
      });
      if (response.ok) {
        toast({ title: 'Message sent!', description: "Thank you for reaching out. I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({ title: 'Submission failed', description: 'Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Submission error', description: 'Please try again later.', variant: 'destructive' });
    }
  };

  const fieldCls =
    'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="space-y-3" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="Your name" aria-label="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      <input type="email" name="email" placeholder="Your email address" aria-label="Your email address" value={formData.email} onChange={handleChange} required className={fieldCls} />
      <textarea name="message" placeholder="What do you want to build?" aria-label="Your message" value={formData.message} onChange={handleChange} required className={cn(fieldCls, 'min-h-28 resize-y')} />
      <button type="submit" className={cn(btnSolid, 'w-full')}>Send message</button>
    </form>
  );
};

const Flagship = () => {
  // Excludes the Ajinomoto entry — that paid work is already covered by the
  // "FMCG distributor systems" panel above; listing it again here would
  // mislabel paid client work as free/civic.
  const otherProjects = projects.filter((p) => p.title !== 'Ajinomoto Distributor Sales & Inventory System');

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#faf6f0] font-sans text-neutral-900 antialiased [&_h1]:font-sans [&_h2]:font-sans">
      <FlagshipHeader />

      {/* HERO — no imagery, typography carries it */}
      <section className="border-b border-neutral-900/10">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">Client work</p>
          <h1 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            Trusted with the systems paying businesses actually run on.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-neutral-600">
            Three client engagements, right now — a CRM platform, a solar operations business, and
            FMCG distributor systems. All confidential, all real, all mine end to end.
          </p>
          <div className="mt-8">
            <BookACall className={btnSolid} label="Book a discovery call" />
          </div>
        </div>
      </section>

      {/* THE THREE PAID CLIENTS — full-bleed color panels, typography-led */}
      <section id="fs-clients" className="scroll-mt-16">
        {paidClients.map((client, i) => {
          const theme = THEMES[client.client];
          return (
            <article key={client.client} style={{ backgroundColor: theme.bg, color: theme.fg }} className="border-b border-black/10">
              <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-medium tabular-nums" style={{ color: theme.sub }}>0{i + 1}</span>
                  <span className="h-px w-8" style={{ backgroundColor: theme.sub }} />
                  <span className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: theme.sub }}>{client.status}</span>
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl md:text-5xl">
                  {client.client}
                </h2>
                <p className="mt-2 text-base font-medium" style={{ color: theme.sub }}>{client.role}</p>
                <p className="mt-6 max-w-xl text-[17px] leading-relaxed" style={{ color: theme.sub }}>
                  {client.outcome}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {client.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{ backgroundColor: theme.tag, color: theme.fg }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA break */}
      <section className="border-b border-neutral-900/10 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center md:px-8">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.01em] md:text-2xl">Need something similar?</h2>
            <p className="mt-1 text-sm text-neutral-500">20 minutes, no pitch deck — let&apos;s see if it&apos;s a fit.</p>
          </div>
          <BookACall className={btnSolid} label="Book a discovery call" />
        </div>
      </section>

      {/* MORE WORK — compact, secondary */}
      <section id="fs-more" className="scroll-mt-16">
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">Also shipped</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.01em] md:text-2xl">Civic and community projects</h2>
          <p className="mt-2 max-w-md text-sm text-neutral-500">
            Free and volunteer work — including one that reached 3.57K unique voters during the 2025
            election period.
          </p>
          <div className="mt-6 divide-y divide-neutral-900/10 border-y border-neutral-900/10">
            {otherProjects.map((project) => {
              const isPrivate = !project.url;
              const Row: React.ElementType = isPrivate ? 'div' : 'a';
              const linkProps = isPrivate ? {} : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
              return (
                <Row key={project.title} {...linkProps} className="group grid gap-1 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                  <h3 className="text-sm font-semibold sm:col-span-3">{project.title}</h3>
                  <p className="text-sm text-neutral-600 sm:col-span-7">{project.outcome}</p>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 sm:col-span-2 sm:justify-end">
                    {isPrivate ? (<><Lock className="h-3 w-3" /> Private</>) : (<span className="group-hover:text-neutral-900">Visit →</span>)}
                  </span>
                </Row>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES — compact */}
      <section id="fs-services" className="scroll-mt-16 border-t border-neutral-900/10 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">What I do</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.01em] md:text-2xl">Services</h2>
          <div className="mt-6 space-y-8">
            {services.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <span className="text-xs font-medium tabular-nums text-neutral-300">0{i + 1}</span>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: BLUE }}>{s.outcome}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING — contact, no imagery */}
      <section id="fs-contact" className="scroll-mt-16">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <p className="max-w-lg text-[15px] leading-relaxed text-neutral-600">
            I&apos;m <strong className="font-medium text-neutral-900">Jhoenil Wahid</strong>, a senior
            software engineer and consultant with 5+ years building the software businesses run on —
            often as the sole developer trusted with the whole platform.
          </p>

          <h2 className="mt-10 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
            Have a project or an operation to modernize?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
            The fastest way to start is a quick call — we&apos;ll figure out whether I&apos;m the right
            fit in 20 minutes.
          </p>
          <div className="mt-6">
            <BookACall className={btnSolid} label="Book a discovery call" />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="space-y-1.5 text-sm text-neutral-500">
              <p><a href={`mailto:${siteConfig.email}`} className="hover:text-neutral-900">{siteConfig.email}</a></p>
              <p className="flex gap-4">
                <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-neutral-900">LinkedIn</a>
                {siteConfig.githubUrl && (
                  <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-neutral-900">GitHub</a>
                )}
              </p>
              <p>{siteConfig.location}</p>
            </div>
            <FlagshipContactForm />
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-neutral-900/10 pt-8 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="text-xl font-semibold tracking-[-0.01em]">{m.value}</div>
                <div className="mt-1 text-xs text-neutral-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-900/10">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 px-5 py-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} Jhoenil Labs. All rights reserved.</span>
          <span className="flex flex-wrap gap-4">
            <Link to="/" className="underline underline-offset-4 hover:text-neutral-900">Main</Link>
            <Link to="/bento" className="underline underline-offset-4 hover:text-neutral-900">Bento</Link>
            <Link to="/console" className="underline underline-offset-4 hover:text-neutral-900">Console</Link>
            <Link to="/deck" className="underline underline-offset-4 hover:text-neutral-900">Deck</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Flagship;
