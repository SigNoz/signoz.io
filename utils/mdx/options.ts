import GithubSlugger from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { toString } from 'hast-util-to-string'
import remarkGfm from 'remark-gfm'
import { remarkExtractFrontmatter, remarkImgToJsx } from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkMath from 'remark-math'
import { remarkCodeTitleToMeta } from './remarkCodeTitleToMeta'
import {
  filterCodeBlockMetaString,
  rehypeCodeBlockDefaults,
  rehypeExtractCodeBlockMeta,
} from './rehypeCodeBlockMeta'

// Heroicon mini link for auto-linking headers
const linkIcon = fromHtmlIsomorphic(
  `<span class="content-header-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon"><path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" /><path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" /></svg></span>`,
  { fragment: true }
)

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
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          headingProperties: {
            className: ['content-header'],
          },
          content: linkIcon,
        },
      ],
      rehypeExtractCodeBlockMeta,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark-dimmed',
            light: 'github-light',
          },
          keepBackground: false,
          defaultLang: {
            block: 'plaintext',
            inline: 'plaintext',
          },
          filterMetaString: filterCodeBlockMetaString,
          // ```diff: Shiki only colors +/- tokens. Mark lines for row backgrounds.
          // Scope to lang=diff so YAML list items ("- foo") are not marked.
          transformers: [
            {
              name: 'signoz-diff-line-bg',
              line(hast) {
                if (this.options.lang !== 'diff') return
                const text = toString(hast)
                if (text.startsWith('+')) {
                  hast.properties['data-diff'] = 'add'
                } else if (text.startsWith('-')) {
                  hast.properties['data-diff'] = 'remove'
                }
              },
            },
          ],
        },
      ],
      rehypeCodeBlockDefaults,
    ],
  },
}

// Generate table of contents from MDX content
export function generateTOC(content: string) {
  const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
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
