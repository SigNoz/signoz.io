'use client'

import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import React, { useState } from 'react'
import BlogPostCard from '../Shared/BlogPostCard'
import { filterData } from 'app/utils/common'
import SearchInput from '../Shared/Search'

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

const GuidesHeader: React.FC<GuidesHeaderProps> = ({
  title,
  description,
  searchPlaceholder,
  onSearch,
}) => {
  return (
    <section className="flex max-w-[697px] flex-col leading-[143%]">
      <Heading
        tag="h2"
        text="resources"
        className="self-start text-center text-sm font-medium uppercase tracking-wider text-rose-400"
      />
      <Heading
        tag="h1"
        text={title}
        className="mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200"
      />
      <p className="mt-4 w-full text-lg leading-8 tracking-normal text-stone-700 dark:text-stone-300 max-md:max-w-full">
        {description}
      </p>
      <SearchInput placeholder={searchPlaceholder || ''} onSearch={onSearch} />
    </section>
  )
}

export default function Guides() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const [blogs, setBlogs] = useState(posts)

  const primaryFeaturedBlogs = blogs.slice(0, 2)
  const secondaryFeaturedBlogs = blogs.slice(2, 12)

  const handleSearch = (e) => {
    const filteredPosts = filterData(posts, e.target.value)
    setBlogs(filteredPosts)
  }

  return (
    <div className="guides">
      <GuidesHeader
        title="SigNoz Guides"
        description="Level up your engineering skills with great resources, tutorials, and guides on monitoring, observability, Opentelemetry, and more."
        searchPlaceholder="Search for guides..."
        onSearch={handleSearch}
      />

      <div className="mt-5 w-full max-md:max-w-full">
        <div className="mt-4 grid grid-cols-2 gap-4">
          {primaryFeaturedBlogs.map((featuredBlog) => {
            return <BlogPostCard blog={featuredBlog} />
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {secondaryFeaturedBlogs.map((post) => {
          return <BlogPostCard blog={post} />
        })}
      </div>
    </div>
  )
}
