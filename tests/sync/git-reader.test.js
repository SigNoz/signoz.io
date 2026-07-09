const test = require('node:test')
const assert = require('node:assert/strict')

// We test createGitReader by mocking execFileSync
test('createGitReader: getBaseRefCandidates returns correct order', () => {
  const { createGitReader } = require('../../scripts/cms-sync/git-reader')
  const reader = createGitReader({ baseRef: 'develop' })
  const candidates = reader.getBaseRefCandidates()
  assert.deepEqual(candidates, ['origin/develop', 'develop', 'origin/main', 'main'])
})

test('createGitReader: default baseRef is main', () => {
  const { createGitReader } = require('../../scripts/cms-sync/git-reader')
  const reader = createGitReader()
  const candidates = reader.getBaseRefCandidates()
  assert.deepEqual(candidates, ['origin/main', 'main', 'origin/main', 'main'])
})

test('createGitReader: readFileFromGitRef returns null for nonexistent file', () => {
  const { createGitReader } = require('../../scripts/cms-sync/git-reader')
  const reader = createGitReader()
  const result = reader.readFileFromGitRef('nonexistent-file-xyz-123.txt', 'HEAD')
  assert.equal(result, null)
})

test('createGitReader: readBaseFileForContentEntry constructs path', () => {
  const { createGitReader } = require('../../scripts/cms-sync/git-reader')
  const reader = createGitReader()

  // This will fail to find the file (expected), but we verify it doesn't throw
  const entry = { folderName: 'blog', pathField: '/test-post', filePath: 'data/blog/test-post.mdx' }
  const result = reader.readBaseFileForContentEntry(entry)
  // Will be null since the file doesn't exist in any ref
  assert.equal(result, null)
})

test('createMockGitReader returns content from map', () => {
  const { createMockGitReader } = require('./helpers')
  const reader = createMockGitReader({
    'data/blog/test.mdx': '---\ntitle: Test\n---\nContent here',
  })
  const content = reader.readBaseFileContent('data/blog/test.mdx')
  assert.equal(content, '---\ntitle: Test\n---\nContent here')
})

test('createMockGitReader returns null for missing files', () => {
  const { createMockGitReader } = require('./helpers')
  const reader = createMockGitReader({})
  const content = reader.readBaseFileContent('data/blog/missing.mdx')
  assert.equal(content, null)
})

test('createMockGitReader: readBaseFileForContentEntry tries filePath then constructed path', () => {
  const { createMockGitReader } = require('./helpers')
  const reader = createMockGitReader({
    'data/docs/nested/page.mdx': 'content from constructed path',
  })

  const entry = {
    folderName: 'docs',
    pathField: '/nested/page',
    filePath: 'data/docs/nested/page.mdx',
  }
  const result = reader.readBaseFileForContentEntry(entry)
  assert.equal(result, 'content from constructed path')
})
