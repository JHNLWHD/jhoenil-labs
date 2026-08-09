# Homepage conversion flow

Status: ready-for-agent
Label: ready-for-agent

## Problem Statement

The portfolio presents Jhoenil as a capable software engineer and consultant, but the path from visitor to qualified inquiry is not yet trustworthy or measurable. The primary “Book a call” action currently scrolls to a contact form because no scheduling URL is configured, the content contains conflicting experience claims, and the portfolio gives too little concrete evidence for several private or placeholder-heavy projects. The visual treatment works on desktop and mobile, but the hand-drawn presentation, broad positioning, and archive-heavy work section can make the offer harder to understand for a business buyer.

The site also has SEO and reliability risks: homepage metadata changes only after client-side rendering, project metadata is client-side only, deep-link fallback configuration is not evident, and conversion events are not explicitly tracked. The goal is not a redesign; it is a focused improvement to the existing homepage conversion flow.

## Solution

Make the homepage communicate a specific business problem, credible proof, and one honest next step. Configure a real scheduling destination or rename the CTA to match the contact-form action. Reconcile all factual claims, reduce or reorganize low-evidence portfolio content, strengthen the contact form’s trust and accessibility cues, and ensure the homepage and project pages expose stable search and share metadata. Add lightweight conversion measurement for CTA interaction and form outcomes.

Preserve the existing visual identity, responsive layout, short form, and static-site architecture. Prefer content and configuration changes over new infrastructure; only introduce prerendering or additional SEO infrastructure if the current deployment cannot provide reliable deep-link metadata.

## User Stories

1. As a business owner with manual operational work, I want to understand within a few seconds what Jhoenil builds, so that I can decide whether the site is relevant to my problem.
2. As a startup founder, I want to see whether Jhoenil can build a web or mobile product end-to-end, so that I can assess fit before making contact.
3. As an operations leader, I want to recognize problems such as spreadsheets, paperwork, and disconnected workflows in the offer, so that I can map the service to my current pain.
4. As a technical leader, I want to understand the available architecture, cloud, DevOps, and fractional leadership support, so that I can choose the right engagement type.
5. As a prospective client, I want the primary CTA to do exactly what its label promises, so that I do not lose trust when I click it.
6. As a prospective client who prefers scheduling, I want to book a 20-minute discovery call directly, so that I can start without writing a long explanation.
7. As a prospective client who prefers email, I want a visible email option, so that I can contact Jhoenil asynchronously.
8. As a mobile visitor, I want the primary CTA to remain visible and understandable, so that I can reach out without opening a complex navigation flow.
9. As a mobile visitor, I want the menu to open, close, and navigate without obscuring or unexpectedly shifting important content, so that browsing feels controlled.
10. As a desktop visitor, I want the hero, proof, services, and CTA hierarchy to be scannable, so that the large-screen layout does not make the offer feel empty or ambiguous.
11. As a visitor with limited vision or cognitive load, I want readable type, clear labels, sufficient contrast, and predictable focus states, so that I can use the site comfortably.
12. As a prospective client, I want to know whether Jhoenil is available, so that I can judge whether reaching out is worthwhile.
13. As a prospective client, I want to know what happens after I make contact, so that the first step feels low-risk.
14. As a prospective client, I want to know whether the first call is free and whether there is a pitch or obligation, so that I can decide to book with confidence.
15. As a prospective client, I want to know how much involvement is expected during delivery, so that I can assess whether the working relationship suits my team.
16. As a prospective client outside the Philippines, I want to know whether remote and cross-time-zone work is supported, so that I can determine geographic fit.
17. As a prospective client with confidential requirements, I want clear reassurance that an NDA is possible, so that I can safely describe the problem.
18. As a prospective client, I want to see a small set of relevant completed projects before an archive, so that the strongest proof is not diluted by older or inactive work.
19. As a prospective client, I want each featured project to state the business problem, the delivered result, and the type of work performed, so that I can compare it to my own situation.
20. As a prospective client, I want private projects to provide useful anonymized evidence instead of empty placeholders, so that confidentiality does not eliminate proof.
21. As a prospective client, I want project status to be obvious, so that I can distinguish active work, delivered work, archived work, and turned-over work.
22. As a prospective client, I want metrics to include enough context to understand what was measured, so that impressive-looking numbers feel credible.
23. As a prospective client, I want all experience and delivery claims to be internally consistent, so that I can trust the rest of the content.
24. As a prospective client, I want client names to be shown only when they are approved for public use, so that the site demonstrates professional confidentiality.
25. As a visitor arriving from a search result, I want the page title and description to match the visible page, so that I know I reached the expected service.
26. As a visitor sharing a project page, I want the preview title, description, canonical URL, and image to describe that project, so that the shared link earns a relevant click.
27. As a search engine, I want crawlable homepage and project-page content with stable canonical URLs, so that the right pages can be indexed.
28. As a visitor opening a project URL directly, I want the route to load successfully on the deployed site, so that search and shared links do not end in a hosting 404.
29. As a site owner, I want CTA clicks, form starts, successful submissions, and failed submissions recorded, so that conversion improvements can be evaluated.
30. As a site owner, I want form success feedback to reflect a real submission outcome, so that visitors are not falsely told that a message was sent.
31. As a visitor, I want form fields to have clear accessible labels and useful validation, so that completing the short inquiry form is straightforward.
32. As a visitor, I want a concise privacy or spam expectation near the form, so that I understand how my contact details will be used.
33. As a maintainer, I want the homepage to use the existing content source and CTA component, so that factual changes do not drift across multiple copies.
34. As a maintainer, I want the solution to avoid a large visual rewrite, so that the work remains easy to review and safe to deploy.
35. As a maintainer, I want the conversion behavior to be testable through the rendered homepage, so that desktop and mobile regressions are caught at the highest useful seam.

