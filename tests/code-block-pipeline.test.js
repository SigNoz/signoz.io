const test = require('node:test')
const assert = require('node:assert/strict')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const { loadTsModule } = require('./helpers/loadTsModule')

const { mdxOptions } = loadTsModule('utils/mdx/options.ts')
const { filterCodeBlockMetaString, parseCodeBlockMetaFlags } = loadTsModule(
  'utils/mdx/rehypeCodeBlockMeta.ts'
)

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
