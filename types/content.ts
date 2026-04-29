// Re-export all generated content types
export * from './content-generated/types'

// Author type (not generated - loaded from constants/authors.json)
export interface Author {
  slug: string
  name: string
  title?: string
  url?: string
  image_url?: string
  avatar?: string
  occupation?: string
  company?: string
  email?: string
  twitter?: string
  linkedin?: string
  github?: string
}

// Utility types for contentUtils.ts
export type CoreContent<T> = Omit<T, 'body'>

export interface ContentWithDate {
  date: string
  draft?: boolean
}

export interface ContentWithBody {
  body?: { raw: string; code: string }
}
