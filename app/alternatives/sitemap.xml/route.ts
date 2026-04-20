import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCMSContent } from '@/utils/cmsContent'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { entriesToXml, SitemapEntry } from '@/utils/sitemapXml'

export const dynamic = 'force-static'
export const revalidate = CMS_REVALIDATE_INTERVAL

export async function GET() {
  const siteUrl = siteMetadata.siteUrl
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  const { comparisons } = await fetchAllCMSContent(deploymentStatus)

  const staticRoutes: SitemapEntry[] = [
    'comparisons',
    'datadog-alternative',
    'grafana-alternative',
    'newrelic-alternative',
  ].map((route) => ({
    url: `${siteUrl}/${route}/`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
  }))

  let comparisonRoutes: SitemapEntry[] = []
  if (comparisons) {
    comparisonRoutes = comparisons.data.map((comparison) => ({
      url: `${siteUrl}/comparisons${comparison.path}/`,
      lastModified: comparison.date || comparison.updatedAt || comparison.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.5,
    }))
  }

  return new NextResponse(entriesToXml([...staticRoutes, ...comparisonRoutes]), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
