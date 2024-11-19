import { BackwardIcon } from '@heroicons/react/24/outline'
import { ArrowBigLeftIcon, ArrowLeft, MoveLeft } from 'lucide-react'
import Link from 'next/link'
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

function Author({ name, avatarUrl }: AuthorProps) {
  return (
    <div className="mt-2 flex gap-2.5">
      <img
        loading="lazy"
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="my-auto aspect-square w-5 shrink-0"
      />
      <div>{name}</div>
    </div>
  )
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
    <div className=" p-4">
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
      </article>
    </div>
  )
}
