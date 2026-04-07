# Contributing to SigNoz Web

Use this file as the stable entrypoint for contributing to `signoz-web`.

- Contributors should start here, then open the task-specific playbook that matches the change.
- Reviewers and agents should use this file as the router and `contributing/**` as the detailed guidance source.
- Development setup and local preview still live in [README.md](README.md).

## Choose Your Task

- [Write or update docs](contributing/docs-authoring.md) (includes redirects and discovery)
- [Review docs PRs](contributing/docs-review.md)
- [Change site code](contributing/site-code.md)
- [Publish or update a blog post](contributing/blog-workflow.md)
- [Follow the shared repo workflow](contributing/repo-workflow.md)
- [Use contributor templates](contributing/templates/)

## How To Use This Guidance

- `contributing/**` contains the canonical task-level policy, checklists, and templates.
- `AGENTS.md`, review skills, PR templates, and workflow prompts should link to those playbooks instead of duplicating them.

## Verification

Use the canonical verification matrix in [contributing/repo-workflow.md](contributing/repo-workflow.md#verification-matrix).

## Shared PR Workflow

1. Fork and clone the repo.
2. Create a focused branch.
3. Make task-scoped changes.
4. Run the checks that match your files using the matrix in [contributing/repo-workflow.md](contributing/repo-workflow.md#verification-matrix).
5. Open the PR as Draft by default.
6. Mark it ready only after checks and self-review are complete.

See [contributing/repo-workflow.md](contributing/repo-workflow.md) for Git hooks, CI checks, and failure handling.

## Quick Rules

- Keep changes minimal and scoped to the task.
- Use existing patterns before creating new abstractions.
- Do not bypass failing checks silently.
- If a docs URL changes, also handle redirects, sidebar updates, and any discovery surfaces.
- **Docs MDX filenames:** do not use `.` in the basename (except `.mdx`). Use hyphens instead (for example `upgrade-0-8-1.mdx`, not `upgrade-0.8.1.mdx`) so URLs stay consistent with `trailingSlash` and Next.js routing. See [contributing/docs-authoring.md](contributing/docs-authoring.md#docs-file-and-url-names).
- For OpenTelemetry technical claims, verify against official OpenTelemetry docs or repositories.

## Need More Detail?

- Docs structure, JTBD guidance, snippets, redirects, and Send Data rules: [contributing/docs-authoring.md](contributing/docs-authoring.md)
- Docs review rubric and onboarding label policy: [contributing/docs-review.md](contributing/docs-review.md)
- Frontend conventions and MDX rendering constraints: [contributing/site-code.md](contributing/site-code.md)
- Blog-specific workflow: [contributing/blog-workflow.md](contributing/blog-workflow.md)
- Reusable templates and checklist snippets: [contributing/templates/](contributing/templates/)
