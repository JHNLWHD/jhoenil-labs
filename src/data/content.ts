/**
 * Single source of truth for site content.
 *
 * CONFIDENTIALITY: every client name lives here. To anonymize a client before a
 * public deploy, edit its `name` (e.g. "i3pl Al Arabia" -> "a logistics company").
 * Nothing here is cleared for public exposure until Jhoenil signs off per name.
 *
 * `siteConfig.calLink` is the Cal.com profile or event link used by the CTA embed.
 */

export const siteConfig = {
  name: 'Jhoenil Wahid',
  brand: 'Jhoenil Labs',
  url: 'https://jhoenil-labs.netlify.app',
  email: 'aljhoenilw@gmail.com',
  location: 'Philippines — working with clients worldwide',
  linkedinUrl: 'https://www.linkedin.com/in/jhoenilwahid/',
  githubUrl: '', // TODO: add GitHub profile URL
  calLink: 'jhoenil-wahid',
  resumeUrl:
    'https://drive.google.com/file/d/1UKdYPjR84LZW-1tvbTX0H8r_r3ZlMmCU/view?usp=sharing',
} as const;

/** Headline metrics — every number here must be real and defensible. */
export const metrics: { value: string; label: string }[] = [
  { value: '5+ yrs', label: 'building production software' },
  { value: '₱2M+', label: 'monthly sales tracked · FMCG distribution' },
  { value: '10+', label: 'products shipped across industries' },
  { value: 'Sole dev', label: 'trusted with full platforms' },
];

/** Active engagements — current work. Client + outcome, no live-demo link. */
export type Engagement = {
  client: string;
  role: string;
  outcome: string;
  status: string;
  tags: string[];
};

export const currentWork: Engagement[] = [
  {
    client: 'i3pl Al Arabia',
    role: 'Sole developer',
    outcome:
      'Building their operations CRM from the ground up and led their server migration to Hetzner — one engineer trusted with the whole platform.',
    status: 'Active',
    tags: ['CRM Platform', 'Server Migration', 'Operations'],
  },
  {
    client: 'SolarTech PH',
    role: 'Developer',
    outcome:
      'Building an operations portal and a customer-facing mobile app to run their solar business and keep customers in the loop.',
    status: 'Upcoming',
    tags: ['Operations Portal', 'Mobile App', 'Web'],
  },
];

/** Three consolidated, outcome-framed offers. */
export type Service = {
  title: string;
  outcome: string;
  description: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    title: 'Web & Mobile Apps',
    outcome: 'Custom apps and sites, built to scale.',
    description:
      'From idea to launch — responsive web apps and cross-platform mobile apps built on modern, maintainable foundations. AI woven in where it earns its place.',
    capabilities: ['React & TypeScript', 'Mobile apps', 'AI features', 'API design'],
  },
  {
    title: 'Systems & Automation',
    outcome: 'Replace manual work with systems that run themselves.',
    description:
      'Turn spreadsheets, paperwork, and copy-paste workflows into real-time systems — sales & inventory, internal tools, dashboards, and automations your team actually trusts.',
    capabilities: ['Internal tools', 'Dashboards', 'Data workflows', 'Integrations'],
  },
  {
    title: 'Technical Leadership & Cloud',
    outcome: 'Senior direction when you need it.',
    description:
      'Fractional tech lead, architecture, and cloud/DevOps for teams that need experienced hands — from server migrations to CI/CD to mentoring your developers.',
    capabilities: ['Fractional CTO', 'Cloud & DevOps', 'Architecture', 'Mentoring'],
  },
];

/** Delivered, linkable projects — screenshot-led. */
export type Project = {
  title: string;
  outcome: string;
  description: string;
  url: string | null; // null => private system, no public link
  image: string; // screenshot; /placeholder.svg until captured
  category: 'Web' | 'Mobile' | 'System';
  tags: string[];
  status: 'Active' | 'Archived' | 'Turned over' | 'Delivered';
};

