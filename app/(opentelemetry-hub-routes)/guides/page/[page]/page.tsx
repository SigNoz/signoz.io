import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import GridLayout from '@/layouts/GridLayout'
import { allGuides } from 'contentlayer/generated'
import React from 'react'
import siteMetadata from '@/data/siteMetadata'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return {
    title: `Guides - Page ${params.page}`,
    description: `${siteMetadata.description} | Guides - Page ${params.page} | SigNoz`,
    openGraph: {
      title: `Guides - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Guides - Page ${params.page} | SigNoz`,
      url: `${siteMetadata.siteUrl}/guides/page/${params.page}`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: `Guides - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Guides - Page ${params.page} | SigNoz`,
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/guides/page/${params.page}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

const POSTS_PER_PAGE = 12

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allGuides.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allGuides))
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    pageRoute: 'guides',
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
