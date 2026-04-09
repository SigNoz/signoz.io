import OpenTelemetryClient from './OpenTelemetryClient'
import { Metadata } from 'next'
import { fetchMDXContentByPath, MDXContent } from '@/utils/strapi'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { sortPosts } from 'pliny/utils/contentlayer'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import {
  getResourceCenterBlogs,
  getResourceCenterGuides,
  pickOpenTelemetryArticleFields,
  pickResourceCenterCardFields,
  type ResourceCenterComparison,
  type ResourceCenterOpenTelemetryArticle,
} from '../content'

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

const blogPosts = getResourceCenterBlogs()
const guidePosts = getResourceCenterGuides()

export default async function OpenTelemetryHome() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deployment_status = isProduction ? 'live' : 'staging'
  let articles: ResourceCenterOpenTelemetryArticle[] = []
  let comparisonPosts: ResourceCenterComparison[] = []

  try {
    const [articlesResponse, comparisonsResult] = await Promise.all([
      fetchMDXContentByPath('opentelemetries', undefined, deployment_status, true),
      fetchAllComparisonsForPage(),
    ])

    comparisonPosts = sortPosts(comparisonsResult).map(pickResourceCenterCardFields)
    articles = ((articlesResponse.data || []) as MDXContent[]).map(pickOpenTelemetryArticleFields)
  } catch (error) {
    console.error('Error fetching OpenTelemetry articles:', error)
  }

  return (
    <OpenTelemetryClient
      initialArticles={articles}
      comparisonPosts={comparisonPosts}
      blogPosts={blogPosts}
      guidePosts={guidePosts}
    />
  )
}
