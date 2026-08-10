import type { Element as HastElement, Root as HastRoot, RootContent as HastContent } from 'hast'
import { getTextContent, hastToMarkdown } from './docs/markdownCore'
import { buildMarkdownDocument } from './docs/buildMarkdownDocument'

/**
 * Convert a server-rendered HTML page (pricing, feature pages, listings, ...)
 * into agent-friendly markdown. Used by /api/page-markdown for pages that have
 * no MDX source.
 */

// Page chrome and non-content elements dropped before conversion. Header/nav/
// footer are shared shell; forms and media embeds carry no prose.
const CHROME_TAG_NAMES = new Set([
  'script',
  'style',
  'noscript',
  'template',
  'header',
  'nav',
  'footer',
  'aside',
  'iframe',
  'video',
  'audio',
  'canvas',
  'form',
  'input',
  'select',
  'textarea',
  'dialog',
])

const isHastElement = (node: HastContent): node is HastElement => node.type === 'element'

const hasMarkdownIgnoreAttribute = (node: HastElement): boolean =>
  node.properties?.['data-markdown-ignore'] != null || node.properties?.dataMarkdownIgnore != null

const isAriaHidden = (node: HastElement): boolean =>
  node.properties?.ariaHidden === 'true' || node.properties?.['aria-hidden'] === 'true'

const pruneChrome = (node: { children?: HastContent[] }) => {
  if (!Array.isArray(node.children)) return

  node.children = node.children.filter((child) => {
    // React emits <!-- --> separators between text nodes; drop all comments.
    if (child.type === 'comment') return false
    if (!isHastElement(child)) return true
    return (
      !CHROME_TAG_NAMES.has(child.tagName) &&
      !hasMarkdownIgnoreAttribute(child) &&
      !isAriaHidden(child)
    )
  })

  for (const child of node.children) {
    if (isHastElement(child)) pruneChrome(child)
  }
}

const findFirstElement = (
  node: { children?: HastContent[] },
  tagName: string
): HastElement | null => {
  for (const child of node.children || []) {
    if (!isHastElement(child)) continue
    if (child.tagName === tagName) return child
    const found = findFirstElement(child, tagName)
    if (found) return found
  }
  return null
}

const getMetaDescription = (head: HastElement | null): string | undefined => {
  if (!head) return undefined

  for (const child of head.children || []) {
    if (!isHastElement(child) || child.tagName !== 'meta') continue
    if (child.properties?.name !== 'description') continue
    const content = child.properties?.content
    if (typeof content === 'string' && content.trim()) return content.trim()
  }

  return undefined
}

const getCanonicalUrl = (head: HastElement | null): string | undefined => {
  if (!head) return undefined

  for (const child of head.children || []) {
    if (!isHastElement(child) || child.tagName !== 'link') continue
    if (child.properties?.rel == null) continue
    const rel = Array.isArray(child.properties.rel) ? child.properties.rel : [child.properties.rel]
    if (!rel.map(String).includes('canonical')) continue
    const href = child.properties?.href
    if (typeof href === 'string' && href.trim()) return href.trim()
  }

  return undefined
}

export type PageAgentMarkdownOptions = {
  /** Fallback when the page head has no <link rel="canonical">. */
  fallbackCanonicalUrl?: string
}

export async function renderPageHtmlToAgentMarkdown(
  html: string,
  options: PageAgentMarkdownOptions = {}
): Promise<string | null> {
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const document = unified().use(rehypeParse, { fragment: false }).parse(html) as HastRoot

  const head = findFirstElement(document, 'head')
  const titleElement = head ? findFirstElement(head, 'title') : null
  const title = titleElement ? getTextContent(titleElement as HastContent).trim() : ''
  const description = getMetaDescription(head)
  const canonicalUrl = getCanonicalUrl(head) || options.fallbackCanonicalUrl

  const contentRoot =
    findFirstElement(document, 'main') || findFirstElement(document, 'body') || document

  pruneChrome(contentRoot as { children?: HastContent[] })

  const bodyHast: HastRoot = {
    type: 'root',
    children: (contentRoot as { children?: HastContent[] }).children || [],
  }

  const bodyMarkdown = await hastToMarkdown(bodyHast, { cleanForDocsUi: true })

  if (!bodyMarkdown && !title) {
    return null
  }

  const footerLines = [
    canonicalUrl ? `Source: ${canonicalUrl}` : '',
    'Full content index: https://signoz.io/llms.txt',
  ].filter(Boolean)

  return buildMarkdownDocument({
    title: title || canonicalUrl || 'SigNoz',
    // Keep the page's own leading h1 when it already renders one.
    includeTitle: !bodyMarkdown.startsWith('# '),
    description,
    bodyMarkdown,
    footerLines,
  })
}
