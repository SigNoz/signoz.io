'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { filterData } from 'app/utils/common'
import SearchInput from './Search'
import SideBar, { GUIDES_TOPICS } from '@/components/SideBar'
import GridLayout from '@/layouts/GridLayout'
import type { ResourceCenterGuide } from '../../app/(opentelemetry-hub-routes)/content'

const GuidesHeader = ({ title, description, searchPlaceholder, onSearch }) => {
  return (
    <section className="mb-[16px] flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="mb-0 self-start text-center text-sm font-medium uppercase tracking-wider text-signoz_sakura-500 dark:text-signoz_sakura-400">
        resources
      </h2>
      <h1 className="my-0 mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        {title}
      </h1>
      <p className="my-4  w-full text-lg leading-8 tracking-normal text-stone-700 dark:text-stone-300 max-md:max-w-full">
        {description}
      </p>
      <SearchInput placeholder={searchPlaceholder || ''} onSearch={onSearch} />
    </section>
  )
}

const POSTS_PER_PAGE = 12

export default function Guides({
  posts,
  pageNumber = 1,
}: {
  posts: ResourceCenterGuide[]
  pageNumber?: number
}) {
  const [activeItem, setActiveItem] = useState(GUIDES_TOPICS.ALL)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!window) {
      return
    }

    const activeItemToSet: GUIDES_TOPICS =
      (window.location.hash as GUIDES_TOPICS) || GUIDES_TOPICS.ALL

    setActiveItem(activeItemToSet)
  }, [window])

  const blogs = useMemo(() => {
    if (searchQuery) {
      return filterData(posts, searchQuery)
    }

    if (activeItem === GUIDES_TOPICS.ALL) {
      return posts
    }

    const formattedActiveItem = activeItem.replace('#', '').toLowerCase().replace(/\s+/g, '')

    return posts.filter((post) => {
      const postTags = post.tags?.map((tag) => tag.toLowerCase().replace(/\s+/g, ''))
      return postTags?.includes(formattedActiveItem)
    })
  }, [searchQuery, activeItem])

  const handleCategoryClick = (category) => {
    setActiveItem(category)
    window.history.pushState(null, '', category)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setActiveItem(GUIDES_TOPICS.ALL)
  }

  const isFiltering = searchQuery || activeItem !== GUIDES_TOPICS.ALL
  const currentPage = isFiltering ? 1 : pageNumber
  const initialDisplayPosts = blogs.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  )
  const pagination = {
    currentPage,
    totalPages: Math.ceil(blogs.length / POSTS_PER_PAGE),
    pageRoute: 'guides',
  }

  return (
    <div>
      <GuidesHeader
        title="SigNoz Guides"
        description="Level up your engineering skills with great resources, tutorials, and guides on monitoring, observability, Opentelemetry, and more."
        searchPlaceholder="Search for guides..."
        onSearch={handleSearch}
      />

      <div className="relative mt-8 flex flex-col gap-8 xl:-mr-16 xl:pr-16">
        <SideBar onCategoryClick={handleCategoryClick} activeItem={activeItem} />
        <div className="flex-1">
          <GridLayout
            posts={blogs}
            initialDisplayPosts={isFiltering ? blogs : initialDisplayPosts}
            pagination={isFiltering ? undefined : pagination}
            title="All Guides"
            isDarkMode={true}
          />
        </div>
      </div>
    </div>
  )
}
