const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const path = require('path')
const os = require('os')

const { buildConfig, parseArgs, loadFileList } = require('../../scripts/cms-sync/config')

describe('config parseArgs', () => {
  it('parses all CLI arguments', () => {
    const result = parseArgs([
      '--changed-files',
      '/tmp/changed.json',
      '--deleted-files',
      '/tmp/deleted.json',
      '--changed-assets',
      '/tmp/assets.json',
      '--sidenav-changed',
      '--listicles-changed',
      '--changed-listicles',
      '/tmp/listicles.json',
      '--deleted-listicles',
      '/tmp/del-listicles.json',
      '--sync-folders',
      '["blog","docs"]',
      '--deployment-status',
      'staging',
    ])
    assert.equal(result.changedFilesPath, '/tmp/changed.json')
    assert.equal(result.deletedFilesPath, '/tmp/deleted.json')
    assert.equal(result.changedAssetsPath, '/tmp/assets.json')
    assert.equal(result.sidenavChanged, true)
    assert.equal(result.listiclesChanged, true)
    assert.equal(result.changedListiclesPath, '/tmp/listicles.json')
    assert.equal(result.deletedListiclesPath, '/tmp/del-listicles.json')
    assert.equal(result.syncFolders, '["blog","docs"]')
    assert.equal(result.deploymentStatus, 'staging')
  })

  it('returns undefined/false for missing arguments', () => {
    const result = parseArgs([])
    assert.equal(result.changedFilesPath, undefined)
    assert.equal(result.sidenavChanged, false)
    assert.equal(result.deploymentStatus, undefined)
  })
})

describe('config loadFileList', () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'config-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('reads from CLI path when provided', () => {
    const filePath = path.join(tmpDir, 'cli.json')
    fs.writeFileSync(filePath, '["from-cli"]')
    const result = loadFileList(filePath, {}, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, ['from-cli'])
  })

  it('reads from env path when no CLI arg', () => {
    const filePath = path.join(tmpDir, 'env.json')
    fs.writeFileSync(filePath, '["from-env-path"]')
    const result = loadFileList(null, { TEST_PATH: filePath }, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, ['from-env-path'])
  })

  it('parses env JSON when no CLI arg and no env path', () => {
    const result = loadFileList(null, { TEST_JSON: '["from-env-json"]' }, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, ['from-env-json'])
  })

  it('returns empty array when all sources are empty', () => {
    const result = loadFileList(null, {}, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, [])
  })
})

describe('buildConfig with CLI args', () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'config-build-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('CLI --changed-files overrides env', () => {
    const cliFile = path.join(tmpDir, 'cli.json')
    const envFile = path.join(tmpDir, 'env.json')
    fs.writeFileSync(cliFile, '["data/blog/from-cli.mdx"]')
    fs.writeFileSync(envFile, '["data/blog/from-env.mdx"]')

    const config = buildConfig({
      env: { CHANGED_FILES_PATH: envFile, CMS_API_URL: 'http://test', CMS_API_TOKEN: 'tok' },
      argv: ['--changed-files', cliFile],
    })
    assert.deepEqual(config.changedFiles, ['data/blog/from-cli.mdx'])
  })

  it('CLI --deployment-status overrides env', () => {
    const config = buildConfig({
      env: {
        DEPLOYMENT_STATUS: 'live',
        CMS_API_URL: 'http://prod',
        CMS_API_TOKEN: 'prod-tok',
        CMS_STAGING_API_URL: 'http://stg',
        CMS_STAGING_API_TOKEN: 'stg-tok',
      },
      argv: ['--deployment-status', 'staging'],
    })
    assert.equal(config.deploymentStatus, 'staging')
    assert.equal(config.cmsApiUrl, 'http://stg')
  })

  it('CLI --sidenav-changed flag sets sidenavChanged', () => {
    const config = buildConfig({
      env: {},
      argv: ['--sidenav-changed'],
    })
    assert.equal(config.sidenavChanged, true)
  })

  it('CLI --sync-folders overrides env', () => {
    const config = buildConfig({
      env: { SYNC_FOLDERS: '["blog"]' },
      argv: ['--sync-folders', '["docs","guides"]'],
    })
    assert.deepEqual(config.syncFolders, ['docs', 'guides'])
  })

  it('falls back to env when no CLI args', () => {
    const envFile = path.join(tmpDir, 'env.json')
    fs.writeFileSync(envFile, '["data/blog/env-file.mdx"]')

    const config = buildConfig({
      env: {
        CHANGED_FILES_PATH: envFile,
        DEPLOYMENT_STATUS: 'live',
        CMS_API_URL: 'http://test',
        CMS_API_TOKEN: 'tok',
      },
      argv: [],
    })
    assert.deepEqual(config.changedFiles, ['data/blog/env-file.mdx'])
    assert.equal(config.deploymentStatus, 'live')
  })
})
