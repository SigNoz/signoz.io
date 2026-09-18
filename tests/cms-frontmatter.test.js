const { test, describe, before, after } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const os = require('os')
const path = require('path')

const {
  SYNC_FOLDERS,
  validateFrontmatter,
  validateFileContent,
  getAllowedKeys,
  isValidDate,
} = require('../scripts/check-cms-frontmatter')
const { COLLECTION_SCHEMAS } = require('../scripts/cms-sync/schemas')

let rootDir

before(() => {
  rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cms-frontmatter-'))
  for (const folder of ['blog', 'comparisons', 'case-study', 'docs']) {
    fs.mkdirSync(path.join(rootDir, 'data', folder), { recursive: true })
  }
  fs.writeFileSync(path.join(rootDir, 'data/blog/existing-post.mdx'), '---\ntitle: x\n---\n')
  fs.writeFileSync(path.join(rootDir, 'data/case-study/kernel.mdx'), '---\ntitle: x\n---\n')
  fs.mkdirSync(path.join(rootDir, 'data/docs/userguide'), { recursive: true })
  fs.writeFileSync(path.join(rootDir, 'data/docs/userguide/logs.mdx'), '---\ntitle: x\n---\n')
})

after(() => {
  fs.rmSync(rootDir, { recursive: true, force: true })
})

const validBlog = () => ({
  title: 'A post',
  description: 'A description',
  date: '2026-09-18',
  authors: ['ankit_anand'],
  tags: ['OpenTelemetry'],
  keywords: ['otel'],
  image: '/img/blog/cover.webp',
  hide_table_of_contents: false,
  related_articles: ['/blog/existing-post'],
})

function errorFields(result) {
  return result.errors.map((e) => e.field)
}

describe('valid frontmatter', () => {
  test('valid blog frontmatter passes', () => {
    const result = validateFrontmatter('blog', validBlog(), rootDir)
    assert.deepStrictEqual(result.errors, [])
    assert.deepStrictEqual(result.warnings, [])
  })

  test('unquoted YAML dates (JS Date objects) pass', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), date: new Date('2026-09-18') },
      rootDir
    )
    assert.deepStrictEqual(result.errors, [])
  })

  test('empty related_articles array passes', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), related_articles: [] }, rootDir)
    assert.deepStrictEqual(result.errors, [])
  })
})

describe('unknown and reserved keys', () => {
  test('unknown key is an error', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), descrition: 'typo' }, rootDir)
    assert.ok(errorFields(result).includes('descrition'))
  })

  test('slug is rejected as unknown', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), slug: 'my-post' }, rootDir)
    assert.ok(errorFields(result).includes('slug'))
  })

  test('reserved keys path/content/deployment_status are rejected', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), path: '/x', content: 'y', deployment_status: 'live' },
      rootDir
    )
    for (const key of ['path', 'content', 'deployment_status']) {
      const err = result.errors.find((e) => e.field === key)
      assert.ok(err, `expected error for ${key}`)
      assert.match(err.message, /reserved/)
    }
  })

  test('legacy related_* keys point to related_articles', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), related_blogs: ['/blog/existing-post'] },
      rootDir
    )
    const err = result.errors.find((e) => e.field === 'related_blogs')
    assert.ok(err)
    assert.match(err.message, /related_articles/)
  })

  test('keywords is rejected for faqs (no keywords relation in CMS)', () => {
    const result = validateFrontmatter(
      'faqs',
      { title: 't', description: 'd', keywords: ['x'] },
      rootDir
    )
    assert.ok(errorFields(result).includes('keywords'))
  })

  test('is_newsroom is only valid for blog', () => {
    assert.deepStrictEqual(
      validateFrontmatter('blog', { ...validBlog(), is_newsroom: true }, rootDir).errors,
      []
    )
    const result = validateFrontmatter(
      'guides',
      { title: 't', description: 'd', is_newsroom: true },
      rootDir
    )
    assert.ok(errorFields(result).includes('is_newsroom'))
  })
})

describe('required fields', () => {
  test('missing title and description are errors', () => {
    const result = validateFrontmatter('blog', {}, rootDir)
    assert.ok(errorFields(result).includes('title'))
    assert.ok(errorFields(result).includes('description'))
  })

  test('empty title is an error', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), title: '  ' }, rootDir)
    assert.ok(errorFields(result).includes('title'))
  })

  test('case-study requires image', () => {
    const result = validateFrontmatter('case-study', { title: 't', description: 'd' }, rootDir)
    assert.ok(errorFields(result).includes('image'))
  })
})

