const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { renderDocMarkdownForAgents } = loadTsModule('utils/docs/renderDocMarkdownForAgents.ts')
const { MORE_DOCS_POINTER } = loadTsModule('utils/docs/buildMarkdownDocument.ts')

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
  assert.match(markdown, /Rendered body\./)
  assert.equal((markdown.match(new RegExp(MORE_DOCS_POINTER, 'g')) || []).length, 1)
  assert.match(markdown, new RegExp(`${MORE_DOCS_POINTER}$`))
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
