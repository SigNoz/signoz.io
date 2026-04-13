'use client'

import SearchInput from './Search'
import React from 'react'
import { filterData } from 'app/utils/common'
import GridLayout from '@/layouts/GridLayout'

interface ComparisonsPageHeaderProps {
  onSearch: (e) => void
}

const ComparisonsPageHeader: React.FC<ComparisonsPageHeaderProps> = ({ onSearch }) => {
  return (
    <section className="mb-[72px] flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="mb-0 self-start text-sm font-medium uppercase tracking-wider text-signoz_sakura-500 dark:text-signoz_sakura-400">
        resources
      </h2>
      <h1 className="my-0 mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        Comparisons
      </h1>
      <p className="my-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
        Stay informed about the latest tools in the observability domain with in-depth comparisons
        of popular options to determine the best fit for your needs.
      </p>

      <SearchInput placeholder={'Search for a blog...'} onSearch={onSearch} />
    </section>
  )
}

const POSTS_PER_PAGE = 9

export default function ComparisonsListing({ posts = [] }: { posts?: any[] }) {
  const [blogs, setBlogs] = React.useState(posts)
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    const filteredPosts = filterData(posts, e.target.value)
    setBlogs(filteredPosts)
  }

  const pageNumber = 1
  const initialDisplayPosts = blogs.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(blogs.length / POSTS_PER_PAGE),
    pageRoute: 'comparisons',
  }

  return (
    <div className="comparisons">
      <ComparisonsPageHeader onSearch={handleSearch} />

      <GridLayout
        posts={blogs}
        initialDisplayPosts={searchValue ? blogs : initialDisplayPosts}
        pagination={searchValue ? undefined : pagination}
        title="All Comparisons"
        isDarkMode={true}
      />
    </div>
  )
}
