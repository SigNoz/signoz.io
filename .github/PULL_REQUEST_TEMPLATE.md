## Description

<!-- Briefly describe what this PR does and why -->

## Type of Change

<!-- Check all that apply -->

- [ ] **Docs** – Changes to `data/docs/**`
- [ ] **Blog** – Changes to `data/blog/**`
- [ ] **Site Code** – Changes to `app/**`, `components/**`, `hooks/**`, `utils/**`, config, etc.
- [ ] **Redirects** – Renamed/moved docs or updated `next.config.js` redirects
- [ ] **Other** – e.g. dependencies, scripts, CI

## Context & Screenshots

<!-- Add screenshots for UI or docs changes when helpful -->

## Checklist

<!-- Complete the sections that apply to your changes -->

### For all changes
- [ ] Built locally (`yarn build`) with no errors
- [ ] Ran `yarn lint` and fixed any issues
- [ ] Pre-commit hooks passed (or ran `yarn check:doc-redirects` / `yarn check:docs-metadata` if applicable)

### For docs changes (`data/docs/**`)
- [ ] Completed the [Docs PR Checklist](CONTRIBUTING.md#docs-pr-checklist) in CONTRIBUTING.md
- [ ] Added/updated the page in `constants/docsSideNav.ts` if adding or moving a doc

### For blog changes
- [ ] Frontmatter includes `title`, `date`, `author`, `tags` (and `canonicalUrl` if applicable)
- [ ] Images use WebP format and live under `public/img/blog/<YYYY-MM>/`

### For site code changes
- [ ] Follows [Site Code Guidelines](CONTRIBUTING.md#website-code-guidelines) in CONTRIBUTING.md
- [ ] New dependencies are justified in the PR description (if any)

### For renamed or moved docs
- [ ] Added permanent redirect in `next.config.js` under `async redirects()`
- [ ] Updated internal links and sidebar in `constants/docsSideNav.ts`
- [ ] Ran `yarn check:doc-redirects` to verify

---

**Note:** Submit as Draft by default. Mark "Ready for review" when checks pass and content is ready.
