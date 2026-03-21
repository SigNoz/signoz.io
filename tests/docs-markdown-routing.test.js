const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  shouldRewriteDocsToMarkdown,
  normalizeDocsSlugFromPathname,
  buildDocsMarkdownRewritePath,
  resolveDocsMarkdownSlug,
} = loadTsModule('utils/docs/markdownRouting.ts')

test('shouldRewriteDocsToMarkdown rewrites docs paths when markdown is preferred', async () => {
  assert.equal(shouldRewriteDocsToMarkdown('/docs', true), true)
  assert.equal(shouldRewriteDocsToMarkdown('/docs/metrics-management/overview', true), true)
})

test('shouldRewriteDocsToMarkdown does not rewrite when markdown is not preferred', async () => {
  assert.equal(shouldRewriteDocsToMarkdown('/docs', false), false)
  assert.equal(shouldRewriteDocsToMarkdown('/docs/logs-management/send-logs', false), false)
})

test('shouldRewriteDocsToMarkdown excludes sitemap and internal markdown routes', async () => {
  assert.equal(shouldRewriteDocsToMarkdown('/docs/sitemap.md', true), false)
  assert.equal(shouldRewriteDocsToMarkdown('/docs/sitemap.md/', true), false)
  assert.equal(shouldRewriteDocsToMarkdown('/api/docs-markdown', true), false)
  assert.equal(shouldRewriteDocsToMarkdown('/api/docs-markdown/introduction', true), false)
})

test('shouldRewriteDocsToMarkdown does not rewrite non-docs paths', async () => {
  assert.equal(shouldRewriteDocsToMarkdown('/blog/post-slug', true), false)
  assert.equal(shouldRewriteDocsToMarkdown('/pricing', true), false)
  assert.equal(shouldRewriteDocsToMarkdown('/', true), false)
})

test('normalizeDocsSlugFromPathname normalizes docs paths', async () => {
  assert.equal(normalizeDocsSlugFromPathname('/docs'), '')
  assert.equal(normalizeDocsSlugFromPathname('/docs/'), '')
  assert.equal(normalizeDocsSlugFromPathname('/docs/foo/bar'), 'foo/bar')
  assert.equal(normalizeDocsSlugFromPathname('/docs/foo/bar/'), 'foo/bar')
})

test('buildDocsMarkdownRewritePath builds expected internal route', async () => {
  assert.equal(buildDocsMarkdownRewritePath('/docs'), '/api/docs-markdown')
  assert.equal(buildDocsMarkdownRewritePath('/docs/'), '/api/docs-markdown')
  assert.equal(buildDocsMarkdownRewritePath('/docs/foo/bar/'), '/api/docs-markdown/foo/bar')
})

test('resolveDocsMarkdownSlug resolves slug from route segments', async () => {
  assert.equal(resolveDocsMarkdownSlug(), 'introduction')
  assert.equal(resolveDocsMarkdownSlug([]), 'introduction')
  assert.equal(resolveDocsMarkdownSlug(['', '  ']), 'introduction')
  assert.equal(resolveDocsMarkdownSlug(['%20introduction%20']), 'introduction')
  assert.equal(
    resolveDocsMarkdownSlug(['metrics-management', 'overview']),
    'metrics-management/overview'
  )
  assert.equal(resolveDocsMarkdownSlug(['logs%2Fmanagement']), 'logs/management')
})
