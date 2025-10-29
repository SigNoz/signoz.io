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
- [Content Structure](#content-structure)
  - [Patterns and components](#patterns-and-components)
  - [Link references to keep handy](#link-references-to-keep-handy)
  - [URLs and redirects](#urls-and-redirects)
- [Doc Type–Specific Guidelines](#doc-type–specific-guidelines)
  - [Product docs (features, UI flows)](#product-docs-features-ui-flows)
  - [Send Data docs (instrumentation and pipelines)](#send-data-docs-instrumentation-and-pipelines)
  - [Troubleshooting docs](#troubleshooting-docs)
  - [User guides (how-to, tasks)](#user-guides-how-to-tasks)
  - [Sample apps](#sample-apps)
- [PR Checklist (copy into your PR)](#pr-checklist-copy-into-your-pr)
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

- Be complete and practical
  - Cover end-to-end use cases. Link to related topics: ingestion, dashboard templates, alerts, query builder, and relevant features.
  - Do not assume prior knowledge. Add brief context when needed and define terms on first use.
  - Cross-link existing SigNoz docs instead of duplicating content. For example, when describing OTel Collector receivers or pipelines, reference the [configuration guide](https://signoz.io/docs/collection-agents/opentelemetry-collector/configuration/)
- Be concise and direct
  - Avoid filler and marketing fluff. Get to the point.
  - Avoid generic intros like “In today’s digital landscape…” and adjectives like “powerful,” “robust,” “seamless.”
- Prefer clarity over cleverness
  - Use active voice and second person (“you”).
  - Show before/after and expected outcomes when it helps.
- AI/LLM Usage
  - Using AI/LLMs for research is fine, but verify everything and rewrite in your voice.
  - Do not paste unvetted AI/LLM text. Avoid vague generalities and ensure steps are reproducible.
- Acronyms and short forms
  - Define on first use, then use the short form consistently.
  - Examples: “OpenTelemetry (OTel),” “OpenTelemetry Collector (OTel Collector),” “OpenTelemetry Protocol (OTLP).”
- Placeholders and variables
  - Use angle-bracket placeholders like `<service-name>`, `<region>`, `<SIGNOZ_INGESTION_KEY>`.
  - Immediately below the snippet, explain what each placeholder means.

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
    ---
    ```
  - Use `id` as a stable unique slug (no spaces); update links if it changes.
  - Use `tags` consistently. Supported tags include `SigNoz Cloud` and `Self-Host`.
- Standard sections (H2 level)
  - `## Overview` – what the doc covers and when to use it.
  - `## Prerequisites` – versions, accounts, keys, cluster access, etc. Include links.
  - `## Steps` or specific setup sections – ordered, with subheadings for clarity.
  - `## Validate` – how to confirm it worked (UI path, endpoint, example output).
  - `## Troubleshooting` – common issues and fixes (more details below).
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

- Hyperlinks

  - Prefer `[Text](https://signoz.io/endpoint)` over site-relative `[Text](/endpoint)`.
  - External links should open in a new tab and preserve security attributes:

    ```mdx
    <a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">
      Example
    </a>
    ```

  - Use descriptive anchor text that makes the link destination clear. Avoid generic phrases like "here" or "link" and do not paste raw URLs into the body text.

    - ✅ `Learn from the [Temporal Golang sample repository](https://github.com/SigNoz/temporal-golang-opentelemetry/tree/main)`
    - ❌ `See (link)` or `Refer to https://github.com/...`

  - Internal links typically open in the same tab unless the link switches product/app context or interrupts an in-progress task.
  - Prefer cross-linking existing SigNoz docs where possible (ingestion, collectors, dashboards, alerts) to reduce duplication and keep docs consistent.

- Cloud vs Self-Host
  - Add the relevant tags in frontmatter.
  - Prefer a single flow and include a small info note that links to the comparison page instead of duplicating with tabs.
  - Use the Cloud vs Self-Hosted comparison doc when a guide only shows one environment and the other only differs by endpoint/auth/TLS: https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#self-hosted-to-cloud
  - Drop-in snippets you can copy into guides:
    - For Cloud-only guides:
      ```mdx
      <Admonition type="info">
        Using self-hosted SigNoz? Most steps are identical. To adapt this guide, update the endpoint
        and remove the ingestion key header as shown in [Cloud →
        Self-Hosted](https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted).
      </Admonition>
      ```
    - For Self-Hosted-only guides:
      ```mdx
      <Admonition type="info">
        Using SigNoz Cloud? Most steps are identical. To adapt this guide, point to the Cloud
        endpoint and add the ingestion key header as shown in [Self-Hosted →
        Cloud](https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#self-hosted-to-cloud).
      </Admonition>
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
- Use `Tabs`/`TabItem` to branch by platform, OS, or materially different flows. For Cloud vs Self-Host, prefer the drop-in snippet + comparison page.
- Use numbered steps for procedures and bullets for reference content.
- Keep headings short and meaningful. Prefer H2 for main sections.

### Link references to keep handy

- Ingestion to SigNoz Cloud endpoints: <https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint>
- Ingestion keys for SigNoz Cloud: <https://signoz.io/docs/ingestion/signoz-cloud/keys/>
- Cloud → Self-Hosted anchor: <https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted>
- OpenTelemetry Collector docs: link the specific receiver/exporter you use.
- OTel Collector configuration guide: <https://signoz.io/docs/collection-agents/opentelemetry-collector/configuration/>

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

### Product docs (features, UI flows)

- Audience: end users in the SigNoz UI.
- Cover: feature overview, why/when to use it, prerequisites, step-by-step with screenshots, expected outcomes, and links to related user guides.
- Include caveats, version availability, and plan differences if any.
- Show the exact UI path and terminology that matches the product.

### Send Data docs (instrumentation and pipelines)

- Explicitly mention OpenTelemetry in the URL/slug, title, and overview.
  - Example slug and file name: `data/docs/instrumentation/<tech>/opentelemetry-<tech>.mdx`.
- Specify the tested versions of SDKs/agents/collectors up front.
- Prefer a single flow; add a brief Cloud vs Self-Hosted note linking to the comparison doc. Use tabs only if steps materially diverge (not for minor endpoint/header differences).
- Explain each code snippet: what it configures, where it lives, and how it works.
- Provide validation steps in SigNoz (Traces/Logs/Metrics, etc. views) with screenshots where possible.
- Add a `## Troubleshooting` section with symptoms, causes, exact fixes, and verification. Provide as much context as possible to make it clear to readers where exactly the troubleshooting instructions are applicable
  - Include network/endpoint checks, auth/ingestion key pitfalls, TLS notes, and version mismatches.
  - Phrase troubleshooting titles/headings as questions or problem statements and include exact error strings where relevant to improve search/SEO (e.g., "Why don’t I see traces for <service-name>?", or include the exact error message).
- Don’t stop at “Data Sent”. Close the loop with next steps: Link to relevant dashboards or dashboard templates, example alerts, service and trace views, and deeper user guides so the doc completes an end-to-end workflow.

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

### User guides (how-to, tasks)

- Goal-oriented, step-by-step; assume minimal context but link to existing setup.
- Call out pre-requisites clearly.
- Include “Expected result” at the end of each major step.
- End with “Next steps” and links to deeper topics or automation.

### Sample apps

- Use the correct endpoints and link ingestion docs:
  - Cloud: `https://ingest.<region>.signoz.cloud:443` with `signoz-ingestion-key`. Also link to the Cloud ingestion references: [endpoint guide](https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint) and [keys](https://signoz.io/docs/ingestion/signoz-cloud/keys/)
  - Self-Host: `http://<otel-collector-host>:4318` or `:4317` (OTLP/HTTP vs OTLP/gRPC). Also link to the Cloud → Self-Hosted adaptation guidance: [cloud to self-hosted](https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted)
- Document how to configure and run locally and in Docker/Kubernetes.
- Include a `README.md` with a link to the relevant docs page.
- Keep versions and instructions in sync across docs, sample apps, and blogs.
- Provide a “Validate in SigNoz” section that shows where the data will appear.

## Docs PR Checklist

- [ ] Frontmatter includes `date`, `id`, `title`, `description`, and appropriate `tags`.
- [ ] SEO: primary keywords appear in `title`, `description`, URL/slug, and the first paragraph. For Send Data docs, include "OpenTelemetry" in slug/title.
- [ ] If the guide is Cloud-only or Self-Hosted-only, include the Cloud vs Self-Hosted drop-in snippet linking to the comparison page; use tabs only if steps materially diverge.
- [ ] Commands explain what they do and where to run them.
- [ ] Code/config snippets are annotated and explained; placeholders are defined.
- [ ] “Validate” section shows how to confirm success.
- [ ] Troubleshooting covers common failures with concrete fixes.
- [ ] Included a short “Next steps” section linking to adjacent features or deeper guides when applicable.
- [ ] For Send Data docs: include follow-through links (dashboards, alert examples, relevant user guides) so the doc completes an end-to-end workflow.
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

Optional: To mark a doc as new, include `className: 'new-doc'` on the entry.

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
