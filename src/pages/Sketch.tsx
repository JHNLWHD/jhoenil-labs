import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock, Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { usePostHog } from 'posthog-js/react';
import BookACall from '@/components/BookACall';
import { cn } from '@/lib/utils';
import {
  currentWork,
  metrics,
  projects,
  services,
  siteConfig,
} from '@/data/content';
import { projectSlug } from '@/lib/projectSlug';

/**
 * /sketch — full build-out of gallery style 15.
 * Hand-drawn, napkin-wireframe aesthetic: wobbly irregular border-radius in
 * place of straight lines, a handwritten (Caveat) display face, slight
 * rotation on every card, and real screenshots framed like they were taped
 * to the page rather than dropped into a clean grid.
 */

const HAND = "font-['Caveat',cursive]";

/** A hand-drawn "wobble" via irregular corner radii — no two elements match exactly. */
const wobble = (seed: number): React.CSSProperties => {
  const variants = [
    '255px 15px 225px 15px / 15px 225px 15px 255px',
    '225px 15px 255px 20px / 20px 255px 15px 225px',
    '20px 255px 15px 225px / 225px 15px 255px 20px',
    '255px 20px 15px 225px / 15px 225px 20px 255px',
  ];
  return { borderRadius: variants[seed % variants.length] };
};

const btnSolid = 'inline-flex items-center justify-center gap-2 border-2 border-neutral-800 bg-white px-6 py-3 text-lg text-neutral-800 transition-transform hover:-rotate-1';
const btnGhost = 'inline-flex items-center justify-center gap-2 border-2 border-dashed border-neutral-400 px-6 py-3 text-base text-neutral-500';
const projectStatusStyles: Record<string, string> = {
  Active: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  Archived: 'border-neutral-300 bg-neutral-100 text-neutral-500',
  'Turned over': 'border-sky-300 bg-sky-50 text-sky-700',
  Delivered: 'border-neutral-300 bg-neutral-100 text-neutral-500',
};
const statusStyles: Record<string, string> = {
  Active: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  Upcoming: 'border-amber-300 bg-amber-50 text-amber-700',
  Delivered: 'border-neutral-300 bg-neutral-100 text-neutral-500',
};
const projectStatusOrder: Record<string, number> = {
  Active: 0,
  Delivered: 1,
  'Turned over': 2,
  Archived: 3,
};

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

const SketchHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#fdfbf5]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label={`${siteConfig.brand} — home`}>
          <img src="/jhoenil_labs.png" alt="" className="h-10 w-10 object-contain" />
          <span className={cn(HAND, 'text-2xl text-neutral-800')}>{siteConfig.brand}</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={cn(HAND, 'text-xl text-neutral-700 transition-colors hover:text-[hsl(var(--brand))]')}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BookACall className={cn('hidden min-h-11 rotate-1 items-center border-2 border-neutral-700 px-4 py-1.5 md:inline-flex', HAND, 'text-lg')} withIcon={false} label="Book a 30-minute call" />
          <BookACall className={cn('inline-flex min-h-11 items-center border-2 border-neutral-700 px-3 py-2 text-base md:hidden', HAND)} withIcon={false} label="Book a 30-minute call" />
          <button className="inline-flex min-h-11 min-w-11 items-center justify-center text-neutral-800 md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-neutral-200 bg-[#fdfbf5] md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn(HAND, 'block min-h-11 border-b border-neutral-200 px-5 py-3 text-xl text-neutral-700')}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

const SketchContactForm = () => {
  const { toast } = useToast();
  const posthog = usePostHog();
  const formStarted = useRef(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formDataObj = new FormData(form);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj as unknown as Record<string, string>).toString(),
      });
      if (response.ok) {
        posthog?.capture('contact_form_submitted');
        toast({ title: 'Message sent!', description: "Thank you for reaching out. I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        posthog?.capture('contact_form_failed', { reason: 'http_error', status: response.status });
        toast({ title: 'Submission failed', description: 'Please try again.', variant: 'destructive' });
      }
    } catch {
      posthog?.capture('contact_form_failed', { reason: 'network_error' });
      toast({ title: 'Submission error', description: 'Please try again later.', variant: 'destructive' });
    }
  };

  const handleFormStart = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      posthog?.capture('contact_form_started');
    }
  };

  const fieldCls = 'w-full border-2 border-neutral-700 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border-2 border-neutral-700 bg-white p-6"
      style={wobble(1)}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      name="contact"
      action="/"
      onFocus={handleFormStart}
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label htmlFor="contact-name" className="sr-only">Your name</label>
      <input id="contact-name" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      <label htmlFor="contact-email" className="sr-only">Your email address</label>
      <input id="contact-email" type="email" name="email" placeholder="Your email" value={formData.email} onChange={handleChange} required className={fieldCls} />
      <label htmlFor="contact-message" className="sr-only">What do you want to build?</label>
      <textarea id="contact-message" name="message" placeholder="What do you want to build?" value={formData.message} onChange={handleChange} required className={cn(fieldCls, 'min-h-28 resize-y')} />
      <button type="submit" className={cn(btnSolid, HAND, 'w-full text-xl')}>Send message</button>
      <p className="text-center text-xs text-neutral-500">No spam. I&apos;ll reply within two business days.</p>
    </form>
  );
};

