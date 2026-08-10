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

const getDataAttribute = (node: HastElement, camel: string, kebab: string): unknown =>
  node.properties?.[camel] ?? node.properties?.[kebab]

/**
 * CSS-grid "tables" (comparison grids, pricing matrices) carry no <table>
 * semantics, so rehype-remark flattens them into loose paragraphs. Components
 * opt in to proper markdown tables with data attributes:
 *   data-md-table="Col A|Col B|..."  on the container (header labels)
 *   data-md-row                      on each row wrapper (optional)
 *   data-md-cell[="override text"]   on each cell; empty value = use cell text
 * Without data-md-row, cells are chunked into rows of header length.
 */
const collectAnnotated = (node: HastElement, camel: string, kebab: string): HastElement[] => {
  const found: HastElement[] = []
  for (const child of node.children || []) {
    if (!isHastElement(child)) continue
    if (getDataAttribute(child, camel, kebab) != null) {
      found.push(child)
      continue
    }
    found.push(...collectAnnotated(child, camel, kebab))
  }
  return found
}

const getAnnotatedCellText = (cell: HastElement): string => {
  const override = getDataAttribute(cell, 'dataMdCell', 'data-md-cell')
  const raw =
    typeof override === 'string' && override.trim() ? override : getTextContent(cell as HastContent)
  return raw.replace(/\s+/g, ' ').trim()
}

const tableRowElement = (cells: string[], cellTag: 'th' | 'td'): HastElement => ({
  type: 'element',
  tagName: 'tr',
  properties: {},
  children: cells.map((text) => ({
    type: 'element' as const,
    tagName: cellTag,
    properties: {},
    children: text ? [{ type: 'text' as const, value: text }] : [],
  })),
})

const buildAnnotatedTable = (container: HastElement): HastElement | null => {
  const headerValue = getDataAttribute(container, 'dataMdTable', 'data-md-table')
  if (typeof headerValue !== 'string' || !headerValue.trim()) return null

  const headerLabels = headerValue
    .split('|')
    .map((label) => label.trim())
    .filter(Boolean)
  if (headerLabels.length === 0) return null

  const rowElements = collectAnnotated(container, 'dataMdRow', 'data-md-row')
  let bodyRows: string[][]
  if (rowElements.length > 0) {
    bodyRows = rowElements.map((row) =>
      collectAnnotated(row, 'dataMdCell', 'data-md-cell').map(getAnnotatedCellText)
    )
  } else {
    const cells = collectAnnotated(container, 'dataMdCell', 'data-md-cell').map(
      getAnnotatedCellText
    )
    bodyRows = []
    for (let i = 0; i < cells.length; i += headerLabels.length) {
      bodyRows.push(cells.slice(i, i + headerLabels.length))
    }
  }

  bodyRows = bodyRows.filter((cells) => cells.length > 0)
  if (bodyRows.length === 0) return null

  return {
    type: 'element',
    tagName: 'table',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'thead',
        properties: {},
        children: [tableRowElement(headerLabels, 'th')],
      },
      {
        type: 'element',
        tagName: 'tbody',
        properties: {},
        children: bodyRows.map((cells) => tableRowElement(cells, 'td')),
      },
    ],
  }
}

const transformAnnotatedTables = (node: { children?: HastContent[] }) => {
  if (!Array.isArray(node.children)) return

  node.children = node.children.map((child) => {
    if (!isHastElement(child)) return child
    if (getDataAttribute(child, 'dataMdTable', 'data-md-table') != null) {
      return buildAnnotatedTable(child) ?? child
    }
    transformAnnotatedTables(child)
    return child
  })
}

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
  transformAnnotatedTables(contentRoot as { children?: HastContent[] })

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
