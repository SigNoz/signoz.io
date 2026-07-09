const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const path = require('path')
const os = require('os')

const { parseArgs, readJsonFile, loadFileList } = require('../../scripts/revalidate-after-cms-sync')

describe('parseArgs', () => {
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
    ])
    assert.equal(result.changedFilesPath, '/tmp/changed.json')
    assert.equal(result.deletedFilesPath, '/tmp/deleted.json')
    assert.equal(result.changedAssetsPath, '/tmp/assets.json')
    assert.equal(result.sidenavChanged, true)
    assert.equal(result.listiclesChanged, true)
    assert.equal(result.changedListiclesPath, '/tmp/listicles.json')
    assert.equal(result.deletedListiclesPath, '/tmp/del-listicles.json')
    assert.equal(result.syncFolders, '["blog","docs"]')
  })

  it('returns null/false for missing arguments', () => {
    const result = parseArgs([])
    assert.equal(result.changedFilesPath, null)
    assert.equal(result.deletedFilesPath, null)
    assert.equal(result.sidenavChanged, false)
    assert.equal(result.listiclesChanged, false)
    assert.equal(result.syncFolders, null)
  })

  it('handles flag without value correctly', () => {
    const result = parseArgs(['--sidenav-changed'])
    assert.equal(result.sidenavChanged, true)
    assert.equal(result.listiclesChanged, false)
  })
})

describe('readJsonFile', () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'revalidate-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('reads valid JSON file', () => {
    const filePath = path.join(tmpDir, 'test.json')
    fs.writeFileSync(filePath, '["data/blog/post.mdx"]')
    const result = readJsonFile(filePath)
    assert.deepEqual(result, ['data/blog/post.mdx'])
  })

  it('returns empty array for empty file', () => {
    const filePath = path.join(tmpDir, 'empty.json')
    fs.writeFileSync(filePath, '')
    const result = readJsonFile(filePath)
    assert.deepEqual(result, [])
  })

  it('returns empty array for whitespace-only file', () => {
    const filePath = path.join(tmpDir, 'whitespace.json')
    fs.writeFileSync(filePath, '   \n  ')
    const result = readJsonFile(filePath)
    assert.deepEqual(result, [])
  })

  it('returns empty array for non-existent file', () => {
    const result = readJsonFile(path.join(tmpDir, 'missing.json'))
    assert.deepEqual(result, [])
  })

  it('returns empty array for invalid JSON', () => {
    const filePath = path.join(tmpDir, 'bad.json')
    fs.writeFileSync(filePath, 'not json')
    const result = readJsonFile(filePath)
    assert.deepEqual(result, [])
  })
})

describe('loadFileList', () => {
  let tmpDir
  const savedEnv = {}

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'revalidate-load-'))
    // Save env vars we might set
    for (const key of ['TEST_PATH', 'TEST_JSON']) {
      savedEnv[key] = process.env[key]
      delete process.env[key]
    }
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    // Restore env vars
    for (const [key, val] of Object.entries(savedEnv)) {
      if (val === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = val
      }
    }
  })

  it('reads from CLI path when provided', () => {
    const filePath = path.join(tmpDir, 'cli.json')
    fs.writeFileSync(filePath, '["from-cli"]')
    const result = loadFileList(filePath, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, ['from-cli'])
  })

  it('reads from env path when no CLI arg', () => {
    const filePath = path.join(tmpDir, 'env.json')
    fs.writeFileSync(filePath, '["from-env-path"]')
    process.env.TEST_PATH = filePath
    const result = loadFileList(null, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, ['from-env-path'])
  })

  it('parses env JSON when no CLI arg and no env path', () => {
    process.env.TEST_JSON = '["from-env-json"]'
    const result = loadFileList(null, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, ['from-env-json'])
  })

  it('returns empty array when all sources are empty', () => {
    const result = loadFileList(null, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, [])
  })

  it('CLI path takes priority over env vars', () => {
    const cliFile = path.join(tmpDir, 'cli.json')
    const envFile = path.join(tmpDir, 'env.json')
    fs.writeFileSync(cliFile, '["from-cli"]')
    fs.writeFileSync(envFile, '["from-env"]')
    process.env.TEST_PATH = envFile
    process.env.TEST_JSON = '["from-json"]'
    const result = loadFileList(cliFile, 'TEST_PATH', 'TEST_JSON')
    assert.deepEqual(result, ['from-cli'])
  })
})
