'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Guide, Authors } from 'contentlayer/generated'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import PageFeedback from '@/components/PageFeedback/PageFeedback'

// Extend the Guide type to include CTA fields
interface GuideContent extends Guide {
  cta_title?: string
  cta_text?: string
}

interface LayoutProps {
  content: CoreContent<GuideContent>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
}

export default function GuidesLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
}: LayoutProps) {
  return (
    <ArticleLayout
      content={content}
      authorDetails={authorDetails}
      authors={authors}
      toc={toc}
      contentType="guide"
      showNewsletter={true}
      showRelatedArticles={true}
    >
      {children}
      <PageFeedback />
    </ArticleLayout>
  )
}
