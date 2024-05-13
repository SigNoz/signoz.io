import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import BlogPostCard from '../Shared/BlogPostCard'

export default function Comparisons() {
  const posts = allCoreContent(sortPosts(allBlogs))

  const primaryFeaturedBlogs = posts.slice(0, 2)
  const secondaryFeaturedBlogs = posts.slice(2, 12)

  return (
    <div className="comparisons">
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
