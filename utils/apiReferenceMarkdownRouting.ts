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

export const API_REFERENCE_MARKDOWN_PATH = '/api-reference.md'

const normalizePath = (pathname: string): string => pathname.replace(/\/+$/, '') || '/'

/** The /api-reference index page, which has its own markdown twin route. */
export function isApiReferenceIndexPath(pathname: string): boolean {
  return normalizePath(pathname) === '/api-reference'
}

/**
 * `/api-reference` renders the spec in an interactive viewer, so markdown
 * requests are served the spec-derived index at /api-reference.md instead of
 * the generic HTML-to-markdown pipeline.
 */
export function shouldRewriteApiReferenceIndexToMarkdown(
  pathname: string,
  prefersMarkdown: boolean
): boolean {
  return prefersMarkdown && isApiReferenceIndexPath(pathname)
}
