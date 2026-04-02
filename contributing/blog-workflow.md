# Blog Workflow

Use this playbook for content under `data/blog/**`.

## Blog Expectations

- Follow the shared repo workflow in [repo-workflow.md](repo-workflow.md).
- Do not force docs-only structure or checklist items onto blog posts.
- Use existing posts in `data/blog/**` as local style references when formatting a new post.

## Blog Metadata

At minimum, include:

- `title`
- `date`
- `author`
- `tags`
- `canonicalUrl` when applicable

## Images

- Store blog images under `public/img/blog/<YYYY-MM>/`.
- Use WebP format for all blog images. See [Creating WebP images doc](https://signoz.notion.site/Creating-webp-images-7c27a266c4ae4ea49a76a2d3ba3296a5?pvs=74) for tips and tools.

## Authoring Notes

- Use absolute production URLs for internal links.
- Keep the title, description, and metadata aligned with the post topic.
- If the blog references product setup or instrumentation, link to the relevant docs instead of reproducing long setup instructions in full.

## Submission

- Run the shared checks from [repo-workflow.md](repo-workflow.md) that apply to your change.
- Open the PR as Draft by default.
- Include screenshots when the post depends on visual context.
