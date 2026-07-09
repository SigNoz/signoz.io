const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { categorizeFile, parseGitDiff } = require('../../scripts/detect-changed-files')

describe('categorizeFile', () => {
  it('marks content mdx as changed', () => {
    const result = categorizeFile('data/blog/post.mdx', 'M')
    assert.equal(result.contentChanged, true)
    assert.equal(result.contentDeleted, false)
  })

  it('marks content md as deleted', () => {
    const result = categorizeFile('data/docs/page.md', 'D')
    assert.equal(result.contentDeleted, true)
    assert.equal(result.contentChanged, false)
  })

  it('marks added content mdx as changed', () => {
    const result = categorizeFile('data/guides/new.mdx', 'A')
    assert.equal(result.contentChanged, true)
  })

  it('marks asset as changed', () => {
    const result = categorizeFile('data-assets/img/new.png', 'A')
    assert.equal(result.assetChanged, true)
  })

  it('does not track deleted assets', () => {
    const result = categorizeFile('data-assets/img/old.png', 'D')
    assert.equal(result.assetChanged, false)
  })

  it('marks sidenav as changed', () => {
    const result = categorizeFile('data/docs-side-nav/main.json', 'M')
    assert.equal(result.sidenavChanged, true)
    assert.equal(result.contentChanged, false)
  })

  it('marks listicle as changed', () => {
    const result = categorizeFile('constants/listicles/tools.json', 'A')
    assert.equal(result.listicleChanged, true)
    assert.equal(result.listicleDeleted, false)
  })

  it('marks listicle as deleted', () => {
    const result = categorizeFile('constants/listicles/old.json', 'D')
    assert.equal(result.listicleDeleted, true)
    assert.equal(result.listicleChanged, false)
  })

  it('ignores unrelated files', () => {
    const result = categorizeFile('src/components/Foo.tsx', 'M')
    assert.equal(result.contentChanged, false)
    assert.equal(result.contentDeleted, false)
    assert.equal(result.assetChanged, false)
    assert.equal(result.sidenavChanged, false)
    assert.equal(result.listicleChanged, false)
    assert.equal(result.listicleDeleted, false)
  })

  it('ignores non-md/mdx files under data/', () => {
    const result = categorizeFile('data/blog/image.png', 'A')
    assert.equal(result.contentChanged, false)
    assert.equal(result.assetChanged, false)
  })
})

describe('parseGitDiff', () => {
  it('handles empty diff', () => {
    const result = parseGitDiff('')
    assert.deepEqual(result.contentChanged, [])
    assert.deepEqual(result.contentDeleted, [])
    assert.deepEqual(result.assetsChanged, [])
    assert.deepEqual(result.listiclesChanged, [])
    assert.deepEqual(result.listiclesDeleted, [])
    assert.equal(result.sidenavChanged, false)
  })

  it('parses added content file', () => {
    const raw = ['A', 'data/blog/new-post.mdx', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.contentChanged, ['data/blog/new-post.mdx'])
    assert.deepEqual(result.contentDeleted, [])
  })

  it('parses deleted content file', () => {
    const raw = ['D', 'data/docs/old-page.md', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.contentDeleted, ['data/docs/old-page.md'])
    assert.deepEqual(result.contentChanged, [])
  })

  it('parses renamed file — new path in changed, old NOT in deleted', () => {
    // R100\0old-path\0new-path
    const raw = ['R100', 'data/blog/old-name.mdx', 'data/blog/new-name.mdx', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.contentChanged, ['data/blog/new-name.mdx'])
    assert.deepEqual(result.contentDeleted, [])
  })

  it('parses copy status', () => {
    const raw = ['C100', 'data/blog/original.mdx', 'data/blog/copy.mdx', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.contentChanged, ['data/blog/copy.mdx'])
  })

  it('parses asset change', () => {
    const raw = ['A', 'data-assets/img/screenshot.png', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.assetsChanged, ['data-assets/img/screenshot.png'])
  })

  it('parses sidenav change', () => {
    const raw = ['M', 'data/docs-side-nav/main.json', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.equal(result.sidenavChanged, true)
  })

  it('parses listicle changes', () => {
    const raw = ['A', 'constants/listicles/tools.json', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.listiclesChanged, ['constants/listicles/tools.json'])
  })

  it('parses listicle deletion', () => {
    const raw = ['D', 'constants/listicles/old.json', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.listiclesDeleted, ['constants/listicles/old.json'])
  })

  it('handles mixed changes correctly', () => {
    const raw = [
      'M',
      'data/blog/post.mdx',
      'D',
      'data/docs/removed.md',
      'A',
      'data-assets/img/new.png',
      'M',
      'data/docs-side-nav/main.json',
      'A',
      'constants/listicles/tools.json',
      'M',
      'src/components/Header.tsx',
      '',
    ].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.contentChanged, ['data/blog/post.mdx'])
    assert.deepEqual(result.contentDeleted, ['data/docs/removed.md'])
    assert.deepEqual(result.assetsChanged, ['data-assets/img/new.png'])
    assert.equal(result.sidenavChanged, true)
    assert.deepEqual(result.listiclesChanged, ['constants/listicles/tools.json'])
  })

  it('ignores unrelated files in diff', () => {
    const raw = ['M', 'package.json', 'M', 'scripts/build.js', ''].join('\0')
    const result = parseGitDiff(raw)
    assert.deepEqual(result.contentChanged, [])
    assert.deepEqual(result.contentDeleted, [])
    assert.deepEqual(result.assetsChanged, [])
    assert.equal(result.sidenavChanged, false)
  })
})
