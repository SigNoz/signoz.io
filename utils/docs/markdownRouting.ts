export const MARKDOWN_EXTENSION = '.md'

const DOCS_SITEMAP_PATHS = new Set(['/docs/sitemap.md', '/docs/sitemap.md/'])

const stripTrailingSlashes = (value: string): string => value.replace(/\/+$/, '')

/**
 * Removes a trailing `.md` from a pathname so `/docs/introduction.md` and
 * `/docs/introduction` resolve to the same doc.
 */
export const stripMarkdownExtension = (pathname: string): string => {
  const withoutTrailingSlash = stripTrailingSlashes(pathname)
  return withoutTrailingSlash.endsWith(MARKDOWN_EXTENSION)
    ? withoutTrailingSlash.slice(0, -MARKDOWN_EXTENSION.length)
    : withoutTrailingSlash
}

export const hasMarkdownExtension = (pathname: string): boolean =>
  stripTrailingSlashes(pathname).endsWith(MARKDOWN_EXTENSION)

export const normalizeDocsSlugFromPathname = (pathname: string): string => {
  const withoutExtension = stripMarkdownExtension(pathname)
  const withoutPrefix = withoutExtension.replace(/^\/docs\/?/, '')
  return stripTrailingSlashes(withoutPrefix)
}

export const shouldRewriteDocsToMarkdown = (
  pathname: string,
  prefersMarkdown: boolean
): boolean => {
  // `/docs/sitemap.md` has its own route handler and must not be treated as a doc slug.
  if (DOCS_SITEMAP_PATHS.has(pathname)) {
    return false
  }

  const isInternalMarkdownPath =
    pathname === '/api/docs-markdown' || pathname.startsWith('/api/docs-markdown/')
  if (isInternalMarkdownPath) {
    return false
  }

  // Strip the extension first so `/docs.md` and `/docs/foo.md` both register as docs paths.
  const basePathname = stripMarkdownExtension(pathname)
  const isDocsPath = basePathname === '/docs' || basePathname.startsWith('/docs/')
  if (!isDocsPath) {
    return false
  }

  // Agents reach markdown either by asking for it (Accept header) or by the
  // `.md` URL suffix, which is the convention they try first.
  return prefersMarkdown || hasMarkdownExtension(pathname)
}

export const buildDocsMarkdownRewritePath = (pathname: string): string => {
  const docsSlug = normalizeDocsSlugFromPathname(pathname)
  return docsSlug ? `/api/docs-markdown/${docsSlug}` : '/api/docs-markdown'
}

/**
 * Normalize catch-all `[...slug]` params into a docs path.
 * Decodes per segment so a single encoded segment like `ai%2Fsignoz-mcp-server`
 * becomes `ai/signoz-mcp-server` (decodeURI leaves `%2F` intact).
 */
export const slugFromParams = (slug: string[]): string =>
  slug
    .map((segment) => {
      try {
        return decodeURIComponent(segment).trim()
      } catch {
        // Malformed percent-encoding — keep the raw segment so content lookup
        // 404s instead of throwing URIError from generateMetadata.
        return segment.trim()
      }
    })
    .filter(Boolean)
    .join('/')

export const resolveDocsMarkdownSlug = (segments?: string[]): string => {
  if (!segments || segments.length === 0) {
    return 'introduction'
  }

  return stripMarkdownExtension(slugFromParams(segments)) || 'introduction'
}
