import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Lock, Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BookACall from '@/components/BookACall';
import { currentWork, metrics, projects, services, siteConfig } from '@/data/content';

/**
 * /studio — refined-studio / cinematic take for comparison.
 * Same content source (src/data/content.ts) and locked decisions.
 * Direction: quiet, premium, image-forward. Real project screenshots shown in
 * browser-frame mockups (Stripe/Notion product-shot feel). Controlled palette
 * (warm white + ink + logo blue), no gradients/glows, subtle scroll reveals,
 * no card grids. Dense, not sparse.
 */

const BLUE = 'hsl(212 74% 45%)';

const btnSolid =
  'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[hsl(212_74%_45%)]';
const btnGhost =
  'inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900';

/** Subtle, reduced-motion-aware scroll reveal. */
const Reveal = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    // Anything already in view on mount (above the fold) reveals immediately;
    // don't gate the hero on an observer callback that may be throttled.
    const rect = el.getBoundingClientRect();
    if (rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

/** macOS-style browser chrome around a real screenshot. */
const BrowserFrame = ({
  src,
  alt,
  url,
  className = '',
}: {
  src: string;
  alt: string;
  url?: string | null;
  className?: string;
}) => (
  <div className={`overflow-hidden rounded-xl border border-neutral-900/10 bg-white shadow-[0_40px_80px_-40px_rgba(20,17,14,0.45)] ${className}`}>
    <div className="flex items-center gap-2 border-b border-neutral-900/10 bg-neutral-50 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
      <div className="ml-2 hidden h-5 max-w-[220px] flex-1 items-center rounded-md bg-neutral-200/70 px-3 text-[10px] text-neutral-500 sm:flex">
        {url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''}
      </div>
    </div>
    <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
    </div>
  </div>
);

const navLinks = [
  { href: '#s-work', label: 'Work' },
  { href: '#s-services', label: 'Services' },
  { href: '#s-selected', label: 'Selected' },
  { href: '#s-about', label: 'About' },
];

const StudioHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? 'border-b border-neutral-900/10 bg-[#fbfaf7]/85 backdrop-blur-md' : 'border-b border-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" aria-label="Jhoenil Labs — top" className="flex items-center">
          <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-9 w-auto md:h-10" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BookACall className={`${btnSolid} hidden md:inline-flex`} />
          <BookACall className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white md:hidden" withIcon={false} />
          <button className="p-1 text-neutral-900 md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-neutral-900/10 bg-[#fbfaf7] md:hidden">
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

const StudioContactForm = () => {
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
        toast({ title: 'Submission failed', description: 'There was an issue submitting your message. Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Submission error', description: 'An unexpected error occurred. Please try again later.', variant: 'destructive' });
    }
  };

  const fieldCls =
    'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-3" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="Your name" aria-label="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      <input type="email" name="email" placeholder="Your email address" aria-label="Your email address" value={formData.email} onChange={handleChange} required className={fieldCls} />
      <textarea name="message" placeholder="What do you want to build?" aria-label="Your message" value={formData.message} onChange={handleChange} required className={`min-h-28 resize-y ${fieldCls}`} />
      <button type="submit" className={`${btnSolid} w-full`}>Send message</button>
    </form>
  );
};

