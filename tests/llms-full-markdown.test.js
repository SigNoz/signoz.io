const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildLlmsFullMarkdownFromDocs, closeUnterminatedFence, orderDocsBySidebar } = loadTsModule(
  'utils/docs/buildLlmsFullMarkdown.ts'
)
const { isListedDoc } = loadTsModule('utils/docs/listedDocs.ts')
const { LLMS_TXT_DIRECTIVE, MORE_DOCS_POINTER } = loadTsModule(
  'utils/docs/buildMarkdownDocument.ts'
)

const repoRoot = path.resolve(__dirname, '..')

const createDoc = (slug, overrides = {}) => ({
  slug,
  title: `Title ${slug}`,
  description: `Description ${slug}.`,
  body: { raw: `Body of ${slug}.` },
  ...overrides,
})

// Real docs that exercise Tabs, Admonition, KeyPointCallout, ToggleHeading,
// and long code samples.
const REAL_DOC_SLUGS = [
  'instrumentation/opentelemetry-python',
  'userguide/manage-dashboards',
  'install/argocd',
  'logs-management/send-logs/aws-lambda-nodejs',
  'ai/signoz-mcp-server',
  'glossary',
]

const loadRealDoc = (slug) => {
  const source = fs.readFileSync(path.join(repoRoot, 'data/docs', `${slug}.mdx`), 'utf8')
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n?/)
  const title = frontmatter[1].match(/^title:\s*['"]?(.+?)['"]?\s*$/m)[1]
  return { slug, title, body: { raw: source.slice(frontmatter[0].length) } }
}

const sourceLines = (body) => body.split('\n').filter((line) => line.startsWith('Source: '))

// Strips fenced code so JSX/XML examples inside code samples are not flagged.
const proseOnly = (markdown) => markdown.replace(/```[\s\S]*?```/g, '')

test('llms-full lists exactly the docs the docs sitemap lists, plus the introduction', async () => {
  const docs = [
    createDoc('setup/one'),
    createDoc('setup/two'),
    createDoc('introduction'),
    createDoc('drafts/hidden', { draft: true }),
  ]
  const body = await buildLlmsFullMarkdownFromDocs(docs)

  const expected = docs.filter(isListedDoc).length + 1
  assert.equal(sourceLines(body).length, expected)
  assert.equal(body.includes('https://signoz.io/docs/drafts/hidden/'), false)
  assert.equal(body.includes('Body of introduction.'), false, 'CMS intro must not be duplicated')

  // Same predicate as /docs/sitemap.xml, so the two can never disagree.
  const sitemapSource = fs.readFileSync(path.join(repoRoot, 'app/(site)/docs/sitemap.ts'), 'utf8')
  assert.match(sitemapSource, /\.filter\(isListedDoc\)/)
})

test('each page gets a separator with its absolute page and markdown URLs', async () => {
  const body = await buildLlmsFullMarkdownFromDocs([createDoc('setup/one')])

  assert.equal(body.startsWith('# SigNoz Documentation\n\n> '), true)
  assert.equal(body.includes('https://signoz.io/llms.txt'), true)
  assert.match(
    body,
    /\n---\n\nSource: https:\/\/signoz\.io\/docs\/setup\/one\/\nMarkdown: https:\/\/signoz\.io\/docs\/setup\/one\.md\n\n# Title setup\/one/
  )
  assert.match(body, /Source: https:\/\/signoz\.io\/docs\/introduction\/\n/)
})

test('per-page llms.txt directive and footer pointer are not repeated in the corpus', async () => {
  const body = await buildLlmsFullMarkdownFromDocs([createDoc('setup/one'), createDoc('setup/two')])

  assert.equal(body.includes(LLMS_TXT_DIRECTIVE), false)
  assert.equal(body.includes(MORE_DOCS_POINTER), false)
})

test('docs follow sidebar order, unlisted docs follow in slug order', () => {
  const ordered = orderDocsBySidebar(
    [createDoc('z-unlisted'), createDoc('b'), createDoc('a-unlisted'), createDoc('a')],
    ['/docs/b', '/docs/a']
  )
  assert.deepEqual(
    ordered.map((doc) => doc.slug),
    ['b', 'a', 'a-unlisted', 'z-unlisted']
  )
})

test('output is deterministic', async () => {
  const docs = [createDoc('setup/two'), createDoc('setup/one')]
  const [first, second] = await Promise.all([
    buildLlmsFullMarkdownFromDocs(docs, ['/docs/setup/one']),
    buildLlmsFullMarkdownFromDocs(docs, ['/docs/setup/one']),
  ])
  assert.equal(first, second)
})

test('real docs render to clean markdown with their content and no leftover JSX', async () => {
  const docs = REAL_DOC_SLUGS.map(loadRealDoc)
  const body = await buildLlmsFullMarkdownFromDocs(docs)

  assert.equal(sourceLines(body).length, docs.length + 1)
  docs.forEach((doc) => {
    assert.equal(body.includes(`Source: https://signoz.io/docs/${doc.slug}/`), true, doc.slug)
  })
  // Known content from the Python guide and its code samples survives.
  assert.match(body, /opentelemetry-instrument/)
  assert.match(body, /```/)

  const leftoverJsx = proseOnly(body).match(/<\/?[A-Z][A-Za-z]*[\s/>]/g) || []
  assert.deepEqual(leftoverJsx, [], `leftover JSX tags: ${leftoverJsx.slice(0, 5).join(', ')}`)
  assert.equal(/className=/.test(proseOnly(body)), false)
})

test('an unclosed code fence in one page does not leak into later pages', async () => {
  const fenced = ['```yaml', '```yaml', 'key: value'].join('\n')
  const docs = [
    createDoc('a/broken', { body: { raw: `Before.\n\n${fenced}\n` } }),
    createDoc('b/after', { body: { raw: '```bash\necho ok\n```\n' } }),
  ]
  const body = await buildLlmsFullMarkdownFromDocs(docs)

  const pages = body.split('\n\n---\n\n').slice(1)
  assert.equal(pages.length, 3)
  // A page that ends outside a fence is left unchanged by the fence closer.
  pages.forEach((page) => {
    assert.equal(
      closeUnterminatedFence(page),
      page,
      `page ends inside a fence: ${page.split('\n')[0]}`
    )
  })
  assert.equal(pages[1].trimEnd().endsWith('```'), true)
})

test('closeUnterminatedFence only touches pages that end inside a fence', () => {
  const balanced = '```bash\necho ok\n```\n'
  assert.equal(closeUnterminatedFence(balanced), balanced)
  assert.equal(closeUnterminatedFence('Plain text.\n'), 'Plain text.\n')
  assert.equal(closeUnterminatedFence('```js\nlet a = 1\n'), '```js\nlet a = 1\n```')
  assert.equal(closeUnterminatedFence('~~~\ncode\n'), '~~~\ncode\n~~~')
  assert.equal(closeUnterminatedFence('````md\n```\ninner\n```\n'), '````md\n```\ninner\n```\n````')
})
