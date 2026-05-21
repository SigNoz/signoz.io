# Docs Authoring

Use this playbook for product documentation under `data/docs/**`.

## Docs file and URL names

- **Do not put `.` in the MDX filename**
- Encode version-like segments with hyphens instead, for example `upgrade-0-8-1.mdx` → slug `operate/migration/upgrade-0-8-1`, and align the frontmatter `id` with that slug (for example `id: upgrade-0-8-1`).

## Core Writing Principles

- Assume readers know their language or framework basics, but may not know OpenTelemetry concepts.
- Write concise, task-first instructions in active voice.
- Keep terminology consistent across pages.
- Be explicit about caveats such as versions, environments, or beta gaps.
- Prefer concrete examples over abstract descriptions.
- Define acronyms on first use, then use the short form consistently.
- Use angle-bracket placeholders only, such as `<region>` or `<your-ingestion-key>`, and explain them right below the snippet.
- Cross-link existing SigNoz docs instead of duplicating instructions.
- AI-assisted drafting is fine, but every claim must be verified and rewritten clearly.

## JTBD-First Authoring

- Identify the primary persona and primary job before drafting.
- Use persona as an authoring aid, not as a required section in the doc.
- Define the primary job in one sentence: "When ..., I want to ..., so I can ...".
- Optimize for time-to-first-success:
  - one clear default path
  - minimal mandatory steps
  - a clear success signal in SigNoz
- Keep the happy path clean.
- Move optional, advanced, or edge-case material into callouts, collapsible sections, troubleshooting, or separate pages.
- For setup docs, keep the main flow scoped to prerequisites, install or configure, start or restart, and validate.

## Diataxis And `doc_type`

Set `doc_type` by primary purpose:

- `tutorial`: learn by doing with an opinionated end-to-end flow
- `howto`: complete a specific task
- `reference`: look up exact facts, options, schemas, or limits
- `explanation`: build a mental model or understand trade-offs

Common mapping:

- Send Data docs: usually `howto`
- User guides: usually `tutorial`
- Conceptual docs: `explanation`
- Schemas and limits: `reference`
- Troubleshooting docs: `howto` with problem-first framing

## Required Frontmatter

Use the template in [templates/docs-frontmatter.md](templates/docs-frontmatter.md).

Required keys:

- `date`
- `id`
- `title`
- `description`
- `doc_type`

### Title Guidelines

The `title` field is both the page heading and the meta title shown in search results.

- **Length:** 50–60 characters.
- **Structure:** Primary keyword + feature or action. No brand suffix — "SigNoz Docs" is appended programmatically.
- **Best practices:**
  - Lead with the primary keyword.
  - Use action words: Learn, Setup, Guide, Monitor, Debug, Optimize.
  - Include a feature or benefit qualifier when it fits naturally: Fast, Real-time, Open-source, Distributed.
- **Example:** `Logs Pipelines - Parse & Transform Logs`
  - URL: `https://signoz.io/docs/logs-pipelines/introduction/`
  - In search results: *Logs Pipelines - Parse & Transform Logs | SigNoz Docs*

### Description Guidelines

The `description` field appears as the meta description in search results and link previews.

- **Length:** 120–160 characters.
- **Structure:** What the page covers + what the reader will learn or do + benefit.
- **Best practices:**
  - Clearly explain what the page is about and what the user will learn.
  - Use action-oriented language.
  - Highlight benefits.
  - Include primary keywords naturally — do not stuff them.
- **Example:** `Learn how SigNoz Logs Pipelines parse and transform logs into structured data for better debugging and observability.`
  - URL: `https://signoz.io/docs/logs-pipelines/introduction/`

Tags:

- omit `tags` when the doc applies to both Cloud and Self-Host
- use `tags: [Self-Host]` for self-host-only docs
- use `tags: [SigNoz Cloud]` for cloud-only docs
- use `tags: []` only when none apply

## Standard Page Structure

Use the template in [templates/docs-page.md](templates/docs-page.md).

Prefer these H2 sections when they fit the doc:

