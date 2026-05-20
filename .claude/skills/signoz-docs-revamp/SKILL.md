---
name: signoz-docs-revamp
description: Revamp and restructure a SigNoz product documentation module — analyse all existing docs, reclassify by doc_type, rewrite to template, restructure the sidebar in docsSideNav.ts, and fix all rendering issues. Use when the user names a module to restructure (e.g. "revamp logs", "restructure metrics docs", "fix the traces section").
---

# SigNoz Docs Revamp

Fully restructure a named product documentation module in `signoz.io` — content, sidebar navigation, and component usage — following the authoring standards in `contributing/docs-authoring.md`.

## Scope

A "module" is one top-level section in `constants/docsSideNav.ts`, typically backed by:

- `data/docs/<module-name>/` — primary content files
- `data/docs/userguide/` — older content that belongs to the module but hasn't been migrated
- `data/docs/logs-pipelines/`, `data/docs/traces-management/`, etc. — cross-cutting sub-areas
- `constants/docsSideNav.ts` — the sidebar definition for this module
- `public/img/docs/<module-name>/` — screenshots and images

---

## Phase 1 — Audit (read before writing anything)

### 1a. Discover all files

Read every `.mdx` file that belongs to the module:
- Primary directory (`data/docs/<module>/`)
- Userguide files with the module name in the filename
- Any sub-directories linked in the sidebar

