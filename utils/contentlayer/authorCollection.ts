// Author collection utilities
// Authors are stored directly in constants/authors.json, not processed by content pipeline

export interface Author {
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

let authorsPromise: Promise<Author[]> | null = null

export async function getAllAuthors(): Promise<Author[]> {
  if (!authorsPromise) {
    authorsPromise = import('../../constants/authors.json').then(
      (module) => module.default as Author[]
    )
  }
  return authorsPromise
}

export async function getAuthorByName(name: string): Promise<Author | undefined> {
  const authors = await getAllAuthors()
  return authors.find((author) => author.name === name)
}
