import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import { RegionProvider } from '@/components/Region/RegionContext'
import type { AuthorDetail, Guide } from '../types/transformedContent'

interface LayoutProps {
  content: CoreContent<Guide>
  authorDetails: AuthorDetail[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  authorDirectory?: Record<string, { name?: string; url?: string; image_url?: string }>
}

export default function GuidesLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  authorDirectory,
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
        authorDirectory={authorDirectory}
      >
        {children}
      </ArticleLayout>
    </RegionProvider>
  )
}