For each file record:
- Current `doc_type` (or note it's missing)
- Current `title`
- What the page actually covers (one sentence)
- What doc_type it **should** be

### 1b. Read the sidebar

Read the full module section in `constants/docsSideNav.ts`. Note:
- Which pages exist in the sidebar but have no file
- Which files exist but are not in the sidebar
- Categories that mix explanation, how-to, and reference without separation
- Nesting depth — more than 2 levels is almost always wrong

### 1c. Identify the problems

Common patterns to flag:

| Problem | Signal |
|---|---|
| Missing `doc_type` | No `doc_type` in frontmatter |
| Wrong doc_type | A "guide" that is actually a reference page |
| Stale marketing intro | "We recently released..." / "We're excited to..." |
| Old date | `date` more than 7 days in the past on a file being changed |
| `:::` admonition syntax | Must be `<Admonition type="...">` — `:::` does **not** render |
| `:::tip`, `:::info`, `:::warning`, `:::note` | All must use `<Admonition>` JSX |
| Flat "Features" or "User Guide" category | Meaningless label — rename to what it actually contains |
| API pages buried or missing from sidebar | Surface them explicitly |
| Troubleshooting items in wrong section | Move to Troubleshooting category |
| Pages with no Next steps | Every how-to needs them |

---

## Phase 2 — Design the new structure

Before writing any files, plan the sidebar structure:

```
Module Overview (explanation)
├── Sub-area 1 (explanation overview if needed)
│   ├── How to X (howto)
│   ├── How to Y (howto)
│   └── X Reference (reference)
├── Sub-area 2
│   └── ...
├── Guides (howto pages for discrete tasks)
│   ├── How to do task A
│   └── How to do task B
├── API (if applicable)
│   ├── Overview (explanation)
│   ├── How to call endpoint (howto)
│   └── Payload Reference (reference)
└── Troubleshooting (reference or howto)
    ├── FAQs
    └── Query/specific troubleshooting
```

Rules:
- Every category must have a `route` pointing to an overview or the first meaningful child
- No category named "Features", "User Guide", "Misc", or "Other"
- How-tos and References do not belong in the same unnested group
- Keep "Send Data / Instrumentation" pages exactly as they are — do not restructure language-specific pages
- Separator comments (`// ─── Section Name ───`) improve readability in long sidebar sections

---

## Phase 3 — Rewrite content

### doc_type: explanation (Overview pages)

```mdx
---
date: <today>
title: <Feature name>
id: <feature-slug>
description: <What it is and the main job it supports>
doc_type: explanation
---

<1-2 sentence intro — what this is and when to use it.>

## What you can do with <Feature name>

- <User goal 1>
- <User goal 2>
- <User goal 3>

## Where to find it

Go to **<Navigation path>** in SigNoz.

## How it works

<Optional. Only if the mechanics are non-obvious. No procedural steps here.>

## Related pages

- [How to <common task>](<link>)
- [<Feature> reference](<link>)
```

### doc_type: howto (How-to pages)

```mdx
---
date: <today>
title: How to <verb> <noun>
id: how-to-<slug>
description: <What the reader will accomplish>
doc_type: howto
---

## Overview

<1–2 sentences describing the outcome.>

<Admonition type="info">

- <Prerequisite 1>
- <Prerequisite 2>

</Admonition>

## Steps

### Step 1: <Action>

**Action:** Go to **<Navigation path>** / Click **<UI label>**.

<Figure or code block if needed>

### Step 2: <Action>

...

## Verify

<Exact success state — what to look for.>

## Next steps

- [<Related task>](<link>)
- [<Reference page>](<link>)
```

### doc_type: reference (Reference pages)

```mdx
---
date: <today>
title: <Thing> Reference
id: <slug>-reference
description: <What facts this covers>
doc_type: reference
---

<1–2 sentence overview of what this reference covers and who uses it.>

## <Logically grouped section 1>

| Field | Description | Notes |
|---|---|---|
| ... | ... | ... |

## <Logically grouped section 2>

...

## Related pages

- [Overview](<link>)
- [How to <task>](<link>)
```

---

## Phase 4 — Update the sidebar

Edit the module section in `constants/docsSideNav.ts`:

```typescript
// ─── <Section name> ───────────────────────────────────────────────
{
  type: 'category',
  isExpanded: false,
  label: '<Label>',
  route: '/docs/<module>/<overview-page>',
  items: [
    {
      type: 'doc',
      route: '/docs/<module>/<overview-page>',
      label: 'Overview',
    },
    // how-tos and references follow
  ],
},
```

Rules:
- Every category must have a `route` (points to its overview or first child)
- `isExpanded: false` on all categories
- Order within a category: Overview → How-tos → Reference
- Rename vague labels: "User Guide" → "Guides", "Features" → the specific sub-area name
- Surface Logs API / Traces API / etc. as explicit categories if they exist

---

## Phase 5 — Fix component errors

**Critical: `:::` admonition syntax does not render in this codebase.**

Always use JSX:

```mdx
// ✅ correct
<Admonition type="info">
Content here.
</Admonition>

<Admonition type="tip">
Content here.
</Admonition>

<Admonition type="warning">
Content here.
</Admonition>

// ❌ wrong — renders as literal text
:::info
Content here.
:::
```

Scan for broken syntax after writing:
```bash
grep -rn "^:::" data/docs/<module>/ data/docs/userguide/ --include="*.mdx"
```

---

## Phase 6 — Verify

Run in order:

```bash
# 1. Check all frontmatter is valid and dates are recent
yarn check:docs-metadata

# 2. Check no broken redirects
yarn check:doc-redirects

# 3. If any URLs changed, add redirects to next.config.js first
```

The metadata check will fail if:
- `date` is more than 7 days in the past on a **modified** file (new files are not checked)
- `doc_type` is missing
- Required frontmatter fields are absent

**Fix failures before finishing.** Do not hide or bypass them.

---

## Execution order

1. Read all files (audit phase) — do not write yet
2. Plan the sidebar structure on paper (in your reasoning)
3. Create any new files needed (e.g. missing overview pages)
4. Rewrite existing files that need structural changes
5. Update `constants/docsSideNav.ts`
6. Run `grep` for `:::` syntax and fix all instances
7. Run `yarn check:docs-metadata` and fix failures
8. Run `yarn check:doc-redirects` and fix failures

---

## What NOT to touch

- Language-specific instrumentation pages (e.g. `send-logs/python-logs.mdx`, `send-logs/java-logs.mdx`) — only update frontmatter if missing `doc_type` or date
- Pages outside the named module unless they are clearly misplaced and belong here
- `next.config.js` redirects for URLs that have not changed
- Blog posts under `data/blog/`

---

## Learnings from the Logs Management revamp

These are hard-won lessons from restructuring the Logs Management module — apply them to every module:

**Sidebar**
- "Preprocess Logs" → renamed to "Log Pipelines" (product name, not function name)
- "Features" flat list → broken into "Logs Explorer" (with its own overview) + moved troubleshooting out
- API pages (Logs API, 5 pages) were completely missing from the sidebar — always check for orphaned sub-directories
- Separator comments in `docsSideNav.ts` make long sections scannable
- `Processors Reference` belongs at the end of its section, not buried in the middle

**Content**
- Old guide titles like "Guide to drop logs" → rename to "How to Drop Logs" (imperative verb)
- "We recently released..." intros → delete and replace with a direct Overview paragraph
- Pages with only a `DocCardContainer` and one link (like `troubleshooting.mdx`) → replace with a symptom→solution lookup table
- Reference pages (FAQs, Payload Model, Long Term Storage) had no `doc_type` — always add it
- How-to pages must end with `## Next steps` pointing to 2-3 related pages

**Components**
- `:::info`, `:::tip`, `:::warning` → **always** `<Admonition type="...">` — `:::` silently renders as literal text
- This applies to ALL files in the repo, including traces, metrics, and any other module
- Scan with `grep -rn "^:::"` after every session

**Dates**
- `yarn check:docs-metadata` fails for **modified** files with dates older than 7 days
- Always set `date: <today>` in frontmatter of any file you touch
- New/untracked files are not checked by the metadata script

**Links**
- Always use full `https://signoz.io/docs/...` URLs for internal doc links — never bare `/docs/...` relative paths
- Always include a trailing slash: `https://signoz.io/docs/metrics-management/overview/`
- Both forms render, but full URLs are the established convention in this repo

**Structure pattern that works**
```
Module Overview
├── <Primary Feature> (explanation + how-tos + reference)
├── <Secondary Feature> (same pattern)
├── Guides (task-specific how-tos that don't fit a feature grouping)
├── API (if it exists — always surface it)
└── Troubleshooting (FAQs + specific troubleshooting pages)
```

---

## Learnings from the Cost Meter revamp

These patterns emerged from splitting monolithic feature pages into composed sub-pages.

**Sub-page decomposition pattern**

When a feature page contains both procedure (steps) AND multiple examples (3+), decompose it into sub-pages nested under a sidebar category:

```
Feature (sidebar category, route → feature overview)
├── Overview (explanation) — what it is, when to use it, what's possible; NO steps, NO examples
├── How to X (howto) — steps only, link to examples page
├── Examples (reference) — 3+ ready-to-use patterns, one H2 per example
└── Reference (reference) — config/schema/metrics tables (only if substantial and independently linkable)
```

In `docsSideNav.ts`, convert the feature from `type: 'doc'` to `type: 'category'` with `route` pointing to the overview page, and nest how-to, examples, and reference as items.

```typescript
{
  type: 'category',
  label: 'Feature Name',
  route: '/docs/<module>/<feature>',       // points to the overview/explanation page
  isExpanded: false,
  items: [
    { type: 'doc', route: '/docs/<module>/<feature>-how-to', label: 'How to ...' },
    { type: 'doc', route: '/docs/<module>/<feature>-examples', label: 'Examples' },
    { type: 'doc', route: '/docs/<module>/<feature>-reference', label: 'Reference' },  // only if needed
  ],
},
```

Rules for this pattern:
- The category label is the feature name (e.g., "Meter Explorer", "Meter Alerts")
- The category `route` is the overview/explanation page — clicking the label opens the overview
- Create an Examples sub-page as soon as there are 3 or more distinct examples
- The overview page must be pure explanation — no steps (steps belong in the how-to)
- The how-to must end with `## Next steps` pointing to the examples and reference sub-pages
- Reference tables (metrics, configs, schema) warrant their own page only if they'd be linked directly from multiple pages; otherwise inline them in the overview
- Troubleshooting (3 or fewer bullets) can stay in the how-to; extract only if it grows large
- **Always wrap the Troubleshooting section in a toggle** using `<details>` + `<ToggleHeading>`:

```mdx
<details>
<ToggleHeading>
## Troubleshooting
</ToggleHeading>

- **Symptom** — cause and fix.

</details>
```

**What NOT to do**
- Do not add a separate "Overview" doc as a sidebar child — the category route already handles that click
- Do not nest more than 2 levels (category → docs) inside a top-level module
- Do not create an Examples page with fewer than 3 examples — keep them in the how-to instead
