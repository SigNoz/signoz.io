import React from 'react'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import BlogPostCard from '../Shared/BlogPostCard'
import { genPageMetadata } from 'app/seo'
import GridLayout from '@/layouts/GridLayout'

const POSTS_PER_PAGE = 9

export default function AllBlogs({ blogs }) {
  const pageNumber = 1
  const initialDisplayPosts = blogs.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(blogs.length / POSTS_PER_PAGE),
    pageRoute: 'blog',
  }

  return (
    <GridLayout
      posts={blogs}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Blogs"
      isDarkMode={true}
    />
  )
}
