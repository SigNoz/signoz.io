'use client'

import React from 'react'
import { filterData } from 'app/utils/common'
import GridLayout from '@/layouts/GridLayout'
import SectionHeader from './SectionHeader'
import { POSTS_PER_PAGE } from '../../app/(opentelemetry-hub-routes)/constants'
import type { ResourceCenterCard } from '../../app/(opentelemetry-hub-routes)/content'

export default function ListingWithSearch({
  posts = [],
  pageNumber = 1,
  pageRoute,
  title,
  description,
  searchPlaceholder,
  gridTitle = 'All posts',
}: {
  posts?: ResourceCenterCard[]
  pageNumber?: number
  pageRoute: string
  title: string
  description: string
  searchPlaceholder: string
  gridTitle?: string
}) {
  const [filteredPosts, setFilteredPosts] = React.useState(posts)
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    setFilteredPosts(filterData(posts, e.target.value))
  }

  const currentPage = searchValue ? 1 : pageNumber
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  )
  const pagination = {
    currentPage,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    pageRoute,
  }

  return (
    <div>
      <SectionHeader
        title={title}
        description={description}
        searchPlaceholder={searchPlaceholder}
        onSearch={handleSearch}
      />

      <GridLayout
        posts={filteredPosts}
        initialDisplayPosts={searchValue ? filteredPosts : initialDisplayPosts}
        pagination={searchValue ? undefined : pagination}
        title={gridTitle}
        isDarkMode={true}
      />
    </div>
  )
}
