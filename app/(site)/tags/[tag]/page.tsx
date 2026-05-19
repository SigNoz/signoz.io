import { slug } from 'github-slugger'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/(site)/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchAllBlogsForPage } from '@/utils/cachedData'
import { computeTagCounts } from '@/utils/tagCounts'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

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
        'application/rss+xml': `${siteMetadata.siteUrl}/rss/tags/${tag}`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  return []
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)

  const allBlogPosts = await fetchAllBlogsForPage()
  const tagCounts = computeTagCounts(allBlogPosts)

  const filteredPosts = allBlogPosts
    .filter(
      (post) => post.draft !== true && post.tags && post.tags.map((t) => slug(t)).includes(tag)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (filteredPosts.length === 0) {
    notFound()
  }

  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return <ListLayout posts={filteredPosts} title={title} tagCounts={tagCounts} />
}
