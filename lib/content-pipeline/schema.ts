import { defineCollection, CollectionsMap, FieldsShape } from './define'
import siteMetadata from '../../data/siteMetadata'
import blogRelatedArticles from '../../constants/blogRelatedArticles.json'
import comparisonsRelatedArticles from '../../constants/comparisonsRelatedArticles.json'
import guidesRelatedArticles from '../../constants/guidesRelatedArticles.json'
import authorsData from '../../constants/authors.json'

type AuthorInfo = {
  name: string
  title?: string
  url?: string
  image_url?: string
}

const authorsMap = authorsData as Record<string, AuthorInfo>

function getImageUrl(doc: any): string {
  const raw = doc.image || siteMetadata.socialBanner
  return raw.startsWith('http') ? raw : `${siteMetadata.siteUrl}${raw}`
}

function getWordCount(rawContent: string): number {
  return rawContent.split(/\s+/g).filter(Boolean).length
}

function getAuthors(authorSlugs: string[] | undefined): object[] {
  if (!authorSlugs || !Array.isArray(authorSlugs) || authorSlugs.length === 0) {
    return [{ '@type': 'Organization', name: siteMetadata.title }]
  }

  return authorSlugs.map((slug) => {
    const author = authorsMap[slug]
    if (!author) {
      return { '@type': 'Person', name: slug }
    }
    return {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    }
  })
}

function buildArticleStructuredData(doc: any, urlPrefix: string): object {
  const postUrl = `${siteMetadata.siteUrl}/${urlPrefix}/${doc.slug}`
  const tags = Array.isArray(doc.tags) ? doc.tags : []
  const rawContent = doc.body?.raw || ''

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
    wordCount: getWordCount(rawContent),
    author: getAuthors(doc.authors),
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        width: 600,
        height: 60,
      },
      sameAs: [
        siteMetadata.linkedin,
        siteMetadata.x,
        siteMetadata.github,
        siteMetadata.youtube,
        siteMetadata.hackernews,
      ],
    },
    ...(tags.length > 0 ? { articleSection: tags } : { articleSection: ['SigNoz'] }),
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

// Shared computed field shapes
const readingTimeFields: FieldsShape = {
  minutes: 'number',
  words: 'number',
  text: 'string',
}

const tocItemFields: FieldsShape = {
  value: 'string',
  url: 'string',
  depth: 'number',
}

const relatedArticleFields: FieldsShape = {
  title: 'string',
  publishedOn: 'string',
  url: 'string',
}

