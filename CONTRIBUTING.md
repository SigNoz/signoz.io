# Contributing to SigNoz Docs and Blog

Thanks for helping improve SigNoz documentation. Clear, complete docs are critical for adoption of SigNoz and for the broader OpenTelemetry ecosystem. This guide explains how to contribute and the standards we follow.

- Scope: The guidelines below apply to product documentation pages under `data/docs/**`.
- Development setup and local preview are in `README.md`.
- A blog contribution workflow is included later for convenience, but the content/style rules in this guide are specific to docs (not blogs).
- For questions or clarifications, open a draft PR early and ask for feedback.

## Table of Contents

- [Workflow](#workflow)
- [Git Hooks and Checks](#git-hooks-and-checks)
- [General Guidelines](#general-guidelines)
- [Documentation types and Diátaxis](#documentation-types-and-diátaxis)
- [Content Structure](#content-structure)
  - [Patterns and components](#patterns-and-components)
  - [Link references to keep handy](#link-references-to-keep-handy)
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

## General Guidelines

- Assume basic language/library knowledge
  - Readers know their programming language and framework basics.
  - Do not explain language fundamentals (e.g., how to install dependencies, what environment variables are, basic syntax).
  - However, assume **no prior OpenTelemetry knowledge**. Briefly explain OTel concepts when introduced (spans, traces, collectors, exporters, etc.) and link to reference docs. Do not go deep into explanation.
- Be complete and practical
  - Cover end-to-end use cases. Link to related topics: ingestion, dashboard templates, alerts, query builder, and relevant features.
  - Add brief context for OpenTelemetry-specific terms and define them on first use.
  - Cross-link existing SigNoz docs instead of duplicating content. For example, when describing OTel Collector receivers or pipelines, reference the [configuration guide](https://signoz.io/docs/opentelemetry-collection-agents/opentelemetry-collector/configuration/).
- Be concise and direct
  - Avoid filler and marketing fluff. Get to the point.
  - Avoid generic intros like “In today’s digital landscape…” and adjectives like “powerful,” “robust,” “seamless.”
  - Prefer short, focused sentences. If a sentence has multiple clauses, consider splitting it.
  - Assume the reader is busy and scanning; lead with the most important information.
- Use plain, consistent language
  - Avoid jargon if a simpler phrase works.
  <!-- - When you must use domain-specific terms (for example, “span,” “instrumentation library”), define them once and link to a reference doc. (Reference docs or Glossary page are still WIP so this is not yet required.) -->
  - Use the same term for the same concept across docs.
- Prefer clarity over cleverness
  - Use active voice and second person (“you”).
  - Show before/after and expected outcomes when it helps.
  - Be explicit about what a feature or setting does. For example, instead of “configure the agent as needed,” specify what can be configured and recommended defaults.
- Set clear expectations and limitations
  - Call out important caveats (supported environments, versions, performance constraints, and missing features).
  - If a feature is beta or has known gaps, say so directly so users can plan around it.
- AI/LLM Usage
  - Using AI/LLMs for research is fine, but verify everything and rewrite in your voice.
  - Do not paste unvetted AI/LLM text. Avoid vague generalities and ensure steps are reproducible.
- Tone: friendly, not cutesy
  - Docs are not marketing copy, a blog post, or LinkedIn content.
  - Aim for confident, clear, professional language with a small amount of warmth when appropriate.
  - Avoid slang or hypey phrases that get in the way of instructions.
- Anchor concepts in real-world use cases
  - When explaining new ideas, ground them in concrete scenarios (for example, “monitoring a Kubernetes app,” “tracking latency across microservices,” or “setting up alerts for errors”).
  - Prefer concrete, named examples over abstract descriptions.
- Acronyms and short forms
  - Define on first use, then use the short form consistently.
  - Examples: “OpenTelemetry (OTel),” “OpenTelemetry Collector (OTel Collector),” “OpenTelemetry Protocol (OTLP).”
- Placeholders and variables
  - Use angle-bracket placeholders like `<service-name>`, `<region>`, `<SIGNOZ_INGESTION_KEY>`.
  - Immediately below the snippet, explain what each placeholder means.

## Documentation types and Diátaxis

We classify each docs page by its primary purpose using the [Diátaxis framework](https://diataxis.fr/).  
This helps keep pages focused and makes the docs easier to navigate and maintain.

Set a `doc_type` in the frontmatter for new docs:

- `tutorial` – **Learn by doing**  
  - Guided, opinionated, end-to-end flows.  
  - Example: “Set up RED-style monitoring and alerts for a microservice”.
- `howto` – **Achieve a specific goal**  
  - Narrow, task-focused instructions.  
  - Example: “Send traces from Spring Boot to SigNoz”, “Edit columns in Logs Explorer”.
- `reference` – **Look up exact facts**  
  - Schemas, config options, endpoints, limits. No step-by-step flow.  
  - Example: “SigNoz Cloud ingestion endpoints and ports”.
- `explanation` – **Understand concepts**  
  - Why and how something works; background and trade-offs.  
  - Example: “How SigNoz turns traces into APM metrics”, “Types and aggregations in Metrics”.

**Rough mapping to SigNoz sections:**

- **Send Data docs** – usually `howto` (instrumentation, pipelines).
- **User Guides / end-to-end flows** – usually `tutorial`.
- **Knowledge base – concepts** – `explanation`.
- **Knowledge base – schemas / options** – `reference`.
- **Product docs / Working with [Module]** – mostly `howto`, with separate `explanation` docs for deep dives.
- **Overview docs for modules/features** – usually `explanation` (short concept + navigation, not step-by-step).
- **Dashboard template docs** – usually `explanation` (overview of the dashboard and its metrics).
- **Troubleshooting docs** – `howto` with a problem-first framing.

For a deeper dive into Diátaxis, see  
[Diátaxis: streamlining technical documentation](https://edify.cr/insights/streamlining-technical-documentation-with-diataxis-framework/).

## Content Structure

Every doc should be skimmable and actionable.

- Required frontmatter
  - Always include and keep current:
    ```yaml
    ---
    date: 2025-01-15 # YYYY-MM-DD
    id: <unique-id-or-slug>
    title: <Title in Sentence Case>
    description: <1–2 line summary with key terms>
    tags: [SigNoz Cloud, Self-Host] # choose both if applicable
    doc_type: howto # one of: tutorial | howto | reference | explanation
    ---
    ```
  - Use `id` as a stable unique slug (no spaces); update links if it changes.
  - Use `tags` consistently. Supported tags include `SigNoz Cloud` and `Self-Host`.
  - Use `doc_type` to match the main intent of the page (see [Documentation types and Diátaxis](#documentation-types-and-diátaxis)).
- Standard sections (H2 level)
  - `## Overview` – what the doc covers and when to use it. Skip this section if the overview is only 1-2 lines.
  - `## Prerequisites` – versions, accounts, keys, cluster access, etc. Include links.
  - `## Steps` or specific setup sections – ordered, with subheadings for clarity.
  - `## Validate` – how to confirm it worked (UI path, endpoint, example output).
  - `## Troubleshooting` – common issues and fixes (more details below).
  - `## Limitations` – when relevant, call out important constraints and unsupported scenarios (environments, versions, data sources, scale).
- Explaining commands and code

  - Before each command, explain what it does and where to run it (local shell, container, Kubernetes, CI, etc.).
  - After commands, note expected results and what happens next if relevant.
  - For code/config blocks, annotate with language and filename to improve context:
    ````markdown
    ```yaml:/deploy/docker/otel-collector-config.yaml
    receivers:
      otlp:
        protocols:
          http:
            endpoint: 0.0.0.0:4318
    ```
    ````
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
          signoz-ingestion-key: <SIGNOZ_INGESTION_KEY>
    service:
      pipelines:
        traces:
          exporters: [otlphttp]
    ```
    This configures the OTel Collector to export traces to SigNoz Cloud using the OTLP/HTTP protocol. Read more about OTel Collector configuration [here](https://signoz.io/docs/collection-agents/opentelemetry-collector/configuration/).
    Replace the following placeholders:
    - `<region>`: Your SigNoz Cloud region, for example `us`, `eu`, or `in`.
    - `<SIGNOZ_INGESTION_KEY>`: Ingestion key for your SigNoz Cloud org. See https://signoz.io/docs/ingestion/signoz-cloud/keys/

  - **Append, don't replace**: When showing OpenTelemetry Collector configuration (e.g., adding a new receiver or exporter), show only the specific snippet to add and instruct the user to **append** it to their existing `otel-collector-config.yaml` and **enable** it in the pipeline. Avoid showing a full `otel-collector-config.yaml` that users might copy-paste, overwriting their existing setup (like resource detectors or other processors).
    - ✅ "Add the `filelog` receiver to your `receivers` section and enable it in `service.pipelines.logs`."
    - ❌ "Replace your `otel-collector-config.yaml` with the following content:"

- Hyperlinks

  - Internal links should open in the new tab. Always prefer `[Text](https://signoz.io/endpoint)` over site-relative `[Text](/endpoint)`.

  - External links should open in a new tab and preserve security attributes by using href:

    ```mdx
    <a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">
      Example
    </a>
    ```

  - Use descriptive anchor text that makes the link destination clear. Avoid generic phrases like "here" or "link" and do not paste raw URLs into the body text.

    - ✅ `Learn from the [Temporal Golang tutorial](https://signoz.io/docs/integrations/temporal-golang-opentelemetry/)`
    - ❌ `See (link)` or `Refer to https://signoz.io/...`

  - Prefer cross-linking existing SigNoz docs where possible (ingestion, collectors, dashboards, alerts) to reduce duplication and keep docs consistent.

- Cloud vs Self-Host
  - Add the relevant tags in frontmatter.
  - **Default to SigNoz Cloud** in all examples and instructions.
  - Include a collapsible `KeyPointCallout` for self-hosted users instead of duplicating with tabs.
  - Use the Cloud vs Self-Hosted comparison doc when a guide only shows one environment and the other only differs by endpoint/auth/TLS: https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#self-hosted-to-cloud
  - Drop-in snippet for Cloud-first guides (copy this into your docs):
    ```mdx
    <KeyPointCallout title="Using self-hosted SigNoz?" defaultCollapsed={true}>
    Most steps are identical. To adapt this guide, update the endpoint and remove the ingestion key header as shown in [Cloud → Self-Hosted](https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted).
    </KeyPointCallout>
    ```
  - Only use tabs if instructions materially diverge (e.g., different components/flows), not for small endpoint/header differences.
- Images and media
  - Store images under `public/img/docs/<topic>/...` and reference as `/img/docs/<topic>/...`.
  - Use the `Figure` component with descriptive `alt` and a concise `caption`.
  - Keep images small and readable; crop UI screenshots to the relevant area.
  - Use WebP format (`.webp`) for all images. See [Creating WebP images doc](https://signoz.notion.site/Creating-webp-images-7c27a266c4ae4ea49a76a2d3ba3296a5?pvs=74) for tips and tools
- Discoverability and SEO
  - Put primary keywords in `title`, `description`, `url`, and the first paragraph.
  - Use natural variants/synonyms in headings and body.
  - Link to adjacent features (ingestion, dashboards, alerts) where relevant.

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
- Keep headings short and meaningful. Prefer H2 for main sections.

### Link references to keep handy

- Ingestion to SigNoz Cloud endpoints: <https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint>
- Ingestion keys for SigNoz Cloud: <https://signoz.io/docs/ingestion/signoz-cloud/keys/>
- Cloud → Self-Hosted anchor: <https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted>
- OpenTelemetry Collector docs: link the specific receiver/exporter you use.
- OTel Collector configuration guide: <https://signoz.io/docs/opentelemetry-collection-agents/opentelemetry-collector/configuration/>
- Why use the OTel Collector: <https://signoz.io/docs/opentelemetry-collection-agents/opentelemetry-collector/why-to-use-collector/>
- Switch from direct export to Collector: <https://signoz.io/docs/opentelemetry-collection-agents/opentelemetry-collector/switch-to-collector/>

### Happy path vs troubleshooting

For tutorials and how-to docs, write for the **happy path** by default:

- Assume a normal, supported setup and show one clear end-to-end flow.
- Avoid branching into multiple edge cases in the middle of the procedure.

Handle problems as follows:

- Put **critical, common caveats** (version constraints, destructive actions, known sharp edges) inline as short notes or warnings next to the relevant step.
- Put **detailed debugging and rare edge cases** in a `## Troubleshooting` section at the end of the doc, or in a separate troubleshooting/FAQ page.

Rule of thumb: if most readers will hit the issue, keep a brief warning inline.  
If only some users will hit it, link them to troubleshooting instead of bloating the main flow.

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

These are the top-level “Overview” pages for a module or feature area (for example, Metrics overview, Logs overview).

- Audience: users deciding **“Is this the right place for my job?”**
- Goal: explain what the module/feature is for and route users to the right docs.
- Content:
  - 1–3 short paragraphs on **what it is** and **when to use it**.
  - A brief list of key capabilities.
  - Curated links grouped by intent, such as:
    - “Get started” (Send Data / basic setup how-tos)
    - “Do specific tasks” (Working with [Module] how-tos)
    - “Learn more” (User guides / tutorials)
    - “Reference and concepts” (Knowledge base)
- Avoid:
  - Step-by-step setup instructions.
  - Large configuration tables or API/field listings.
  - Deep theory or long troubleshooting sections.

`doc_type` for overview pages is usually `explanation`.

### Product docs (features, UI flows)

- Audience: end users in the SigNoz UI.
- Cover: feature overview, why/when to use it, prerequisites, step-by-step with screenshots, expected outcomes, and links to related user guides.
- Include caveats, version availability, and plan differences if any.
- Show the exact UI path and terminology that matches the product.
- `doc_type` is usually `howto`. If the page is purely conceptual, use `explanation`.

### Send Data docs (instrumentation and pipelines)

Send Data docs guide users through instrumenting their applications to send telemetry to SigNoz. These are the most common entry points for new users.

#### Audience assumptions

- **Knows**: Their programming language, framework basics, and general development workflow.
- **Doesn't know**: OpenTelemetry concepts, instrumentation patterns, or how observability data flows.

Explain OTel-specific terms (spans, traces, exporters, collectors) when first introduced. Add brief context and reference other docs; do not go deep into explanation. Don't explain language basics.

#### URL and naming

- Explicitly mention OpenTelemetry in the URL/slug, title, and overview.
  - Example slug and file name: `data/docs/instrumentation/<tech>/opentelemetry-<tech>.mdx`.
- Specify the tested versions of SDKs/agents/collectors up front.

#### Default to direct export to SigNoz Cloud

All Send Data docs should default to sending telemetry **directly to SigNoz Cloud** (not through a Collector). This is the simplest path for getting started.

- Show the direct OTLP export configuration as the primary method.
- Include the optional Collector setup as a collapsible section at the end (see template below).

#### Deployment types

Send Data docs should cover **four deployment types** using tabs:

1. **VM** – Virtual machines and bare metal servers
2. **Kubernetes** – Container orchestration
3. **Docker** – Containerized applications
4. **Windows** – Windows servers and environments

Include a VM explanation callout at the start of the VM section:

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

Include this collapsible section at the end of Send Data docs which by default don't mandatorily need OTel collector, before Troubleshooting:

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

- Explain each code snippet: what it configures, where it lives, and how it works.
- Provide validation steps in SigNoz (Traces/Logs/Metrics views) with screenshots where possible.

#### Troubleshooting section

- Add a `## Troubleshooting` section with symptoms, causes, exact fixes, and verification.
- Provide as much context as possible to make it clear where the troubleshooting instructions apply.
- Include network/endpoint checks, auth/ingestion key pitfalls, TLS notes, and version mismatches.
- Phrase troubleshooting titles/headings as questions or problem statements and include exact error strings where relevant to improve search/SEO.
- Use `<ToggleHeading>` to collapse troubleshooting sections:
  ```mdx
  <details>
  <ToggleHeading>
  ## Troubleshooting
  </ToggleHeading>

  ### Issue 1...
  </details>
  ```

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

- Start with a short problem statement and affected environments.
- Structure:
  - Symptoms (error messages, logs, UI behavior)
  - Likely causes (ordered by frequency)
  - Resolution steps (copy-pasteable, with context)
  - Verification (what success looks like)
- Include logs/commands snippets and known edge cases.
- Provide links to relevant product docs and Send Data docs.
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

Set `doc_type: reference` for these pages.

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

- [ ] Frontmatter includes `date`, `id`, `title`, `description`, appropriate `tags`, and a `doc_type` (`tutorial`, `howto`, `reference`, or `explanation`).
- [ ] SEO: primary keywords appear in `title`, `description`, URL/slug, and the first paragraph. For Send Data docs, include "OpenTelemetry" in slug/title.
- [ ] For Send Data docs: includes self-hosted `KeyPointCallout` near the top and optional Collector setup section before Troubleshooting.
- [ ] For Send Data docs: covers all four deployment types (VM, Kubernetes, Docker, Windows) where applicable, with VM explanation callout.
- [ ] Commands explain what they do and where to run them.
- [ ] Code/config snippets are annotated and explained; placeholders are defined.
- [ ] “Validate” section shows how to confirm success.
- [ ] Troubleshooting covers common failures with concrete fixes. For Send Data docs, use `<ToggleHeading>` to collapse this section.
- [ ] The content matches the chosen `doc_type` (tutorial / howto / reference / explanation).
- [ ] Included a short “Next steps” section linking to adjacent features or deeper guides when applicable.
- [ ] For Send Data docs: include follow-through links (dashboards, alert examples, relevant user guides) so the doc completes an end-to-end workflow.
- [ ] For Dashboard Template docs: include a clear link to set up the data source (relevant Send Data/instrumentation guide) near the top, ideally as a brief Prerequisites or info note.
- [ ] Links: internal use absolute `https://signoz.io/...`; external open in a new tab with proper attributes.
- [ ] Cross-link existing SigNoz docs. For OTel Collector changes, link the config guide.
- [ ] Images use WebP format, have alt text and captions via the `Figure` component, are cropped/readable, and live under `public/img/docs/...`.
- [ ] Added the page to the sidebar (`constants/docsSideNav.ts`) with the correct route/label.
- [ ] If you renamed or moved a doc: added a permanent redirect in `next.config.js`, updated internal links and the sidebar, and verified with `yarn check:doc-redirects`.
- [ ] Built locally (`yarn build`) and reviewed the page at `http://localhost:3000`.

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
     tags: [SigNoz Cloud, Self-Host]
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
- If you add new tags, define tooltips in `constants/tagDefinitions.ts`.
- If you change a live doc’s URL (rename or move), add a permanent (301/308) redirect in `next.config.js` `redirects()` from the old path to the new one and update any internal links.

Thanks again for contributing to SigNoz!
