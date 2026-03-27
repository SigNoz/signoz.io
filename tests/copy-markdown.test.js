const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildCopyMarkdownDocument, expandTabsInHast } = loadTsModule(
  'utils/docs/buildCopyMarkdownFromRendered.ts'
)
const { hastToMarkdown } = loadTsModule('utils/docs/markdownCore.ts')
const { MORE_DOCS_POINTER } = loadTsModule('utils/docs/buildMarkdownDocument.ts')

test('expandTabsInHast expands rendered tabs into markdown sections', async () => {
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const hast = unified().use(rehypeParse, { fragment: true }).parse(`
    <div data-tabs-root>
      <div role="tablist">
        <button data-tab-value="npm">npm</button>
        <button data-tab-value="yarn">yarn</button>
      </div>
      <div data-tab-value="npm" hidden aria-hidden="true">
        <p>npm install</p>
      </div>
      <div data-tab-value="yarn" hidden aria-hidden="true">
        <p>yarn add</p>
      </div>
    </div>
  `)

  const markdown = await hastToMarkdown(expandTabsInHast(hast), { cleanForDocsUi: true })

  assert.match(markdown, /^### npm$/m)
  assert.match(markdown, /^### yarn$/m)
  assert.match(markdown, /npm install/)
  assert.match(markdown, /yarn add/)
})

test('expandTabsInHast does not duplicate headings for nested real-world tabs', async () => {
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const hast = unified().use(rehypeParse, { fragment: true }).parse(`
    <div data-tabs-root>
      <div role="tablist">
        <button data-tab-value="litellm-sdk">LiteLLM SDK</button>
        <button data-tab-value="litellm-proxy-server">LiteLLM Proxy Server</button>
      </div>
      <div data-tab-value="litellm-sdk" hidden aria-hidden="true">
        <div data-tabs-root>
          <div role="tablist">
            <button data-tab-value="python">Python</button>
            <button data-tab-value="typescript">TypeScript(fetch)</button>
          </div>
          <div data-tab-value="python" hidden aria-hidden="true">
            <p>pip install signoz-instrumentation</p>
          </div>
          <div data-tab-value="typescript" hidden aria-hidden="true">
            <p>npm install @signoz/browser</p>
          </div>
        </div>
      </div>
      <div data-tab-value="litellm-proxy-server" hidden aria-hidden="true">
        <p>Proxy server instructions</p>
      </div>
    </div>
  `)

  const markdown = await hastToMarkdown(expandTabsInHast(hast), { cleanForDocsUi: true })

  assert.equal(markdown.match(/^### LiteLLM SDK$/gm)?.length, 1)
  assert.equal(markdown.match(/^### LiteLLM Proxy Server$/gm)?.length, 1)
  assert.equal(markdown.match(/^### Python$/gm)?.length, 1)
  assert.equal(markdown.match(/^### TypeScript\(fetch\)$/gm)?.length, 1)
  assert.match(markdown, /pip install signoz-instrumentation/)
  assert.match(markdown, /npm install @signoz\/browser/)
})

test('buildCopyMarkdownDocument includes tag definitions and more docs footer', () => {
  const markdown = buildCopyMarkdownDocument('Body content.', {
    title: 'Docs Title',
    tags: ['Self-Host'],
    includeTagDefinitions: true,
  })

  assert.match(markdown, /^# Docs Title$/m)
  assert.match(markdown, /^Tag definitions:$/m)
  assert.match(markdown, new RegExp(`${MORE_DOCS_POINTER}$`))
})
