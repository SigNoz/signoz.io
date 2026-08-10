const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildLlmsFullMarkdown } = loadTsModule('utils/docs/buildLlmsFullMarkdown.ts')

const MARKDOWN_LINK_LINE = /^- \[[^\]]+\]\(https:\/\/signoz\.io\/[^()\s]*\)(?:: \S.*)?$/

test('buildLlmsFullMarkdown is a deterministic entry-point map', async () => {
  const [first, second] = await Promise.all([buildLlmsFullMarkdown(), buildLlmsFullMarkdown()])
  assert.equal(first, second)

  assert.equal(first.startsWith('# SigNoz'), true)
  assert.equal(first.includes('https://signoz.io/llms.txt'), true)
})

test('buildLlmsFullMarkdown links every markdown sitemap and site section', async () => {
  const body = await buildLlmsFullMarkdown()

  ;[
    'https://signoz.io/docs/sitemap.md',
    'https://signoz.io/blogs/sitemap.md',
    'https://signoz.io/products/sitemap.md',
    'https://signoz.io/alternatives/sitemap.md',
    'https://signoz.io/corporate/sitemap.md',
  ].forEach((url) => assert.equal(body.includes(`](${url})`), true, `missing sitemap link ${url}`))
  ;[
    '## Documentation',
    '## Blog & learning content',
    '## Product',
    '## Alternatives & migration',
    '## Company',
  ].forEach((heading) => assert.equal(body.includes(heading), true, `missing ${heading}`))

  // Starter docs and inline entry points from the shared route constants.
  assert.equal(body.includes('](https://signoz.io/docs/introduction/)'), true)
  assert.equal(body.includes('](https://signoz.io/pricing/)'), true)
  assert.equal(body.includes('](https://signoz.io/blog/)'), true)
  assert.equal(body.includes('](https://signoz.io/datadog-alternative/)'), true)
  assert.equal(body.includes('](https://signoz.io/about-us/)'), true)
})

test('buildLlmsFullMarkdown stays compact: entry points, not doc bodies', async () => {
  const body = await buildLlmsFullMarkdown()

  assert.equal(Buffer.byteLength(body, 'utf8') < 64 * 1024, true, 'llms-full must stay small')
  assert.equal(/^URL: /m.test(body), false, 'must not embed the per-doc corpus format')
  assert.equal(body.includes('```'), false, 'must not embed doc bodies')

  const bullets = body.split('\n').filter((line) => line.startsWith('- '))
  assert.equal(bullets.length > 30, true, `expected many entry points, got ${bullets.length}`)
  bullets.forEach((line) => assert.match(line, MARKDOWN_LINK_LINE))
})
