'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Doc, Guide } from '../types/transformedContent'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Button from '@/components/ui/Button'
import siteMetadata from '@/data/siteMetadata'
import { RegionProvider } from '@/components/Region/RegionContext'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog | Doc | Guide>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog | Doc | Guide>[]
  pagination?: PaginationProps
  emptyMessage?: string
  tagCounts?: Record<string, number>
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  emptyMessage = 'No posts found.',
  tagCounts = {},
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <RegionProvider>
      <div className="container mx-auto">
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[320px] min-w-[320px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary font-bold uppercase">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="hover:text-primary dark:hover:text-primary font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  All Posts
                </Link>
              )}
              <ul className="pl-0">
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {pathname.split('/tags/')[1] === slug(t) ? (
                        <h3 className="text-primary inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="hover:text-primary dark:hover:text-primary px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="tag-posts">
            {displayPosts.length > 0 ? (
              <ul className="pl-0">
                {displayPosts.map((post) => {
                  const { path, date, title, summary, tags } = post

                  return (
                    <li key={path} className="py-5">
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                            {date && (
                              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                            )}
                          </dd>
                        </dl>
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-2xl leading-8 font-bold tracking-tight">
                              <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags?.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="mt-10 flex flex-col items-center justify-center space-y-6">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  No posts found
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">{emptyMessage}</div>
                <Link href="/blog">
                  <Button variant="legacyPrimary">Back to Blog</Button>
                </Link>
              </div>
            )}
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </RegionProvider>
  )
}
