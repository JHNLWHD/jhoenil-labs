import React from 'react';
import { ArrowDown } from 'lucide-react';
import BookACall from '@/components/BookACall';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'hsl(var(--brand))' }}
      />

      <div className="section-shell relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl animate-rise">
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="eyebrow">Senior software engineer &amp; consultant</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available for new projects
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-medium leading-[1.05] text-foreground sm:text-5xl md:text-6xl"
          >
            I build the software your business{' '}
            <span className="text-[hsl(var(--brand))]">runs on.</span>
          </h1>

          <p className="text-pretty mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I&apos;m <strong className="font-medium text-foreground">Jhoenil Wahid</strong> — I design and
            build web apps, mobile apps, and systems that replace manual work with real-time
            operations. From first line of code to production, for growing businesses.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookACall className="btn-primary" />
            <a href="#work" className="btn-ghost">
              See what I&apos;m building <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
