---
name: signoz-docs-pr-review
description: Review SigNoz documentation pull requests using CONTRIBUTING.md and this skill's docs-review rubric. Use when asked to review docs PRs, post inline findings, verify OpenTelemetry technical accuracy with sources, decide add-to-onboarding labeling, and write a concise checklist-based summary.
---

# SigNoz Docs PR Review

Review documentation pull requests in `signoz.io` with a strict, actionable rubric, prioritizing a JTBD-first lens.

## Scope

Use this skill for docs review on changes such as:

- `data/docs/**`
- `public/img/docs/**`
- `constants/docsSideNav.ts`
- `constants/componentItems.ts` and `constants/componentItems/*.ts` when new docs should also appear in docs listicles, overview cards, or similar discovery surfaces
- `next.config.js` when docs URL paths change

If a PR includes frontend code too, use this skill only for the docs part.

## Source of Truth

- Treat `CONTRIBUTING.md` at repo root as the single source of truth for docs standards.
- Apply rules; do not restate the entire guide in comments.
- Ignore date-related guideline checks during review.

## Review Process

1. Identify docs files changed in the PR.
2. Identify related discoverability files that should change with the docs when relevant (`constants/docsSideNav.ts` for sidebar visibility, `constants/componentItems.ts` as the public entrypoint and `constants/componentItems/*.ts` as the source modules for listicle/overview visibility).
3. Read relevant sections in `CONTRIBUTING.md` (JTBD, patterns/components, happy path, hyperlinks, doc-type rules, docs checklist).
4. Identify intended user personas for each changed doc (for example: OTel beginner, platform engineer, app developer, SRE) from doc context.
5. Run a **JTBD-first pass** (mandatory) before technical verification.
6. Verify technical accuracy when claims involve OpenTelemetry behavior/configuration.
7. Post inline findings for concrete issues.
8. Post exactly one concise summary comment referencing Docs PR Checklist coverage.

## JTBD Priority Rubric (Mandatory)

Review each changed doc against these checks in order. If any check fails, raise a finding.

1. Intended personas
   - List primary and secondary personas the doc appears to target.
   - Confirm scope, assumptions, and language match those personas.
2. Primary job clarity
   - The reader can quickly tell what problem this page solves.
   - The page does not mix unrelated jobs into one mandatory flow.
3. Happy/common path focus
   - Common path is easy to follow end-to-end.
   - Tangential information is minimized or moved to optional/collapsible sections.
4. Time-to-first-success
   - A clear default path exists and reaches first success without optional detours.
   - Mandatory steps are minimal and in the right order.
5. Step clarity and concision
   - Steps are concrete, unambiguous, and concise.
   - Users can execute each step without guessing missing actions.
6. Minimal required steps
   - The doc requires only what is necessary to complete the primary job.
   - Non-essential actions are explicitly optional.
7. Recommended defaults vs advanced options
   - Best/recommended configuration is presented as default.
   - Advanced options are moved to the bottom, troubleshooting, collapsible sections, or next steps.
8. Beginner unblockers
   - Any required attribute/config/concept has a direct "how to set this" step or link to a doc that explains how to set it.
   - No critical prerequisite is implied without remediation guidance.
9. Symptom-to-action mapping
   - Troubleshooting starts from user-visible symptoms and points to exact next actions.
   - Failure modes are concrete (not generic "check your setup").
10. Success signal
   - Validation tells users exactly where to check in SigNoz and what success looks like.
11. Follow-through
   - Next steps help users complete the broader job (for example dashboards, alerts, deeper guides).
12. Helpful links (internal/external)
   - Link to internal/external docs wherever they directly help completion of the current step.
   - Avoid irrelevant link dumping.
13. Link health
   - Added/edited links resolve (no dead links). Prefer canonical production paths.
14. Discoverability surface updates
   - If a PR adds a new integration, data source, installation path, dashboard template, or similar doc that users should find from an existing docs listicle/overview card surface, verify the matching entry was added or updated in the relevant `constants/componentItems/*.ts` module and remains exported through `constants/componentItems.ts`.
   - When the surfaced component uses icons, verify the relevant component `ICON_MAP` was updated too.
   - Do not require this when no existing listicle/overview surface is relevant.

If a JTBD check cannot be validated from the PR context, explicitly call out the assumption and residual risk.

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
2. Intended personas and fit summary (who this doc serves and where fit is weak)
3. JTBD coverage summary (which mandatory JTBD checks failed or were at risk)
4. Checklist-oriented coverage summary (what failed/needs work)
5. Any open questions/assumptions
6. Whether onboarding label was applied (when relevant)

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

# quick link health checks for changed links
curl -sI <URL>
```

## Guardrails

- Do not require a dedicated "Target Persona" section unless context truly needs it.
- Keep advanced options out of the mandatory path unless essential for first success.
- If a PR adds or changes docs MDX components or component-driven content patterns, verify both agent markdown handling (`utils/docs/agentMarkdownStubs.ts`) and rendered Copy Markdown behavior (`utils/docs/buildCopyMarkdownFromRendered.ts`) where relevant.
- Keep review feedback decision-oriented and immediately actionable.
- Do not mark a review complete if mandatory JTBD checks were skipped.
