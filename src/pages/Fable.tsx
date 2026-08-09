import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock, Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BookACall from '@/components/BookACall';
import { currentWork, metrics, projects, services, siteConfig } from '@/data/content';

/**
 * /fable — alternate design take for comparison with the main page.
 * Same content source (src/data/content.ts) and locked decisions (outcome-led,
 * book-a-call primary, no fabricated proof) — opposite art direction:
 * light-mode Swiss "index sheet". All-sans, sharp corners, no shadows,
 * visible 1px grid rules, uppercase micro-labels, work as archive tables.
 */

const BLUE = 'hsl(212 74% 45%)';
const btnSolid =
  'inline-flex items-center justify-center gap-2 border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[hsl(212_74%_45%)] hover:border-[hsl(212_74%_45%)]';
const btnOutline =
  'inline-flex items-center justify-center gap-2 border border-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white';

const Rule = () => <div className="h-px w-full bg-neutral-900" aria-hidden="true" />;

const SectionHead = ({ index, title }: { index: string; title: string }) => (
  <div className="grid grid-cols-12 items-baseline gap-4 px-4 py-4 md:px-6">
    <span className="col-span-2 text-xs font-semibold tabular-nums text-[hsl(212_74%_45%)] md:col-span-1">
      {index}
    </span>
    <h2 className="col-span-10 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 md:col-span-11">
      {title}
    </h2>
  </div>
);

const navLinks = [
  { href: '#f-work', label: 'Index' },
  { href: '#f-services', label: 'Services' },
  { href: '#f-portfolio', label: 'Archive' },
  { href: '#f-about', label: 'Profile' },
  { href: '#f-contact', label: 'Contact' },
];

const FableHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900 bg-white">
      <div className="flex items-stretch justify-between">
        <a
          href="#top"
          className="flex items-center border-r border-neutral-900 px-4 py-4 text-sm font-bold uppercase tracking-tight md:px-6"
          aria-label="Jhoenil Labs — top"
        >
          Jhoenil&nbsp;Labs<span style={{ color: BLUE }}>.</span>
        </a>

        <nav className="hidden flex-1 items-stretch md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex items-center border-r border-neutral-900 px-5 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-stretch">
          <BookACall
            className="hidden items-center gap-2 bg-neutral-900 px-6 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[hsl(212_74%_45%)] md:inline-flex"
          />
          <BookACall
            className="inline-flex items-center bg-neutral-900 px-4 text-[11px] font-semibold uppercase tracking-wider text-white md:hidden"
            withIcon={false}
          />
          <button
            className="flex items-center border-l border-neutral-900 px-4 text-neutral-900 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-neutral-900 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block border-b border-neutral-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700 last:border-b-0 hover:bg-neutral-100"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

const FableContactForm = () => {
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
    'w-full border border-neutral-900 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(212_74%_45%)]';

  return (
    <form onSubmit={handleSubmit} className="space-y-3" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label htmlFor="f-name" className="sr-only">Your name</label>
        <input id="f-name" type="text" name="name" placeholder="YOUR NAME" value={formData.name} onChange={handleChange} required className={fieldCls} />
      </div>
      <div>
        <label htmlFor="f-email" className="sr-only">Your email address</label>
        <input id="f-email" type="email" name="email" placeholder="YOUR EMAIL" value={formData.email} onChange={handleChange} required className={fieldCls} />
      </div>
      <div>
        <label htmlFor="f-message" className="sr-only">Your message</label>
        <textarea id="f-message" name="message" placeholder="WHAT DO YOU WANT TO BUILD?" value={formData.message} onChange={handleChange} required className={`min-h-32 resize-y ${fieldCls}`} />
      </div>
      <button type="submit" className={`${btnSolid} w-full`}>Send message</button>
    </form>
  );
};

