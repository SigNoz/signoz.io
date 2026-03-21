const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { htmlToMarkdown, hastToMarkdown } = loadTsModule('utils/docs/markdownCore.ts')

const HEADING_WITH_AUTOLINK_CHROME =
  '<h2 class="content-header" id="overview"><a href="#overview" aria-hidden="true" tabindex="-1"><span class="content-header-link"><svg class="h-5 linkicon w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536"></path></svg></span></a>Overview</h2>'

test('htmlToMarkdown removes docs heading autolink chrome', async () => {
  const markdown = await htmlToMarkdown(HEADING_WITH_AUTOLINK_CHROME, { cleanForDocsUi: true })

  assert.match(markdown, /^## Overview$/m)
  assert.doesNotMatch(markdown, /\[\]\(#overview\)/)
})

test('hastToMarkdown removes docs heading autolink chrome from parsed HAST', async () => {
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const hast = unified().use(rehypeParse, { fragment: true }).parse(HEADING_WITH_AUTOLINK_CHROME)
  const markdown = await hastToMarkdown(hast, { cleanForDocsUi: true })

  assert.match(markdown, /^## Overview$/m)
  assert.doesNotMatch(markdown, /\[\]\(#overview\)/)
})

test('cleanup removes empty anchors and preserves meaningful links', async () => {
  const html =
    '<p><a href="#overview" aria-hidden="true" tabindex="-1"></a><a href="/docs/foo">Guide</a></p>'
  const markdown = await htmlToMarkdown(html, { cleanForDocsUi: true })

  assert.match(markdown, /\[Guide\]\(\/docs\/foo\)/)
  assert.doesNotMatch(markdown, /\[\]\(#overview\)/)
})

test('cleanup removes presentation-only nodes from markdown output', async () => {
  const html =
    '<p>Hello <button>Copy</button> world<span class="sr-only">screen reader only</span>.</p><p><svg><text>Icon</text></svg>Done.</p>'
  const markdown = await htmlToMarkdown(html, { cleanForDocsUi: true })

  assert.match(markdown, /Hello world\./)
  assert.match(markdown, /Done\./)
  assert.doesNotMatch(markdown, /Copy/)
  assert.doesNotMatch(markdown, /screen reader only/)
  assert.doesNotMatch(markdown, /Icon/)
})
