import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { projects } from '@/data/content';
import BookACall from '@/components/BookACall';

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-secondary/40" aria-labelledby="portfolio-heading">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">Selected work</span>
          <h2 id="portfolio-heading" className="mt-4 text-3xl font-medium md:text-4xl">
            Shipped projects, real results.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A selection of products and systems I&apos;ve delivered — each solving a concrete problem.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                aria-label={isPrivate ? undefined : `View ${project.title}`}
              >
                {/* screenshot / preview */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <h3 className="flex items-start justify-between gap-2 text-lg font-medium">
                    {project.title}
                    {isPrivate ? (
                      <Lock className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground transition-all group-hover:text-[hsl(var(--brand))]" aria-hidden="true" />
                    )}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[hsl(var(--brand))]">
                    {project.outcome}
                  </p>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {isPrivate ? 'Private system' : 'View project →'}
                  </div>
                </div>
              </CardTag>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">
            Want something like this built for your business?
          </p>
          <BookACall className="btn-primary" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
