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

test('cleanup unwraps Next image optimizer URLs to the original asset path', async () => {
  const html =
    '<p><img alt="LiteLLM Detailed Trace View" src="/_next/image/?url=%2Fimg%2Fdocs%2Fllm%2Flitellm%2Flitellmproxy-detailed-traces.webp&w=3840&q=75" /></p>'
  const markdown = await htmlToMarkdown(html, { cleanForDocsUi: true })

  assert.match(
    markdown,
    /!\[LiteLLM Detailed Trace View\]\(\/img\/docs\/llm\/litellm\/litellmproxy-detailed-traces\.webp\)/
  )
  assert.doesNotMatch(markdown, /\/_next\/image/)
})

test('cleanup preserves KeyPointCallout headings while removing button chrome', async () => {
  const html = `
    <div class="my-8 w-full rounded-2xl border border-white/10 bg-white/5 text-gray-100 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <button type="button" class="flex w-full items-center justify-between px-6 py-5 text-left">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-signoz_sakura-200">
            <span class="inline-block h-1.5 w-6 rounded-full bg-signoz_sakura-400/70" aria-hidden="true"></span>
            Using self-hosted SigNoz?
          </div>
        </div>
        <span class="text-sm font-medium text-gray-300 transition-transform rotate-0" aria-hidden="true">
          <svg><path d=""></path></svg>
        </span>
      </button>
      <div class="overflow-hidden px-6 pb-6 text-base leading-relaxed text-gray-100/90 hidden opacity-0">
        <p>Most steps are identical.</p>
      </div>
    </div>
  `
  const markdown = await htmlToMarkdown(html, { cleanForDocsUi: true })

  assert.match(markdown, /\*\*Using self-hosted SigNoz\?\*\*/)
  assert.match(markdown, /Most steps are identical\./)
})
