import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BookACall from '@/components/BookACall';
import { currentWork, metrics, projects, services, siteConfig } from '@/data/content';

/**
 * /better-fable — third design take for comparison.
 * Same content source (src/data/content.ts) and locked decisions.
 * Direction: light "sticky-rail dossier". Keeps /fable's sans/uppercase type,
 * restores the logo. Desktop: fixed left rail (logo, numbered nav, CTA) with a
 * magazine-style content column on the right. Mobile: logo + CTA bar, stacked flow.
 */

const BLUE = 'hsl(212 74% 45%)';
const btnSolid =
  'inline-flex items-center justify-center gap-2 bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[hsl(212_74%_45%)]';
const btnOutline =
  'inline-flex items-center justify-center gap-2 border border-neutral-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 transition-colors hover:border-neutral-900';

const navLinks = [
  { href: '#bf-work', n: '01', label: 'Current work' },
  { href: '#bf-services', n: '02', label: 'Services' },
  { href: '#bf-portfolio', n: '03', label: 'Portfolio' },
  { href: '#bf-about', n: '04', label: 'About' },
  { href: '#bf-contact', n: '05', label: 'Contact' },
];

const SectionTitle = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="mb-8 flex items-baseline gap-4 border-b border-neutral-900 pb-4">
    <span className="font-sans text-xs font-semibold tabular-nums" style={{ color: BLUE }}>{n}</span>
    <h2 className="font-sans text-xl font-extrabold uppercase tracking-tight md:text-2xl">{children}</h2>
  </div>
);

const BetterFableContactForm = () => {
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
    'w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-2" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label htmlFor="bf-name" className="sr-only">Your name</label>
        <input id="bf-name" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      </div>
      <div>
        <label htmlFor="bf-email" className="sr-only">Your email address</label>
        <input id="bf-email" type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} required className={fieldCls} />
      </div>
      <div>
        <label htmlFor="bf-message" className="sr-only">Your message</label>
        <textarea id="bf-message" name="message" placeholder="What do you want to build?" value={formData.message} onChange={handleChange} required className={`min-h-28 resize-y ${fieldCls}`} />
      </div>
      <div className="pt-4">
        <button type="submit" className={`${btnSolid} w-full md:w-auto`}>Send message</button>
      </div>
    </form>
  );
};

