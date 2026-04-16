import GridLayout from '@/layouts/GridLayout'
import { POSTS_PER_PAGE } from '../../app/(opentelemetry-hub-routes)/constants'

export default function AllBlogs({
  blogs,
  pageNumber = 1,
  pageRoute = 'blog',
}: {
  blogs: any[]
  pageNumber?: number
  pageRoute?: string
}) {
  const initialDisplayPosts = blogs.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(blogs.length / POSTS_PER_PAGE),
    pageRoute,
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
