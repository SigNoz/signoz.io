import * as React from 'react'
import BlogPostCard from '../Shared/BlogPostCard'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

interface FeaturedBlogsProps {
  isDarkMode: boolean
}

function FeaturedBlogs({ isDarkMode }: FeaturedBlogsProps) {
  const posts = allCoreContent(sortPosts(allBlogs))

  const primaryFeaturedBlogs = posts.slice(0, 2)
  const secondaryFeaturedBlogs = posts.slice(2, 5)

  return (
    <div className="my-8 flex flex-col">
      <div
        className={`w-full text-sm font-semibold uppercase leading-5 tracking-wide max-md:max-w-full ${
          isDarkMode ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        featured blog posts
      </div>
      <div className="mt-5 w-full max-md:max-w-full">
        <div className="mt-4 grid grid-cols-2 gap-4">
          {primaryFeaturedBlogs.map((featuredBlog) => {
            return <BlogPostCard blog={featuredBlog} key={featuredBlog.slug} />
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {secondaryFeaturedBlogs.map((post) => {
          return <BlogPostCard blog={post} key={post.slug} />
        })}
      </div>
    </div>
  )
}

export default FeaturedBlogs
