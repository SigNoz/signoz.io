# Site Code

Use this playbook when changing frontend or site code such as `app/**`, `components/**`, `hooks/**`, `utils/**`, `constants/**`, and related config.

## Core Expectations

- Prefer existing patterns and components before introducing new abstractions.
- Follow existing Next.js App Router conventions in the repo.
- Keep changes minimal and task-scoped.
- Avoid new dependencies unless they are clearly required.
- Report what you ran and what failed.

## UI And Assets

- Prefer `lucide-react` or `react-icons` for icons.
- If you need a custom brand or logo asset, place it under `public/svgs/**` and reference it via `/svgs/...`.
- Prefer existing primitives in `components/ui/**` for interactive UI.
- Avoid styling overrides unless they are necessary and consistent with existing Tailwind patterns.

## Types, Constants, And Organization

- Keep component-local types and constants in dedicated files when they are reused or meaningfully sized.
- Export shared pieces through folder `index.ts` files when that matches the existing pattern.
- Keep constants and helper shapes organized according to nearby code conventions.

## OpenTelemetry resource hub

- Hub navigation structure lives in [`constants/opentelemetry_hub.json`](../constants/opentelemetry_hub.json).
- Each article entry should include a `title` string (sidebar label). If omitted, the label is derived from the last URL segment (slug, hyphenated words title-cased). Hub nav is built from this JSON plus URLs.
- When you change the visible title of a linked page, update both the page frontmatter (or CMS fields where applicable) **and** the `title` field in the JSON.

## Listicle And Discovery Data

- Keep listicle and icon-card source data in `constants/componentItems/*.ts`, not inside React components.
- Treat `constants/componentItems.ts` as the public barrel only.
- Use one top-level export per source file.
- Use a flat `ComponentItem[]` for ungrouped surfaces.
- Use named sub-keys for grouped surfaces, such as `cloud: { aws, azure, gcp }`.
- When a grouped structure is used, also export a `getAll*()` helper that flattens every leaf array for shared consumers and tests.
- Never use hardcoded `slice()` boundaries to fake sections.
- After adding or removing items, update the relevant `ICON_MAP` and run:

```bash
yarn tsc --noEmit
node --test tests/component-items-sync.test.js
```

## Async And DOM Safety

- Prevent concurrent async invocations in click handlers by setting loading state before `await` or guarding with a ref.
- Be deliberate about DOM cleanup and transforms.
- When preparing rendered HTML for transforms such as HTML-to-Markdown, avoid redundant selectors and preserve cleanup order.

## Docs Rendering Compatibility

If a change affects docs MDX components or rendered docs output:

- review agent markdown behavior in `utils/docs/agentMarkdownStubs.ts`
- keep `tests/agent-markdown-*.test.js` coverage up to date
- verify rendered Copy Markdown output through `utils/docs/buildCopyMarkdownFromRendered.ts`
- add or update targeted tests when practical

## Dependency Policy

- Do not add packages unless there is no suitable existing dependency.
- If you add one, justify it in the PR description and ensure it is actually used.

## Verification

For site code changes, run:

```bash
yarn lint
yarn build
```

For mixed docs + site changes, also run the relevant docs checks from [repo-workflow.md](repo-workflow.md).
