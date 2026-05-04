# Docs Review

Use this playbook when reviewing changes to `data/docs/**`, docs images, docs navigation, or docs discovery surfaces.

Pair it with [docs-authoring.md](docs-authoring.md) for the underlying content standards.

## Review Goals

- Prioritize actionable findings over praise.
- Review from the reader's job-to-be-done first, then verify technical accuracy.
- Keep feedback specific, concise, and immediately actionable.
- Ignore date-only issues unless they block correctness or release process expectations.

## Review Scope

Review these when relevant:

- `data/docs/**`
- `public/img/docs/**`
- `constants/docsSideNav.ts`
- `constants/componentItems.ts`
- `constants/componentItems/*.ts`
- `next.config.js` when docs URLs change
- `components/**/*.mdx` when the PR adds or meaningfully changes these alongside docs (see **Shared doc fragments** below)

If a PR also changes frontend code, use the frontend review workflow for the code portion.

### Shared doc fragments (`components/`)

Shared snippets imported into docs should **prefer React (`.tsx`)** over new **`.mdx` partials** under `components/`. MDX partials add maintenance cost for `MDXComponents` and `utils/docs/agentMarkdownStubs.ts`.

**Reviewer guidance (recommendation, not a hard rule):** if the PR **adds** new `components/**/*.mdx` files, leave an inline note or call it out in the summary so the author can confirm a `.tsx` fragment would not work. Do not block on legacy or intentional MDX without discussion.

## Review Process

1. Identify changed docs files.
2. Check whether related discovery files should also change. When `components/**/*.mdx` is in scope for this PR, apply the **Shared doc fragments** recommendation (flag new MDX partials; prefer `.tsx` for new shared snippets).
3. Read the changed pages with the standards from [docs-authoring.md](docs-authoring.md) in mind.
4. Identify likely personas from context.
5. Run the JTBD-first rubric.
6. Verify technical claims when OpenTelemetry behavior or config is involved.
7. Leave inline findings only for real issues.
8. Post one concise summary comment.

## JTBD-First Rubric

Review each changed doc against these checks in order:

1. Intended personas are clear from the content and assumptions.
2. The primary job is obvious and the page does not mix unrelated jobs in one mandatory flow.
3. The happy path is easy to follow end to end.
4. Time-to-first-success is short and the default path is clear.
5. Steps are concrete, concise, and unambiguous.
6. Only required actions stay in the main path.
7. Recommended defaults are the default, and advanced options are moved out of the main flow.
8. Critical prerequisites, attributes, or concepts have a direct step or high-value link.
9. Troubleshooting starts from symptoms and points to exact next actions.
10. Validation tells users what success looks like in SigNoz.
11. Next steps help users complete the broader job.
12. Links directly help readers complete the current step.
13. Added or edited links resolve and use canonical production paths.
14. Discovery surfaces are updated when the new doc should appear in an existing list or overview.

If a check cannot be validated from the PR context, call out the assumption and residual risk.

## Technical Accuracy

When validating technical claims, use this source priority:

1. `https://opentelemetry.io/docs/*`
2. `https://github.com/open-telemetry/*`
3. Other reputable sources only when official sources do not cover the claim

Prioritize verification for:

- config keys and component names
- receiver, exporter, and processor names
- environment variables and CLI flags
- APIs, semantic conventions, versions, and deprecations

When a correction depends on verification:

- include `Source: <URL>` in the finding
- keep citations precise
- avoid long quotes

### Web Lookup Tips

- Use targeted queries first (for example `site:opentelemetry.io <topic>`).
- Fetch only the minimal pages needed to verify the exact claim.
- Summarize findings; avoid large copy-paste.
- If sources conflict, prefer the most recent official OpenTelemetry docs or repo over third-party content.

## Onboarding Label Policy

This section is the canonical policy for `add-to-onboarding`.

### Inspect PR File Status First

Decide eligibility from PR file status, not just prose diff:

```bash
gh api repos/<REPO>/pulls/<PR_NUMBER>/files --paginate
```

### Apply The Label Only When All Conditions Match

Apply `add-to-onboarding` only when all of these are true:

1. The PR adds at least one new docs file with `status == "added"`.
2. The new page's primary job is getting traces, logs, or metrics into SigNoz.
3. The new page includes concrete ingestion setup, such as:
   - SigNoz endpoint instructions
   - `signoz-ingestion-key`
   - OTLP exporter environment variables
   - direct SigNoz export steps
   - equivalent "send data to SigNoz" instructions

### Do Not Apply The Label For

- edits to existing docs
- overview or concept pages
- dashboards or dashboard templates
- FAQs
- troubleshooting docs
- reference-only pages
- pages that mention ingestion but are not primarily about sending data to SigNoz

### Examples

- Apply: a new instrumentation or observability guide that walks users through exporting telemetry to SigNoz Cloud.
- Apply: a new logs page with SigNoz endpoint and auth setup.
- Skip: a migration guide that references SigNoz ingestion but focuses on moving from another vendor.
- Skip: an edit to an existing instrumentation page.

### Apply, Remove, Or Report

When a PR qualifies, try to add the label:

```bash
gh issue edit <PR_NUMBER> --add-label "add-to-onboarding"
```

If a re-review shows the PR no longer qualifies and the label is present, remove it:

```bash
gh issue edit <PR_NUMBER> --remove-label "add-to-onboarding"
```

If label changes fail because of permissions or actor restrictions:

- do not fail the whole review
- report `recommended but permission denied`

### Summary Comment Expectation

Every docs review summary should include exactly one of:

- `Onboarding label: applied`
- `Onboarding label: skipped`
- `Onboarding label: recommended but permission denied`

When relevant, also include the matched file path and a one-line rationale.

## Commenting Rules

- Comment only on issues.
- Do not add praise-only comments.
- Include impact and a concrete fix suggestion.
- Use file references.
- Keep wording user-impact-focused.

## Summary Format

Post exactly one concise summary comment that includes:

1. Findings grouped by severity (`P1`, `P2`, `P3`)
2. Intended personas and fit summary
3. JTBD coverage summary
4. Checklist coverage summary against [docs-authoring.md](docs-authoring.md)
5. Open questions or assumptions
6. The onboarding-label result

## Suggested Commands

```bash
# PR context
gh pr view <PR_NUMBER>
gh pr diff <PR_NUMBER>
gh api repos/<REPO>/pulls/<PR_NUMBER>/files --paginate

# MDX partials under components/ (prefer .tsx for new shared fragments)
gh pr diff <PR_NUMBER> --name-only | grep -E '^components/.*\.mdx$' || true

# changed docs and guidance
rg --files data/docs
cat contributing/docs-authoring.md
cat contributing/docs-review.md

# likely docs quality issues
rg -n "## Next steps|## Troubleshooting|KeyPointCallout|ToggleHeading|https?://|<[^>]+>" data/docs

# link health
curl -sI <URL>
```

## Guardrails

- Do not require a dedicated "Target Persona" section unless the doc truly needs it.
- Keep advanced options out of the mandatory path unless essential for first success.
- If a PR changes docs MDX components or component-driven patterns, verify `utils/docs/agentMarkdownStubs.ts` and `utils/docs/buildCopyMarkdownFromRendered.ts` behavior where relevant.
- Do not mark the review complete if the JTBD-first pass was skipped.
