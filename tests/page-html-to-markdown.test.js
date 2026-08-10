const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { renderPageHtmlToAgentMarkdown } = loadTsModule('utils/pageHtmlToMarkdown.ts')
const { LLMS_TXT_DIRECTIVE } = loadTsModule('utils/docs/buildMarkdownDocument.ts')

const SAMPLE_PAGE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>SigNoz | Pricing</title>
    <meta name="description" content="Transparent, usage-based pricing." />
    <link rel="canonical" href="https://signoz.io/pricing/" />
  </head>
  <body>
    <header><a href="/">Nav logo</a><nav><a href="/docs/">Docs nav link</a></nav></header>
    <main>
      <h1>Pricing</h1>
      <p>Pay only for the telemetry you send.</p>
      <div data-markdown-ignore><p>Human-only widget</p></div>
      <div aria-hidden="true">Decorative text</div>
      <form><input type="email" /><button>Subscribe</button></form>
      <h2>Plans</h2>
      <ul><li><a href="/teams/">Teams</a></li></ul>
      <script>console.log('tracking')</script>
    </main>
    <footer><p>Footer boilerplate</p></footer>
  </body>
</html>`

test('renderPageHtmlToAgentMarkdown keeps main content and metadata', async () => {
  const markdown = await renderPageHtmlToAgentMarkdown(SAMPLE_PAGE_HTML)

  assert.match(markdown, /# Pricing/)
  assert.match(markdown, /Transparent, usage-based pricing\./)
  assert.match(markdown, /Pay only for the telemetry you send\./)
  assert.match(markdown, /## Plans/)
  assert.match(markdown, /\[Teams\]\(\/teams\/\)/)
  assert.match(markdown, /Source: https:\/\/signoz\.io\/pricing\//)
  assert.match(markdown, /Full content index: https:\/\/signoz\.io\/llms\.txt/)
})

test('renderPageHtmlToAgentMarkdown emits the llms.txt directive once, near the top', async () => {
  const markdown = await renderPageHtmlToAgentMarkdown(SAMPLE_PAGE_HTML)

  const escaped = LLMS_TXT_DIRECTIVE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  assert.equal((markdown.match(new RegExp(escaped, 'g')) || []).length, 1)
  assert.equal(
    markdown.indexOf(LLMS_TXT_DIRECTIVE) < markdown.indexOf('Pay only for the telemetry you send.'),
    true
  )
})

test('renderPageHtmlToAgentMarkdown drops chrome, ignored, and hidden content', async () => {
  const markdown = await renderPageHtmlToAgentMarkdown(SAMPLE_PAGE_HTML)

  assert.doesNotMatch(markdown, /Docs nav link/)
  assert.doesNotMatch(markdown, /Footer boilerplate/)
  assert.doesNotMatch(markdown, /Human-only widget/)
  assert.doesNotMatch(markdown, /Decorative text/)
  assert.doesNotMatch(markdown, /Subscribe/)
  assert.doesNotMatch(markdown, /console\.log/)
})

test('renderPageHtmlToAgentMarkdown avoids duplicating a leading h1 as the title', async () => {
  const markdown = await renderPageHtmlToAgentMarkdown(SAMPLE_PAGE_HTML)

  const headingMatches = markdown.match(/^# /gm) || []
  assert.equal(headingMatches.length, 1)
})

test('renderPageHtmlToAgentMarkdown falls back to the document title when main has no h1', async () => {
  const markdown = await renderPageHtmlToAgentMarkdown(
    `<!DOCTYPE html><html><head><title>SigNoz | Enterprise</title></head><body><main><p>Enterprise-grade observability.</p></main></body></html>`,
    { fallbackCanonicalUrl: 'https://signoz.io/enterprise/' }
  )

  assert.match(markdown, /# SigNoz \| Enterprise/)
  assert.match(markdown, /Source: https:\/\/signoz\.io\/enterprise\//)
})

test('renderPageHtmlToAgentMarkdown returns null for empty documents', async () => {
  const markdown = await renderPageHtmlToAgentMarkdown('<html><head></head><body></body></html>')
  assert.equal(markdown, null)
})
