const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { prefersMarkdownFromAccept, parseAcceptHeader } = loadTsModule('utils/acceptNegotiation.ts')

test('explicit markdown opts in', () => {
  assert.equal(prefersMarkdownFromAccept('text/markdown'), true)
  assert.equal(prefersMarkdownFromAccept('TEXT/MARKDOWN'), true)
  assert.equal(prefersMarkdownFromAccept(' text/markdown '), true)
  assert.equal(prefersMarkdownFromAccept('text/markdown;charset=utf-8'), true)
})

test('a tie resolves to markdown so existing agent traffic is unchanged', () => {
  // The dominant production pattern: both default to q=1.
  assert.equal(prefersMarkdownFromAccept('text/markdown, text/html'), true)
  assert.equal(prefersMarkdownFromAccept('text/html, text/markdown'), true)
  assert.equal(prefersMarkdownFromAccept('text/markdown;q=0.5, text/html;q=0.5'), true)
})

test('higher-ranked HTML wins — the acceptmarkdown.com q-value warning', () => {
  assert.equal(prefersMarkdownFromAccept('text/html;q=0.9, text/markdown;q=0.1'), false)
  assert.equal(prefersMarkdownFromAccept('text/markdown;q=0.1, text/html;q=0.9'), false)
  assert.equal(
    prefersMarkdownFromAccept(
      'text/html,application/xhtml+xml,application/xml;q=0.9,text/markdown;q=0.1'
    ),
    false
  )
})

test('q=0 is an explicit refusal, not a request', () => {
  assert.equal(prefersMarkdownFromAccept('text/markdown;q=0'), false)
  assert.equal(prefersMarkdownFromAccept('text/markdown;q=0.0'), false)
  assert.equal(prefersMarkdownFromAccept('text/html, text/markdown;q=0'), false)
})

test('wildcards never opt in — default curl and crawlers keep getting HTML', () => {
  assert.equal(prefersMarkdownFromAccept('*/*'), false)
  assert.equal(prefersMarkdownFromAccept('text/*'), false)
  assert.equal(prefersMarkdownFromAccept('text/html,application/xhtml+xml,*/*;q=0.8'), false)
})

test('markdown still wins against a wildcard fallback', () => {
  assert.equal(prefersMarkdownFromAccept('text/markdown, */*'), true)
  assert.equal(prefersMarkdownFromAccept('text/markdown, */*;q=0.1'), true)
  assert.equal(prefersMarkdownFromAccept('text/markdown;q=0.2, */*;q=0.8'), false)
})

test('missing or malformed headers fall back safely', () => {
  assert.equal(prefersMarkdownFromAccept(''), false)
  assert.equal(prefersMarkdownFromAccept(null), false)
  assert.equal(prefersMarkdownFromAccept(undefined), false)
  // Unparseable q keeps the RFC default of 1 rather than dropping the range.
  assert.equal(prefersMarkdownFromAccept('text/markdown;q=abc'), true)
  assert.equal(prefersMarkdownFromAccept('text/markdown;q=7'), true)
  assert.equal(prefersMarkdownFromAccept(',,text/markdown,,'), true)
})

test('parseAcceptHeader reports types and qualities', () => {
  assert.deepEqual(parseAcceptHeader('text/html;q=0.9, text/markdown;q=0.1'), [
    { type: 'text/html', quality: 0.9 },
    { type: 'text/markdown', quality: 0.1 },
  ])
  assert.deepEqual(parseAcceptHeader('text/markdown'), [{ type: 'text/markdown', quality: 1 }])
})
