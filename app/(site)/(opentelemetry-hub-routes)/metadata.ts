import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { POSTS_PER_PAGE } from './constants'

export function buildListingMetadata(
  section: string,
  page?: string,
  slug = section.toLowerCase()
): Metadata {
  const title = page ? `${section} - Page ${page}` : section
  const fullTitle = `${title} | SigNoz`
  const description = `${siteMetadata.description} | ${title} | SigNoz`
  const url = page
    ? `${siteMetadata.siteUrl}/${slug}/page/${page}`
    : `${siteMetadata.siteUrl}/${slug}`

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: fullTitle,
      description,
      images: [siteMetadata.socialBanner],
      ...(page ? {} : { site: (siteMetadata as any).twitter }),
    },
    ...(page
      ? {
          alternates: { canonical: url },
          robots: { index: false, follow: true },
        }
      : {
          robots: { index: true, follow: true },
        }),
  }
}

export function buildStaticPaginationParams(totalItems: number) {
  const totalPages = Math.ceil(totalItems / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}
