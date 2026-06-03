import { sortPosts } from 'pliny/utils/contentlayer'
import type { MDXContent } from '@/utils/strapi'
import hubConfig from '@/constants/opentelemetry_hub.json'
import {
  fetchAllGuidesForPage,
  fetchAllBlogsForPage,
  fetchAllComparisonsForPage,
} from '@/utils/cachedData'
import { getAuthorDirectory, type AuthorDirectory } from '@/utils/contentRepository'
import { getAuthorKey } from '@/utils/contentHelpers'

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
  authorObjects?: { key?: string; name?: string; image_url?: string }[] | null
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

type ResourceCenterAuthor = {
  key?: string
  name?: string
  image_url?: string
  avatar?: string
}

export type ResourceCenterBlog = ResourceCenterCard
export type ResourceCenterGuide = ResourceCenterCard
export type ResourceCenterComparison = ResourceCenterCard
export type ResourceCenterOpenTelemetryArticle = ResourceCenterCard

function resolveResourceCenterAuthors(
  source: ResourceCenterCardSource,
  authorDirectory?: AuthorDirectory
) {
  const authors = source.authorObjects?.length ? source.authorObjects : source.authors
  if (!authors?.length) return undefined

  return authors
    .map((author) => {
      const authorKey = getAuthorKey(author)
      if (!authorKey) return null

      const cmsAuthor = authorDirectory?.[authorKey]
      if (cmsAuthor) return cmsAuthor

      if (typeof author === 'string') return { key: author, name: author }

      const authorObject = author as ResourceCenterAuthor
      return {
        key: authorObject.key || authorKey,
        name: authorObject.name || authorKey,
        image_url: authorObject.image_url || authorObject.avatar,
      }
    })
    .filter(Boolean)
}

export function pickResourceCenterCardFields(
  source: ResourceCenterCardSource,
  authorDirectory?: AuthorDirectory
): ResourceCenterCard {
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
    authors: resolveResourceCenterAuthors(source, authorDirectory),
    readingTime: {
      text: source.readingTime?.text ?? '5 min read',
    },
  }
}

export function pickOpenTelemetryArticleFields(
  article: MDXContent,
  authorDirectory?: AuthorDirectory
): ResourceCenterOpenTelemetryArticle {
  let path = article.path || ''
  if (path.startsWith('/')) {
    path = path.slice(1)
  }
  if (!path.startsWith('opentelemetry/')) {
    path = `opentelemetry/${path}`
  }

  return pickResourceCenterCardFields(
    {
      slug: article.slug,
      path,
      publishedAt: article.publishedAt,
      title: article.title,
      description: article.description,
      summary: article.summary || article.description,
      authors: article.authors || [],
      readingTime: { text: article.readingTime?.text || '5 min read' },
    },
    authorDirectory
  )
}

export async function getResourceCenterBlogs(): Promise<ResourceCenterBlog[]> {
  const [blogs, authorDirectory] = await Promise.all([fetchAllBlogsForPage(), getAuthorDirectory()])
  return sortPosts(blogs).map((blog) => pickResourceCenterCardFields(blog, authorDirectory))
}

export async function getResourceCenterGuides(): Promise<ResourceCenterGuide[]> {
  const [guides, authorDirectory] = await Promise.all([
    fetchAllGuidesForPage(),
    getAuthorDirectory(),
  ])
  return sortPosts(guides).map((guide) => pickResourceCenterCardFields(guide, authorDirectory))
}

export async function getResourceCenterComparisons(): Promise<ResourceCenterComparison[]> {
  const [comparisons, authorDirectory] = await Promise.all([
    fetchAllComparisonsForPage(),
    getAuthorDirectory(),
  ])
  return sortPosts(comparisons).map((comparison) =>
    pickResourceCenterCardFields(comparison, authorDirectory)
  )
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
 * Returns articles (blogs from CMS + guides from CMS) that are referenced
 * in the OpenTelemetry hub config (learn chapters excl. comparisons + quick-start).
 */
export async function getOpenTelemetryHubContentLayerArticles(): Promise<ResourceCenterCard[]> {
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

  // Fetch repository-backed blogs and guides
  let cmsBlogs: ResourceCenterCard[] = []
  let cmsGuides: ResourceCenterCard[] = []
  try {
    ;[cmsBlogs, cmsGuides] = await Promise.all([
      getResourceCenterBlogs(),
      getResourceCenterGuides(),
    ])
  } catch (error) {
    console.error('Error fetching CMS content for hub articles:', error)
  }

  const allDocs = [...cmsBlogs, ...cmsGuides]
  const matched = new Map<string, ResourceCenterCard>()

  for (const doc of allDocs) {
    const docPath = (doc.path || '').replace(/^\/+/, '').replace(/\/+$/, '')
    if (hubPaths.has(docPath) && !matched.has(docPath)) {
      matched.set(docPath, doc)
    }
  }

  return Array.from(matched.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
