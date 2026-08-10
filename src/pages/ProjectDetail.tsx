import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookACall from '@/components/BookACall';
import { projects, siteConfig } from '@/data/content';
import { projectSlug } from '@/lib/projectSlug';

const statusStyles: Record<string, string> = {
  Active: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  Upcoming: 'border-amber-300 bg-amber-50 text-amber-700',
  Archived: 'border-neutral-300 bg-neutral-100 text-neutral-500',
  'Turned over': 'border-sky-300 bg-sky-50 text-sky-700',
  Delivered: 'border-neutral-300 bg-neutral-100 text-neutral-500',
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((item) => projectSlug(item.title) === slug);

  useEffect(() => {
    if (!project) return;

    const title = `${project.title} — Jhoenil Wahid`;
    const description = `${project.outcome} ${project.description}`;
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    const shareImage = project.featured ? `${siteConfig.url}/jhoenil_labs.png` : `${siteConfig.url}${project.image}`;
    setMeta('meta[property="og:image"]', shareImage);
    setMeta('meta[property="og:image:alt"]', project.featured ? 'Jhoenil Labs' : `${project.title} preview`);
    setMeta('meta[property="og:url"]', `${siteConfig.url}/projects/${projectSlug(project.title)}`);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', shareImage);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${siteConfig.url}/projects/${projectSlug(project.title)}`;
  }, [project]);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdfbf5] px-5 text-neutral-800">
        <div className="text-center">
          <p className="font-['Caveat',cursive] text-3xl">project not found</p>
          <Link to="/" className="mt-4 inline-flex border-2 border-neutral-700 px-4 py-2 text-sm hover:-rotate-1">
            back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfbf5] px-5 py-8 text-neutral-800 md:px-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <Link to="/#portfolio" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> back to projects
        </Link>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-400">{project.category}</p>
            <h1 className="mt-3 break-words font-['Caveat',cursive] text-5xl leading-none md:text-7xl">{project.title}</h1>
            <span className={`mt-5 inline-block rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${statusStyles[project.status] ?? statusStyles.Delivered}`}>
              {project.status}
            </span>
            {project.problem && (
              <div className="mt-8 border-l-2 border-[hsl(var(--brand))] pl-4">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">the problem</p>
                <p className="mt-2 max-w-xl leading-relaxed text-neutral-600">{project.problem}</p>
              </div>
            )}
            <p className="mt-8 text-xl leading-relaxed text-rose-400">{project.outcome}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-neutral-600">{project.description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-500">{tag}</span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-neutral-800 bg-white px-5 py-3 font-['Caveat',cursive] text-xl hover:-rotate-1">
                  visit project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <p className="inline-flex items-center gap-2 border-2 border-dashed border-neutral-400 px-5 py-3 text-sm text-neutral-500">
                  <Lock className="h-4 w-4" aria-hidden="true" /> private or offline system
                </p>
              )}
              <BookACall
                className="inline-flex items-center justify-center border-2 border-neutral-800 bg-white px-5 py-3 font-['Caveat',cursive] text-xl text-neutral-800 hover:-rotate-1"
                label="Talk about a similar project"
                withIcon={false}
              />
            </div>
          </div>

          <div className="rotate-1 border-2 border-neutral-700 bg-white p-2 shadow-[5px_5px_0_#d4d4d4]">
            {project.featured ? (
              <div className="flex aspect-[4/3] flex-col justify-between bg-[#fdfbf5] p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">anonymized case study</p>
                  <p className="mt-4 font-['Caveat',cursive] text-4xl text-neutral-800">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-neutral-600">Client details stay private. The work and outcomes are described at the level approved for public use.</p>
                  <p className="mt-4 text-xs uppercase tracking-wide text-neutral-400">{project.tags.join(' · ')}</p>
                </div>
              </div>
            ) : (
              <img src={project.image} alt={`${project.title} preview`} className="aspect-[4/3] w-full object-cover object-top" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
