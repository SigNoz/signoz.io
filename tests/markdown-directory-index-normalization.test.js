const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  normalizeDocsSlugFromPathname,
  buildDocsMarkdownRewritePath,
  stripDirectoryIndexSuffix,
  hasDocsMarkdownExtension,
} = loadTsModule('utils/docs/markdownRouting.ts')

const {
  parseContentMarkdownPath,
  buildPageMarkdownRewritePath,
  shouldRewritePageToMarkdown,
  shouldRewriteContentToMarkdown,
} = loadTsModule('utils/agentMarkdownRouting.ts')

// Agents derive markdown URLs from the rendered page's index.html form. These
// shapes 404'd in production while the flat `.md` path returned 200.

test('docs slug collapses index.html.md, index.md and bare .md onto the flat slug', () => {
  assert.equal(
    normalizeDocsSlugFromPathname('/docs/install/docker/index.html.md'),
    'install/docker'
  )
  assert.equal(normalizeDocsSlugFromPathname('/docs/install/docker/index.md'), 'install/docker')
  assert.equal(normalizeDocsSlugFromPathname('/docs/operate/upgrade/.md'), 'operate/upgrade')
  assert.equal(
    normalizeDocsSlugFromPathname('/docs/llm-observability/index.md'),
    'llm-observability'
  )
})

test('docs slug is unchanged for already-flat and trailing-slash paths', () => {
  assert.equal(normalizeDocsSlugFromPathname('/docs/install/docker.md'), 'install/docker')
  assert.equal(normalizeDocsSlugFromPathname('/docs/install/docker/'), 'install/docker')
  assert.equal(normalizeDocsSlugFromPathname('/docs/introduction.md'), 'introduction')
  assert.equal(normalizeDocsSlugFromPathname('/docs'), '')
})

test('stripDirectoryIndexSuffix only matches a trailing index segment', () => {
  // Guards the one docs slug containing the substring "index".
  assert.equal(stripDirectoryIndexSuffix('llamaindex-observability'), 'llamaindex-observability')
  assert.equal(stripDirectoryIndexSuffix('a/indexed/page'), 'a/indexed/page')
  assert.equal(stripDirectoryIndexSuffix('a/index'), 'a')
  assert.equal(stripDirectoryIndexSuffix('a/index.html'), 'a')
  assert.equal(stripDirectoryIndexSuffix('a/index.htm'), 'a')
})

test('index shapes still register as explicit markdown requests', () => {
  assert.equal(hasDocsMarkdownExtension('/docs/install/docker/index.html.md'), true)
  assert.equal(hasDocsMarkdownExtension('/docs/operate/upgrade/.md'), true)
})

test('docs rewrite path resolves index shapes to the real markdown endpoint', () => {
  assert.equal(
    buildDocsMarkdownRewritePath('/docs/install/docker/index.html.md'),
    '/api/docs-markdown/install/docker'
  )
  assert.equal(
    buildDocsMarkdownRewritePath('/docs/metrics-management/query-range-api/index.html.md'),
    '/api/docs-markdown/metrics-management/query-range-api'
  )
})

test('content sections collapse index shapes onto the post slug', () => {
  assert.deepEqual(parseContentMarkdownPath('/blog/some-post/index.html.md'), {
    section: 'blog',
    slug: 'some-post',
  })
  assert.deepEqual(parseContentMarkdownPath('/guides/aws-monitoring/index.md'), {
    section: 'guides',
    slug: 'aws-monitoring',
  })
  assert.equal(shouldRewriteContentToMarkdown('/blog/some-post/index.html.md', false), true)
})

test('page pipeline collapses index shapes instead of treating them as files', () => {
  assert.equal(shouldRewritePageToMarkdown('/pricing/index.html.md', false), true)
  assert.equal(buildPageMarkdownRewritePath('/pricing/index.html.md'), '/api/page-markdown/pricing')
  assert.equal(buildPageMarkdownRewritePath('/index.md'), '/api/page-markdown')
})

test('real file resources are still left alone', () => {
  assert.equal(shouldRewritePageToMarkdown('/llms.txt', true), false)
  assert.equal(shouldRewritePageToMarkdown('/sitemap.xml', true), false)
  assert.equal(shouldRewritePageToMarkdown('/skill.md', false), false)
  assert.equal(shouldRewritePageToMarkdown('/agents.md', false), false)
  assert.equal(shouldRewritePageToMarkdown('/blogs/sitemap.md', false), false)
})
