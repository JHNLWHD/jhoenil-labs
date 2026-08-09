import React from 'react';
import { Calendar } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { siteConfig } from '@/data/content';

type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalApi>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const scrollToContact = () =>
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

const openCal = (calLink: string) => {
  const cal = window.Cal ?? ((...args: unknown[]) => {
    const [instruction, namespace] = args;
    if (instruction === 'init' && typeof namespace === 'string') {
      const api = ((...nestedArgs: unknown[]) => {
        api.q?.push(nestedArgs);
      }) as CalApi;
      api.q = [];
      cal.ns![namespace] = cal.ns![namespace] ?? api;
      cal.ns![namespace].q?.push(args);
      cal.q?.push(['initNamespace', namespace]);
      return;
    }
    cal.q?.push(args);
  }) as CalApi;

  cal.q = cal.q ?? [];
  cal.ns = cal.ns ?? {};
  window.Cal = cal;

  if (!cal.loaded) {
    cal.loaded = true;
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);
  }

  cal('init', 'jhoenil', { origin: 'https://cal.com' });
  cal.ns.jhoenil?.('ui', {
    theme: 'light',
    cssVarsPerTheme: {
      light: {
        'cal-brand': '#2b7fdb',
        'cal-brand-emphasis': '#1f65b1',
        'cal-brand-text': '#ffffff',
        'cal-bg': '#fdfbf5',
        'cal-bg-subtle': '#ffffff',
        'cal-bg-emphasis': '#eef6ff',
        'cal-border': '#d4d4d4',
        radius: '0.25rem',
      },
    },
  });
  cal.ns.jhoenil?.('modal', { calLink });
};

/**
 * Primary CTA. If a Cal.com link is configured it opens the booking
 * page; otherwise it falls back to scrolling to the contact form.
 */
const BookACall = ({
  className = 'btn-primary',
  label = 'Start a conversation',
  withIcon = true,
}: {
  className?: string;
  label?: string;
  withIcon?: boolean;
}) => {
  const posthog = usePostHog();
  const { calLink } = siteConfig;
  const trackClick = () => posthog?.capture('contact_cta_clicked', { label, destination: calLink ? 'calendar' : 'contact_form' });

  if (calLink) {
    return (
      <button type="button" aria-haspopup="dialog" onClick={() => { trackClick(); openCal(calLink); }} className={className}>
        {withIcon && <Calendar className="h-4 w-4" aria-hidden="true" />}
        {label}
      </button>
    );
  }

  return (
    <button type="button" onClick={() => { trackClick(); scrollToContact(); }} className={className}>
      {withIcon && <Calendar className="h-4 w-4" aria-hidden="true" />}
      {label}
    </button>
  );
};

export default BookACall;
