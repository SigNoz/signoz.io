import * as React from 'react'
import AuthorInfo from '../AuthorInfo'
import { format, parseISO } from 'date-fns'

interface TagProps {
  children: React.ReactNode
}

function Tag({ children }: TagProps) {
  return (
    <div className="justify-center rounded-full bg-stone-300 bg-opacity-10 px-2.5 py-1">
      {children}
    </div>
  )
}

export interface AuthorProps {
  name: string
  avatarUrl?: string
}
interface BlogHeaderProps {
  tags: string[]
  title: string
  authors: string[]
  publishedDate: string
  readingTime: string
}

export default function BlogHeader({
  tags,
  title,
  authors,
  publishedDate,
  readingTime,
}: BlogHeaderProps) {
  return (
    <div className="mb-4 p-4">
      <div className="mb-4">
        {/* <Link href="/blog" className="flex items-center gap-4">
          <ArrowLeft size={16} /> Back to Blog
        </Link> */}
      </div>
      <article className="flex max-w-[969px] flex-col leading-[150%]">
        <div className="flex flex-wrap gap-2 self-start whitespace-nowrap text-xs font-medium uppercase tracking-wide text-stone-700 dark:text-stone-300">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h1 className="mt-5 w-full text-3xl font-semibold leading-10 text-indigo-500 dark:text-indigo-200 max-md:max-w-full">
          {title}
        </h1>
        <div className="mt-5 flex w-full items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="flex flex-col self-stretch text-base text-white">
            <h2 className="text-xs font-medium uppercase tracking-wide text-stone-700 dark:text-stone-300">
              written by
            </h2>
            {authors?.map((author, index) => <AuthorInfo author={author} key={index} />)}
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-medium uppercase tracking-wide text-stone-700 dark:text-stone-300">
              published on
            </h2>
            <time className="mt-2 text-base text-stone-700 dark:text-white">
              {format(parseISO(publishedDate), 'LLLL d, yyyy')}
            </time>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-medium uppercase tracking-wide text-stone-700 dark:text-stone-300">
              reading time
            </h2>
            <div className="mt-2 text-base text-stone-700 dark:text-white">{readingTime}</div>
          </div>
        </div>
      </article>
    </div>
  )
}
