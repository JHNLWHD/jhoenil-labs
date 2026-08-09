import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock, Menu, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';
import BookACall from '@/components/BookACall';
import { cn } from '@/lib/utils';
import {
  currentWork,
  faqs,
  metrics,
  process,
  projects,
  services,
  siteConfig,
} from '@/data/content';

/**
 * /bento — structurally different take: a bento/mosaic grid layout (2026's
 * dominant high-converting portfolio pattern for multi-service freelancers).
 * Light mode overall (per direct feedback), with 1-2 inverted dark tiles for
 * contrast — the standard bento trick — rather than a full dark page.
 *
 * Adds two content types no earlier take had: a Process section (reduces the
 * perceived risk of hiring an unknown freelancer) and an FAQ (handles
 * objections before they cause a bounce) — both aimed directly at conversion.
 */

const BLUE = 'hsl(212 74% 45%)';

const btnSolid =
  'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[hsl(212_74%_45%)]';
const btnLight =
  'inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100';
const btnOutlineDark =
  'inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60';

/** Base bento tile: rounded, thin border, generous padding. Variant controls tone. */
const Tile = ({
  children,
  className = '',
  span = '',
  variant = 'light',
}: {
  children: React.ReactNode;
  className?: string;
  span?: string;
  variant?: 'light' | 'dark' | 'tint';
}) => (
  <div
    className={cn(
      'rounded-3xl p-6 md:p-8',
      variant === 'light' && 'border border-neutral-900/10 bg-white',
      variant === 'dark' && 'bg-neutral-900 text-white',
      variant === 'tint' && 'border border-neutral-900/10 bg-[#f3f1ea]',
      span,
      className,
    )}
  >
    {children}
  </div>
);

const eyebrow = 'text-xs font-medium uppercase tracking-[0.2em] text-neutral-400';

const navLinks = [
  { href: '#b-work', label: 'Work' },
  { href: '#b-services', label: 'Services' },
  { href: '#b-portfolio', label: 'Portfolio' },
  { href: '#b-faq', label: 'FAQ' },
];

const BentoHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-neutral-900/10 bg-[#faf9f5]/85 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
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
          <BookACall className={cn(btnSolid, 'hidden md:inline-flex')} label="Book a discovery call" />
          <BookACall className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white md:hidden" withIcon={false} />
          <button className="p-1 text-neutral-900 md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-neutral-900/10 bg-[#faf9f5] md:hidden">
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

const BentoContactForm = () => {
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
    'w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors';

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

const Bento = () => {
  const withImage = projects.filter((p) => p.image !== '/placeholder.svg');
  const withoutImage = projects.filter((p) => p.image === '/placeholder.svg');
  const [featured, wide, ...rest] = withImage;

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#faf9f5] font-sans text-neutral-900 antialiased [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans">
      <BentoHeader />

      <main className="mx-auto max-w-6xl px-5 py-6 md:px-6 md:py-8">
        {/* HERO BENTO */}
        <section aria-labelledby="b-hero-heading" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <Tile span="sm:col-span-2 lg:col-span-2 lg:row-span-2" className="flex flex-col justify-between">
            <div>
              <p className={eyebrow}>Senior software engineer &amp; consultant</p>
              <h1 id="b-hero-heading" className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-4xl md:text-5xl">
                I build the software your business{' '}
                <span style={{ color: BLUE }}>runs on.</span>
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600">
                Web apps, mobile apps, and systems that replace manual work with real-time
                operations — from first line of code to production.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BookACall className={btnSolid} label="Book a discovery call" />
              <a href="#b-portfolio" className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900">
                See the work →
              </a>
            </div>
          </Tile>

          <Tile variant="dark" span="lg:col-span-1" className="flex flex-col justify-between">
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available now
            </span>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Taking on new project and retainer work for Q4.
            </p>
          </Tile>

          <Tile variant="tint" span="lg:col-span-1" className="flex flex-col items-center justify-center text-center">
            <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-14 w-auto" />
            <p className="mt-3 text-xs text-neutral-500">{siteConfig.location}</p>
          </Tile>

          <Tile span="lg:col-span-1" className="flex flex-col justify-center">
            <div className="text-3xl font-semibold tracking-[-0.02em]">10+</div>
            <p className="mt-1 text-sm text-neutral-500">products shipped across industries</p>
          </Tile>

          <Tile span="lg:col-span-1" className="flex flex-col justify-center">
            <div className="text-3xl font-semibold tracking-[-0.02em]">5+ yrs</div>
            <p className="mt-1 text-sm text-neutral-500">shipping production software</p>
          </Tile>
        </section>

        {/* CURRENTLY WORKING WITH */}
        <section id="b-work" className="scroll-mt-20 pt-10 md:pt-14" aria-labelledby="b-work-heading">
          <p className={eyebrow}>Currently working with</p>
          <h2 id="b-work-heading" className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
            Real businesses trust me with their operations right now.
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {currentWork.map((item, i) => (
              <Tile key={item.client} span={i === 0 ? 'sm:col-span-2' : i === 2 ? 'sm:col-span-3' : ''} variant={i === 1 ? 'tint' : 'light'}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">{item.client}</h3>
                    <p className="mt-0.5 text-sm font-medium" style={{ color: BLUE }}>{item.role}</p>
                  </div>
                  <span className={cn('flex-shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium', item.status === 'Delivered' ? 'bg-neutral-100 text-neutral-500' : 'bg-emerald-50 text-emerald-700')}>
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.outcome}</p>
              </Tile>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="b-services" className="scroll-mt-20 pt-10 md:pt-14" aria-labelledby="b-services-heading">
          <p className={eyebrow}>What I do</p>
          <h2 id="b-services-heading" className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
            Three ways I help businesses move faster.
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {services.map((service, i) => (
              <Tile key={service.title} className="flex flex-col">
                <span className="text-xs font-medium tabular-nums" style={{ color: BLUE }}>0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em]">{service.title}</h3>
                <p className="mt-1 text-sm font-medium" style={{ color: BLUE }}>{service.outcome}</p>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-neutral-600">{service.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-neutral-900/10 pt-4">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-500">{cap}</li>
                  ))}
                </ul>
              </Tile>
            ))}
          </div>
        </section>

        {/* PROCESS — reduces perceived risk of hiring an unknown freelancer */}
        <section className="pt-10 md:pt-14" aria-labelledby="b-process-heading">
          <p className={eyebrow}>How it works</p>
          <h2 id="b-process-heading" className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
            From first call to shipped product.
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <Tile key={step.n} variant="tint">
                <span className="text-xs font-medium tabular-nums text-neutral-400">{step.n}</span>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.description}</p>
              </Tile>
            ))}
          </div>
        </section>

        {/* MID-PAGE CTA */}
        <section className="pt-10 md:pt-14">
          <Tile variant="dark" className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.01em] md:text-2xl">Ready to start?</h2>
              <p className="mt-1 text-sm text-white/70">20 minutes, no pitch deck — let&apos;s see if it&apos;s a fit.</p>
            </div>
            <BookACall className={cn(btnLight, 'flex-shrink-0')} label="Book a discovery call" />
          </Tile>
        </section>

        {/* PORTFOLIO — mosaic, real screenshots featured largest */}
        <section id="b-portfolio" className="scroll-mt-20 pt-10 md:pt-14" aria-labelledby="b-portfolio-heading">
          <p className={eyebrow}>Selected work</p>
          <h2 id="b-portfolio-heading" className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
            Shipped projects, real results.
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {featured && (
              <a
                href={featured.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-neutral-900/10 bg-white sm:col-span-2 lg:col-span-2 lg:row-span-2"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100 lg:aspect-auto lg:h-[60%]">
                  <img src={featured.image} alt={`${featured.title} preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-6">
                  <h3 className="flex items-center justify-between gap-2 text-lg font-semibold tracking-[-0.01em]">
                    {featured.title}
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-400 transition-colors group-hover:text-[hsl(212_74%_45%)]" aria-hidden="true" />
                  </h3>
                  <p className="mt-2 text-sm font-medium" style={{ color: BLUE }}>{featured.outcome}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{featured.description}</p>
                </div>
              </a>
            )}

            {wide && (
              <a
                href={wide.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-neutral-900/10 bg-white sm:col-span-2 lg:col-span-2"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img src={wide.image} alt={`${wide.title} preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-6">
                    <h3 className="flex items-center justify-between gap-2 text-base font-semibold tracking-[-0.01em]">
                      {wide.title}
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-400 transition-colors group-hover:text-[hsl(212_74%_45%)]" aria-hidden="true" />
                    </h3>
                    <p className="mt-1.5 text-xs font-medium" style={{ color: BLUE }}>{wide.outcome}</p>
                  </div>
                </div>
              </a>
            )}

            {rest.map((project) => (
              <a
                key={project.title}
                href={project.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-neutral-900/10 bg-white"
              >
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="flex items-center justify-between gap-2 text-sm font-semibold tracking-[-0.01em]">
                    {project.title}
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-400 transition-colors group-hover:text-[hsl(212_74%_45%)]" aria-hidden="true" />
                  </h3>
                </div>
              </a>
            ))}

            {withoutImage.map((project) => {
              const isPrivate = !project.url;
              const Wrap: React.ElementType = isPrivate ? 'div' : 'a';
              const linkProps = isPrivate ? {} : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
              return (
                <Wrap key={project.title} {...linkProps} className="group flex flex-col justify-between rounded-3xl border border-neutral-900/10 bg-[#f3f1ea] p-5">
                  <div>
                    <h3 className="text-sm font-semibold tracking-[-0.01em]">{project.title}</h3>
                    <p className="mt-1.5 text-xs font-medium" style={{ color: BLUE }}>{project.outcome}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                    {isPrivate ? (<><Lock className="h-3.5 w-3.5" aria-hidden="true" /> Private system</>) : (<>Visit <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></>)}
                  </span>
                </Wrap>
              );
            })}
          </div>
        </section>

        {/* METRICS strip */}
        <section className="pt-10 md:pt-14" aria-label="Track record">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {metrics.map((m) => (
              <Tile key={m.label} variant="tint" className="text-center">
                <div className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{m.value}</div>
                <div className="mt-1.5 text-xs text-neutral-500 md:text-sm">{m.label}</div>
              </Tile>
            ))}
          </div>
        </section>

        {/* FAQ — objection handling */}
        <section id="b-faq" className="scroll-mt-20 pt-10 md:pt-14" aria-labelledby="b-faq-heading">
          <p className={eyebrow}>Before you book</p>
          <h2 id="b-faq-heading" className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
            Frequently asked questions.
          </h2>

          <Tile className="mt-6 p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="border-neutral-900/10">
                  <AccordionTrigger className="px-4 text-left text-[15px] font-medium hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-sm leading-relaxed text-neutral-600">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Tile>
        </section>

        {/* ABOUT */}
        <section className="pt-10 md:pt-14" aria-labelledby="b-about-heading">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Tile span="lg:col-span-1" className="flex items-center justify-center p-0 overflow-hidden">
              <img src="/jhoenil.png" alt="Jhoenil Wahid — software engineer" loading="lazy" className="aspect-[4/5] w-full object-cover object-center" />
            </Tile>
            <Tile span="lg:col-span-2" className="flex flex-col justify-center">
              <p className={eyebrow}>About</p>
              <h2 id="b-about-heading" className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                Turning complex problems into simple, working systems.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
                With 5+ years in software engineering and technical consulting, I&apos;ve helped
                startups, agencies, and enterprises build and scale their products — often as the
                sole developer trusted with the whole platform. I care about clean code,
                performance, and technology that makes a measurable difference to the business.
              </p>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-[hsl(212_74%_45%)]">
                View resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Tile>
          </div>
        </section>

        {/* CONTACT */}
        <section id="b-contact" className="scroll-mt-20 pt-10 pb-14 md:pt-14 md:pb-20" aria-labelledby="b-contact-heading">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Tile variant="dark" className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Let&apos;s talk</p>
                <h2 id="b-contact-heading" className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                  Have a project or an operation to modernize?
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                  The fastest way to start is a quick call — we&apos;ll figure out whether I&apos;m
                  the right fit in 20 minutes.
                </p>
              </div>
              <div className="mt-8">
                <BookACall className={btnLight} label="Book a discovery call" />
              </div>
              <div className="mt-8 space-y-1.5 text-sm text-white/60">
                <p><a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a></p>
                <p className="flex gap-4">
                  <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">LinkedIn</a>
                  {siteConfig.githubUrl && (
                    <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">GitHub</a>
                  )}
                </p>
              </div>
            </Tile>
            <Tile>
              <p className="mb-4 text-sm font-medium text-neutral-500">Or send a message</p>
              <BentoContactForm />
            </Tile>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-6">
          <span>© {new Date().getFullYear()} Jhoenil Labs. All rights reserved.</span>
          <span className="flex flex-wrap gap-4">
            <Link to="/" className="underline underline-offset-4 hover:text-neutral-900">Main</Link>
            <Link to="/fable" className="underline underline-offset-4 hover:text-neutral-900">Fable</Link>
            <Link to="/better-fable" className="underline underline-offset-4 hover:text-neutral-900">Better-fable</Link>
            <Link to="/studio" className="underline underline-offset-4 hover:text-neutral-900">Studio</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Bento;
