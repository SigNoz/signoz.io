import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/(site)/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchAllBlogsForPage } from '@/utils/cachedData'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

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

// ISR: tag pages generated on-demand at runtime.
// Required by Next.js for ISR to work with dynamicParams=true.
// See: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = async () => {
  return []
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  const blogs = await fetchAllBlogsForPage()
  const filteredPosts = allCoreContent(
    sortPosts(blogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  // Return 404 for empty tag pages
  if (filteredPosts.length === 0) {
    notFound()
  }

  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return <ListLayout posts={filteredPosts} title={title} />
}
