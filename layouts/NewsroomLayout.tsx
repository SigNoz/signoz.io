import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from '../types/transformedContent'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import React from 'react'
import { RegionProvider } from '@/components/Region/RegionContext'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function NewsroomLayout({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title } = content

  return (
    <RegionProvider>
      <SectionContainer>
        <ScrollTopAndComment />
        <article>
          <div className="newsroom-content">
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              </div>
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${prev.path}`}
                        className="text-primary hover:text-robin-600 dark:hover:text-accent-primary"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${next.path}`}
                        className="text-primary hover:text-robin-600 dark:hover:text-accent-primary"
                        aria-label={`Next post: ${next.title}`}
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </RegionProvider>
  )
}
