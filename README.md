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

# Contributing a Blog to SigNoz

We appreciate your interest in contributing to the SigNoz blog! Follow the steps below to create and submit your blog post.

## Step 1: Fork the Repository

1. Go to the [SigNoz GitHub repository](https://github.com/SigNoz/signoz-web).
2. Click on the "Fork" button at the top-right corner of the page. This will create a copy of the repository under your GitHub account.

## Step 2: Clone Your Forked Repository

1. On your GitHub account, navigate to the forked repository.
2. Click the "Code" button and copy the URL.
3. Open your terminal and run the following command to clone the repository:
    
    ```bash
    git clone <https://github.com/your-username/signoz-web.git>
    
    ```
    
4. Navigate into the cloned directory:
    
    ```bash
    cd signoz-web
    ```
    

## Step 3: Set Up the Upstream Repository

Setting up the upstream repository allows you to fetch changes from the original repository and keep your fork in sync.

1. Add the original repository as the upstream remote:
    
    ```bash
    git remote add upstream https://github.com/SigNoz/signoz-web.git
    ```
    
2. Verify the new remote named `upstream`:
    
    ```bash
    git remote -v
    ```
    

## Step 4: Create a New Branch

It's good practice to create a new branch for your changes. This helps in organizing and managing the contributions.

1. Create a new branch:
    
    ```bash
    git checkout -b add-new-blog
    ```
    

## Step 5: Create Your Blog Post

1. Navigate to the `data/blog` directory:
    
    ```bash
    cd data/blog
    ```
    
2. Create a new `.mdx` file. The file name should correspond to the URL of the blog post. For example, if your blog post URL is `https://signoz.io/blog/opentelemetry-spring-boot/`, the file name should be `opentelemetry-spring-boot.mdx`.
  
3. Add the content for your blog post in the `.mdx` file. Refer to previous blog posts in the `data/blog` directory for the format. Ensure your file includes the following:
    - **Cover Image**: Add a relevant cover image for your blog post.
    - **Metadata**: Include necessary metadata such as title, date, author, tags, etc.
    - **Canonical Links**: Set up canonical links to ensure proper SEO.

## Step 6: Add Images

1. Navigate to the `public/img/blog` directory:
    
    ```bash
    cd public/img/blog
    
    ```
    
2. Create a new folder for the current month (if it doesn't already exist). For example, if you are writing the blog in May 2024, create a folder named `2024-05`.
3. Add your images to the folder you just created.

## Step 7: Add and Commit Your Changes

1. Add your changes:
    
    ```bash
    git add .
    
    ```
    
2. Commit your changes:
    
    ```bash
    git commit -m "Added new blog post: [your blog post title]"
    
    ```
    

## Step 8: Fetch and Merge Upstream Changes

Before pushing your changes, it's a good idea to fetch and merge any changes from the upstream repository to ensure your fork is up-to-date.

1. Fetch the latest changes from the upstream repository:
    
    ```bash
    git fetch upstream
    
    ```
    
2. Merge the changes into your current branch:
    
    ```bash
    git merge upstream/main
    
    ```
    

## Step 9: Push Your Changes

1. Push your branch to your forked repository:
    
    ```bash
    git push origin add-new-blog
    
    ```

## Step 10: Test Your Changes

After setting up your development environment (see [Development Setup](#development-setup) section above), make sure to:

1. Install the project dependencies:
   ```bash
   yarn install
   ```

2. Build the project to ensure there are no errors:
   ```bash
   yarn build
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the website locally. Check your blog post to ensure everything looks correct.

## Step 11: Create a Pull Request

1. Navigate to your forked repository on GitHub.
2. Click on the "Compare & pull request" button.
3. Add a title and description for your pull request.
4. Click on "Create pull request".

Your pull request will be reviewed, and if everything looks good, it will be merged into the main repository. Thank you for your contribution!

## Additional Notes

- **Refer to Previous Blogs**: You can refer to existing blogs in the `data/blog` directory to get an idea of the format and structure.
- **Cover Image and Metadata**: Ensure that you include a relevant cover image and all necessary metadata to make your blog post complete and SEO-friendly.
- **Images**: Make sure to place your images in the correct month folder under `public/img/blog`.

If you have any questions or need further assistance, feel free to reach out to the SigNoz team.

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