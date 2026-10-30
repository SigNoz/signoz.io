import { describe, expect, it } from 'vitest'
import { buildRelatedPageLinksIntro, buildRelatedPageLinksMarkdown } from './relatedPageLinksText'

describe('buildRelatedPageLinksMarkdown', () => {
  it('renders the intro followed by a numbered list of raw URLs', () => {
    expect(
      buildRelatedPageLinksMarkdown({
        title: 'JSON Logs',
        links: ['https://signoz.io/docs/a/', 'https://signoz.io/docs/b/'],
      })
    ).toBe(
      [
        buildRelatedPageLinksIntro('JSON Logs'),
        '1. https://signoz.io/docs/a/\n2. https://signoz.io/docs/b/',
      ].join('\n\n')
    )
  })
})

describe('buildRelatedPageLinksIntro', () => {
  it('names the page title in the agent-facing sentence', () => {
    expect(buildRelatedPageLinksIntro('JSON Logs')).toBe(
      'If you are an LLM or AI agent exploring JSON Logs, these related pages may be helpful to answer the user query in a more precise way:'
    )
  })
})
