// Content utility functions - replacements for pliny/utils/contentlayer

interface ContentWithDate {
  date: string
  draft?: boolean
}

interface ContentWithBody {
  body?: { raw: string; code: string }
}

/**
 * Sort content by date (newest first)
 */
export function sortPosts<T extends ContentWithDate>(posts: T[]): T[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Strip body/code from content, returning just metadata
 */
export function coreContent<T extends ContentWithBody>(content: T): Omit<T, 'body'> {
  const { body, ...rest } = content
  return rest
}

/**
 * Filter out drafts and strip body from all content
 */
export function allCoreContent<T extends ContentWithDate & ContentWithBody>(
  contents: T[]
): Omit<T, 'body'>[] {
  return contents.filter((c) => !c.draft).map((c) => coreContent(c))
}

/**
 * CoreContent type - content without body
 */
export type CoreContent<T> = Omit<T, 'body'>
