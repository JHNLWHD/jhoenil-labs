import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Lock, Menu, X } from 'lucide-react';
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
 * /ops — a real break from every earlier take, not a reskin.
 *
 * No logo image, no portrait photo — both existing brand assets are cut
 * entirely (the logo PNG has no alpha channel and breaks on non-white
 * backgrounds; the "about" image is a generated word-cloud, not a photo).
 * Identity here is built from type and a status-page visual grammar instead.
 *
 * No brand blue — the accent is a status green, deliberately breaking from
 * every prior page's blue-because-that's-the-logo-color default.
 *
 * New information architecture: the three paid engagements (i3pl, SolarTech,
 * FMCG) aren't a section inside a broader portfolio — they ARE the page,
 * presented as a live systems status board (Stripe/GitHub-status-page
 * convention), because "operational systems for paying clients" is the
 * literal, honest through-line connecting all three. Everything else
 * (capabilities, archive, contact) reuses the same row/table grammar for a
 * coherent system, not a new pattern per section.
 */

const GREEN = 'hsl(152 55% 34%)';
const AMBER = 'hsl(38 80% 45%)';

const MONO = "font-['IBM_Plex_Mono',monospace]";
const HEAD = "font-['Space_Grotesk',sans-serif]";

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(152_55%_34%)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[hsl(152_55%_28%)]';
const btnGhost =
  `inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900`;

type StatusKey = 'Ongoing' | 'In progress' | 'Delivered';
const STATUS_MAP: Record<StatusKey, { label: string; color: string; dot: string }> = {
  Ongoing: { label: 'OPERATIONAL', color: GREEN, dot: 'bg-[hsl(152_55%_34%)]' },
  'In progress': { label: 'DEPLOYING', color: AMBER, dot: 'bg-[hsl(38_80%_45%)]' },
  Delivered: { label: 'DELIVERED', color: 'hsl(0 0% 45%)', dot: 'bg-neutral-400' },
};

const StatusPill = ({ status }: { status: string }) => {
  const s = STATUS_MAP[status as StatusKey] ?? STATUS_MAP.Delivered;
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide', MONO)} style={{ borderColor: s.color, color: s.color }}>
      <span className="relative flex h-1.5 w-1.5">
        {status === 'Ongoing' && (
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', s.dot)} />
        )}
        <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', s.dot)} />
      </span>
      {s.label}
    </span>
  );
};

const RowLabel = ({ n, title }: { n: string; title: string }) => (
  <div className={cn('mb-6 flex items-center gap-2 text-xs text-neutral-400', MONO)}>
    <span>{'//'}</span>
    <span>{n}</span>
    <span className="text-neutral-300">·</span>
    <span className="uppercase tracking-[0.15em]">{title}</span>
  </div>
);

const navLinks = [
  { href: '#ops-systems', label: 'Systems' },
  { href: '#ops-capabilities', label: 'Capabilities' },
  { href: '#ops-archive', label: 'Archive' },
  { href: '#ops-contact', label: 'Contact' },
];

const OpsHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 md:px-8">
        <a href="#top" aria-label="Jhoenil Wahid — top" className="flex items-center gap-2">
          <span className={cn('rounded border border-neutral-900 px-1.5 py-0.5 text-xs font-semibold', MONO)}>JW</span>
          <span className={cn('hidden text-xs text-neutral-400 sm:inline', MONO)}>/ops</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={cn('text-xs uppercase tracking-wide text-neutral-500 transition-colors hover:text-neutral-900', MONO)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BookACall
            className={cn(btnPrimary, 'hidden md:inline-flex')}
            label="Book a call"
            withIcon={false}
          />
          <BookACall className={cn(btnPrimary, 'px-3 py-2 text-xs md:hidden')} withIcon={false} label="Book a call" />
          <button className="p-1 text-neutral-900 md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-neutral-200 md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn('block border-b border-neutral-100 px-5 py-3 text-sm text-neutral-700', MONO)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

const OpsContactForm = () => {
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
        toast({ title: 'Request logged.', description: "I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({ title: 'Submission failed', description: 'Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Submission error', description: 'Please try again later.', variant: 'destructive' });
    }
  };

  const fieldCls = cn('w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none', MONO);

  return (
    <form onSubmit={handleSubmit} className="space-y-3" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="name" aria-label="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      <input type="email" name="email" placeholder="email" aria-label="Your email address" value={formData.email} onChange={handleChange} required className={fieldCls} />
      <textarea name="message" placeholder="what do you want to build?" aria-label="Your message" value={formData.message} onChange={handleChange} required className={cn(fieldCls, 'min-h-24 resize-y')} />
      <button type="submit" className={cn(btnPrimary, 'w-full')}>
        submit_request()
      </button>
    </form>
  );
};

const Ops = () => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const archiveProjects = projects.filter((p) => p.title !== 'Ajinomoto Distributor Sales & Inventory System');

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-white font-sans text-neutral-900 antialiased">
      <OpsHeader />

      <main>
        {/* HERO */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
            <div className={cn('mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs', MONO)} style={{ borderColor: GREEN, color: GREEN }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: GREEN }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN }} />
              </span>
              3 SYSTEMS OPERATIONAL
            </div>
            <h1 className={cn('max-w-2xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl md:text-6xl', HEAD)}>
              Three systems. Three businesses. Running right now.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-neutral-600">
              I&apos;m Jhoenil Wahid. I build and operate the software paying businesses depend on —
              a CRM platform, a solar operations portal, and FMCG inventory systems. All live, all
              mine end to end.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookACall className={btnPrimary} label="Book a call" withIcon={false} />
              <a href="#ops-systems" className={btnGhost}>View systems <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        {/* SYSTEMS — the actual subject of the page */}
        <section id="ops-systems" className="scroll-mt-16 border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <RowLabel n="01" title="Live systems — paid engagements" />
            <div className="border border-neutral-200">
              {/* header row */}
              <div className={cn('hidden grid-cols-12 gap-4 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[11px] uppercase tracking-wide text-neutral-400 sm:grid', MONO)}>
                <span className="col-span-3">System</span>
                <span className="col-span-5">Description</span>
                <span className="col-span-2">Type</span>
                <span className="col-span-2 text-right">Status</span>
              </div>
              {currentWork.map((item, i) => {
                const isOpen = expanded === i;
                return (
                  <div key={item.client} className="border-b border-neutral-200 last:border-b-0">
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="grid w-full grid-cols-1 gap-2 px-4 py-4 text-left transition-colors hover:bg-neutral-50 sm:grid-cols-12 sm:items-center sm:gap-4"
                      aria-expanded={isOpen}
                    >
                      <span className={cn('sm:col-span-3', HEAD, 'text-base font-semibold')}>{item.client}</span>
                      <span className="text-sm text-neutral-500 sm:col-span-5">{item.role}</span>
                      <span className={cn('text-xs text-neutral-400 sm:col-span-2', MONO)}>{item.tags[0]}</span>
                      <span className="flex items-center justify-between gap-2 sm:col-span-2 sm:justify-end">
                        <StatusPill status={item.status} />
                        <ChevronDown className={cn('h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-5">
                        <p className="max-w-2xl text-sm leading-relaxed text-neutral-700">{item.outcome}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className={cn('rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500', MONO)}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className={cn('mt-4 text-xs text-neutral-400', MONO)}>
              Confidential client work — no public URLs. Details shown are limited to what&apos;s
              already agreed to be shared.
            </p>
          </div>
        </section>

        {/* CTA break */}
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center md:px-8">
            <p className={cn('text-sm text-neutral-600', MONO)}>Need a system like this for your business?</p>
            <BookACall className={btnPrimary} label="Book a call" withIcon={false} />
          </div>
        </section>

        {/* CAPABILITIES — same row grammar as systems */}
        <section id="ops-capabilities" className="scroll-mt-16 border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <RowLabel n="02" title="Capabilities" />
            <div className="border border-neutral-200">
              {services.map((s) => (
                <div key={s.title} className="grid grid-cols-1 gap-2 border-b border-neutral-200 px-4 py-4 last:border-b-0 sm:grid-cols-12 sm:items-center sm:gap-4">
                  <span className={cn('sm:col-span-3', HEAD, 'text-base font-semibold')}>{s.title}</span>
                  <span className="text-sm text-neutral-600 sm:col-span-6">{s.outcome}</span>
                  <span className="flex flex-wrap gap-1.5 sm:col-span-3 sm:justify-end">
                    {s.capabilities.slice(0, 2).map((cap) => (
                      <span key={cap} className={cn('rounded border border-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-400', MONO)}>{cap}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHIVE — free/civic work, clearly separated */}
        <section id="ops-archive" className="scroll-mt-16 border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <RowLabel n="03" title="Archive — community &amp; civic, non-billable" />
            <div className="border border-neutral-200">
              {archiveProjects.map((project) => {
                const isPrivate = !project.url;
                const Row: React.ElementType = isPrivate ? 'div' : 'a';
                const linkProps = isPrivate ? {} : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
                return (
                  <Row key={project.title} {...linkProps} className="group grid grid-cols-1 gap-2 border-b border-neutral-200 px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-neutral-50 sm:grid-cols-12 sm:items-center sm:gap-4">
                    <span className="text-sm font-medium text-neutral-700 sm:col-span-4">{project.title}</span>
                    <span className="text-sm text-neutral-500 sm:col-span-6">{project.outcome}</span>
                    <span className={cn('flex items-center gap-1.5 text-xs text-neutral-400 sm:col-span-2 sm:justify-end', MONO)}>
                      {isPrivate ? (<><Lock className="h-3 w-3" aria-hidden="true" /> private</>) : (<span className="group-hover:text-neutral-900">visit →</span>)}
                    </span>
                  </Row>
                );
              })}
            </div>
          </div>
        </section>

        {/* OPERATOR (about) — data record, no photo */}
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <RowLabel n="04" title="Operator" />
            <div className="grid grid-cols-1 gap-6 border border-neutral-200 p-6 sm:grid-cols-12 sm:items-center sm:gap-4">
              <dl className={cn('sm:col-span-4', MONO, 'space-y-2 text-xs')}>
                <div className="flex justify-between gap-4"><dt className="text-neutral-400">name</dt><dd>Jhoenil Wahid</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-neutral-400">role</dt><dd>Senior engineer</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-neutral-400">experience</dt><dd>5+ yrs</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-neutral-400">location</dt><dd className="text-right">Philippines</dd></div>
              </dl>
              <p className="text-sm leading-relaxed text-neutral-600 sm:col-span-6">
                5+ years in software engineering and technical consulting — often the sole developer
                trusted with the whole platform. I care about clean code, performance, and technology
                that makes a measurable difference to the business.
              </p>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className={cn(btnGhost, 'sm:col-span-2 sm:justify-self-end')}>
                Resume <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* TRACK RECORD — compact numbers, mono */}
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className={cn(HEAD, 'text-2xl font-semibold')}>{m.value}</div>
                  <div className={cn('mt-1 text-xs text-neutral-500', MONO)}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="ops-contact" className="scroll-mt-16">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <RowLabel n="05" title="Start an engagement" />
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className={cn(HEAD, 'text-2xl font-semibold tracking-[-0.01em] md:text-3xl')}>
                  Have a project or an operation to modernize?
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
                  The fastest way to start is a quick call — 20 minutes, no pitch deck.
                </p>
                <div className="mt-6">
                  <BookACall className={btnPrimary} label="Book a call" withIcon={false} />
                </div>
                <dl className={cn('mt-8 space-y-1.5 text-xs', MONO)}>
                  <div className="flex gap-2"><dt className="text-neutral-400">email:</dt><dd><a href={`mailto:${siteConfig.email}`} className="hover:text-neutral-900">{siteConfig.email}</a></dd></div>
                  <div className="flex gap-2"><dt className="text-neutral-400">linkedin:</dt><dd><a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">jhoenilwahid</a></dd></div>
                </dl>
              </div>
              <OpsContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200">
        <div className={cn('mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-8', MONO)}>
          <span>© {new Date().getFullYear()} Jhoenil Wahid</span>
          <span className="flex flex-wrap gap-4">
            <Link to="/" className="underline underline-offset-4 hover:text-neutral-900">main</Link>
            <Link to="/flagship" className="underline underline-offset-4 hover:text-neutral-900">flagship</Link>
            <Link to="/console" className="underline underline-offset-4 hover:text-neutral-900">console</Link>
            <Link to="/deck" className="underline underline-offset-4 hover:text-neutral-900">deck</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Ops;
