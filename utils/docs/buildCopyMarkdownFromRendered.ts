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

const getLanguageFromClassName = (className: string | null) => {
  if (!className) return ''
  const match = className.match(/language-([^\s]+)/)
  return match?.[1] ?? ''
}

const withCodeFence = (code: string, language: string) => {
  const safeCode = code.replace(/\n$/, '')
  return `\`\`\`${language}\n${safeCode}\n\`\`\``
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
  const { default: TurndownService } = await import('turndown')
  const gfmPlugin = await import('turndown-plugin-gfm')

  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  })

  const gfm =
    'gfm' in gfmPlugin
      ? gfmPlugin.gfm
      : gfmPlugin.default?.gfm || gfmPlugin.default || gfmPlugin.gfm

  if (gfm) {
    turndownService.use(gfm)
  }

  turndownService.addRule('fencedCodeBlock', {
    filter: (node) => {
      if (node.nodeName !== 'PRE') return false
      const firstChild = node.firstChild as HTMLElement | null
      return Boolean(firstChild && firstChild.nodeName === 'CODE')
    },
    replacement: (_content, node) => {
      const codeNode = (node as HTMLElement).querySelector('code')
      if (!codeNode) {
        return ''
      }
      const language = getLanguageFromClassName(codeNode.className)
      return `\n\n${withCodeFence(codeNode.textContent || '', language)}\n\n`
    },
  })

  const cleanedArticle = cloneAndCleanArticle(articleEl)
  const bodyMarkdown = normalizeWhitespace(turndownService.turndown(cleanedArticle))

  const headerLines = [`# ${options.title}`]
  const tagsHeader = buildTagHeader(options.tags, options.includeTagDefinitions)
  if (tagsHeader) {
    headerLines.push('', tagsHeader)
  }

  const header = normalizeWhitespace(headerLines.join('\n'))

  return normalizeWhitespace([header, bodyMarkdown].filter(Boolean).join('\n\n'))
}
