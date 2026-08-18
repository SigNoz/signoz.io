const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { ensureTrailingSlash, transformBlog, transformComparison, transformDoc, transformGuide } =
  loadTsModule('utils/mdxUtils.ts')

const baseContent = {
  id: 42,
  documentId: 'doc-abc',
  title: 'Example Title',
  meta_title: 'Example Meta',
  description: 'A short description.',
  published_date: '2026-01-15',
  updated_date: '2026-02-01',
  content: `
## Overview

Some body text.

### Details
`,
}

test('ensureTrailingSlash appends slash only when missing', () => {
  assert.equal(ensureTrailingSlash('https://signoz.io/blog/foo'), 'https://signoz.io/blog/foo/')
  assert.equal(ensureTrailingSlash('https://signoz.io/blog/foo/'), 'https://signoz.io/blog/foo/')
  assert.equal(ensureTrailingSlash('/'), '/')
})

test('transformBlog maps path, slug, type, dates, and reading metadata', () => {
  const result = transformBlog({
    ...baseContent,
    path: '/my-post',
    summary: 'Custom summary',
  })

  assert.equal(result.type, 'Blog')
  assert.equal(result.slug, 'my-post')
  assert.equal(result.path, 'blog/my-post')
  assert.equal(result.filePath, 'blog/my-post.mdx')
  assert.equal(result._id, 'doc-abc')
  assert.equal(result.published_date, '2026-01-15')
  assert.equal(result.updated_date, '2026-02-01')
  assert.equal(result.date, '2026-02-01')
  assert.equal(result.summary, 'Custom summary')
  assert.equal(result.draft, false)
  assert.equal(result.is_newsroom, false)
  assert.equal(result.hide_table_of_contents, false)
  assert.equal(result.excludeFromSitemap, false)
  assert.ok(result.readingTime)
  assert.ok(typeof result.readingTime.minutes === 'number')
  assert.deepEqual(
    result.toc.map((item) => item.value),
    ['Overview', 'Details']
  )
  assert.equal(result.structuredData['@type'], 'BlogPosting')
})

test('transformBlog normalizes authors, tags, and keywords from string or object form', () => {
  const result = transformBlog({
    ...baseContent,
    path: '/authors-post',
    authors: ['alice', { key: 'bob', name: 'Bob Builder', image_url: '/bob.png' }],
    tags: ['Observability', { value: 'OpenTelemetry' }],
    keywords: ['otel', { value: 'tracing' }],
  })

  assert.deepEqual(result.authors, ['alice', 'bob'])
  assert.deepEqual(result.authorObjects, [
    { key: 'alice', name: 'alice' },
    { key: 'bob', name: 'Bob Builder', image_url: '/bob.png' },
  ])
  assert.deepEqual(result.tags, ['Observability', 'OpenTelemetry'])
  assert.deepEqual(result.keywords, ['otel', 'tracing'])
})

test('transformBlog prefers related_articles with trailing-slash absolute urls', () => {
  const result = transformBlog({
    ...baseContent,
    path: '/with-related',
    related_articles: [
      {
        content_type: 'guide',
        guide: {
          title: 'Related Guide',
          path: '/getting-started',
          published_date: '2025-12-01',
        },
      },
      {
        content_type: 'blog',
        blog: {
          title: 'Related Blog',
          path: '/other-post/',
          updated_date: '2026-01-01',
        },
      },
      // Incomplete entries are skipped
      { content_type: 'faq' },
      { content_type: 'comparison', comparison: { path: '/no-title' } },
    ],
  })

  assert.deepEqual(result.relatedArticles, [
    {
      title: 'Related Guide',
      date: '2025-12-01',
      publishedOn: '2025-12-01',
      url: 'https://signoz.io/guides/getting-started/',
      content_type: 'guide',
    },
    {
      title: 'Related Blog',
      date: '2026-01-01',
      publishedOn: '2026-01-01',
      url: 'https://signoz.io/blog/other-post/',
      content_type: 'blog',
    },
  ])
})

