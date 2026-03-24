## Summary
<!-- What does this PR do? Provide a concise overview of the change. -->

## Motivation / Problem
<!-- Why is this change needed? What problem does it solve? -->
<!-- Link issues if applicable (e.g. Fixes #123) -->

## Changes
<!-- Describe the key changes introduced in this PR -->
-
-
-

## Description
<!-- Briefly describe what this PR does and why -->

## Type of Change
<!-- Check all that apply -->

- [ ] **Docs** – Changes to `data/docs/**`
- [ ] **Blog** – Changes to `data/blog/**`
- [ ] **Site Code** – Changes to `app/**`, `components/**`, `hooks/**`, `utils/**`, config, etc.
- [ ] **Redirects** – Renamed/moved docs or updated `next.config.js` redirects
- [ ] **Dependencies / CI / Scripts**
- [ ] **Other** – Explain below

## Impact
<!-- Who or what is affected by this change? -->
- [ ] Documentation only
- [ ] UI changes
- [ ] Developer workflow
- [ ] Performance impact
- [ ] Breaking change

If breaking change, describe migration steps:

## Context & Screenshots
<!-- Add screenshots for UI or docs changes when helpful -->

## Before / After (if applicable)
<!-- Show how things changed -->
<!-- Screenshots, gifs, or code examples -->

## Checklist

<!-- Complete the sections that apply to your changes -->

### General
- [ ] Branch is up to date with `main`
- [ ] PR title follows conventional format (`type: description`)
- [ ] Self-reviewed the code
- [ ] Comments added for complex logic

### For all changes
- [ ] Built locally (`yarn build`) with no errors
- [ ] Ran `yarn lint` and fixed any issues
- [ ] Pre-commit hooks passed (or ran `yarn check:doc-redirects` / `yarn check:docs-metadata` if applicable)

### For docs changes (`data/docs/**`)
- [ ] Followed the docs author checklist in [contributing/docs-authoring.md](https://github.com/SigNoz/signoz.io/blob/main/contributing/docs-authoring.md)
- [ ] Added/updated the page in `constants/docsSideNav.ts` if adding or moving a doc

### For blog changes
- [ ] Followed the blog workflow in [contributing/blog-workflow.md](https://github.com/SigNoz/signoz.io/blob/main/contributing/blog-workflow.md)
- [ ] Frontmatter includes `title`, `date`, `author`, `tags` (and `canonicalUrl` if applicable)
- [ ] Images use WebP format and live under `public/img/blog/<YYYY-MM>/`

### For site code changes
- [ ] Followed the site code playbook in [contributing/site-code.md](https://github.com/SigNoz/signoz.io/blob/main/contributing/site-code.md)
- [ ] New dependencies are justified in the PR description (if any)

### For renamed or moved docs
- [ ] Followed the redirects and discovery section in [contributing/docs-authoring.md](https://github.com/SigNoz/signoz.io/blob/main/contributing/docs-authoring.md)
- [ ] Added permanent redirect in `next.config.js` under `async redirects()`
- [ ] Updated internal links and sidebar in `constants/docsSideNav.ts`
- [ ] Ran `yarn check:doc-redirects` to verify

## Testing
<!-- Describe how the change was tested -->
- [ ] Tested locally
- [ ] Edge cases considered
- [ ] Existing functionality verified
- [ ] New tests added (if applicable)

Steps to test:
1.
2.
3.

## Rollout / Deployment Notes
<!-- Any special steps required during deployment -->

## Additional Context
<!-- Anything reviewers should know -->

---

**Note:** Submit as Draft by default. Mark "Ready for review" when checks pass and content is ready.
