/**
 * Site-wide agent markdown routing (non-docs surfaces).
 *
 * Agents fetch pages as markdown either by appending `.md` to the page URL
 * (e.g. /blog/some-post.md, /pricing.md) or by sending `Accept: text/markdown`.
 * Docs paths are handled separately by `utils/docs/markdownRouting.ts`.
 *
 * Two pipelines:
 * - CMS/MDX-backed content sections (blog, comparisons, guides, opentelemetry,
 *   faqs, customers) rewrite to /api/content-markdown/<section>/<slug>, which
 *   renders the raw MDX source through the agent markdown renderer.
 * - Every other page (pricing, feature pages, alternatives, home, ...) rewrites
 *   to /api/page-markdown/<path>, which converts the page's own server-rendered
 *   HTML to markdown.
 *
 * Keep this module dependency-free so tests can load it via loadTsModule.
 */

// Marks the /api/page-markdown internal self-fetch so the proxy never
// re-enters markdown routing for it.
export const AGENT_MARKDOWN_SELF_FETCH_HEADER = 'x-agent-markdown-self-fetch'

export const CONTENT_MARKDOWN_SECTIONS = [
  'blog',
  'comparisons',
  'guides',
  'opentelemetry',
  'faqs',
  'customers',
] as const

export type ContentMarkdownSection = (typeof CONTENT_MARKDOWN_SECTIONS)[number]

const stripTrailingSlashes = (pathname: string): string => pathname.replace(/\/+$/, '') || '/'

export const hasMarkdownExtension = (pathname: string): boolean =>
  stripTrailingSlashes(pathname).endsWith('.md')

const stripMarkdownExtension = (pathname: string): string => {
  const normalized = stripTrailingSlashes(pathname)
  return normalized.endsWith('.md') ? normalized.slice(0, -'.md'.length) : normalized
}

const isPathWithinPrefix = (pathname: string, prefix: string): boolean =>
  pathname === prefix || pathname.startsWith(`${prefix}/`)

export type ParsedContentMarkdownPath = {
  section: ContentMarkdownSection
  slug: string
}

/**
 * Match `/<section>/<slug>` paths for CMS/MDX-backed content sections.
 * Section index pages (e.g. /blog) fall through to the generic page pipeline.
 */
export const parseContentMarkdownPath = (pathname: string): ParsedContentMarkdownPath | null => {
  const normalized = stripMarkdownExtension(pathname)

  for (const section of CONTENT_MARKDOWN_SECTIONS) {
    const prefix = `/${section}/`
    if (!normalized.startsWith(prefix)) continue

    const slug = normalized.slice(prefix.length)
    if (slug) {
      return { section, slug }
    }
  }

  return null
}

export const shouldRewriteContentToMarkdown = (
  pathname: string,
  prefersMarkdown: boolean
): boolean => {
  if (!prefersMarkdown && !hasMarkdownExtension(pathname)) {
    return false
  }

  return parseContentMarkdownPath(pathname) !== null
}

export const buildContentMarkdownRewritePath = (pathname: string): string => {
  const parsed = parseContentMarkdownPath(pathname)
  if (!parsed) {
    return '/api/content-markdown'
  }

  return `/api/content-markdown/${parsed.section}/${parsed.slug}`
}

// Paths with their own markdown/negotiation handling, or that must never be
// rewritten to the generic page pipeline.
const PAGE_MARKDOWN_EXCLUDED_PREFIXES = [
  '/api',
  '/docs',
  '/docs-onboarding',
  '/api-reference',
  '/.well-known',
]

// Real .md resources served by their own routes; the suffix is part of the
// path, not a markdown-alternate marker.
const MARKDOWN_ROUTE_PATHS = new Set(['/skill.md', '/api-reference.md'])

/**
 * File-like paths (e.g. /llms.txt, /sitemap.xml, /favicon.ico) are real
 * resources, not HTML pages — a dot in the final segment that is not the
 * trailing `.md` marker means "leave this alone".
 */
const isFileLikePath = (pathname: string): boolean => {
  // Markdown sitemaps (e.g. /blogs/sitemap.md) are real routes, not `.md`
  // aliases of an HTML page.
  if (stripTrailingSlashes(pathname).endsWith('/sitemap.md')) {
    return true
  }

  const normalized = stripMarkdownExtension(pathname)
  const lastSegment = normalized.split('/').pop() || ''
  return lastSegment.includes('.')
}

export const shouldRewritePageToMarkdown = (
  pathname: string,
  prefersMarkdown: boolean
): boolean => {
  if (!prefersMarkdown && !hasMarkdownExtension(pathname)) {
    return false
  }

  const normalized = stripTrailingSlashes(pathname)

  if (MARKDOWN_ROUTE_PATHS.has(normalized)) {
    return false
  }

  if (PAGE_MARKDOWN_EXCLUDED_PREFIXES.some((prefix) => isPathWithinPrefix(normalized, prefix))) {
    return false
  }

  // Content sections with a slug are handled by the content markdown pipeline.
  if (parseContentMarkdownPath(pathname) !== null) {
    return false
  }

  if (isFileLikePath(pathname)) {
    return false
  }

  return true
}

export const buildPageMarkdownRewritePath = (pathname: string): string => {
  const normalized = stripMarkdownExtension(pathname)
  return normalized === '/' ? '/api/page-markdown' : `/api/page-markdown${normalized}`
}

/**
 * True when a URL serves both HTML and markdown representations, so cached
 * responses must vary on the Accept header.
 */
export const servesMarkdownAlternate = (pathname: string): boolean =>
  shouldRewriteContentToMarkdown(pathname, true) || shouldRewritePageToMarkdown(pathname, true)
