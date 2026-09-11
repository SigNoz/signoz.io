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

## Create a pull request

1. Fork [`SigNoz/signoz.io`](https://github.com/SigNoz/signoz.io) on GitHub.
2. Clone your fork and enter the repository:

   ```bash
   git clone https://github.com/<your-username>/signoz.io.git
   cd signoz.io
   ```

3. Create a branch for your change:

   ```bash
   git switch -c <branch-name>
   ```

4. Make your changes. Run the checks for your change type from the [verification matrix](contributing/repo-workflow.md#verification-matrix).
5. Preview the changes locally:

   For CMS-migrated content, add the CMS API URL to `.env.local`. Ask a SigNoz team member for access.

   ```env
   NEXT_PUBLIC_SIGNOZ_CMS_API_URL=<CMS-API-URL>
   ```

   Local MDX changes render without this variable, but CMS-backed author details and related articles use fallback values.

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) and go to the page you changed. Check the page at desktop and narrow viewport sizes.

6. Commit and push your changes:

   ```bash
   git add <changed-files>
   git commit -m "<type>: <short description>"
   git push -u origin <branch-name>
   ```

7. Open your fork on GitHub and select **Compare & pull request**.
8. Set `SigNoz/signoz.io` and `main` as the base repository and branch. Set your fork and branch as the head repository and branch.
9. Complete the pull request template. Include the checks you ran and screenshots for visual changes.
10. Open the pull request as a draft.
11. For content changes from a branch in `SigNoz/signoz.io`, add the `staging` label to sync the changes to the staging CMS. Wait for the workflow comment, then review the changed page on the staging site. If you cannot add labels, ask a maintainer to add it.
12. Mark the pull request ready for review after the checks pass and you complete a self-review.

The staging CMS cannot access pull requests from external forks. For a fork-based pull request, include local preview evidence and ask a maintainer to create a repository-owned branch when a staging preview is required.

For Git hooks, CI checks, and troubleshooting, see the [repository workflow](contributing/repo-workflow.md).

If you have any questions or need further assistance, feel free to reach out to us on [SigNoz Slack Community](https://signoz.io/slack).

---
