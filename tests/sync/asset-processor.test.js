const test = require('node:test')
const assert = require('node:assert/strict')
const {
  stripFencedCodeBlocks,
  extractAssetPaths,
  replaceAssetPaths,
} = require('../../scripts/cms-sync/asset-processor')

test('stripFencedCodeBlocks', async (t) => {
  await t.test('removes backtick fenced code blocks', () => {
    const input = 'before\n```js\nconst x = 1\n```\nafter'
    const result = stripFencedCodeBlocks(input)
    assert.ok(!result.includes('const x'))
    assert.ok(result.includes('before'))
    assert.ok(result.includes('after'))
  })

  await t.test('removes tilde fenced code blocks', () => {
    const input = 'before\n~~~yaml\nkey: value\n~~~\nafter'
    const result = stripFencedCodeBlocks(input)
    assert.ok(!result.includes('key: value'))
  })

  await t.test('removes indented fenced code blocks', () => {
    const input = 'list:\n  ```html\n  <img src="/fake.png" />\n  ```\nafter'
    const result = stripFencedCodeBlocks(input)
    assert.ok(!result.includes('<img'))
  })

  await t.test('preserves content outside code blocks', () => {
    const input = 'keep this ![alt](/img/real.png)\n```\nremove this\n```\nkeep this too'
    const result = stripFencedCodeBlocks(input)
    assert.ok(result.includes('keep this'))
    assert.ok(result.includes('keep this too'))
  })
})

test('extractAssetPaths', async (t) => {
  await t.test('extracts markdown images', () => {
    const content = '![screenshot](/img/dashboard.png)\n![logo](/img/logo.webp)'
    const result = extractAssetPaths(content, {})
    assert.ok(result.includes('/img/dashboard.png'))
    assert.ok(result.includes('/img/logo.webp'))
  })

  await t.test('ignores http URLs in markdown images', () => {
    const content = '![ext](https://example.com/img.png)\n![local](/img/local.png)'
    const result = extractAssetPaths(content, {})
    assert.equal(result.length, 1)
    assert.ok(result.includes('/img/local.png'))
  })

  await t.test('extracts JSX src attributes', () => {
    const content = '<Image src="/img/hero.webp" alt="hero" />'
    const result = extractAssetPaths(content, {})
    assert.ok(result.includes('/img/hero.webp'))
  })

  await t.test('extracts from img, video, source, Figure, Table, NextImage tags', () => {
    const content = [
      '<img src="/img/a.png" />',
      '<video src="/img/b.mp4"></video>',
      '<source src="/img/c.webm" />',
      '<Figure src="/img/d.png" />',
      '<Table src="/img/e.png" />',
      '<NextImage src="/img/f.png" />',
    ].join('\n')
    const result = extractAssetPaths(content, {})
    assert.equal(result.length, 6)
  })

  await t.test('extracts lightSrc alongside src on the same tag', () => {
    const content = '<Figure src="/img/dark.png" lightSrc="/img/light.png" alt="x" />'
    const result = extractAssetPaths(content, {})
    assert.ok(result.includes('/img/dark.png'))
    assert.ok(result.includes('/img/light.png'))
  })

  await t.test('ignores http URLs in lightSrc', () => {
    const content = '<Figure src="/img/dark.png" lightSrc="https://example.com/light.png" />'
    const result = extractAssetPaths(content, {})
    assert.equal(result.length, 1)
    assert.ok(result.includes('/img/dark.png'))
  })

  await t.test('extracts frontmatter asset paths', () => {
    const frontmatter = {
      image: '/img/cover.webp',
      nested: { thumbnail: '/img/thumb.png' },
      tags: ['otel'],
    }
    const result = extractAssetPaths('', frontmatter)
    assert.ok(result.includes('/img/cover.webp'))
    assert.ok(result.includes('/img/thumb.png'))
  })

  await t.test('ignores assets inside code blocks', () => {
    const content = 'Real: ![alt](/img/real.png)\n```\n<img src="/img/fake.png" />\n```'
    const result = extractAssetPaths(content, {})
    assert.ok(result.includes('/img/real.png'))
    assert.ok(!result.includes('/img/fake.png'))
  })

  await t.test('returns unique paths', () => {
    const content = '![a](/img/dup.png)\n![b](/img/dup.png)'
    const result = extractAssetPaths(content, {})
    assert.equal(result.filter((p) => p === '/img/dup.png').length, 1)
  })
})

test('replaceAssetPaths', async (t) => {
  await t.test('replaces markdown image paths with CDN URLs', () => {
    const content = '![alt](/img/photo.png)'
    const { content: result } = replaceAssetPaths(
      content,
      {},
      ['/img/photo.png'],
      'https://cdn.example.com'
    )
    assert.ok(result.includes('https://cdn.example.com/img/photo.png'))
    assert.ok(!result.includes('](/img/photo.png)'))
  })

  await t.test('replaces src attribute paths', () => {
    const content = '<Image src="/img/hero.webp" />'
    const { content: result } = replaceAssetPaths(
      content,
      {},
      ['/img/hero.webp'],
      'https://cdn.example.com'
    )
    assert.ok(result.includes('https://cdn.example.com/img/hero.webp'))
  })

  await t.test('replaces lightSrc attribute paths without touching src', () => {
    const content = '<Figure src="/img/dark.png" lightSrc="/img/light.png" />'
    const { content: result } = replaceAssetPaths(
      content,
      {},
      ['/img/light.png'],
      'https://cdn.example.com'
    )
    assert.ok(result.includes('lightSrc="https://cdn.example.com/img/light.png"'))
    assert.ok(result.includes('src="/img/dark.png"'))
  })

  await t.test('replaces frontmatter asset paths', () => {
    const frontmatter = { image: '/img/cover.webp', title: 'Test' }
    const { frontmatter: result } = replaceAssetPaths(
      '',
      frontmatter,
      ['/img/cover.webp'],
      'https://cdn.example.com'
    )
    assert.equal(result.image, 'https://cdn.example.com/img/cover.webp')
    assert.equal(result.title, 'Test')
  })

  await t.test('handles paths without leading slash', () => {
    const content = '![alt](img/photo.png)'
    const { content: result } = replaceAssetPaths(
      content,
      {},
      ['img/photo.png'],
      'https://cdn.example.com'
    )
    assert.ok(result.includes('https://cdn.example.com/img/photo.png'))
  })

  // Pinning test: replaceAssetPaths only rewrites top-level frontmatter keys.
  // Nested asset paths (arrays, objects) are extracted by extractAssetPaths and
  // uploaded to S3, but not rewritten in the frontmatter payload. This matches
  // the original monolith behavior (L553-558 of the pre-refactor file).
  await t.test('does not rewrite nested frontmatter asset paths (pre-existing behavior)', () => {
    const frontmatter = {
      image: '/img/top-level.webp',
      nested: { thumbnail: '/img/nested.png' },
      gallery: ['/img/item1.png', '/img/item2.png'],
    }
    const assets = ['/img/top-level.webp', '/img/nested.png', '/img/item1.png', '/img/item2.png']
    const { frontmatter: result } = replaceAssetPaths(
      '',
      frontmatter,
      assets,
      'https://cdn.example.com'
    )

    // Top-level is rewritten
    assert.equal(result.image, 'https://cdn.example.com/img/top-level.webp')

    // Nested paths are NOT rewritten (known asymmetry with extractAssetPaths)
    assert.equal(result.nested.thumbnail, '/img/nested.png')
    assert.equal(result.gallery[0], '/img/item1.png')
    assert.equal(result.gallery[1], '/img/item2.png')
  })
})
