import { MetadataRoute } from 'next'
import { allBlogs, allComparisons, allOpentelemetries, allDocs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

// Mapping function to ensure changeFrequency is correctly typed
const mapChangeFrequency = (
  frequency: string
): 'weekly' | 'always' | 'hourly' | 'daily' | 'monthly' | 'yearly' | 'never' => {
  switch (frequency) {
    case 'weekly':
    case 'always':
    case 'hourly':
    case 'daily':
    case 'monthly':
    case 'yearly':
    case 'never':
      return frequency
    default:
      return 'weekly'
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  const docRoutes = allDocs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  const comparisonRoutes = allComparisons
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  const opentelemetryRoutes = allOpentelemetries
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: mapChangeFrequency('weekly'),
      priority: 0.5,
    }))

  const routes = [
    '',
    'blog',
    'tags',
    'newsroom',
    'pricing',
    'case-study',
    'about-us',
    'terms-of-service',
    'privacy',
    'security',
    'support',
    'teams',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: mapChangeFrequency('weekly'),
  }))

  return [...routes, ...blogRoutes, ...comparisonRoutes, ...opentelemetryRoutes, ...docRoutes]
}
