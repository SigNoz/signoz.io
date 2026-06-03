export function getAuthorKey(author: unknown): string | undefined {
  if (typeof author === 'string' && author.length > 0) return author
  if (!author || typeof author !== 'object') return undefined

  const obj = author as Record<string, unknown>
  const key = obj.key || obj.name
  return typeof key === 'string' && key.length > 0 ? key : undefined
}

function getTagValue(tag: unknown): string | undefined {
  if (typeof tag === 'string' && tag.length > 0) return tag
  if (!tag || typeof tag !== 'object') return undefined

  const obj = tag as Record<string, unknown>
  const value = obj.value || obj.key
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export function getAuthorKeys(content: {
  authors?: unknown[] | null
  [key: string]: any
}): string[] {
  if (!Array.isArray(content.authors)) return []
  return content.authors.map(getAuthorKey).filter((k): k is string => k !== undefined)
}

export function getTagValues(content: { tags?: unknown[] | null; [key: string]: any }): string[] {
  if (!Array.isArray(content.tags)) return []
  return content.tags.map(getTagValue).filter((v): v is string => v !== undefined)
}

export function mapRelationKeys(items: unknown): string[] | undefined {
  if (!Array.isArray(items)) return undefined
  return items
    .map((item: unknown) => (typeof item === 'string' ? item : (item as any)?.key))
    .filter((k): k is string => typeof k === 'string' && k.length > 0)
}

export function mapTaxonomyValues(items: unknown): string[] | undefined {
  if (!Array.isArray(items)) return undefined
  return items.map(getTagValue).filter((v): v is string => v !== undefined)
}
