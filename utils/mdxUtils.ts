import readingTime from 'reading-time'
import { generateStructuredData } from './structuredData'
import { MDXContent } from './strapi'
import { deriveDates, resolveLatestDate } from './dateUtils'
import siteMetadata from '@/data/siteMetadata'
import { generateTOC, mdxOptions } from './mdx/options'

export { mdxOptions, generateTOC }

export function ensureTrailingSlash(url: string): string {
  if (url.endsWith('/')) return url
  return `${url}/`
}

// Content type to route prefix mapping for related articles
const contentTypeRoutePrefix: Record<string, string> = {
  doc: 'docs',
  guide: 'guides',
  comparison: 'comparisons',
  blog: 'blog',
  faq: 'faqs',
  opentelemetry: 'opentelemetry',
  case_study: 'customers',
}

const DEFAULT_DOC_TAGS = ['SigNoz Cloud', 'Self-Host']

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
        date: resolveLatestDate(doc),
        publishedOn: resolveLatestDate(doc),
        url: ensureTrailingSlash(`${siteMetadata.siteUrl}/${routePrefix}${doc.path || ''}`),
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
          url: ensureTrailingSlash(`${siteMetadata.siteUrl}/${prefix}${item.path || ''}`),
          slug: (item.path || '').split('/').pop() || '',
          title: item.title,
          date: resolveLatestDate(item),
          publishedOn: resolveLatestDate(item),
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

// Extract lightweight author objects suitable for card display (name + image).
function extractAuthorObjects(raw: unknown): { key?: string; name?: string; image_url?: string }[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((a: string | MDXContent) => {
      if (typeof a === 'string') return { key: a, name: a }
      return { key: a.key, name: a.name, image_url: a.image_url }
    })
    .filter((a) => a.name)
}

