import * as React from 'react'
import FeaturedBlogs from './FeaturedBlogs'
import AllBlogs from './AllBlogs'
import { filterData } from 'app/utils/common'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import SearchInput from '../Shared/Search'

interface SearchInputProps {
  placeholder: string
  iconSrc: string
}

interface BlogPageHeaderProps {
  onSearch: (e) => void
}

const BlogsPageHeader: React.FC<BlogPageHeaderProps> = ({ onSearch }) => {
  return (
    <section className="flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="self-start text-sm font-medium uppercase tracking-wider text-rose-500 dark:text-rose-400">
        resources
      </h2>
      <h1 className="mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        The SigNoz Blog
      </h1>
      <p className="mt-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
        Dive into SigNoz product updates, company news, and more on how developers and startups can
        leverage the open observability ecosystem.
      </p>

      <SearchInput placeholder={'Search for a blog...'} onSearch={onSearch} />
    </section>
  )
}

export default function Blogs() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const [blogs, setBlogs] = React.useState(posts)
  const [searchValue, setSearchValue] = React.useState('')

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
