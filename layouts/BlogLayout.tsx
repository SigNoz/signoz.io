'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import { RegionProvider } from '@/components/Region/RegionContext'

// Extend the Blog type to include CTA fields
interface BlogContent extends Blog {
  cta_title?: string
  cta_text?: string
}

interface LayoutProps {
  content: CoreContent<BlogContent>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
}

export default function BlogLayout({
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
        contentType="blog"
        showNewsletter={true}
        showRelatedArticles={true}
      >
        {children}
        <PageFeedback />
      </ArticleLayout>
    </RegionProvider>
  )
}
