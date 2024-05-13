import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import { Timer } from 'lucide-react'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

export default function BlogPostCard({ blog }: { blog: CoreContent<Blog> }) {
  const { path, date, title, authors } = blog

  console.log('datea', authors)

  return (
    <Link href={`/${path}`}>
      <div className="flex cursor-pointer flex-col max-md:ml-0 max-md:w-full">
        <div
          className={`mx-auto flex w-full grow flex-col rounded border border-solid p-4 dark:border-gray-700 dark:bg-neutral-900 max-md:mt-6`}
        >
          <div className="content h-[96px]">
            <div
              className={`text-base font-medium leading-6 text-neutral-700 dark:text-neutral-100`}
            >
              {title}
            </div>
            <div className="mt-3 flex gap-2 text-xs font-medium uppercase leading-5 tracking-wide">
              <div className="justify-center whitespace-nowrap rounded-full bg-blue-500 bg-opacity-10 px-2.5 py-1 text-blue-500">
                Advanced
              </div>
              <div className="justify-center rounded-full bg-stone-500 bg-opacity-10 px-2.5 py-1 text-stone-700 dark:text-stone-300">
                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
              </div>
            </div>
          </div>

          <div className="mt-16 flex w-full justify-between gap-5 py-px text-sm leading-5 max-md:mt-10">
            <div className="flex items-center gap-2 font-medium text-stone-500 dark:text-white">
              {authors && Array.isArray(authors) && (
                <>
                  <img
                    loading="lazy"
                    src={`https://dummyimage.com/300.png&text=${authors[0]?.slice(0, 1)}`}
                    className="my-auto inline-block aspect-square h-6 w-4 w-6 shrink-0 rounded-full"
                  />
                  <div className="capitalize">{authors[0]}</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap text-stone-700 dark:text-stone-300">
              <Timer size={16} />
              <div className="text-stone-700 dark:text-white">{blog.readingTime.text}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
