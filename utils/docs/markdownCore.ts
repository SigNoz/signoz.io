import type {
  Element as HastElement,
  Root as HastRoot,
  RootContent as HastContent,
  Text as HastText,
} from 'hast'

export const MARKDOWN_STRINGIFY_OPTIONS = {
  bullet: '-',
  fences: true,
  resourceLink: true,
} as const

const MARKDOWN_CLEANUP_TAG_NAMES = new Set(['button', 'svg'])
const MARKDOWN_CLEANUP_CLASS_NAMES = new Set(['sr-only', 'content-header-link'])

type HastParentNode = {
  children: HastContent[]
}

export type MarkdownCleanupOptions = {
  cleanForDocsUi?: boolean
}

export const normalizeWhitespace = (content: string) => content.replace(/\n{3,}/g, '\n\n').trim()

const isHastElement = (node: HastContent): node is HastElement => node.type === 'element'

const isHastText = (node: HastContent): node is HastText => node.type === 'text'

const getClassNames = (node: HastElement): string[] => {
  const className = node.properties?.className

  if (Array.isArray(className)) {
    return className.map((value) => String(value))
  }

  if (typeof className === 'string') {
    return className.split(/\s+/).filter(Boolean)
  }

  return []
}

export const getTextContent = (node: HastContent): string => {
  if (isHastText(node)) {
    return node.value
  }

  if (!isHastElement(node)) {
    return ''
  }

  return ((node.children || []) as HastContent[]).map((child) => getTextContent(child)).join('')
}

const shouldRemoveMarkdownElement = (node: HastElement): boolean => {
  if (MARKDOWN_CLEANUP_TAG_NAMES.has(node.tagName)) {
    return true
  }

  return getClassNames(node).some((className) => MARKDOWN_CLEANUP_CLASS_NAMES.has(className))
}

const shouldPreserveButtonLabel = (node: HastElement): boolean => {
  if (node.tagName !== 'button') {
    return false
  }

  if (node.properties?.['data-tab-value'] || node.properties?.dataTabValue) {
    return false
  }

  const textContent = getTextContent(node).trim()
  if (!textContent) {
    return false
  }

  return getClassNames(node).includes('text-left')
}

const normalizeMarkdownElement = (node: HastElement) => {
  if (node.tagName !== 'img') {
    return
  }

  const src = node.properties?.src
  if (typeof src !== 'string' || !src.startsWith('/_next/image')) {
    return
  }

  try {
    const imageUrl = new URL(src, 'https://signoz.io')
    if (imageUrl.pathname !== '/_next/image' && imageUrl.pathname !== '/_next/image/') {
      return
    }

    const originalUrl = imageUrl.searchParams.get('url')
    if (!originalUrl) {
      return
    }

    node.properties = {
      ...node.properties,
      src: originalUrl,
    }
  } catch {
    // Preserve the rendered src when URL parsing fails.
  }
}

const hasMeaningfulMarkdownContent = (node: HastContent): boolean => {
  if (isHastText(node)) {
    return node.value.trim().length > 0
  }

  if (!isHastElement(node)) {
    return false
  }

  if (node.tagName === 'img') {
    return true
  }

  return ((node.children || []) as HastContent[]).some((child) =>
    hasMeaningfulMarkdownContent(child)
  )
}

const cleanMarkdownNode = (node: HastContent): HastContent[] => {
  if (!isHastElement(node)) {
    return [node]
  }

  normalizeMarkdownElement(node)

  if (shouldPreserveButtonLabel(node)) {
    return [
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'strong',
            properties: {},
            children: [{ type: 'text', value: getTextContent(node).trim() }],
          },
        ],
      },
    ]
  }

  if (shouldRemoveMarkdownElement(node)) {
    return []
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    cleanHastForMarkdown(node as unknown as HastParentNode)
  }

  if (
    node.tagName === 'a' &&
    !((node.children || []) as HastContent[]).some((child) => hasMeaningfulMarkdownContent(child))
  ) {
    return []
  }

  return [node]
}

export function cleanHastForMarkdown<T extends HastParentNode>(tree: T): T {
  tree.children = ((tree.children || []) as HastContent[]).flatMap((child) =>
    cleanMarkdownNode(child)
  )
  return tree
}

export async function hastToMarkdown(
  hast: HastRoot,
  options: MarkdownCleanupOptions = {}
): Promise<string> {
  const { unified } = await import('unified')
  const { default: rehypeRemark } = await import('rehype-remark')
  const { default: remarkStringify } = await import('remark-stringify')
  const { default: remarkGfm } = await import('remark-gfm')

  if (options.cleanForDocsUi) {
    cleanHastForMarkdown(hast as unknown as HastParentNode)
  }

  const processor = unified()
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, {
      ...MARKDOWN_STRINGIFY_OPTIONS,
    })

  const mdast = await processor.run(hast as any)
  return normalizeWhitespace(processor.stringify(mdast as any))
}

export async function htmlToMarkdown(
  html: string,
  options: MarkdownCleanupOptions = {}
): Promise<string> {
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const hast = unified().use(rehypeParse, { fragment: true }).parse(html) as HastRoot
  return hastToMarkdown(hast, options)
}