export const projects: Project[] = [
  {
    title: 'Kodigo Eleksyon 2025',
    outcome: '3.57K unique visitors · 15.1K page views during the 2025 election period.',
    description:
      'A voting-guide platform I built for the 2025 election period; now archived.',
    url: 'https://kodigoeleksyon2025.netlify.app/',
    image: '/work/kodigo.jpg',
    category: 'Web',
    tags: ['React', 'Civic tech'],
    status: 'Archived',
  },
  {
    title: 'Spayce',
    outcome: 'Founder-led rent-collection startup; product is no longer active.',
    description:
      'Led the product and engineering for a rent-collection app with automated reminders, bookkeeping, and tracking.',
    url: 'https://play.google.com/store/apps/details?id=ph.spayce.owner&hl=fil',
    image: '/placeholder.svg',
    category: 'Mobile',
    tags: ['Mobile', 'Fintech'],
    status: 'Archived',
  },
  {
    title: 'Ajinomoto Distributor Sales & Inventory System',
    outcome: 'Retired manual paperwork — the distributor now monitors operations in real time.',
    description:
      'A customized sales and inventory system for an FMCG distributor of Ajinomoto product lines, replacing manual tracking end-to-end.',
    url: null, // private internal system
    image: '/placeholder.svg',
    category: 'System',
    tags: ['Systems', 'Automation'],
    status: 'Delivered',
  },
  {
    title: 'Coca-Cola Distributor Sales & Inventory System',
    outcome: 'Replaced manual paperwork with real-time sales and inventory visibility.',
    description:
      'A customized sales and inventory system for an FMCG distributor of Coca-Cola product lines.',
    url: null,
    image: '/placeholder.svg',
    category: 'System',
    tags: ['Systems', 'Automation', 'FMCG'],
    status: 'Delivered',
  },
  {
    title: 'Rotary Club of Zamboanga City West',
    outcome: 'Active website maintenance for the club’s projects, events, and leadership.',
    description:
      'Website I actively update to showcase the club’s service projects, events, and leadership.',
    url: 'https://rotaryzcwest.org/',
    image: '/work/rotary.jpg',
    category: 'Web',
    tags: ['Web', 'Nonprofit'],
    status: 'Active',
  },
  {
    title: 'Rotaract Club of Zamboanga City West',
    outcome: 'Active website maintenance for the club’s programs, projects, and leadership.',
    description:
      'Website I actively update for the Rotaract Club of Zamboanga City West’s programs, community projects, and leadership.',
    url: 'https://rotaract.rotaryzcwest.org/',
    image: '/work/rotaract.jpg',
    category: 'Web',
    tags: ['Web', 'Nonprofit', 'Community'],
    status: 'Active',
  },
  {
    title: 'Pilipinas Rotaract MDIO',
    outcome: 'National organization website delivered and turned over.',
    description:
      'Official website for Pilipinas Rotaract MDIO, delivered with the organization’s mission and achievements in one place.',
    url: 'https://mdio-pilipinas.netlify.app/',
    image: '/placeholder.svg',
    category: 'Web',
    tags: ['Web', 'Nonprofit'],
    status: 'Turned over',
  },
  {
    title: 'COVID19 ZC',
    outcome: 'Archived COVID-19 tracking and historical data for Zamboanga City.',
    description:
      'A real-time tracker for COVID-19 statistics in Zamboanga City, built during the pandemic and now archived.',
    url: 'https://covid19-zc.netlify.app/',
    image: '/placeholder.svg',
    category: 'Web',
    tags: ['Web', 'Data'],
    status: 'Archived',
  },
  {
    title: 'SALN Tracker PH',
    outcome: 'Public transparency platform for exploring officials’ SALN records.',
    description:
      'A public data platform that brings together Statements of Assets, Liabilities, and Net Worth from official sources.',
    url: 'https://saln.bettergov.ph/',
    image: '/work/saln.jpg',
    category: 'Web',
    tags: ['Web', 'Civic tech', 'Data'],
    status: 'Active',
  },
  {
    title: 'Shop N Eat',
    outcome: 'Launched a food and shopping marketplace for a Zamboanga City startup.',
    description:
      'Led a three-engineer team from concept to launch on a mobile e-commerce platform for food and local shopping.',
    url: null,
    image: '/placeholder.svg',
    category: 'Mobile',
    tags: ['Mobile', 'E-commerce', 'Team lead'],
    status: 'Delivered',
  },
  {
    title: 'ZApp Civic Engagement Platform',
    outcome: 'Connected residents with city updates and citizen reporting.',
    description:
      'A civic engagement platform for the Zamboanga City government, built to support official updates and citizen reports.',
    url: null,
    image: '/placeholder.svg',
    category: 'Web',
    tags: ['Civic tech', 'Mobile', 'Government'],
    status: 'Delivered',
  },
  {
    title: 'City Document Tracking System',
    outcome: 'Modernized document approvals for 1,000+ employees across 20 offices.',
    description:
      'Upgraded a legacy government document workflow, adding SLA tracking and visibility into process bottlenecks.',
    url: null,
    image: '/placeholder.svg',
    category: 'System',
    tags: ['Systems', 'Government', 'PHP'],
    status: 'Delivered',
  },
  {
    title: 'Mobile Access Control Pilot',
    outcome: 'Replaced physical access cards across a five-building pilot with phone-based access.',
    description:
      'Built a Flutter mobile app and Strapi backend with real-time foot-traffic analytics for leadership.',
    url: null,
    image: '/placeholder.svg',
    category: 'Mobile',
    tags: ['Mobile', 'Operations', 'Analytics'],
    status: 'Delivered',
  },
];

/** How an engagement starts — reduces the perceived risk of hiring an unknown freelancer. */
export type ProcessStep = { n: string; title: string; description: string };

export const process: ProcessStep[] = [
  {
    n: '01',
    title: 'Discovery call',
    description:
      '30 minutes, no pitch deck. We talk through what you need and whether I\'m the right fit — free, no obligation.',
  },
  {
    n: '02',
    title: 'Scope & quote',
    description:
      'A written scope and a fixed quote or rate, so you know what you\'re paying for before any work starts.',
  },
  {
    n: '03',
    title: 'Build in the open',
    description:
      'Regular check-ins and a working preview as we go — you\'re never waiting weeks to see progress.',
  },
  {
    n: '04',
    title: 'Ship & support',
    description:
      'Launch, handover, and a support window after — I don\'t disappear the day it goes live.',
  },
];

/** Objection handling — the questions a prospect hesitates on before booking. */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Do you work with clients outside the Philippines?',
    a: 'Yes — I currently work with clients across different time zones and keep overlap hours for calls and check-ins.',
  },
  {
    q: 'What if I only need a small project, not a full build?',
    a: 'That\'s fine. Not every engagement is a multi-month build — smaller, well-scoped projects are welcome too.',
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes, happy to sign an NDA or your standard contractor agreement before we discuss specifics.',
  },
  {
    q: 'How involved will I need to be during the build?',
    a: 'As much or as little as you want. I default to short regular updates so you\'re never surprised, without needing daily check-ins.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a support window after handover, and I\'m available for ongoing retainer work if you need a long-term technical partner.',
  },
];
