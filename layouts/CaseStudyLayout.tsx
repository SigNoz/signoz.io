import '../css/post.css'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import PageTitle from '@/components/PageTitle'
import React from 'react'
import { CaseStudy } from '../.contentlayer/generated'
import Button from '@/components/Button/Button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

interface CaseStudyLayoutProps {
  content: CoreContent<CaseStudy>
  children: ReactNode
  toc: tocItemProps[]
}

export default function CaseStudyLayout({ content, children, toc }: CaseStudyLayoutProps) {
  const { title } = content

  return (
    <div className="container mx-auto">
      <div className="post container overflow-clip">
        <div className="post-content mt-8">
          <PageTitle>{title}</PageTitle>
          <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
            {children}
          </article>
        </div>

        {/* <div className="post-toc">
          {toc.map((tocItem: tocItemProps) => {
            return (
              <div className="post-toc-item" key={tocItem.url}>
                <a data-level={tocItem.depth} href={tocItem.url} className="line-clamp-2">
                  {tocItem.value}
                </a>
              </div>
            )
          })}
        </div> */}




      </div>
      <GetStarted page='case-study' />
    </div>
  )
}




export const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`;
  const readDocumentationId = `btn-read-documentation-${page}-bottom`;

  return (
    <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:55%] bg-[width:50%] bg-[center_top_4rem] sm:bg-no-repeat">
      <section className='!mx-auto !w-[100vw] md:!w-[80vw]'>
        <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
          <div className='flex flex-col gap-16'>
            <div className='flex flex-col gap-12'>
              <p className='text-4xl font-bold text-center mb-0 mt-20'>
                Get started with <br /> SigNoz Cloud today
              </p>
              <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                <Button id={getStartedId}>
                  <Link href="/teams/" className="flex-center">
                    Try SigNoz Cloud
                    <ArrowRight size={14} />
                  </Link>
                </Button>

                <Button type={Button.TYPES.SECONDARY} id={readDocumentationId}>
                  <Link href="/docs/introduction/" className="flex-center">
                    <BookOpen size={14} />
                    Read Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <img
                src="/img/landing/landing_thumbnail.png"
                alt="Custom Thumbnail"
                className="w-3/5 rounded-lg max-sm:-mb-8 -mb-36 z-[0]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}