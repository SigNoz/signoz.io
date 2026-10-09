const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { parseCmsUrlPath, getStrapiDocumentCacheTags, getMarkdownTwinRoutePaths } = loadTsModule(
  'utils/cmsRevalidatePaths.ts'
)

test('parseCmsUrlPath maps docs URLs to the docs collection', () => {
  const parsed = parseCmsUrlPath('/docs/instrumentation/python')

  assert.deepEqual(parsed, {
    urlPath: '/docs/instrumentation/python',
    contentKey: 'instrumentation/python',
    collectionName: 'docs',
  })
})

test('getStrapiDocumentCacheTags returns per-slug tags', () => {
  const tags = getStrapiDocumentCacheTags({
    urlPath: '/docs/instrumentation/python',
    contentKey: 'instrumentation/python',
    collectionName: 'docs',
  })

  assert.deepEqual(tags, ['docs-instrumentation/python', 'mdx-content-instrumentation/python'])
})

test('getMarkdownTwinRoutePaths returns the docs-markdown route for docs', () => {
  const paths = getMarkdownTwinRoutePaths({
    urlPath: '/docs/instrumentation/python',
    contentKey: 'instrumentation/python',
    collectionName: 'docs',
  })

  assert.deepEqual(paths, ['/api/docs-markdown/instrumentation/python'])
})

test('getMarkdownTwinRoutePaths returns nothing for non-docs collections', () => {
  for (const [urlPath, contentKey, collectionName] of [
    ['/blog/some-post', 'some-post', 'blogs'],
    ['/guides/some-guide', 'some-guide', 'guides'],
    ['/comparisons/a-vs-b', 'a-vs-b', 'comparisons'],
  ]) {
    assert.deepEqual(getMarkdownTwinRoutePaths({ urlPath, contentKey, collectionName }), [])
  }
})
