import { allBlogs, allGuides } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'
import type { MDXContent } from '@/utils/strapi'
import hubConfig from '@/constants/opentelemetry_hub.json'

type ResourceCenterCardSource = {
  slug?: string | null
  path: string
  date?: string | null
  publishedAt?: string | null
  title: string
  description?: string | null
  summary?: string | null
  tags?: string[] | null
  authors?: unknown[] | null
  readingTime?: {
    text?: string | null
  } | null
}

/**
 * NEVER INCLUDE BODY, THIS WILL CAUSE MANY BUNDLE ISSUES
 */
export type ResourceCenterCard = {
  slug: string
  path: string
  date: string
  title: string
  description?: string
  summary?: string
  tags?: string[]
  authors?: unknown[]
  readingTime: {
    text: string
  }
}

export type ResourceCenterBlog = ResourceCenterCard
export type ResourceCenterGuide = ResourceCenterCard
export type ResourceCenterComparison = ResourceCenterCard
export type ResourceCenterOpenTelemetryArticle = ResourceCenterCard

export function pickResourceCenterCardFields(source: ResourceCenterCardSource): ResourceCenterCard {
  /**
   * NEVER INCLUDE BODY, THIS WILL CAUSE MANY BUNDLE ISSUES
   */
  return {
    slug: source.slug ?? source.path.split('/').filter(Boolean).pop() ?? '',
    path: source.path,
    date: source.date ?? source.publishedAt ?? '',
    title: source.title,
    description: source.description ?? undefined,
    summary: source.summary ?? undefined,
    tags: source.tags ?? undefined,
    authors: source.authors ?? undefined,
    readingTime: {
      text: source.readingTime?.text ?? '5 min read',
    },
  }
}

export function pickOpenTelemetryArticleFields(
  article: MDXContent
): ResourceCenterOpenTelemetryArticle {
  let path = article.path || ''
  if (path.startsWith('/')) {
    path = path.slice(1)
  }
  if (!path.startsWith('opentelemetry/')) {
    path = `opentelemetry/${path}`
  }

  return pickResourceCenterCardFields({
    slug: article.slug,
    path,
    publishedAt: article.publishedAt,
    title: article.title,
    description: article.description,
    summary: article.summary || article.description,
    authors:
      article.authors?.map((author: any) => ({
        ...author,
        name: author.name,
        image_url: author.image_url || author.avatar,
      })) || [],
    readingTime: { text: article.readingTime?.text || '5 min read' },
  })
}

export function getResourceCenterBlogs(): ResourceCenterBlog[] {
  return sortPosts(allBlogs).map(pickResourceCenterCardFields)
}

export function getResourceCenterGuides(): ResourceCenterGuide[] {
  return sortPosts(allGuides).map(pickResourceCenterCardFields)
}

type HubConfigNode = {
  url?: string
  articles?: HubConfigNode[]
  sections?: HubConfigNode[]
  chapters?: HubConfigNode[]
  key?: string
  [key: string]: any
}

function extractArticleUrls(node: HubConfigNode | HubConfigNode[]): string[] {
  const urls: string[] = []
  if (Array.isArray(node)) {
    node.forEach((item) => urls.push(...extractArticleUrls(item)))
  } else if (node && typeof node === 'object') {
    if (typeof node.url === 'string') urls.push(node.url)
    if (Array.isArray(node.articles)) urls.push(...extractArticleUrls(node.articles))
    if (Array.isArray(node.sections)) urls.push(...extractArticleUrls(node.sections))
    if (Array.isArray(node.chapters)) urls.push(...extractArticleUrls(node.chapters))
  }
  return urls
}

function normalizeUrlToPath(url: string): string {
  const withoutDomain = url.replace(/^https?:\/\/[^/]+/i, '')
  let path = withoutDomain.startsWith('/') ? withoutDomain.slice(1) : withoutDomain
  if (path.endsWith('/')) path = path.slice(0, -1)
  return path
}

/**
 * Returns contentlayer-based articles (blogs + guides) that are referenced
 * in the OpenTelemetry hub config (learn chapters excl. comparisons + quick-start).
 */
export function getOpenTelemetryHubContentLayerArticles(): ResourceCenterCard[] {
  const paths = (hubConfig as any).paths || []
  const learnPath = paths.find((p: any) => p.key === 'learn')
  const quickStartPath = paths.find((p: any) => p.key === 'quick-start')

  const hubPaths = new Set<string>()

  // Learn chapters (excluding comparisons chapter)
  if (learnPath?.chapters) {
    for (const chapter of learnPath.chapters) {
      if (chapter.key === 'comparisons') continue
      extractArticleUrls(chapter).forEach((url) => hubPaths.add(normalizeUrlToPath(url)))
    }
  }

  // Quick-start articles
  if (quickStartPath) {
    extractArticleUrls(quickStartPath).forEach((url) => hubPaths.add(normalizeUrlToPath(url)))
  }

  // Match against contentlayer blogs + guides
  const allDocs = [...allBlogs, ...allGuides]
  const matched = new Map<string, ResourceCenterCard>()

  for (const doc of allDocs) {
    const docPath = (doc.path || '').replace(/^\/+/, '').replace(/\/+$/, '')
    if (hubPaths.has(docPath) && !matched.has(docPath)) {
      matched.set(docPath, pickResourceCenterCardFields(doc))
    }
  }

  return Array.from(matched.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
