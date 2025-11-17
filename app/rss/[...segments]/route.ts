import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata.js'
import tagData from 'app/tag-data.json'
import { filterPostsByTag, generateRss } from '../../../scripts/rssFeed.mjs'
import { loadPublishedPosts } from '../rssUtils'

export const runtime = 'nodejs'
export const revalidate = 60

const CACHE_CONTROL_HEADER = 's-maxage=60, stale-while-revalidate=30'

const notFoundResponse = () =>
  new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Cache-Control': 'no-store',
    },
  })

export async function GET(request: Request, { params }: { params: { segments?: string[] } }) {
  const segments = params.segments ?? []

  if (!Array.isArray(segments) || segments.length !== 2 || segments[0] !== 'tags') {
    return notFoundResponse()
  }

  const tagSlug = segments[1]

  if (!tagSlug || !Object.prototype.hasOwnProperty.call(tagData, tagSlug)) {
    return notFoundResponse()
  }

  const publishedPosts = await loadPublishedPosts()
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
