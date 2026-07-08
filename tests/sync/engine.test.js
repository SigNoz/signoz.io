const test = require('node:test')
const assert = require('node:assert/strict')
const path = require('path')
const { createSyncEngine } = require('../../scripts/cms-sync/engine')
const {
  loadScenario,
  createMockCmsAdapter,
  createMockAssetAdapter,
  assertOpsMatch,
} = require('./helpers')

function buildTestConfig(scenario, fixtureDir, overrides = {}) {
  return {
    deploymentStatus: 'draft',
    cmsApiUrl: 'http://mock-cms',
    cmsApiToken: 'mock-token',
    syncFolders: ['blog', 'docs', 'guides', 'comparisons', 'faqs', 'opentelemetry', 'case-study'],
    changedFiles: scenario.changedFiles,
    deletedFiles: scenario.deletedFiles || [],
    changedAssets: [],
    listiclesChanged: false,
    changedListicles: [],
    deletedListicles: [],
    listiclesDir: path.join(fixtureDir, 'input', 'constants', 'listicles'),
    sidenavChanged: false,
    sidenavJsonPath: path.join(fixtureDir, 'input', 'data', 'docs-side-nav', 'main.json'),
    batch: { size: 10, delayMs: 0 },
    retry: { maxRetries: 1, initialDelayMs: 0 },
    s3: { cdnUrl: 'https://cdn.test.com', bucketName: 'test', region: 'us-east-1' },
    ...overrides,
  }
}

