const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  CONTENT_MARKDOWN_SECTIONS,
  hasMarkdownExtension,
  parseContentMarkdownPath,
  shouldRewriteContentToMarkdown,
  buildContentMarkdownRewritePath,
  shouldRewritePageToMarkdown,
  buildPageMarkdownRewritePath,
  servesMarkdownAlternate,
} = loadTsModule('utils/agentMarkdownRouting.ts')

test('hasMarkdownExtension detects .md-suffixed paths with and without trailing slash', () => {
  assert.equal(hasMarkdownExtension('/blog/some-post.md'), true)
  assert.equal(hasMarkdownExtension('/pricing.md/'), true)
  assert.equal(hasMarkdownExtension('/pricing'), false)
  assert.equal(hasMarkdownExtension('/docs/sitemap.md'), true)
})

test('parseContentMarkdownPath matches CMS content sections with a slug', () => {
  assert.deepEqual(parseContentMarkdownPath('/blog/some-post'), {
    section: 'blog',
    slug: 'some-post',
  })
  assert.deepEqual(parseContentMarkdownPath('/blog/some-post.md'), {
    section: 'blog',
    slug: 'some-post',
  })
  assert.deepEqual(parseContentMarkdownPath('/comparisons/foo-vs-bar/'), {
    section: 'comparisons',
    slug: 'foo-vs-bar',
  })
  assert.deepEqual(parseContentMarkdownPath('/guides/nested/slug.md'), {
    section: 'guides',
    slug: 'nested/slug',
  })
  assert.deepEqual(parseContentMarkdownPath('/case-study/acme'), {
    section: 'case-study',
    slug: 'acme',
  })
})

test('parseContentMarkdownPath ignores section index pages and other paths', () => {
  assert.equal(parseContentMarkdownPath('/blog'), null)
  assert.equal(parseContentMarkdownPath('/blog/'), null)
  assert.equal(parseContentMarkdownPath('/blog.md'), null)
  assert.equal(parseContentMarkdownPath('/pricing'), null)
  assert.equal(parseContentMarkdownPath('/docs/introduction'), null)
})

test('shouldRewriteContentToMarkdown requires markdown intent', () => {
  assert.equal(shouldRewriteContentToMarkdown('/blog/some-post', true), true)
  assert.equal(shouldRewriteContentToMarkdown('/blog/some-post.md', false), true)
  assert.equal(shouldRewriteContentToMarkdown('/blog/some-post', false), false)
  assert.equal(shouldRewriteContentToMarkdown('/blog', true), false)
})

test('buildContentMarkdownRewritePath maps to the internal content route', () => {
  assert.equal(
    buildContentMarkdownRewritePath('/blog/some-post.md'),
    '/api/content-markdown/blog/some-post'
  )
  assert.equal(
    buildContentMarkdownRewritePath('/opentelemetry/nested/topic/'),
    '/api/content-markdown/opentelemetry/nested/topic'
  )
  assert.equal(
    buildContentMarkdownRewritePath('/faqs/what-is-signoz'),
    '/api/content-markdown/faqs/what-is-signoz'
  )
})

test('shouldRewritePageToMarkdown covers generic pages via .md or Accept', () => {
  assert.equal(shouldRewritePageToMarkdown('/pricing.md', false), true)
  assert.equal(shouldRewritePageToMarkdown('/pricing', true), true)
  assert.equal(shouldRewritePageToMarkdown('/pricing', false), false)
  assert.equal(shouldRewritePageToMarkdown('/', true), true)
  assert.equal(shouldRewritePageToMarkdown('/application-performance-monitoring.md', false), true)
  assert.equal(shouldRewritePageToMarkdown('/product-comparison/signoz-vs-datadog.md', false), true)
})

test('shouldRewritePageToMarkdown covers content-section index pages', () => {
  assert.equal(shouldRewritePageToMarkdown('/blog.md', false), true)
  assert.equal(shouldRewritePageToMarkdown('/blog', true), true)
})

test('shouldRewritePageToMarkdown excludes docs, api, api-reference, and content slugs', () => {
  assert.equal(shouldRewritePageToMarkdown('/docs/introduction.md', false), false)
  assert.equal(shouldRewritePageToMarkdown('/docs', true), false)
  assert.equal(shouldRewritePageToMarkdown('/docs-onboarding/foo', true), false)
  assert.equal(shouldRewritePageToMarkdown('/api/page-markdown/pricing', true), false)
  assert.equal(shouldRewritePageToMarkdown('/api-reference/latest', true), false)
  assert.equal(shouldRewritePageToMarkdown('/blog/some-post.md', false), false)
  assert.equal(shouldRewritePageToMarkdown('/blog/some-post', true), false)
})

test('shouldRewritePageToMarkdown excludes file-like paths', () => {
  assert.equal(shouldRewritePageToMarkdown('/llms.txt', true), false)
  assert.equal(shouldRewritePageToMarkdown('/sitemap.xml', true), false)
  assert.equal(shouldRewritePageToMarkdown('/favicon.ico', true), false)
  assert.equal(shouldRewritePageToMarkdown('/llms.txt.md', false), false)
})

test('buildPageMarkdownRewritePath maps paths to the internal page route', () => {
  assert.equal(buildPageMarkdownRewritePath('/pricing.md'), '/api/page-markdown/pricing')
  assert.equal(buildPageMarkdownRewritePath('/pricing/'), '/api/page-markdown/pricing')
  assert.equal(buildPageMarkdownRewritePath('/'), '/api/page-markdown')
  assert.equal(
    buildPageMarkdownRewritePath('/product-comparison/signoz-vs-datadog.md'),
    '/api/page-markdown/product-comparison/signoz-vs-datadog'
  )
})

test('servesMarkdownAlternate flags URLs with a markdown representation', () => {
  assert.equal(servesMarkdownAlternate('/pricing'), true)
  assert.equal(servesMarkdownAlternate('/blog/some-post'), true)
  assert.equal(servesMarkdownAlternate('/blog'), true)
  assert.equal(servesMarkdownAlternate('/llms.txt'), false)
  assert.equal(servesMarkdownAlternate('/api/docs-markdown/introduction'), false)
})

test('CONTENT_MARKDOWN_SECTIONS covers all CMS-backed sections', () => {
  assert.deepEqual(
    [...CONTENT_MARKDOWN_SECTIONS].sort(),
    ['blog', 'case-study', 'comparisons', 'faqs', 'guides', 'opentelemetry'].sort()
  )
})
