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

If you have any questions or need further assistance, feel free to reach out to us on [SigNoz Slack Community](https://signoz.io/slack).

---
