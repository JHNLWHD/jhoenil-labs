import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  Command as CommandIcon,
  ExternalLink,
  Github,
  Grid2x2,
  Layers,
  Linkedin,
  Lock,
  Mail,
  Search,
  User,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import BookACall from '@/components/BookACall';
import {
  currentWork,
  metrics,
  projects,
  services,
  siteConfig,
} from '@/data/content';

/**
 * /console — genuinely different information architecture from every other
 * take: a tabbed app-shell (sidebar + panel), not a vertical stack of
 * sections. Content is swapped in place, and a real Cmd+K command palette
 * (existing cmdk primitives already in the design system) lets visitors jump
 * anywhere or trigger the primary CTA without scrolling. The portfolio is
 * presented as a "deployed apps" status list — a dashboard motif that
 * happens to mirror the actual ops systems Jhoenil builds for clients.
 */

const BLUE = 'hsl(212 74% 45%)';

type ViewId = 'overview' | 'work' | 'services' | 'portfolio' | 'about' | 'contact';

const views: { id: ViewId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Grid2x2 },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'portfolio', label: 'Portfolio', icon: ExternalLink },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const btnSolid =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[hsl(212_74%_45%)]';

const statusDot: Record<string, string> = {
  Ongoing: 'bg-emerald-500',
  'In progress': 'bg-amber-500',
  Delivered: 'bg-neutral-300',
};

const Panel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('rounded-xl border border-neutral-200 bg-white', className)}>{children}</div>
);

