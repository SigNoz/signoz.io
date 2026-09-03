import { parseSemverTag } from '@/utils/semverTags'

/**
 * The release tag in `/api-reference/<tag>`, or null when the path is not a
 * single-segment versioned api-reference URL. A trailing `.md` is accepted so
 * the markdown twin resolves to the same tag.
 */
export function parseApiReferenceVersionPath(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  if (!normalized.startsWith('/api-reference/')) return null

  const rest = normalized.slice('/api-reference/'.length).replace(/\.md$/, '')
  if (!rest || rest.includes('/')) return null
  if (rest === 'latest') return 'latest'

  return parseSemverTag(rest) !== null ? rest : null
}

const isYamlAccept = (accept: string): boolean =>
  /(?:application|text)\/(?:x-)?yaml/i.test(accept) ||
  /application\/vnd\.oai\.openapi/i.test(accept)

/**
 * Versioned api-reference URLs keep serving the raw spec, but only when the
 * client actually asked for YAML. Previously any `Accept: text/markdown` from
 * a bot got YAML back — the wrong media type for the request, and dependent on
 * user-agent sniffing. Markdown requests now go to the markdown twin instead;
 * the spec stays at /api/api-reference-openapi/<tag>, /openapi.yaml and here.
 */
export function shouldRewriteApiReferenceToOpenAPISpec(pathname: string, accept: string): boolean {
  if (!isYamlAccept(accept)) return false

  return parseApiReferenceVersionPath(pathname) !== null
}

/** `/api-reference/<tag>.md`, or `/api-reference/<tag>` asking for markdown. */
export function shouldRewriteApiReferenceVersionToMarkdown(
  pathname: string,
  prefersMarkdown: boolean
): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const hasMarkdownExtension = normalized.endsWith('.md')

  if (!prefersMarkdown && !hasMarkdownExtension) return false

  return parseApiReferenceVersionPath(pathname) !== null
}

export function buildApiReferenceVersionMarkdownRewritePath(pathname: string): string {
  const version = parseApiReferenceVersionPath(pathname)
  return `/api/api-reference-markdown/${encodeURIComponent(version || 'latest')}`
}

export function buildApiReferenceOpenAPISpecRewritePath(pathname: string): string {
  const version = parseApiReferenceVersionPath(pathname)
  return `/api/api-reference-openapi/${encodeURIComponent(version || 'latest')}`
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
