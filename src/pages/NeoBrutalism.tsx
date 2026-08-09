import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Lock, Menu, Star, X } from 'lucide-react';
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
 * /neo-brutalism — full build-out of gallery style 08.
 * Thick black borders, hard offset shadows (no blur), tilted sticker boxes,
 * a marquee ticker, dot-grid texture, and a loud yellow/pink/cyan palette.
 * Nothing here is soft — every surface has a border and a shadow you can see.
 */

const DOT_BG = { backgroundImage: 'radial-gradient(#00000022 1px, transparent 1px)', backgroundSize: '16px 16px' };

const btnSolid = 'inline-flex items-center justify-center gap-2 border-4 border-black bg-[#a5f3fc] px-6 py-3 text-sm font-black uppercase shadow-[6px_6px_0_#000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#000]';
const btnOutline = 'inline-flex items-center justify-center gap-2 border-4 border-black bg-white px-6 py-3 text-sm font-black uppercase shadow-[6px_6px_0_#000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#000]';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

const Marquee = () => (
  <div className="overflow-hidden whitespace-nowrap border-b-4 border-black bg-[#ff6b9d] py-2 text-xs font-black uppercase text-black">
    <span className="inline-block animate-[bmarquee_16s_linear_infinite]">
      {'★ NEW: PORTFOLIO REVAMPED ★ CURRENTLY BUILDING FOR I3PL AL ARABIA & SOLARTECH PH ★ AVAILABLE FOR NEW PROJECTS ★ '.repeat(2)}
    </span>
  </div>
);

const BrutalHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
          <a href="#top" className="flex items-center gap-2" aria-label={`${siteConfig.name} — top`}>
            <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-9 w-auto border-2 border-black" />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-black uppercase text-black transition-colors hover:text-[#ff6b9d]">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <BookACall className="hidden items-center border-2 border-black bg-[#fde047] px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0_#000] md:inline-flex" withIcon={false} label="Book a call" />
            <BookACall className="inline-flex items-center border-2 border-black bg-[#fde047] px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0_#000] md:hidden" withIcon={false} label="Book" />
            <button className="p-1 text-black md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t-2 border-black md:hidden">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-neutral-200 px-5 py-3 text-sm font-black uppercase">
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
      <Marquee />
    </header>
  );
};

const BrutalContactForm = () => {
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

  const fieldCls = 'w-full border-4 border-black bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-[#a5f3fc]';

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border-4 border-black bg-white p-5 shadow-[8px_8px_0_#000]" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="Name" aria-label="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      <input type="email" name="email" placeholder="Email" aria-label="Your email address" value={formData.email} onChange={handleChange} required className={fieldCls} />
      <textarea name="message" placeholder="What do you want to build?" aria-label="Your message" value={formData.message} onChange={handleChange} required className={cn(fieldCls, 'min-h-28 resize-y')} />
      <button type="submit" className={cn(btnSolid, 'w-full')}>Send message</button>
    </form>
  );
};

