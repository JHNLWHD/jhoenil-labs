import React from 'react';
import { FileText } from 'lucide-react';
import { siteConfig } from '@/data/content';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24" aria-labelledby="about-heading">
      <div className="section-shell grid grid-cols-1 items-center gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card md:aspect-[3/4]">
            <img
              src="/jhoenil.png"
              alt="Jhoenil Wahid — software engineer"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <span className="eyebrow">About me</span>
          <h2 id="about-heading" className="mt-4 text-3xl font-medium md:text-4xl">
            Turning complex problems into simple, working systems.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              With 5+ years in software engineering and technical consulting, I&apos;ve helped
              startups, agencies, and enterprises build and scale their products — often as the sole
              developer trusted with the whole platform.
            </p>
            <p>
              I started as a full-stack developer and grew into cloud architecture, technical
              leadership, and AI integration. I care about clean code, performance, and technology
              that makes a measurable difference to the business.
            </p>
            <p>
              I&apos;ve delivered work across fintech, FMCG distribution, civic tech, healthcare, and
              nonprofits — pairing technical depth with a clear grasp of what the business actually
              needs.
            </p>
          </div>

          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            View resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
