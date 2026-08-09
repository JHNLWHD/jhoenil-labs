# CTA conversion follow-up

Status: ready-for-agent
Label: ready-for-agent

## Problem Statement

The active portfolio experience has a working primary booking flow, but not every visitor has a clear path to reach out. Project detail pages can receive visitors from portfolio links, search, or shared URLs and currently end with only a project-navigation link and, when available, an external project link. They do not offer a booking or contact action. This creates a conversion dead end after a visitor has just reviewed proof of relevant work.

The mobile header also labels the booking CTA as “Contact,” even though it opens the 30-minute Cal.com discovery call. That label creates an expectation mismatch and makes the action less precise. The contact section presents a booking action and a message form, but the form does not explain how it differs from booking a call.

The goal is to make every high-intent page and action lead naturally to a qualified inquiry while preserving the existing visual direction, shared booking integration, and short contact form.

## Solution

Add a contextual booking CTA to project detail pages using the existing shared booking action. The CTA should use language that connects the visitor’s interest in the displayed project to a conversation, such as “Talk about a similar project.” Keep the project’s external “visit project” action when one exists.

Rename the mobile header booking action to accurately describe the destination, preferably “Book a call” or “Get started.” Keep the desktop header, hero, current-work, and contact-section booking actions on the same Cal.com event.

Clarify the two contact options in the contact section: booking is the fastest route for a live conversation, while the form is for visitors who prefer to send project context asynchronously. Keep the form short and retain its existing Netlify handling, validation, success/error feedback, and privacy microcopy.

## User Stories

1. As a prospective client who lands on a project detail page, I want a clear way to book a conversation, so that relevant proof does not lead to a dead end.
2. As a prospective client reviewing a project, I want the booking CTA to acknowledge my interest in similar work, so that the next step feels relevant rather than generic.
3. As a prospective client, I want the project-page CTA to open the same 30-minute discovery event used elsewhere on the site, so that I receive a consistent booking experience.
4. As a prospective client, I want to distinguish between visiting the delivered project and contacting Jhoenil, so that I understand the purpose of each action.
5. As a prospective client on a private or offline project page, I want a contact action even when there is no public project URL, so that confidentiality does not prevent an inquiry.
6. As a prospective client on an active project page, I want to move from proof of current work to a conversation, so that I can ask whether Jhoenil can help with a related problem.
7. As a prospective client on an archived project page, I want to contact Jhoenil about the capabilities demonstrated, so that the archived status does not imply that no related work is available.
8. As a mobile visitor, I want the header CTA label to match its action, so that “Contact” does not unexpectedly open a calendar.
9. As a mobile visitor, I want the booking CTA to remain visible and large enough to tap, so that I can reach out without opening the navigation menu.
10. As a desktop visitor, I want the header and project-page booking actions to use consistent destination language, so that the site feels intentional and trustworthy.
11. As a visitor who prefers scheduling, I want the booking action to open the configured Cal.com event in the themed modal, so that I can choose a time without leaving the site.
12. As a visitor who prefers asynchronous communication, I want the contact section to explain that the message form is an alternative to booking, so that I can choose the lower-friction route for me.
13. As a visitor completing the form, I want the form submit action to remain clearly separate from booking, so that I know whether I am requesting a meeting or sending context.
14. As a visitor, I want the contact section to preserve the expectation of a response within two business days, so that I know what happens after sending a message.
15. As a visitor using assistive technology, I want booking controls to have accurate accessible names and dialog semantics, so that the action and destination are understandable.
16. As a site owner, I want booking CTA clicks from project pages to use the existing conversion event, so that project-page conversion performance can be evaluated.
17. As a site owner, I want the analytics event to preserve the CTA label and identify the calendar destination, so that different CTA placements can be compared without recording personal message content.
18. As a maintainer, I want project pages to reuse the existing shared booking component, so that Cal.com configuration and fallback behavior remain centralized.
19. As a maintainer, I want the mobile label change to affect only the active homepage experience, so that unused or unrelated components are not expanded unnecessarily.
20. As a maintainer, I want the implementation to avoid a second scheduling integration, custom modal, or new contact abstraction, so that the change remains small and easy to maintain.
21. As a maintainer, I want project pages with invalid slugs to retain a usable route back to the homepage, so that a missing project does not create a new dead end.
22. As a maintainer, I want the existing external project links to continue opening safely in a new tab, so that adding a conversion CTA does not break project exploration.
23. As a visitor, I want the project-page CTA to work at desktop and mobile widths, so that conversion does not depend on screen size.
24. As a visitor, I want the project-page CTA row to wrap cleanly on narrow screens, so that buttons do not overflow or become difficult to tap.
25. As a site owner, I want the primary conversion path to remain booking-first while keeping email and the message form available, so that different visitor preferences are supported without diluting the main goal.

