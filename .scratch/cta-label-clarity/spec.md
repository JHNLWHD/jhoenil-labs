# CTA label clarity

Status: ready-for-agent
Label: ready-for-agent

## Problem Statement

The site’s primary homepage CTAs open a Cal.com booking modal for a specific 30-minute discovery call, but some labels still use broad or indirect language such as “Start a conversation” and “Get started!”. Those labels are friendly, but they do not tell a visitor what will happen after the click. The mismatch is especially important because the site’s main conversion goal is to get a visitor to reach out through scheduling.

The project detail CTA already uses contextual language, “Talk about a similar project,” and the contact form already uses the precise action “Send message.” The remaining scheduler CTAs should follow the same principle: name the booking action and, where useful, the 30-minute duration.

## Solution

Use explicit booking language for every CTA that opens Cal.com. The preferred primary label is “Book a 30-minute call.” Keep “Talk about a similar project” for project detail pages because it connects the action to the visitor’s context. Keep “Send message” for the asynchronous contact form.

Apply the wording consistently across the desktop header, mobile header, hero, current-work section, contact section, and shared CTA default. Preserve the existing Cal.com event, themed modal, analytics event, responsive styling, and contact-form behavior.

## User Stories

1. As a prospective client, I want a booking CTA to say that it books a call, so that I know what will happen when I click it.
2. As a prospective client, I want the booking CTA to mention the 30-minute duration, so that the commitment feels clear and bounded.
3. As a prospective client, I want the scheduler label to match the Cal.com event it opens, so that the site does not create a false expectation about the next step.
4. As a mobile visitor, I want the persistent header CTA to say “Book a 30-minute call,” so that its purpose is clear without opening the menu.
5. As a desktop visitor, I want the header booking CTA to use the same direct language as the hero CTA, so that the conversion path is consistent.
6. As a visitor reading the hero, I want the primary action to be explicit about scheduling, so that I can choose it confidently after understanding the offer.
7. As a visitor reviewing current work, I want the CTA to make clear that it starts a scheduled conversation, so that I can discuss a related operational problem.
8. As a visitor on the contact section, I want to distinguish booking a call from sending a message, so that I can choose between synchronous and asynchronous contact.
9. As a visitor on a project detail page, I want the contextual “Talk about a similar project” label to remain specific to the displayed work, so that it feels more relevant than a generic booking action.
10. As a visitor who prefers email or a form, I want the form action to remain “Send message,” so that I do not confuse submitting details with booking a meeting.
11. As a screen-reader user, I want the accessible name of each booking control to describe scheduling, so that the action remains understandable without visual context.
12. As a site owner, I want analytics to retain the visible CTA label, so that I can compare booking intent across placements.
13. As a site owner, I want all scheduler labels to resolve to the same configured discovery event, so that wording changes do not create inconsistent booking destinations.
14. As a maintainer, I want the default shared CTA label to be accurate, so that newly added uses do not silently reintroduce vague booking language.
15. As a maintainer, I want contextual project-page wording to remain an intentional exception, so that the shared component supports relevance without duplicating booking logic.
16. As a mobile visitor, I want the new label to fit within the existing header layout, so that the CTA does not overlap the menu button or cause horizontal overflow.
17. As a visitor, I want the CTA’s visual hierarchy and styling to remain unchanged while its wording becomes clearer, so that the site still feels familiar.
18. As a site owner, I want the label change to be limited to conversion wording, so that the Cal.com theme, modal behavior, contact form, and analytics plumbing remain stable.

## Implementation Decisions

- Treat the shared booking CTA as the primary seam for the default scheduler label.
- Set the shared default scheduler label to “Book a 30-minute call.”
- Use the same explicit label for the homepage desktop header, homepage mobile header, hero, current-work, and contact-section scheduler actions unless a placement needs its existing contextual wording.
- Keep “Talk about a similar project” as the project detail CTA label because it is a deliberate contextual conversion message.
- Keep “Send message” as the contact-form submit label.
- Preserve the current Cal.com destination: the configured 30-minute discovery event for `jhoenil-wahid`.
- Preserve the current Cal.com light theme, site-aligned colors, modal interaction, lazy loading, and fallback-to-contact behavior if the booking link is removed.
- Preserve the existing PostHog CTA event and continue sending the visible label and calendar destination as its properties.
- Do not add a label-management abstraction, translation system, copy configuration object, or new dependency for this wording change.
- Preserve existing button dimensions and responsive classes; only adjust styling if the explicit label demonstrably clips or overflows at the supported mobile width.

## Testing Decisions

- Test rendered text and click behavior at the shared booking CTA seam, not implementation details of the Cal.com queue.
- At desktop width, verify the header, hero, current-work, and contact-section scheduler controls all show the approved booking language.
- At 390px mobile width, verify the persistent header CTA shows the approved label, remains tappable, and does not create horizontal overflow.
- Verify every homepage scheduler CTA still opens the configured 30-minute Cal.com modal.
- Verify project detail pages retain “Talk about a similar project” and still open the same booking event.
- Verify the contact-form submit control remains “Send message” and is visually distinguishable from booking controls.
- Verify accessible button names match their visible labels and booking controls retain dialog semantics.
- Verify CTA analytics continues to capture the updated label and calendar destination without capturing personal message contents.
- Run TypeScript checking, lint, production build, and browser smoke tests on desktop and mobile.
- Prior art is the existing rendered browser smoke test, shared booking CTA, Cal.com modal verification, native form behavior, and PostHog provider. No new test framework is required.

## Out of Scope

- Changing the Cal.com event, duration, availability, or account settings.
- Redesigning CTA styling, button hierarchy, or the hand-drawn visual direction.
- Replacing the Cal.com modal with an inline embed or floating button.
- Changing the project-detail contextual CTA or the contact-form submit label.
- Adding new analytics events or a copy-management system.
- Rewriting surrounding homepage content beyond the CTA labels and the minimum supporting copy needed to prevent ambiguity.
- Adding pricing, qualification questions, CRM integration, or a custom scheduling flow.

## Further Notes

- The current active homepage is the Sketch experience.
- The current booking destination is already configured and verified as the 30-minute discovery event.
- “Start a conversation” remains a reasonable phrase for a form destination, but it is less precise for a scheduler and should not be the default booking label.
- The implementation seam is intentionally small: update shared/default CTA wording and its homepage call sites, then verify the project-page contextual exception and contact-form distinction.
