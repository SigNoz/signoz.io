'use client'

import { useState } from 'react'
import { filterData } from 'app/utils/common'
import SectionHeader from './SectionHeader'
import FeaturedBlogs from './FeaturedBlogs'
import AllBlogs from './AllBlogs'
import type { ResourceCenterBlog } from '../../app/(opentelemetry-hub-routes)/content'

export default function Blogs({
  posts,
  pageNumber = 1,
  pageRoute = 'blog',
}: {
  posts: ResourceCenterBlog[]
  pageNumber?: number
  pageRoute?: string
}) {
  const [blogs, setBlogs] = useState(posts)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    const filteredPosts = filterData(posts, e.target.value)
    setBlogs(filteredPosts)
  }

  return (
    <div>
      <SectionHeader
        title="The SigNoz Blog"
        description="Stay updated with SigNoz product updates, company news, and articles on OpenTelemetry, observability, monitoring, and open-source tools."
        searchPlaceholder="Search for a blog..."
        onSearch={handleSearch}
      />
      {searchValue.length === 0 && pageNumber === 1 && (
        <FeaturedBlogs isDarkMode={true} posts={posts} />
      )}
      <AllBlogs blogs={blogs} pageNumber={searchValue ? 1 : pageNumber} pageRoute={pageRoute} />
    </div>
  )
}