export const transformComparison = (comparison: MDXContent) => {
  const slug = comparison.path?.split('/').pop() || ''
  const path = `comparisons/${slug}`

  const { publishedDate, updatedDate, sortDate } = deriveDates(comparison)

  const authors = Array.isArray(comparison.authors)
    ? comparison.authors.map((author: string | MDXContent) =>
        typeof author === 'string' ? author : author.key
      )
    : []
  const authorObjects = extractAuthorObjects(comparison.authors)

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
    published_date: publishedDate,
    updated_date: updatedDate,
    publishedAt: publishedDate || comparison.updatedAt || comparison.publishedAt,
  } as MDXContent

  return {
    ...comparison,
    _id: comparison.documentId || String(comparison.id),
    _raw: {},
    type: 'Comparison',
    title: comparison.title,
    meta_title: comparison.meta_title,
    published_date: publishedDate,
    updated_date: updatedDate,
    date: sortDate,
    tags,
    description: comparison.description,
    authors,
    authorObjects,
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

export const transformBlog = (blog: MDXContent) => {
  const slug = blog.path?.split('/').pop() || ''
  const path = `blog/${slug}`

  const { publishedDate, updatedDate, sortDate } = deriveDates(blog)

  const authors = Array.isArray(blog.authors)
    ? blog.authors.map((author: string | MDXContent) =>
        typeof author === 'string' ? author : author.key
      )
    : []
  const authorObjects = extractAuthorObjects(blog.authors)

  const tags = Array.isArray(blog.tags)
    ? blog.tags.map((tag: string | MDXContent) => (typeof tag === 'string' ? tag : tag.value))
    : []

  const keywords = Array.isArray(blog.keywords)
    ? blog.keywords.map((keyword: string | MDXContent) =>
        typeof keyword === 'string' ? keyword : keyword.value
      )
    : []

  const readingTimeStats = readingTime(blog.content || '')

  const contentForStructuredData = {
    ...blog,
    slug,
    path,
    published_date: publishedDate,
    updated_date: updatedDate,
    publishedAt: publishedDate || blog.updatedAt || blog.publishedAt,
  } as MDXContent

  return {
    ...blog,
    _id: blog.documentId || String(blog.id),
    _raw: {},
    type: 'Blog',
    title: blog.title,
    meta_title: blog.meta_title,
    published_date: publishedDate,
    updated_date: updatedDate,
    date: sortDate,
    lastmod: blog.lastmod || sortDate,
    draft: blog.draft ?? false,
    summary: blog.summary || blog.description,
    tags,
    description: blog.description,
    image: blog.image,
    images: blog.images,
    authors,
    authorObjects,
    keywords,
    slug,
    content: blog.content,
    body: { raw: '', code: '' },
    toc: generateTOC(blog.content || ''),
    readingTime: readingTimeStats,
    path,
    filePath: path.endsWith('.mdx') ? path : `${path}.mdx`,
    structuredData: generateStructuredData('blog', contentForStructuredData),
    relatedArticles: transformRelatedArticles(blog),
    is_newsroom: blog.is_newsroom ?? false,
    hide_table_of_contents: blog.hide_table_of_contents ?? false,
    excludeFromSitemap: blog.excludeFromSitemap ?? false,
    cta_title: blog.cta_title,
    cta_text: blog.cta_text,
    canonicalUrl: blog.canonicalUrl,
  }
}

export const transformGuide = (guide: MDXContent) => {
  const slug = guide.path?.split('/').pop() || ''
  const path = `guides/${slug}`

  const { publishedDate, updatedDate, sortDate } = deriveDates(guide)

  const authors = Array.isArray(guide.authors)
    ? guide.authors.map((author: string | MDXContent) =>
        typeof author === 'string' ? author : author.key
      )
    : []
  const authorObjects = extractAuthorObjects(guide.authors)

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
    published_date: publishedDate,
    updated_date: updatedDate,
    publishedAt: publishedDate || guide.updatedAt || guide.publishedAt,
  } as MDXContent

  return {
    ...guide,
    _id: guide.documentId || String(guide.id),
    _raw: {},
    type: 'Guide',
    title: guide.title,
    meta_title: guide.meta_title,
    published_date: publishedDate,
    updated_date: updatedDate,
    date: sortDate,
    lastmod: guide.lastmod || sortDate,
    draft: guide.draft ?? false,
    summary: guide.summary || guide.description,
    tags,
    description: guide.description,
    image: guide.image,
    authors,
    authorObjects,
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

export const transformDoc = (doc: MDXContent) => {
  const slug = (doc.path || '').replace(/^\/+|\/+$/g, '')
  const docPath = `docs/${slug}`

  const { publishedDate, updatedDate, sortDate } = deriveDates(doc)

  const docTags =
    Array.isArray(doc.tags) && doc.tags.length > 0
      ? doc.tags
          .map((tag: string | MDXContent) => (typeof tag === 'string' ? tag : tag.value))
          .filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
      : DEFAULT_DOC_TAGS

  const authors = Array.isArray(doc.authors)
    ? doc.authors.map((author: string | MDXContent) =>
        typeof author === 'string' ? author : author.key
      )
    : []

  const keywords = Array.isArray(doc.keywords)
    ? doc.keywords.map((keyword: string | MDXContent) =>
        typeof keyword === 'string' ? keyword : keyword.value
      )
    : []

  const readingTimeStats = readingTime(doc.content || '')

  const contentForStructuredData = {
    ...doc,
    slug,
    path: docPath,
    tags: docTags,
    published_date: publishedDate,
    updated_date: updatedDate,
    publishedAt: publishedDate || doc.updatedAt || doc.publishedAt,
  } as MDXContent

  return {
    ...doc,
    _id: doc.documentId || String(doc.id),
    _raw: {},
    type: 'Doc',
    title: doc.title,
    meta_title: doc.meta_title,
    published_date: publishedDate,
    updated_date: updatedDate,
    date: sortDate,
    lastmod: doc.lastmod || sortDate,
    draft: doc.draft ?? false,
    summary: doc.summary || doc.description,
    tags: docTags,
    docTags,
    description: doc.description,
    image: doc.image,
    images: doc.images,
    authors,
    keywords,
    slug,
    content: doc.content,
    body: { raw: doc.content || '', code: '' },
    toc: generateTOC(doc.content || ''),
    readingTime: readingTimeStats,
    path: docPath,
    filePath: docPath.endsWith('.mdx') ? docPath : `${docPath}.mdx`,
    structuredData: generateStructuredData('docs', contentForStructuredData),
    relatedArticles: transformRelatedArticles(doc),
    hide_table_of_contents: doc.hide_table_of_contents ?? false,
    canonicalUrl: doc.canonicalUrl,
    sidebar_label: doc.sidebar_label,
    doc_type: doc.doc_type,
  }
}
