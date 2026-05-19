import { slug } from 'github-slugger'

/**
 * Compute tag counts from a list of blog posts.
 * Returns a record mapping slugified tag names to their occurrence count.
 */
export function computeTagCounts(
  posts: { tags?: string[]; draft?: boolean }[]
): Record<string, number> {
  const tagCounts: Record<string, number> = {}

  for (const post of posts) {
    if (post.tags && post.draft !== true) {
      for (const t of post.tags) {
        const formattedTag = slug(t)
        tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1
      }
    }
  }

  return tagCounts
}
