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

function buildTestConfig(scenario, fixtureDir) {
  return {
    deploymentStatus: 'production',
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
  }
}

test('engine: blog-create scenario', async () => {
  const scenario = loadScenario('blog-create')
  const fixtureDir = scenario.dir

  // Change cwd to fixture input dir so parseMDXFile can find the file
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
    assertOpsMatch(mockCms.ops, scenario.expectedOps)
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: blog-update scenario', async () => {
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
    assert.equal(results.created.length, 0)
    assert.equal(results.updated.length, 1)
    assert.equal(results.deleted.length, 0)
    assertOpsMatch(mockCms.ops, scenario.expectedOps)
  } finally {
    process.chdir(origCwd)
  }
})

test('engine: blog-delete scenario', async () => {
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
    assert.equal(results.created.length, 0)
    assert.equal(results.updated.length, 0)
    assert.equal(results.deleted.length, 1)
    assertOpsMatch(mockCms.ops, scenario.expectedOps)
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
    assertOpsMatch(mockCms.ops, scenario.expectedOps)
  } finally {
    process.chdir(origCwd)
  }
})
