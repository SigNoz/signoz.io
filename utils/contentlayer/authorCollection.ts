import type { Authors } from '../../.contentlayer/generated/types'

let authorsPromise: Promise<Authors[]> | null = null

export async function getAllAuthors() {
  if (!authorsPromise) {
    authorsPromise = import('../../.contentlayer/generated/Authors/_index.json').then(
      (module) => module.default as Authors[]
    )
  }

  return authorsPromise
}
