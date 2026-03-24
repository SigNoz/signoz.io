# AGENTS.md - SigNoz Docs + Web Contributor Guide

This is the default operating context for coding agents in this repo.
Keep this file high-signal and task-oriented. Use skills for explicit, specialized workflows.

## Instruction Precedence

If guidance conflicts, follow:

1. Direct user/developer instructions in the session
2. `CONTRIBUTING.md` and the linked playbooks under `contributing/**`
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

## Verification

- Use the canonical verification matrix in `contributing/repo-workflow.md#verification-matrix`.

## Task Playbooks

### Docs authoring/review (`data/docs/**`)

- Use `CONTRIBUTING.md` as the entrypoint and `contributing/docs-authoring.md` plus `contributing/docs-review.md` for detailed standards.
- If a docs path/URL changes:
  - add a permanent redirect in `next.config.js`
  - update links and `constants/docsSideNav.ts`
  - update discovery surfaces when relevant (see the redirects and discovery section in `contributing/docs-authoring.md`)
- For OpenTelemetry technical claims, verify against official sources first:
  1. `https://opentelemetry.io/docs/*`
  2. `https://github.com/open-telemetry/*`

### Blog changes (`data/blog/**`)

- Follow `contributing/blog-workflow.md`.
- Do not force docs-only checklist items when they do not apply to blogs.

### Frontend/site code (`app/**`, `components/**`, `hooks/**`, `utils/**`)

- Follow `contributing/site-code.md`.
- If a change affects docs MDX components or docs rendering, verify both agent markdown (`utils/docs/agentMarkdownStubs.ts`) and Copy Markdown (`utils/docs/buildCopyMarkdownFromRendered.ts`) behavior.

### PR review output

- Prioritize actionable findings with file references.
- Focus on concrete issues and fixes, not praise-only comments.
- If no issues are found, state that explicitly and call out residual risks/testing gaps.

## Boundaries (Always / Ask First / Never)

### Always

- Keep changes focused and minimal for the task.
- Use explicit commands from this file and the relevant `contributing/**` playbook.
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