## Implementation Decisions

- Treat the rendered homepage as the primary integration seam. The homepage owns the visitor journey from hero through current work, services, proof, portfolio, about, and contact.
- Keep one shared primary CTA implementation. It must either link to the configured scheduling service or use wording that accurately describes the contact-form fallback.
- Keep the scheduling destination in the existing site configuration. Do not add a scheduling abstraction or booking UI until a real provider URL is available.
- Use one consistent experience claim and one consistent positioning statement across document metadata, hero content, about content, metrics, and social previews.
- Reframe the hero around the buyer’s operational outcome while retaining the current visual style and responsive structure.
- Present a focused set of strongest proof items first. Keep the archive available only when it helps credibility; do not let inactive or placeholder-heavy projects dominate the primary conversion path.
- Improve private-project proof with approved anonymized outcomes, scope, constraints, and delivered capabilities. Do not expose client names or implementation details without approval.
- Replace placeholder imagery for featured work where approved assets exist. If no visual can be shared, use a deliberate text-based case-study treatment rather than implying that a placeholder is a screenshot.
- Keep the contact form short. Add visible labels, accessible validation, response-time or next-step microcopy, and a concise privacy/spam note instead of adding unnecessary qualification fields.
- Preserve Netlify form handling and the existing success/error feedback pattern, but make the submission endpoint explicit and ensure the success state is only shown for an accepted response.
- Add the configured honeypot field to the rendered form so the declared spam-protection behavior is actually present.
- Add lightweight analytics events at the CTA, form start, successful submit, and failed submit boundaries. Do not introduce a separate analytics product.
- Make homepage metadata stable and aligned with the visible copy. Project metadata must remain specific to the project and use the project’s canonical route.
- Verify deployed SPA fallback behavior for project routes. Add the smallest deployment rule required if direct navigation is not already supported.
- Keep experimental visual routes out of the primary consulting navigation and search funnel unless they are explicitly positioned as a public playground.
- Use the existing responsive CSS and component patterns. Do not add a UI framework, carousel, filter system, or scheduling integration beyond the configured external link.

## Testing Decisions

- Test external behavior at the rendered homepage seam, not internal component implementation details.
- At a desktop viewport, verify that the hero states the offer clearly, the primary CTA is visible, navigation reaches each major section, and the contact section is reachable.
- At a mobile viewport, verify that the header CTA remains usable, the menu opens and closes, menu links navigate correctly, content does not overflow horizontally, and the contact form remains usable without clipped fields or buttons.
- Verify the primary CTA behavior in both configuration states: configured scheduling URL opens the intended destination, and missing scheduling URL uses honest fallback wording or reaches the form.
- Verify the contact form exposes accessible labels, required-field validation, honeypot markup, and distinct success and failure outcomes.
- Verify CTA and form analytics events are emitted once per relevant user action and do not contain message contents or other unnecessary personal data.
- Verify the final experience claim and core positioning appear consistently in visible content and metadata.
- Verify project pages load through direct navigation, show project-specific title/description/canonical values, and do not expose unapproved client information.
- Verify sitemap entries correspond only to intended indexable routes and that deployed deep links do not return a hosting 404.
- Run the existing production build and lint checks. Existing unrelated lint failures should be recorded separately rather than expanded into this effort.
- Prior art is the existing rendered React page, native form validation, Netlify form handling, and existing PostHog provider. No new test framework is required unless the current environment lacks a practical browser test seam.

## Out of Scope

- A full visual redesign or replacement of the hand-drawn visual direction.
- Building a custom scheduling calendar or booking backend.
- Adding pricing, checkout, customer accounts, a CRM, or automated lead qualification.
- Rewriting every project into a long-form case study before the focused conversion path is validated.
- Adding a portfolio search, filter, carousel, or CMS.
- Replacing Netlify Forms or PostHog.
- Removing all experimental routes if they are intentionally public; only their role in the primary conversion funnel is in scope.
- Fixing unrelated generated shadcn/UI lint errors unless the implementation directly touches those modules.

## Further Notes

- The current rendered `/` route is the `Sketch` experience; other polished section components exist but are not the active homepage path. Implementation should improve the active path first rather than editing unused alternatives.
- The audit found no horizontal overflow at a 390px mobile viewport, and the mobile menu and contact form were visually usable in the tested state.
- Production build succeeds. Lint currently reports pre-existing errors in generated/UI/config files.
- The worktree already contains user changes. Implementation must preserve unrelated changes and avoid broad cleanup.
