import GithubSlugger from 'github-slugger'
import remarkGfm from 'remark-gfm'
import { remarkExtractFrontmatter, remarkImgToJsx } from 'pliny/mdx-plugins/index.js'
import remarkMath from 'remark-math'
import { remarkCodeTitleToMeta } from './remarkCodeTitleToMeta'
import { docsRehypePlugins } from './rehypeDocsPlugins'

/** Shared MDX remark/rehype options for docs, blog, guides, and agent markdown. */
export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitleToMeta,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: docsRehypePlugins,
  },
}

// Generate table of contents from MDX content
export function generateTOC(content: string) {
  // Allow leading whitespace so headings nested in JSX tabs (e.g. `    ### Title`) are included.
  // GithubSlugger order must match rehype-slug for IDs to line up with the rendered DOM.
  const regXHeader = /\n\s*(?<flag>#{1,3})\s+(?<content>.+)/g
  const slugger = new GithubSlugger()

  // Remove code blocks to avoid parsing headers inside code
  const regXCodeBlock = /```[\s\S]*?```/g
  const contentWithoutCodeBlocks = content.replace(regXCodeBlock, '')

  const headings = Array.from(contentWithoutCodeBlocks.matchAll(regXHeader))
    .map(({ groups }) => {
      const flag = groups?.flag
      const content = groups?.content
      if (!content) return null
      return {
        value: content,
        url: `#${slugger.slug(content)}`,
        depth: flag?.length === 1 ? 1 : flag?.length === 2 ? 2 : 3,
      }
    })
    .filter((heading): heading is NonNullable<typeof heading> => heading !== null)

  return headings
}
