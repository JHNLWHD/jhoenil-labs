import React from 'react';
import { Smartphone, Workflow, Cloud } from 'lucide-react';
import { services } from '@/data/content';

const icons = [Smartphone, Workflow, Cloud];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24" aria-labelledby="services-heading">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">What I do</span>
          <h2 id="services-heading" className="mt-4 text-3xl font-medium md:text-4xl">
            Three ways I help businesses move faster.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you need something built, a manual process replaced, or a senior hand to steer
            the technology — I cover the whole range.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[i] ?? Smartphone;
            return (
              <article key={service.title} className="edge-card flex flex-col p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="mt-1 font-display text-lg text-[hsl(var(--brand))]">
                  {service.outcome}
                </p>
                <p className="mt-4 flex-grow text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                  {service.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs text-foreground/70"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
