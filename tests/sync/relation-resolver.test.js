const test = require('node:test')
const assert = require('node:assert/strict')
const {
  createRelationResolver,
  parseRelatedArticleUrl,
} = require('../../scripts/cms-sync/relation-resolver')

test('parseRelatedArticleUrl', async (t) => {
  await t.test('parses guide URL', () => {
    const result = parseRelatedArticleUrl('/guides/what-is-prometheus/')
    assert.equal(result.prefix, 'guides')
    assert.equal(result.path, '/what-is-prometheus')
  })

  await t.test('parses blog URL', () => {
    const result = parseRelatedArticleUrl('/blog/my-blog-post')
    assert.equal(result.prefix, 'blog')
    assert.equal(result.path, '/my-blog-post')
  })

  await t.test('parses docs URL with nested path', () => {
    const result = parseRelatedArticleUrl('/docs/instrumentation/python/')
    assert.equal(result.prefix, 'docs')
    assert.equal(result.path, '/instrumentation/python')
  })

  await t.test('strips leading and trailing slashes', () => {
    const result = parseRelatedArticleUrl('///guides/intro///')
    assert.equal(result.prefix, 'guides')
    assert.equal(result.path, '/intro')
  })

  await t.test('returns null for single segment', () => {
    assert.equal(parseRelatedArticleUrl('/guides'), null)
    assert.equal(parseRelatedArticleUrl('noslash'), null)
  })
})

test('createRelationResolver', async (t) => {
  await t.test('resolves author relations from cache', async () => {
    const mockCmsAdapter = {
      fetchEntitiesByFilter: async () => [],
      filterEntitiesByDeploymentStatus: (e) => e,
      createTagOrKeyword: async () => {},
    }

    const resolver = createRelationResolver(mockCmsAdapter)
    const entityCache = {
      authors: [
        { key: 'ankit', documentId: 'author-1' },
        { key: 'pranay', documentId: 'author-2' },
      ],
    }

    const frontmatter = { authors: ['ankit'] }
    const { relations, warnings } = await resolver.resolveRelations(
      'blog',
      frontmatter,
      entityCache
    )

    assert.deepEqual(relations.authors, ['author-1'])
    assert.equal(warnings.length, 0)
  })

  await t.test('resolves tags with filterKey+matchValue', async () => {
    const mockCmsAdapter = {
      fetchEntitiesByFilter: async () => [],
      filterEntitiesByDeploymentStatus: (e) => e,
      createTagOrKeyword: async () => {},
    }

    const resolver = createRelationResolver(mockCmsAdapter)
    const entityCache = {
      tags: [
        { key: 'blog-observability', value: 'observability', documentId: 'tag-1' },
        { key: 'guides-observability', value: 'observability', documentId: 'tag-2' },
      ],
    }

    const frontmatter = { tags: ['observability'] }
    const { relations } = await resolver.resolveRelations('blog', frontmatter, entityCache)

    assert.deepEqual(relations.tags, ['tag-1'])
  })

  await t.test('auto-creates missing tags', async () => {
    const createdEntries = []
    const mockCmsAdapter = {
      fetchEntitiesByFilter: async () => [],
      filterEntitiesByDeploymentStatus: (e) => e,
      createTagOrKeyword: async (endpoint, value, folderName) => {
        const entry = { documentId: `new-tag-${value}`, key: `${folderName}-${value}`, value }
        createdEntries.push(entry)
        return entry
      },
    }

    const resolver = createRelationResolver(mockCmsAdapter)
    const frontmatter = { tags: ['new-tag'] }
    const { relations } = await resolver.resolveRelations('blog', frontmatter, {})

    assert.equal(createdEntries.length, 1)
    assert.deepEqual(relations.tags, ['new-tag-new-tag'])
  })

  await t.test('reports unmatched non-tag relations as warnings', async () => {
    const mockCmsAdapter = {
      fetchEntitiesByFilter: async () => [],
      filterEntitiesByDeploymentStatus: (e) => e,
      createTagOrKeyword: async () => {},
    }

    const resolver = createRelationResolver(mockCmsAdapter)
    const frontmatter = { authors: ['nonexistent'] }
    // Provide cache with authors key so the resolver enters the matching loop
    const entityCache = { authors: [{ key: 'someone-else', documentId: 'x' }] }
    const { relations, warnings } = await resolver.resolveRelations(
      'blog',
      frontmatter,
      entityCache
    )

    assert.equal(relations.authors, undefined)
    assert.equal(warnings.length, 1)
    assert.deepEqual(warnings[0].unmatchedValues, ['nonexistent'])
  })

  await t.test('resolves related articles from cache', async () => {
    const mockCmsAdapter = {
      fetchEntitiesByFilter: async () => [],
      filterEntitiesByDeploymentStatus: (e) => e,
    }

    const resolver = createRelationResolver(mockCmsAdapter)
    const relatedArticleCache = {
      guides: [{ path: '/what-is-prometheus', documentId: 'guide-1' }],
      blog: [{ path: '/my-post', documentId: 'blog-1' }],
    }

    const frontmatter = {
      related_articles: ['/guides/what-is-prometheus/', '/blog/my-post'],
    }

    const { components, warnings } = await resolver.resolveRelatedArticles(
      frontmatter,
      relatedArticleCache
    )

    assert.equal(components.length, 2)
    assert.equal(components[0].content_type, 'guide')
    assert.equal(components[0].guide, 'guide-1')
    assert.equal(components[1].content_type, 'blog')
    assert.equal(components[1].blog, 'blog-1')
    assert.equal(warnings.length, 0)
  })

  await t.test('warns for unparseable related article URLs', async () => {
    const mockCmsAdapter = {
      fetchEntitiesByFilter: async () => [],
      filterEntitiesByDeploymentStatus: (e) => e,
    }

    const resolver = createRelationResolver(mockCmsAdapter)
    const frontmatter = { related_articles: ['/noslash'] }
    const { components, warnings } = await resolver.resolveRelatedArticles(frontmatter, {})

    assert.equal(components.length, 0)
    assert.equal(warnings.length, 1)
  })

  await t.test('returns empty for no related_articles', async () => {
    const mockCmsAdapter = {
      fetchEntitiesByFilter: async () => [],
      filterEntitiesByDeploymentStatus: (e) => e,
    }

    const resolver = createRelationResolver(mockCmsAdapter)
    const { components, warnings } = await resolver.resolveRelatedArticles({}, {})

    assert.equal(components.length, 0)
    assert.equal(warnings.length, 0)
  })
})
