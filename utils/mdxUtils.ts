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

// Content type to route prefix mapping for related articles
const contentTypeRoutePrefix: Record<string, string> = {
  guide: 'guides',
  comparison: 'comparisons',
  blog: 'blog',
  faq: 'faqs',
  opentelemetry: 'opentelemetry',
  case_study: 'case-study',
}

// Extract the populated relation document from a related_articles component entry.
// Each entry has content_type + one populated relation field matching that type.
function getRelatedDoc(entry: any): { doc: any; contentType: string } | null {
  const contentType = entry.content_type
  if (!contentType) return null

  const doc = entry[contentType]
  if (doc && doc.title) {
    return { doc, contentType }
  }

  return null
}

// Transform related_articles component entries into the shape ArticleLayout expects.
// Relations are populated by Strapi so title/date are always fresh.
// Falls back to legacy per-type relation fields for backward compatibility.
function transformRelatedArticles(content: MDXContent): any[] {
  // Prefer the new interleaved related_articles component with actual relations
  if (Array.isArray(content.related_articles) && content.related_articles.length > 0) {
    const articles: any[] = []

    for (const entry of content.related_articles) {
      const result = getRelatedDoc(entry)
      if (!result) continue

      const { doc, contentType } = result
      const routePrefix = contentTypeRoutePrefix[contentType] || contentType

      articles.push({
        title: doc.title,
        date: doc.date || doc.updatedAt || doc.publishedAt,
        publishedOn: doc.date || doc.updatedAt || doc.publishedAt,
        url: `${siteMetadata.siteUrl}/${routePrefix}${doc.path || ''}`,
        content_type: contentType,
      })
    }

    if (articles.length > 0) return articles
  }

  // Fallback: legacy per-type relation fields (related_guides, related_comparisons, etc.)
  const legacyArticles: any[] = []

  const legacyMappings = [
    { field: 'related_guides', prefix: 'guides' },
    { field: 'related_comparisons', prefix: 'comparisons' },
    { field: 'related_blogs', prefix: 'blog' },
    { field: 'related_faqs', prefix: 'faqs' },
  ]

  for (const { field, prefix } of legacyMappings) {
    const items = content[field]
    if (Array.isArray(items)) {
      for (const item of items) {
        legacyArticles.push({
          _id: item.documentId || String(item.id),
          _raw: {},
          path: `${prefix}${item.path || ''}`,
          url: `${siteMetadata.siteUrl}/${prefix}${item.path || ''}`,
          slug: (item.path || '').split('/').pop() || '',
          title: item.title,
          date: item.date || item.updatedAt || item.publishedAt,
          publishedOn: item.date || item.updatedAt || item.publishedAt,
          tags: item.tags?.map((tag: string | MDXContent) =>
            typeof tag === 'string' ? tag : tag.value
          ),
          description: item.description,
          authors: item.authors?.map((author: string | MDXContent) =>
            typeof author === 'string' ? author : author.key
          ),
          keywords: item.keywords?.map((keyword: string | MDXContent) =>
            typeof keyword === 'string' ? keyword : keyword.value
          ),
        })
      }
    }
  }

  return legacyArticles
}

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
    relatedArticles: transformRelatedArticles(comparison),
  }
}

export const transformGuide = (guide: MDXContent) => {
  const slug = guide.path?.split('/').pop() || ''
  const path = `guides/${slug}`

  const authors = Array.isArray(guide.authors)
    ? guide.authors.map((author: string | MDXContent) =>
        typeof author === 'string' ? author : author.key
      )
    : []

  const tags = Array.isArray(guide.tags)
    ? guide.tags.map((tag: string | MDXContent) => (typeof tag === 'string' ? tag : tag.value))
    : []

  const keywords = Array.isArray(guide.keywords)
    ? guide.keywords.map((keyword: string | MDXContent) =>
        typeof keyword === 'string' ? keyword : keyword.value
      )
    : []

  const readingTimeStats = readingTime(guide.content || '')

  const contentForStructuredData = {
    ...guide,
    slug,
    path,
    publishedAt: guide.date || guide.updatedAt || guide.publishedAt,
  } as MDXContent

  return {
    ...guide,
    _id: guide.documentId || String(guide.id),
    _raw: {},
    type: 'Guide',
    title: guide.title,
    date: guide.date,
    lastmod: guide.lastmod || guide.date,
    draft: guide.draft ?? false,
    summary: guide.summary || guide.description,
    tags,
    description: guide.description,
    image: guide.image,
    authors,
    keywords,
    slug,
    content: guide.content,
    body: { raw: '', code: '' },
    toc: generateTOC(guide.content || ''),
    readingTime: readingTimeStats,
    path,
    filePath: path.endsWith('.mdx') ? path : `${path}.mdx`,
    structuredData: generateStructuredData('guides', contentForStructuredData),
    relatedArticles: transformRelatedArticles(guide),
  }
}
