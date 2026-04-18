# PR Checklist Snippets

Use the sections below as lightweight references when filling out or reviewing the PR template.

## All Changes

- Run the checks that match the files changed.
- Self-review the change before requesting review.
- Document any failures, caveats, or follow-up work.
- If a check is currently failing for unrelated repo or environment reasons, call that out clearly in the PR.

## Docs Changes

- Frontmatter is complete and correct.
- The primary job is clear and the happy path is easy to follow.
- `## Validate` shows where success appears in SigNoz.
- `## Troubleshooting` maps symptom -> cause -> fix -> verification.
- Links, images, redirects, and discovery updates are handled where needed.
- Any added docs images use WebP format.
- Relevant docs checks were run.

## Blog Changes

- Frontmatter includes `title`, `date`, `author`, and `tags`.
- Images live under `public/img/blog/<YYYY-MM>/` and use WebP format.
- Internal links use canonical production URLs.

## Site Code Changes

- Existing patterns and components were reused where possible.
- New dependencies are justified.
- Relevant lint, build, and targeted tests were run.

## Renamed Or Moved Docs

- Permanent redirect added in `next.config.js`.
- Internal links and sidebar entries updated.
- Redirect checks were run.
