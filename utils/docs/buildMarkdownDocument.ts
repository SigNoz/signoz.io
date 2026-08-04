import { tagDefinitions } from '@/constants/tagDefinitions'
import siteMetadata from '@/data/siteMetadata'
import { normalizeWhitespace } from './markdownCore'

// Absolute, not site-relative: this markdown is routinely copied out of the
// site (Copy Markdown button, agent context windows) where a bare "/llms.txt"
// has no host to resolve against.
export const MORE_DOCS_POINTER = `More docs: ${siteMetadata.siteUrl}/docs/sitemap.md`
export const LLMS_TXT_POINTER = `Agent guide: ${siteMetadata.siteUrl}/llms.txt`

/**
 * Footer appended to every agent-facing markdown document so an agent that
 * landed on a single page can still discover the sitemap and the agent guide.
 */
export const AGENT_FOOTER_LINES = [MORE_DOCS_POINTER, LLMS_TXT_POINTER]

export type BuildMarkdownDocumentOptions = {
  title: string
  includeTitle?: boolean
  description?: string
  tags?: string[]
  includeTagDefinitions?: boolean
  bodyMarkdown?: string
  footerLines?: string[]
}

const buildTagSection = (tags: string[], includeTagDefinitions: boolean): string => {
  if (tags.length === 0) {
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

export const buildMarkdownDocument = ({
  title,
  includeTitle = true,
  description,
  tags = [],
  includeTagDefinitions = false,
  bodyMarkdown,
  footerLines = [],
}: BuildMarkdownDocumentOptions): string => {
  const sections: string[] = []

  if (includeTitle) {
    sections.push(`# ${title}`)
  }

  if (description) {
    sections.push(description)
  }

  const tagSection = buildTagSection(tags, includeTagDefinitions)
  if (tagSection) {
    sections.push(tagSection)
  }

  if (bodyMarkdown) {
    sections.push(bodyMarkdown)
  }

  const footer = footerLines.filter(Boolean).join('\n')
  if (footer) {
    sections.push(footer)
  }

  return normalizeWhitespace(sections.join('\n\n'))
}
