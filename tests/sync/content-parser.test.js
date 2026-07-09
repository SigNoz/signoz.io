const test = require('node:test')
const assert = require('node:assert/strict')
const path = require('path')
const {
  getFolderName,
  generatePathField,
  parseMDXFile,
  detectOperationType,
} = require('../../scripts/cms-sync/content-parser')

test('getFolderName', async (t) => {
  await t.test('returns folder name for data/ paths', () => {
    assert.equal(getFolderName('data/blog/my-post.mdx'), 'blog')
    assert.equal(getFolderName('data/docs/guide/index.mdx'), 'docs')
    assert.equal(getFolderName('data/case-study/acme.mdx'), 'case-study')
    assert.equal(getFolderName('data/faqs/what-is-otel.mdx'), 'faqs')
    assert.equal(getFolderName('data/guides/getting-started.mdx'), 'guides')
    assert.equal(getFolderName('data/comparisons/a-vs-b.mdx'), 'comparisons')
    assert.equal(getFolderName('data/opentelemetry/intro.mdx'), 'opentelemetry')
  })

  await t.test('returns null for non-data paths', () => {
    assert.equal(getFolderName('src/components/Header.tsx'), null)
    assert.equal(getFolderName('public/img/logo.png'), null)
  })

  await t.test('returns null for data with no subfolder', () => {
    assert.equal(getFolderName('data'), null)
  })
})

test('generatePathField', async (t) => {
  await t.test('generates path for blog post', () => {
    assert.equal(generatePathField('data/blog/my-post.mdx', 'blog'), '/my-post')
  })

  await t.test('generates path for nested docs', () => {
    assert.equal(
      generatePathField('data/docs/instrumentation/python/django.mdx', 'docs'),
      '/instrumentation/python/django'
    )
  })

  await t.test('strips .md extension', () => {
    assert.equal(generatePathField('data/guides/intro.md', 'guides'), '/intro')
  })

  await t.test('strips .mdx extension', () => {
    assert.equal(generatePathField('data/faqs/question.mdx', 'faqs'), '/question')
  })

  await t.test('returns null for missing folder', () => {
    assert.equal(generatePathField('other/path/file.mdx', 'blog'), null)
  })
})

test('parseMDXFile', async (t) => {
  await t.test('parses frontmatter and content from string', () => {
    const mockReadFile = () => '---\ntitle: Test Post\nauthors: [ankit]\n---\n\nHello world'

    const result = parseMDXFile('fake.mdx', { readFile: mockReadFile })
    assert.equal(result.frontmatter.title, 'Test Post')
    assert.deepEqual(result.frontmatter.authors, ['ankit'])
    assert.ok(result.content.includes('Hello world'))
  })

  await t.test('throws on read error', () => {
    const mockReadFile = () => {
      throw new Error('ENOENT')
    }
    assert.throws(() => parseMDXFile('missing.mdx', { readFile: mockReadFile }), /Failed to parse/)
  })
})

test('detectOperationType', async (t) => {
  await t.test('returns delete when isDeleted flag is true', () => {
    assert.equal(detectOperationType('data/blog/old.mdx', true), 'delete')
  })

  await t.test('returns delete when file does not exist', () => {
    const existsSync = () => false
    assert.equal(detectOperationType('data/blog/missing.mdx', false, { existsSync }), 'delete')
  })

  await t.test('returns create_or_update when file exists', () => {
    const existsSync = () => true
    assert.equal(
      detectOperationType('data/blog/existing.mdx', false, { existsSync }),
      'create_or_update'
    )
  })
})
