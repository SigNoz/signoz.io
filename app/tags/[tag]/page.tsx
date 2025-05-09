import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
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

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  // Return 404 for empty tag pages
  if (filteredPosts.length === 0) {
    notFound() // Next.js function to return 404
  }

  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return <ListLayout posts={filteredPosts} title={title} />
}
