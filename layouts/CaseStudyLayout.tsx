import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import { RegionProvider } from '@/components/Region/RegionContext'
import type { AuthorDetail } from '../types/transformedContent'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'
import { MDXContent } from '@/utils/strapi'

interface CaseStudyLayoutProps {
  content: CoreContent<MDXContent>
  authorDetails: AuthorDetail[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  authorDirectory?: Record<string, { name?: string; url?: string; image_url?: string }>
  breadcrumbs?: BreadcrumbCrumb[]
}

export default function CaseStudyLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  authorDirectory,
  breadcrumbs,
}: CaseStudyLayoutProps) {
  return (
    <RegionProvider>
      <ArticleLayout
        content={content}
        authorDetails={authorDetails}
        authors={authors}
        toc={toc}
        contentType="customer-story"
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
