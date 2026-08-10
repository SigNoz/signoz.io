import siteMetadata from '@/data/siteMetadata'
import { INTRO_SECTIONS, type CardData } from 'app/(site)/docs/introduction/constants'
import { INTRO_DESCRIPTION } from './agentDiscovery'
import { buildMarkdownDocument, MORE_DOCS_POINTER } from './buildMarkdownDocument'

export const INTRO_MARKDOWN_TITLE = 'Welcome to SigNoz Docs'

const absoluteUrl = (href: string): string =>
  href.startsWith('http') ? href : `${siteMetadata.siteUrl}${href}`

const cardLine = (card: CardData): string =>
  `- [${card.title}](${absoluteUrl(card.href)}): ${card.description}`

export function buildIntroductionAgentMarkdown(): string {
  const sections = INTRO_SECTIONS.map((section) => {
    const parts: string[] = []
    if (section.title) {
      parts.push(`## ${section.title}`)
    }
    if (section.description) {
      parts.push(section.description)
    }
    parts.push(section.cards.map(cardLine).join('\n'))
    return parts.join('\n\n')
  })

  return buildMarkdownDocument({
    title: INTRO_MARKDOWN_TITLE,
    description: INTRO_DESCRIPTION,
    bodyMarkdown: sections.join('\n\n'),
    footerLines: [MORE_DOCS_POINTER],
  })
}
