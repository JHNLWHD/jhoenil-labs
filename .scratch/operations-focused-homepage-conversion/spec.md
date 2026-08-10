# Operations-focused homepage conversion

Status: ready-for-agent
Label: ready-for-agent

## Problem Statement

The website presents Jhoenil as a broad software engineer and consultant, but its strongest commercial fit is narrower: owners and operations leaders at growing, operations-heavy businesses with manual workflows. The current experience spreads attention across many capabilities and projects, which makes the visitor work to recognize the problem Jhoenil solves and the reason to book a call.

The primary business outcome is 4–8 attended, qualified discovery calls per month. The intended visitor journey is to recognize a manual workflow or visibility problem, review three relevant examples, and book a free discovery call after answering one qualification question. The current homepage and portfolio do not yet consistently support that focused journey. Proof is diluted by unrelated or archived projects, private work is often summarized thinly, the discovery-call expectation is not explicit enough, and the portfolio route uses homepage-level metadata.

The site should become more specific and credible without abandoning its hand-drawn brand personality or adding a new platform.

## Solution

Refocus the active homepage around the promise of replacing manual operations with software that improves visibility for growing, operations-heavy businesses.

Feature three anonymized, outcome-led case studies: logistics CRM, FMCG sales, and solar business. Use defensible ranges or relative improvements when exact figures are confidential, and publish only the solar results that are approved and available. Move the broader project catalog behind a clear “View all work” path.

Make the journey explicit: problem recognition, relevant proof, then a free discovery call. Use one required booking question about the manual workflow or visibility gap the prospect wants to improve. Keep the message form as the secondary asynchronous route.

Retain the hand-drawn visual language as a brand accent, while using more restrained typography, cards, metrics, and spacing for proof and booking content. Align CTA labels around “discovery call” language and give `/projects` unique page metadata and canonical behavior.

Measure attended qualified discovery calls as the primary success metric, with inquiry-to-call conversion as the secondary metric.

## User Stories

