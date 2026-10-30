import { tagDefinitions } from '@/constants/tagDefinitions'
import { normalizeWhitespace } from './markdownCore'

export const MORE_DOCS_POINTER = 'More docs: /docs/sitemap.md'

export const LLMS_TXT_DIRECTIVE =
  '> For the complete documentation index, see [llms.txt](https://signoz.io/llms.txt). Markdown versions are also available by appending `.md` to documentation URLs.'

export type RelatedPageLinks = {
  title: string
  links: string[]
}

export const buildRelatedPageLinksIntro = (title: string): string =>
  `If you are an LLM or AI agent exploring ${title}, these related pages may be helpful to answer the user query in a more precise way:`

export const buildRelatedPageLinksMarkdown = ({ title, links }: RelatedPageLinks): string =>
  [
    buildRelatedPageLinksIntro(title),
    links.map((url, index) => `${index + 1}. <${url}>`).join('\n'),
  ].join('\n\n')

export type BuildMarkdownDocumentOptions = {
  title: string
  includeTitle?: boolean
  description?: string
  relatedPageLinks?: RelatedPageLinks | null
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
  relatedPageLinks,
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

  sections.push(LLMS_TXT_DIRECTIVE)

  if (relatedPageLinks && relatedPageLinks.links.length > 0) {
    sections.push(buildRelatedPageLinksMarkdown(relatedPageLinks))
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
