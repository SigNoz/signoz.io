const test = require('node:test')
const assert = require('node:assert/strict')
const { mapToStrapiPayload } = require('../../scripts/cms-sync/schema-mapper')

test('mapToStrapiPayload', async (t) => {
  await t.test('maps blog frontmatter to Strapi payload', () => {
    const frontmatter = {
      title: 'My Blog Post',
      description: 'A great post',
      image: 'https://cdn.example.com/img/hero.webp',
      date: '2024-01-01',
    }
    const { data } = mapToStrapiPayload(
      'blog',
      frontmatter,
      '# Hello',
      '/my-blog-post',
      'production',
      {}
    )

    assert.equal(data.title, 'My Blog Post')
    assert.equal(data.path, '/my-blog-post')
    assert.equal(data.content, '# Hello')
    assert.equal(data.deployment_status, 'production')
    assert.equal(data.description, 'A great post')
  })

  await t.test('maps docs with minimal fields', () => {
    const { data } = mapToStrapiPayload(
      'docs',
      { title: 'Getting Started' },
      'content',
      '/getting-started',
      'staging',
      {}
    )

    assert.equal(data.title, 'Getting Started')
    assert.equal(data.path, '/getting-started')
    assert.equal(data.deployment_status, 'staging')
  })

  await t.test('removes raw frontmatter relation fields', () => {
    const frontmatter = {
      title: 'Test',
      authors: ['ankit'],
      tags: ['observability'],
      keywords: ['otel'],
    }
    const resolvedRelations = {
      relations: {
        authors: ['doc-id-1'],
        tags: ['doc-id-2'],
        keywords: ['doc-id-3'],
      },
    }

    const { data } = mapToStrapiPayload(
      'blog',
      frontmatter,
      'content',
      '/test',
      'production',
      resolvedRelations
    )

    // Raw arrays should be removed, replaced by resolved relation IDs
    assert.deepEqual(data.authors, ['doc-id-1'])
    assert.deepEqual(data.tags, ['doc-id-2'])
    assert.deepEqual(data.keywords, ['doc-id-3'])
  })

  await t.test('cleans up legacy related_* fields', () => {
    const frontmatter = {
      title: 'Test',
      related_guides: ['/guides/a'],
      related_comparisons: ['/comparisons/b'],
      related_blogs: ['/blog/c'],
      related_faqs: ['/faqs/d'],
    }
    const { data } = mapToStrapiPayload('blog', frontmatter, 'content', '/test', 'production', {})

    assert.equal(data.related_guides, undefined)
    assert.equal(data.related_comparisons, undefined)
    assert.equal(data.related_blogs, undefined)
    assert.equal(data.related_faqs, undefined)
  })

  await t.test('attaches related_articles component data', () => {
    const resolvedRelations = {
      relations: {},
      relatedArticles: [
        { content_type: 'guide', guide: 'doc-id-1' },
        { content_type: 'blog', blog: 'doc-id-2' },
      ],
    }
    const { data } = mapToStrapiPayload(
      'blog',
      { title: 'Test' },
      'content',
      '/test',
      'production',
      resolvedRelations
    )

    assert.equal(data.related_articles.length, 2)
    assert.equal(data.related_articles[0].content_type, 'guide')
  })

  await t.test('sends empty array for related_articles when none resolved', () => {
    const { data } = mapToStrapiPayload(
      'blog',
      { title: 'Test' },
      'content',
      '/test',
      'production',
      {
        relations: {},
        relatedArticles: [],
      }
    )
    assert.deepEqual(data.related_articles, [])
  })

  await t.test('warns about missing required fields', () => {
    const { warnings } = mapToStrapiPayload('docs', {}, '', '/path', 'production', {})

    const missingFieldsWarning = warnings.find((w) => w.type === 'missing_fields')
    assert.ok(missingFieldsWarning)
    assert.ok(missingFieldsWarning.fields.includes('title'))
  })

  await t.test('throws for unknown folder', () => {
    assert.throws(
      () => mapToStrapiPayload('unknown', {}, '', '/path', 'production', {}),
      /No schema defined/
    )
  })

  await t.test('maps each content type correctly', () => {
    const types = ['faqs', 'case-study', 'comparisons', 'guides', 'opentelemetry', 'blog', 'docs']
    for (const type of types) {
      const { data } = mapToStrapiPayload(
        type,
        { title: 'Test' },
        'content',
        '/test',
        'production',
        {}
      )
      assert.equal(data.path, '/test')
      assert.equal(data.deployment_status, 'production')
    }
  })
})
