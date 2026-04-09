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
        <div className="container mx-auto flex h-full gap-4 overflow-clip">
          <div className="mt-8 box-border w-[calc(100%-320px)] overflow-y-auto pl-6 max-lg:w-full max-lg:pl-0">
            <PageTitle>{title}</PageTitle>
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>

          <div className="sticky top-[88px] box-border flex h-[calc(100vh-156px)] w-80 flex-col gap-1 overflow-y-auto p-4 pl-8 max-lg:hidden">
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
