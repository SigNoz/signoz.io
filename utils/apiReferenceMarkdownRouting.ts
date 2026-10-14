import { parseSemverTag } from '@/utils/semverTags'

/**
 * Content negotiation for /api-reference URLs.
 *
 * The index page and every versioned page serve three representations:
 * - HTML (the interactive viewer) for plain requests
 * - markdown (built from the spec) for `.md` URLs and `Accept: text/markdown`
 * - the raw OpenAPI YAML for versioned URLs with a YAML Accept header
 *
 * Keep this module dependency-light so tests can load it via loadTsModule.
 */

export const API_REFERENCE_MARKDOWN_PATH = '/api-reference.md'

export type ApiReferencePath =
  { kind: 'index' } | { kind: 'version'; version: string; explicitMarkdown: boolean }

const stripTrailingSlashes = (pathname: string): string => pathname.replace(/\/+$/, '') || '/'

/**
 * Classify a pathname as the api-reference index, a single-segment versioned
 * page (`v0.139.0`, `latest`, optionally with a `.md` twin suffix), or null
 * for everything else — including nested paths and non-version segments.
 */
export function parseApiReferencePath(pathname: string): ApiReferencePath | null {
  const normalized = stripTrailingSlashes(pathname)

  if (normalized === '/api-reference') return { kind: 'index' }
  if (!normalized.startsWith('/api-reference/')) return null

  const explicitMarkdown = normalized.endsWith('.md')
  const version = normalized.slice('/api-reference/'.length).replace(/\.md$/, '')

  if (!version || version.includes('/')) return null
  if (version !== 'latest' && parseSemverTag(version) === null) return null

  return { kind: 'version', version, explicitMarkdown }
}

const YAML_ACCEPT_PATTERN = /(?:application|text)\/(?:x-)?yaml|application\/vnd\.oai\.openapi/i

const prefersYaml = (acceptHeader: string): boolean => YAML_ACCEPT_PATTERN.test(acceptHeader)

const prefersMarkdown = (acceptHeader: string): boolean =>
  acceptHeader.toLowerCase().includes('text/markdown')

/**
 * The rewrite target for an api-reference request, or null for a passthrough.
 *
 * Precedence: an explicit `.md` suffix always means markdown; otherwise the
 * Accept header picks YAML (the raw spec) or markdown. Keyed on the request
 * alone — never on user-agent, which caches do not vary on.
 */
export function resolveApiReferenceRewrite(pathname: string, acceptHeader: string): string | null {
  const parsed = parseApiReferencePath(pathname)
  if (!parsed) return null

  if (parsed.kind === 'index') {
    return prefersMarkdown(acceptHeader) ? API_REFERENCE_MARKDOWN_PATH : null
  }

  const markdownPath = `/api/api-reference-markdown/${encodeURIComponent(parsed.version)}`

  if (parsed.explicitMarkdown) return markdownPath
  if (prefersYaml(acceptHeader)) {
    return `/api/api-reference-openapi/${encodeURIComponent(parsed.version)}`
  }
  if (prefersMarkdown(acceptHeader)) return markdownPath

  return null
}

/**
 * True for api-reference URLs that serve more than one representation, so
 * CDN/proxy caches must vary on the Accept header. `.md` twins are fixed
 * markdown resources and negotiate nothing.
 */
export function isNegotiatedApiReferencePath(pathname: string): boolean {
  const parsed = parseApiReferencePath(pathname)
  if (!parsed) return false
  return parsed.kind === 'index' || !parsed.explicitMarkdown
}
