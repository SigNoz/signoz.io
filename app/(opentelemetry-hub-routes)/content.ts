import { allBlogs, allGuides } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'
import type { MDXContent } from '@/utils/strapi'

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
