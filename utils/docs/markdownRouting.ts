export const normalizeDocsSlugFromPathname = (pathname: string): string => {
  const withoutPrefix = pathname.replace(/^\/docs\/?/, '')
  return withoutPrefix.replace(/\/+$/, '').replace(/\.md$/, '')
}

// Agents commonly fetch docs by appending `.md` to the page URL
// (e.g. /docs/introduction.md) rather than sending an `Accept: text/markdown`
// header. Treat that suffix as an explicit markdown request so those requests
// resolve to markdown instead of 404-ing.
export const hasDocsMarkdownExtension = (pathname: string): boolean => {
  const normalized = pathname.replace(/\/+$/, '')
  return normalized.startsWith('/docs/') && normalized.endsWith('.md')
}

export const shouldRewriteDocsToMarkdown = (
  pathname: string,
  prefersMarkdown: boolean
): boolean => {
  const isDocsPath = pathname === '/docs' || pathname.startsWith('/docs/')
  const isDocsSitemapPath = pathname === '/docs/sitemap.md' || pathname === '/docs/sitemap.md/'
  const isInternalMarkdownPath =
    pathname === '/api/docs-markdown' || pathname.startsWith('/api/docs-markdown/')

  if (!isDocsPath || isDocsSitemapPath || isInternalMarkdownPath) {
    return false
  }

  return prefersMarkdown || hasDocsMarkdownExtension(pathname)
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
