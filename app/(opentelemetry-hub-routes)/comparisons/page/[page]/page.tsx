import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import GridLayout from '@/layouts/GridLayout'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import React from 'react'
import siteMetadata from '@/data/siteMetadata'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return {
    title: `Comparisons - Page ${params.page}`,
    description: `${siteMetadata.description} | Comparisons - Page ${params.page} | SigNoz`,
    openGraph: {
      title: `Comparisons - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Comparisons - Page ${params.page} | SigNoz`,
      url: `${siteMetadata.siteUrl}/comparisons/page/${params.page}`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: `Comparisons - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Comparisons - Page ${params.page} | SigNoz`,
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/comparisons/page/${params.page}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

const POSTS_PER_PAGE = 10

export default async function Page({ params }: { params: { page: string } }) {
  const comparisons = await fetchAllComparisonsForPage()
  const posts = allCoreContent(sortPosts(comparisons))
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    pageRoute: 'comparisons',
  }

  return (
    <GridLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
      isDarkMode={true}
    />
  )
}
