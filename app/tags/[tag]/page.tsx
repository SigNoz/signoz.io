import { slug } from 'github-slugger'
import type { CoreContent, Blog, BlogMeta } from '@/types/content'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { getAllBlogsMeta } from '@/utils/contentlayer/blogCollection'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false
export const dynamic = 'force-static'

/**
 * Sort posts by date in descending order (newest first).
 * Local implementation that doesn't require _raw field like pliny's sortPosts.
 */
function sortPostsByDate<T extends { date: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  })
}

/**
 * Filter out drafts and return core content fields.
 * Local implementation that doesn't require _raw field like pliny's allCoreContent.
 */
function filterAndMapPosts(posts: BlogMeta[]): CoreContent<Blog>[] {
  return posts.filter((post) => !post.draft).map((post) => post as unknown as CoreContent<Blog>)
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  // Only generate pages for tags that have at least one post
  const paths = tagKeys
    .filter((tag) => tagCounts[tag] > 0)
    .map((tag) => ({
      tag: encodeURI(tag),
    }))
  return paths
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const allBlogs = await getAllBlogsMeta()
  const filteredPosts = filterAndMapPosts(
    sortPostsByDate(
      allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag))
    )
  )

  // Return 404 for empty tag pages
  if (filteredPosts.length === 0) {
    notFound() // Next.js function to return 404
  }

  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return <ListLayout posts={filteredPosts} title={title} />
}