test('engine: blog-create scenario — verifies full payload', async () => {
  const scenario = loadScenario('blog-create')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    const mockAssets = createMockAssetAdapter({})
    const config = buildTestConfig(scenario, fixtureDir)

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    assert.equal(exitCode, 0)
    assert.equal(results.created.length, 1)
    assert.equal(results.updated.length, 0)
    assert.equal(results.deleted.length, 0)
    assertOpsMatch(mockCms.ops, { creates: [{ endpoint: 'blogs' }], updates: [], deletes: [] })

    // Verify the actual payload sent to CMS
    const payload = mockCms.ops.creates[0].data
    assert.equal(payload.path, '/new-post')
    assert.equal(payload.title, 'New Blog Post')
    assert.equal(payload.description, 'A test post')
    assert.equal(payload.deployment_status, 'draft')
    assert.ok(payload.content.includes('# Hello World'))

    // Relations should be resolved to documentIds
    assert.deepEqual(payload.authors, ['author-1'])
    assert.deepEqual(payload.tags, ['tag-1'])

    // Raw frontmatter relation arrays must be removed
    assert.equal(payload.authors_raw, undefined)
    assert.equal(payload.related_articles_raw, undefined)

    // related_articles should be empty array (no related_articles in frontmatter)
    assert.deepEqual(payload.related_articles, [])
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: blog-create with deployment_status=live', async () => {
  const scenario = loadScenario('blog-create')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    const mockAssets = createMockAssetAdapter({})
    const config = buildTestConfig(scenario, fixtureDir, { deploymentStatus: 'live' })

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    assert.equal(exitCode, 0)
    assert.equal(results.created.length, 1)

    const payload = mockCms.ops.creates[0].data
    assert.equal(payload.deployment_status, 'live')
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: blog-update scenario — verifies update payload and documentId', async () => {
  const scenario = loadScenario('blog-update')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    const mockAssets = createMockAssetAdapter({})
    const config = buildTestConfig(scenario, fixtureDir)

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    assert.equal(exitCode, 0)
    assert.equal(results.updated.length, 1)
    assertOpsMatch(mockCms.ops, { creates: [], updates: [{ endpoint: 'blogs' }], deletes: [] })

    // Verify update was sent to correct documentId
    assert.equal(mockCms.ops.updates[0].documentId, 'blog-doc-1')

    // Verify payload content
    const payload = mockCms.ops.updates[0].data
    assert.equal(payload.path, '/existing-post')
    assert.equal(payload.title, 'Updated Blog Post')
    assert.equal(payload.deployment_status, 'draft')
    assert.ok(payload.content.includes('Updated Content'))
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: blog-delete scenario — verifies delete documentId', async () => {
  const scenario = loadScenario('blog-delete')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    const mockAssets = createMockAssetAdapter({})
    const config = buildTestConfig(scenario, fixtureDir)

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    assert.equal(exitCode, 0)
    assert.equal(results.deleted.length, 1)
    assertOpsMatch(mockCms.ops, { creates: [], updates: [], deletes: [{ endpoint: 'blogs' }] })

    // Verify delete targeted the correct documentId
    assert.equal(mockCms.ops.deletes[0].documentId, 'blog-doc-2')
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: empty-changeset scenario', async () => {
  const scenario = loadScenario('empty-changeset')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    const mockAssets = createMockAssetAdapter({})
    const config = buildTestConfig(scenario, fixtureDir)

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    assert.equal(exitCode, 0)
    assert.equal(results.created.length, 0)
    assert.equal(results.updated.length, 0)
    assert.equal(results.deleted.length, 0)
    assert.equal(mockCms.ops.creates.length, 0)
    assert.equal(mockCms.ops.updates.length, 0)
    assert.equal(mockCms.ops.deletes.length, 0)
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: missing-asset-error — Phase 1 abort with exitCode 1', async () => {
  const scenario = loadScenario('missing-asset-error')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    // Asset adapter that throws on syncAsset (simulates missing asset)
    const mockAssets = createMockAssetAdapter({})
    mockAssets.syncAsset = async (assetPath) => {
      throw new Error(
        `Asset Sync Failed: The asset "${assetPath}" was referenced but does not exist`
      )
    }
    const config = buildTestConfig(scenario, fixtureDir)

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    // Phase 1 should fail and abort
    assert.equal(exitCode, 1)
    assert.ok(results.errors.length > 0)
    assert.ok(results.errors[0].error.includes('Asset Sync Failed'))

    // No CMS operations should have been attempted
    assert.equal(mockCms.ops.creates.length, 0)
    assert.equal(mockCms.ops.updates.length, 0)
    assert.equal(mockCms.ops.deletes.length, 0)
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: doc-create — verifies docs schema, relations, and related_articles', async () => {
  const scenario = loadScenario('doc-create')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    const mockAssets = createMockAssetAdapter({})
    const config = buildTestConfig(scenario, fixtureDir)

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    assert.equal(exitCode, 0)
    assert.equal(results.created.length, 1)
    assertOpsMatch(mockCms.ops, { creates: [{ endpoint: 'docs' }], updates: [], deletes: [] })

    const payload = mockCms.ops.creates[0].data
    assert.equal(payload.path, '/getting-started')
    assert.equal(payload.title, 'Getting Started')
    assert.equal(payload.deployment_status, 'draft')
    assert.ok(payload.content.includes('Welcome to the docs'))

    // Relations resolved
    assert.deepEqual(payload.authors, ['author-1'])
    assert.deepEqual(payload.tags, ['tag-1'])
    assert.deepEqual(payload.keywords, ['kw-1'])

    // related_articles resolved from /blog/my-post
    assert.equal(payload.related_articles.length, 1)
    assert.equal(payload.related_articles[0].content_type, 'blog')
    assert.equal(payload.related_articles[0].blog, 'blog-1')

    // Docs schema has fewer fields than blog (no description, image, date, etc.)
    // But title, path, content, deployment_status are present
    assert.equal(payload.description, undefined)
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: sidenav-sync — Phase 3 sends sidenav items to CMS', async () => {
  const scenario = loadScenario('sidenav-sync')
  const fixtureDir = scenario.dir

  const origCwd = process.cwd()
  process.chdir(path.join(fixtureDir, 'input'))

  try {
    const mockCms = createMockCmsAdapter(scenario.cmsState, scenario.relationState)
    const mockAssets = createMockAssetAdapter({})
    const config = buildTestConfig(scenario, fixtureDir, { sidenavChanged: true })

    const engine = createSyncEngine({ config, cmsAdapter: mockCms, assetAdapter: mockAssets })
    const { results, exitCode } = await engine.run()

    assert.equal(exitCode, 0)

    // Sidenav should have been synced via putSidenav (recorded as an update)
    const sidenavOp = mockCms.ops.updates.find((op) => op.endpoint === 'docs-side-nav')
    assert.ok(sidenavOp, 'Expected a docs-side-nav update operation')
    assert.equal(sidenavOp.data.items.length, 2)
    assert.equal(sidenavOp.data.items[0].label, 'Getting Started')
  } finally {
    process.chdir(origCwd)
  }
})
