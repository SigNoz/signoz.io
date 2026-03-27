---
name: signoz-docs-pr-review
description: Review SigNoz documentation pull requests — post inline findings, verify OpenTelemetry technical accuracy with sources, decide add-to-onboarding labeling, and write a concise checklist-based summary. Use when asked to review docs PRs, check documentation changes, evaluate MDX content in data/docs, or assess any docs-related PR, even when the user just says "review this PR" and the changed files are documentation.
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

The review standards live in the `contributing/` playbooks, not in this skill file. This skill orchestrates the review process; the playbooks define the policy.

- `contributing/docs-review.md` — review rubric, JTBD checklist, technical accuracy rules, onboarding-label policy, summary format
- `contributing/docs-authoring.md` — authoring standards, frontmatter rules, page structure, doc-type guidance, author checklist

Apply rules from those playbooks directly. Do not restate the entire guide in comments. Ignore date-related guideline checks during review.

## Review Process

1. Identify docs files changed in the PR.
2. Identify related discoverability files that should change with the docs when relevant (`constants/docsSideNav.ts` for sidebar visibility, `constants/componentItems.ts` as the public entrypoint and `constants/componentItems/*.ts` as the source modules for listicle/overview visibility).
3. **Read `contributing/docs-review.md` and `contributing/docs-authoring.md` in full before starting the review.** These playbooks contain the JTBD rubric, authoring standards, onboarding-label policy, and summary format that drive every review decision. Reviewing without reading them first leads to missed checks and inconsistent feedback.
4. Identify intended user personas for each changed doc (for example: OTel beginner, platform engineer, app developer, SRE) from doc context.
5. Run the JTBD-first pass defined in `contributing/docs-review.md` before technical verification.
6. Verify technical accuracy when claims involve OpenTelemetry behavior or configuration, following the source priority and citation rules in `contributing/docs-review.md`.
7. Post inline findings for concrete issues.
8. Post exactly one concise summary comment using the format in `contributing/docs-review.md`.

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
4. Checklist coverage summary (what failed or needs work against `contributing/docs-authoring.md`)
5. Any open questions/assumptions
6. The onboarding-label result from `contributing/docs-review.md`

## Suggested Commands

```bash
# PR context
gh pr view <PR_NUMBER>
gh pr diff <PR_NUMBER>
gh api repos/<REPO>/pulls/<PR_NUMBER>/files --paginate

# changed docs and guidance
rg --files data/docs
cat contributing/docs-authoring.md
cat contributing/docs-review.md

# scan for likely docs quality issues
rg -n "## Next steps|## Troubleshooting|KeyPointCallout|ToggleHeading|https?://|<[^>]+>" data/docs

# quick link health checks for changed links
curl -sI <URL>
```

## Guardrails

- Do not restate large parts of the playbooks in comments.
- Keep review feedback decision-oriented and immediately actionable.
- Follow the JTBD, technical verification, and onboarding-label guidance from `contributing/docs-review.md`.
