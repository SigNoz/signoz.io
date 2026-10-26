const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { loadTsModule } = require('./helpers/loadTsModule')

const { GET } = loadTsModule('app/(site)/docs/sitemap.md/route.ts')

const DOCS_DIR = path.join(__dirname, '..', 'data', 'docs')
const MARKDOWN_URL_PATTERN = /^https:\/\/signoz\.io\/docs\/[^#?\s]+\.md(#[\w-]+)?$/

let cachedBody

const getBody = async () => {
  if (!cachedBody) {
    const response = await GET()
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /^text\/markdown/)
    cachedBody = await response.text()
  }
  return cachedBody
}

const getLinks = async () =>
  [...(await getBody()).matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1])

const docsFileExists = (markdownUrl) => {
  const slug = markdownUrl.replace('https://signoz.io/docs/', '').replace(/\.md(#.*)?$/, '')
  return [`${slug}.mdx`, `${slug}.md`, path.join(slug, 'index.mdx')].some((candidate) =>
    fs.existsSync(path.join(DOCS_DIR, candidate))
  )
}

test('docs sitemap.md links every page by its absolute markdown URL', async () => {
  const links = await getLinks()

  assert.equal(links.length > 100, true)
  links.forEach((url) => {
    assert.match(url, MARKDOWN_URL_PATTERN, `not an absolute .md docs link: ${url}`)
  })
})

test('docs sitemap.md keeps fragments after the .md suffix', async () => {
  const links = await getLinks()

  assert.equal(
    links.includes('https://signoz.io/docs/metrics-management/send-metrics.md#applications'),
    true
  )
})

test('docs sitemap.md links resolve to real docs pages', async () => {
  const links = await getLinks()

  for (const expected of [
    'https://signoz.io/docs/install.md',
    'https://signoz.io/docs/instrumentation/opentelemetry-python.md',
    'https://signoz.io/docs/metrics-management/send-metrics.md#applications',
  ]) {
    assert.equal(links.includes(expected), true, `missing ${expected}`)
    assert.equal(docsFileExists(expected), true, `no docs file for ${expected}`)
  }

  // The docs root is served from the introduction page, not a data/docs file.
  const unresolved = [...new Set(links.filter((url) => !docsFileExists(url)))]
  assert.deepEqual(unresolved, ['https://signoz.io/docs/introduction.md'])
})
