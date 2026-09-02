const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  parseApiReferenceVersionPath,
  shouldRewriteApiReferenceVersionToMarkdown,
  buildApiReferenceVersionMarkdownRewritePath,
  shouldRewriteApiReferenceToOpenAPISpec,
  shouldRewriteApiReferenceIndexToMarkdown,
} = loadTsModule('utils/apiReferenceMarkdownRouting.ts')

test('parseApiReferenceVersionPath accepts release tags, latest, and .md twins', () => {
  assert.equal(parseApiReferenceVersionPath('/api-reference/v0.139.0'), 'v0.139.0')
  assert.equal(parseApiReferenceVersionPath('/api-reference/v0.139.0/'), 'v0.139.0')
  assert.equal(parseApiReferenceVersionPath('/api-reference/v0.139.0.md'), 'v0.139.0')
  assert.equal(parseApiReferenceVersionPath('/api-reference/latest'), 'latest')
  assert.equal(parseApiReferenceVersionPath('/api-reference/latest.md'), 'latest')
})

test('parseApiReferenceVersionPath rejects the index and non-version segments', () => {
  assert.equal(parseApiReferenceVersionPath('/api-reference'), null)
  assert.equal(parseApiReferenceVersionPath('/api-reference/'), null)
  assert.equal(parseApiReferenceVersionPath('/api-reference/not-a-version'), null)
  assert.equal(parseApiReferenceVersionPath('/api-reference/v0.139.0/query-range'), null)
  assert.equal(parseApiReferenceVersionPath('/docs/introduction'), null)
})

// 31 requests over 30 days across 7 release tags, all previously 404.
test('versioned .md URLs rewrite to the markdown twin', () => {
  assert.equal(
    shouldRewriteApiReferenceVersionToMarkdown('/api-reference/v0.139.0.md', false),
    true
  )
  assert.equal(shouldRewriteApiReferenceVersionToMarkdown('/api-reference/latest.md', false), true)
  assert.equal(
    buildApiReferenceVersionMarkdownRewritePath('/api-reference/v0.139.0.md'),
    '/api/api-reference-markdown/v0.139.0'
  )
  assert.equal(
    buildApiReferenceVersionMarkdownRewritePath('/api-reference/latest'),
    '/api/api-reference-markdown/latest'
  )
})

test('Accept: text/markdown on a version now gets markdown, not YAML', () => {
  assert.equal(shouldRewriteApiReferenceVersionToMarkdown('/api-reference/v0.139.0', true), true)
  assert.equal(
    shouldRewriteApiReferenceToOpenAPISpec('/api-reference/v0.139.0', 'text/markdown'),
    false
  )
})

test('YAML is still served when the client actually asks for YAML', () => {
  ;['text/yaml', 'application/yaml', 'application/x-yaml', 'application/vnd.oai.openapi'].forEach(
    (accept) => {
      assert.equal(
        shouldRewriteApiReferenceToOpenAPISpec('/api-reference/v0.139.0', accept),
        true,
        `expected YAML for Accept: ${accept}`
      )
    }
  )
  assert.equal(shouldRewriteApiReferenceToOpenAPISpec('/api-reference/latest', 'text/yaml'), true)
})

test('the YAML path no longer depends on user-agent sniffing', () => {
  // Previously gated on isBot, so a browser UA sending the same header got HTML.
  assert.equal(shouldRewriteApiReferenceToOpenAPISpec('/api-reference/v0.139.0', 'text/yaml'), true)
  assert.equal(
    shouldRewriteApiReferenceToOpenAPISpec('/api-reference/v0.139.0', 'text/html'),
    false
  )
  assert.equal(shouldRewriteApiReferenceToOpenAPISpec('/api-reference/v0.139.0', ''), false)
})

test('the index keeps its own markdown twin and is never treated as a version', () => {
  assert.equal(shouldRewriteApiReferenceIndexToMarkdown('/api-reference', true), true)
  assert.equal(shouldRewriteApiReferenceVersionToMarkdown('/api-reference', true), false)
  assert.equal(shouldRewriteApiReferenceToOpenAPISpec('/api-reference', 'text/yaml'), false)
})

test('plain HTML requests to a version are untouched', () => {
  assert.equal(shouldRewriteApiReferenceVersionToMarkdown('/api-reference/v0.139.0', false), false)
  assert.equal(
    shouldRewriteApiReferenceToOpenAPISpec('/api-reference/v0.139.0', 'text/html'),
    false
  )
})
