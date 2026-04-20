# AGENTS.md

## Project Snapshot

- Stack: Next.js App Router, React, TypeScript, Tailwind CSS
- Package manager: Yarn
- App/UI: `app/`, `components/`, `layouts/`, `hooks/`, `utils/`, `constants/`
- Docs/content: `data/docs/`, `data/blog/`, images in `public/img/docs/`
- Docs navigation and URLs:
  - sidebar: `constants/docsSideNav.ts`
  - redirects: `next.config.js`
- Scripts/tests: `scripts/`, `tests/`

## Verification

Run before finishing. Setup commands (`yarn install`, `yarn dev`) are in `README.md`.

- Docs changes (`data/docs/**`, docs images, docs nav, redirects/scripts):
  - `yarn check:docs-metadata` + `yarn test:docs-metadata`
  - `yarn check:doc-redirects` + `yarn test:doc-redirects`
- Site code changes (`app/**`, `components/**`, `hooks/**`, `utils/**`, etc.):
  - `yarn lint` (auto-fixes)
  - `yarn build`
- Mixed docs + code changes: run both sets.

## Task Playbooks

### Docs authoring/review (`data/docs/**`)

- Apply `CONTRIBUTING.md` directly for docs standards and checklist.
- Optimize for happy/common path first; move edge cases to troubleshooting/optional sections.
- Keep mandatory steps minimal, outcome-oriented, and in recommended defaults.
- Link conventions (commonly missed — double-check every time):
  - **Internal links must use absolute URLs**: `[Text](https://signoz.io/docs/...)`, not site-relative `[Text](/docs/...)`. Applies to body prose, `DocCard` `href`, and any link inside MDX components.
  - **External links must use the MDX anchor form** with the required `rel` attributes: `<a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">Example</a>`. Do not use plain markdown `[text](https://...)` for non-signoz.io URLs.
- If a docs path/URL changes:
  - add a permanent redirect in `next.config.js`
  - update links and `constants/docsSideNav.ts`
  - update discovery surfaces when relevant (see the redirects and discovery section in `contributing/docs-authoring.md`)
- For OpenTelemetry technical claims, verify against official sources first:
  1. `https://opentelemetry.io/docs/*`
  2. `https://github.com/open-telemetry/*`

### Blog changes (`data/blog/**`)

- Follow blog workflow sections in `CONTRIBUTING.md` ("Contribute a Doc or Blog Post" and "Blog Notes").

### Frontend/site code (`app/**`, `components/**`, `hooks/**`, `utils/**`)

- Follow `contributing/site-code.md`.
- If a change affects docs MDX components or docs rendering, verify both agent markdown (`utils/docs/agentMarkdownStubs.ts`) and Copy Markdown (`utils/docs/buildCopyMarkdownFromRendered.ts`) behavior.

### PR review output

- Prioritize actionable findings with file references.
- Focus on concrete issues and fixes, not praise-only comments.
- If no issues are found, state that explicitly and call out residual risks/testing gaps.

