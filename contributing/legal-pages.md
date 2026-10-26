# Legal pages

Legal documents are published at `signoz.io/legal/<slug>/` and listed on the `/legal` hub. Each document is one markdown file in `data/legal/`.

## Add a document

1. Create `data/legal/<slug>.md`. Use a short kebab-case slug; it becomes the URL (`data/legal/dpa.md` publishes at `/legal/dpa/`).
2. Add the frontmatter:

   ```yaml
   ---
   title: Data Processing Addendum
   description: One sentence shown on /legal and in search results.
   order: 4
   lastUpdated: 2026-10-23
   ---
   ```

   | Field         | Required | Purpose                                                                                     |
   | ------------- | -------- | ------------------------------------------------------------------------------------------- |
   | `title`       | Yes      | Page title, `/legal` hub entry, and metadata.                                               |
   | `description` | Yes      | Hub description and meta description. Plain language, one sentence.                         |
   | `order`       | Yes      | Position on the hub (ascending).                                                            |
   | `lastUpdated` | No       | `YYYY-MM-DD`, shown as "Last updated". Only set a date the document itself states or legal provides. |

   The build fails if a required field is missing.

3. Paste the approved document text below the frontmatter, exactly as approved.
4. Verify (see below).

The `/legal` hub, page metadata, sitemaps and `llms-full.txt` pick up the new file automatically. No route, nav or sitemap edits are needed.

## Update a document

- Replace the body with the new approved text in full rather than editing individual lines.
- Update `lastUpdated` when the document carries a new date.

## Authoring rules

- **Never change the wording.** Do not fix typos, links, capitalization, numbering or formatting in the legal text, even when they look wrong; get the approved text corrected and paste it again.
- Write the body in markdown: headings, bold, ordered and unordered lists, links and tables are all supported.
- Keep the document's own title or heading if it has one; the page shows everything in the file.
- Escape placeholders as `\<Customer Name\>`. Unescaped `<...>` still shows as written, but escaping keeps the source unambiguous.
- Links to pages not hosted on signoz.io (Trust Center, Subprocessors) are not documents; add or edit them in `data/legal/external.ts`.

## How the text is rendered

Every word of the file is shown; rendering only changes formatting, never content.

- GitHub-flavored markdown: tables render, and a single `~` stays as text.
- Ordered lists keep the numbers typed in the text instead of being renumbered.
- A `#` heading inside the document is displayed one level down, since the page already has a title.
- Copy markdown copies the file body exactly as stored.

## Rename or remove a document

- Add a permanent redirect from the old URL in `next.config.js`.
- Update links to the old URL across the repo (`yarn check:stale-urls` reports them).

## Verify

- `yarn test`: `utils/legalMarkdown.test.ts` checks that every document in `data/legal/` renders all of its text.
- `yarn check:stale-urls`
- `yarn build`, then confirm the new page appears under `/legal/[slug]` in the output.
- Open `/legal/` and `/legal/<slug>/` locally and read through the page.
