import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Lock } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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
 * /deck — genuinely different interaction model: a horizontal slide deck
 * (CSS scroll-snap, not vertical scroll), navigated by swipe, arrow buttons,
 * on-screen dots, or the keyboard's left/right arrows — like presenting a
 * pitch deck rather than browsing a page. Forces one job per screen, which
 * also serves conversion (no scroll fatigue). The chrome (logo, CTA, nav)
 * floats above the slides on translucent pills so it stays legible over both
 * the light slides and the dark closing slide.
 *
 * Known nuance: slide 5 nests an Embla carousel for the portfolio. Its drag
 * gesture is self-contained via Embla's own touch handling, but the primary,
 * reliable way to browse it is the visible prev/next buttons — swipe is a
 * bonus, not the only path.
 */

const BLUE = 'hsl(212 74% 45%)';

const btnSolid =
  'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[hsl(212_74%_45%)]';
const btnLight =
  'inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100';

const SLIDE_COUNT = 7;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SlideLabel = ({ n, title }: { n: string; title: string }) => (
  <div className="mb-8 flex items-center gap-3 md:mb-12">
    <span className="text-xs font-medium tabular-nums" style={{ color: BLUE }}>{n}</span>
    <span className="h-px w-8 bg-neutral-300" />
    <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">{title}</span>
  </div>
);

const DeckContactForm = ({ dark = false }: { dark?: boolean }) => {
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

  const fieldCls = cn(
    'w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none',
    dark
      ? 'border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-white/60'
      : 'border-neutral-300 bg-white placeholder:text-neutral-400 focus:border-neutral-900',
  );

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2.5" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="Your name" aria-label="Your name" value={formData.name} onChange={handleChange} required className={fieldCls} />
      <input type="email" name="email" placeholder="Your email address" aria-label="Your email address" value={formData.email} onChange={handleChange} required className={fieldCls} />
      <textarea name="message" placeholder="What do you want to build?" aria-label="Your message" value={formData.message} onChange={handleChange} required className={cn(fieldCls, 'min-h-20 resize-y')} />
      <button type="submit" className={cn(dark ? btnLight : btnSolid, 'w-full')}>Send message</button>
    </form>
  );
};

