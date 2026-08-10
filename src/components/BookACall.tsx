import React, { useEffect, useId, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { siteConfig } from '@/data/content';

type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  bookingListenerReady?: boolean;
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

const openCal = (calLink: string, notes?: string, onBookingSuccess?: () => void) => {
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
  if (onBookingSuccess && !cal.bookingListenerReady) {
    cal.bookingListenerReady = true;
    cal.ns.jhoenil?.('on', {
      action: 'bookingSuccessfulV2',
      callback: onBookingSuccess,
    });
  }
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
  const config: Record<string, unknown> = { theme: 'light' };
  if (notes) config['metadata[workflow]'] = notes;
  cal.ns.jhoenil?.('modal', { calLink, config });
};

/**
 * Primary CTA. If a Cal.com link is configured it opens the booking
 * page; otherwise it falls back to scrolling to the contact form.
 */
const BookACall = ({
  className = 'btn-primary',
  label = 'Book a free discovery call',
  withIcon = true,
}: {
  className?: string;
  label?: string;
  withIcon?: boolean;
}) => {
  const posthog = usePostHog();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contextId = useId();
  const [contextOpen, setContextOpen] = useState(false);
  const { calLink } = siteConfig;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (contextOpen && !dialog.open) dialog.showModal();
    if (!contextOpen && dialog.open) dialog.close();
  }, [contextOpen]);

  const trackClick = () => posthog?.capture('contact_cta_clicked', { label, destination: calLink ? 'calendar' : 'contact_form' });
  const handleClick = () => {
    trackClick();
    if (calLink) {
      setContextOpen(true);
      return;
    }

    scrollToContact();
  };

  const handleContextSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const context = formData.get('context');
    if (typeof context !== 'string' || !context.trim() || !calLink) return;

    posthog?.capture('discovery_call_context_submitted');
    setContextOpen(false);
    openCal(calLink, context.trim(), () => posthog?.capture('discovery_call_booked'));
  };

  const button = (
    <button type="button" aria-haspopup={calLink ? 'dialog' : undefined} onClick={handleClick} className={className}>
      {withIcon && <Calendar className="h-4 w-4" aria-hidden="true" />}
      {label}
    </button>
  );

  if (!calLink) return button;

  return (
    <>
      {button}
      <dialog
        ref={dialogRef}
        aria-labelledby={`${contextId}-title`}
        onCancel={() => setContextOpen(false)}
        onClose={() => setContextOpen(false)}
        className="w-[calc(100%-2rem)] max-w-lg border-2 border-neutral-800 bg-[#fdfbf5] p-0 text-neutral-800 shadow-[8px_8px_0_#d4d4d4] backdrop:bg-neutral-900/30"
      >
        <form onSubmit={handleContextSubmit} className="space-y-4 p-6">
          <div>
            <h2 id={`${contextId}-title`} className="font-['Caveat',cursive] text-3xl">Before you book</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              A little context helps make the 30-minute discovery call useful.
            </p>
          </div>
          <div>
            <label htmlFor={`${contextId}-input`} className="text-sm font-medium text-neutral-800">
              What process is currently manual or difficult to see clearly?
            </label>
            <textarea
              id={`${contextId}-input`}
              name="context"
              required
              autoFocus
              className="mt-2 min-h-28 w-full resize-y border-2 border-neutral-700 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
            />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <button type="button" onClick={() => setContextOpen(false)} className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-800">
              not now
            </button>
            <button type="submit" className="border-2 border-neutral-800 bg-white px-4 py-2 font-['Caveat',cursive] text-xl hover:-rotate-1">
              continue to booking →
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default BookACall;
