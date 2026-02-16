import GithubSlugger from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

import remarkGfm from 'remark-gfm'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkMath from 'remark-math'
import readingTime from 'reading-time'
import { generateStructuredData } from './structuredData'
import { MDXContent } from './strapi'
import siteMetadata from '@/data/siteMetadata'

// Heroicon mini link for auto-linking headers
const linkIcon = fromHtmlIsomorphic(
  `<span class="content-header-link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>
    </span>`,
  { fragment: true }
)

// MDX processing options with all plugins
export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: linkIcon,
        },
      ],
      [rehypePrismPlus, { defaultLanguage: 'tsx', ignoreMissing: true }],
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

/**
 * Transforms a raw MDX comparison content from CMS into the expected format
 * for the frontend application.
 *
 * @param comparison - Raw comparison data from CMS
 * @returns Transformed comparison with TOC, reading time, structured data, etc.
 */
export const transformComparison = (comparison: MDXContent) => {
  const slug = comparison.path?.split('/').pop() || ''
  const path = `comparisons/${slug}`

  const authors = Array.isArray(comparison.authors)
    ? comparison.authors.map((author: string | MDXContent) =>
        typeof author === 'string' ? author : author.key
      )
    : []

  const tags = Array.isArray(comparison.tags)
    ? comparison.tags.map((tag: string | MDXContent) => (typeof tag === 'string' ? tag : tag.value))
    : []

  const keywords = Array.isArray(comparison.keywords)
    ? comparison.keywords.map((keyword: string | MDXContent) =>
        typeof keyword === 'string' ? keyword : keyword.value
      )
    : []

  const readingTimeStats = readingTime(comparison.content || '')

  const contentForStructuredData = {
    ...comparison,
    slug,
    path,
    publishedAt: comparison.date || comparison.updatedAt || comparison.publishedAt,
  } as MDXContent

  const updatedRelatedComparisons = comparison.related_comparisons?.map(
    (relatedComparison: MDXContent) => {
      return {
        ...relatedComparison,
        _id: relatedComparison.documentId || String(relatedComparison.id),
        _raw: {},
        path: `comparisons${relatedComparison.path || ''}`,
        url: `${siteMetadata.siteUrl}/comparisons${relatedComparison.path || ''}`,
        slug: (relatedComparison.path || '').split('/').pop() || '',
        title: relatedComparison.title,
        date:
          relatedComparison.date || relatedComparison.updatedAt || relatedComparison.publishedAt,
        tags: relatedComparison.tags?.map((tag: string | MDXContent) =>
          typeof tag === 'string' ? tag : tag.value
        ),
        description: relatedComparison.description,
        authors: relatedComparison.authors?.map((author: string | MDXContent) =>
          typeof author === 'string' ? author : author.key
        ),
        keywords: relatedComparison.keywords?.map((keyword: string | MDXContent) =>
          typeof keyword === 'string' ? keyword : keyword.value
        ),
      }
    }
  )

  return {
    ...comparison,
    _id: comparison.documentId || String(comparison.id),
    _raw: {},
    type: 'Comparison',
    title: comparison.title,
    date: comparison.date,
    tags,
    description: comparison.description,
    authors,
    keywords,
    slug,
    content: comparison.content,
    body: { raw: '', code: '' },
    toc: generateTOC(comparison.content || ''),
    readingTime: readingTimeStats,
    path,
    filePath: path.endsWith('.mdx') ? path : `${path}.mdx`,
    structuredData: generateStructuredData('comparisons', contentForStructuredData),
    relatedArticles: [...(updatedRelatedComparisons || [])],
  }
}
