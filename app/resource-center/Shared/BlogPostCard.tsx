import siteMetadata from '@/data/siteMetadata'
import { Blog, Comparison, Guide, Opentelemetry } from 'contentlayer/generated'
import Authors from '../../../constants/authors.json'
import { Timer } from 'lucide-react'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

export default function BlogPostCard({
  blog,
}: {
  blog: CoreContent<Blog | Comparison | Opentelemetry | Guide>
}) {
  const { path, date, title, authors } = blog;

  const getAuthorName = (authorID) => {
    if (Authors[authorID]) {
      return Authors[authorID].name;
    }

    return '';
  };

  return (
    <Link href={`/${path}`}>
      <div className="flex cursor-pointer flex-col max-md:ml-0 max-md:w-full">
        <div
          className={`mx-auto flex w-full grow flex-col rounded border border-solid p-4 dark:border-signoz_ink-500 dark:bg-signoz_ink-200 max-md:mt-6 transition-all hover:border-blue-500 dark:hover:border-blue-400`}
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

          <div className="mt-16 flex w-full flex-col justify-between gap-5 py-px text-sm leading-5 max-md:mt-10 lg:flex-row">
            <div className="flex items-center gap-2 font-medium text-stone-500 dark:text-white">
              {authors && Array.isArray(authors) && (
                <>
                  <img
                    loading="lazy"
                    src={`https://dummyimage.com/300.png&text=${authors[0]?.slice(0, 1)}`}
                    className="my-auto inline-block aspect-square h-6 w-4 w-6 shrink-0 rounded-full"
                  />
                  <div className="capitalize">{getAuthorName(authors[0])}</div>
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
  );
}
