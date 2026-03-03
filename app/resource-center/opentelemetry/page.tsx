import OpenTelemetryClient from './OpenTelemetryClient'
import { Metadata } from 'next'
import { fetchMDXContentByPath, MDXContent } from '@/utils/strapi'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { type Comparison } from 'types/transformedContent'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'OpenTelemetry Learning Track | SigNoz',
  description:
    'Learn about OpenTelemetry - the open-source observability framework for cloud-native software. Guides, blogs, and resources to help you implement OpenTelemetry.',
  alternates: {
    canonical: 'https://signoz.io/resource-center/opentelemetry',
  },
  openGraph: {
    title: 'OpenTelemetry Learning Track | SigNoz',
    description:
      'Learn about OpenTelemetry - the open-source observability framework for cloud-native software. Guides, blogs, and resources to help you implement OpenTelemetry.',
    url: './resource-center/opentelemetry',
    siteName: 'SigNoz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'OpenTelemetry Learning Track | SigNoz',
    card: 'summary_large_image',
    description:
      'Learn about OpenTelemetry - the open-source observability framework for cloud-native software. Guides, blogs, and resources to help you implement OpenTelemetry.',
  },
}

export default async function OpenTelemetryHome() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deployment_status = isProduction ? 'live' : 'staging'
  let articles: MDXContent[] = []
  let comparisonPosts: Comparison[] = []

  try {
    const [articlesResponse, comparisonsResult] = await Promise.all([
      fetchMDXContentByPath('opentelemetries', undefined, deployment_status, true),
      fetchAllComparisonsForPage(),
    ])

    comparisonPosts = allCoreContent(sortPosts(comparisonsResult)) as Comparison[]
    articles = (articlesResponse.data || []) as MDXContent[]
  } catch (error) {
    console.error('Error fetching OpenTelemetry articles:', error)
  }

  return <OpenTelemetryClient initialArticles={articles} comparisonPosts={comparisonPosts} />
}