const Studio = () => {
  const featured = projects.filter((p) => p.image !== '/placeholder.svg');
  const moreWork = projects.filter((p) => p.image === '/placeholder.svg');
  const heroShots = featured.slice(0, 2);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#fbfaf7] font-sans text-neutral-900 antialiased [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans">
      <StudioHeader />

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-5 pb-6 pt-12 md:px-8 md:pb-10 md:pt-20" aria-labelledby="s-hero">
          <Reveal>
            <p className="flex items-center gap-2.5 text-sm text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for new projects
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 id="s-hero" className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.02em] sm:text-5xl md:text-[4.25rem]">
              I build the software your business{' '}
              <span style={{ color: BLUE }}>runs on.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
              I&apos;m <strong className="font-medium text-neutral-900">Jhoenil Wahid</strong> — a senior
              engineer building web apps, mobile apps, and systems that replace manual work with
              real-time operations, end to end.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BookACall className={btnSolid} />
              <a href="#s-selected" className={btnGhost}>
                See selected work <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Hero product shots — overlapping browser frames */}
          {heroShots.length >= 2 && (
            <Reveal delay={120} className="relative mt-14 md:mt-20">
              <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
                <div className="md:col-span-8">
                  <BrowserFrame src={heroShots[0].image} alt={`${heroShots[0].title} preview`} url={heroShots[0].url} />
                </div>
                <div className="md:col-span-4">
                  <BrowserFrame src={heroShots[1].image} alt={`${heroShots[1].title} preview`} url={heroShots[1].url} />
                </div>
              </div>
            </Reveal>
          )}
        </section>

        {/* CURRENTLY WORKING WITH — quiet credibility band */}
        <section id="s-work" className="scroll-mt-20 border-y border-neutral-900/10 bg-white" aria-labelledby="s-work-h">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">Currently working with</p>
              <h2 id="s-work-h" className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                Real businesses trust me with their operations right now.
              </h2>
            </Reveal>
            <div className="mt-10 divide-y divide-neutral-900/10 border-t border-neutral-900/10">
              {currentWork.map((item, i) => (
                <Reveal key={item.client} delay={i * 60}>
                  <article className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                    <div className="md:col-span-3">
                      <h3 className="text-lg font-semibold tracking-[-0.01em]">{item.client}</h3>
                      <p className="text-sm" style={{ color: BLUE }}>{item.role}</p>
                    </div>
                    <p className="text-[15px] leading-relaxed text-neutral-600 md:col-span-7">{item.outcome}</p>
                    <div className="md:col-span-2 md:text-right">
                      <span className={`text-xs font-medium ${item.status === 'Delivered' ? 'text-neutral-400' : 'text-emerald-600'}`}>
                        {item.status}
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Metrics inline */}
            <Reveal>
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-neutral-900/10 pt-10 md:grid-cols-4">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{m.value}</div>
                    <div className="mt-1.5 text-sm text-neutral-500">{m.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES — editorial, no cards */}
        <section id="s-services" className="scroll-mt-20" aria-labelledby="s-services-h">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">What I do</p>
              <h2 id="s-services-h" className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                Three ways I help businesses move faster.
              </h2>
            </Reveal>
            <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-neutral-900/10 bg-neutral-900/10">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 70}>
                  <article className="grid gap-4 bg-[#fbfaf7] p-6 md:grid-cols-12 md:items-baseline md:gap-8 md:p-8">
                    <div className="flex items-baseline gap-4 md:col-span-4">
                      <span className="text-sm tabular-nums" style={{ color: BLUE }}>0{i + 1}</span>
                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.01em]">{service.title}</h3>
                        <p className="mt-1 text-sm font-medium" style={{ color: BLUE }}>{service.outcome}</p>
                      </div>
                    </div>
                    <p className="text-[15px] leading-relaxed text-neutral-600 md:col-span-5">{service.description}</p>
                    <ul className="flex flex-wrap gap-1.5 md:col-span-3 md:justify-end">
                      {service.capabilities.map((cap) => (
                        <li key={cap} className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs text-neutral-500">{cap}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED WORK — cinematic alternating showcases */}
        <section id="s-selected" className="scroll-mt-20 border-t border-neutral-900/10 bg-white" aria-labelledby="s-selected-h">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">Selected work</p>
              <h2 id="s-selected-h" className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                Shipped projects, real results.
              </h2>
            </Reveal>

            <div className="mt-14 space-y-20 md:space-y-28">
              {featured.map((project, i) => (
                <Reveal key={project.title}>
                  <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                    <div className={`md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block transition-transform duration-500 hover:-translate-y-1">
                          <BrowserFrame src={project.image} alt={`${project.title} preview`} url={project.url} />
                        </a>
                      ) : (
                        <BrowserFrame src={project.image} alt={`${project.title} preview`} url={project.url} />
                      )}
                    </div>
                    <div className={`md:col-span-5 ${i % 2 ? 'md:order-1' : ''}`}>
                      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <span className="h-px w-6 bg-neutral-300" />
                        <span>{project.category}</span>
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">{project.title}</h3>
                      <p className="mt-3 text-base font-medium" style={{ color: BLUE }}>{project.outcome}</p>
                      <p className="mt-4 leading-relaxed text-neutral-600">{project.description}</p>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-[hsl(212_74%_45%)]">
                          Visit project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* More work — compact index (incl. private + not-yet-captured) */}
            {moreWork.length > 0 && (
              <Reveal className="mt-20 md:mt-28">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">More work</p>
                <div className="mt-6 divide-y divide-neutral-900/10 border-y border-neutral-900/10">
                  {moreWork.map((project) => {
                    const isPrivate = !project.url;
                    const Wrap: React.ElementType = isPrivate ? 'div' : 'a';
                    const linkProps = isPrivate ? {} : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
                    return (
                      <Wrap key={project.title} {...linkProps} className="group grid gap-1 py-5 md:grid-cols-12 md:items-baseline md:gap-6">
                        <h3 className="font-semibold tracking-[-0.01em] md:col-span-4">{project.title}</h3>
                        <p className="text-sm text-neutral-600 md:col-span-6">{project.outcome}</p>
                        <span className="text-xs font-medium md:col-span-2 md:text-right">
                          {isPrivate ? (
                            <span className="inline-flex items-center gap-1.5 text-neutral-400"><Lock className="h-3.5 w-3.5" /> Private</span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-neutral-900 group-hover:text-[hsl(212_74%_45%)]">Visit <ArrowUpRight className="h-3.5 w-3.5" /></span>
                          )}
                        </span>
                      </Wrap>
                    );
                  })}
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* ABOUT — cinematic portrait */}
        <section id="s-about" className="scroll-mt-20" aria-labelledby="s-about-h">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <Reveal className="md:col-span-5">
                <div className="overflow-hidden rounded-2xl">
                  <img src="/jhoenil.png" alt="Jhoenil Wahid — software engineer" loading="lazy" className="aspect-[4/5] w-full object-cover object-center" />
                </div>
              </Reveal>
              <Reveal delay={100} className="md:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">About</p>
                <h2 id="s-about-h" className="mt-4 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
                  Turning complex problems into simple, working systems.
                </h2>
                <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-neutral-600">
                  <p>
                    With 5+ years in software engineering and technical consulting, I&apos;ve helped
                    startups, agencies, and enterprises build and scale their products — often as the
                    sole developer trusted with the whole platform.
                  </p>
                  <p>
                    I started full-stack and grew into cloud architecture, technical leadership, and
                    AI integration. I care about clean code, performance, and technology that makes a
                    measurable difference to the business.
                  </p>
                </div>
                <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className={`${btnGhost} mt-7`}>
                  View resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="s-contact" className="scroll-mt-20 border-t border-neutral-900/10 bg-white" aria-labelledby="s-contact-h">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
            <div className="grid gap-12 md:grid-cols-2">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">Let&apos;s talk</p>
                <h2 id="s-contact-h" className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
                  Have a project or an operation to modernize?
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-neutral-600">
                  The fastest way to start is a quick call — we&apos;ll figure out whether I&apos;m the
                  right fit in 20 minutes. Prefer to write first? Use the form.
                </p>
                <div className="mt-7">
                  <BookACall className={btnSolid} />
                </div>
                <div className="mt-10 space-y-2 text-sm text-neutral-500">
                  <p><a href={`mailto:${siteConfig.email}`} className="hover:text-neutral-900">{siteConfig.email}</a></p>
                  <p>{siteConfig.location}</p>
                  <p className="flex gap-4 pt-1">
                    <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-neutral-900">LinkedIn</a>
                    {siteConfig.githubUrl && (
                      <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-neutral-900">GitHub</a>
                    )}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <StudioContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} Jhoenil Labs. All rights reserved.</span>
          <span className="flex gap-4">
            <Link to="/" className="underline underline-offset-4 hover:text-neutral-900">Main</Link>
            <Link to="/fable" className="underline underline-offset-4 hover:text-neutral-900">Fable</Link>
            <Link to="/better-fable" className="underline underline-offset-4 hover:text-neutral-900">Better-fable</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Studio;
