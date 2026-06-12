# CMS-Migrated Content

Use this playbook when working with content in CMS-migrated folders.

## CMS-Migrated Folders

The following content directories are managed through a CMS and synced to the repository:

| Route | Data Directory |
|---|---|
| `/blog` | `data/blog` |
| `/guides` | `data/guides` |
| `/comparisons` | `data/comparisons` |
| `/faqs` | `data/faqs` |
| `/case-study` | `data/case-study` |
| `/opentelemetry` | `data/opentelemetry` |

## Environment Setup

To preview CMS content locally (including author details and related articles), set the CMS API URL in `.env.local`:

```env
NEXT_PUBLIC_SIGNOZ_CMS_API_URL=<ask the internal team for access>
```

Without this variable the site still builds and runs, but pages that depend on CMS data render with fallback values. For example, author names fall back to the raw key string (e.g. `ankit-nayan` instead of "Ankit Nayan" with no image and URL) and related-article links may be empty.

To get CMS API access, ask a SigNoz team member.

## Local Content Overlay (Dev Mode)

When running `yarn dev`, the site enables a **local content overlay**:

1. Local MDX files in the `data/` directories listed above **take priority over CMS content**.
2. You can create or edit `.mdx` files locally and see changes immediately, even without CMS access.
3. If a local file exists for a given content path, it is used. Otherwise the CMS version is fetched (when the env var is configured).

This lets you author and preview content locally, then sync to the CMS when ready.

### Frontmatter

Local MDX files use standard frontmatter:

```yaml
---
title: Your Article Title
date: 2024-01-15
authors:
  - author-key
tags:
  - opentelemetry
  - monitoring
---
```

- `authors` values are keys that reference entries in the CMS author directory. Without CMS access, they display as-is.
- Use existing posts in the same `data/` folder as local style references for additional frontmatter fields.

## Images and Assets

CMS-migrated content stores images in `data-assets/` (not `public/`):

- Reference images in MDX using standard paths (e.g. `/img/blog/2024-01/screenshot.webp`).
- Place the actual file at `data-assets/img/blog/2024-01/screenshot.webp`.
- In dev mode, the Next.js dev server automatically serves files from `data-assets/` via an internal rewrite when they are not found in `public/`.
- A pre-commit hook (`scripts/check-cms-assets.js`) validates that all referenced assets exist in `data-assets/`. If an asset is found only in `public/`, the hook moves or copies it automatically.

### Why `data-assets/` instead of `public/`?

Assets for CMS-migrated content are synced to a CDN during the CMS sync process. Keeping them separate from `public/` avoids duplication and gives the sync pipeline a single source of truth.

## Pre-Commit Hook

When staged files include changes to CMS-migrated content (`data/(faqs|case-study|opentelemetry|comparisons|guides|blog)/**`), the pre-commit hook runs `node scripts/check-cms-assets.js`.

If the hook fails:

1. Add the missing asset(s) to `data-assets/`.
2. Stage the new files.
3. Commit again.

## Verification

CMS content changes follow the same verification as site code:

```bash
yarn lint
yarn build
```
