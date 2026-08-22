const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildMarkdownDocument, MORE_DOCS_POINTER, LLMS_TXT_DIRECTIVE } = loadTsModule(
  'utils/docs/buildMarkdownDocument.ts'
)

test('buildMarkdownDocument renders title-only markdown with the llms.txt directive', () => {
  const markdown = buildMarkdownDocument({
    title: 'Docs Title',
  })

  assert.equal(markdown, `# Docs Title\n\n${LLMS_TXT_DIRECTIVE}`)
})

test('LLMS_TXT_DIRECTIVE matches the required Agent Score directive', () => {
  assert.equal(
    LLMS_TXT_DIRECTIVE,
    '> For the complete documentation index, see [llms.txt](https://signoz.io/llms.txt). Markdown versions are also available by appending `.md` to documentation URLs.'
  )
})

test('buildMarkdownDocument emits the directive once, right after title and description', () => {
  const markdown = buildMarkdownDocument({
    title: 'Docs Title',
    description: 'Doc description.',
    tags: ['logs'],
    bodyMarkdown: 'Body content.',
    footerLines: [MORE_DOCS_POINTER],
  })

  const escaped = LLMS_TXT_DIRECTIVE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  assert.equal((markdown.match(new RegExp(escaped, 'g')) || []).length, 1)
  assert.equal(
    markdown.startsWith(`# Docs Title\n\nDoc description.\n\n${LLMS_TXT_DIRECTIVE}\n\nTags:`),
    true
  )
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
