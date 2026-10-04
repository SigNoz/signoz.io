const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  API_REFERENCE_MARKDOWN_PATH,
  parseApiReferencePath,
  resolveApiReferenceRewrite,
  isNegotiatedApiReferencePath,
} = loadTsModule('utils/apiReferenceMarkdownRouting.ts')

const { resolveMarkdownAlternatePath } = loadTsModule('utils/markdownAlternate.ts')

test('parseApiReferencePath classifies the index with and without trailing slash', () => {
  assert.deepEqual(parseApiReferencePath('/api-reference'), { kind: 'index' })
  assert.deepEqual(parseApiReferencePath('/api-reference/'), { kind: 'index' })
})

test('parseApiReferencePath accepts release tags, latest, and .md twins', () => {
  assert.deepEqual(parseApiReferencePath('/api-reference/v0.139.0'), {
    kind: 'version',
    version: 'v0.139.0',
    explicitMarkdown: false,
  })
  assert.deepEqual(parseApiReferencePath('/api-reference/v0.139.0/'), {
    kind: 'version',
    version: 'v0.139.0',
    explicitMarkdown: false,
  })
  assert.deepEqual(parseApiReferencePath('/api-reference/v0.139.0.md'), {
    kind: 'version',
    version: 'v0.139.0',
    explicitMarkdown: true,
  })
  assert.deepEqual(parseApiReferencePath('/api-reference/latest'), {
    kind: 'version',
    version: 'latest',
    explicitMarkdown: false,
  })
  assert.deepEqual(parseApiReferencePath('/api-reference/latest.md'), {
    kind: 'version',
    version: 'latest',
    explicitMarkdown: true,
  })
})

test('parseApiReferencePath rejects non-version segments and nested paths', () => {
  assert.equal(parseApiReferencePath('/api-reference/not-a-version'), null)
  assert.equal(parseApiReferencePath('/api-reference/v0.139.0/query-range'), null)
  assert.equal(parseApiReferencePath('/api-reference.md'), null)
  assert.equal(parseApiReferencePath('/docs/introduction'), null)
  assert.equal(parseApiReferencePath('/'), null)
})

test('markdown requests for the index resolve to the /api-reference.md twin', () => {
  assert.equal(
    resolveApiReferenceRewrite('/api-reference', 'text/markdown'),
    API_REFERENCE_MARKDOWN_PATH
  )
  assert.equal(resolveApiReferenceRewrite('/api-reference', 'text/html'), null)
  assert.equal(resolveApiReferenceRewrite('/api-reference', ''), null)
})

test('versioned .md URLs resolve to the markdown twin without any Accept header', () => {
  assert.equal(
    resolveApiReferenceRewrite('/api-reference/v0.139.0.md', ''),
    '/api/api-reference-markdown/v0.139.0'
  )
  assert.equal(
    resolveApiReferenceRewrite('/api-reference/latest.md', ''),
    '/api/api-reference-markdown/latest'
  )
})

test('Accept: text/markdown on a version gets markdown, not YAML', () => {
  assert.equal(
    resolveApiReferenceRewrite('/api-reference/v0.139.0', 'text/markdown'),
    '/api/api-reference-markdown/v0.139.0'
  )
})

test('YAML is served when the client actually asks for YAML', () => {
  ;['text/yaml', 'application/yaml', 'application/x-yaml', 'application/vnd.oai.openapi'].forEach(
    (accept) => {
      assert.equal(
        resolveApiReferenceRewrite('/api-reference/v0.139.0', accept),
        '/api/api-reference-openapi/v0.139.0',
        `expected the spec rewrite for Accept: ${accept}`
      )
    }
  )
  assert.equal(
    resolveApiReferenceRewrite('/api-reference/latest', 'text/yaml'),
    '/api/api-reference-openapi/latest'
  )
})

test('an explicit .md extension wins over a YAML Accept header', () => {
  assert.equal(
    resolveApiReferenceRewrite('/api-reference/v0.139.0.md', 'application/yaml'),
    '/api/api-reference-markdown/v0.139.0'
  )
})

test('the index never serves YAML and is never treated as a version', () => {
  assert.equal(resolveApiReferenceRewrite('/api-reference', 'text/yaml'), null)
})

test('plain HTML requests pass through untouched', () => {
  assert.equal(resolveApiReferenceRewrite('/api-reference/v0.139.0', 'text/html'), null)
  assert.equal(resolveApiReferenceRewrite('/api-reference/v0.139.0', ''), null)
})

test('negotiated api-reference URLs are the index and versions without .md', () => {
  assert.equal(isNegotiatedApiReferencePath('/api-reference'), true)
  assert.equal(isNegotiatedApiReferencePath('/api-reference/'), true)
  assert.equal(isNegotiatedApiReferencePath('/api-reference/v0.139.0'), true)
  assert.equal(isNegotiatedApiReferencePath('/api-reference/latest'), true)

  assert.equal(isNegotiatedApiReferencePath('/api-reference.md'), false)
  assert.equal(isNegotiatedApiReferencePath('/api-reference/v0.139.0.md'), false)
  assert.equal(isNegotiatedApiReferencePath('/api-reference/not-a-version'), false)
  assert.equal(isNegotiatedApiReferencePath('/pricing'), false)
})

test('resolveMarkdownAlternatePath composes docs, api-reference, and page twins', () => {
  assert.equal(resolveMarkdownAlternatePath('/docs/introduction/'), '/docs/introduction.md')
  assert.equal(resolveMarkdownAlternatePath('/api-reference'), '/api-reference.md')
  assert.equal(
    resolveMarkdownAlternatePath('/api-reference/v0.139.0'),
    '/api-reference/v0.139.0.md'
  )
  assert.equal(resolveMarkdownAlternatePath('/api-reference/latest/'), '/api-reference/latest.md')
  assert.equal(resolveMarkdownAlternatePath('/blog/some-post'), '/blog/some-post.md')
  assert.equal(resolveMarkdownAlternatePath('/pricing/'), '/pricing.md')
})

test('resolveMarkdownAlternatePath returns null when there is no twin', () => {
  assert.equal(resolveMarkdownAlternatePath('/api-reference.md'), null)
  assert.equal(resolveMarkdownAlternatePath('/api-reference/v0.139.0.md'), null)
  assert.equal(resolveMarkdownAlternatePath('/api-reference/not-a-version'), null)
  assert.equal(resolveMarkdownAlternatePath('/docs/sitemap.md'), null)
  assert.equal(resolveMarkdownAlternatePath('/llms.txt'), null)
  assert.equal(resolveMarkdownAlternatePath('/skill.md'), null)
  assert.equal(resolveMarkdownAlternatePath('/'), null)
})
