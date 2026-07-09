const test = require('node:test')
const assert = require('node:assert/strict')
const {
  MANIFEST_VERSION,
  createEmptyManifest,
  normalizeManifest,
  normalizeContentManifestEntry,
  normalizeListicleManifestEntry,
  contentManifestKey,
  listicleManifestKey,
  buildManifestMap,
  hasStagingManifestState,
  sanitizeEntityForRestore,
  buildCurrentContentManifestEntry,
  buildCurrentListicleManifestEntry,
  getContentReconciliationAction,
  getListicleReconciliationAction,
} = require('../../scripts/cms-sync/manifest')

test('MANIFEST_VERSION is 2', () => {
  assert.equal(MANIFEST_VERSION, 2)
})

test('createEmptyManifest returns correct structure', () => {
  const m = createEmptyManifest()
  assert.equal(m.version, 2)
  assert.deepEqual(m.content, [])
  assert.deepEqual(m.listicles, [])
  assert.equal(m.sidenav, null)
})

test('normalizeManifest: null input', () => {
  const m = normalizeManifest(null)
  assert.equal(m.version, 2)
  assert.deepEqual(m.content, [])
})

test('normalizeManifest: v1 array format', () => {
  const v1 = [{ folderName: 'blog', pathField: '/test', kind: 'created' }]
  const m = normalizeManifest(v1)
  assert.equal(m.version, 2)
  assert.equal(m.content.length, 1)
  assert.deepEqual(m.listicles, [])
})

test('normalizeManifest: v2 format', () => {
  const v2 = {
    version: 2,
    content: [{ folderName: 'blog', pathField: '/test' }],
    listicles: [{ key: 'test-list' }],
    sidenav: { touched: true },
  }
  const m = normalizeManifest(v2)
  assert.equal(m.version, 2)
  assert.equal(m.content.length, 1)
  assert.equal(m.listicles.length, 1)
  assert.deepEqual(m.sidenav, { touched: true })
})

test('sanitizeEntityForRestore strips system fields', () => {
  const entity = {
    id: 1,
    documentId: 'doc-1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02',
    publishedAt: '2024-01-03',
    locale: 'en',
    localizations: [],
    title: 'My Post',
    content: 'Body text',
  }
  const cleaned = sanitizeEntityForRestore(entity)
  assert.equal(cleaned.title, 'My Post')
  assert.equal(cleaned.content, 'Body text')
  assert.equal(cleaned.id, undefined)
  assert.equal(cleaned.documentId, undefined)
  assert.equal(cleaned.createdAt, undefined)
  assert.equal(cleaned.updatedAt, undefined)
  assert.equal(cleaned.publishedAt, undefined)
})

test('sanitizeEntityForRestore: null input', () => {
  assert.equal(sanitizeEntityForRestore(null), null)
})

test('contentManifestKey', () => {
  assert.equal(contentManifestKey({ folderName: 'blog', pathField: '/my-post' }), 'blog:/my-post')
})

test('listicleManifestKey', () => {
  assert.equal(listicleManifestKey({ key: 'my-list' }), 'my-list')
})

test('buildManifestMap builds correct map', () => {
  const entries = [
    { folderName: 'blog', pathField: '/a', kind: 'created' },
    { folderName: 'blog', pathField: '/b', kind: 'updated' },
  ]
  const map = buildManifestMap(entries, contentManifestKey)
  assert.equal(map.size, 2)
  assert.equal(map.get('blog:/a').kind, 'created')
  assert.equal(map.get('blog:/b').kind, 'updated')
})

test('hasStagingManifestState: empty manifest', () => {
  assert.equal(hasStagingManifestState(createEmptyManifest()), false)
})

test('hasStagingManifestState: manifest with content', () => {
  const m = createEmptyManifest()
  m.content.push({ folderName: 'blog', pathField: '/test' })
  assert.equal(hasStagingManifestState(m), true)
})

test('hasStagingManifestState: null', () => {
  assert.equal(hasStagingManifestState(null), false)
})

test('normalizeContentManifestEntry', () => {
  const entry = normalizeContentManifestEntry({
    folderName: 'blog',
    pathField: '/test',
    filePath: 'data/blog/test.mdx',
    kind: 'created',
    extraField: 'ignored',
  })
  assert.equal(entry.folderName, 'blog')
  assert.equal(entry.pathField, '/test')
  assert.equal(entry.kind, 'created')
  assert.equal(entry.restoreData, null)
  assert.equal(entry.extraField, undefined)
})

test('normalizeContentManifestEntry: defaults kind to unknown', () => {
  const entry = normalizeContentManifestEntry({
    folderName: 'blog',
    pathField: '/test',
    filePath: 'data/blog/test.mdx',
  })
  assert.equal(entry.kind, 'unknown')
})

