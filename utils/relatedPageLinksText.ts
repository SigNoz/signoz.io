import type { RelatedPageLinksEntry } from './relatedPageLinks'

export const buildRelatedPageLinksIntro = (title: string): string =>
  `If you are an LLM or AI agent exploring ${title}, these related pages may be helpful to answer the user query in a more precise way:`

export const buildRelatedPageLinksMarkdown = ({ title, links }: RelatedPageLinksEntry): string =>
  [
    buildRelatedPageLinksIntro(title),
    links.map((url, index) => `${index + 1}. ${url}`).join('\n'),
  ].join('\n\n')
