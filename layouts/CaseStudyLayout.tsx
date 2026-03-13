import '../css/post.css'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import PageTitle from '@/components/PageTitle'
import React from 'react'
import { MDXContent } from '@/utils/strapi'
import { RegionProvider } from '@/components/Region/RegionContext'

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

interface CaseStudyLayoutProps {
  content: CoreContent<MDXContent>
  children: ReactNode
  toc: tocItemProps[]
}

export default function CaseStudyLayout({ content, children, toc }: CaseStudyLayoutProps) {
  const { title } = content

  return (
    <RegionProvider>
      <div className="container mx-auto">
        <div className="post container overflow-clip">
          <div className="post-content mt-8">
            <PageTitle>{title}</PageTitle>
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>

          <div className="post-toc">
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
        </div>
      </div>
    </RegionProvider>
  )
}
