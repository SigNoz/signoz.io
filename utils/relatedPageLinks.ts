import siteMetadata from '@/data/siteMetadata'
import RELATED_PAGE_LINKS from '@/constants/relatedPageLinks.json'

export type RelatedPageLinksEntry = {
  title: string
  links: string[]
}

const MAX_RELATED_PAGE_LINKS = 3

const SITE_TITLE_SUFFIX = ` | ${siteMetadata.title}`

export const normalizePagePath = (pathOrUrl: string): string =>
  new URL(pathOrUrl, siteMetadata.siteUrl).pathname
    .replace(/\.md$/i, '')
    .replace(/\/+$/, '')
    .toLowerCase() || '/'

const toLinkKey = (url: string): string => {
  const { host } = new URL(url, siteMetadata.siteUrl)
  return `${host}${normalizePagePath(url)}`
}

export const stripSiteTitleSuffix = (title: string): string =>
  title.endsWith(SITE_TITLE_SUFFIX) ? title.slice(0, -SITE_TITLE_SUFFIX.length) : title

export const selectRelatedLinks = (pagePath: string, candidates: string[]): string[] => {
  const seen = new Set([toLinkKey(pagePath)])
  const links: string[] = []

  for (const candidate of candidates) {
    const url = candidate.trim()
    if (!url) continue

    const key = toLinkKey(url)
    if (seen.has(key)) continue

    seen.add(key)
    links.push(url)
    if (links.length === MAX_RELATED_PAGE_LINKS) break
  }

  return links
}

const LINKS_BY_PATH = new Map(
  Object.entries(RELATED_PAGE_LINKS).map(([path, links]) => [normalizePagePath(path), links])
)

export const getRelatedPageLinks = (
  pagePath: string,
  title: string | null | undefined
): RelatedPageLinksEntry | null => {
  const pageTitle = title?.trim()
  const candidates = LINKS_BY_PATH.get(normalizePagePath(pagePath))
  if (!pageTitle || !candidates) return null

  const links = selectRelatedLinks(pagePath, candidates)
  return links.length > 0 ? { title: pageTitle, links } : null
}
