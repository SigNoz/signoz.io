'use client'

import React, { useState } from 'react'
import { filterData } from 'app/utils/common'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import SearchInput from '../Shared/Search'
import FeaturedBlogs from './FeaturedBlogs'
import AllBlogs from './AllBlogs'

interface SearchInputProps {
  placeholder: string
  iconSrc: string
}

interface BlogPageHeaderProps {
  onSearch: (e) => void
}

const BlogsPageHeader: React.FC<BlogPageHeaderProps> = ({ onSearch }) => {
  return (
    <section className="mb-[72px] flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="mb-0 self-start text-sm font-medium uppercase tracking-wider text-signoz_sakura-500 dark:text-signoz_sakura-400">
        resources
      </h2>
      <h1 className="my-0 mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        The SigNoz Blog
      </h1>
      <p className="my-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
        Stay updated with SigNoz product updates, company news, and articles on OpenTelemetry,
        observability, monitoring, and open-source tools.
      </p>

      <SearchInput placeholder={'Search for a blog...'} onSearch={onSearch} />
    </section>
  )
}

export default function Blogs() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const [blogs, setBlogs] = useState(posts)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    const filteredPosts = filterData(posts, e.target.value)
    setBlogs(filteredPosts)
  }

  return (
    <div>
      <BlogsPageHeader onSearch={handleSearch} />
      {searchValue.length === 0 && <FeaturedBlogs isDarkMode={true} />}
      <AllBlogs blogs={blogs} />
    </div>
  )
}
