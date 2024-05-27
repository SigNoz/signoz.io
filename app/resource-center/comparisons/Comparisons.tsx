'use client'

import { allComparisons } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import BlogPostCard from '../Shared/BlogPostCard'
import SearchInput from '../Shared/Search'
import React from 'react'
import { filterData } from 'app/utils/common'

interface ComparisonsPageHeaderProps {
  onSearch: (e) => void
}

const ComparisonsPageHeader: React.FC<ComparisonsPageHeaderProps> = ({ onSearch }) => {
  return (
    <section className="flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="self-start text-sm font-medium uppercase tracking-wider text-rose-500 dark:text-rose-400">
        resources
      </h2>
      <h1 className="mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        Comparisons
      </h1>
      <p className="mt-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
      Stay informed about the latest tools in the observability domain with in-depth comparisons of popular options to determine the best fit for your needs.
      </p>

      <SearchInput placeholder={'Search for a blog...'} onSearch={onSearch} />
    </section>
  )
}

export default function ComparisonsListing() {
  const posts = allCoreContent(sortPosts(allComparisons))
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
      <ComparisonsPageHeader onSearch={handleSearch} />

      {searchValue && searchValue.length == 0 && (
        <div className="mt-5 w-full max-md:max-w-full">
          <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {primaryFeaturedBlogs.map((featuredBlog) => {
              return <BlogPostCard blog={featuredBlog} />
            })}
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => {
          return <BlogPostCard blog={post} />
        })}
      </div>
    </div>
  )
}
