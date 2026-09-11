# Development Setup

## Prerequisites

- [Node.js](https://nodejs.org/) - We use Node.js version 20.19.4
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) - For managing Node.js versions
- [Yarn](https://yarnpkg.com/) - Package manager

## Setting Up Your Development Environment

1. Install NVM if you haven't already:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Install Yarn if you haven't already:

   ```bash
   npm install -g yarn
   ```

3. Install and use the correct Node.js version by running the following commands in the project directory:

   ```bash
   nvm install
   nvm use
   ```

4. Install dependencies:

   ```bash
   yarn install
   ```

5. Build the project to ensure there are no errors:

   ```bash
   yarn build
   ```

   This will create a `build` directory with the production build of the website. Check the output for any errors.

6. Start the development server:

   ```bash
   yarn dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to view the website locally.

### How Content Is Served

Production pages for docs, blog, guides, comparisons, FAQs, case studies, and OpenTelemetry content are rendered from SigNoz's private CMS, which is kept in sync with the MDX files under `data/` in this repo. **You do not need CMS access or any `.env.local` setup for local development** — with no environment variables set, `yarn dev` renders all of that content directly from the local files in `data/`.

Without CMS access, a few things intentionally look different locally:

- Author names render as raw keys (e.g. `ankit-nayan`) instead of full names with avatars.
- Related-articles sections are empty.
- The changelog and the page-feedback widget don't load.

These fallbacks are expected — don't try to fix them in a PR. `NEXT_PUBLIC_SIGNOZ_CMS_API_URL` and the other `.env.local` variables are used by the internal SigNoz team; external contributors don't need any of them.

### Git Hooks

- We use Husky for pre-commit checks. See [contributing/repo-workflow.md#git-hooks-and-checks](contributing/repo-workflow.md#git-hooks-and-checks).

### Storybook

Every component available to MDX authors (everything registered in `components/MDXComponents.tsx`) is documented in Storybook, with live examples and a copy-pasteable MDX snippet per example.

```bash
yarn storybook          # dev server at http://localhost:6006
yarn build-storybook    # static build
```

Visual regressions are caught by Chromatic - see [VISUAL_TESTING.md](VISUAL_TESTING.md). When adding or changing a component, follow the story conventions in `.agents/skills/signoz-storybook-stories/SKILL.md`.

# Contributing

Looking to contribute a blog, docs page, or site change? Start with [CONTRIBUTING.md](CONTRIBUTING.md), then use the task-specific playbooks under [contributing/](contributing/).

## Contributing From a Fork (External Contributors)

> **SigNoz team members: don't fork.** If you have write access to this repo, create your branch here and open the PR from it. The CMS sync and the `staging` preview label check that the PR branch lives in this repo — a fork PR is always treated as external, even if you're on the team, so it never syncs and never gets a staged preview.

The Strapi CMS that serves production content is private, and so is its repository — you can't run it locally or point your fork at it. That's expected and not required: local preview works entirely from the files in this repo.

Your workflow:

1. Fork the repo and create a branch.
2. Add or edit MDX under `data/` (see [contributing/cms-content.md](contributing/cms-content.md) for the folder map). Put images in `data-assets/`, not `public/`.
3. Preview with `yarn dev` — this is your full preview. Content pages render from your local files (see [How Content Is Served](#how-content-is-served)).
4. Open a PR and include screenshots — and a short screen recording for anything interactive or multi-page — of your local preview. Reviewers won't get a deploy preview of your content, so this is how they see your change.

What to expect on your PR:

- **No Vercel preview for content-only changes.** PRs that only touch `data/` or `data-assets/` intentionally skip the preview deployment.
- **The "Sync Content to Strapi CMS" workflow is skipped on fork PRs.** It needs repository secrets, which are unavailable to forks — the `staging` preview label only works for branches in the main repo, so a maintainer may push your branch there if a staged preview is needed.
- **Lint, tests, and the docs guards do run on fork PRs** and must pass.

Publishing: once a maintainer merges your PR to `main`, the sync workflow pushes your content to the CMS and it goes live on signoz.io — nothing more is needed from you.

If you have any questions or need further assistance, feel free to reach out to us on [SigNoz Slack Community](https://signoz.io/slack).

---
