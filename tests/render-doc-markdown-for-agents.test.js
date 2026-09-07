const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { renderDocMarkdownForAgents } = loadTsModule('utils/docs/renderDocMarkdownForAgents.ts')
const { MORE_DOCS_POINTER, LLMS_TXT_DIRECTIVE } = loadTsModule(
  'utils/docs/buildMarkdownDocument.ts'
)

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const createDoc = (overrides = {}) => ({
  _id: 'doc-1',
  slug: 'test-doc',
  title: 'Test Doc',
  description: 'Test description.',
  docTags: ['logs'],
  body: {
    raw: 'Raw body.',
    code: `return {
      default: function MDXContent() {
        return _jsx_runtime.jsx('p', { children: 'Rendered body.' })
      }
    }`,
  },
  toc: [],
  ...overrides,
})

test('renderDocMarkdownForAgents includes metadata and shared footer once', async () => {
  const markdown = await renderDocMarkdownForAgents(createDoc())

  assert.match(markdown, /^# Test Doc$/m)
  assert.match(markdown, /Test description\./)
  assert.match(markdown, /^Tags: logs$/m)
  // Compiles body.raw via MDX (not the legacy body.code payload).
  assert.match(markdown, /Raw body\./)
  assert.equal((markdown.match(new RegExp(MORE_DOCS_POINTER, 'g')) || []).length, 1)
  assert.match(markdown, new RegExp(`${MORE_DOCS_POINTER}$`))
})

test('renderDocMarkdownForAgents places the llms.txt directive once, after the description', async () => {
  const markdown = await renderDocMarkdownForAgents(createDoc())

  const matches = markdown.match(new RegExp(escapeRegExp(LLMS_TXT_DIRECTIVE), 'g')) || []
  assert.equal(matches.length, 1)
  assert.equal(
    markdown.startsWith(`# Test Doc\n\nTest description.\n\n${LLMS_TXT_DIRECTIVE}\n\nTags: logs`),
    true
  )
})

test('renderDocMarkdownForAgents avoids duplicating the leading title heading', async () => {
  const markdown = await renderDocMarkdownForAgents(
    createDoc({
      body: {
        raw: '# Test Doc\n\nRaw body.',
        code: `return {
          default: function MDXContent() {
            return _jsx_runtime.jsxs(_jsx_runtime.Fragment, {
              children: [
                _jsx_runtime.jsx('h1', { children: 'Test Doc' }),
                _jsx_runtime.jsx('p', { children: 'Rendered body.' })
              ]
            })
          }
        }`,
      },
    })
  )

  assert.equal((markdown.match(/^# Test Doc$/gm) || []).length, 1)
})

test('renderDocMarkdownForAgents preserves MCP install links for agent consumers', async () => {
  const markdown = await renderDocMarkdownForAgents(
    createDoc({
      _id: 'doc-mcp-links',
      slug: 'test-doc-mcp-links',
      body: {
        raw: '<MCPInstallButton client="cursor">Add to Cursor</MCPInstallButton>',
        code: `return {
          default: function MDXContent(props) {
            const { components } = props
            return _jsx_runtime.jsx(components.MCPInstallButton, {
              client: 'cursor',
              children: 'Add to Cursor'
            })
          }
        }`,
      },
    })
  )

  assert.match(markdown, /Add to Cursor \(US\)/)
  assert.match(markdown, /cursor:\/\/anysphere\.cursor-deeplink\/mcp\/install/)
  assert.match(markdown, /Add to Cursor \(EU\)/)
})

test('renderDocMarkdownForAgents uses listicle markdown titles from JSON', async () => {
  const markdown = await renderDocMarkdownForAgents(
    createDoc({
      _id: 'doc-listicle-title',
      slug: 'aws-monitoring/overview',
      title: 'AWS Monitoring Overview',
      description: 'Discover supported AWS services.',
      docTags: ['SigNoz Cloud', 'Self-Host'],
      body: {
        raw: '<Listicle name="aws-monitoring" />',
        code: `return {
          default: function MDXContent(props) {
            const { components } = props
            return _jsx_runtime.jsx(components.Listicle, {
              name: 'aws-monitoring'
            })
          }
        }`,
      },
    })
  )

  assert.match(markdown, /^## AWS Monitoring Guides$/m)
  assert.doesNotMatch(markdown, /^## Listicle$/m)
})

test('renderDocMarkdownForAgents keeps fenced body chrome-free', async () => {
  const markdown = await renderDocMarkdownForAgents(
    createDoc({
      _id: 'doc-fence',
      slug: 'test-doc-fence',
      body: {
        raw: `Intro.

\`\`\`ts minimap collapse={5}
const a = 1
const b = 2
\`\`\`
`,
        code: '',
      },
    })
  )

  assert.match(markdown, /const a = 1/)
  assert.match(markdown, /const b = 2/)
  assert.doesNotMatch(markdown, /Copy code/)
  assert.doesNotMatch(markdown, /Expand \d+ lines/)
  assert.doesNotMatch(markdown, /Collapse/)
  assert.doesNotMatch(markdown, /Code minimap/)
  assert.match(markdown, new RegExp(`${MORE_DOCS_POINTER}$`))
})

test('renderDocMarkdownForAgents expands CodeTabs stubs with all labels', async () => {
  const markdown = await renderDocMarkdownForAgents(
    createDoc({
      _id: 'doc-codetabs',
      slug: 'test-doc-codetabs',
      body: {
        raw: `<CodeTabs>
  <CodeTab value="http" label="HTTP" default>

\`\`\`bash
curl https://example.com
\`\`\`

  </CodeTab>
  <CodeTab value="grpc" label="gRPC">

\`\`\`bash
grpcurl example.com:443 list
\`\`\`

  </CodeTab>
</CodeTabs>
`,
        code: '',
      },
    })
  )

  assert.match(markdown, /^### HTTP$/m)
  assert.match(markdown, /^### gRPC$/m)
  assert.match(markdown, /curl https:\/\/example\.com/)
  assert.match(markdown, /grpcurl example\.com:443 list/)
  assert.doesNotMatch(markdown, /Copy code/)
})
