const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { fetchAllDocsIndex } = loadTsModule('utils/cachedData.ts')

test('docs index stays under the data cache 2MB per-item limit', async () => {
  const index = await fetchAllDocsIndex()
  const serialized = JSON.stringify(index)

  assert.equal(index.length > 0, true)
  assert.equal(
    serialized.length < 1_000_000,
    true,
    `docs index serialized to ${serialized.length} bytes; keep it well under the 2MB cache item limit`
  )
})

test('docs index entries carry metadata but never doc bodies', async () => {
  const index = await fetchAllDocsIndex()

  index.forEach((entry) => {
    assert.equal(typeof entry.slug === 'string' && entry.slug.length > 0, true)
    assert.equal(typeof entry.path === 'string' && entry.path.length > 0, true)
    assert.equal('content' in entry, false)
    assert.equal('body' in entry, false)
    assert.equal('structuredData' in entry, false)
    assert.equal('toc' in entry, false)
  })
})

test('docs index keeps descriptions and published dates for enrichment consumers', async () => {
  const index = await fetchAllDocsIndex()

  const withDescription = index.filter(
    (entry) => typeof entry.description === 'string' && entry.description.trim().length > 0
  )
  const withPublishedDate = index.filter(
    (entry) => typeof entry.published_date === 'string' && entry.published_date.length > 0
  )
  const withDate = index.filter((entry) => typeof entry.date === 'string' && entry.date.length > 0)

  assert.equal(withDescription.length > index.length / 2, true)
  assert.equal(withDate.length > index.length / 2, true)
  assert.equal(withPublishedDate.length > 0, true)
})
