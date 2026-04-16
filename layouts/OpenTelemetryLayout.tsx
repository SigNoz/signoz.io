import { ReactNode } from 'react'
import { CoreContent } from '@/utils/contentlayer/contentUtils'
import type { Blog } from '@/utils/contentlayer/blogCollection'
import type { Author as Authors } from '@/utils/contentlayer/authorCollection'
import ArticleLayout, { TocItemProps } from './ArticleLayout'
import { RegionProvider } from '@/components/Region/RegionContext'

// Extend the Blog type to include CTA fields
interface OpenTelemetryContent extends Blog {
  cta_title?: string
  cta_text?: string
}

interface LayoutProps {
  content: CoreContent<OpenTelemetryContent>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
}

export default function OpenTelemetryLayout({
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
      </ArticleLayout>
    </RegionProvider>
  )
}
