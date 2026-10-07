const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const path = require('path')
const os = require('os')

const {
  buildPayload,
  parseArgs,
  readJsonFile,
  loadFileList,
} = require('../../scripts/revalidate-after-cms-sync')

describe('parseArgs', () => {
  it('parses all CLI arguments', () => {
    const result = parseArgs([
      '--changed-files',
      '/tmp/changed.json',
      '--added-files',
      '/tmp/added.json',
      '--renamed-files',
      '/tmp/renamed.json',
      '--restore-files',
      '/tmp/restore.json',
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
    assert.equal(result.addedFilesPath, '/tmp/added.json')
    assert.equal(result.renamedFilesPath, '/tmp/renamed.json')
    assert.equal(result.restoreFilesPath, '/tmp/restore.json')
    assert.equal(result.deletedFilesPath, '/tmp/deleted.json')
    assert.equal(result.changedAssetsPath, '/tmp/assets.json')
    assert.equal(result.sidenavChanged, true)
    assert.equal(result.listiclesChanged, true)
    assert.equal(result.changedListiclesPath, '/tmp/listicles.json')
    assert.equal(result.deletedListiclesPath, '/tmp/del-listicles.json')
    assert.equal(result.syncFolders, '["blog","docs"]')
  })

  it('returns undefined/false for missing arguments', () => {
    const result = parseArgs([])
    assert.equal(result.changedFilesPath, undefined)
    assert.equal(result.addedFilesPath, undefined)
    assert.equal(result.renamedFilesPath, undefined)
    assert.equal(result.restoreFilesPath, undefined)
    assert.equal(result.deletedFilesPath, undefined)
    assert.equal(result.sidenavChanged, false)
    assert.equal(result.listiclesChanged, false)
    assert.equal(result.syncFolders, undefined)
  })

  it('handles flag without value correctly', () => {
    const result = parseArgs(['--sidenav-changed'])
    assert.equal(result.sidenavChanged, true)
    assert.equal(result.listiclesChanged, false)
  })
})

describe('buildPayload', () => {
  it('includes restore files when building selective revalidation paths', () => {
    const result = buildPayload({
      changedFiles: [],
      restoreFiles: ['data/blog/restored-post.mdx'],
      deletedFiles: [],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.paths, ['/blog/restored-post'])
    assert.deepEqual(result.tags, ['blogs-list'])
  })

  it('includes deleted staging paths when building selective revalidation paths', () => {
    const result = buildPayload({
      changedFiles: [],
      restoreFiles: [],
      deletedFiles: ['data/docs/temp-page.mdx'],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.paths, ['/docs/temp-page'])
    assert.deepEqual(result.tags, ['docs-list'])
  })

  it('maps case-study files to /customers URLs and revalidates the listing', () => {
    const result = buildPayload({
      changedFiles: ['data/case-study/kernel.mdx'],
      addedFiles: [],
      renamedFiles: [],
      restoreFiles: [],
      deletedFiles: [],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.paths, ['/customers/kernel', '/customers'])
    assert.deepEqual(result.tags, ['case-studies-list'])
  })

  it('skips list tags for edit-only syncs when added files are known', () => {
    const result = buildPayload({
      changedFiles: ['data/docs/existing-page.mdx', 'data/blog/existing-post.mdx'],
      addedFiles: [],
      renamedFiles: [],
      restoreFiles: [],
      deletedFiles: [],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.paths, ['/docs/existing-page', '/blog/existing-post'])
    assert.deepEqual(result.tags, [])
  })

  it('purges list tags when files are added', () => {
    const result = buildPayload({
      changedFiles: ['data/docs/new-page.mdx', 'data/docs/edited-page.mdx'],
      addedFiles: ['data/docs/new-page.mdx'],
      renamedFiles: [],
      restoreFiles: [],
      deletedFiles: [],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.tags, ['docs-list'])
  })

  it('purges list tags when files are renamed', () => {
    const result = buildPayload({
      changedFiles: ['data/blog/renamed-post.mdx'],
      addedFiles: [],
      renamedFiles: ['data/blog/renamed-post.mdx'],
      restoreFiles: [],
      deletedFiles: [],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.tags, ['blogs-list'])
  })

  it('purges list tags for faqs, case-study, and opentelemetry membership changes', () => {
    const result = buildPayload({
      changedFiles: [
        'data/faqs/new-faq.mdx',
        'data/case-study/new-study.mdx',
        'data/opentelemetry/new-article.mdx',
      ],
      addedFiles: [
        'data/faqs/new-faq.mdx',
        'data/case-study/new-study.mdx',
        'data/opentelemetry/new-article.mdx',
      ],
      renamedFiles: [],
      restoreFiles: [],
      deletedFiles: [],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.tags, ['faqs-list', 'opentelemetries-list', 'case-studies-list'])
  })

  it('falls back to purging list tags when added files are unknown (legacy caller)', () => {
    const result = buildPayload({
      changedFiles: ['data/docs/edited-page.mdx'],
      addedFiles: null,
      renamedFiles: [],
      restoreFiles: [],
      deletedFiles: [],
      changedAssets: [],
      sidenavChanged: false,
      listiclesChanged: false,
      changedListicles: [],
      deletedListicles: [],
    })

    assert.equal(result.mode, 'selective')
    assert.deepEqual(result.tags, ['docs-list'])
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
