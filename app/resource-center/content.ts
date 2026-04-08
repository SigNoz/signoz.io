import { allBlogs, allGuides } from 'contentlayer/generated'
import type { Blog, Guide } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { CoreContent } from 'pliny/utils/contentlayer'

export type ResourceCenterBlog = CoreContent<Blog>
export type ResourceCenterGuide = CoreContent<Guide>

export function getResourceCenterBlogs(): ResourceCenterBlog[] {
  return allCoreContent(sortPosts(allBlogs))
}

export function getResourceCenterGuides(): ResourceCenterGuide[] {
  return allCoreContent(sortPosts(allGuides))
}
