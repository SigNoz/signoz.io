'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import BlogPostCard from 'app/resource-center/Shared/BlogPostCard'

export interface PaginationProps {
  totalPages: number
  currentPage: number
  pageRoute: string
}
interface GridLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export function Pagination({ totalPages, currentPage, pageRoute }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex items-center justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/${pageRoute}`
                : `/${basePath}/${pageRoute}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span className="text-sm">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/${pageRoute}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function GridLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: GridLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <div className="container mx-auto p-0">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="my-8 flex flex-col">
          <div
            className={`w-full text-sm font-semibold uppercase leading-5 tracking-wide max-md:max-w-full`}
          >
            All posts
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => {
              return <BlogPostCard blog={post} />
            })}
          </div>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageRoute={pagination.pageRoute}
        />
      )}
    </div>
  )
}