1. As an owner of a growing operations-heavy business, I want to understand within a few seconds that Jhoenil replaces manual operational work, so that I can decide whether the site is relevant to my business.
2. As an operations leader, I want the homepage to mention visibility problems and manual workflows, so that I can recognize my current situation in the offer.
3. As a prospective client, I want to understand that web apps, mobile apps, automation, and technical leadership are means to an operational outcome, so that the capabilities do not feel like unrelated services.
4. As a prospective client, I want to know that the engagement is intended for growing businesses, so that I can judge whether the level of solution is appropriate for my organization.
5. As a prospective client, I want to see that confidential client work can still be described professionally, so that privacy does not make the proof feel empty.
6. As a prospective client, I want the homepage to lead with a clear operational promise, so that I do not have to infer the business value from a list of technologies.
7. As a prospective client, I want to move from recognizing my problem to seeing relevant proof, so that the call to action feels earned.
8. As a prospective client, I want to see a logistics CRM case study, so that I can assess experience stabilizing and improving an operational platform.
9. As a prospective client, I want to see an FMCG sales case study, so that I can assess experience replacing manual sales and inventory work with real-time visibility.
10. As a prospective client, I want to see a solar-business case study, so that I can assess experience connecting internal operations with a customer-facing product.
11. As a prospective client, I want each priority case study to state the business problem, work performed, and outcome, so that I can compare the engagement with my own needs.
12. As a prospective client, I want anonymized case studies to identify industry, scope, and relevant context, so that confidentiality does not remove useful detail.
13. As a prospective client, I want metrics to use defensible ranges or relative improvements when exact values are private, so that the evidence is credible without exposing client information.
14. As a site owner, I want client names to remain anonymized unless explicitly approved, so that public proof respects confidentiality.
15. As a site owner, I want the solar case study to distinguish current work from completed outcomes, so that the site does not imply results that are not yet available.
16. As a visitor who wants broader evidence, I want a clear “View all work” path, so that I can explore the complete project catalog without distracting visitors who need the primary proof.
17. As a visitor, I want archived, private, and unrelated projects to have lower visual priority on the homepage, so that the three relevant case studies carry the main conversion story.
18. As a visitor, I want project status to remain clear, so that I can distinguish current work, delivered work, and archived work.
19. As a prospective client, I want the primary CTA to say that it starts a discovery call, so that I know what will happen after clicking.
20. As a prospective client, I want to know that the discovery call is free, so that the first step feels low-risk.
21. As a prospective client, I want to know that the discovery call lasts 30 minutes, so that the commitment is bounded and clear.
22. As a prospective client, I want to know that the call is used to understand the workflow and decide whether there is a fit, so that I can prepare appropriately.
23. As a prospective client, I want one required booking question about my manual workflow or visibility gap, so that the conversation can start with useful context.
24. As a prospective client, I want the qualification question to be short and concrete, so that it does not feel like an application form.
25. As a visitor who prefers asynchronous contact, I want the message form to remain available as a secondary path, so that I can send context without booking immediately.
26. As a visitor, I want the form and booking CTA to have distinct labels and explanations, so that I understand the difference between sending a message and scheduling a call.
27. As a mobile visitor, I want the discovery-call CTA to remain visible and easy to tap, so that I can reach out without navigating a complex menu.
28. As a mobile visitor, I want the focused homepage content to remain readable without horizontal overflow, so that the shorter conversion path works on a small screen.
29. As a desktop visitor, I want the hero, case studies, and booking CTA to have clear hierarchy, so that the page is scannable rather than visually flat.
30. As a visitor, I want the hand-drawn brand style to remain recognizable, so that the site still feels personal and distinctive.
31. As an operations leader evaluating business-critical software, I want proof, metrics, and booking content to use restrained presentation, so that the visual personality does not reduce perceived reliability.
32. As a visitor, I want metrics to explain what they measure, so that numbers such as sales volume or users are not presented without context.
33. As a visitor arriving at the project catalog from search or a shared link, I want the page title and description to describe projects and systems, so that the page matches my expectation.
34. As a search engine, I want the project catalog to have a page-specific canonical URL, so that it is not treated as a duplicate of the homepage.
35. As a visitor sharing the project catalog, I want social metadata to reflect the catalog rather than the homepage, so that the preview is relevant.
36. As a visitor, I want the homepage, project catalog, and case-study routes to load directly, so that a shared or search result link does not create a dead end.
37. As a site owner, I want discovery-call bookings to be attributable to the site journey, so that I can evaluate whether the focused homepage generates qualified opportunities.
38. As a site owner, I want attended qualified discovery calls to be the primary success measure, so that optimization is tied to business value rather than traffic alone.
39. As a site owner, I want inquiry-to-call conversion to be measured secondarily, so that friction between initial contact and a scheduled call is visible.
40. As a site owner, I want the target of 4–8 attended qualified calls per month to guide evaluation, so that success has a concrete operating range.
41. As a maintainer, I want priority case-study content to come from the existing content source, so that facts do not drift across homepage and project views.
42. As a maintainer, I want the shared booking CTA and existing analytics provider reused, so that scheduling and measurement remain centralized.
43. As a maintainer, I want the change to preserve the existing static-site architecture and dependencies, so that the conversion improvement stays small and deployable.
44. As a maintainer, I want the browser acceptance seam to cover the rendered journey at desktop and mobile widths, so that the behavior is tested where visitors experience it.

## Implementation Decisions