describe('field types', () => {
  test('scalar authors is an error', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), authors: 'ankit_anand' }, rootDir)
    assert.ok(errorFields(result).includes('authors'))
  })

  test('tags with non-string entries is an error', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), tags: [2024] }, rootDir)
    assert.ok(errorFields(result).includes('tags'))
  })

  test('string "false" boolean is an error', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), hide_table_of_contents: 'false' },
      rootDir
    )
    assert.ok(errorFields(result).includes('hide_table_of_contents'))
  })

  test('invalid date value is an error', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), date: '18-09-2026' }, rootDir)
    assert.ok(errorFields(result).includes('date'))
  })

  test('null value is an error', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), image: null }, rootDir)
    assert.ok(errorFields(result).includes('image'))
  })

  test('non-string meta_title is an error', () => {
    const result = validateFrontmatter('blog', { ...validBlog(), meta_title: 42 }, rootDir)
    assert.ok(errorFields(result).includes('meta_title'))
  })
})

describe('related_articles', () => {
  test('unknown prefix is an error', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), related_articles: ['/unknown-section/post'] },
      rootDir
    )
    assert.match(result.errors[0].message, /unknown content-type prefix/)
  })

  test('missing target file is an error', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), related_articles: ['/blog/does-not-exist'] },
      rootDir
    )
    assert.match(result.errors[0].message, /does not match any file/)
  })

  test('full URLs are rejected with a hint', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), related_articles: ['https://signoz.io/blog/existing-post'] },
      rootDir
    )
    assert.match(result.errors[0].message, /site-relative/)
  })

  test('customers prefix resolves to data/case-study', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), related_articles: ['/customers/kernel/'] },
      rootDir
    )
    assert.deepStrictEqual(result.errors, [])
  })

  test('nested docs slugs resolve', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), related_articles: ['/docs/userguide/logs'] },
      rootDir
    )
    assert.deepStrictEqual(result.errors, [])
  })

  test('single-segment path is an error', () => {
    const result = validateFrontmatter(
      'blog',
      { ...validBlog(), related_articles: ['/existing-post'] },
      rootDir
    )
    assert.match(result.errors[0].message, /not a valid/)
  })
})

describe('doc_type', () => {
  test('unknown doc_type is a warning, not an error', () => {
    const result = validateFrontmatter(
      'docs',
      { title: 't', description: 'd', doc_type: 'walkthrough' },
      rootDir
    )
    assert.deepStrictEqual(result.errors, [])
    assert.strictEqual(result.warnings.length, 1)
    assert.strictEqual(result.warnings[0].field, 'doc_type')
  })

  test('known doc_type passes without warnings', () => {
    const result = validateFrontmatter(
      'docs',
      { title: 't', description: 'd', doc_type: 'howto' },
      rootDir
    )
    assert.deepStrictEqual(result.errors, [])
    assert.deepStrictEqual(result.warnings, [])
  })
})

describe('validateFileContent', () => {
  test('broken YAML reports a parse error', () => {
    const raw = '---\ntitle: "unclosed\ndescription: x\n---\nbody'
    const result = validateFileContent('data/blog/broken.mdx', raw, rootDir)
    assert.strictEqual(result.errors.length, 1)
    assert.match(result.errors[0].message, /YAML failed to parse/)
  })

  test('file with no frontmatter fails required fields', () => {
    const result = validateFileContent('data/blog/plain.mdx', 'just a body', rootDir)
    assert.ok(errorFields(result).includes('title'))
  })

  test('unknown folder reports a schema error', () => {
    const result = validateFileContent('data/nope/x.mdx', '---\ntitle: t\n---\n', rootDir)
    assert.match(result.errors[0].message, /no CMS schema/)
  })
})

describe('schema manifests', () => {
  test('SYNC_FOLDERS derives every synced content folder from the manifests', () => {
    assert.deepStrictEqual([...SYNC_FOLDERS].sort(), [
      'blog',
      'case-study',
      'comparisons',
      'docs',
      'faqs',
      'guides',
      'opentelemetry',
    ])
  })

  test('every synced folder schema declares required title and description', () => {
    for (const folder of SYNC_FOLDERS) {
      const schema = COLLECTION_SCHEMAS[folder]
      assert.ok(schema, `missing schema for ${folder}`)
      assert.ok(schema.required.includes('title'), `${folder} must require title`)
      assert.ok(schema.required.includes('description'), `${folder} must require description`)
      const allowed = getAllowedKeys(schema)
      assert.ok(!allowed.has('path'))
      assert.ok(!allowed.has('content'))
      assert.ok(!allowed.has('deployment_status'))
    }
  })

  test('isValidDate accepts Date objects and YYYY-MM-DD strings only', () => {
    assert.ok(isValidDate(new Date('2026-01-01')))
    assert.ok(isValidDate('2026-01-01'))
    assert.ok(!isValidDate('2026-1-1'))
    assert.ok(!isValidDate(new Date('nope')))
    assert.ok(!isValidDate(20260101))
  })
})