- `## Overview`
- `## Prerequisites`
- `## Steps` or clear setup sections
- `## Validate`
- `## Troubleshooting`
- `## Limitations`

## Commands, Snippets, And Examples

- Explain what each command does and where to run it.
- State the expected result after major steps.
- Annotate code blocks with language and filename when useful.
- Explain important fields and placeholders directly below snippets.
- Main-path snippets should be safe defaults that work after placeholder replacement.
- Move advanced or environment-specific options into callouts or collapsed sections.

### Collector Config Safety

When documenting OpenTelemetry Collector changes:

- show only the snippet to add
- tell readers to append it to their existing `otel-collector-config.yaml`
- tell readers where to enable it in the relevant pipeline
- do not tell readers to replace the entire collector config unless the page is explicitly about a full clean-room setup

## Links And Media

- Internal links should use absolute production URLs such as `https://signoz.io/docs/...`.
- Add links where they directly help readers complete the current step.
- Avoid link dumping.
- External links in MDX should use:

```mdx
<a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">
  Example
</a>
```

- Use descriptive anchor text instead of "here" or raw URLs in body text.
- Validate all added internal and external links before the PR.
- Store docs images under `public/img/docs/<topic>/...`.
- Use WebP format for all docs images. See [Creating WebP images doc](https://signoz.notion.site/Creating-webp-images-7c27a266c4ae4ea49a76a2d3ba3296a5?pvs=74) for tips and tools.
- **Minimum image width: 1200 px** (ideally 1400–1600 px for retina sharpness). Images below 1200 px render blurry when the docs layout stretches them to the content column width. Take screenshots at 2× resolution on retina displays or use browser DevTools device toolbar set to a wide viewport.
- Use `Figure` with descriptive alt text and a concise caption.

## Patterns And Components

- Use `Admonition` for notes, warnings, tips, and supplementary or optional material. Do not use `KeyPointCallout`.
- Use `Tabs` and `TabItem` only when flows materially differ by platform or environment. Always provide an `entityName` prop on `<Tabs>` that matches what the tabs represent:
  - `entityName="environment"` — deployment infrastructure tabs: VM, Kubernetes, Docker, Windows. Only use this when the tabs distinguish between these deployment environments.
  - `entityName="plans"` — SigNoz Cloud vs Self-Hosted tabs.
  - For other tab groupings, use a short descriptive name (e.g., `"language"`, `"signal"`, `"setup"`).
- Prefer numbered steps for procedures and bullets for reference content.
- Keep headings short and meaningful.

## Happy Path Vs Troubleshooting

- Write for the happy or common path first.
- Keep mandatory steps minimal and focused on first success.
- Put common blockers as short warnings near the relevant step.
- Put rare or verbose debugging into `## Troubleshooting` or a dedicated troubleshooting page.
- If users would need guesswork to continue, rewrite the step or add one high-value link.

## Send Data Docs

Use the template in [templates/send-data-doc.md](templates/send-data-doc.md).

- Primary job: get telemetry flowing quickly.
- Always include a concrete `## Validate` section.
- Mention OpenTelemetry in the URL, slug, title, and overview.
- Use direct export to SigNoz Cloud as the primary path.
- **Prefer OTLP/HTTP (port 4318) over OTLP/gRPC (port 4317)** as the default export protocol in examples and instructions. HTTP is simpler to configure, easier to debug, and works through more proxies and load balancers.
- Keep Collector-based setup optional and near the bottom.
- Include the self-hosted adaptation callout near the top.
- Cover VM, Kubernetes, Docker, and Windows when those paths materially apply.
- For Send Data docs, use collapsed troubleshooting sections with `ToggleHeading`.
- Close the loop with next steps such as dashboards, alerts, traces, or deeper guides.

## Doc-Type Guidance

### Overview Docs

- Help readers decide where to start.
- Explain what the module does, when to use it, and where to go next.
- Avoid long step-by-step setup or large reference tables.

### Product Docs

- Start from the user job and expected outcome.
- Include exact UI paths, prerequisites, steps, and validation.
- Move deep concepts to separate explanation docs.

### Dashboard Templates

- Link to the relevant telemetry setup doc near the top.
- Include a dashboard preview screenshot.
- Provide import instructions using `DashboardActions`.
- Include sections for what the dashboard monitors, metrics included, and next steps.

### Troubleshooting Docs

- Start with the specific problem and affected environments.
- Use symptom -> likely cause -> resolution -> verification.
- Prefer exact error strings or question-style titles for searchability.

### User Guides

- Use goal-oriented, end-to-end flows.
- Include expected results after major steps.
- End with next steps.

### Explanation Docs

- Focus on building a mental model.
- Use diagrams, examples, and scenarios.
- Link to how-to and reference docs instead of repeating them.

### Reference Docs

- Lead with the exact facts.
- Keep prose minimal.
- Use tables, lists, and short descriptions.

### Sample Apps

- Use correct SigNoz endpoints and link ingestion references.
- Document how to run locally and in Docker or Kubernetes when relevant.
- Include a `README.md` that points back to the relevant docs page.
- Add a "Validate in SigNoz" section.

## Technical Verification

For OpenTelemetry technical claims, verify against:

1. `https://opentelemetry.io/docs/*`
2. `https://github.com/open-telemetry/*`

## URLs, Redirects, And Discovery

### URL Structure

- Docs at `data/docs/<section>/<slug>.mdx` render to `/docs/<section>/<slug>/`.
- Blog posts at `data/blog/<slug>.mdx` render to `/blog/<slug>/`.
- This repo uses trailing slashes consistently.

### Redirect Rules

- Avoid changing URLs for live content unless necessary.
- If you rename or move a doc, add a permanent redirect in `next.config.js` under `async redirects()`.
- Update any affected internal links in the same PR.

Example:

```js
async redirects() {
  return [
    {
      source: '/docs/instrumentation/opentelemetry-cloudflare/',
      destination: '/docs/instrumentation/cloudflare-workers/',
      permanent: true,
    },
  ]
}
```

### Sidebar Updates

- When a doc should appear in docs navigation, update `constants/docsSideNav.ts`.
- Match the route to the rendered docs path.
- Add the entry in the most relevant existing section instead of creating duplicate navigation paths.

### Discovery Surface Updates

Some docs also need updates beyond the sidebar. Update discovery surfaces when a new page should appear in listicles, quick starts, overview cards, installation path cards, dashboard template listings, or similar surfaced integration collections.

When needed:

- Add or update the source data in the relevant `constants/componentItems/*.ts` file.
- Keep `constants/componentItems.ts` as the public barrel.
- Update the matching component `ICON_MAP` when required.

### Tag Definitions

If a docs change introduces a new frontmatter tag that needs a tooltip definition, update `constants/tagDefinitions.ts` in the same PR.

### Redirect And Discovery Verification

When redirects or discovery surfaces change, run:

```bash
yarn check:doc-redirects
yarn test:doc-redirects
```

If `constants/componentItems/*.ts` changed, also run:

```bash
yarn tsc --noEmit
node --test tests/component-items-sync.test.js
```

## Docs Author Checklist

Use the PR snippet in [templates/pr-checklists.md#docs-changes](templates/pr-checklists.md#docs-changes) when preparing or reviewing docs work.

- Frontmatter includes `date`, `id`, `title`, `description`, `doc_type`, and correct tags.
- Title is 50–60 characters, leads with the primary keyword, and uses an action word.
- Description is 120–160 characters, action-oriented, and explains what the page covers and what the reader will learn.
- Content matches the chosen `doc_type`.
- The primary job is clear and the happy path is easy to follow end to end.
- Steps are concise, minimal, and ordered for first success.
- Recommended defaults stay in the main flow; advanced options move to optional sections.
- `## Validate` shows exactly where success appears in SigNoz.
- `## Troubleshooting` maps symptom -> cause -> fix -> verification.
- Commands and snippets explain what to do, where to do it, and the expected result.
- Placeholders use `<...>` format and are documented.
- Links are helpful and validated.
- Images, if any, use the correct location, WebP format, and are at least 1200 px wide.
- Redirect, sidebar, and discovery updates are handled when the doc URL changes or a new doc should appear in an existing surface.
