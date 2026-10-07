---
name: signoz-storybook-stories
description: Create, update, or regenerate Storybook stories for signoz.io MDX components, following this repo's story shape (Preview story, per-story mdxUsage, snapshot budget, light/dark coverage) and refreshing the Introduction.mdx coverage table. Use when asked to "add a story", "add a component to Storybook", "update stories", "regenerate the coverage table", or after adding/changing anything registered in components/MDXComponents.tsx.
---

# SigNoz Storybook Stories

Every component registered in `components/MDXComponents.tsx` has a story under
`stories/`. These are the components docs and blog authors write against, so the
stories serve two audiences at once: a reviewer checking how something looks, and
an author copying markup into `data/docs/**` or `data/blog/**`.

This skill defines the shape story files take so they stay comparable, cheap to
snapshot, and truthful about real usage.

## Where files go

`stories/<category>/<Component>.stories.tsx`, title `MDX Components/<Category>/<Name>`.

| Category | Contents |
| --- | --- |
| `html-overrides/` | Elements MDX maps to components: `a`, `table`, `pre`/`code` |
| `callouts/` | Admonition, Tooltip |
| `code/` | Tabs, CodeTabs, Region, VersionPin |
| `content/` | Figure, YouTube, Listicle, DocCard, InterlinkCard, ToggleHeading, Carousel |
| `ctas/` | Buttons, GetStarted |
| `comparisons/` | VsSigNoz, ProductFeatureShowcase |
| `interactive/` | Animated or stateful graphics |
| `shared-partials/` | `components/shared/*` docs partials, ArticleSeries |

## Required story shape

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Admonition from '@/components/Admonition/Admonition'

// Shared consts: the rendered story and the MDX shown to the author come from
// one source and cannot drift apart.
const noteMdx = `
<Admonition type="note">
  Restarting the collector drops buffered telemetry.
</Admonition>
`

const meta = {
  title: 'MDX Components/Callouts/Admonition',
  component: Admonition,
  parameters: {
    // Feeds the "Usage in MDX" section on the docs page. Must match the FIRST
    // story export in the file.
    mdxUsage: noteMdx,
    // Snapshot budget: only Preview is captured. See below.
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof Admonition>

export default meta
type Story = StoryObj<typeof meta>

// 1. Preview is always the first export: every state in one canvas.
export const Preview: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Admonition type="note">Note</Admonition>
      <Admonition type="warning">Warning</Admonition>
    </div>
  ),
}

