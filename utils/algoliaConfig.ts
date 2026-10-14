export type AlgoliaConfig = { appId: string; apiKey: string; indexName: string }

/**
 * Server-side Algolia search config. Prefers the server-only search key and
 * falls back to the public one the search UI uses.
 */
export const getAlgoliaConfig = (): AlgoliaConfig | null => {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey =
    process.env.ALGOLIA_SEARCH_API_KEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

  if (!appId || !apiKey || !indexName) {
    return null
  }

  return { appId, apiKey, indexName }
}

export const hasAlgoliaConfig = (): boolean => getAlgoliaConfig() !== null

export const buildAlgoliaQueryUrl = ({ appId, indexName }: AlgoliaConfig): string =>
  `https://${appId}-dsn.algolia.net/1/indexes/${encodeURIComponent(indexName)}/query`

export const buildAlgoliaHeaders = ({ appId, apiKey }: AlgoliaConfig): Record<string, string> => ({
  'Content-Type': 'application/json',
  'X-Algolia-API-Key': apiKey,
  'X-Algolia-Application-Id': appId,
})
