import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata.js'
import { generateRss } from '../../../scripts/rssFeed.mjs'
import { loadPublishedPosts } from './rssUtils'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const runtime = 'nodejs'
// 1 day — see CMS_REVALIDATE_INTERVAL
export const revalidate = 86400

const CACHE_CONTROL_HEADER = `s-maxage=${CMS_REVALIDATE_INTERVAL}, stale-while-revalidate=30`

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
