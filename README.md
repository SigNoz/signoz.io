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

- We use Husky for pre-commit checks. See details in [CONTRIBUTING.md#git-hooks-and-checks](CONTRIBUTING.md#git-hooks-and-checks).

# Contributing

Looking to contribute a blog or improve docs? See the full guidelines in [CONTRIBUTING.md](CONTRIBUTING.md), including blog contribution steps, docs standards, and the PR checklist.

If you have any questions or need further assistance, feel free to reach out to us on [SigNoz Slack Community](https://signoz.io/slack).

---
