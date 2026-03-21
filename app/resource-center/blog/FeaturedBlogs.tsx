import React from 'react'
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
          isDarkMode ? 'text-signoz_slate-100' : 'text-signoz_slate-300'
        }`}
      >
        featured blog posts
      </div>
      <div className="mt-5 w-full max-md:max-w-full">
        <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {primaryFeaturedBlogs.map((featuredBlog) => {
            return <BlogPostCard blog={featuredBlog} key={featuredBlog.slug} />
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {secondaryFeaturedBlogs.map((post) => {
          return <BlogPostCard blog={post} key={post.slug} />
        })}
      </div>
    </div>
  )
}

export default FeaturedBlogs
