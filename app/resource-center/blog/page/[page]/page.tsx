import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import GridLayout from '@/layouts/GridLayout'
import { allBlogs } from 'contentlayer/generated'
import React from 'react'
import siteMetadata from '@/data/siteMetadata'

export async function generateMetadata({ params }: { params: { page: string } }) {
  return {
    title: `Blog - Page ${params.page}`,
    description: `${siteMetadata.description} | Blog - Page ${params.page} | SigNoz`,
    openGraph: {
      title: `Blog - Page ${params.page} | SigNoz`,
      description: `${siteMetadata.description} | Blog - Page ${params.page} | SigNoz`,
      url: `${siteMetadata.siteUrl}/resource-center/blog/page/${params.page}`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: `Blog - Page ${params.page}`,
      description: `${siteMetadata.description} | Blog - Page ${params.page} | SigNoz`,
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/resource-center/blog/page/${params.page}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

const POSTS_PER_PAGE = 10

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    pageRoute: 'blog',
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
