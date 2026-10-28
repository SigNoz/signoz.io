'use client'

import { Fragment, useState } from 'react'
import Link from '@/components/Link'
import BlogPostCard from '@/components/ResourceCenter/BlogPostCard'
import { Frown, ChevronLeft, ChevronRight } from 'lucide-react'
import { RegionProvider } from '@/components/Region/RegionContext'
import { getVisiblePageNumbers } from '@/utils/paginationPages'

export interface PaginationProps {
  totalPages: number
  currentPage: number
  pageRoute: string
}

interface PaginationInternalProps extends PaginationProps {
  totalPosts: number
}

interface GridLayoutProps {
  posts: any[]
  title: string
  emptyMessage: string
  initialDisplayPosts?: any[]
  pagination?: PaginationProps
  isDarkMode: boolean
}

const PAGE_NUMBER_STYLES =
  'pt-px pb-px px-2 h-6 w-6 justify-center items-center flex flex-col rounded-sm'

const PAGE_NUMBER_LINK_STYLES = `${PAGE_NUMBER_STYLES} transition-colors hover:bg-[var(--l3-background-hover)]`

export function Pagination({
  totalPages,
  currentPage,
  pageRoute,
  totalPosts,
}: PaginationInternalProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  const PAGE_SIZE = 12

  const startPost = (currentPage - 1) * PAGE_SIZE + 1
  const endPost = Math.min(currentPage * PAGE_SIZE, totalPosts)

  const pageHref = (page: number) => (page === 1 ? `/${pageRoute}` : `/${pageRoute}/page/${page}`)
  const visiblePages = getVisiblePageNumbers(currentPage, totalPages)

  return (
    <div className="flex items-center justify-between space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex w-full items-center justify-between">
        <span className="font-mono text-sm font-normal text-[var(--l1-foreground)]">
          {startPost} ⎯ {endPost}{' '}
          <span className="text-[var(--l2-foreground)]">of {totalPosts}</span>
        </span>
        <div className="flex items-center gap-2.5 font-mono">
          {prevPage ? (
            <Link
              href={pageHref(currentPage - 1)}
              rel="prev"
              className="text-[var(--l2-foreground)] hover:text-[var(--l1-foreground)]"
            >
              <ChevronLeft size={16} />
            </Link>
          ) : (
            <span className="cursor-auto disabled:opacity-50">
              <ChevronLeft size={16} />
            </span>
          )}

          {visiblePages.map((page, index) => (
            <Fragment key={page}>
              {index > 0 && page - visiblePages[index - 1] > 1 ? (
                <div className="h-px w-8 bg-[var(--l3-border)]"></div>
              ) : null}
              <Link
                href={page === currentPage ? `/${pageRoute}/page/${page}` : pageHref(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={
                  page === currentPage
                    ? `${PAGE_NUMBER_STYLES} bg-[var(--accent-primary)] text-black`
                    : PAGE_NUMBER_LINK_STYLES
                }
              >
                {page}
              </Link>
            </Fragment>
          ))}

          {nextPage ? (
            <Link
              href={pageHref(currentPage + 1)}
              rel="next"
              className="text-[var(--l2-foreground)] hover:text-[var(--l1-foreground)]"
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
  emptyMessage,
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
        <Frown size={16} /> {emptyMessage}
      </div>
    )
  }

  const totalPosts = posts.length

  return (
    <RegionProvider>
      <div className="mx-auto max-w-8xl p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="my-8 flex flex-col">
            <div
              className={`w-full text-sm font-semibold uppercase leading-5 tracking-wide text-[var(--l2-foreground)] max-md:max-w-full`}
            >
              {title}
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
            totalPosts={totalPosts}
          />
        )}
      </div>
    </RegionProvider>
  )
}
