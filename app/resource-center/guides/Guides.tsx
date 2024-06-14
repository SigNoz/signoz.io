'use client'

import { allGuides } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import React, { useState, useEffect, useMemo } from 'react'
import BlogPostCard from '../Shared/BlogPostCard'
import { filterData } from 'app/utils/common'
import SearchInput from '../Shared/Search'
import { Frown } from 'lucide-react'
import SideBar, {GUIDES_TOPICS }from '@/components/SideBar'
import { Pagination } from '@/layouts/GridLayout'


interface HeadingProps {
  tag: string
  text: string
  className?: string
}

const Heading: React.FC<HeadingProps> = ({ tag, text, className = '' }) => {
  const Tag = tag as keyof JSX.IntrinsicElements
  return <Tag className={className}>{text}</Tag>
}

interface GuidesHeaderProps {
  title: string
  description: string
  searchPlaceholder?: string
  onSearch: (e) => void
}


const GuidesHeader = ({ title, description, searchPlaceholder, onSearch }) => {
  return (
    <section className="flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="self-start text-center text-sm font-medium uppercase tracking-wider text-rose-400">
        resources
      </h2>
      <h1 className="mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        {title}
      </h1>
      <p className="mt-4 w-full text-lg leading-8 tracking-normal text-stone-700 dark:text-stone-300 max-md:max-w-full">
        {description}
      </p>
      <SearchInput placeholder={searchPlaceholder || ''} onSearch={onSearch} />
    </section>
  )
}

export default function Guides() {
  const posts = allCoreContent(sortPosts(allGuides))
  const [activeItem, setActiveItem] = useState(GUIDES_TOPICS.ALL)
  const [searchQuery, setSearchQuery] = useState('');
  const POST_PER_PAGE = 20
  const pageNumber = 1

  useEffect(() => {
    if (!window) {
      return
    }

    const activeItemToSet: GUIDES_TOPICS = window.location.hash as GUIDES_TOPICS || GUIDES_TOPICS.ALL;

    setActiveItem(activeItemToSet)
  }, [window]);


  const blogs = useMemo(() => {
    if (searchQuery) {
      return filterData(posts, searchQuery)
    }

    if (activeItem === GUIDES_TOPICS.ALL) {
      return posts
    }

    const formattedActiveItem = activeItem.replace('#', '').toLowerCase().replace(/\s+/g, '')

    return posts.filter((post) => {
      const postTags = post.tags?.map(tag => tag.toLowerCase().replace(/\s+/g, ''))
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

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POST_PER_PAGE),
    pageRoute: 'guide'
  }

  return (
    <div>
      <GuidesHeader
        title="SigNoz Guides"
        description="Level up your engineering skills with great resources, tutorials, and guides on monitoring, observability, Opentelemetry, and more."
        searchPlaceholder="Search for guides..."
        onSearch={handleSearch}
      />

      <div className="relative xl:-mr-16 xl:pr-16 mt-16 flex flex-col md:flex-row gap-20">
        <SideBar onCategoryClick={handleCategoryClick} activeItem={activeItem} />
        <div className="flex-1">

          {blogs && Array.isArray(blogs) && blogs.length <= 0 && (
            <div className="no-blogs my-8 flex items-center gap-4 font-mono font-bold">
              <Frown size={16} /> No Guides found
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            {blogs.map((post) => {
              return <BlogPostCard key={post.slug} blog={post} />
            })}
          </div>
        </div>
     
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageRoute={pagination.pageRoute}
        postsPerPage={POST_PER_PAGE}
        totalPosts={posts.length}
      />  
    </div>
  )
}
