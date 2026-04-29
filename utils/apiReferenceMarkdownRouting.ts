import { parseSemverTag } from '@/utils/semverTags'

export function shouldRewriteApiReferenceToOpenAPISpec(
  pathname: string,
  prefersMarkdown: boolean,
  isBot: boolean
): boolean {
  if (!isBot || !prefersMarkdown) return false

  const normalized = pathname.replace(/\/+$/, '') || '/'
  if (normalized === '/api-reference') return false
  if (!normalized.startsWith('/api-reference/')) return false

  const rest = normalized.slice('/api-reference/'.length)
  if (!rest || rest.includes('/')) return false
  if (rest === 'latest') return true
  return parseSemverTag(rest) !== null
}

export function buildApiReferenceOpenAPISpecRewritePath(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const version = normalized.slice('/api-reference/'.length)
  return `/api/api-reference-openapi/${encodeURIComponent(version)}`
}
