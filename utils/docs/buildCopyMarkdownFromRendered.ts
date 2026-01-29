import { tagDefinitions } from '@/constants/tagDefinitions'

export type BuildCopyMarkdownOptions = {
  title: string
  tags: string[]
  includeTagDefinitions: boolean
}

const CLEANUP_SELECTORS = ['button', 'svg', '.sr-only', '.content-header-link']

const normalizeWhitespace = (content: string) => content.replace(/\n{3,}/g, '\n\n').trim()

const buildTagHeader = (tags: string[], includeTagDefinitions: boolean): string => {
  if (!tags || tags.length === 0) {
    return ''
  }

  const lines: string[] = [`Tags: ${tags.join(', ')}`]

  if (includeTagDefinitions) {
    const definitionLines = tags
      .map((tag) => {
        const definition = tagDefinitions[tag]
        return definition ? `- ${tag}: ${definition}` : null
      })
      .filter(Boolean) as string[]

    if (definitionLines.length > 0) {
      lines.push('', 'Tag definitions:', ...definitionLines)
    }
  }

  return lines.join('\n')
}

const expandTabsInClone = (clone: HTMLElement) => {
  const tabRoots = Array.from(clone.querySelectorAll('[data-tabs-root]'))

  tabRoots.forEach((root) => {
    const labelMap = new Map<string, string>()
    const tabButtons = Array.from(root.querySelectorAll('button[data-tab-value]'))

    tabButtons.forEach((button) => {
      const value = button.getAttribute('data-tab-value') || ''
      const label = button.textContent?.trim() || value
      if (value) {
        labelMap.set(value, label)
      }
    })

    const panels = Array.from(root.querySelectorAll('div[data-tab-value]'))
    panels.forEach((panel) => {
      const value = panel.getAttribute('data-tab-value') || ''
      const label = labelMap.get(value) || value
      panel.removeAttribute('hidden')
      panel.removeAttribute('aria-hidden')
      if (label) {
        const heading = panel.ownerDocument.createElement('h3')
        heading.textContent = label
        panel.insertBefore(heading, panel.firstChild)
      }
    })
  })
}

const cloneAndCleanArticle = (articleEl: HTMLElement): HTMLElement => {
  const clone = articleEl.cloneNode(true) as HTMLElement
  expandTabsInClone(clone)
  CLEANUP_SELECTORS.forEach((selector) => {
    clone.querySelectorAll(selector).forEach((node) => node.remove())
  })

  clone.querySelectorAll('a').forEach((node) => {
    if (node.textContent?.trim()) return
    if (node.querySelector('img, svg')) return
    node.remove()
  })
  return clone
}

export async function buildCopyMarkdownFromRendered(
  articleEl: HTMLElement,
  options: BuildCopyMarkdownOptions
): Promise<string> {
  const { unified } = await import('unified')
  const { default: rehypeRemark } = await import('rehype-remark')
  const { default: remarkStringify } = await import('remark-stringify')
  const { default: remarkGfm } = await import('remark-gfm')
  const { fromDom } = await import('hast-util-from-dom')

  const cleanedArticle = cloneAndCleanArticle(articleEl)
  const hast = fromDom(cleanedArticle)

  const processor = unified().use(rehypeRemark).use(remarkGfm).use(remarkStringify, {
    bullet: '-',
    fences: true,
    resourceLink: true,
  })

  const mdast = await processor.run(hast as any)
  const bodyMarkdown = normalizeWhitespace(processor.stringify(mdast as any))

  const headerLines = [`# ${options.title}`]
  const tagsHeader = buildTagHeader(options.tags, options.includeTagDefinitions)
  if (tagsHeader) {
    headerLines.push('', tagsHeader)
  }

  const header = normalizeWhitespace(headerLines.join('\n'))

  return normalizeWhitespace([header, bodyMarkdown].filter(Boolean).join('\n\n'))
}
