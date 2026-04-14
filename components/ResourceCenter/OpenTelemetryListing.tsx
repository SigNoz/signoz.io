'use client'

import SearchInput from './Search'
import React from 'react'
import { filterData } from 'app/utils/common'
import GridLayout from '@/layouts/GridLayout'
import type { ResourceCenterCard } from '../../app/(opentelemetry-hub-routes)/content'

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

      <SearchInput placeholder={'Search for an article...'} onSearch={onSearch} />
    </section>
  )
}

const POSTS_PER_PAGE = 12

export default function OpenTelemetryListing({
  posts = [],
  pageNumber = 1,
}: {
  posts?: ResourceCenterCard[]
  pageNumber?: number
}) {
  const [filteredPosts, setFilteredPosts] = React.useState(posts)
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    const filtered = filterData(posts, e.target.value)
    setFilteredPosts(filtered)
  }

  const currentPage = searchValue ? 1 : pageNumber
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  )
  const pagination = {
    currentPage,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    pageRoute: 'opentelemetry',
  }

  return (
    <div>
      <OpenTelemetryPageHeader onSearch={handleSearch} />

      <GridLayout
        posts={filteredPosts}
        initialDisplayPosts={searchValue ? filteredPosts : initialDisplayPosts}
        pagination={searchValue ? undefined : pagination}
        title="All Articles"
        isDarkMode={true}
      />
    </div>
  )
}