const BetterFable = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafaf8] font-sans text-neutral-900 antialiased">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-[#fafaf8]/95 px-5 py-3 backdrop-blur lg:hidden">
        <a href="#top" aria-label="Jhoenil Labs — top">
          <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-10 w-auto" />
        </a>
        <BookACall className="inline-flex items-center bg-neutral-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white" withIcon={false} />
      </header>

      <div id="top" className="mx-auto grid w-full max-w-7xl lg:grid-cols-12">
        {/* Left rail — sticky on desktop */}
        <aside className="px-5 pt-10 lg:sticky lg:top-0 lg:col-span-4 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:border-r lg:border-neutral-200 lg:px-10 lg:py-12">
          <div>
            <a href="#top" aria-label="Jhoenil Labs — top" className="hidden lg:block">
              <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-20 w-auto" />
            </a>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Senior software engineer<br />&amp; consultant
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: BLUE }}>
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Available for new projects
            </p>

            <nav className="mt-10 hidden lg:block" aria-label="Sections">
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="group flex items-baseline gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-400 transition-colors hover:text-neutral-900">
                      <span className="text-[11px] tabular-nums" style={{ color: BLUE }}>{l.n}</span>
                      <span className="border-b border-transparent transition-colors group-hover:border-neutral-900">{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 lg:mt-0">
            <BookACall className={`${btnSolid} hidden lg:inline-flex`} withIcon={false} />
            <div className="mt-6 space-y-1 text-xs text-neutral-500">
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-neutral-900">{siteConfig.email}</a>
              </p>
              <p>{siteConfig.location}</p>
              <p className="flex gap-3 pt-1">
                <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-neutral-900">LinkedIn</a>
                {siteConfig.githubUrl && (
                  <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-neutral-900">GitHub</a>
                )}
              </p>
            </div>
          </div>
        </aside>

        {/* Content column */}
        <main className="px-5 pb-16 lg:col-span-8 lg:px-12 lg:pb-24">
          {/* Intro */}
          <section className="pt-10 lg:pt-16" aria-labelledby="bf-hero-heading">
            <h1 id="bf-hero-heading" className="font-sans text-4xl font-extrabold uppercase leading-[0.98] tracking-tighter sm:text-5xl lg:text-6xl">
              I build the software your business <span style={{ color: BLUE }}>runs on.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 lg:text-lg">
              I&apos;m <strong className="font-semibold text-neutral-900">Jhoenil Wahid</strong> — web
              apps, mobile apps, and systems that replace manual work with real-time operations.
              From first line of code to production, for growing businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
              <BookACall className={btnSolid} withIcon={false} />
              <a href="#bf-work" className={btnOutline}>Current work ↓</a>
            </div>

            {/* Metrics strip */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-y border-neutral-900 py-6 md:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-2xl font-extrabold tracking-tighter lg:text-3xl">{m.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-neutral-500">{m.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Current work */}
          <section id="bf-work" className="scroll-mt-20 pt-16 lg:scroll-mt-8 lg:pt-20" aria-label="Currently working with">
            <SectionTitle n="01">Currently working with</SectionTitle>
            <div className="space-y-8">
              {currentWork.map((item) => (
                <article key={item.client} className="grid gap-2 md:grid-cols-12 md:gap-6">
                  <div className="md:col-span-4">
                    <h3 className="font-sans text-base font-extrabold uppercase tracking-tight">{item.client}</h3>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: BLUE }}>
                      {item.role}
                    </p>
                    <span
                      className={`mt-2 inline-block border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        item.status === 'Delivered'
                          ? 'border-neutral-300 text-neutral-400'
                          : 'border-emerald-600 text-emerald-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-600 md:col-span-8">{item.outcome}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Services */}
          <section id="bf-services" className="scroll-mt-20 pt-16 lg:scroll-mt-8 lg:pt-20" aria-label="Services">
            <SectionTitle n="02">What I do</SectionTitle>
            <div className="space-y-10">
              {services.map((service, i) => (
                <article key={service.title} className="grid gap-3 md:grid-cols-12 md:gap-6">
                  <div className="text-4xl font-extrabold tracking-tighter text-neutral-200 md:col-span-2 lg:text-5xl">
                    0{i + 1}
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="font-sans text-lg font-extrabold uppercase tracking-tight">{service.title}</h3>
                    <p className="mt-1 text-sm font-semibold" style={{ color: BLUE }}>{service.outcome}</p>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">{service.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.capabilities.map((cap) => (
                        <li key={cap} className="border border-neutral-300 px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-500">
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Portfolio — magazine stack */}
          <section id="bf-portfolio" className="scroll-mt-20 pt-16 lg:scroll-mt-8 lg:pt-20" aria-label="Portfolio">
            <SectionTitle n="03">Shipped projects, real results</SectionTitle>
            <div className="space-y-12">
              {projects.map((project, i) => {
                const isPrivate = !project.url;
                const Wrap: React.ElementType = isPrivate ? 'div' : 'a';
                const linkProps = isPrivate
                  ? {}
                  : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
                return (
                  <Wrap key={project.title} {...linkProps} className="group block">
                    <div className="overflow-hidden border border-neutral-900">
                      <div className="aspect-[16/9] bg-neutral-100">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-[11px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, '0')}</span>
                          <h3 className="font-sans text-lg font-extrabold uppercase tracking-tight">{project.title}</h3>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">{project.category}</span>
                        </div>
                        <p className="mt-1 text-sm font-semibold" style={{ color: BLUE }}>{project.outcome}</p>
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">{project.description}</p>
                      </div>
                      <span className="mt-1 flex-shrink-0">
                        {isPrivate ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                            <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Private
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors group-hover:text-[hsl(212_74%_45%)]">
                            View <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        )}
                      </span>
                    </div>
                  </Wrap>
                );
              })}
            </div>
          </section>

          {/* About */}
          <section id="bf-about" className="scroll-mt-20 pt-16 lg:scroll-mt-8 lg:pt-20" aria-label="About">
            <SectionTitle n="04">About</SectionTitle>
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="aspect-[4/5] overflow-hidden border border-neutral-900">
                  <img src="/jhoenil.png" alt="Jhoenil Wahid — software engineer" loading="lazy" className="h-full w-full object-cover object-center" />
                </div>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-sans max-w-lg text-2xl font-extrabold uppercase leading-tight tracking-tighter lg:text-3xl">
                  Turning complex problems into simple, working systems.
                </h3>
                <div className="mt-4 max-w-xl space-y-4 text-sm leading-relaxed text-neutral-600">
                  <p>
                    With 5+ years in software engineering and technical consulting, I&apos;ve helped
                    startups, agencies, and enterprises build and scale their products — often as
                    the sole developer trusted with the whole platform.
                  </p>
                  <p>
                    I started as a full-stack developer and grew into cloud architecture, technical
                    leadership, and AI integration. I care about clean code, performance, and
                    technology that makes a measurable difference to the business.
                  </p>
                </div>
                <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className={`${btnOutline} mt-6`}>
                  View resume
                </a>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="bf-contact" className="scroll-mt-20 pt-16 lg:scroll-mt-8 lg:pt-20" aria-label="Contact">
            <SectionTitle n="05">Let&apos;s talk</SectionTitle>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-sans text-2xl font-extrabold uppercase leading-tight tracking-tighter lg:text-3xl">
                  Have a project or an operation to modernize?
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                  The fastest way to start is a quick call — we&apos;ll figure out whether I&apos;m
                  the right fit in 20 minutes. Prefer to write first? Use the form.
                </p>
                <div className="mt-6">
                  <BookACall className={btnSolid} withIcon={false} />
                </div>
              </div>
              <BetterFableContactForm />
            </div>
          </section>

          <footer className="mt-20 border-t border-neutral-200 pt-6 text-[11px] uppercase tracking-[0.15em] text-neutral-400">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} Jhoenil Labs</span>
              <span className="flex gap-4">
                <Link to="/" className="underline underline-offset-4 hover:text-neutral-900">Main design</Link>
                <Link to="/fable" className="underline underline-offset-4 hover:text-neutral-900">Fable design</Link>
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BetterFable;
