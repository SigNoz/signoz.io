# Repo Workflow

Use this playbook for the shared workflow across docs, blogs, site code, and reviews.

## Local Setup

- Install dependencies with `yarn install`.
- Start local development with `yarn dev`.
- Use `yarn build` before opening or updating a PR to catch MDX, TypeScript, and Contentlayer errors.

## Shared Workflow

1. Clone the repo. Internal contributors (write access) branch on this repo directly — do not fork. External contributors fork.
2. Create a focused feature branch.
3. Make task-scoped changes with clear commit messages.
4. Run the checks that match your change type.
5. Open the PR as Draft by default.
6. Mark it ready only after content/code and checks are complete.

## Internal Contributors (Write Access)

- Always branch on this repo and open the PR from that branch — never from a fork.
- The CMS sync workflow checks that the PR head branch lives in this repo. A fork PR is treated as external even when the author has write access: it never syncs, and the `staging` preview label does nothing on it (repository secrets are unavailable to fork PRs).

## External Contributors (Fork PRs)

- The Strapi CMS is private; fork contributors cannot access it and do not need to. `yarn dev` renders content from local `data/**` files with no env setup — see [Contributing From a Fork](../README.md#contributing-from-a-fork-external-contributors).
- The Sync Content to Strapi CMS workflow never syncs fork PRs (repository secrets are unavailable to forks), so the `staging` preview label has no effect on them. A maintainer can push the branch to the main repo if a staged preview is needed.
- Content-only PRs (changes under `data/**` or `data-assets/**`) skip the Vercel preview deployment entirely, so include screenshots — and a short video for anything interactive or multi-page — from your local preview so reviewers can see the change.
- Content goes live when a maintainer merges the PR to `main`, which triggers the live CMS sync.

## Git Hooks And Checks

- Husky installs Git hooks automatically on `yarn install` via the `prepare` script in `package.json`.
- Pre-commit runs `lint-staged` on staged files, which auto-fixes common JS, TS, MD, and MDX issues.
- When staged changes include docs or redirect-related files (`data/docs/**/*.mdx`, `next.config.js`, or `scripts/check-doc-redirects.js`), pre-commit also runs `yarn check:doc-redirects`.
- When staged changes include docs (`data/docs/**/*.mdx`), pre-commit also runs `yarn check:docs-metadata`.
- When staged changes include code or content files (`components/`, `app/`, `constants/`, `hooks/`, `utils/`, `data/**/*.mdx`), pre-commit runs `node scripts/check-stale-urls.js --staged` to catch stale/redirected URLs and missing trailing slashes.
- When staged changes include CMS-migrated content (`data/(docs|faqs|case-study|opentelemetry|comparisons|guides|blog)/**`), pre-commit runs `node scripts/check-cms-assets.js` to validate referenced assets exist in `data-assets/`.
- When staged changes include dated content (`data/(blog|guides|comparisons|faqs|opentelemetry|case-study)/**`), pre-commit runs `node scripts/check-date-deprecation.js` to validate date-field combinations. It blocks on invalid combinations.

### Fixing Hook Failures

- Lint or format issues: run `yarn lint`, review auto-fixes, and re-stage changed files.
- Redirect failures: run `yarn check:doc-redirects`, add the missing permanent redirect, then re-stage.
- Metadata failures: run `yarn check:docs-metadata`, fix the MDX frontmatter, then re-stage.
- Stale URL failures: run `yarn check:stale-urls`, update the link to the final destination shown in the output, then re-stage. Optional test: `yarn test:stale-urls`.
- CMS asset failures: add the missing asset(s) to `data-assets/`, stage them, then re-commit. See [cms-content.md](cms-content.md#pre-commit-hook).
- Date-field failures: fix the frontmatter date fields per the script output (remove the deprecated `date` field / resolve the invalid combination), then re-stage.
- Optional redirect test: run `yarn test:doc-redirects`.

### Hooks Path

- The repo uses Husky v9 defaults with `core.hooksPath=.husky`.
- If your local Git points somewhere else, run `git config core.hooksPath .husky` or rerun `yarn install`.

### Bypass

- `git commit --no-verify` is for emergencies only. Fix the underlying issue instead of relying on bypasses in normal work.

## Verification Matrix

- Docs changes (`data/docs/**`, docs images, docs nav, redirects/scripts):
  - `yarn check:docs-metadata`
  - `yarn check:doc-redirects`
  - `yarn test:docs-metadata`
  - `yarn test:doc-redirects`
- Site code changes (`app/**`, `components/**`, `hooks/**`, `utils/**`, config):
  - `yarn check:stale-urls` + `yarn test:stale-urls`
  - `yarn lint`
  - `yarn build`
- Mixed docs + code changes:
  - run both sets
- `constants/listicles/*.json` changes:
  - `node --test tests/component-items-sync.test.js`

## CI Checks

- Docs Redirect Guard runs redirect tests and validation when docs paths or redirect-related files change.
- Stale URL Guard runs stale URL tests and validation when code, content, or redirect-related files change.
- Docs Metadata Guard runs metadata tests and validation when docs files or metadata tooling changes.
- Add to Onboarding is label-driven. The eligibility policy lives in [docs-review.md](docs-review.md).
- Sync Content to Strapi CMS decides per event: fork PR → skipped; same-repo PR with the `staging` label → staging sync plus a preview comment on the PR; same-repo PR without the label → skipped; push to `main` → live sync to the production CMS.

## PR Expectations

- Submit Draft PRs by default.
- Include a concise summary, clear motivation, and screenshots when the change is visual.
- Use the matching checklist snippets in [templates/pr-checklists.md](templates/pr-checklists.md).
- Report what you ran, what failed, and why.