test('transformBlog falls back to legacy related_* fields when related_articles is empty', () => {
  const result = transformBlog({
    ...baseContent,
    path: '/legacy-related',
    related_articles: [],
    related_guides: [
      {
        id: 7,
        documentId: 'guide-1',
        title: 'Legacy Guide',
        path: '/legacy-guide',
        published_date: '2024-06-01',
        tags: ['t1', { value: 't2' }],
        authors: ['ann', { key: 'ben', name: 'Ben' }],
        keywords: [{ value: 'k1' }],
        description: 'Legacy desc',
      },
    ],
    related_comparisons: [
      {
        id: 8,
        title: 'Legacy Comparison',
        path: '/legacy-comparison',
        date: '2024-07-01',
      },
    ],
  })

  assert.equal(result.relatedArticles.length, 2)

  const guide = result.relatedArticles[0]
  assert.equal(guide._id, 'guide-1')
  assert.equal(guide.title, 'Legacy Guide')
  assert.equal(guide.path, 'guides/legacy-guide')
  assert.equal(guide.url, 'https://signoz.io/guides/legacy-guide/')
  assert.equal(guide.slug, 'legacy-guide')
  assert.equal(guide.publishedOn, '2024-06-01')
  assert.deepEqual(guide.tags, ['t1', 't2'])
  assert.deepEqual(guide.authors, ['ann', 'ben'])
  assert.deepEqual(guide.keywords, ['k1'])
  assert.equal(guide.description, 'Legacy desc')

  const comparison = result.relatedArticles[1]
  assert.equal(comparison._id, '8')
  assert.equal(comparison.path, 'comparisons/legacy-comparison')
  assert.equal(comparison.url, 'https://signoz.io/comparisons/legacy-comparison/')
  assert.equal(comparison.publishedOn, '2024-07-01')
})

test('transformGuide and transformComparison use their route prefixes', () => {
  const guide = transformGuide({
    ...baseContent,
    path: '/my-guide',
  })
  const comparison = transformComparison({
    ...baseContent,
    path: '/my-comparison',
  })

  assert.equal(guide.type, 'Guide')
  assert.equal(guide.path, 'guides/my-guide')
  assert.equal(guide.filePath, 'guides/my-guide.mdx')
  assert.equal(guide.structuredData['@type'], 'BlogPosting')

  assert.equal(comparison.type, 'Comparison')
  assert.equal(comparison.path, 'comparisons/my-comparison')
  assert.equal(comparison.filePath, 'comparisons/my-comparison.mdx')
  assert.equal(comparison.structuredData['@type'], 'BlogPosting')
})

test('transformDoc strips path slashes, defaults tags, and sets docs path', () => {
  const withDefaults = transformDoc({
    ...baseContent,
    path: '/installation/docker/',
    tags: [],
  })

  assert.equal(withDefaults.type, 'Doc')
  assert.equal(withDefaults.slug, 'installation/docker')
  assert.equal(withDefaults.path, 'docs/installation/docker')
  assert.equal(withDefaults.filePath, 'docs/installation/docker.mdx')
  assert.deepEqual(withDefaults.tags, ['SigNoz Cloud', 'Self-Host'])
  assert.deepEqual(withDefaults.docTags, ['SigNoz Cloud', 'Self-Host'])
  assert.equal(withDefaults.body.raw, withDefaults.content)
  assert.equal(withDefaults.hide_table_of_contents, false)
  assert.equal(withDefaults.structuredData['@type'], 'TechArticle')

  const withCustomTags = transformDoc({
    ...baseContent,
    path: 'alerts',
    tags: ['Cloud', { value: '  ' }, { value: 'Self-Host' }],
  })

  assert.deepEqual(withCustomTags.tags, ['Cloud', 'Self-Host'])
})

test('transformDoc related_articles maps content_type prefixes including docs and faqs', () => {
  const result = transformDoc({
    ...baseContent,
    path: '/intro',
    related_articles: [
      {
        content_type: 'doc',
        doc: { title: 'Sibling Doc', path: '/sibling', published_date: '2026-03-01' },
      },
      {
        content_type: 'faq',
        faq: { title: 'Related FAQ', path: '/what-is-signoz', updated_date: '2026-03-02' },
      },
      {
        content_type: 'case_study',
        case_study: { title: 'Customer Story', path: '/acme', date: '2026-03-03' },
      },
      {
        content_type: 'opentelemetry',
        opentelemetry: { title: 'OTel Hub', path: '/otel-intro', published_date: '2026-03-04' },
      },
    ],
  })

  assert.deepEqual(
    result.relatedArticles.map((item) => item.url),
    [
      'https://signoz.io/docs/sibling/',
      'https://signoz.io/faqs/what-is-signoz/',
      'https://signoz.io/case-study/acme/',
      'https://signoz.io/opentelemetry/otel-intro/',
    ]
  )
})

test('transforms fall back to description for summary and id when fields are missing', () => {
  const result = transformBlog({
    id: 99,
    title: 'No Summary',
    description: 'Use me as summary',
    path: '/no-summary',
    content: 'Hello world',
  })

  assert.equal(result.summary, 'Use me as summary')
  assert.equal(result._id, '99')
  assert.equal(result.published_date, null)
  assert.equal(result.updated_date, null)
  assert.equal(result.date, '')
  assert.deepEqual(result.authors, [])
  assert.deepEqual(result.tags, [])
  assert.deepEqual(result.relatedArticles, [])
  assert.deepEqual(result.toc, [])
})
