import React from 'react';
import { currentWork } from '@/data/content';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Upcoming: 'bg-amber-50 text-amber-700 border-amber-200',
  Delivered: 'bg-secondary text-muted-foreground border-border',
};

const CurrentWorkSection = () => {
  return (
    <section id="work" className="py-16 md:py-24 bg-secondary/40" aria-labelledby="work-heading">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">Currently working with</span>
          <h2 id="work-heading" className="mt-4 text-3xl font-medium md:text-4xl">
            Real businesses trust me with their operations — right now.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A look at the platforms and systems I&apos;m actively building and running for clients.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {currentWork.map((item) => (
            <article key={item.client} className="edge-card flex flex-col p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--brand))]">
                  {item.role}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    statusStyles[item.status] ?? statusStyles.Delivered
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="text-xl font-medium">{item.client}</h3>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                {item.outcome}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs text-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentWorkSection;
