# Repo Workflow

Use this playbook for the shared workflow across docs, blogs, site code, and reviews.

## Local Setup

- Install dependencies with `yarn install`.
- Start local development with `yarn dev`.
- Use `yarn build` before opening or updating a PR to catch MDX, TypeScript, and Contentlayer errors.

## Shared Workflow

1. Fork and clone the repo.
2. Create a focused feature branch.
3. Make task-scoped changes with clear commit messages.
4. Run the checks that match your change type.
5. Open the PR as Draft by default.
6. Mark it ready only after content/code and checks are complete.

## Git Hooks And Checks

- Husky installs Git hooks automatically on `yarn install` via the `prepare` script in `package.json`.
- Pre-commit runs `lint-staged` on staged files, which auto-fixes common JS, TS, MD, and MDX issues.
- When staged changes include docs or redirect-related files (`data/docs/**/*.mdx`, `next.config.js`, or `scripts/check-doc-redirects.js`), pre-commit also runs `yarn check:doc-redirects`.
- When staged changes include docs (`data/docs/**/*.mdx`), pre-commit also runs `yarn check:docs-metadata`.

### Fixing Hook Failures

- Lint or format issues: run `yarn lint`, review auto-fixes, and re-stage changed files.
- Redirect failures: run `yarn check:doc-redirects`, add the missing permanent redirect, then re-stage.
- Metadata failures: run `yarn check:docs-metadata`, fix the MDX frontmatter, then re-stage.
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
  - `yarn lint`
  - `yarn build`
- Mixed docs + code changes:
  - run both sets
- `constants/componentItems/*.ts` changes:
  - `yarn tsc --noEmit`
  - `node --test tests/component-items-sync.test.js`

## CI Checks

- Docs Redirect Guard runs redirect tests and validation when docs paths or redirect-related files change.
- Docs Metadata Guard runs metadata tests and validation when docs files or metadata tooling changes.
- Add to Onboarding is label-driven. The eligibility policy lives in [docs-review.md](docs-review.md).

## PR Expectations

- Submit Draft PRs by default.
- Include a concise summary, clear motivation, and screenshots when the change is visual.
- Use the matching checklist snippets in [templates/pr-checklists.md](templates/pr-checklists.md).
- Report what you ran, what failed, and why.
