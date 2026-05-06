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

export const resolveDocsMarkdownSlug = (segments?: string[]): string => {
  if (!segments || segments.length === 0) {
    return 'introduction'
  }

  const joined = segments
    .map((segment) => decodeURIComponent(segment).trim())
    .filter(Boolean)
    .join('/')

  return joined || 'introduction'
}
