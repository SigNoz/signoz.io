const test = require('node:test')
const assert = require('node:assert/strict')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const { loadTsModule } = require('./helpers/loadTsModule')

const { mdxOptions } = loadTsModule('utils/mdx/options.ts')
const { filterCodeBlockMetaString, parseCodeBlockMetaFlags } = loadTsModule(
  'utils/mdx/rehypeCodeBlockMeta.ts'
)
const { getTextContent } = loadTsModule('components/CodeBlock/utils.ts')

test('parseCodeBlockMetaFlags strips custom flags and keeps highlight meta', () => {
  const { flags, cleanedMeta } = parseCodeBlockMetaFlags(
    '{2}#cherry noLineNumbers minimap collapse={30} defaultCollapsed'
  )
  assert.equal(flags.noLineNumbers, true)
  assert.equal(flags.minimap, true)
  assert.equal(flags.collapseThreshold, 30)
  assert.equal(flags.defaultCollapsed, true)
  assert.equal(cleanedMeta, '{2}#cherry')
  assert.equal(filterCodeBlockMetaString('showLineNumbers noLineNumbers'), 'showLineNumbers')
})

test('mdx code block pipeline emits title, highlights, and default line numbers', async () => {
  const { compileMDX } = await import('next-mdx-remote/rsc')

  const source = `\`\`\`ts:server.ts {2}#cherry
const a = 1
const b = 2
const c = 3
\`\`\`

\`\`\`bash noLineNumbers
echo hi
\`\`\`

\`\`\`text collapse={5} defaultCollapsed
a
b
c
d
e
f
\`\`\`
`

  const { content } = await compileMDX({
    source,
    options: mdxOptions,
    components: {
      pre: (props) =>
        React.createElement(
          'pre',
          {
            'data-code-title': props['data-code-title'],
            'data-no-line-numbers': props['data-no-line-numbers'],
            'data-default-collapsed': props['data-default-collapsed'],
            'data-collapse-threshold': props['data-collapse-threshold'],
          },
          props.children
        ),
    },
  })

  const html = renderToStaticMarkup(content)
  assert.match(html, /data-code-title="server\.ts"/)
  assert.match(html, /data-highlighted-line/)
  assert.match(html, /data-highlighted-line-id="cherry"/)
  assert.match(html, /data-line-numbers/)
  assert.match(html, /data-no-line-numbers/)
  assert.match(html, /data-default-collapsed/)
  assert.match(html, /data-collapse-threshold="5"/)
})

test('diff fences mark add/remove lines for row backgrounds', async () => {
  const { compileMDX } = await import('next-mdx-remote/rsc')

  const source = `\`\`\`diff:docker-compose.yaml
- schema-migrator-sync:
+ schema-migrator:
  depends_on:
\`\`\`

\`\`\`yaml
- item
  key: val
\`\`\`

\`\`\`
./otelcol --config=config.yaml
\`\`\`
`

  const { content } = await compileMDX({
    source,
    options: mdxOptions,
    components: {
      pre: (props) => React.createElement('pre', {}, props.children),
    },
  })

  const html = renderToStaticMarkup(content)
  assert.match(html, /data-diff="remove"/)
  assert.match(html, /data-diff="add"/)
  assert.match(html, /data-language="plaintext"/)
  // YAML list items start with "-" but must not get diff row chrome
  const yamlSection = html.slice(html.indexOf('data-language="yaml"'))
  assert.equal(/data-diff=/.test(yamlSection), false)
})

test('cleanHastForMarkdown unwraps sz-codeblock chrome and joins shiki lines', async () => {
  const { hastToMarkdown } = loadTsModule('utils/docs/markdownCore.ts')
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const hast = unified().use(rehypeParse, { fragment: true }).parse(`
    <div data-sz-codeblock>
      <div>
        <button aria-label="Copy code">Copy</button>
      </div>
      <div>
        <pre><code data-language="ts"><span data-line>const a = 1</span><span data-line>const b = 2</span></code></pre>
      </div>
    </div>
  `)

  const markdown = await hastToMarkdown(hast, { cleanForDocsUi: true })
  assert.match(markdown, /const a = 1/)
  assert.match(markdown, /const b = 2/)
  assert.doesNotMatch(markdown, /Copy code/)
})

test('cleanHastForMarkdown strips collapse, minimap, and titled chrome', async () => {
  const { hastToMarkdown } = loadTsModule('utils/docs/markdownCore.ts')
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const hast = unified().use(rehypeParse, { fragment: true }).parse(`
    <div data-sz-codeblock>
      <div>
        <span>server.ts</span>
        <button aria-label="Copy code">Copy</button>
      </div>
      <div>
        <pre><code data-language="ts"><span data-line>const a = 1</span><span data-line>const b = 2</span></code></pre>
        <nav aria-label="Code minimap"><button aria-label="Go to line 1">1</button></nav>
      </div>
      <button type="button">Expand 40 lines</button>
    </div>
  `)

  const markdown = await hastToMarkdown(hast, { cleanForDocsUi: true })
  assert.match(markdown, /const a = 1/)
  assert.match(markdown, /const b = 2/)
  assert.doesNotMatch(markdown, /Copy code/)
  assert.doesNotMatch(markdown, /Expand 40 lines/)
  assert.doesNotMatch(markdown, /Code minimap/)
  assert.doesNotMatch(markdown, /Go to line/)
})

