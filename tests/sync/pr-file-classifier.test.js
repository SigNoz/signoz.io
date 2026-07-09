const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const {
  classifyContentFiles,
  isContentPath,
  parseNameStatus,
} = require('../../scripts/cms-sync/pr-file-classifier')

function existsFrom(set) {
  return (filePath) => set.has(filePath)
}

describe('isContentPath', () => {
  it('matches synced MDX content paths only', () => {
    assert.equal(isContentPath('data/blog/post.mdx', ['blog']), true)
    assert.equal(isContentPath('data/blog/post.md', ['blog']), true)
    assert.equal(isContentPath('data/blog/post.txt', ['blog']), false)
    assert.equal(isContentPath('data/unknown/post.mdx', ['blog']), false)
    assert.equal(isContentPath('data-assets/img/docs/example.png', ['docs']), false)
  })
})

describe('parseNameStatus', () => {
  it('includes both sides of a content rename', () => {
    const result = parseNameStatus('R100\tdata/blog/old.mdx\tdata/blog/new.mdx\n', ['blog'])

    assert.deepEqual(result.touchedFiles, ['data/blog/new.mdx', 'data/blog/old.mdx'])
    assert.equal(result.finalStatusByPath.get('data/blog/old.mdx'), 'D')
    assert.equal(result.finalStatusByPath.get('data/blog/new.mdx'), 'A')
  })

  it('ignores unsupported folders and non-content files', () => {
    const result = parseNameStatus(
      [
        'M\tdata/blog/post.mdx',
        'M\tdata-assets/img/docs/example.png',
        'M\tdata/unknown/page.mdx',
      ].join('\n'),
      ['blog']
    )

    assert.deepEqual(result.touchedFiles, ['data/blog/post.mdx'])
  })
})

describe('classifyContentFiles', () => {
  it('deletes a staging-only article that was added and deleted in the same open PR', () => {
    const result = classifyContentFiles({
      eventAction: 'synchronize',
      touchedFiles: ['data/blog/temp-post.mdx'],
      finalStatusByPath: new Map(),
      pathExistsInHead: existsFrom(new Set()),
      pathExistsInBase: existsFrom(new Set()),
    })

    assert.deepEqual(result.changedFiles, [])
    assert.deepEqual(result.restoreFiles, [])
    assert.deepEqual(result.deletedFiles, ['data/blog/temp-post.mdx'])
  })

  it('syncs the PR-head file when an update was reverted back to the base content', () => {
    const filePath = 'data/blog/existing-post.mdx'
    const result = classifyContentFiles({
      eventAction: 'synchronize',
      touchedFiles: [filePath],
      finalStatusByPath: new Map(),
      pathExistsInHead: existsFrom(new Set([filePath])),
      pathExistsInBase: existsFrom(new Set([filePath])),
    })

    assert.deepEqual(result.changedFiles, [filePath])
    assert.deepEqual(result.restoreFiles, [])
    assert.deepEqual(result.deletedFiles, [])
  })

  it('keeps active PR deletes as deletes while the PR is open', () => {
    const filePath = 'data/blog/old-post.mdx'
    const result = classifyContentFiles({
      eventAction: 'synchronize',
      touchedFiles: [filePath],
      finalStatusByPath: new Map([[filePath, 'D']]),
      pathExistsInHead: existsFrom(new Set()),
      pathExistsInBase: existsFrom(new Set([filePath])),
    })

    assert.deepEqual(result.deletedFiles, [filePath])
  })

  it('restores the base version for a closed PR path that exists on main', () => {
    const filePath = 'data/docs/getting-started.mdx'
    const result = classifyContentFiles({
      eventAction: 'closed',
      touchedFiles: [filePath],
      finalStatusByPath: new Map(),
      pathExistsInHead: existsFrom(new Set([filePath])),
      pathExistsInBase: existsFrom(new Set([filePath])),
    })

    assert.deepEqual(result.changedFiles, [])
    assert.deepEqual(result.restoreFiles, [filePath])
    assert.deepEqual(result.deletedFiles, [])
  })

  it('deletes a closed PR path that does not exist on main', () => {
    const filePath = 'data/blog/new-post.mdx'
    const result = classifyContentFiles({
      eventAction: 'closed',
      touchedFiles: [filePath],
      finalStatusByPath: new Map([[filePath, 'A']]),
      pathExistsInHead: existsFrom(new Set([filePath])),
      pathExistsInBase: existsFrom(new Set()),
    })

    assert.deepEqual(result.restoreFiles, [])
    assert.deepEqual(result.deletedFiles, [filePath])
  })
})
