import { defineCollection, z, CollectionsMap } from './define'
import siteMetadata from '../../data/siteMetadata'
import blogRelatedArticles from '../../constants/blogRelatedArticles.json'
import comparisonsRelatedArticles from '../../constants/comparisonsRelatedArticles.json'
import guidesRelatedArticles from '../../constants/guidesRelatedArticles.json'

function getImageUrl(doc: any): string {
  const raw = doc.image || siteMetadata.socialBanner
  return raw.startsWith('http') ? raw : `${siteMetadata.siteUrl}${raw}`
}

function buildArticleStructuredData(doc: any, urlPrefix: string): object {
  const postUrl = `${siteMetadata.siteUrl}/${urlPrefix}/${doc.slug}`
  const tags = Array.isArray(doc.tags) ? doc.tags : []

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: doc.title,
    description: doc.description || doc.summary || `Read about ${doc.title}`,
    image: {
      '@type': 'ImageObject',
      url: getImageUrl(doc),
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    datePublished: doc.date,
    dateModified: doc.lastmod || doc.date,
    inLanguage: siteMetadata.language,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    ...(tags.length > 0 ? { articleSection: tags[0] } : {}),
  }
}

interface RelatedArticle {
  blogURL: string
  relatedArticles: Array<{ title: string; publishedOn: string; url: string }>
}

function getRelatedArticles(
  slug: string,
  relatedArticles: RelatedArticle[],
  prefix: string
): any[] {
  const blog = relatedArticles.find((b) => b.blogURL === `${prefix}/${slug}`)
  return blog?.relatedArticles || []
}

// Shared computed field schemas
const readingTimeSchema = z.object({
  minutes: z.number(),
  words: z.number(),
  text: z.string(),
})

const tocItemSchema = z.object({
  value: z.string(),
  url: z.string(),
  depth: z.number(),
})

const relatedArticleSchema = z.object({
  title: z.string(),
  publishedOn: z.string(),
  url: z.string(),
})

export const Blog = defineCollection({
  name: 'Blog',
  directory: 'data/blog',
  include: '**/*.mdx',
  fields: {
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    images: z.any().optional(),
    image: z.string().nullable().optional(),
    authors: z.array(z.string()),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    slug: z.string().optional(),
    excludeFromSitemap: z.boolean().optional(),
    hide_table_of_contents: z.boolean().optional(),
    toc_min_heading_level: z.number().optional(),
    toc_max_heading_level: z.number().optional(),
    cta_title: z.string().optional(),
    cta_text: z.string().optional(),
    is_newsroom: z.boolean().optional(),
  },
  computedFields: {
    slug: z.string(),
    path: z.string(),
    filePath: z.string(),
    readingTime: readingTimeSchema,
    toc: z.array(tocItemSchema),
    relatedArticles: z.array(relatedArticleSchema),
    structuredData: z.any(),
  },
  computedFieldsFn: (doc, helpers) => {
    const slug = doc.slug || doc._file.path.replace(/^blog\//, '').replace(/\.mdx$/, '')
    return {
      slug,
      path: `blog/${slug}`,
      filePath: doc._file.path,
      readingTime: helpers.readingTime(doc.body.raw),
      toc: helpers.extractToc(doc.body.raw),
      relatedArticles: getRelatedArticles(slug, blogRelatedArticles as RelatedArticle[], 'blog'),
      structuredData: buildArticleStructuredData({ ...doc, slug }, 'blog'),
    }
  },
})

export const Doc = defineCollection({
  name: 'Doc',
  directory: 'data/docs',
  include: '**/*.mdx',
  fields: {
    title: z.string(),
    id: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    doc_type: z.string().optional(),
    images: z.any().optional(),
    image: z.string().nullable().optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    sidebar_label: z.string().optional(),
    hide_table_of_contents: z.boolean().optional(),
  },
  computedFields: {
    slug: z.string(),
    path: z.string(),
    filePath: z.string(),
    readingTime: readingTimeSchema,
    toc: z.array(tocItemSchema),
    docTags: z.array(z.string()),
    structuredData: z.any(),
  },
  computedFieldsFn: (doc, helpers) => {
    const DEFAULT_DOC_TAGS = ['SigNoz Cloud', 'Self-Host']
    const docTags =
      doc.tags && doc.tags.length > 0
        ? doc.tags.filter((t): t is string => typeof t === 'string' && t.trim() !== '')
        : DEFAULT_DOC_TAGS

    // Normalize slug: strip leading/trailing slashes from frontmatter slugs
    const rawSlug = doc.slug || doc._file.path.replace(/\.mdx$/, '')
    const slug = rawSlug.replace(/^\/+|\/+$/g, '')
    return {
      slug,
      path: `docs/${slug}`,
      filePath: doc._file.path,
      readingTime: helpers.readingTime(doc.body.raw),
      toc: helpers.extractToc(doc.body.raw),
      docTags,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: doc.title,
        description: doc.description,
        image: getImageUrl(doc),
        url: `${siteMetadata.siteUrl}/docs/${slug}`,
      },
    }
  },
})

