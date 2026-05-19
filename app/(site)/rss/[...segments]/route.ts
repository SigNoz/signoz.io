import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata.js'
import { slug } from 'github-slugger'
import { filterPostsByTag, generateRss } from '../../../../scripts/rssFeed.mjs'
import { loadPublishedPosts } from '../rssUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const runtime = 'nodejs'
// 1 day — see CMS_REVALIDATE_INTERVAL
export const revalidate = 86400

const CACHE_CONTROL_HEADER = `s-maxage=${CMS_REVALIDATE_INTERVAL}, stale-while-revalidate=30`

const notFoundResponse = () =>
  new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Cache-Control': 'no-store',
    },
  })

export async function GET(request: Request, props: { params: Promise<{ segments?: string[] }> }) {
  const params = await props.params
  const segments = params.segments ?? []

  if (!Array.isArray(segments) || segments.length !== 2 || segments[0] !== 'tags') {
    return notFoundResponse()
  }

  const tagSlug = segments[1]

  if (!tagSlug) {
    return notFoundResponse()
  }

  const publishedPosts = await loadPublishedPosts()

  // Validate tag exists dynamically from CMS data
  const validTags = new Set<string>()
  publishedPosts.forEach((post: any) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        if (tag) validTags.add(slug(tag))
      })
    }
  })

  if (!validTags.has(tagSlug)) {
    return notFoundResponse()
  }

  const filteredPosts = filterPostsByTag(publishedPosts, tagSlug)

  if (!filteredPosts.length) {
    return notFoundResponse()
  }

  const rssXml = generateRss(siteMetadata, filteredPosts, {
    channelPath: `tags/${tagSlug}`,
    feedPath: `rss/tags/${tagSlug}`,
    title: `${siteMetadata.title} - ${tagSlug}`,
  })

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  })
}
