import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata.js'
import { generateRss } from '../../scripts/rssFeed.mjs'
import { loadPublishedPosts } from './rssUtils'

export const runtime = 'nodejs'
export const revalidate = 60

const CACHE_CONTROL_HEADER = 's-maxage=60, stale-while-revalidate=30'

export async function GET() {
  const publishedPosts = await loadPublishedPosts()

  if (!publishedPosts.length) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const rssXml = generateRss(siteMetadata, publishedPosts, {
    channelPath: 'blog',
    feedPath: 'rss',
  })

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  })
}