test('cleanHastForMarkdown strips CodeTabs chrome buttons but keeps code', async () => {
  const { hastToMarkdown } = loadTsModule('utils/docs/markdownCore.ts')
  const { unified } = await import('unified')
  const { default: rehypeParse } = await import('rehype-parse')

  const hast = unified().use(rehypeParse, { fragment: true }).parse(`
    <div data-sz-codeblock data-sz-codeblock-tabs>
      <div role="tablist">
        <button role="tab" aria-selected="true">HTTP</button>
        <button role="tab">gRPC</button>
        <button aria-label="Copy code">Copy</button>
      </div>
      <div role="tabpanel">
        <div data-sz-codeblock>
          <pre><code data-language="bash"><span data-line>curl https://example.com</span></code></pre>
        </div>
      </div>
    </div>
  `)

  const markdown = await hastToMarkdown(hast, { cleanForDocsUi: true })
  assert.match(markdown, /curl https:\/\/example\.com/)
  assert.doesNotMatch(markdown, /Copy code/)
})

test('countCodeLines ignores interstitial newlines between data-line spans', () => {
  // Shiki emits line spans interleaved with "\n" text nodes.
  // Old bug: "\n".split("\n") => ["", ""] counted as 2 lines each
  // (8 real lines + 7 newlines × 2 = 22).
  const children = [
    React.createElement('span', { 'data-line': '', key: '1' }, 'line 1'),
    '\n',
    React.createElement('span', { 'data-line': '', key: '2' }, 'line 2'),
    '\n',
    React.createElement('span', { 'data-line': '', key: '3' }, 'line 3'),
    '\n',
    React.createElement('span', { 'data-line': '', key: '4' }, 'line 4'),
    '\n',
    React.createElement('span', { 'data-line': '', key: '5' }, 'line 5'),
    '\n',
    React.createElement('span', { 'data-line': '', key: '6' }, 'line 6'),
    '\n',
    React.createElement('span', { 'data-line': '', key: '7' }, 'line 7'),
    '\n',
    React.createElement('span', { 'data-line': '', key: '8' }, 'line 8'),
  ]

  function hasDataAttr(props, name) {
    return Object.prototype.hasOwnProperty.call(props, name)
  }
  function countCodeLines(node) {
    if (!React.isValidElement(node)) {
      if (Array.isArray(node)) {
        return node.reduce((sum, child) => sum + countCodeLines(child), 0)
      }
      return 0
    }
    const props = node.props
    if (hasDataAttr(props, 'data-line')) return 1
    return countCodeLines(props.children)
  }

  assert.equal(countCodeLines(children), 8)
})

test('getTextContent unwraps fulfilled react.lazy payloads for region detection', () => {
  const { getTextContent, unwrapReactNode, countCodeLines } = loadTsModule(
    'components/CodeBlock/utils.ts'
  )

  const inner = React.createElement(
    'code',
    null,
    React.createElement('span', { 'data-line': '' }, 'https://ingest.<region>.signoz.cloud:443')
  )

  const lazy = {
    $$typeof: Symbol.for('react.lazy'),
    _payload: { status: 'fulfilled', value: inner },
  }

  assert.equal(getTextContent(inner).includes('<region>'), true)
  assert.equal(getTextContent(lazy).includes('<region>'), true)
  assert.equal(unwrapReactNode(lazy), inner)
  assert.equal(countCodeLines(lazy), 1)
})

test('getTextContent does not double newlines between Shiki data-line nodes', () => {
  // Mirrors rehype-pretty-code output: line spans separated by "\n" text nodes.
  const line = (text) => React.createElement('span', { 'data-line': '' }, text)
  const code = React.createElement('code', null, [
    line('export const a = 1'),
    '\n',
    line('export const b = 2'),
    '\n',
    line('export const c = 3'),
  ])
  const pre = React.createElement('pre', null, code)

  assert.equal(
    getTextContent(pre),
    ['export const a = 1', 'export const b = 2', 'export const c = 3'].join('\n')
  )
})

test('getTextContent preserves a blank line between data-line nodes', () => {
  const line = (text) => React.createElement('span', { 'data-line': '' }, text)
  const code = React.createElement('code', null, [line('a'), '\n', line(''), '\n', line('b')])

  assert.equal(getTextContent(code), 'a\n\nb')
})
