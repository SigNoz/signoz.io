import { ReactNode } from 'react'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import { RegionProvider } from '@/components/Region/RegionContext'
import type { AuthorDetail } from '../types/transformedContent'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'

export interface tocItemProps extends TocItemProps {}

export interface RelatedArticleProps {
  title: string
  publishedOn: string
  url: string
}

type FAQContentData = {
  slug: string
  date: string
  title: string
  readingTime: { text: string; minutes?: number; time?: number; words?: number }
  [key: string]: unknown
}

interface LayoutProps {
  content: FAQContentData
  authorDetails: AuthorDetail[]
  authors: string[]
  children: ReactNode
  toc: tocItemProps[]
  relatedArticles?: RelatedArticleProps[]
  tags: string[]
  breadcrumbs?: BreadcrumbCrumb[]
}

export default function FAQLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  tags,
  relatedArticles,
  breadcrumbs,
}: LayoutProps) {
  // ArticleLayout reads tags and relatedArticles off `content`, while the FAQ
  // route passes them as separate props.
  const articleContent = { ...content, tags, relatedArticles }

  return (
    <RegionProvider>
      <ArticleLayout
        content={articleContent as unknown as React.ComponentProps<typeof ArticleLayout>['content']}
        authorDetails={authorDetails}
        authors={authors}
        toc={toc}
        contentType="faq"
        showNewsletter={true}
        showRelatedArticles={true}
        breadcrumbs={breadcrumbs}
      >
        {children}
      </ArticleLayout>
    </RegionProvider>
  )
}
