import React from 'react';
import { metrics } from '@/data/content';

const MetricsSection = () => {
  return (
    <section className="py-6" aria-label="Track record">
      <div className="section-shell">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-background px-4 py-6 text-center md:px-6 md:py-8">
              <div className="font-display text-3xl font-medium text-foreground md:text-4xl">
                {m.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
