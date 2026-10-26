import type { RenderedAuthor } from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'

type AuthorDetailLike = {
  name?: string
  url?: string
}

type AuthorDirectory = Record<string, { name?: string; url?: string; image_url?: string }>

type ReadingTimeContent = {
  readingTime?: { text?: string; minutes?: number }
}

export function buildRenderedAuthors(
  authorDetails: AuthorDetailLike[] | undefined,
  authors: string[] | undefined,
  directory: AuthorDirectory
): RenderedAuthor[] {
  if (authorDetails && authorDetails.length > 0) {
    return authorDetails
      .map((detail, idx) => {
        const slug = authors?.[idx]
        const fallbackProfile = slug ? directory[slug] : undefined

        const name = detail.name || fallbackProfile?.name

        if (!name) return null

        return {
          name,
          url: detail.url || fallbackProfile?.url,
          image: fallbackProfile?.image_url,
        }
      })
      .filter(Boolean) as RenderedAuthor[]
  }

  if (authors && authors.length > 0) {
    return authors
      .map((slug) => {
        const profile = directory[slug]
        if (!profile?.name) return null
        return {
          name: profile.name,
          url: profile.url,
          image: profile.image_url,
        }
      })
      .filter(Boolean) as RenderedAuthor[]
  }

  return []
}

export function getReadingTimeText(content: ReadingTimeContent) {
  if (content.readingTime) {
    return (
      content.readingTime.text ||
      (content.readingTime.minutes ? `${Math.ceil(content.readingTime.minutes)} min read` : null)
    )
  }
  return null
}
