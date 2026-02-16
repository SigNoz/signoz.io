'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors } from 'contentlayer/generated'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import { RegionProvider } from '@/components/Region/RegionContext'
import { type Guide } from '../types/transformedContent'

interface LayoutProps {
  content: CoreContent<Guide>
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
    <RegionProvider>
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
    </RegionProvider>
  )
}
