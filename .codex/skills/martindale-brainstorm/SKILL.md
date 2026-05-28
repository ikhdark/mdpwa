---
name: martindale-brainstorm
description: Use when shaping Martindale TX PWA or website requests before implementation, especially town alerts, announcements, calendar events, resident services, mayor-relayed updates, content modernization, accessibility, or communication workflows.
---

# Martindale Brainstorm

## Overview

Shape Martindale website ideas into small, accurate, resident-friendly changes before implementation. Optimize for communication clarity, low maintenance, and older/rural resident usability.

## Context First

- Read `PROJECT_NOTES.md` before proposing scope.
- Treat the live site as `https://martindaletx.app/`, the repo as `ikhdark/mdpwa`, and the legacy reference as `https://martindale.texas.gov/`.
- Assume requests may be relayed through the mayor and may start as rough notes.
- Use absolute dates for time-sensitive notices; never leave "today", "tomorrow", or "tonight" ambiguous.

## Brainstorm Flow

1. Identify the resident need: alert, event, service info, document link, contact, page cleanup, or workflow.
2. Ask only the missing high-risk questions. For urgent notices, prioritize date, start/end time, exact location, source, affected residents, detour or next action, and expiry.
3. Keep the first version small. Prefer updating existing content or one clear component before proposing CMS, automation, notifications, or admin tooling.
4. For calendar or meeting requests, verify the request against existing local event data and official source wording before accepting labels like "council meeting" or "tonight".
5. Check accessibility and rural usability: plain language, visible placement, mobile readability, strong contrast, clear phone/address/date details, and no dismiss-only critical information.
6. Call out stale-content and PWA-cache risks when content is urgent, expiring, or likely to be updated repeatedly.
7. End with an implementation-ready scope and the verification level expected.

## Subagents

Use subagents only when current tool policy permits them or the user has explicitly allowed delegation. Good Martindale subagent tasks:

- compare legacy-site content against the PWA for missing resident information
- draft plain-language announcement copy from raw facts
- audit a page for accessibility, mobile layout, stale dates, or unclear calls to action
- research independent current facts from official sources when accuracy could have changed

Do not delegate the blocking decision for an urgent notice, and do not use subagents for tiny single-file edits where coordination costs more than the work.

## Quick Reference

| Request                          | Ask First                                             | Default Scope                                    |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| Road closure or emergency notice | date, time, exact location, detour, source, expiry    | homepage/global visible alert                    |
| Council or city event            | date, time, location, agenda/link, recurrence         | calendar/event content plus optional banner      |
| Service information              | department/contact, resident action, source document  | update existing page/section                     |
| Mayor announcement               | audience, effective date, approval wording, expiry    | plain-language announcement block                |
| Modernization idea               | resident problem, maintenance owner, update frequency | smallest workflow that removes duplicate posting |

## Common Mistakes

- Do not invent missing civic facts.
- Do not overbuild a notification/CMS system for a one-off content update.
- Do not bury urgent information below decorative layout.
- Do not forget expiry or follow-up removal for temporary notices.
- Do not let visual polish reduce readability for older residents.
