'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import React from 'react'
import BlogPostCard from 'app/resource-center/Shared/BlogPostCard'
import { Frown, HeartCrack, ChevronLeft, ChevronRight } from 'lucide-react'
import { RegionProvider } from '@/components/Region/RegionContext'

export interface PaginationProps {
  totalPages: number
  currentPage: number
  pageRoute: string
}

interface PaginationInternalProps extends PaginationProps {
  postsPerPage: number
  totalPosts: number
}

interface GridLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  isDarkMode: boolean
}

const PAGE_NUMBER_STYLES =
  'pt-px pb-px px-2 h-6 w-6 justify-center items-center flex flex-col rounded-sm'

export function Pagination({
  totalPages,
  currentPage,
  pageRoute,
  postsPerPage,
  totalPosts,
}: PaginationInternalProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  const DEFAULT_POSTS_PER_PAGE = 10
  const DEFAULT_POSTS_IN_FIRST_PAGE = 9

  const startPost = useMemo(() => {
    if (currentPage === 1) {
      return 1
    }

    return Math.max(DEFAULT_POSTS_IN_FIRST_PAGE + 1 + (currentPage - 2) * DEFAULT_POSTS_PER_PAGE, 0)
  }, [currentPage])

  const endPost = useMemo(() => {
    if (currentPage === 1) {
      return 9
    }

    if (currentPage === totalPages) {
      return totalPosts
    }

    return Math.max(DEFAULT_POSTS_IN_FIRST_PAGE + (currentPage - 1) * DEFAULT_POSTS_PER_PAGE, 0)
  }, [currentPage, totalPages])

  const shouldRenderTwoPrevPages = currentPage === totalPages
  const shouldRenderPrevPage = currentPage - 1 > 1
  const shouldRenderNextPage = currentPage + 1 < totalPages
  const shouldRenderTwoNextPages = currentPage === 1

  return (
    <div className="flex items-center justify-between space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex w-full items-center justify-between">
        <span className="font-mono text-sm font-normal text-signoz_vanilla-100">
          {startPost} ⎯ {endPost} <span className="text-signoz_vanilla-400">of {totalPosts}</span>
        </span>
        <div className="flex items-center gap-2.5 font-mono">
          {prevPage ? (
            <Link
              href={
                currentPage - 1 === 1
                  ? `/${basePath}/${pageRoute}`
                  : `/${basePath}/${pageRoute}/page/${currentPage - 1}`
              }
              rel="prev"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ChevronLeft size={16} />
            </Link>
          ) : (
            <span className="cursor-auto disabled:opacity-50">
              <ChevronLeft size={16} />
            </span>
          )}

          {currentPage !== 1 ? (
            <Link className={PAGE_NUMBER_STYLES} href={`/${basePath}/${pageRoute}`}>
              1
            </Link>
          ) : null}
          {currentPage - 2 > 1 ? <div className="h-px w-8 bg-signoz_vanilla-400"></div> : null}

          {shouldRenderTwoPrevPages ? (
            <Link
              className={PAGE_NUMBER_STYLES}
              href={`/${basePath}/${pageRoute}/page/${currentPage - 2}`}
            >
              {currentPage - 2}
            </Link>
          ) : null}

          {shouldRenderPrevPage ? (
            <Link
              className={PAGE_NUMBER_STYLES}
              href={`/${basePath}/${pageRoute}/page/${currentPage - 1}`}
            >
              {currentPage - 1}
            </Link>
          ) : null}

          <Link
            href={`/${basePath}/${pageRoute}/page/${currentPage}`}
            className={`${PAGE_NUMBER_STYLES} bg-signoz_robin-500 text-black`}
          >
            {currentPage}
          </Link>

          {shouldRenderNextPage ? (
            <Link
              className={PAGE_NUMBER_STYLES}
              href={`/${basePath}/${pageRoute}/page/${currentPage + 1}`}
            >
              {currentPage + 1}
            </Link>
          ) : null}

          {shouldRenderTwoNextPages ? (
            <Link
              className={PAGE_NUMBER_STYLES}
              href={`/${basePath}/${pageRoute}/page/${currentPage + 2}`}
            >
              {currentPage + 2}
            </Link>
          ) : null}

          {totalPages - 2 > currentPage ? (
            <div className="h-px w-8 bg-signoz_vanilla-400"></div>
          ) : null}
          {currentPage !== totalPages ? (
            <Link
              className={PAGE_NUMBER_STYLES}
              href={`/${basePath}/${pageRoute}/page/${totalPages}`}
            >
              {totalPages}
            </Link>
          ) : null}

          {nextPage ? (
            <Link
              href={`/${basePath}/${pageRoute}/page/${currentPage + 1}`}
              rel="next"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ChevronRight size={16} />
            </Link>
          ) : (
            <span className="cursor-auto disabled:opacity-50">
              <ChevronRight size={16} />
            </span>
          )}
        </div>
      </nav>
    </div>
  )
}

export default function GridLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  isDarkMode,
}: GridLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  if (posts && Array.isArray(posts) && posts.length <= 0) {
    return (
      <div className="no-blogs my-8 flex items-center gap-4 font-mono font-bold">
        <Frown size={16} /> No Blogs found
      </div>
    )
  }

  const totalPosts = posts.length
  const postsPerPage = displayPosts.length

  return (
    <RegionProvider>
      <div className="container mx-auto p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="my-8 flex flex-col">
            <div
              className={`w-full text-sm font-semibold uppercase leading-5 tracking-wide max-md:max-w-full ${isDarkMode ? 'text-signoz_slate-100' : 'text-signoz_slate-300'}`}
            >
              All posts
            </div>

            <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post, index) => {
                return <BlogPostCard key={index} blog={post} />
              })}
            </div>
          </div>
        </div>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageRoute={pagination.pageRoute}
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
          />
        )}
      </div>
    </RegionProvider>
  )
}
