import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import { RegionProvider } from '@/components/Region/RegionContext'
import type { AuthorDetail, Comparison } from '../types/transformedContent'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbSchema'

interface LayoutProps {
  content: CoreContent<Comparison>
  authorDetails: AuthorDetail[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  authorDirectory?: Record<string, { name?: string; url?: string; image_url?: string }>
  breadcrumbs?: BreadcrumbCrumb[]
}

export default function ComparisonsLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  authorDirectory,
  breadcrumbs,
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
        breadcrumbs={breadcrumbs}
      >
        {children}
      </ArticleLayout>
    </RegionProvider>
  )
}