const Deck = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Tracks where we're navigating TO, not just where the scroll happens to be —
  // reading el.scrollLeft mid-animation is unreliable for rapid key/dot input.
  const targetIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isAnimatingRef.current) return;
      const idx = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
      const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, idx));
      targetIndexRef.current = clamped;
      setActive(clamped);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Drives scrollLeft by hand via rAF instead of native scrollTo({behavior:'smooth'}).
  // Native smooth-scroll gets interrupted by this page's CSS scroll-snap when a
  // second call arrives before the first settles, silently stranding the
  // container between slides. Manually stepping scrollLeft each frame avoids
  // that interaction entirely and always lands exactly on the target slide.
  const scrollToIndex = (idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, idx));
    targetIndexRef.current = clamped;
    setActive(clamped);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const endX = clamped * el.clientWidth;
    // rAF never fires on a hidden/backgrounded tab (per spec) — jump instantly
    // rather than silently stalling until the tab regains visibility.
    if (prefersReducedMotion() || document.hidden) {
      isAnimatingRef.current = false;
      el.scrollLeft = endX;
      return;
    }

    const startX = el.scrollLeft;
    const distance = endX - startX;
    const duration = 420;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    isAnimatingRef.current = true;
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      el.scrollLeft = startX + distance * easeOutCubic(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        isAnimatingRef.current = false;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToIndex(targetIndexRef.current + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToIndex(targetIndexRef.current - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative h-svh w-full overflow-hidden bg-white font-sans text-neutral-900 antialiased [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans">
      {/* Floating chrome — always legible over any slide */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4 md:p-6">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToIndex(0); }} className="pointer-events-auto flex items-center rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
          <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-6 w-auto" />
        </a>
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="hidden rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium tabular-nums text-neutral-500 shadow-sm backdrop-blur sm:inline-block">
            {String(active + 1).padStart(2, '0')} / {String(SLIDE_COUNT).padStart(2, '0')}
          </span>
          <BookACall className={cn(btnSolid, 'shadow-sm')} label="Book a call" withIcon={false} />
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => scrollToIndex(targetIndexRef.current - 1)}
        disabled={active === 0}
        aria-label="Previous slide"
        className="pointer-events-auto fixed left-3 top-1/2 z-50 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 shadow-sm backdrop-blur transition-opacity hover:bg-white disabled:opacity-0 md:flex"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        onClick={() => scrollToIndex(targetIndexRef.current + 1)}
        disabled={active === SLIDE_COUNT - 1}
        aria-label="Next slide"
        className="pointer-events-auto fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 shadow-sm backdrop-blur transition-opacity hover:bg-white disabled:opacity-0 md:flex"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Dot nav */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center md:bottom-6">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              className={cn('h-1.5 rounded-full transition-all', active === i ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400')}
            />
          ))}
        </div>
      </div>

      {/* Slides */}
      <div ref={containerRef} className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden">
        {/* 1 — Title */}
        <section className="flex h-full w-full flex-shrink-0 snap-start items-center overflow-y-auto px-6 py-24 md:px-20">
          <div className="mx-auto w-full max-w-3xl">
            <p className="flex items-center gap-2.5 text-sm text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for new projects
            </p>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-7xl">
              I build the software your business <span style={{ color: BLUE }}>runs on.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
              I&apos;m <strong className="font-medium text-neutral-900">Jhoenil Wahid</strong> — web apps,
              mobile apps, and systems that replace manual work with real-time operations.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BookACall className={btnSolid} label="Book a discovery call" />
              <button onClick={() => scrollToIndex(1)} className="flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900">
                See how <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 2 — Paid client work (the headline proof, not the free projects) */}
        <section className="flex h-full w-full flex-shrink-0 snap-start items-center overflow-y-auto px-6 py-24 md:px-20">
          <div className="mx-auto w-full max-w-4xl">
            <SlideLabel n="02" title="Client work, right now" />
            <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
              Trusted with the systems paying businesses run on.
            </h2>
            <div className="mt-10 divide-y divide-neutral-200">
              {currentWork.map((item) => (
                <div key={item.client} className="grid gap-2 py-6 first:pt-0 md:grid-cols-12 md:items-baseline md:gap-6">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] md:col-span-3">{item.client}</h3>
                  <p className="text-sm md:col-span-6" style={{ color: BLUE }}>{item.outcome}</p>
                  <div className="flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end">
                    <span className="text-xs font-medium text-neutral-400">{item.status}</span>
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — Services */}
        <section className="flex h-full w-full flex-shrink-0 snap-start items-center overflow-y-auto px-6 py-24 md:px-20">
          <div className="mx-auto w-full max-w-4xl">
            <SlideLabel n="03" title="What I do" />
            <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
              Three ways I help businesses move faster.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {services.map((s, i) => (
                <div key={s.title}>
                  <span className="text-xs font-medium tabular-nums text-neutral-300">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: BLUE }}>{s.outcome}</p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — Proof */}
        <section className="flex h-full w-full flex-shrink-0 snap-start items-center overflow-y-auto px-6 py-24 md:px-20">
          <div className="mx-auto w-full max-w-4xl">
            <SlideLabel n="04" title="Track record" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl">{m.value}</div>
                  <div className="mt-3 text-sm text-neutral-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — Selected work (nested carousel) */}
        <section className="flex h-full w-full flex-shrink-0 snap-start items-center overflow-y-auto px-6 py-24 md:px-20">
          <div className="mx-auto w-full max-w-5xl">
            <SlideLabel n="05" title="Also shipped" />
            <h2 className="mb-8 max-w-xl text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
              Civic and community projects.
            </h2>
            <Carousel opts={{ align: 'start' }} className="w-full">
              <CarouselContent>
                {projects.map((project) => {
                  const isPrivate = !project.url;
                  return (
                    <CarouselItem key={project.title} className="basis-[85%] sm:basis-1/2 lg:basis-[38%]">
                      <a
                        href={project.url ?? undefined}
                        target={project.url ? '_blank' : undefined}
                        rel={project.url ? 'noopener noreferrer' : undefined}
                        className={cn('group block h-full overflow-hidden rounded-2xl border border-neutral-200', isPrivate && 'pointer-events-none')}
                      >
                        <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                          <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                        </div>
                        <div className="p-5">
                          <h3 className="flex items-center justify-between gap-2 text-sm font-semibold tracking-[-0.01em]">
                            {project.title}
                            {isPrivate ? <Lock className="h-3.5 w-3.5 flex-shrink-0 text-neutral-300" /> : <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-neutral-300 transition-colors group-hover:text-[hsl(212_74%_45%)]" />}
                          </h3>
                          <p className="mt-1.5 text-xs font-medium" style={{ color: BLUE }}>{project.outcome}</p>
                        </div>
                      </a>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="mt-6 flex items-center gap-3">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
                <span className="text-xs text-neutral-400">Drag, or use the arrows</span>
              </div>
            </Carousel>
          </div>
        </section>

        {/* 6 — About */}
        <section className="flex h-full w-full flex-shrink-0 snap-start items-center overflow-y-auto px-6 py-24 md:px-20">
          <div className="mx-auto grid w-full max-w-4xl items-center gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <img src="/jhoenil.png" alt="Jhoenil Wahid — software engineer" loading="lazy" className="aspect-[4/5] w-full rounded-2xl border border-neutral-200 object-cover object-center" />
            </div>
            <div className="md:col-span-3">
              <SlideLabel n="06" title="About" />
              <h2 className="max-w-md text-2xl font-semibold leading-tight tracking-[-0.01em] md:text-3xl">
                Turning complex problems into simple, working systems.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                5+ years in software engineering and technical consulting, helping startups, agencies,
                and enterprises build and scale their products — often as the sole developer trusted
                with the whole platform.
              </p>
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-[hsl(212_74%_45%)]">
                View resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* 7 — Contact (inverted closer) */}
        <section className="flex h-full w-full flex-shrink-0 snap-start items-center overflow-y-auto bg-neutral-900 px-6 py-24 text-white md:px-20">
          <div className="mx-auto grid w-full max-w-4xl items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">07 — Let&apos;s talk</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
                Have a project or an operation to modernize?
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                20 minutes, no pitch deck — well, one more than this one. Let&apos;s see if it&apos;s a fit.
              </p>
              <div className="mt-7">
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
              <p className="mt-10 text-xs text-white/30">
                Other takes:{' '}
                <Link to="/" className="underline underline-offset-2 hover:text-white/60">Main</Link>{' · '}
                <Link to="/bento" className="underline underline-offset-2 hover:text-white/60">Bento</Link>{' · '}
                <Link to="/console" className="underline underline-offset-2 hover:text-white/60">Console</Link>{' · '}
                <Link to="/flagship" className="underline underline-offset-2 hover:text-white/60">Flagship</Link>
              </p>
            </div>
            <DeckContactForm dark />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Deck;
