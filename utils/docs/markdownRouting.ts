export const normalizeDocsSlugFromPathname = (pathname: string): string => {
  const withoutPrefix = pathname.replace(/^\/docs\/?/, '')
  return withoutPrefix.replace(/\/+$/, '')
}

export const shouldRewriteDocsToMarkdown = (
  pathname: string,
  prefersMarkdown: boolean
): boolean => {
  const isDocsPath = pathname === '/docs' || pathname.startsWith('/docs/')
  const isDocsSitemapPath = pathname === '/docs/sitemap.md' || pathname === '/docs/sitemap.md/'
  const isInternalMarkdownPath =
    pathname === '/api/docs-markdown' || pathname.startsWith('/api/docs-markdown/')

  return isDocsPath && !isDocsSitemapPath && !isInternalMarkdownPath && prefersMarkdown
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

  return slugFromParams(segments) || 'introduction'
}