const Fable = () => {
  return (
    <div id="top" className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans text-neutral-900 antialiased">
      <FableHeader />

      <main className="flex-grow">
        {/* Hero — spec-sheet */}
        <section aria-labelledby="f-hero-heading" className="border-b border-neutral-900">
          <div className="px-4 pb-10 pt-10 md:px-6 md:pb-16 md:pt-16">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Senior software engineer &amp; consultant /{' '}
              <span style={{ color: BLUE }}>available for new projects</span>
            </p>
            <h1
              id="f-hero-heading"
              className="max-w-5xl font-sans text-[11vw] font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl"
            >
              I build the software your business{' '}
              <span style={{ color: BLUE }}>runs on.</span>
            </h1>
          </div>

          {/* spec row */}
          <div className="grid grid-cols-1 border-t border-neutral-900 md:grid-cols-3">
            <div className="border-b border-neutral-900 p-4 md:border-b-0 md:border-r md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Who</p>
              <p className="mt-2 text-sm leading-relaxed">
                <strong>Jhoenil Wahid</strong> — web apps, mobile apps, and systems that replace
                manual work with real-time operations.
              </p>
            </div>
            <div className="border-b border-neutral-900 p-4 md:border-b-0 md:border-r md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Where</p>
              <p className="mt-2 text-sm leading-relaxed">{siteConfig.location}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 p-4 md:p-6">
              <BookACall className={btnSolid} withIcon={false} />
              <a href="#f-work" className={btnOutline}>Current work ↓</a>
            </div>
          </div>
        </section>

        {/* Metrics — counter cells */}
        <section aria-label="Track record" className="border-b border-neutral-900">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`p-4 md:p-6 ${i % 2 === 0 ? 'border-r border-neutral-900' : ''} ${
                  i < 2 ? 'border-b border-neutral-900 md:border-b-0' : ''
                } ${i === 1 ? 'md:border-r' : ''} ${i === 2 ? 'md:border-r' : ''}`}
              >
                <div className="text-3xl font-extrabold tracking-tighter md:text-5xl">{m.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.15em] text-neutral-500">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Current work — index table */}
        <section id="f-work" aria-labelledby="f-work-heading" className="scroll-mt-16 border-b border-neutral-900">
          <SectionHead index="01" title="Currently working with" />
          <Rule />
          <h3 id="f-work-heading" className="sr-only">Current engagements</h3>
          {currentWork.map((item, i) => (
            <article
              key={item.client}
              className={`grid grid-cols-12 gap-x-4 gap-y-2 px-4 py-5 transition-colors hover:bg-neutral-50 md:items-baseline md:px-6 ${
                i > 0 ? 'border-t border-neutral-300' : ''
              }`}
            >
              <span className="col-span-2 text-xs tabular-nums text-neutral-400 md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="col-span-10 md:col-span-3">
                <h4 className="text-base font-bold uppercase tracking-tight">{item.client}</h4>
                <p className="text-xs uppercase tracking-[0.15em]" style={{ color: BLUE }}>{item.role}</p>
              </div>
              <p className="col-span-10 col-start-3 text-sm leading-relaxed text-neutral-600 md:col-span-6 md:col-start-auto">
                {item.outcome}
              </p>
              <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-auto md:text-right">
                <span
                  className={`inline-block border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                    item.status === 'Delivered'
                      ? 'border-neutral-400 text-neutral-500'
                      : 'border-emerald-600 text-emerald-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* Services — three bordered columns */}
        <section id="f-services" aria-labelledby="f-services-heading" className="scroll-mt-16 border-b border-neutral-900">
          <SectionHead index="02" title="What I do" />
          <Rule />
          <h3 id="f-services-heading" className="sr-only">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {services.map((service, i) => (
              <article
                key={service.title}
                className={`p-4 md:p-6 ${i < services.length - 1 ? 'border-b border-neutral-900 md:border-b-0 md:border-r' : ''}`}
              >
                <div className="text-5xl font-extrabold tracking-tighter text-neutral-200 md:text-7xl">
                  0{i + 1}
                </div>
                <h4 className="mt-4 text-lg font-bold uppercase tracking-tight">{service.title}</h4>
                <p className="mt-1 text-sm font-semibold" style={{ color: BLUE }}>{service.outcome}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{service.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="border border-neutral-300 px-2 py-0.5 text-[11px] uppercase tracking-wider text-neutral-500">
                      {cap}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Portfolio — archive rows with thumbnails */}
        <section id="f-portfolio" aria-labelledby="f-portfolio-heading" className="scroll-mt-16 border-b border-neutral-900">
          <SectionHead index="03" title="Archive — shipped projects, real results" />
          <Rule />
          <h3 id="f-portfolio-heading" className="sr-only">Portfolio</h3>
          {projects.map((project, i) => {
            const isPrivate = !project.url;
            const RowTag: React.ElementType = isPrivate ? 'div' : 'a';
            const linkProps = isPrivate
              ? {}
              : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
            return (
              <RowTag
                key={project.title}
                {...linkProps}
                className={`group grid grid-cols-12 gap-x-4 gap-y-3 px-4 py-5 transition-colors hover:bg-neutral-50 md:items-center md:px-6 ${
                  i > 0 ? 'border-t border-neutral-300' : ''
                }`}
              >
                <span className="col-span-2 text-xs tabular-nums text-neutral-400 md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="col-span-10 border border-neutral-900 md:col-span-2">
                  <div className="aspect-[16/10] bg-neutral-100">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-10 col-start-3 md:col-span-5 md:col-start-auto">
                  <h4 className="text-base font-bold uppercase tracking-tight">{project.title}</h4>
                  <p className="mt-1 text-sm font-semibold" style={{ color: BLUE }}>{project.outcome}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{project.description}</p>
                </div>
                <span className="col-span-6 col-start-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500 md:col-span-2 md:col-start-auto">
                  {project.category}
                </span>
                <span className="col-span-4 flex justify-end md:col-span-2">
                  {isPrivate ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Private
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-900 transition-colors group-hover:text-[hsl(212_74%_45%)]">
                      View <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  )}
                </span>
              </RowTag>
            );
          })}
        </section>

        {/* About — profile sheet */}
        <section id="f-about" aria-labelledby="f-about-heading" className="scroll-mt-16 border-b border-neutral-900">
          <SectionHead index="04" title="Profile" />
          <Rule />
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="border-b border-neutral-900 md:border-b-0 md:border-r">
              <div className="aspect-[4/5] md:aspect-auto md:h-full">
                <img
                  src="/jhoenil.png"
                  alt="Jhoenil Wahid — software engineer"
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="p-4 md:col-span-2 md:p-6">
              <h3 id="f-about-heading" className="max-w-xl font-sans text-2xl font-extrabold uppercase leading-tight tracking-tighter md:text-4xl">
                Turning complex problems into simple, working systems.
              </h3>
              <div className="mt-5 max-w-xl space-y-4 text-sm leading-relaxed text-neutral-600">
                <p>
                  With 5+ years in software engineering and technical consulting, I&apos;ve helped
                  startups, agencies, and enterprises build and scale their products — often as the
                  sole developer trusted with the whole platform.
                </p>
                <p>
                  I started as a full-stack developer and grew into cloud architecture, technical
                  leadership, and AI integration. I care about clean code, performance, and
                  technology that makes a measurable difference to the business.
                </p>
              </div>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className={`${btnOutline} mt-7`}>
                View resume
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="f-contact" aria-labelledby="f-contact-heading" className="scroll-mt-16">
          <SectionHead index="05" title="Contact" />
          <Rule />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-b border-neutral-900 p-4 md:border-b-0 md:border-r md:p-6">
              <h3 id="f-contact-heading" className="font-sans text-2xl font-extrabold uppercase leading-tight tracking-tighter md:text-4xl">
                Have a project or an operation to modernize?
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                The fastest way to start is a quick call — we&apos;ll figure out whether I&apos;m the
                right fit in 20 minutes. Prefer to write first? Use the form.
              </p>
              <div className="mt-7">
                <BookACall className={btnSolid} withIcon={false} />
              </div>
              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex gap-4">
                  <dt className="w-20 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Email</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.email}`} className="underline decoration-neutral-300 underline-offset-4 hover:decoration-[hsl(212_74%_45%)]">
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-20 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Social</dt>
                  <dd className="flex gap-4">
                    <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 underline-offset-4 hover:decoration-[hsl(212_74%_45%)]">
                      LinkedIn
                    </a>
                    {siteConfig.githubUrl && (
                      <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 underline-offset-4 hover:decoration-[hsl(212_74%_45%)]">
                        GitHub
                      </a>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="p-4 md:p-6">
              <FableContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 bg-neutral-900 text-white">
        <div className="flex flex-col gap-2 px-4 py-6 text-[11px] uppercase tracking-[0.15em] text-neutral-400 md:flex-row md:items-center md:justify-between md:px-6">
          <span>© {new Date().getFullYear()} Jhoenil Labs — All rights reserved</span>
          <span>
            Alternate design take —{' '}
            <Link to="/" className="text-white underline underline-offset-4 hover:text-neutral-300">
              view main design
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Fable;
