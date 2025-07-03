import { allOpentelemetries } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import BlogPostCard from '../Shared/BlogPostCard'
import SearchInput from '../Shared/Search'
import React from 'react'
import { filterData } from 'app/utils/common'
import { Frown, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import articleSeriesData from '../../../constants/articleSeries.json'

interface OpenTelemetryPageHeaderProps {
  onSearch: (e) => void
}

const OpenTelemetryPageHeader: React.FC<OpenTelemetryPageHeaderProps> = ({ onSearch }) => {
  return (
    <section className="mb-[72px] flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="mb-0 self-start text-sm font-medium uppercase tracking-wider text-signoz_sakura-500 dark:text-signoz_sakura-400">
        resources
      </h2>
      <h1 className="my-0 mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        OpenTelemetry
      </h1>
      <p className="my-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
        Articles on OpenTelemetry concepts, implementation, and its use cases.
      </p>

      <SearchInput placeholder={'Search for a blog...'} onSearch={onSearch} />
    </section>
  )
}

const FeaturedSeries = () => {
  // Get the NextJS series from the articleSeries.json
  const nextjsSeries = articleSeriesData['opentelemetry-nextjs']

  if (!nextjsSeries) return null

  return (
    <div className="mb-8">
      <Link href={nextjsSeries.seriesOverviewHref}>
        <div className="flex cursor-pointer flex-col">
          <div className="mx-auto flex w-full grow flex-col rounded border border-solid p-4 transition-all hover:bg-signoz_ink-300 dark:border-signoz_ink-500 dark:bg-signoz_ink-400 dark:hover:bg-signoz_ink-300">
            <div className="content">
              <div className="text-base font-medium leading-6 text-neutral-700 dark:text-neutral-100">
                {nextjsSeries.name}
              </div>

              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {nextjsSeries.description}
              </p>
            </div>

            <div className="mt-6 flex w-full flex-col items-end justify-between gap-5 py-px text-sm leading-5 lg:flex-row">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  View Complete Series
                </span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-stone-500 dark:text-stone-300">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function OpenTelemetry() {
  const posts = allCoreContent(sortPosts(allOpentelemetries))
  const primaryFeaturedBlogs = posts.slice(0, 2)
  const secondaryFeaturedBlogs = posts.slice(0)

  const [blogs, setBlogs] = React.useState(secondaryFeaturedBlogs)
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    const filteredPosts = filterData(posts, e.target.value)
    setBlogs(filteredPosts)
  }

  return (
    <div className="comparisons">
      <OpenTelemetryPageHeader onSearch={handleSearch} />

      {/* Featured Series Section */}
      <FeaturedSeries />

      {searchValue && searchValue.length == 0 && (
        <div className="mt-5 w-full max-md:max-w-full">
          <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {primaryFeaturedBlogs.map((featuredBlog, index) => {
              return <BlogPostCard blog={featuredBlog} key={index} />
            })}
          </div>
        </div>
      )}

      {blogs && Array.isArray(blogs) && blogs.length <= 0 && (
        <div className="no-blogs my-8 flex items-center gap-4 font-mono font-bold">
          <Frown size={16} /> No Articles found
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post, index) => {
          return <BlogPostCard blog={post} key={index} />
        })}
      </div>
    </div>
  )
}
