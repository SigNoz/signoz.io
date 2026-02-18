# AGENTS.md - SigNoz Docs + Web Contributor Guide

This is the default operating context for coding agents in this repo.
Keep this file high-signal and task-oriented. Use skills for explicit, specialized workflows.

## Instruction Precedence

If guidance conflicts, follow:

1. Direct user/developer instructions in the session
2. `CONTRIBUTING.md`
3. This file

## Agent Role

You are a focused contributor for `signoz.io`.

- Make minimal, correct, task-scoped changes.
- Run relevant verification commands before finishing.
- Report failures with root cause; do not hide or bypass them silently.

## Project Snapshot

- Stack: Next.js App Router, React, TypeScript, Tailwind CSS
- Package manager: Yarn
- App/UI: `app/`, `components/`, `layouts/`, `hooks/`, `utils/`, `constants/`
- Docs/content: `data/docs/`, `data/blog/`, images in `public/img/docs/`
- Docs navigation and URLs:
  - sidebar: `constants/docsSideNav.ts`
  - redirects: `next.config.js`
- Scripts/tests: `scripts/`, `tests/`

## Commands (Run Early and Often)

- Install deps: `yarn install`
- Dev server: `yarn dev`
- Build: `yarn build`
- Lint (auto-fix): `yarn lint`
- Docs redirects check: `yarn check:doc-redirects`
- Docs metadata check: `yarn check:docs-metadata`
- Redirect tests: `yarn test:doc-redirects`
- Metadata tests: `yarn test:docs-metadata`

## Verification Matrix

- Docs changes (`data/docs/**`, docs images, docs nav, redirects/scripts):
  - `yarn check:docs-metadata`
  - `yarn check:doc-redirects`
  - `yarn test:docs-metadata`
  - `yarn test:doc-redirects`
- Site code changes (`app/**`, `components/**`, `hooks/**`, `utils/**`, etc.):
  - `yarn lint`
  - `yarn build`
- Mixed docs + code changes: run both sets.

## Task Playbooks

### Docs authoring/review (`data/docs/**`)

- Apply `CONTRIBUTING.md` directly for docs standards and checklist.
- Optimize for happy/common path first; move edge cases to troubleshooting/optional sections.
- Keep mandatory steps minimal, outcome-oriented, and in recommended defaults.
- Add links only when they help complete the current step.
- If a docs path/URL changes:
  - add a permanent redirect in `next.config.js`
  - update links and `constants/docsSideNav.ts`
- For OpenTelemetry technical claims, verify against official sources first:
  1. `https://opentelemetry.io/docs/*`
  2. `https://github.com/open-telemetry/*`

### Blog changes (`data/blog/**`)

- Follow blog workflow sections in `CONTRIBUTING.md` ("Contribute a Doc or Blog Post" and "Blog Notes").
- Do not force docs-only checklist items when they do not apply to blogs.

### Frontend/site code (`app/**`, `components/**`, `hooks/**`, `utils/**`)

- Prefer existing patterns/components before adding abstractions.
- Use Next.js App Router conventions already present in the repo.
- Keep types/constants organized per existing conventions.
- Avoid new dependencies unless required; include justification in PR context.

### PR review output

- Prioritize actionable findings with file references.
- Focus on concrete issues and fixes, not praise-only comments.
- If no issues are found, state that explicitly and call out residual risks/testing gaps.

## Boundaries (Always / Ask First / Never)

### Always

- Keep changes focused and minimal for the task.
- Use explicit commands from this file and `CONTRIBUTING.md`.
- Report what ran, what failed, and why.

### Ask First

- Adding/removing dependencies.
- Large refactors or folder reorganizations outside task scope.
- Destructive operations or significant URL/IA changes beyond requested work.

### Never

- Commit secrets or credentials.
- Run destructive git operations (for example `reset --hard`, force cleanup) unless explicitly requested.
- Bypass failing checks silently.

## AGENTS vs Skills

- Keep core repo rules in `AGENTS.md` because this context is always available.
- Use skills for targeted, action-specific workflows.
- When in doubt, prefer this file for baseline behavior and use skills as add-ons.

## Single-Source Alias

- `CLAUDE.md` must be a symlink to this file.
