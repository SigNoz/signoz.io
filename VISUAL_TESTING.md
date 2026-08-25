# Visual Testing

This repo uses [Chromatic](https://www.chromatic.com/) to catch unintended visual
changes in the MDX components that docs and blog posts are built from. Chromatic
builds the Storybook defined in `.storybook/`, renders the snapshot stories into
images, and diffs them against an accepted baseline. When a snapshot changes, the
build is flagged for human review.

Story conventions - including the snapshot budget described below - live in
`.agents/skills/signoz-storybook-stories/SKILL.md`.

## What it covers

The Storybook documents every component registered in `components/MDXComponents.tsx`
- the ones an author can use inside `data/docs/**` and `data/blog/**`. Chromatic
therefore protects the rendering of docs content: callouts, code blocks, tabs,
cards, CTAs, and the interactive graphics.

It does **not** cover full pages (`app/**`). Adding page-level stories later would
let us catch breaking changes across layouts and shared chrome; see
[Not covered yet](#not-covered-yet).

### Visual vs behavioural testing

Chromatic catches pixel-level changes: layout shifts, colour tweaks, spacing and
styling regressions. It does not verify behaviour - click handlers, state
transitions, or data fetching. Those belong in `yarn test` (Vitest).

Accessibility is checked separately by the `@storybook/addon-a11y` panel while you
browse a story; it is not part of the snapshot diff.

## How it runs

Two workflows:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `.github/workflows/chromatic-pr.yml` | Every PR to `main` | Builds and publishes the Storybook, diffs against the `main` baseline, posts the **Storybook Publish** and **UI Tests** checks on the PR. |
| `.github/workflows/chromatic-main.yml` | PR merged to `main` **with the `update-visual-testing` label** | Republishes from the merge commit and auto-accepts the result as the new baseline. |

Day to day:

1. Open a PR that touches components, stories, or CSS.
2. Open the **UI Tests** check and review each diff - accept intended changes, deny regressions.
3. Use the **Storybook Publish** check link to browse that commit's Storybook.
4. When merging a PR whose visual changes should become the new baseline, add the
   `update-visual-testing` label before merge.

`onlyChanged: true` (TurboSnap) is enabled, so a PR that touches no story or its
dependencies publishes the Storybook but snapshots nothing. Docs-only PRs cost no
snapshots.

### Fork PRs

GitHub withholds secrets from `pull_request` events raised by forks, so
`CHROMATIC_PROJECT_TOKEN` is unavailable and the job fails on external
contributions. If community PRs become noisy, guard the job with:

```yaml
if: github.event.pull_request.head.repo.full_name == github.repository
```

Do **not** switch to `pull_request_target` to work around this - it runs untrusted
PR code with access to secrets.

## The snapshot budget

Snapshots are the billed unit, so the story files are shaped to keep the count flat
as coverage grows.

Each component has one **`Preview`** story that renders every meaningful state in a
single canvas. That is the only story Chromatic captures. The remaining
per-state stories exist for browsing and for the copy-pasteable MDX snippets, and
are excluded from snapshots:

```ts
const meta = {
  parameters: {
    chromatic: { disableSnapshot: true },   // meta: exclude everything
  },
}

export const Preview: Story = {
  parameters: { chromatic: { disableSnapshot: false } },  // …except Preview
  render: () => (/* every state stacked */),
}
```

Roughly one snapshot per component instead of one per state. Re-enable a specific
story only when it has a state `Preview` genuinely cannot show - for example a
hover or open state driven by a play function.

The full convention lives in the `signoz-storybook-stories` skill
(`.agents/skills/signoz-storybook-stories/SKILL.md`).

## Writing stories that snapshot well

### Use deterministic data

Snapshots must be byte-identical across runs. Avoid anything that varies:
`Date.now()`, `Math.random()`, live network responses, real timestamps.

The preview already stubs the one network call the components make:
`RegionProvider` fetches `${NEXT_PUBLIC_CONTROL_PLANE_URL}/regions` on mount, and
`.storybook/preview.tsx` answers it with a fixed `us`/`eu`/`in` payload. Region-aware
code blocks therefore render the same region every run.

### Handle animations

An animation captured mid-flight produces a different image each run. Pin it:

```ts
parameters: { chromatic: { pauseAnimationAtEnd: true } }
```

`OtelCollectorFlow` (framer-motion) uses this. `IncidentCostGraphic` is a
self-driven `requestAnimationFrame` SVG gated by an IntersectionObserver - it never
settles, so it is excluded from snapshots entirely rather than made flaky.

### Themes

The design tokens define both a light and a dark palette, and the toolbar toggle
(`@storybook/addon-themes`) switches between them. The site itself always renders
dark, so the default theme is dark and that is what gets snapshotted. Add a
light-mode story only where light rendering is a real risk.

## Debugging failures

When a diff appears:

1. Open the **UI Tests** check and look at the highlighted region.
2. If the change is intended, accept it. If not, fix the component and push.
3. If the same story flips back and forth across builds without code changes, it is
   flaky - find the nondeterminism rather than accepting it repeatedly.

Common flakiness causes here: an unpinned animation, a component that measures the
viewport on mount, a fetch that escaped the region stub, or a font that had not
loaded when the snapshot was taken.

## Baseline management

The baseline is whatever was last accepted on `main`. It moves only through
`chromatic-main.yml`, which requires the `update-visual-testing` label on the merged
PR. If a baseline drifts wrong - for example a regression was accepted by mistake -
fix the component and merge with the label to reset it.

Avoid accepting diffs you do not understand. An accepted regression becomes the
reference every later PR is compared against.

## Not covered yet

- **Page-level stories.** Stories currently cover MDX components, not `app/**`
  pages. Adding a handful of representative pages would catch breaking changes in
  layout and shared chrome. Raised in review on #4049; deliberately out of scope
  there.
- **Interaction tests.** Storybook's Vitest addon is not wired up; behavioural
  coverage stays in `yarn test`.

## Configuration reference

| File | Purpose |
| --- | --- |
| `.storybook/main.ts` | Framework, addons, story globs, Vite aliases |
| `.storybook/preview.tsx` | Global decorators, theme toggle, region stub, docs page template |
| `.storybook/preview-head.html` | Fonts and panel styling |
| `.storybook/manager.ts` | Storybook UI theme |
| `chromatic.config.json` | Project id, TurboSnap, build dir |
| `.github/workflows/chromatic-pr.yml` | Per-PR build and diff |
| `.github/workflows/chromatic-main.yml` | Baseline update on labelled merge |

Local commands:

```bash
yarn storybook          # dev server at localhost:6006
yarn build-storybook    # static build, same one Chromatic publishes
yarn chromatic          # publish from your machine (needs CHROMATIC_PROJECT_TOKEN)
```
