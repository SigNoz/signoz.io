# Development Setup

## Prerequisites

- [Node.js](https://nodejs.org/) - We use Node.js version 18.19.0
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) - For managing Node.js versions
- [Yarn](https://yarnpkg.com/) - Package manager

## Setting Up Your Development Environment

1. Install NVM if you haven't already:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Install and use the correct Node.js version by running the following commands in the project directory:

   ```bash
   nvm install
   nvm use
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Build the project to ensure there are no errors:

   ```bash
   yarn build
   ```

   This will create a `build` directory with the production build of the website. Check the output for any errors.

5. Start the development server:

   ```bash
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the website locally.

### Git Hooks

- We use Husky for pre-commit checks. See details in [CONTRIBUTING.md#git-hooks-and-checks](CONTRIBUTING.md#git-hooks-and-checks).

# Contributing

Looking to contribute a blog or improve docs? See the full guidelines in [CONTRIBUTING.md](CONTRIBUTING.md), including blog contribution steps, docs standards, and the PR checklist.

If you have any questions or need further assistance, feel free to reach out to us on [SigNoz Slack Community](https://signoz.io/slack).

---

## Add a `NEW` tag to Documentation

We can add a `NEW` tag for doc that went live recently. To do this, you just need to add `className: 'new-doc'` key value pair to the doc in the `docsSideNav.ts` file. For example, if a new doc for LLM monitoring went live, you can add a new tag to it as follows:

```tsx
{
    route: '/docs/community/llm-monitoring',
    label: 'LLM Monitoring',
    type: 'doc',
    className: 'new-doc',
},

```

You can do the same for a Category. For example, if you're adding a new category with the label `Azure Monitoring` and it has multiple docs inside it, you can add a new tag as shown below:

```tsx

{
    label: 'Azure Monitoring',
    type: 'category',
    className: 'new-doc',
    items: [
      {
        ...
      },
    ],

```
