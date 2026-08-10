const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  shouldRewriteDocsToMarkdown,
  normalizeDocsSlugFromPathname,
  buildDocsMarkdownRewritePath,
  resolveDocsMarkdownSlug,
  stripMarkdownExtension,
  hasMarkdownExtension,
  slugFromParams,
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

test('shouldRewriteDocsToMarkdown rewrites .md docs URLs without the Accept header', async () => {
  assert.equal(shouldRewriteDocsToMarkdown('/docs/introduction.md', false), true)
  assert.equal(shouldRewriteDocsToMarkdown('/docs/introduction.md/', false), true)
  assert.equal(shouldRewriteDocsToMarkdown('/docs/metrics-management/overview.md', false), true)
  // The docs index as markdown.
  assert.equal(shouldRewriteDocsToMarkdown('/docs.md', false), true)
})

test('shouldRewriteDocsToMarkdown still excludes sitemap.md and non-docs .md paths', async () => {
  assert.equal(shouldRewriteDocsToMarkdown('/docs/sitemap.md', false), false)
  assert.equal(shouldRewriteDocsToMarkdown('/docs/sitemap.md/', false), false)
  assert.equal(shouldRewriteDocsToMarkdown('/pricing.md', false), false)
  assert.equal(shouldRewriteDocsToMarkdown('/blog/post-slug.md', false), false)
  assert.equal(shouldRewriteDocsToMarkdown('/api/docs-markdown/introduction.md', false), false)
})

test('normalizeDocsSlugFromPathname strips the .md extension', async () => {
  assert.equal(normalizeDocsSlugFromPathname('/docs/introduction.md'), 'introduction')
  assert.equal(normalizeDocsSlugFromPathname('/docs/introduction.md/'), 'introduction')
  assert.equal(normalizeDocsSlugFromPathname('/docs/foo/bar.md'), 'foo/bar')
  assert.equal(normalizeDocsSlugFromPathname('/docs.md'), '')
})

test('buildDocsMarkdownRewritePath maps .md URLs to the internal route', async () => {
  assert.equal(
    buildDocsMarkdownRewritePath('/docs/introduction.md'),
    '/api/docs-markdown/introduction'
  )
  assert.equal(buildDocsMarkdownRewritePath('/docs/foo/bar.md/'), '/api/docs-markdown/foo/bar')
  assert.equal(buildDocsMarkdownRewritePath('/docs.md'), '/api/docs-markdown')
})

test('.md and Accept-header requests resolve to the same slug', async () => {
  assert.equal(
    buildDocsMarkdownRewritePath('/docs/metrics-management/overview.md'),
    buildDocsMarkdownRewritePath('/docs/metrics-management/overview')
  )
})

test('stripMarkdownExtension and hasMarkdownExtension handle edge cases', async () => {
  assert.equal(stripMarkdownExtension('/docs/foo.md'), '/docs/foo')
  assert.equal(stripMarkdownExtension('/docs/foo'), '/docs/foo')
  // A doc slug that merely contains "md" is untouched.
  assert.equal(stripMarkdownExtension('/docs/foo-md'), '/docs/foo-md')
  assert.equal(stripMarkdownExtension('/docs/foo.mdx'), '/docs/foo.mdx')
  assert.equal(hasMarkdownExtension('/docs/foo.md'), true)
  assert.equal(hasMarkdownExtension('/docs/foo.md/'), true)
  assert.equal(hasMarkdownExtension('/docs/foo'), false)
  assert.equal(hasMarkdownExtension('/docs/foo.mdx'), false)
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

test('resolveDocsMarkdownSlug strips a trailing .md from the last segment', async () => {
  assert.equal(resolveDocsMarkdownSlug(['introduction.md']), 'introduction')
  assert.equal(
    resolveDocsMarkdownSlug(['metrics-management', 'overview.md']),
    'metrics-management/overview'
  )
  assert.equal(resolveDocsMarkdownSlug(['.md']), 'introduction')
})

test('slugFromParams decodes catch-all segments without defaulting', async () => {
  assert.equal(slugFromParams([]), '')
  assert.equal(slugFromParams(['ai', 'signoz-mcp-server']), 'ai/signoz-mcp-server')
  assert.equal(slugFromParams(['ai%2Fsignoz-mcp-server']), 'ai/signoz-mcp-server')
  assert.equal(slugFromParams(['install', 'docker']), 'install/docker')
  // Malformed percent-encoding should not throw
  assert.equal(slugFromParams(['foo%zz']), 'foo%zz')
})