export const Blog = defineCollection({
  name: 'Blog',
  directory: 'data/blog',
  include: '**/*.mdx',
  fields: {
    title: 'string',
    date: 'date',
    tags: { type: 'array', of: 'string', default: [] },
    lastmod: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    description: { type: 'string', required: false },
    images: { type: 'any', required: false },
    image: { type: 'string', nullable: true, required: false },
    authors: { type: 'array', of: 'string' },
    layout: { type: 'string', required: false },
    bibliography: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
    keywords: { type: 'array', of: 'string', required: false },
    slug: { type: 'string', required: false },
    excludeFromSitemap: { type: 'boolean', required: false },
    hide_table_of_contents: { type: 'boolean', required: false },
    toc_min_heading_level: { type: 'number', required: false },
    toc_max_heading_level: { type: 'number', required: false },
    cta_title: { type: 'string', required: false },
    cta_text: { type: 'string', required: false },
    is_newsroom: { type: 'boolean', required: false },
  },
  computedFields: {
    slug: 'string',
    path: 'string',
    filePath: 'string',
    readingTime: { type: 'object', shape: readingTimeFields },
    toc: { type: 'array', of: { type: 'object', shape: tocItemFields } },
    relatedArticles: { type: 'array', of: { type: 'object', shape: relatedArticleFields } },
    structuredData: 'any',
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
    title: 'string',
    id: 'string',
    slug: { type: 'string', required: false },
    date: { type: 'date', required: false },
    tags: { type: 'array', of: 'string', required: false },
    lastmod: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    description: { type: 'string', required: false },
    doc_type: { type: 'string', required: false },
    images: { type: 'any', required: false },
    image: { type: 'string', nullable: true, required: false },
    authors: { type: 'array', of: 'string', required: false },
    layout: { type: 'string', required: false },
    bibliography: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
    sidebar_label: { type: 'string', required: false },
    hide_table_of_contents: { type: 'boolean', required: false },
  },
  computedFields: {
    slug: 'string',
    path: 'string',
    filePath: 'string',
    readingTime: { type: 'object', shape: readingTimeFields },
    toc: { type: 'array', of: { type: 'object', shape: tocItemFields } },
    docTags: { type: 'array', of: 'string' },
    structuredData: 'any',
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
    title: 'string',
    date: 'date',
    tags: { type: 'array', of: 'string', default: [] },
    lastmod: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    description: { type: 'string', required: false },
    slug: { type: 'string', required: false },
    images: { type: 'any', required: false },
    image: { type: 'string', nullable: true, required: false },
    authors: { type: 'array', of: 'string', required: false },
    layout: { type: 'string', required: false },
    bibliography: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
    keywords: { type: 'array', of: 'string', required: false },
  },
  computedFields: {
    slug: 'string',
    path: 'string',
    filePath: 'string',
    readingTime: { type: 'object', shape: readingTimeFields },
    toc: { type: 'array', of: { type: 'object', shape: tocItemFields } },
    relatedArticles: { type: 'array', of: { type: 'object', shape: relatedArticleFields } },
    structuredData: 'any',
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
    title: 'string',
    date: 'date',
    tags: { type: 'array', of: 'string', default: [] },
    lastmod: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    description: { type: 'string', required: false },
    slug: { type: 'string', required: false },
    images: { type: 'any', required: false },
    image: { type: 'string', nullable: true, required: false },
    authors: { type: 'array', of: 'string', required: false },
    layout: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
    keywords: { type: 'array', of: 'string', required: false },
  },
  computedFields: {
    slug: 'string',
    path: 'string',
    filePath: 'string',
    readingTime: { type: 'object', shape: readingTimeFields },
    toc: { type: 'array', of: { type: 'object', shape: tocItemFields } },
    relatedArticles: { type: 'array', of: { type: 'object', shape: relatedArticleFields } },
    structuredData: 'any',
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
    title: 'string',
    date: 'date',
    tags: { type: 'array', of: 'string', default: [] },
    lastmod: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    description: { type: 'string', required: false },
    slug: { type: 'string', required: false },
    images: { type: 'any', required: false },
    image: { type: 'string', nullable: true, required: false },
    authors: { type: 'array', of: 'string', required: false },
    layout: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
    keywords: { type: 'array', of: 'string', required: false },
  },
  computedFields: {
    slug: 'string',
    path: 'string',
    filePath: 'string',
    readingTime: { type: 'object', shape: readingTimeFields },
    toc: { type: 'array', of: { type: 'object', shape: tocItemFields } },
    structuredData: 'any',
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
    title: 'string',
    date: 'date',
    tags: { type: 'array', of: 'string', default: [] },
    lastmod: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    description: { type: 'string', required: false },
    images: { type: 'any', required: false },
    image: { type: 'string', nullable: true, required: false },
    authors: { type: 'array', of: 'string', required: false },
    layout: { type: 'string', required: false },
    bibliography: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
    keywords: { type: 'array', of: 'string', required: false },
    slug: { type: 'string', required: false },
    hide_table_of_contents: { type: 'boolean', required: false },
    toc_min_heading_level: { type: 'number', required: false },
    toc_max_heading_level: { type: 'number', required: false },
    cta_title: { type: 'string', required: false },
    cta_text: { type: 'string', required: false },
  },
  computedFields: {
    slug: 'string',
    path: 'string',
    filePath: 'string',
    readingTime: { type: 'object', shape: readingTimeFields },
    toc: { type: 'array', of: { type: 'object', shape: tocItemFields } },
    structuredData: 'any',
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