- Treat the active rendered homepage as the primary product surface and conversion journey.
- Use owners and operations leaders at growing, operations-heavy businesses as the primary audience model.
- Use “replace manual operations with software that improves visibility” as the core positioning.
- Keep the primary journey as problem recognition → three relevant case studies → free 30-minute discovery call with one qualification question.
- Feature only the logistics CRM, FMCG sales, and solar-business case studies in the homepage proof section.
- Keep clients anonymized. Use industry, scope, location where safe, delivery role, and approved outcomes rather than client names.
- Use ranges or relative outcomes when exact figures are confidential; do not invent precision.
- Present the solar engagement according to its real status and publish final outcomes only when approved and available.
- Move the broader project catalog behind “View all work” while preserving direct project routes and existing project statuses.
- Retain the hand-drawn visual language as a brand accent.
- Use steadier typography, spacing, card treatment, and hierarchy for proof, metrics, and booking content.
- Align scheduler CTA language around a free 30-minute discovery call. Keep the message form as the distinct asynchronous alternative.
- Add one required qualification question to the booking flow: what manual process or visibility gap the prospect wants to improve.
- Reuse the existing shared booking integration and analytics provider. Do not add a second scheduler, CRM, custom qualification system, or new dependency.
- Keep the existing message-form handling, validation, privacy microcopy, and success/error behavior unless a focused change is required to distinguish it from booking.
- Give the project catalog unique title, description, social metadata, and canonical URL values.
- Preserve valid deep-link behavior for the homepage, project catalog, and priority case-study routes.
- Measure attended qualified discovery calls as the primary metric and inquiry-to-call conversion as the secondary metric, with 4–8 attended qualified calls per month as the initial target.
- Keep content and implementation changes narrowly scoped to the active route and existing content/CTA seams; do not expand unused alternate components.

## Testing Decisions

- Test external behavior at the browser acceptance seam rather than implementation details.
- At desktop width, verify that the homepage communicates the positioning, shows the three priority case studies in the intended order, provides the “View all work” path, and exposes the discovery-call CTA.
- At 390px mobile width, verify that the header CTA and menu remain usable, the focused homepage does not overflow horizontally, priority case studies remain readable, and the booking path remains tappable.
- Verify each priority case-study route renders its approved anonymized content, correct status, and outcome framing.
- Verify the broader project catalog remains reachable from “View all work” and does not replace the focused homepage proof section.
- Verify the discovery-call CTA opens the configured free 30-minute event and that the one required qualification question is present at the agreed booking boundary.
- Verify the message form remains visibly distinct from booking and continues to expose accessible labels, native required-field validation, honeypot protection, and distinct success/error feedback.
- Verify `/projects` exposes a project-specific title, description, social metadata, and canonical URL rather than homepage metadata.
- Verify direct navigation to the homepage, project catalog, and priority case-study routes succeeds without a hosting fallback error.
- Verify the visual hierarchy retains hand-drawn accents while proof, metrics, and booking content remain readable and restrained at desktop and mobile widths.
- Verify analytics records the relevant conversion boundaries without capturing message contents or unnecessary personal data. The implementation must make attended-call and inquiry-to-call reporting possible through the existing measurement setup or clearly document the external scheduling boundary.
- Verify content checks reject unapproved client names and unsupported solar outcomes.
- Run the existing production build and lint checks, recording unrelated pre-existing failures separately.
- Prior art is the existing rendered React homepage, shared booking CTA, existing project routes, native form validation, Netlify form handling, and PostHog provider. No new test framework is required.

## Out of Scope

- A full visual redesign or replacement of the hand-drawn visual language.
- Naming anonymized logistics or FMCG clients without explicit approval.
- Publishing unsupported or unapproved solar results.
- Rewriting every project into a long-form case study.
- Adding government document tracking or mobile access control as priority case studies.
- Adding a portfolio search, filter, carousel, CMS, or new content platform.
- Building a custom scheduler, CRM, lead-scoring system, or automated qualification flow.
- Adding pricing, checkout, user accounts, or a sales pipeline.
- Replacing Netlify Forms, PostHog, or the existing Cal.com integration.
- Optimizing for page views, raw CTA clicks, or traffic volume as the primary success measure.
- Editing unused alternate homepage components unless they become part of the active route.
- Broad cleanup of unrelated lint errors or infrastructure.

## Further Notes

- The initial target is 4–8 attended qualified discovery calls per month; review this after 30 days of real data.
- The qualification question should remain one concise prompt to preserve conversion and avoid turning booking into a lead form.
- The three case studies should be evaluated by relevance to operations leaders, not by the total number of projects displayed.
- The issue is ready for implementation only after approved anonymized outcome details and the publishable solar status are available.
