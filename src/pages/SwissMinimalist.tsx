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
 * /swiss-minimalist — full build-out of gallery style 05.
 * International Typographic Style: bold grotesk caps, one accent (coral
 * red), strong grid, hairline + heavy black rules, geometric outline shapes.
 * Zero gradients, zero soft shadows — precision and contrast do the work.
 */

const RED = '#e5342b';
const GROTESK = "font-['Space_Grotesk',sans-serif]";

const btnSolid = 'inline-flex items-center justify-center gap-2 bg-[#e5342b] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#c72a22]';
const btnOutline = 'inline-flex items-center justify-center gap-2 border-2 border-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

const SwissHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className={cn('sticky top-0 z-50 border-b-2 border-black bg-white', GROTESK)}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label={`${siteConfig.name} — top`}>
          <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-bold uppercase tracking-wide text-black transition-colors hover:text-[#e5342b]">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BookACall className={cn(btnSolid, 'hidden md:inline-flex')} label="Book a call" withIcon={false} />
          <BookACall className="inline-flex items-center bg-[#e5342b] px-4 py-2 text-xs font-bold uppercase text-white md:hidden" withIcon={false} label="Book" />
          <button className="p-1 text-black md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t-2 border-black md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-neutral-200 px-5 py-3 text-sm font-bold uppercase">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

const SwissContactForm = () => {
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

  const fieldCls = 'w-full border-2 border-black bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#e5342b]';

  return (
    <form onSubmit={handleSubmit} className="space-y-3" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="Name" aria-label="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      <input type="email" name="email" placeholder="Email" aria-label="Your email address" value={formData.email} onChange={handleChange} required className={fieldCls} />
      <textarea name="message" placeholder="What do you want to build?" aria-label="Your message" value={formData.message} onChange={handleChange} required className={cn(fieldCls, 'min-h-28 resize-y')} />
      <button type="submit" className={cn(btnSolid, 'w-full')}>Send message</button>
    </form>
  );
};

const SwissMinimalist = () => {
  const featuredProjects = projects.filter((p) => p.image !== '/placeholder.svg');
  const archiveProjects = projects.filter((p) => p.image === '/placeholder.svg');

  return (
    <div id="top" className={cn('min-h-screen overflow-x-hidden bg-white text-black antialiased', GROTESK)}>
      <SwissHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b-2 border-black">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <div className="mb-6 flex items-center justify-between border-b-2 border-black pb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Senior software engineer &amp; consultant</span>
              <span className="px-3 py-1 text-xs font-bold uppercase text-white" style={{ backgroundColor: RED }}>Available now</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Software your business runs on.
            </h1>
            <div className="mt-4 h-3 w-32" style={{ backgroundColor: RED }} />
            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600">
              I&apos;m {siteConfig.name} — I build web apps, mobile apps, and systems that replace
              manual work with real-time operations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookACall className={btnSolid} label="Book a call" withIcon={false} />
              <a href="#portfolio" className={btnOutline}>See the work</a>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-10 top-10 hidden h-32 w-32 rotate-45 border-2 border-black md:block" />
          <div aria-hidden className="pointer-events-none absolute bottom-6 right-24 hidden h-16 w-16 rounded-full border-2" style={{ borderColor: RED }} />
        </section>

        {/* CURRENTLY WORKING WITH */}
        <section id="work" className="scroll-mt-16 border-b-2 border-black">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="mb-10 flex items-baseline justify-between border-b-2 border-black pb-3">
              <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">Currently working with</h2>
              <span className="hidden text-xs font-bold uppercase tracking-wide text-neutral-400 md:inline">01 / Clients</span>
            </div>
            <div className="grid grid-cols-1 gap-0 border-2 border-black md:grid-cols-3">
              {currentWork.map((item, i) => (
                <div key={item.client} className={cn('p-6', i > 0 && 'border-t-2 border-black md:border-l-2 md:border-t-0')}>
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: RED }}>{item.role}</span>
                  <h3 className="mt-1 text-xl font-bold uppercase">{item.client}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.outcome}</p>
                  <span className="mt-4 inline-block border-2 border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-16 border-b-2 border-black">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="mb-10 flex items-baseline justify-between border-b-2 border-black pb-3">
              <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">What I do</h2>
              <span className="hidden text-xs font-bold uppercase tracking-wide text-neutral-400 md:inline">02 / Services</span>
            </div>
            <div className="grid grid-cols-1 gap-0 border-2 border-black md:grid-cols-3">
              {services.map((s, i) => (
                <div key={s.title} className={cn('flex flex-col p-6', i > 0 && 'border-t-2 border-black md:border-l-2 md:border-t-0')}>
                  <span className="text-4xl font-bold" style={{ color: RED }}>0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold uppercase">{s.title}</h3>
                  <p className="mt-1 text-sm font-bold" style={{ color: RED }}>{s.outcome}</p>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-neutral-600">{s.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5 border-t-2 border-black pt-4">
                    {s.capabilities.map((cap) => (
                      <li key={cap} className="border border-black px-2 py-0.5 text-[10px] font-bold uppercase">{cap}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="border-b-2 border-black">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
            <div className="grid grid-cols-2 gap-0 border-2 border-black md:grid-cols-4">
              {metrics.map((m, i) => (
                <div key={m.label} className={cn('p-5 text-center', i % 2 === 1 && 'border-l-2 border-black', i >= 2 && 'border-t-2 border-black md:border-t-0', i === 2 && 'md:border-l-2')}>
                  <div className="text-3xl font-bold" style={{ color: i % 2 === 0 ? '#000' : RED }}>{m.value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-neutral-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="scroll-mt-16 border-b-2 border-black">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="mb-10 flex items-baseline justify-between border-b-2 border-black pb-3">
              <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">Selected work</h2>
              <span className="hidden text-xs font-bold uppercase tracking-wide text-neutral-400 md:inline">03 / Portfolio</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col border-2 border-black transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-black bg-neutral-100">
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover object-top" />
                    <span className="absolute left-2 top-2 px-2 py-0.5 text-[10px] font-bold uppercase text-white" style={{ backgroundColor: RED }}>{project.category}</span>
                  </div>
                  <div className="flex flex-grow flex-col p-4">
                    <h3 className="flex items-center justify-between gap-2 text-sm font-bold uppercase">
                      {project.title}
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    </h3>
                    <p className="mt-1.5 text-xs font-bold" style={{ color: RED }}>{project.outcome}</p>
                  </div>
                </a>
              ))}
              {archiveProjects.map((project) => {
                const isPrivate = !project.url;
                const Wrap: React.ElementType = isPrivate ? 'div' : 'a';
                const linkProps = isPrivate ? {} : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
                return (
                  <Wrap key={project.title} {...linkProps} className="flex flex-col justify-between border-2 border-black p-5">
                    <div>
                      <h3 className="text-sm font-bold uppercase">{project.title}</h3>
                      <p className="mt-1.5 text-xs font-bold" style={{ color: RED }}>{project.outcome}</p>
                    </div>
                    <span className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                      {isPrivate ? (<><Lock className="h-3 w-3" /> Private system</>) : (<>Visit <ArrowUpRight className="h-3 w-3" /></>)}
                    </span>
                  </Wrap>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="border-b-2 border-black">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: RED }}>About</span>
                <h2 className="mt-2 max-w-lg text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
                  Turning complex problems into simple, working systems.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-600">
                  With 5+ years in software engineering and technical consulting, I&apos;ve helped
                  startups, agencies, and enterprises build and scale their products — often as the
                  sole developer trusted with the whole platform.
                </p>
                <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className={cn(btnOutline, 'mt-6 inline-flex w-fit')}>
                  View resume
                </a>
              </div>
              <div className="border-2 border-black p-6 md:col-span-4">
                <p className="text-xs font-bold uppercase tracking-wide text-neutral-400">Based in</p>
                <p className="mt-1 text-lg font-bold uppercase">Philippines</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-neutral-400">Working with</p>
                <p className="mt-1 text-sm font-bold uppercase leading-relaxed">Clients worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: RED }}>Let&apos;s talk</span>
                <h2 className="mt-2 text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
                  Have a project to modernize?
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
                  The fastest way to start is a quick call — 20 minutes, no pitch deck.
                </p>
                <div className="mt-6">
                  <BookACall className={btnSolid} label="Book a call" withIcon={false} />
                </div>
                <div className="mt-8 space-y-1.5 border-t-2 border-black pt-4 text-sm font-bold uppercase">
                  <p><a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a></p>
                  <p><a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></p>
                </div>
              </div>
              <SwissContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-black bg-black text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs font-bold uppercase tracking-wide md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span className="flex flex-wrap gap-4">
            <Link to="/" className="hover:underline">Main</Link>
            <Link to="/gallery" className="hover:underline">Gallery</Link>
            <Link to="/neo-brutalism" className="hover:underline">Neo Brutalism</Link>
            <Link to="/sketch" className="hover:underline">Sketch</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SwissMinimalist;