// 2. Then one story per state, each with its own matching snippet.
export const Note: Story = {
  parameters: { mdxUsage: noteMdx },
  args: { type: 'note', children: 'Restarting the collector drops buffered telemetry.' },
}
```

### Rules

1. **`Preview` first.** It renders every meaningful state stacked in one canvas, so
   a reviewer sees the whole surface at a glance.
2. **Snapshot budget.** `chromatic: { disableSnapshot: true }` on the meta,
   `{ disableSnapshot: false }` on `Preview` only. One snapshot per component
   instead of one per state keeps visual-testing cost flat as stories grow.
   Re-enable a single story only for a state `Preview` cannot show (a hover or
   open state driven by a play function). Components that never settle — a
   self-driven `requestAnimationFrame` graphic, for example — stay disabled
   everywhere rather than snapshotting flaky pixels.
3. **Every story carries its own `mdxUsage`.** A docs page renders all of a
   component's stories on one page, each canvas exposing its own snippet through
   Show MDX / Copy MDX. A snippet must produce exactly what its story renders:
   same tab labels, same commands, same props.
4. **Snippets are paste-ready MDX.** Bare MDX/markdown, no imports (components are
   registered globally and must never be imported inside an MDX file), no
   React-only constructs (`{' '}`, wrapping `<p>`, JS expressions). Base them on a
   real usage found in `data/docs/**` or `data/blog/**`, not invented API.
5. **Escaping inside template literals:** backticks as `` \` ``, `${` as `\${`.
6. **Prose wrapper.** Stories render inside the docs `prose` wrapper by default;
   marketing/full-bleed components opt out with `parameters: { docsProse: false }`.
   Mirror how docs actually write the markup — a CTA is `<a href><Button>…</Button></a>`,
   because the inner `button` element is what stops prose from underlining the label.
7. **Animation.** Add `chromatic: { pauseAnimationAtEnd: true }` so snapshots land
   on a settled frame.
8. **Type-clean.** `stories/` is typechecked by `next build`. Run `yarn tsc --noEmit`
   and `npx prettier --write stories/`.

## Light and dark are both required

The site ships dark today, but the design tokens define both palettes and the
Storybook toolbar has a light/dark toggle. **Every component must render correctly
in both themes**, and each new story must be checked in both before it ships.

Use the semantic tokens from `@signozhq/design-tokens` (loaded through
`css/tailwind.css`). They are already theme-aware: `[data-theme=default]` defines
the light values and `[data-theme=default].dark` overrides them, so a component
built from tokens follows the toggle with no extra work.

```tsx
// Good: same class works in both themes.
<div className="bg-[var(--l2-background)] text-[var(--l1-foreground)] border-[var(--l1-border)]">
```

Token families available: surfaces and text at three elevations
(`--l1|l2|l3-background`, `-background-hover`, `-foreground`, `-foreground-hover`,
`-border`), intent colors (`--primary-*`, `--success-*`, `--warning-*`, `--danger-*`),
callout tones (`--callout-primary|success|warning|error|aqua|sienna-*` for
background/border/title/description/icon), and accents (`--accent-primary`,
`--accent-forest`, `--accent-amber`, `--accent-cherry`, …).

`components/DocCard.tsx` and `components/Admonition/Admonition.tsx` are the
reference implementations — both are built entirely from tokens and need no
theme-specific branching.

**What breaks light mode:**

- Fixed palette classes (`bg-signoz_ink-400`, `text-signoz_vanilla-100`,
  `border-signoz_slate-500`). These are single colors, not token pairs, so a
  surface built from them stays dark on a light page. `components/Region/*` and
  `components/Listicle/*` still do this.
- `text-white` / `text-black`, and white-on-transparent image assets.
- Colors baked into canvas/WebGL/SVG fills, which no CSS variable reaches.

When touching a component for a story and you hit one of these, prefer swapping to
the matching semantic token. If that is out of scope for the change, pair the
palette class with a `dark:` variant so both themes are covered, and note the
remaining gap in your summary rather than leaving it silently broken.

Check both themes before finishing:

```
http://localhost:6006/?path=/story/<story-id>&globals=theme:dark
http://localhost:6006/?path=/story/<story-id>&globals=theme:light
```

## Rendering real MDX pipeline output

Fenced code blocks, tables, and links must reach components with the props the
production pipeline produces, not hand-written fakes:

```tsx
import { markdownToHast, renderHast } from '../lib/markdownFixture'

export const Basic: Story = {
  loaders: [async () => ({ tree: await markdownToHast('```bash\ndocker compose up -d\n```') })],
  render: (_args, { loaded }) => <>{renderHast(loaded.tree)}</>,
}
```

`stories/lib/markdownFixture.tsx` runs the same remark/rehype plugins as docs pages
(`utils/mdx/rehypeDocsPlugins.ts`), so Shiki highlighting, code titles, line
numbers, and `<region>` substitution behave exactly as in production. `compileMDX`
from `next-mdx-remote/rsc` is RSC-only and cannot run here.

Note that a code block's rendered output can legitimately differ from its snippet:
an author types the `<region>` placeholder and the component substitutes the
selected workspace region. That is the feature, not a drift bug.

## Regenerating the coverage table

`stories/Introduction.mdx` maps every key in `components/MDXComponents.tsx` to its
story, with no "planned" placeholders. To refresh:

1. Enumerate the registered keys:
   ```bash
   node -e "const s=require('fs').readFileSync('components/MDXComponents.tsx','utf8').split('export const components = {')[1];console.log([...s.matchAll(/^  ([A-Za-z_][\w]*)\s*[,:]/gm)].map(m=>m[1]).join('\n'))"
   ```
2. Find each key's story title: `grep -rn "title:" stories/`.
3. Rewrite the rows so every key points at a live story.
4. Confirm the count matches and the table renders as a table — the docs MDX
   compiler needs `remark-gfm`, already wired in `.storybook/main.ts`.

## Verifying

```bash
yarn storybook          # dev server at localhost:6006
yarn build-storybook    # must pass
yarn tsc --noEmit       # no errors under stories/ or .storybook/
```

In the browser, confirm for each new or changed story that:

- the Show MDX panel matches the component rendered above it,
- no two canvases on a docs page show the same snippet,
- the component renders correctly in **both** light and dark.

Visual regression setup and the snapshot workflow are documented in
[VISUAL_TESTING.md](../../../VISUAL_TESTING.md).
