// Author collection utilities
// Authors are stored directly in constants/authors.json, not processed by content pipeline

import type { Author } from '@/types/content'

let authorsPromise: Promise<Author[]> | null = null

export async function getAllAuthors(): Promise<Author[]> {
  if (!authorsPromise) {
    authorsPromise = import('../../constants/authors.json').then((module) => {
      const authorsDict = module.default as Record<string, Omit<Author, 'slug'>>
      return Object.entries(authorsDict).map(([slug, author]) => ({
        slug,
        ...author,
      }))
    })
  }
  return authorsPromise
}

export async function getAuthorByName(name: string): Promise<Author | undefined> {
  const authors = await getAllAuthors()
  return authors.find((author) => author.name === name)
}
