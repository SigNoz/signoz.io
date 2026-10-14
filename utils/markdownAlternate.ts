import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

type Alternates = NonNullable<Metadata['alternates']>

export const RSS_ALTERNATE_TYPES = {
  'application/rss+xml': `${siteMetadata.siteUrl}/rss/`,
}

/** Absolute `.md` URL for a page path, e.g. /docs/install/ -> https://signoz.io/docs/install.md */
export const buildMarkdownAlternateUrl = (pathname: string): string => {
  const normalized = `/${pathname.replace(/^\/+/, '').replace(/\/+$/, '')}`
  return `${siteMetadata.siteUrl}${normalized}.md`
}

/**
 * Add a `<link rel="alternate" type="text/markdown">` pointing at the page's
 * markdown version. A page's `alternates` replaces the root layout's, so the
 * layout defaults (relative canonical and RSS feed) are kept unless overridden.
 */
export const withMarkdownAlternate = (
  pathname: string,
  alternates: Alternates = {}
): Alternates => ({
  canonical: './',
  ...alternates,
  types: {
    ...RSS_ALTERNATE_TYPES,
    ...alternates.types,
    'text/markdown': buildMarkdownAlternateUrl(pathname),
  },
})
