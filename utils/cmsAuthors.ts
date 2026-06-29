import { unstable_cache } from 'next/cache'
import qs from 'qs'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

const API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL

export type CMSAuthor = {
  key: string
  name: string
  title: string
  url: string
  image_url: string
}

export type AuthorDirectory = Record<string, CMSAuthor>

async function fetchAuthorsFromCMS(): Promise<AuthorDirectory> {
  if (!API_URL) {
    return {}
  }

  const directory: AuthorDirectory = {}
  let page = 1
  const pageSize = 100
  let maxPages = 50

  while (page <= maxPages) {
    const queryParams = qs.stringify(
      {
        fields: ['key', 'name', 'title', 'url', 'image_url'],
        pagination: { page, pageSize },
      },
      { encode: false, addQueryPrefix: true, arrayFormat: 'repeat' }
    )

    const response = await fetch(`${API_URL}/api/authors${queryParams}`, {
      cache: 'force-cache',
      next: { tags: ['authors-list'] },
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const msg = await response.text()
      throw new Error(`Failed to fetch authors: ${response.status} ${msg}`)
    }

    const data = await response.json()
    const authors = data?.data || []

    for (const author of authors) {
      if (author.key) {
        directory[author.key] = {
          key: author.key,
          name: author.name || author.key,
          title: author.title || '',
          url: author.url || '',
          image_url: author.image_url || '',
        }
      }
    }

    const { pageCount } = data?.meta?.pagination || {}
    if (!pageCount || page >= pageCount) break
    // If actual page count exceeds safety cap, extend to actual count
    if (pageCount > maxPages) maxPages = pageCount
    page++
  }

  return directory
}

export const getCachedAuthors = unstable_cache(fetchAuthorsFromCMS, ['cms-authors-directory'], {
  tags: ['authors-list'],
  revalidate: CMS_REVALIDATE_INTERVAL,
})
