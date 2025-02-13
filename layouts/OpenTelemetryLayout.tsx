'use client'

import { ReactNode, useRef } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import PageFeedback from '@/components/PageFeedback/PageFeedback'

interface OpenTelemetryBannerProps {
  ctaTitle?: string
  ctaText?: string
}

const OpenTelemetryBanner = ({ 
  ctaTitle = "Set Up OpenTelemetry with NodeJS in 15 min With Our Guided Onboarding",
  ctaText = "Start your free 30 day trial"
}: OpenTelemetryBannerProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {ctaTitle}
            </h1>
          </div>
          <div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: tocItemProps[]
}

export default function OpenTelemetryLayout({ content, authors, children, toc }: LayoutProps) {
  const { slug, date, title, tags, readingTime } = content
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main ref={mainRef} className="container mx-auto">
      <ScrollTopAndComment />
      <OpenTelemetryBanner 
        ctaTitle={content.cta_title}
        ctaText={content.cta_text}
      />
      <SectionContainer>
        <div className="post container flex flex-row-reverse overflow-clip">
          <div className="post-toc ml-4 w-1/4">
            {toc.map((tocItem: tocItemProps) => {
              return (
                <div className="post-toc-item" key={tocItem.url}>
                  <a data-level={tocItem.depth} href={tocItem.url} className="line-clamp-2">
                    {tocItem.value}
                  </a>
                </div>
              )
            })}
          </div>

          <div className="post-content w-3/4 pr-4">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>
        </div>
        <PageFeedback />
      </SectionContainer>
      <ProgressBar target={mainRef} />
    </main>
  )
} 