const URL_PREFIX_TO_COLLECTION: { prefix: string; collectionName: string }[] = [
  { prefix: '/opentelemetry/', collectionName: 'opentelemetries' },
  { prefix: '/faqs/', collectionName: 'faqs' },
  { prefix: '/case-study/', collectionName: 'case-studies' },
  { prefix: '/comparisons/', collectionName: 'comparisons' },
]

export type CmsPathInfo = {
  urlPath: string
  contentKey: string
  collectionName: string
}

export function parseCmsUrlPath(urlPath: string): CmsPathInfo | null {
  const normalized = urlPath.startsWith('/') ? urlPath : `/${urlPath}`

  for (const { prefix, collectionName } of URL_PREFIX_TO_COLLECTION) {
    if (normalized.startsWith(prefix)) {
      let contentKey = normalized.slice(prefix.length).replace(/\/$/, '')
      if (!contentKey) {
        return null
      }
      return {
        urlPath: normalized,
        contentKey,
        collectionName,
      }
    }
  }

  return null
}

export function getStrapiDocumentCacheTags(info: CmsPathInfo): string[] {
  const { collectionName, contentKey } = info
  return [`${collectionName}-${contentKey}`, `mdx-content-${contentKey}`]
}
