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

Listicles are rendered by a single generic component (`components/Listicle/Listicle.tsx`), driven by JSON config files in `constants/listicles/`. MDX files use `<Listicle name="..." />` to render them.

### Architecture

Each listicle is fully self-contained in a single JSON file — items, icons, markdown output title, sections, and layout are all in one place.

| Layer        | Location                           | Purpose                                                                         |
| ------------ | ---------------------------------- | ------------------------------------------------------------------------------- |
| JSON configs | `constants/listicles/*.json`       | Items, icons, markdown title, sections, layout — everything in one file         |
| Registry     | `constants/listicles/registry.ts`  | Maps `name` string to config; `index.ts` re-exports                             |
| Utilities    | `constants/listicles/utils.ts`     | Shared traversal for rendered UI and agent markdown                             |
| Component    | `components/Listicle/Listicle.tsx` | Generic renderer for flat, sectioned, and searchable patterns                   |
| Icons        | `data-assets/img/icons/listicle/*.svg` | Generated SVGs (brand icons); existing assets elsewhere are referenced directly |
| MDX usage    | `data/docs/**/*.mdx`               | `<Listicle name="..." />` with optional `defaultSection`                        |
| Agent stubs  | `utils/docs/agentMarkdownStubs.ts` | Markdown fallback — auto-extracts items from JSON configs                       |

Discovery grids (quick starts, migration vendors, web vitals, instrumentation hubs, etc.) are listicles in `constants/listicles/*.json`. Use `<Listicle name="..." />` in MDX; agent markdown stubs read the same JSON automatically.

`HostingDecision` is the one exception: it is a prose + CTA banner (`components/shared/HostingDecision.tsx`), not an icon card grid. Its link targets are defined inline in that component and mirrored in the `HostingDecision` agent stub.

### Adding a new listicle

1. **Create a JSON config** — add `constants/listicles/<name>.json`. Choose the pattern:
   - `"flat"` — single grid, no filtering
   - `"sectioned"` — navigation pills with categorized sections
   - `"searchable"` — search input with flat grid
2. **Add metadata and items** — set `markdownTitle` to the heading that should appear in agent/Copy Markdown output. Each item needs `name`, `href`, and `icon`. Optional: `clickName` (defaults to `name`).
3. **Register** — import the JSON in `constants/listicles/registry.ts` and add it to the `listicleConfigs` map.
4. **Use in MDX** — add `<Listicle name="<name>" />` in the docs page. Use `defaultSection` to pre-select a pill.

Agent stubs auto-discover items from the JSON, including `defaultSection` behavior — no separate stub update needed.

### Updating an existing listicle

- **Add/remove items**: edit the `items` array in the JSON config directly. Each item has `name`, `href`, `icon`, and optional `clickName`.
- **Change icons**: update the `icon` path on the item. To generate a new SVG from a react-icon, add it to `scripts/generate-listicle-icons.mjs` and re-run the script.
- **Add/remove sections**: edit the `sections` array in the JSON config. Move items between sections as needed.

### JSON config reference

**Flat listicle:**

```jsonc
{
  "id": "example", // Matches the `name` prop in MDX
  "pattern": "flat", // "flat" | "sectioned" | "searchable"
  "markdownTitle": "Example Guides", // Heading used in markdown fallback output
  "sectionName": "Example Section", // For click tracking
  "gridCols": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  "items": [
    {
      "name": "Foo Service",
      "href": "/docs/example/foo",
      "icon": "/img/icons/listicle/si-foo.svg",
    },
    {
      "name": "Bar Service",
      "href": "/docs/example/bar",
      "icon": { "badge": "BR", "color": "#dc2626" },
    },
  ],
}
```

**Sectioned listicle:**

```jsonc
{
  "id": "example",
  "pattern": "sectioned",
  "markdownTitle": "Example Guides",
  "sectionName": "Example",
  "sections": [
    {
      "id": "category-a",
      "label": "Category A", // Pill text
      "title": "Category A Items", // Section heading
      "sectionName": "Category A", // For click tracking
      "items": [
        { "name": "Item 1", "href": "/docs/item-1", "icon": "/img/icons/listicle/si-item1.svg" },
      ],
    },
  ],
}
```

### Verification after listicle changes

```bash
node --test tests/component-items-sync.test.js
node --test tests/agent-markdown-stubs.test.js
yarn build
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
