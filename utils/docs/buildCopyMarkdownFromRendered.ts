import type { Root as HastRoot, RootContent as HastContent, Element as HastElement } from 'hast'
import { getTextContent, hastToMarkdown, normalizeWhitespace } from './markdownCore'
import { buildMarkdownDocument, MORE_DOCS_POINTER } from './buildMarkdownDocument'

export type BuildCopyMarkdownOptions = {
  title: string
  tags: string[]
  includeTagDefinitions: boolean
}

type HastParentNode = {
  children?: HastContent[]
}

const isElement = (node: HastContent): node is HastElement => node.type === 'element'

const getProperty = (node: HastElement, keys: string[]): unknown => {
  const properties = node.properties || {}

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      return properties[key]
    }
  }

  return undefined
}

const hasDataTabsRoot = (node: HastElement): boolean =>
  getProperty(node, ['data-tabs-root', 'dataTabsRoot']) !== undefined

const getTabValue = (node: HastElement): string => {
  const value = getProperty(node, ['data-tab-value', 'dataTabValue'])
  return typeof value === 'string' ? value : ''
}

const visitElements = (node: HastParentNode, visitor: (element: HastElement) => void) => {
  for (const child of node.children || []) {
    if (!isElement(child)) {
      continue
    }

    visitor(child)
    visitElements(child, visitor)
  }
}

const visitElementsWithinTabsRoot = (
  root: HastElement,
  visitor: (element: HastElement) => void
) => {
  const visit = (node: HastParentNode) => {
    for (const child of node.children || []) {
      if (!isElement(child)) {
        continue
      }

      // Nested tabsets are expanded in their own pass; don't let the outer
      // tabset rewrite their labels or panels.
      if (hasDataTabsRoot(child)) {
        continue
      }

      visitor(child)
      visit(child)
    }
  }

  visit(root)
}

export const expandTabsInHast = (tree: HastRoot): HastRoot => {
  visitElements(tree, (root) => {
    if (!hasDataTabsRoot(root)) {
      return
    }

    const labelMap = new Map<string, string>()

    visitElementsWithinTabsRoot(root, (element) => {
      if (element.tagName !== 'button') {
        return
      }

      const value = getTabValue(element)
      const label = getTextContent(element).trim() || value

      if (value) {
        labelMap.set(value, label)
      }
    })

    visitElementsWithinTabsRoot(root, (element) => {
      if (element.tagName !== 'div') {
        return
      }

      const value = getTabValue(element)
      if (!value) {
        return
      }

      if (element.properties) {
        delete element.properties.hidden
        delete element.properties['aria-hidden']
        delete element.properties.ariaHidden
      }

      const label = labelMap.get(value) || value
      if (!label) {
        return
      }

      element.children = element.children || []
      element.children.unshift({
        type: 'element',
        tagName: 'h3',
        properties: {},
        children: [{ type: 'text', value: label }],
      })
    })
  })

  return tree
}

const cloneAndCleanArticle = (articleEl: HTMLElement): HTMLElement => {
  return articleEl.cloneNode(true) as HTMLElement
}

export const buildCopyMarkdownDocument = (
  bodyMarkdown: string,
  options: BuildCopyMarkdownOptions
): string =>
  buildMarkdownDocument({
    title: options.title,
    tags: options.tags,
    includeTagDefinitions: options.includeTagDefinitions,
    bodyMarkdown,
    footerLines: [MORE_DOCS_POINTER],
  })

export async function buildCopyMarkdownFromRendered(
  articleEl: HTMLElement,
  options: BuildCopyMarkdownOptions
): Promise<string> {
  const { fromDom } = await import('hast-util-from-dom')

  const cleanedArticle = cloneAndCleanArticle(articleEl)
  const hast = expandTabsInHast(fromDom(cleanedArticle) as HastRoot)
  const bodyMarkdown = await hastToMarkdown(hast as any, { cleanForDocsUi: true })
  return normalizeWhitespace(buildCopyMarkdownDocument(bodyMarkdown, options))
}