test('normalizeListicleManifestEntry', () => {
  const entry = normalizeListicleManifestEntry({ key: 'my-list', kind: 'created' })
  assert.equal(entry.key, 'my-list')
  assert.equal(entry.kind, 'created')
  assert.equal(entry.restoreData, null)
})

// buildCurrentContentManifestEntry tests

test('buildCurrentContentManifestEntry: create_or_update with no existing entry → created', () => {
  const op = {
    type: 'update',
    folderName: 'blog',
    pathField: '/new',
    filePath: 'data/blog/new.mdx',
  }
  const entry = buildCurrentContentManifestEntry(op, null, {})
  assert.equal(entry.kind, 'created')
  assert.equal(entry.restoreData, null)
})

test('buildCurrentContentManifestEntry: create_or_update with existing entry → updated', () => {
  const op = {
    type: 'update',
    folderName: 'blog',
    pathField: '/old',
    filePath: 'data/blog/old.mdx',
  }
  const existing = { documentId: 'doc-1', title: 'Original', path: '/old' }
  const entry = buildCurrentContentManifestEntry(op, existing, {})
  assert.equal(entry.kind, 'updated')
  assert.equal(entry.restoreData.title, 'Original')
  assert.equal(entry.restoreData.documentId, undefined) // sanitized
})

test('buildCurrentContentManifestEntry: delete → deleted with restoreData', () => {
  const op = {
    type: 'delete',
    folderName: 'blog',
    pathField: '/old',
    filePath: 'data/blog/old.mdx',
  }
  const existing = { documentId: 'doc-1', title: 'Title', path: '/old' }
  const entry = buildCurrentContentManifestEntry(op, existing, {})
  assert.equal(entry.kind, 'deleted')
  assert.notEqual(entry.restoreData, null)
  assert.equal(entry.restoreData.title, 'Title')
})

test('buildCurrentContentManifestEntry: delete of created entry → null (removed from manifest)', () => {
  const op = {
    type: 'delete',
    folderName: 'blog',
    pathField: '/new',
    filePath: 'data/blog/new.mdx',
  }
  const existing = { documentId: 'doc-1' }
  const previousEntry = { kind: 'created' }
  const entry = buildCurrentContentManifestEntry(op, existing, { previousEntry })
  assert.equal(entry, null)
})

// buildCurrentListicleManifestEntry tests

test('buildCurrentListicleManifestEntry: new listicle → created', () => {
  const entry = buildCurrentListicleManifestEntry('my-list.json', null, null, false, false)
  assert.equal(entry.key, 'my-list')
  assert.equal(entry.kind, 'created')
})

test('buildCurrentListicleManifestEntry: update existing → updated', () => {
  const existing = { documentId: 'lis-1', key: 'my-list', data: {} }
  const entry = buildCurrentListicleManifestEntry('my-list', null, existing, false, true)
  assert.equal(entry.kind, 'updated')
  assert.notEqual(entry.restoreData, null)
})

test('buildCurrentListicleManifestEntry: delete of created → null', () => {
  const previousEntry = { kind: 'created' }
  const entry = buildCurrentListicleManifestEntry('my-list', previousEntry, null, true, false)
  assert.equal(entry, null)
})

// Reconciliation action tests

test('getContentReconciliationAction: created → delete', () => {
  const { action } = getContentReconciliationAction({ kind: 'created' })
  assert.equal(action, 'delete')
})

test('getContentReconciliationAction: updated with restoreData → restore', () => {
  const { action } = getContentReconciliationAction({
    kind: 'updated',
    restoreData: { title: 'x' },
  })
  assert.equal(action, 'restore')
})

test('getContentReconciliationAction: updated without restoreData → error', () => {
  const { action } = getContentReconciliationAction({ kind: 'updated', restoreData: null })
  assert.equal(action, 'error')
})

test('getContentReconciliationAction: deleted with restoreData → restore', () => {
  const { action } = getContentReconciliationAction({
    kind: 'deleted',
    restoreData: { title: 'x' },
  })
  assert.equal(action, 'restore')
})

test('getContentReconciliationAction: unknown with restoreData → restore', () => {
  const { action } = getContentReconciliationAction({
    kind: 'unknown',
    restoreData: { title: 'x' },
  })
  assert.equal(action, 'restore')
})

test('getContentReconciliationAction: unknown without restoreData → delete', () => {
  const { action } = getContentReconciliationAction({ kind: 'unknown', restoreData: null })
  assert.equal(action, 'delete')
})

test('getListicleReconciliationAction: created → delete', () => {
  const { action } = getListicleReconciliationAction({ kind: 'created' })
  assert.equal(action, 'delete')
})

test('getListicleReconciliationAction: updated with restoreData → restore', () => {
  const { action } = getListicleReconciliationAction({ kind: 'updated', restoreData: { key: 'x' } })
  assert.equal(action, 'restore')
})
