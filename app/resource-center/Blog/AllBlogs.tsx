import React from 'react'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import BlogPostCard from '../Shared/BlogPostCard'

export default function AllBlogs({ blogs }) {
  return (
    <div className="my-8 flex flex-col">
      <div
        className={`w-full text-sm font-semibold uppercase leading-5 tracking-wide max-md:max-w-full`}
      >
        All posts
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {blogs.map((post) => {
          return <BlogPostCard blog={post} />
        })}
      </div>
    </div>
  )
}