const NeoBrutalism = () => {
  const featuredProjects = projects.filter((p) => p.image !== '/placeholder.svg');
  const archiveProjects = projects.filter((p) => p.image === '/placeholder.svg');
  const tiltCycle = ['-rotate-1', 'rotate-1', '-rotate-2'];

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-white font-sans text-black antialiased">
      <BrutalHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b-4 border-black" style={DOT_BG}>
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <span className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0_#000]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available now
            </span>

            <div className="max-w-2xl">
              <div className="-rotate-1 inline-block border-4 border-black bg-white px-4 py-2 text-3xl font-black uppercase shadow-[6px_6px_0_#000] sm:text-4xl md:text-5xl">
                Software your
              </div>
              <div className="relative mt-3 rotate-1 inline-block border-4 border-black bg-[#fde047] px-4 py-2 text-3xl font-black uppercase shadow-[6px_6px_0_#000] sm:text-4xl md:text-5xl">
                business runs on.
                <div className="absolute -right-4 -top-5 flex h-11 w-11 rotate-12 items-center justify-center rounded-full border-2 border-black bg-[#ff6b9d]">
                  <Star className="h-5 w-5 fill-white text-black" />
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-md border-2 border-black bg-white p-4 text-sm leading-relaxed shadow-[4px_4px_0_#000]">
              I&apos;m {siteConfig.name} — web apps, mobile apps, and systems that replace manual
              work with real-time operations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookACall className={btnSolid} label="Book a call" withIcon={false} />
              <a href="#portfolio" className={btnOutline}>See the work</a>
            </div>
          </div>
        </section>

        {/* CURRENTLY WORKING WITH */}
        <section id="work" className="scroll-mt-16 border-b-4 border-black bg-[#fef9e7]">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <h2 className="mb-10 inline-block -rotate-1 border-4 border-black bg-white px-4 py-2 text-2xl font-black uppercase shadow-[5px_5px_0_#000] md:text-3xl">
              Currently working with
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {currentWork.map((item, i) => (
                <div key={item.client} className={cn('border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]', tiltCycle[i % tiltCycle.length])}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="border-2 border-black bg-[#a5f3fc] px-2 py-0.5 text-[10px] font-black uppercase">{item.role}</span>
                    <span className="text-[10px] font-black uppercase text-neutral-500">{item.status}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-black uppercase">{item.client}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-16 border-b-4 border-black">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <h2 className="mb-10 inline-block rotate-1 border-4 border-black bg-[#a5f3fc] px-4 py-2 text-2xl font-black uppercase shadow-[5px_5px_0_#000] md:text-3xl">
              What I do
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {services.map((s, i) => (
                <div key={s.title} className={cn('flex flex-col border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]', tiltCycle[(i + 1) % tiltCycle.length])}>
                  <span className="w-fit border-2 border-black bg-[#fde047] px-2 py-0.5 text-xs font-black">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-black uppercase">{s.title}</h3>
                  <p className="mt-1 text-sm font-black text-[#e5342b]">{s.outcome}</p>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-neutral-700">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t-2 border-black pt-3">
                    {s.capabilities.map((cap) => (
                      <span key={cap} className="border-2 border-black bg-[#f9a8d4] px-2 py-0.5 text-[10px] font-bold uppercase">{cap}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="border-b-4 border-black bg-black py-12">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {metrics.map((m, i) => {
                const colors = ['#fde047', '#a5f3fc', '#ff6b9d', '#fde047'];
                return (
                  <div key={m.label} className="border-4 border-black p-4 text-center shadow-[5px_5px_0_#fff]" style={{ backgroundColor: colors[i % colors.length] }}>
                    <div className="text-2xl font-black">{m.value}</div>
                    <div className="mt-1 text-[10px] font-black uppercase leading-tight">{m.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="scroll-mt-16 border-b-4 border-black">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <h2 className="mb-10 inline-block -rotate-1 border-4 border-black bg-[#ff6b9d] px-4 py-2 text-2xl font-black uppercase text-white shadow-[5px_5px_0_#000] md:text-3xl">
              Selected work
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col border-4 border-black bg-white shadow-[6px_6px_0_#000] transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#000]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b-4 border-black bg-neutral-100">
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover object-top" />
                    <span className="absolute left-2 top-2 border-2 border-black bg-[#fde047] px-2 py-0.5 text-[10px] font-black uppercase">{project.category}</span>
                  </div>
                  <div className="flex flex-grow flex-col p-4">
                    <h3 className="flex items-center justify-between gap-2 text-sm font-black uppercase">
                      {project.title}
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    </h3>
                    <p className="mt-1.5 text-xs font-black text-[#e5342b]">{project.outcome}</p>
                  </div>
                </a>
              ))}
              {archiveProjects.map((project) => {
                const isPrivate = !project.url;
                const Wrap: React.ElementType = isPrivate ? 'div' : 'a';
                const linkProps = isPrivate ? {} : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
                return (
                  <Wrap key={project.title} {...linkProps} className="flex flex-col justify-between border-4 border-black bg-[#f5f5f5] p-5 shadow-[6px_6px_0_#000]">
                    <div>
                      <h3 className="text-sm font-black uppercase">{project.title}</h3>
                      <p className="mt-1.5 text-xs font-black text-[#e5342b]">{project.outcome}</p>
                    </div>
                    <span className="mt-4 flex items-center gap-1.5 text-[10px] font-black uppercase text-neutral-600">
                      {isPrivate ? (<><Lock className="h-3 w-3" /> Private system</>) : (<>Visit <ArrowUpRight className="h-3 w-3" /></>)}
                    </span>
                  </Wrap>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="border-b-4 border-black bg-[#fef9e7]">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="border-4 border-black bg-white p-7 shadow-[8px_8px_0_#000]">
              <span className="w-fit border-2 border-black bg-[#a5f3fc] px-2 py-0.5 text-xs font-black uppercase">About</span>
              <h2 className="mt-3 max-w-lg text-2xl font-black uppercase leading-tight md:text-3xl">
                Turning complex problems into simple, working systems.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-700">
                5+ years in software engineering and technical consulting — often the sole developer
                trusted with the whole platform. I care about clean code, performance, and technology
                that makes a measurable difference to the business.
              </p>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className={cn(btnOutline, 'mt-6 inline-flex w-fit')}>
                View resume
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <span className="w-fit border-2 border-black bg-[#fde047] px-2 py-0.5 text-xs font-black uppercase">Let&apos;s talk</span>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight md:text-4xl">
                  Have a project to modernize?
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-700">
                  The fastest way to start is a quick call — 20 minutes, no pitch deck.
                </p>
                <div className="mt-6">
                  <BookACall className={btnSolid} label="Book a call" withIcon={false} />
                </div>
                <div className="mt-8 space-y-1.5 text-sm font-bold">
                  <p><a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a></p>
                  <p><a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn ↗</a></p>
                </div>
              </div>
              <BrutalContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs font-black uppercase md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span className="flex flex-wrap items-center gap-4">
            <Link to="/" className="hover:underline">Main</Link>
            <Link to="/gallery" className="hover:underline">Gallery</Link>
            <Link to="/swiss-minimalist" className="hover:underline">Swiss</Link>
            <Link to="/sketch" className="hover:underline">Sketch</Link>
            <ArrowRight className="hidden h-3.5 w-3.5 md:block" aria-hidden="true" />
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes bmarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default NeoBrutalism;
