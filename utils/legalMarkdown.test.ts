// @vitest-environment node
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import { describe, expect, it } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { toString } from 'mdast-util-to-string'
import { getLegalDocs } from './legal'
import { LEGAL_REMARK_PLUGINS } from './legalMarkdown'

const render = (markdown: string) =>
  renderToStaticMarkup(
    createElement(ReactMarkdown, { remarkPlugins: LEGAL_REMARK_PLUGINS }, markdown)
  )

describe('LEGAL_REMARK_PLUGINS', () => {
  it('keeps list numbers as typed instead of renumbering them', () => {
    const html = render('2. Use and Disclosure of PHI.\n\n10. Amendment of PHI.')
    expect(html).toContain('<ol start="2">')
    expect(html).toContain('<li value="10">')
  })

  it('renders tables and leaves single tildes alone', () => {
    const html = render(
      '| Term | Days |\n| --- | --- |\n| Notice | ~30 |\n\nAbout ~30 days or ~45~ days.'
    )
    expect(html).toContain('<table>')
    expect(html).not.toContain('<del>')
  })

  it('renders escaped placeholders as text', () => {
    expect(render('Covered Entity: \\<Customer Legal Name\\>')).toContain(
      '&lt;Customer Legal Name&gt;'
    )
  })
})

describe('raw HTML in pasted text', () => {
  it('is shown as text instead of being dropped', () => {
    const html = render('Covered Entity: <Customer Legal Name>, line<br>two')
    expect(html).toContain('&lt;Customer Legal Name&gt;')
    expect(html).toContain('&lt;br&gt;')
  })
})

describe('legal documents', () => {
  const textOf = (html: string) =>
    html
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, '')

  it.each(getLegalDocs().map((doc) => [doc.slug, doc.content]))(
    'renders every word of %s',
    (_slug, content) => {
      const tree = unified().use(remarkParse).use(remarkGfm, { singleTilde: false }).parse(content)
      expect(textOf(render(content))).toBe(toString(tree).replace(/\s+/g, ''))
    }
  )
})