export const Guide = defineCollection({
  name: 'Guide',
  directory: 'data/guides',
  include: '**/*.mdx',
  fields: {
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    images: z.any().optional(),
    image: z.string().nullable().optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  },
  computedFields: {
    slug: z.string(),
    path: z.string(),
    filePath: z.string(),
    readingTime: readingTimeSchema,
    toc: z.array(tocItemSchema),
    relatedArticles: z.array(relatedArticleSchema),
    structuredData: z.any(),
  },
  computedFieldsFn: (doc, helpers) => {
    const slug = doc.slug || doc._file.path.replace(/\.mdx$/, '')
    return {
      slug,
      path: `guides/${slug}`,
      filePath: doc._file.path,
      readingTime: helpers.readingTime(doc.body.raw),
      toc: helpers.extractToc(doc.body.raw),
      relatedArticles: getRelatedArticles(
        slug,
        guidesRelatedArticles as RelatedArticle[],
        'guides'
      ),
      structuredData: buildArticleStructuredData({ ...doc, slug }, 'guides'),
    }
  },
})

export const Comparisons = defineCollection({
  name: 'Comparisons',
  directory: 'data/comparisons',
  include: '**/*.mdx',
  fields: {
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    images: z.any().optional(),
    image: z.string().nullable().optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    canonicalUrl: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  },
  computedFields: {
    slug: z.string(),
    path: z.string(),
    filePath: z.string(),
    readingTime: readingTimeSchema,
    toc: z.array(tocItemSchema),
    relatedArticles: z.array(relatedArticleSchema),
    structuredData: z.any(),
  },
  computedFieldsFn: (doc, helpers) => {
    const slug = doc.slug || doc._file.path.replace(/\.mdx$/, '')
    return {
      slug,
      path: `comparisons/${slug}`,
      filePath: doc._file.path,
      readingTime: helpers.readingTime(doc.body.raw),
      toc: helpers.extractToc(doc.body.raw),
      relatedArticles: getRelatedArticles(
        slug,
        comparisonsRelatedArticles as RelatedArticle[],
        'comparisons'
      ),
      structuredData: buildArticleStructuredData({ ...doc, slug }, 'comparisons'),
    }
  },
})

export const OpenTelemetry = defineCollection({
  name: 'OpenTelemetry',
  directory: 'data/opentelemetry',
  include: '**/*.mdx',
  fields: {
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    images: z.any().optional(),
    image: z.string().nullable().optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    canonicalUrl: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  },
  computedFields: {
    slug: z.string(),
    path: z.string(),
    filePath: z.string(),
    readingTime: readingTimeSchema,
    toc: z.array(tocItemSchema),
    structuredData: z.any(),
  },
  computedFieldsFn: (doc, helpers) => {
    const slug = doc.slug || doc._file.path.replace(/\.mdx$/, '')
    return {
      slug,
      path: `opentelemetry/${slug}`,
      filePath: doc._file.path,
      readingTime: helpers.readingTime(doc.body.raw),
      toc: helpers.extractToc(doc.body.raw),
      structuredData: buildArticleStructuredData({ ...doc, slug }, 'opentelemetry'),
    }
  },
})

export const Newsroom = defineCollection({
  name: 'Newsroom',
  directory: 'data/newsroom',
  include: '**/*.mdx',
  fields: {
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    images: z.any().optional(),
    image: z.string().nullable().optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    slug: z.string().optional(),
    hide_table_of_contents: z.boolean().optional(),
    toc_min_heading_level: z.number().optional(),
    toc_max_heading_level: z.number().optional(),
    cta_title: z.string().optional(),
    cta_text: z.string().optional(),
  },
  computedFields: {
    slug: z.string(),
    path: z.string(),
    filePath: z.string(),
    readingTime: readingTimeSchema,
    toc: z.array(tocItemSchema),
    structuredData: z.any(),
  },
  computedFieldsFn: (doc, helpers) => {
    const slug = doc.slug || doc._file.path.replace(/\.mdx$/, '')
    return {
      slug,
      path: `newsroom/${slug}`,
      filePath: doc._file.path,
      readingTime: helpers.readingTime(doc.body.raw),
      toc: helpers.extractToc(doc.body.raw),
      structuredData: buildArticleStructuredData({ ...doc, slug }, 'newsroom'),
    }
  },
})

export const collections: CollectionsMap = {
  Blog,
  Doc,
  Guide,
  Comparisons,
  OpenTelemetry,
  Newsroom,
}
