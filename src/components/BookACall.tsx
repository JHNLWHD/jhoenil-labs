import React from 'react';
import { Calendar } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { siteConfig } from '@/data/content';

const scrollToContact = () =>
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

/**
 * Primary CTA. If a Calendly/Cal.com link is configured it opens the booking
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
  const { calendlyUrl } = siteConfig;
  const trackClick = () => posthog?.capture('contact_cta_clicked', { label, destination: calendlyUrl ? 'calendar' : 'contact_form' });

  if (calendlyUrl) {
    return (
      <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className={className} onClick={trackClick}>
        {withIcon && <Calendar className="h-4 w-4" aria-hidden="true" />}
        {label}
      </a>
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