## Implementation Decisions

- Use the existing project detail page as the highest useful integration seam for the new conversion action.
- Reuse the existing shared booking CTA component rather than duplicating Cal.com initialization or modal behavior.
- Place the contextual booking CTA near the project outcome, description, and existing project action, before the visitor reaches the end of the page.
- Use contextual copy such as “Talk about a similar project” for project detail pages; preserve the existing “Start a conversation” copy in the homepage contact section unless a later content decision changes it.
- Keep “visit project” as the secondary action for projects with a public URL.
- Keep the private/offline status treatment for projects without a public URL, but pair it with the booking CTA so it is not the only outcome.
- Change the active mobile header booking label from “Contact” to a booking-accurate label. “Book a call” is the preferred wording because it names the action and matches the destination.
- Keep the desktop header, hero, current-work, and contact-section CTAs connected to the same configured 30-minute Cal.com event.
- Add short explanatory copy around the contact form that distinguishes booking a live call from sending project details. Do not add qualification fields.
- Preserve the existing Cal.com light theme and site-aligned color configuration.
- Preserve the existing contact-form implementation, Netlify form contract, native required-field validation, honeypot field, and PostHog success/failure events.
- Use the existing CTA click event and its current label/destination properties. Do not introduce a second analytics event solely for project pages.
- Add or preserve accessible dialog semantics on booking controls and ensure the visible label describes the action.
- Do not add a floating booking button, inline calendar, CRM integration, routing form, or new dependency.

## Testing Decisions

- Test rendered external behavior at the shared CTA and project detail page seams, not the internal Cal.com queue implementation.
- At desktop width, open a project detail page with a public project URL and verify that the contextual booking CTA is visible, the external project action remains available, and the booking CTA opens the configured 30-minute Cal.com modal.
- At desktop width, open a project detail page without a public project URL and verify that the booking CTA remains available beside the private/offline status.
- At mobile width, verify the header CTA reads “Book a call” (or the approved equivalent), remains visible, and opens the same Cal.com event.
- At mobile width, verify the project-page CTA row wraps without horizontal overflow and both booking and project-navigation actions remain tappable.
- Verify the contact section visibly distinguishes booking from sending a message and that both paths remain usable.
- Verify the contact form still exposes accessible labels, required-field validation, honeypot markup, response-time microcopy, and distinct success/error feedback.
- Verify a booking click from a project page emits the existing CTA event with the contextual label and calendar destination, without including message contents or other unnecessary personal data.
- Verify invalid project slugs retain a usable route back to the homepage.
- Run TypeScript checking, lint, production build, and a browser smoke test at desktop and 390px mobile widths.
- Prior art is the existing rendered homepage browser smoke test, shared booking CTA, native form validation, Netlify form handling, and PostHog provider. No new test framework is required.

## Out of Scope

- Replacing the Cal.com modal with an inline embed or floating button.
- Building a custom booking or contact backend.
- Adding a CRM, lead scoring, routing form, pricing flow, or automated qualification.
- Rewriting project content or adding new case studies.
- Redesigning the hand-drawn visual language or changing the site-wide color palette.
- Adding booking CTAs to unused or inactive alternate page components unless they become part of the active route.
- Tracking email, LinkedIn, resume, or external project links in this focused follow-up.
- Changing the existing Cal.com event duration, availability, or account settings.

## Further Notes

- The active homepage is the Sketch experience and already uses the shared booking CTA for the hero, current-work, header, and contact section.
- The configured destination is the 30-minute discovery call event for `jhoenil-wahid`.
- The prior CTA audit verified no horizontal overflow at a 390px viewport and confirmed that the Cal.com modal loads on desktop and mobile.
- A broader homepage conversion-flow spec already exists; this spec intentionally isolates the remaining CTA gaps so implementation can stay small and independently reviewable.
