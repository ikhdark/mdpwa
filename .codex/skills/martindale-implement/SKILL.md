---
name: martindale-implement
description: Use when implementing or auditing Martindale TX PWA changes in the Next.js repo, including alerts, announcements, pages, PWA behavior, accessibility fixes, tooling updates, pnpm scripts, lint, knip, typecheck, tests, builds, or Vercel-ready verification.
---

# Martindale Implement

## Overview

Implement Martindale PWA changes with the repo's pnpm toolchain and resident-facing constraints. Keep edits small, verifiable, accessible, and easy for future maintainers to update.

## Start Here

1. Read `PROJECT_NOTES.md`, `package.json`, and the touched app/component files.
2. Use `rg` / `rg --files` for discovery.
3. Preserve unrelated worktree changes. Do not reset, checkout, or delete user edits.
4. Prefer existing Next.js App Router, React, Tailwind, PWA, and layout patterns.
5. If the request is not already scoped, use `martindale-brainstorm` before editing.

## Implementation Rules

- Use `pnpm`, not npm, for install and scripts.
- Keep public-facing copy plain, date-specific, and action-oriented.
- Check existing local data such as `src/lib/events.ts` before adding event banners or meeting copy; do not trust rough labels without source confirmation.
- For urgent or temporary content, include an expiry/removal path or clearly report that it is static and must be removed later.
- Preserve PWA install behavior, analytics, `manifest.json`, service worker behavior, robots, sitemap, and mobile layout unless the task targets them.
- Use semantic HTML and readable Tailwind classes; do not introduce small, low-contrast, or dismiss-only critical notices.
- Add focused tests for behavior changes when a practical test surface exists.
- Use `apply_patch` for manual edits.

## Subagents

Use subagents only when current tool policy permits them or the user has explicitly allowed delegation. Split only independent work:

- one agent audits accessibility/mobile/copy while the main agent implements
- one agent compares legacy-site content or official sources while the main agent edits local UI
- one agent reviews a finished diff against this skill before final verification

Do not delegate urgent blocking implementation. Give each subagent a disjoint read/write scope and verify its output before trusting it.

## Verification

| Change Type                                                    | Minimum Check                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| content-only copy edit                                         | `pnpm verify:fast`                                                 |
| component/layout/style edit                                    | `pnpm verify:fast` plus browser check when visual behavior changed |
| PWA, routing, analytics, metadata, dependency, or tooling edit | `pnpm verify:full`                                                 |
| package graph change                                           | `pnpm peers check` and `pnpm audit --prod`                         |
| toolchain availability question                                | `pnpm tools -- doctor --strict --json`                             |

Run `pnpm verify:full` before calling broad maintenance/tooling work complete. For visible UI changes, start the dev server (`pnpm dev`) and inspect the relevant page at `http://localhost:3002` when feasible.

## Common Mistakes

- Do not use generic commands like `npm test` or `localhost:3000` when this repo uses pnpm and port `3002`.
- Do not treat `knip` as optional after dependency or export changes.
- Do not update town notices with relative dates only.
- Do not overfit a one-off request into a large admin system unless the user asked for that workflow.
- Do not claim build, lint, or audit success without fresh command output.
