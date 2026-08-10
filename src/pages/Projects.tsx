import React from 'react';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects, siteConfig } from '@/data/content';

const Projects = () => {
  useEffect(() => {
    const title = 'Projects & systems — Jhoenil Wahid';
    const description = 'A fuller collection of Jhoenil Wahid\'s delivered web, mobile, and operational systems.';
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', `${siteConfig.url}/projects`);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${siteConfig.url}/projects`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="section-shell">
            <Link to="/" className="btn-ghost mb-6">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </Link>
            <span className="eyebrow">All work</span>
            <h1 className="mt-4 text-4xl font-medium md:text-5xl">Projects &amp; systems</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A fuller collection of the products and systems I&apos;ve delivered across industries.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const isPrivate = !project.url;
                const CardTag: React.ElementType = isPrivate ? 'div' : 'a';
                const linkProps = isPrivate
                  ? {}
                  : { href: project.url as string, target: '_blank', rel: 'noopener noreferrer' };

                return (
                  <CardTag
                    key={project.title}
                    {...linkProps}
                    className="edge-card group flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                      {project.featured ? (
                        <div className="flex h-full flex-col justify-between bg-[#fdfbf5] p-5">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">anonymized case study</p>
                            <p className="mt-3 font-['Caveat',cursive] text-3xl text-foreground">{project.category}</p>
                          </div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{project.tags.join(' · ')}</p>
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex flex-grow flex-col p-6">
                      <h2 className="flex items-start justify-between gap-2 text-lg font-medium">
                        {project.title}
                        {isPrivate ? (
                          <Lock className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                        ) : (
                          <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground transition-all group-hover:text-[hsl(var(--brand))]" aria-hidden="true" />
                        )}
                      </h2>
                      <p className="mt-2 text-sm font-medium text-[hsl(var(--brand))]">{project.outcome}</p>
                      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </CardTag>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
