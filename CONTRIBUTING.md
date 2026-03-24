# Contributing to SigNoz Docs and Blog

Thanks for helping improve SigNoz documentation. Clear, complete docs are critical for adoption of SigNoz and for the broader OpenTelemetry ecosystem. This guide explains how to contribute and the standards we follow.

- Scope: The documentation content guidelines below apply to product documentation pages under `data/docs/**`.
- Development setup and local preview are in `README.md`.
- A blog contribution workflow is included later for convenience, but the content/style rules in this guide are specific to docs (not blogs).
- If your PR changes site code (for example: `app/**`, `components/**`, `hooks/**`, `utils/**`), follow [Website Code Guidelines](#website-code-guidelines).
- For questions or clarifications, open a draft PR early and ask for feedback.

## Table of Contents

- [Workflow](#workflow)
- [Git Hooks and Checks](#git-hooks-and-checks)
- [Website Code Guidelines](#website-code-guidelines)
- [General Guidelines](#general-guidelines)
  - [Write docs around a Jobs-To-Be-Done (JTBD)](#write-docs-around-a-jobs-to-be-done-jtbd)
- [Documentation types and Diátaxis](#documentation-types-and-diátaxis)
- [Content Structure](#content-structure)
  - [Patterns and components](#patterns-and-components)
  - [Happy path vs troubleshooting](#happy-path-vs-troubleshooting)
  - [URLs and redirects](#urls-and-redirects)
- [Doc Type–Specific Guidelines](#doc-type–specific-guidelines)
  - [Overview docs (modules and feature families)](#overview-docs-modules-and-feature-families)
  - [Product docs (features, UI flows)](#product-docs-features-ui-flows)
  - [Send Data docs (instrumentation and pipelines)](#send-data-docs-instrumentation-and-pipelines)
  - [Dashboard templates](#dashboard-templates)
  - [Troubleshooting docs](#troubleshooting-docs)
  - [User guides (end-to-end flows)](#user-guides-end-to-end-flows)
  - [Explanation docs (concepts and deep dives)](#explanation-docs-concepts-and-deep-dives)
  - [Reference docs (schemas, config, APIs)](#reference-docs-schemas-config-apis)
  - [Sample apps (README.md files)](#sample-apps-readmemd-files)
- [Docs PR Checklist](#docs-pr-checklist)
- [Contribute a Doc or Blog Post](#contribute-a-doc-or-blog-post)

## Workflow

- Fork and clone the repo, then create a feature branch.
- Set up and run the site locally as per `README.md` (Node/Yarn, `yarn dev`).
- Make focused changes with meaningful commit messages.
- Build locally (`yarn build`) to catch MDX/TypeScript/Contentlayer errors.
- Open a PR as Draft by default with a clear title, context, screenshots (if relevant), and a checklist (see below). Mark it "Ready for review" when content and checks are complete.

## Git Hooks and Checks

- Husky installs Git hooks automatically on `yarn install` via the `prepare` script in `package.json`.
- Pre-commit behavior
  - Runs `lint-staged` on staged files. ESLint and Prettier fix typical JS/TS/MD/MDX formatting and lint issues.
  - When changes include docs or redirect-related files (`data/docs/**/*.mdx`, `next.config.js`, or `scripts/check-doc-redirects.js`), it runs `yarn check:doc-redirects` to ensure renamed/moved docs have permanent redirects.
  - When changes include docs (`data/docs/**/*.mdx`), it runs `yarn check:docs-metadata` to ensure metadata such as date, description, tag, title is complete and correct.
- Fixing failures
  - Lint/format: run `yarn lint` or re-stage after auto-fixes from Prettier/ESLint.
  - Redirects: run `yarn check:doc-redirects` locally to see missing entries, then add a permanent redirect in `next.config.js` under `async redirects()`. Re-stage and commit.
  - Metadata: run `yarn check:docs-metadata` locally to see missing/invalid entries, then update the metadata in the `.mdx` file. Re-stage and commit.
  - Optional: `yarn test:doc-redirects` runs a small test for redirect rules.
- Hooks path
  - The repo uses Husky v9 defaults (`core.hooksPath=.husky`). If your local Git still points elsewhere (e.g., `.husky/_` from older setups), run `git config core.hooksPath .husky` or re-run `yarn install` to refresh hooks.
- Bypass (rare)
  - In emergencies you can use `git commit --no-verify`, but please fix issues instead of bypassing checks in normal workflows.

### CI checks (GitHub Actions)

- Docs Redirect Guard
  - Triggers on PRs that touch `data/docs/**`, `next.config.js`, `scripts/check-doc-redirects.js`, tests, or `package.json`.
  - Runs `yarn test:doc-redirects` and `yarn check:doc-redirects`.
  - Fails if redirects are missing/invalid or tests fail. Fix by adding permanent redirects in `next.config.js` and re-running locally.
- Docs Metadata Guard
  - Triggers on PRs that touch `data/docs/**`, `next.config.js`, `scripts/check-docs-metadata.js`, tests, or `package.json`.
  - Runs `yarn test:docs-metadata` and `yarn check:docs-metadata`.
  - Fails if title, date, description are missing/invalid, and warns if tags are missing from MDX files. Fix by adding relevant metadata in MDX file and re-running locally.
- Add to Onboarding (label-driven)
  - When a PR is labeled `add-to-onboarding`, this job checks that the PR includes docs changes. If none are found, the job fails with a message.
  - If docs are present, it auto-creates an onboarding issue listing changed docs and comments on the PR with a link.

## Website Code Guidelines

These guidelines apply when your PR changes website code (for example: `app/**`, `components/**`, `hooks/**`, `utils/**`).

- Prefer existing icon libraries
  - Use `lucide-react` or `react-icons` for icons.
  - If you need a custom brand/logo asset, place it under `public/svgs/**` and reference it via `/svgs/...` (avoid inline SVG blobs in components).
- Prefer existing UI primitives
  - Use existing components in `components/ui/**` (for example `components/ui/Button`) instead of raw HTML elements for interactive UI.
  - Avoid styling overrides unless necessary; keep Tailwind classes consistent with existing patterns.
- Keep types/constants co-located and reusable
  - Move component-local types/constants into separate files (for example `MyComponent.types.ts`, `MyComponent.constants.ts`) and export from the folder `index.ts` when needed outside the folder.
- Add listicle items to `constants/componentItems.ts`, not inside component files
  - `constants/componentItems.ts` is the public entrypoint for icon-card grid data (APM, Logs, Dashboards, and so on). Source data lives in `constants/componentItems/*.ts`, with one top-level export per file, and both the UI components and the agent markdown stubs import through the barrel.
  - Flat list (`ComponentItem[]`): use when all items belong to one logical group with no sub-sections.
  - Sectioned object (`{ sectionKey: ComponentItem[] }`): use when items are rendered in labelled sub-sections (for example `aws`, `azure`, `gcp`). Pair it with a `getAll*()` helper that spreads every sub-array. **Never split a flat array with hardcoded `slice()` indices** — use named sub-keys instead so adding or removing an item in one section cannot silently shift another.
  - After adding items, add a matching entry in the component's `ICON_MAP` (keyed by `href`) and run `yarn tsc --noEmit` to verify.
- Avoid concurrent async invocations
  - For click handlers that do async work, prevent multiple concurrent runs (set loading state before `await` and/or guard with a ref).
- Be deliberate about DOM cleanup/transforms
  - When cleaning up rendered DOM before transforming (for example, HTML → Markdown), avoid redundant selectors and ensure cleanup order matches the intended behavior.
- Keep docs MDX components compatible with agent-markdown output
  - If you add or change an MDX component used under `data/docs/**`, review its agent rendering in `utils/docs/agentMarkdownStubs.ts`.
  - Add or update tests in `tests/agent-markdown-*.test.js`. The docs-wide component coverage test should stay green so new components are explicitly reviewed.
  - If the component affects rendered article markup, also verify the `Copy Markdown` flow still produces clean output via `utils/docs/buildCopyMarkdownFromRendered.ts` and add/update targeted tests when practical.
- Dependencies must be justified
  - Do not add new packages unless they are required and there is no existing dependency that fits.
  - If you add a dependency, include a short justification in the PR description and ensure it is used in code.

## General Guidelines

- Assume language/framework basics, but assume no prior OpenTelemetry knowledge.
  - Do not explain programming fundamentals.
  - Briefly explain OTel terms on first use and link to references.
- Write concise, task-first instructions.
  - Avoid filler, hype, and generic intros.
  - Use active voice and second person.
- Keep terminology and naming consistent across pages.
- Be explicit about caveats and limitations (version, environment, scale, beta gaps).
- Prefer concrete examples over abstract descriptions.
- Define acronyms on first use, then use the short form consistently.
- Use angle-bracket placeholders only (`<region>`, `<your-ingestion-key>`) and explain each placeholder right below the snippet.
- Cross-link existing SigNoz docs instead of duplicating instructions.
- AI/LLM use is fine for research, but all output must be verified and rewritten clearly.

### Write docs around a Jobs-To-Be-Done (JTBD)

- Identify persona(s), assumptions, and the primary job before drafting.
- Keep persona as an authoring aid; do not add a mandatory "Target Persona" section in docs.
- Define the primary job in one sentence: "When ..., I want to ..., so I can ...".
- Optimize for time-to-first-success:
  - one clear default path
  - minimal mandatory steps
  - clear success signal in SigNoz
- Keep the happy/common path clean.
  - Move optional, advanced, and edge-case content to callouts, collapsed sections, troubleshooting, or separate pages.
- For setup docs, scope the main flow to prerequisites, install/configure, start/restart, and validate.

## Documentation types and Diátaxis

Classify each doc by its primary purpose using [Diátaxis](https://diataxis.fr/) and set `doc_type` in frontmatter:

- `tutorial`: learn by doing (opinionated end-to-end flow)
- `howto`: complete a specific task
- `reference`: look up exact facts (options, schemas, limits)
- `explanation`: understand how/why something works

Rough mapping:

- Send Data docs: usually `howto`
- User guides (end-to-end flows): usually `tutorial`
- Conceptual knowledge base: `explanation`
- Schemas/options/limits: `reference`
- Troubleshooting docs: `howto` with problem-first framing

## Content Structure

Every docs page should be skimmable, actionable, and validated.

- Required frontmatter:
  ```yaml
  ---
  date: 2025-01-15 # YYYY-MM-DD
  id: <unique-id-or-slug>
  title: <Title in Sentence Case>
  description: <1-2 line summary with key terms>
  doc_type: howto # tutorial | howto | reference | explanation
  # tags optional; see rules below
  ---
  ```
- Tags:
  - omit `tags` when doc applies to both Cloud and Self-Host
  - `tags: [Self-Host]` for self-host-only docs
  - `tags: [SigNoz Cloud]` for cloud-only docs
  - `tags: []` if none apply
- Standard sections (H2):
  - `## Overview` (skip if intro is already 1-2 lines)
  - `## Prerequisites`
  - `## Steps` (or clear setup sections)
  - `## Validate`
  - `## Troubleshooting`
  - `## Limitations` (when relevant)

- Commands and snippets:
  - Explain what each command does and where to run it.
  - State expected result after major steps.
  - Annotate code blocks with language and filename when useful.
  - Explain important fields and placeholders directly below snippets.
  - Highlight specific lines to focus attention using braces after the language identifier. Example: highlight line 4 in a YAML block:

    ````markdown
    ```yaml {4}
    service:
        ....
        logs:
            receivers: [otlp, syslog]
            processors: [batch]
            exporters: [otlp]
    ```
    ````

    This renders as:  
    ![Highlighted line example](public/img/docs/guidelines/code-highlight-example.png)
  - Immediately below, explain each critical field and placeholder.
  - Example with placeholders and explanations:
    ```yaml:/deploy/docker/otel-collector-config.yaml
    exporters:
      otlphttp:
        endpoint: https://ingest.<region>.signoz.cloud:443
        headers:
          signoz-ingestion-key: <your-ingestion-key>
    service:
      pipelines:
        traces:
          exporters: [otlphttp]
    ```
    This configures the OTel Collector to export traces to SigNoz Cloud using the OTLP/HTTP protocol. Read more about OTel Collector configuration [here](https://signoz.io/docs/collection-agents/opentelemetry-collector/configuration/).
    
    Verify these values:
    - `<region>`: Your SigNoz Cloud [region](https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint)
    - `<your-ingestion-key>`: Your SigNoz [ingestion key](https://signoz.io/docs/ingestion/signoz-cloud/keys/)
  - **Append, don't replace**: When showing OpenTelemetry Collector configuration (e.g., adding a new receiver or exporter), show only the specific snippet to add and instruct the user to **append** it to their existing `otel-collector-config.yaml` and **enable** it in the pipeline. Avoid showing a full `otel-collector-config.yaml` that users might copy-paste, overwriting their existing setup (like resource detectors or other processors).
    - ✅ "Add the `filelog` receiver to your `receivers` section and enable it in `service.pipelines.logs`."
    - ❌ "Replace your `otel-collector-config.yaml` with the following content:"
  - Main-path snippets must be safe defaults that work after replacing documented placeholders.
  - Move advanced/environment-specific options into callouts or collapsed sections.

- Hyperlinks:
  - Internal links should use absolute URLs. Use `[Text](https://signoz.io/endpoint)` rather than site-relative `[Text](/endpoint)`.
  - Add links where they directly help users finish the current step.
  - Avoid link dumping.
  - External links in MDX should use:
    ```mdx
    <a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">
      Example
    </a>
    ```
  - Use descriptive anchor text (avoid "here" and raw URLs in body text).
  - Validate all internal and external links before PR.

- Cloud vs Self-Host:
  - Default to SigNoz Cloud examples.
  - Use a collapsible `KeyPointCallout` for self-hosted users instead of duplicating with tabs.
  - Use the Cloud vs Self-Hosted comparison doc when a guide only shows one environment and the other only differs by endpoint/auth/TLS: https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#self-hosted-to-cloud
  - Use tabs only when the workflows materially differ.
- Images and SEO:
  - Store docs images in `public/img/docs/<topic>/...`, reference `/img/docs/<topic>/...`.
  - Use `Figure` with descriptive alt text and concise caption.
  - Use WebP format for all images. See [Creating WebP images doc](https://signoz.notion.site/Creating-webp-images-7c27a266c4ae4ea49a76a2d3ba3296a5?pvs=74) for tips and tools
  - Include primary keywords in title, description, slug, and first paragraph.
  - Use natural variants/synonyms in headings and body.

### Patterns and components

- Use `Admonition` for notes, warnings, and tips:
  ```mdx
  <Admonition type="info">Short, actionable note.</Admonition>
  ```
- Use `KeyPointCallout` for collapsible supplementary info:
  ```mdx
  <KeyPointCallout title="Optional details" defaultCollapsed={true}>
  Content that users can expand if needed.
  </KeyPointCallout>
  ```
- Use `Tabs`/`TabItem` to branch by platform, OS, or materially different flows. For Cloud vs Self-Host, prefer the drop-in snippet + comparison page.
- Use numbered steps for procedures and bullets for reference content.
- In procedure docs, each numbered step should include: what to do, the exact command/config change, and the expected result.
- Keep mandatory steps to the minimum needed for first success.
- Merge or remove redundant mandatory steps.
- Optional or advanced variations should not appear in the primary numbered flow.
- Each required step must be unambiguous, actionable, and outcome-oriented.
- Avoid multi-purpose steps that combine unrelated actions.
- Convert non-essential, edge-case, or optional steps into `KeyPointCallout` or collapsed `<details>` blocks to keep the main flow focused.
- Keep headings short and meaningful. Prefer H2 for main sections.

### Happy path vs troubleshooting

- Write for the happy/common path first.
- Keep mandatory steps minimal and focused on first success.
- Keep the main path free of tangential details.
- Put common blockers as short inline warnings near the step.
- Put rare/verbose debugging in `## Troubleshooting` or a dedicated troubleshooting doc.
- If users need guesswork to continue, rewrite the step or add one high-value link.

### URLs and redirects

- URL derives from file path and name:
  - Docs: `data/docs/<section>/<slug>.mdx` renders at `/docs/<section>/<slug>/`.
  - Blog: `data/blog/<slug>.mdx` renders at `/blog/<slug>/`.
- Avoid changing URLs of live content. If you must rename or move a page, add a permanent redirect from the old path to the new path so existing links don’t break and SEO is preserved.
- Add redirects in `next.config.js` under `async redirects()` using `permanent: true`:

  ```js
  // next.config.js
  async redirects() {
    return [
      {
        source: '/docs/instrumentation/opentelemetry-cloudflare/',
        destination: '/docs/instrumentation/cloudflare-workers/',
        permanent: true, // permanent redirect (search engines treat like 301/308)
      },
    ]
  }
  ```

- Keep trailing slashes consistent (this repo sets `trailingSlash: true`).
- Update internal links and the sidebar entry in `constants/docsSideNav.ts` when a doc path changes.

## Doc Type–Specific Guidelines

### Overview docs (modules and feature families)

- Audience: readers deciding where to start.
- Include what the module does, when to use it, and where to go next.
- Link to setup/how-to/tutorial/reference pages by intent.
- Avoid step-by-step setup and long config/reference tables.
- `doc_type` is usually `explanation`.

### Product docs (features, UI flows)

- Start from the user job and expected outcome.
- Include exact UI path/labels, prerequisites, step-by-step flow, and validation.
- Keep deep concepts in separate explanation docs; link them.
- `doc_type` is usually `howto` (or `explanation` if concept-only).

### Send Data docs (instrumentation and pipelines)

- Primary job: get telemetry flowing quickly.
- Always include a concrete `## Validate` section.

#### Audience assumptions

- Readers know their language/framework basics.
- Readers may not know OTel concepts or pipeline patterns.
- Explain OTel terms briefly; do not teach language fundamentals.

#### URL and naming

- Explicitly mention OpenTelemetry in the URL/slug, title, and overview.
  - Example slug and file name: `data/docs/instrumentation/<tech>/opentelemetry-<tech>.mdx`.
- Specify tested versions when relevant.
- Use pinned/tested/latest versions in main steps; keep version caveats in optional notes.

#### Default to direct export to SigNoz Cloud

- Use direct export to SigNoz Cloud as the primary path.
- Keep Collector-based setup optional and out of the main path. Include it as a collapsible section at the end.

#### Deployment types

- Cover VM, Kubernetes, Docker, and Windows when applicable.
- If flows differ by platform, use tabs.
- Include a VM explanation callout at the start of the VM section:

```mdx
<KeyPointCallout title="What classifies as VM?" defaultCollapsed={true}>
A VM is a virtual computer that runs on physical hardware. This includes:
- **Cloud VMs**: AWS EC2, Google Compute Engine, Azure VMs, DigitalOcean Droplets
- **On-premise VMs**: VMware, VirtualBox, Hyper-V, KVM
- **Bare metal servers**: Physical servers running Linux/Unix directly

Use this section if you're deploying your application directly on a server or VM without containerization.
</KeyPointCallout>
```

#### Self-hosted callout

Include this callout near the top of each Send Data doc:

```mdx
<KeyPointCallout title="Using self-hosted SigNoz?" defaultCollapsed={true}>
Most steps are identical. To adapt this guide, update the endpoint and remove the ingestion key header as shown in [Cloud → Self-Hosted](https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted).
</KeyPointCallout>
```

#### Optional Collector setup section

If Collector is optional, keep it in a collapsed section near the bottom. Eg:
```mdx
<details>
<ToggleHeading>
## Setup OpenTelemetry Collector (Optional)
</ToggleHeading>

### What is the OpenTelemetry Collector?

Think of the OTel Collector as a middleman between your app and SigNoz. Instead of your application sending data directly to SigNoz, it sends everything to the Collector first, which then forwards it along.

### Why use it?

- **Cleaning up data** — Filter out noisy traces you don't care about, or remove sensitive info before it leaves your servers.
- **Keeping your app lightweight** — Let the Collector handle batching, retries, and compression instead of your application code.
- **Adding context automatically** — The Collector can tag your data with useful info like which Kubernetes pod or cloud region it came from.
- **Future flexibility** — Want to send data to multiple backends later? The Collector makes that easy without changing your app.

See [Switch from direct export to Collector](https://signoz.io/docs/opentelemetry-collection-agents/opentelemetry-collector/switch-to-collector/) for step-by-step instructions to convert your setup.

For more details, see [Why use the OpenTelemetry Collector?](https://signoz.io/docs/opentelemetry-collection-agents/opentelemetry-collector/why-to-use-collector/) and the [Collector configuration guide](https://signoz.io/docs/opentelemetry-collection-agents/opentelemetry-collector/configuration/).

</details>
```

#### Code and configuration

- Explain what each snippet does, where it goes, and why it is needed.
- Keep default config minimal for first success.
- Move non-essential options (`debug`, self-scrape, extra detectors, placeholder paths) out of the main flow.

#### Troubleshooting section

- Include `## Troubleshooting` with symptoms, likely causes, concrete fixes, and verification.
- Include frequent checks: endpoint, auth key/token, TLS, versions.
- Use error-string or problem-style headings for discoverability.
- For Send Data docs, use collapsed troubleshooting sections with `<ToggleHeading>`.
- Don’t stop at “Data Sent”. Close the loop with next steps: Link to relevant dashboards or dashboard templates, example alerts, service and trace views, and deeper user guides so the doc completes an end-to-end workflow.
- `doc_type` is usually `howto` for Send Data docs.

### Dashboard templates

- Always include a short prerequisite or info note near the top that links to setting up the data source and sending telemetry to SigNoz.
  - Link the relevant instrumentation/observability guide for the technology (for example, Mastra → https://signoz.io/docs/mastra-observability/).
- Include a **Dashboard Preview** (screenshot) near the top. Use the `Figure` component with descriptive `alt` and a concise `caption`.
- Provide **import instructions** using the `DashboardActions` helper (include both dashboard JSON link and import steps).
- Include a **What This Dashboard Monitors** section that describes the key metrics and insights this dashboard provides.
- Include a **Metrics Included** section that lists the metrics included in the dashboard.
- Cross-link adjacent dashboards and related user guides in the **Next Steps** section.
- `doc_type` is usually `explanation` for Dashboard Template docs.

### Troubleshooting docs

- Start with the problem statement and affected environments.
- Structure: Symptoms -> Likely causes -> Resolution -> Verification.
- Include concrete logs/commands and known edge cases.
- Titles and headings: use question-style titles or include the exact error/topic to improve search and SEO. Prefer exact error strings and component names (SDK/receiver/exporter) in headings.
- For minor, frequently asked Q&A, add/update a concise FAQ page. Keep answers short and point to deeper guides when needed.
`doc_type` for troubleshooting docs is `howto`. Treat each page as a focused “how to fix this specific problem” guide, with a problem-first title and concrete resolution steps.

### User guides (end-to-end flows)

- Goal-oriented, step-by-step flows that combine multiple features or modules.
- Assume minimal context, but link to existing setup/instrumentation where needed.
- Include “Expected result” at the end of each major step.
- End with “Next steps” and links to deeper topics or automation.
- `doc_type` is usually `tutorial` for these end-to-end guides. Use `howto` for narrower, single-task pages.

### Explanation docs (concepts and deep dives)

Explanation docs are where we answer **“why does this work like this?”** and **“how does this fit together?”**

- The job is "build a mental model."

- Audience: users trying to build a mental model or make design decisions.
- Cover:
  - Core observability concepts in SigNoz (for example, how traces become APM metrics, how logs are stored and queried, how sampling or retention works).
  - Trade-offs and design choices (for example, cardinality, aggregation strategies, performance considerations).
  - Conceptual breakdowns of complex features (for example, query builder queries, metric types, etc.).
- Structure:
  - Use diagrams, examples, and scenarios to explain ideas.
  - Link out to how-to guides for concrete steps and to reference docs for raw details.
- Avoid:
  - Step-by-step task flows.
  - Large tables of options or fields (those belong in reference).

Set `doc_type: explanation` for these pages.

### Reference docs (schemas, config, APIs)

Reference docs exist so users can **look up exact facts** quickly.

- The job is "look up exact facts." Lead with the answer; keep prose minimal.

- Audience: users who already know *what* they’re doing and just need details.
- Cover:
  - Configuration options, environment variables, CLI flags.
  - Ingestion endpoints, ports, authentication headers.
  - Metrics, logs, and traces schemas (field names, types, units, example values).
  - Limits, quotas, and version/plan availability.
- Structure:
  - Use tables, lists, and short descriptions.
  - Link back from how-to and tutorial docs instead of duplicating.
  - Keep examples minimal and purely illustrative (no deep narratives).
- Avoid:
  - Guided workflows (“first do X, then Y…”).
  - Long conceptual intros — keep context tight and link to explanation docs instead.
- Use `doc_type: reference`.

### Sample apps (README.md files)

- Generally present as individual repo under the [SigNoz GitHub organization](https://github.com/SigNoz).
- Use the correct endpoints and link ingestion docs:
  - Cloud: `https://ingest.<region>.signoz.cloud:443` with `signoz-ingestion-key`. Also link to the Cloud ingestion references: [endpoint guide](https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint) and [keys](https://signoz.io/docs/ingestion/signoz-cloud/keys/)
  - Self-Host: `http://<otel-collector-host>:4318` or `:4317` (OTLP/HTTP vs OTLP/gRPC). Also link to the Cloud → Self-Hosted adaptation guidance: [cloud to self-hosted](https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted)
- Document how to configure and run locally and in Docker/Kubernetes.
- Include a `README.md` with a link to the relevant docs page.
- Keep versions and instructions in sync across docs, sample apps, and blogs.
- Provide a “Validate in SigNoz” section that shows where the data will appear.

## Docs PR Checklist

- [ ] Frontmatter includes `date`, `id`, `title`, `description`, `doc_type`, and correct tags.
- [ ] SEO: primary keywords appear in `title`, `description`, URL/slug, and the first paragraph. For Send Data docs, include "OpenTelemetry" in slug/title.
- [ ] Content matches the chosen `doc_type`.
- [ ] Primary persona and primary job are clear in scope and flow.
- [ ] Happy/common path is easy to follow end-to-end.
- [ ] Steps are clear, concise, and minimal for first success.
- [ ] Recommended/default config is in main flow; advanced options are moved to optional/collapsed sections.
- [ ] `## Validate` clearly shows where success appears in SigNoz.
- [ ] `## Troubleshooting` includes symptom -> cause -> fix -> verification.
- [ ] Commands/snippets explain what, where, and expected outcome.
- [ ] Placeholders use `<...>` format and are documented.
- [ ] Default snippets are runnable after placeholder replacement.
- [ ] Relevant internal/external links are included where helpful (without link dumping).
- [ ] Internal links use `https://signoz.io/...`; no preview/staging domains.
- [ ] All links were manually validated as live.
- [ ] Images (if any) use WebP, clear alt/caption, and correct path under `public/img/docs/...`.
- [ ] Sidebar entry is added/updated in `constants/docsSideNav.ts` when needed.
- [ ] If URL changed: permanent redirect added in `next.config.js` and redirect checks were run.
- [ ] For Send Data docs: cloud-first default path, self-hosted callout, and optional Collector section near bottom.
- [ ] For Send Data docs: include VM/Kubernetes/Docker/Windows paths where applicable.
- [ ] Built locally (`yarn build`) and reviewed at `http://localhost:3000`.

## Contribute a Doc or Blog Post

Follow the steps below to create and submit either a blog post or a documentation page. Where the flow differs, look for the Blog vs Docs notes.

### Step 1: Fork the Repository

1. Go to the [signoz.io GitHub repository](https://github.com/SigNoz/signoz.io).
2. Click on the "Fork" button at the top-right corner of the page. This will create a copy of the repository under your GitHub account.

### Step 2: Clone Your Forked Repository

1. On your GitHub account, navigate to the forked repository.
2. Click the "Code" button and copy the URL.
3. Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/<your-username>/signoz.io.git
   ```

4. Navigate into the cloned directory:

   ```bash
   cd signoz.io
   ```

### Step 3: Set Up the Upstream Repository

Setting up the upstream repository allows you to fetch changes from the original repository and keep your fork in sync.

1. Add the original repository as the upstream remote:

   ```bash
   git remote add upstream https://github.com/SigNoz/signoz.io.git
   ```

2. Verify the new remote named `upstream`:

   ```bash
   git remote -v
   ```

### Step 4: Create a New Branch

Create a new branch for your changes to keep work isolated and reviewable.

```bash
git checkout -b add-new-content
```

### Step 5: Create Your Content (Blog or Docs)

- Blog

  1. Navigate to `data/blog`:
     ```bash
     cd data/blog
     ```
  2. Create a new `.mdx` file. The file name should match the post slug. Example for `https://signoz.io/blog/opentelemetry-spring-boot/`:
     `opentelemetry-spring-boot.mdx`.
  3. Write your post. Use existing posts in `data/blog` as reference and include:
     - Cover image
     - Frontmatter metadata: `title`, `date`, `author`, `tags`, `canonicalUrl` (if applicable)
     - Internal links as absolute URLs (see link policy above)

- Docs
  1. Navigate to `data/docs` (choose the right section folder) and create a new `.mdx` file. Example:
     `data/docs/instrumentation/opentelemetry-cloudflare.mdx`.
  2. Add required frontmatter and structure. At minimum include:
     ```yaml
     ---
     date: 2025-01-15
     id: <unique-id-or-slug>
     title: <Title in Sentence Case>
     description: <1–2 line summary>
     # tags are optional — see Content Structure section above
     ---
     ```
     Then follow the “Content Structure” guidelines in this document for sections like Overview, Prerequisites, Steps, Validate, and Troubleshooting.

### Step 6: Add Images

- Blog images

  - Place under `public/img/blog/<YYYY-MM>/` (create the monthly folder if needed).
  - Use WebP format (`.webp`) whenever possible. Conversion tips: https://signoz.notion.site/Creating-webp-images-7c27a266c4ae4ea49a76a2d3ba3296a5?pvs=74

- Docs images
  - Place under `public/img/docs/` and, when possible, follow the existing folder organization for the topic/feature.
  - Use WebP format (`.webp`) whenever possible. Conversion tips: https://signoz.notion.site/Creating-webp-images-7c27a266c4ae4ea49a76a2d3ba3296a5?pvs=74

### Step 7: Add Doc to Sidebar (Docs only)

Docs pages must be added to the sidebar navigation.

1. Open `constants/docsSideNav.ts`.
2. Add a new entry under the appropriate category with a route that matches your page path and a human‑readable label. Example:

   ```ts
   {
     type: 'doc',
     route: '/docs/instrumentation/opentelemetry-cloudflare',
     label: 'Cloudflare',
   }
   ```

If you introduced a new tag in your doc frontmatter, add its tooltip definition in `constants/tagDefinitions.ts`.

If your new doc adds a new surfaced integration, data source, installation path, dashboard template, or similar item that appears in docs listicles/overview cards, also update the relevant component data under `constants/componentItems/*.ts` while keeping `constants/componentItems.ts` as the public entrypoint, and update the matching component `ICON_MAP` where needed. This is similar to the sidebar rule: if the doc should be discoverable from an existing docs surface, update that surface in the same PR.

### Step 8: Add and Commit Your Changes

```bash
git add .
git commit -m "Add new blog/doc: <title>"
```

### Step 9: Fetch and Merge Upstream Changes

Keep your branch current before pushing:

```bash
git fetch upstream
git merge upstream/main
```

### Step 10: Push Your Changes

```bash
git push origin add-new-content
```

### Step 11: Test Your Changes Locally

After setting up your environment (see README’s Development Setup), verify the site:

```bash
yarn install
yarn build
yarn dev
```

Open `http://localhost:3000` and review your blog/doc page.

### Step 12: Create a Pull Request

1. Navigate to your fork on GitHub.
2. Click "Compare & pull request".
3. Add a succinct title and description.
4. Submit the PR as a Draft (default).
5. When the page builds cleanly and vercel preview is ready, click "Ready for review".

### Blog Notes

- Refer to existing blogs in `data/blog` for structure.
- Include a relevant cover image and complete metadata for SEO.
- Place blog images under `public/img/blog/<YYYY-MM>/`.

### Docs Notes

- Follow the “Content Structure” and “Doc Type–Specific Guidelines” above.
- Images go under `public/img/docs/`.
- Add the page to `constants/docsSideNav.ts` so it appears in the left sidebar.
- If the doc should appear in a docs listicle, quick-start overview, or similar card-based discovery surface, add/update the matching item in the relevant `constants/componentItems/*.ts` module and keep it exported through `constants/componentItems.ts`. Update the component's `ICON_MAP` when needed.
- If you add new tags, define tooltips in `constants/tagDefinitions.ts`.
- If you change a live doc’s URL (rename or move), add a permanent (301/308) redirect in `next.config.js` `redirects()` from the old path to the new one and update any internal links.

Thanks again for contributing to SigNoz!
