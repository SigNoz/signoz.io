---
name: signoz-docs-pr-review
description: Review SigNoz documentation pull requests using CONTRIBUTING.md and this skill's docs-review rubric. Use when asked to review docs PRs, post inline findings, verify OpenTelemetry technical accuracy with sources, decide add-to-onboarding labeling, and write a concise checklist-based summary.
---

# SigNoz Docs PR Review

Review documentation pull requests in `signoz.io` with a strict, actionable rubric.

## Scope

Use this skill for docs review on changes such as:

- `data/docs/**`
- `public/img/docs/**`
- `constants/docsSideNav.ts`
- `next.config.js` when docs URL paths change

If a PR includes frontend code too, use this skill only for the docs part.

## Source of Truth

- Treat `CONTRIBUTING.md` at repo root as the single source of truth for docs standards.
- Apply rules; do not restate the entire guide in comments.
- Ignore date-related guideline checks during review.

## Review Process

1. Identify docs files changed in the PR.
2. Read relevant sections in `CONTRIBUTING.md` (JTBD, patterns/components, happy path, hyperlinks, doc-type rules, docs checklist).
3. Review docs with priority on user success:
   - Persona/JTBD lens as reviewer guidance (not mandatory doc section)
   - Happy/common path clarity
   - Clear, concise, minimal mandatory steps
   - Recommended defaults in main path; advanced options moved to optional areas
   - Relevant internal/external links where they help complete steps
4. Verify technical accuracy when claims involve OpenTelemetry behavior/configuration.
5. Post inline findings for concrete issues.
6. Post exactly one concise summary comment referencing Docs PR Checklist coverage.

## Technical Accuracy and Sources

When validating technical claims, use this source priority:

1. `https://opentelemetry.io/docs/*`
2. `https://github.com/open-telemetry/*` (official repos, READMEs, examples)
3. Other reputable sources only if official sources do not cover the claim

For each correction that depends on verification:

- Add a short citation in the comment as: `Source: <URL>`
- Keep citations precise and relevant to the claim
- Do not paste long excerpts

Prioritize verification for:

- Config keys and component names
- Receiver/exporter/processor names
- Environment variables and CLI flags
- APIs, semantic conventions, version compatibility, deprecations

If sources conflict, prefer the most recent official OpenTelemetry docs/repo over third-party content.

## Web Lookup Guidance

- Use targeted queries first (for example, `site:opentelemetry.io <topic>`).
- Fetch only the minimal pages needed to verify the exact claim.
- Summarize findings; avoid large copy-paste.

## Labeling Rule

If PR adds a **new** docs file (not only edits existing docs) that explains sending data to SigNoz Cloud (for example new instrumentation, new collector receiver flow, or new log collection method), add label:

- `add-to-onboarding`

Command:

```bash
gh issue edit <PR_NUMBER> --add-label "add-to-onboarding"
```

## Commenting Rules

- Comment only on issues.
- Do not praise or restate compliant items.
- Keep comments specific, with file references and concrete fixes.
- Prefer concise wording focused on user impact.

## Output Structure

### Inline comments

For each issue include:

- short issue title
- impact (why it matters)
- exact fix suggestion
- `Source: <URL>` when technical verification is involved

### One summary comment

Post one summary comment that includes:

1. Key findings grouped by severity (`P1`, `P2`, `P3`)
2. Checklist-oriented coverage summary (what failed/needs work)
3. Any open questions/assumptions
4. Whether onboarding label was applied (when relevant)

## Suggested Commands

```bash
# PR context
gh pr view <PR_NUMBER>
gh pr diff <PR_NUMBER>

# changed docs and policy anchors
rg --files data/docs
rg -n "JTBD|happy path|Patterns and components|Hyperlinks|Docs PR Checklist" CONTRIBUTING.md

# scan for likely docs quality issues
rg -n "## Next steps|## Troubleshooting|KeyPointCallout|ToggleHeading|https?://|<[^>]+>" data/docs
```

## Guardrails

- Do not require a dedicated "Target Persona" section unless context truly needs it.
- Keep advanced options out of the mandatory path unless essential for first success.
- Keep review feedback decision-oriented and immediately actionable.
