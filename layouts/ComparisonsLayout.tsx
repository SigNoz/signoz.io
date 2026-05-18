import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import { RegionProvider } from '@/components/Region/RegionContext'
import type { AuthorDetail, Comparison } from '../types/transformedContent'

interface LayoutProps {
  content: CoreContent<Comparison>
  authorDetails: AuthorDetail[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  authorDirectory?: Record<string, { name?: string; url?: string; image_url?: string }>
}

export default function ComparisonsLayout({
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
        contentType="comparison"
        showNewsletter={true}
        showRelatedArticles={true}
        authorDirectory={authorDirectory}
      >
        {children}
      </ArticleLayout>
    </RegionProvider>
  )
}