const Console = () => {
  const [view, setView] = useState<ViewId>('overview');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  const goTo = (id: ViewId) => {
    setView(id);
    setPaletteOpen(false);
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setPaletteOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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

  const linkableProjects = useMemo(() => projects.filter((p) => p.url), []);

  return (
    <div className="flex h-svh w-full flex-col overflow-hidden bg-[#f7f7f5] font-sans text-neutral-900 antialiased [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans">
      {/* Top bar */}
      <header className="flex flex-shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/jhoenil_labs.png" alt="Jhoenil Labs" className="h-7 w-auto" />
          <span className="hidden text-sm text-neutral-400 sm:inline">/</span>
          <span className="hidden text-sm font-medium text-neutral-500 sm:inline">
            {views.find((v) => v.id === view)?.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:border-neutral-300 hover:text-neutral-600"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Search or jump to…</span>
            <kbd className="ml-1 hidden rounded border border-neutral-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 sm:inline">⌘K</kbd>
          </button>
          <BookACall className={cn(btnSolid, 'hidden md:inline-flex')} label="Book a discovery call" />
          <BookACall className="inline-flex items-center rounded-lg bg-neutral-900 px-3 py-2 text-xs font-medium text-white md:hidden" withIcon={false} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar (desktop) */}
        <nav aria-label="Sections" className="hidden w-56 flex-shrink-0 flex-col justify-between border-r border-neutral-200 bg-white p-4 md:flex">
          <div className="space-y-1">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => goTo(v.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  view === v.id ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
                )}
                aria-current={view === v.id ? 'page' : undefined}
              >
                <v.icon className="h-4 w-4" aria-hidden="true" />
                {v.label}
              </button>
            ))}
          </div>
          <div className="space-y-3 border-t border-neutral-200 pt-4">
            <p className="flex items-center gap-2 text-xs font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for new projects
            </p>
            <p className="text-xs text-neutral-400">{siteConfig.location}</p>
          </div>
        </nav>

        {/* Main panel */}
        <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8">
          {view === 'overview' && (
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Overview</p>
              <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-4xl">
                I build the software your business <span style={{ color: BLUE }}>runs on.</span>
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-neutral-600">
                I&apos;m <strong className="font-medium text-neutral-900">Jhoenil Wahid</strong> — a senior
                engineer building web apps, mobile apps, and systems that replace manual work with
                real-time operations.
              </p>
              <div className="mt-6">
                <BookACall className={btnSolid} label="Book a discovery call" />
              </div>

              <button onClick={() => goTo('work')} className="group mt-10 flex w-full flex-col items-start gap-1 rounded-xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-neutral-900 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-neutral-500">
                  Currently building for{' '}
                  <strong className="font-semibold text-neutral-900">i3pl Al Arabia</strong>,{' '}
                  <strong className="font-semibold text-neutral-900">SolarTech PH</strong>, and{' '}
                  <strong className="font-semibold text-neutral-900">FMCG distributor systems</strong>
                </span>
                <span className="flex flex-shrink-0 items-center gap-1 text-xs font-medium text-neutral-400 group-hover:text-neutral-900">
                  View <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {metrics.map((m) => (
                  <Panel key={m.label} className="p-4">
                    <div className="text-xl font-semibold tracking-[-0.02em]">{m.value}</div>
                    <div className="mt-1 text-xs text-neutral-500">{m.label}</div>
                  </Panel>
                ))}
              </div>

              <p className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Jump to</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {views.filter((v) => ['work', 'services', 'portfolio'].includes(v.id)).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => goTo(v.id)}
                    className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-neutral-900"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium">
                      <v.icon className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                      {v.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-300 transition-colors group-hover:text-[hsl(212_74%_45%)]" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'work' && (
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Currently working with</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">Active engagements</h1>
              <div className="mt-6 space-y-3">
                {currentWork.map((item) => (
                  <Panel key={item.client} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold tracking-[-0.01em]">{item.client}</h3>
                        <p className="mt-0.5 text-sm" style={{ color: BLUE }}>{item.role}</p>
                      </div>
                      <span className="flex flex-shrink-0 items-center gap-1.5 text-xs font-medium text-neutral-500">
                        <span className={cn('h-1.5 w-1.5 rounded-full', statusDot[item.status])} />
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.outcome}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">{tag}</span>
                      ))}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          )}

          {view === 'services' && <ServicesView />}

          {view === 'portfolio' && (
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Deployed</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">Portfolio</h1>
              <div className="mt-6 space-y-2">
                {projects.map((project) => {
                  const isPrivate = !project.url;
                  const Row: React.ElementType = isPrivate ? 'div' : 'a';
                  const linkProps = isPrivate ? {} : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };
                  return (
                    <Row key={project.title} {...linkProps} className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-900">
                      <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-sm font-semibold tracking-[-0.01em]">{project.title}</h3>
                          <span className={cn('flex flex-shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium', isPrivate ? 'bg-neutral-100 text-neutral-400' : 'bg-emerald-50 text-emerald-700')}>
                            <span className={cn('h-1.5 w-1.5 rounded-full', isPrivate ? 'bg-neutral-300' : 'bg-emerald-500')} />
                            {isPrivate ? 'Private' : 'Live'}
                          </span>
                        </div>
                        <p className="truncate text-xs text-neutral-500">{project.outcome}</p>
                      </div>
                      {isPrivate ? (
                        <Lock className="h-4 w-4 flex-shrink-0 text-neutral-300" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-300 transition-colors group-hover:text-[hsl(212_74%_45%)]" aria-hidden="true" />
                      )}
                    </Row>
                  );
                })}
              </div>
            </div>
          )}

          {view === 'about' && (
            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Panel className="overflow-hidden p-0 sm:col-span-1">
                  <img src="/jhoenil.png" alt="Jhoenil Wahid — software engineer" loading="lazy" className="aspect-[4/5] w-full object-cover object-center" />
                </Panel>
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">About</p>
                  <h1 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                    Turning complex problems into simple, working systems.
                  </h1>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                    <p>
                      With 5+ years in software engineering and technical consulting, I&apos;ve helped
                      startups, agencies, and enterprises build and scale their products — often as the
                      sole developer trusted with the whole platform.
                    </p>
                    <p>
                      I care about clean code, performance, and technology that makes a measurable
                      difference to the business.
                    </p>
                  </div>
                  <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors hover:text-[hsl(212_74%_45%)]">
                    View resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {view === 'contact' && (
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">New request</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                Have a project or an operation to modernize?
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
                The fastest way to start is a quick call — we&apos;ll figure out whether I&apos;m the
                right fit in 20 minutes.
              </p>
              <div className="mt-5">
                <BookACall className={btnSolid} label="Book a discovery call" />
              </div>

              <Panel className="mt-8 p-5">
                <p className="mb-4 text-sm font-medium text-neutral-500">Or send a message</p>
                <form onSubmit={handleFormSubmit} className="space-y-3" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="text" name="name" placeholder="Your name" aria-label="Your name" value={formData.name} onChange={handleFormChange} required className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none" />
                  <input type="email" name="email" placeholder="Your email address" aria-label="Your email address" value={formData.email} onChange={handleFormChange} required className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none" />
                  <textarea name="message" placeholder="What do you want to build?" aria-label="Your message" value={formData.message} onChange={handleFormChange} required className="min-h-24 w-full resize-y rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none" />
                  <button type="submit" className={cn(btnSolid, 'w-full')}>Send message</button>
                </form>
              </Panel>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-500">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-neutral-900"><Mail className="h-3.5 w-3.5" />{siteConfig.email}</a>
                <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-neutral-900"><Linkedin className="h-3.5 w-3.5" />LinkedIn</a>
                {siteConfig.githubUrl && (
                  <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-neutral-900"><Github className="h-3.5 w-3.5" />GitHub</a>
                )}
              </div>

              <p className="mt-10 text-xs text-neutral-400">
                Other takes: <Link to="/" className="underline underline-offset-2 hover:text-neutral-600">Main</Link>{' '}
                · <Link to="/fable" className="underline underline-offset-2 hover:text-neutral-600">Fable</Link>{' '}
                · <Link to="/better-fable" className="underline underline-offset-2 hover:text-neutral-600">Better-fable</Link>{' '}
                · <Link to="/studio" className="underline underline-offset-2 hover:text-neutral-600">Studio</Link>{' '}
                · <Link to="/bento" className="underline underline-offset-2 hover:text-neutral-600">Bento</Link>{' '}
                · <Link to="/flagship" className="underline underline-offset-2 hover:text-neutral-600">Flagship</Link>{' '}
                · <Link to="/deck" className="underline underline-offset-2 hover:text-neutral-600">Deck</Link>
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Bottom tab bar (mobile) */}
      <nav aria-label="Sections" className="flex flex-shrink-0 items-center justify-around border-t border-neutral-200 bg-white py-1.5 md:hidden">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => goTo(v.id)}
            className={cn('flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium', view === v.id ? 'text-neutral-900' : 'text-neutral-400')}
            aria-current={view === v.id ? 'page' : undefined}
          >
            <v.icon className="h-4 w-4" aria-hidden="true" />
            {v.label}
          </button>
        ))}
      </nav>

      {/* Command palette */}
      <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
        <CommandInput placeholder="Search or jump to…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Go to">
            {views.map((v) => (
              <CommandItem key={v.id} onSelect={() => goTo(v.id)}>
                <v.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                {v.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Action">
            <CommandItem onSelect={() => goTo('contact')}>
              <CommandIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Book a discovery call
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {linkableProjects.map((p) => (
              <CommandItem key={p.title} onSelect={() => openUrl(p.url as string)}>
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

const ServicesView = () => {
  const [selected, setSelected] = useState(0);
  const service = services[selected];

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">What I do</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">Services</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="space-y-1 sm:col-span-2">
          {services.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setSelected(i)}
              className={cn(
                'block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
                selected === i ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100',
              )}
            >
              {s.title}
            </button>
          ))}
        </div>
        <Panel className="p-5 sm:col-span-3">
          <p className="text-sm font-medium" style={{ color: BLUE }}>{service.outcome}</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{service.description}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-4">
            {service.capabilities.map((cap) => (
              <li key={cap} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">{cap}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default Console;