const Sketch = () => {
  useEffect(() => {
    const title = 'Jhoenil Wahid — software for real-world operations';
    const description = 'I replace manual operations with web apps, mobile apps, and systems for growing businesses.';
    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', siteConfig.url);
  }, []);

  const orderedProjects = [...projects].sort((a, b) => (projectStatusOrder[a.status] ?? 9) - (projectStatusOrder[b.status] ?? 9));
  const featuredProjects = orderedProjects.filter((p) => p.image !== '/placeholder.svg');
  const archiveProjects = orderedProjects.filter((p) => p.image === '/placeholder.svg');
  const tiltCycle = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#fdfbf5] font-sans text-neutral-800 antialiased">
      <SketchHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
            <span className={cn(HAND, 'mb-4 inline-block -rotate-1 border-2 border-dashed border-emerald-400 px-3 py-1 text-lg text-emerald-600')}>
              ✓ available for new projects
            </span>
          <h1 className={cn(HAND, 'max-w-2xl text-5xl leading-[1.05] text-neutral-800 sm:text-6xl md:text-7xl')}>
              Software that replaces <span className="text-[hsl(var(--brand))]">manual work.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600">
              I&apos;m {siteConfig.name} — I build web apps, mobile apps, and operational systems that
              give growing businesses real-time visibility.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <BookACall className={cn(btnSolid, HAND, 'min-h-11 text-xl')} label="Book a 30-minute call" withIcon={false} />
              <a href="#portfolio" className={cn(btnGhost, HAND, 'min-h-11 text-lg')}>see the work →</a>
            </div>

            <div className="relative mt-14 hidden max-w-md md:block">
              <svg width="140" height="60" viewBox="0 0 140 60" className="absolute -left-10 -top-10 -rotate-6 text-neutral-400">
                <path d="M5 5 C 40 40, 80 10, 120 45" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M105 40 L120 45 L112 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className={cn(HAND, 'ml-24 rotate-1 border-2 border-dashed border-neutral-400 px-4 py-2 text-lg text-neutral-500')}>
                that button, right there ↑
              </div>
            </div>
          </div>
        </section>

        {/* CURRENTLY WORKING WITH */}
        <section id="work" className="scroll-mt-16 border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <h2 className={cn(HAND, '-rotate-1 text-4xl text-neutral-800')}>currently working with</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
              A couple of active builds I&apos;m trusted to own end-to-end. Client details stay private; the outcomes are real.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {currentWork.map((item, i) => (
                <div key={item.client} className={cn('border-2 border-neutral-700 bg-[#fdfbf5] p-5', tiltCycle[i % tiltCycle.length])} style={wobble(i)}>
                  <div className="flex items-center justify-between">
                    <span className={cn(HAND, 'text-lg text-[hsl(var(--brand))]')}>{item.role}</span>
                    <span className={cn('rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide', statusStyles[item.status] ?? statusStyles.Delivered)}>{item.status}</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-neutral-800">{item.client}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.outcome}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-dashed border-neutral-300 pt-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-neutral-300 px-2 py-0.5 text-[10px] text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookACall className={cn(btnSolid, HAND, 'min-h-11 text-xl')} label="Book a 30-minute call" withIcon={false} />
              <a href="#portfolio" className={cn(btnGhost, HAND, 'min-h-11 text-lg')}>see delivered work →</a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-16 border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <h2 className={cn(HAND, 'rotate-1 text-4xl text-neutral-800')}>what i do</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {services.map((s, i) => (
                <div key={s.title} className={cn('flex flex-col border-2 border-neutral-700 bg-white p-5', tiltCycle[(i + 1) % tiltCycle.length])} style={wobble(i + 2)}>
                  <span className={cn(HAND, 'text-3xl text-neutral-300')}>0{i + 1}</span>
                  <h3 className="mt-1 text-base font-semibold text-neutral-800">{s.title}</h3>
                  <p className={cn(HAND, 'mt-1 text-xl text-[hsl(var(--brand))]')}>{s.outcome}</p>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-neutral-600">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-dashed border-neutral-300 pt-3">
                    {s.capabilities.map((cap) => (
                      <span key={cap} className="rounded-full border border-neutral-300 px-2 py-0.5 text-[10px] text-neutral-500">{cap}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className={cn(HAND, 'rotate-1 text-3xl text-neutral-800')}>work that shipped</h2>
              <span className="hidden text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:block">selected outcomes</span>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border-2 border-neutral-700 bg-neutral-700 sm:grid-cols-4">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={cn('min-w-0 bg-[#fdfbf5] px-3 py-5 text-center sm:px-4', tiltCycle[i % tiltCycle.length])}
                >
                  <span className={cn(HAND, 'block text-3xl leading-none text-neutral-800 sm:text-4xl')}>{m.value}</span>
                  <span className="mx-auto mt-2 block max-w-[130px] text-[9px] uppercase leading-snug tracking-wide text-neutral-500">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="scroll-mt-16 border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <h2 className={cn(HAND, '-rotate-1 text-4xl text-neutral-800')}>shipped &amp; sketched</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, i) => (
                <Link
                  key={project.title}
                  to={`/projects/${projectSlug(project.title)}`}
                  className={cn('group relative block border-2 border-neutral-700 bg-white p-2 transition-transform hover:-translate-y-1', tiltCycle[i % tiltCycle.length])}
                >
                  <div className="relative aspect-[16/10] overflow-hidden border border-neutral-300 bg-neutral-100">
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="absolute -right-3 -top-3 h-7 w-7 rotate-12 rounded-full bg-[hsl(var(--brand)/0.18)]" aria-hidden="true" />
                  <div className="p-3">
                    <h3 className={cn(HAND, 'flex items-center justify-between gap-2 break-words text-xl text-neutral-800')}>
                      {project.title}
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-400" aria-hidden="true" />
                    </h3>
                    <span className={cn('mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide', projectStatusStyles[project.status])}>{project.status}</span>
                    <p className="mt-1 text-xs text-[hsl(var(--brand))]">{project.outcome}</p>
                  </div>
                </Link>
              ))}
              {archiveProjects.map((project, i) => {
                return (
                  <Link key={project.title} to={`/projects/${projectSlug(project.title)}`} className={cn('flex flex-col justify-between border-2 border-dashed border-neutral-400 p-5', tiltCycle[i % tiltCycle.length])}>
                    <div>
                      <h3 className={cn(HAND, 'text-xl text-neutral-800')}>{project.title}</h3>
                      <span className={cn('mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide', projectStatusStyles[project.status])}>{project.status}</span>
                      <p className="mt-1 text-xs text-[hsl(var(--brand))]">{project.outcome}</p>
                    </div>
                    <span className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-neutral-400">
                      {project.url ? <>view project →</> : <><Lock className="h-3 w-3" /> private</>}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <div className="border-2 border-neutral-700 p-7" style={wobble(3)}>
              <span className={cn(HAND, 'text-2xl text-[hsl(var(--brand))]')}>about me</span>
              <h2 className="mt-2 max-w-lg text-2xl font-semibold leading-tight text-neutral-800">
                Turning complex problems into simple, working systems.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-600">
                5+ years in software engineering and technical consulting — often the sole developer
                trusted with the whole platform. I care about clean code, performance, and technology
                that makes a measurable difference to the business.
              </p>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className={cn(btnGhost, HAND, 'mt-5 inline-flex w-fit text-lg')}>
                view resume →
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-16 border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <span className={cn(HAND, 'text-2xl text-[hsl(var(--brand))]')}>let&apos;s talk</span>
                <h2 className={cn(HAND, 'mt-2 text-4xl text-neutral-800')}>
                  got a project to modernize?
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
                  The fastest way to start is a quick call — 30 minutes, no pitch deck.
                </p>
                <div className="mt-6">
                  <BookACall className={cn(btnSolid, HAND, 'text-xl')} label="Book a 30-minute call" withIcon={false} />
                </div>
                <div className={cn(HAND, 'mt-8 space-y-1.5 text-xl text-neutral-600')}>
                  <p><a href={`mailto:${siteConfig.email}`} className="hover:text-[hsl(var(--brand))]">{siteConfig.email}</a></p>
                  <p><a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--brand))]">LinkedIn</a></p>
                </div>
              </div>
              <div>
                <h3 className={cn(HAND, 'text-2xl text-neutral-800')}>Prefer to send the details?</h3>
                <p className="mt-2 mb-4 text-sm leading-relaxed text-neutral-600">
                  Send a few notes instead and I&apos;ll reply within two business days.
                </p>
                <SketchContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className={cn(HAND, 'mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-lg text-neutral-500 md:flex-row md:items-center md:justify-between md:px-8')}>
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span className="flex flex-wrap gap-4">
            <Link to="/" className="hover:text-[hsl(var(--brand))]">main</Link>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-[hsl(var(--brand))]">email</a>
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--brand))]">LinkedIn</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Sketch;
