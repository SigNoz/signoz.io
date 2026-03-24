const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildMarkdownDocument, MORE_DOCS_POINTER } = loadTsModule(
  'utils/docs/buildMarkdownDocument.ts'
)

test('buildMarkdownDocument renders title-only markdown', () => {
  const markdown = buildMarkdownDocument({
    title: 'Docs Title',
  })

  assert.equal(markdown, '# Docs Title')
})

test('buildMarkdownDocument renders tags without definitions by default', () => {
  const markdown = buildMarkdownDocument({
    title: 'Docs Title',
    tags: ['logs', 'metrics'],
    bodyMarkdown: 'Body content.',
  })

  assert.match(markdown, /^# Docs Title$/m)
  assert.match(markdown, /^Tags: logs, metrics$/m)
  assert.doesNotMatch(markdown, /Tag definitions:/)
  assert.match(markdown, /Body content\./)
})

test('buildMarkdownDocument includes tag definitions when requested', () => {
  const markdown = buildMarkdownDocument({
    title: 'Docs Title',
    tags: ['Self-Host'],
    includeTagDefinitions: true,
    bodyMarkdown: 'Body content.',
  })

  assert.match(markdown, /^Tags: Self-Host$/m)
  assert.match(markdown, /^Tag definitions:$/m)
  assert.match(markdown, /^- Self-Host:/m)
})

test('buildMarkdownDocument appends footer lines exactly once', () => {
  const markdown = buildMarkdownDocument({
    title: 'Docs Title',
    bodyMarkdown: 'Body content.',
    footerLines: [MORE_DOCS_POINTER],
  })

  assert.equal((markdown.match(new RegExp(MORE_DOCS_POINTER, 'g')) || []).length, 1)
  assert.match(markdown, new RegExp(`${MORE_DOCS_POINTER}$`))
})

test('buildMarkdownDocument normalizes repeated blank lines', () => {
  const markdown = buildMarkdownDocument({
    title: 'Docs Title',
    description: 'Line one.\n\n\nLine two.',
    bodyMarkdown: 'Body content.',
    footerLines: [MORE_DOCS_POINTER],
  })

  assert.doesNotMatch(markdown, /\n{3,}/)
})
