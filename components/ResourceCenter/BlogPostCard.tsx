import siteMetadata from '@/data/siteMetadata'
import Authors from '../../constants/authors.json'
import { Clock4 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from 'pliny/utils/formatDate'

type BlogPostCardContent = {
  path: string
  date: string
  title: string
  authors?: unknown[]
  readingTime: {
    text: string
  }
}

export default function BlogPostCard({ blog }: { blog: BlogPostCardContent }) {
  const { path, date, title, authors } = blog

  const getAuthorDetails = (authorID) => {
    if (typeof authorID === 'object') {
      return authorID
    }

    if (Authors?.[authorID]) {
      return Authors?.[authorID]
    }

    return {}
  }

  const renderAuthor = (author) => {
    const authorData = getAuthorDetails(author)

    return (
      <div className="flex items-center gap-2">
        {authorData.image_url ? (
          <Image
            src={authorData.image_url}
            alt={authorData.name || ''}
            width={24}
            height={24}
            objectPosition="center"
            objectFit="cover"
            className="my-auto inline-block aspect-square h-6 w-6 shrink-0 rounded-full object-center"
          />
        ) : null}
        <div className="text-xs capitalize">{authorData.name}</div>
      </div>
    )
  }

  return (
    <Link href={`/${path}`} prefetch={false}>
      <div className="flex cursor-pointer flex-col max-md:ml-0 max-md:w-full">
        <div
          className={`mx-auto flex w-full grow flex-col rounded border border-solid p-4 transition-colors duration-150 hover:bg-signoz_ink-300 active:opacity-70 dark:border-signoz_ink-500 dark:bg-signoz_ink-400 dark:hover:bg-signoz_ink-300 max-md:mt-6`}
        >
          <div className="content h-[96px]">
            <div
              className={`line-clamp-3 text-base font-medium leading-6 text-neutral-700 dark:text-neutral-100`}
            >
              {title}
            </div>
            <div className="mt-3 flex gap-2 text-xs font-medium uppercase leading-5 tracking-wide">
              <div className="justify-center rounded-full bg-stone-100 bg-opacity-10 px-2.5 py-1 text-stone-700 dark:text-stone-100">
                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
              </div>
            </div>
          </div>

          <div className="mt-16 flex w-full flex-col items-end justify-between gap-5 py-px text-sm leading-5 max-md:mt-10 lg:flex-row">
            <div className="flex flex-col gap-2 font-medium text-stone-500 dark:text-white">
              {authors && Array.isArray(authors) && renderAuthor(authors[0])}
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap font-mono dark:text-stone-300">
              <Clock4 size={16} />
              <div className="font-mono text-xs dark:text-white">{blog.readingTime.text}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
