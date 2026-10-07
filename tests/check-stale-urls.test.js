#!/usr/bin/env node
const test = require('node:test')
const assert = require('assert/strict')
const path = require('path')

const scriptModulePath = path.join(__dirname, '..', 'scripts', 'check-stale-urls.js')

function loadScript() {
  delete require.cache[require.resolve(scriptModulePath)]
  return require(scriptModulePath)
}

function enterFixture(name) {
  const prev = process.cwd()
  const fixtureDir = path.join(__dirname, 'fixtures', name)
  process.chdir(fixtureDir)
  return () => process.chdir(prev)
}

test('extractUrls parses TSX href patterns with line numbers', () => {
  const { extractUrls } = loadScript()
  const content = [
    'const x = 1',
    '<Link href="/docs/install/">Install</Link>',
    "<a href='/pricing/'>Pricing</a>",
    '<Link href={"/about/"}>About</Link>',
  ].join('\n')
  const results = extractUrls(content, 'components/Foo.tsx')
  assert.equal(results.length, 3)
  assert.equal(results[0].url, '/docs/install/')
  assert.equal(results[0].line, 2)
  assert.equal(results[1].url, '/pricing/')
  assert.equal(results[1].line, 3)
  assert.equal(results[2].url, '/about/')
  assert.equal(results[2].line, 4)
})

test('extractUrls parses url properties but skips route properties', () => {
  const { extractUrls } = loadScript()
  const content = [
    "const item = { url: '/old-page/', label: 'Old' }",
    "const nav = { route: '/docs/guide/' }",
  ].join('\n')
  const results = extractUrls(content, 'constants/nav.ts')
  assert.equal(results.length, 1)
  assert.equal(results[0].url, '/old-page/')
  assert.equal(results[0].line, 1)
})

test('extractUrls parses MDX markdown links and component hrefs', () => {
  const { extractUrls } = loadScript()
  const content = [
    'Some text [click here](/docs/install/) more text.',
    'Visit [SigNoz](https://signoz.io/pricing/) today.',
    '<InterlinkCard href="/old-page/" />',
  ].join('\n')
  const results = extractUrls(content, 'data/blog/test.mdx')
  assert.equal(results.length, 3)
  assert.equal(results[0].url, '/docs/install/')
  assert.equal(results[0].line, 1)
  assert.equal(results[1].url, 'https://signoz.io/pricing/')
  assert.equal(results[1].line, 2)
  assert.equal(results[2].url, '/old-page/')
  assert.equal(results[2].line, 3)
})

test('extractUrls skips URLs inside fenced code blocks', () => {
  const { extractUrls } = loadScript()
  const content = [
    'Some text [real link](/docs/install/).',
    '```yaml',
    'url: /should-be-skipped/',
    '```',
    'More text [another](/pricing/).',
  ].join('\n')
  const results = extractUrls(content, 'data/blog/test.mdx')
  assert.equal(results.length, 2)
  assert.equal(results[0].url, '/docs/install/')
  assert.equal(results[1].url, '/pricing/')
})

test('extractUrls normalizes https://signoz.io prefix via normalizeForRedirectMatch', () => {
  const { normalizeForRedirectMatch } = loadScript()
  assert.equal(normalizeForRedirectMatch('https://signoz.io/pricing/'), '/pricing/')
  assert.equal(normalizeForRedirectMatch('https://signoz.io/docs/install/#step1'), '/docs/install/')
  assert.equal(normalizeForRedirectMatch('/local/path/'), '/local/path/')
})

test('checkUrl detects stale redirect source URLs', async () => {
  const { checkUrl, buildRedirectMap, readRedirects } = loadScript()
  const restoreCwd = enterFixture('stale-urls')
  try {
    const redirects = await readRedirects()
    const redirectMap = buildRedirectMap(redirects)
    const issues = checkUrl('/old-page/', redirectMap)
    assert.equal(issues.length, 1)
    assert.equal(issues[0].type, 'stale')
    assert.equal(issues[0].suggestion, '/new-page/')
  } finally {
    restoreCwd()
  }
})

test('checkUrl resolves redirect chains to final destination', async () => {
  const { checkUrl, buildRedirectMap, readRedirects } = loadScript()
  const restoreCwd = enterFixture('stale-urls')
  try {
    const redirects = await readRedirects()
    const redirectMap = buildRedirectMap(redirects)
    const issues = checkUrl('/chain-a/', redirectMap)
    assert.equal(issues.length, 1)
    assert.equal(issues[0].type, 'stale')
    assert.equal(issues[0].suggestion, '/chain-final/')
  } finally {
    restoreCwd()
  }
})

test('checkUrl flags missing trailing slashes', () => {
  const { checkUrl } = loadScript()
  const redirectMap = new Map()
  const issues = checkUrl('/docs/install', redirectMap)
  assert.equal(issues.length, 1)
  assert.equal(issues[0].type, 'trailing-slash')
  assert.equal(issues[0].suggestion, '/docs/install/')
})

test('checkUrl exempts root /, file paths, anchors', () => {
  const { checkUrl } = loadScript()
  const redirectMap = new Map()
  assert.equal(checkUrl('/', redirectMap).length, 0)
  assert.equal(checkUrl('/img/logo.svg', redirectMap).length, 0)
  assert.equal(checkUrl('/img/screenshot.png', redirectMap).length, 0)
  assert.equal(checkUrl('#section', redirectMap).length, 0)
})

test('checkUrl flags trailing slash after anchor fragment', () => {
  const { checkUrl } = loadScript()
  const redirectMap = new Map()
  const issues = checkUrl('/blog/post/#section/', redirectMap)
  assert.equal(issues.length, 1)
  assert.equal(issues[0].type, 'anchor-trailing-slash')
  assert.equal(issues[0].suggestion, '/blog/post/#section')
})

test('checkUrl does not flag anchor without trailing slash', () => {
  const { checkUrl } = loadScript()
  const redirectMap = new Map()
  const issues = checkUrl('/blog/post/#section', redirectMap)
  assert.equal(issues.length, 0)
})

test('checkUrl fixes path and strips anchor slash together', () => {
  const { checkUrl } = loadScript()
  const redirectMap = new Map()
  const issues = checkUrl('/blog/post#section/', redirectMap)
  const types = issues.map((i) => i.type)
  assert.ok(types.includes('anchor-trailing-slash'))
  assert.ok(types.includes('trailing-slash'))
  const anchorIssue = issues.find((i) => i.type === 'anchor-trailing-slash')
  assert.equal(anchorIssue.suggestion, '/blog/post/#section')
})

test('checkUrl does not flag valid URL with trailing slash', () => {
  const { checkUrl } = loadScript()
  const redirectMap = new Map()
  const issues = checkUrl('/docs/install/', redirectMap)
  assert.equal(issues.length, 0)
})

test('checkUrl handles signoz.io URLs for stale detection', async () => {
  const { checkUrl, buildRedirectMap, readRedirects } = loadScript()
  const restoreCwd = enterFixture('stale-urls')
  try {
    const redirects = await readRedirects()
    const redirectMap = buildRedirectMap(redirects)
    const issues = checkUrl('https://signoz.io/old-page/', redirectMap)
    assert.equal(issues.length, 1)
    assert.equal(issues[0].type, 'stale')
    assert.equal(issues[0].suggestion, '/new-page/')
  } finally {
    restoreCwd()
  }
})

test('checkUrl ignores external non-signoz URLs', () => {
  const { checkUrl } = loadScript()
  const redirectMap = new Map()
  const issues = checkUrl('https://example.com/page', redirectMap)
  assert.equal(issues.length, 0)
})

test('buildRedirectMap excludes vanity redirects to external URLs', () => {
  const { buildRedirectMap } = loadScript()
  const redirects = [
    { source: '/slack/', destination: 'https://slack.example.com/invite' },
    { source: '/old-page/', destination: '/new-page/' },
  ]
  const map = buildRedirectMap(redirects)
  assert.equal(map.has('/slack/'), false)
  assert.equal(map.has('/old-page/'), true)
  assert.equal(map.get('/old-page/'), '/new-page/')
})

test('normalizeTrailingSlash adds trailing slash when missing', () => {
  const { normalizeTrailingSlash } = loadScript()
  assert.equal(normalizeTrailingSlash('/docs'), '/docs/')
  assert.equal(normalizeTrailingSlash('/docs/'), '/docs/')
  assert.equal(normalizeTrailingSlash('/'), '/')
})

test('stripFencedCodeBlocks removes fenced blocks', () => {
  const { stripFencedCodeBlocks } = loadScript()
  const input = 'before\n```js\ncode here\n```\nafter'
  const result = stripFencedCodeBlocks(input)
  assert.ok(!result.includes('code here'))
  assert.ok(result.includes('before'))
  assert.ok(result.includes('after'))
})

test('extractUrls picks up frontmatter related_articles entries with context', () => {
  const { extractUrls } = loadScript()
  const content = [
    '---',
    'title: Post',
    'related_articles:',
    "  - '/blog/renamed-post'",
    '  - "/docs/some/guide"',
    '  - /comparisons/a-vs-b',
    'tags:',
    '  - OpenTelemetry',
    '---',
    'Body [link](/docs/install/).',
  ].join('\n')
  const results = extractUrls(content, 'data/blog/test.mdx')
  const related = results.filter((r) => r.context === 'related_articles')
  assert.equal(related.length, 3)
  assert.deepEqual(
    related.map((r) => [r.url, r.line]),
    [
      ['/blog/renamed-post', 4],
      ['/docs/some/guide', 5],
      ['/comparisons/a-vs-b', 6],
    ]
  )
  const body = results.filter((r) => !r.context)
  assert.equal(body.length, 1)
  assert.equal(body[0].url, '/docs/install/')
})

test('extractUrls ignores list items outside frontmatter or under other keys', () => {
  const { extractUrls } = loadScript()
  const content = ['No frontmatter here.', 'related_articles:', '  - /blog/not-frontmatter'].join(
    '\n'
  )
  const results = extractUrls(content, 'data/blog/test.mdx')
  assert.equal(results.filter((r) => r.context === 'related_articles').length, 0)
})

test('checkUrl rewrites stale related_articles entry to destination without trailing slash', async () => {
  const { checkUrl, buildRedirectMap, readRedirects } = loadScript()
  const restoreCwd = enterFixture('stale-urls')
  try {
    const redirectMap = buildRedirectMap(await readRedirects())
    const issues = checkUrl('/blog/renamed-post', redirectMap, 'related_articles')
    assert.equal(issues.length, 1)
    assert.equal(issues[0].type, 'stale')
    assert.equal(issues[0].suggestion, '/blog/current-post')
  } finally {
    restoreCwd()
  }
})

test('checkUrl reports unresolvable when redirect target is not an article and source is gone', async () => {
  const { checkUrl, buildRedirectMap, readRedirects } = loadScript()
  const restoreCwd = enterFixture('stale-urls')
  try {
    const redirectMap = buildRedirectMap(await readRedirects())
    const issues = checkUrl('/blog/retired-post', redirectMap, 'related_articles')
    assert.equal(issues.length, 1)
    assert.equal(issues[0].type, 'related-unresolvable')
  } finally {
    restoreCwd()
  }
})

test('checkUrl leaves related entry alone when source article still exists and redirect target is not an article', async () => {
  const { checkUrl, buildRedirectMap, readRedirects } = loadScript()
  const restoreCwd = enterFixture('stale-urls')
  try {
    const redirectMap = buildRedirectMap(await readRedirects())
    const issues = checkUrl('/blog/shadowed-post', redirectMap, 'related_articles')
    assert.equal(issues.length, 0)
  } finally {
    restoreCwd()
  }
})

test('checkUrl applies no trailing-slash rules to related_articles entries', () => {
  const { checkUrl } = loadScript()
  assert.equal(checkUrl('/blog/some-post', new Map(), 'related_articles').length, 0)
  assert.equal(checkUrl('/blog/some-post/', new Map(), 'related_articles').length, 0)
})

test('computeReplacement rewrites related entries only for article-resolvable redirects', async () => {
  const { computeReplacement, buildRedirectMap, readRedirects } = loadScript()
  const restoreCwd = enterFixture('stale-urls')
  try {
    const redirectMap = buildRedirectMap(await readRedirects())
    assert.equal(
      computeReplacement('/blog/renamed-post', redirectMap, 'related_articles'),
      '/blog/current-post'
    )
    assert.equal(
      computeReplacement('/blog/renamed-post/', redirectMap, 'related_articles'),
      '/blog/current-post'
    )
    // Trailing slash alone is not an issue for related entries
    assert.equal(computeReplacement('/blog/current-post/', redirectMap, 'related_articles'), null)
    // Not auto-fixable: destination is not an article
    assert.equal(computeReplacement('/blog/retired-post', redirectMap, 'related_articles'), null)
    assert.equal(computeReplacement('/blog/shadowed-post', redirectMap, 'related_articles'), null)
    // Body context still gets trailing-slash form
    assert.equal(computeReplacement('/blog/renamed-post', redirectMap), '/blog/current-post/')
  } finally {
    restoreCwd()
  }
})

test('isExemptFromTrailingSlash works correctly', () => {
  const { isExemptFromTrailingSlash } = loadScript()
  assert.equal(isExemptFromTrailingSlash('/'), true)
  assert.equal(isExemptFromTrailingSlash('#section'), true)
  assert.equal(isExemptFromTrailingSlash('/img/logo.svg'), true)
  assert.equal(isExemptFromTrailingSlash('/img/photo.png'), true)
  assert.equal(isExemptFromTrailingSlash('/img/photo.webp'), true)
  assert.equal(isExemptFromTrailingSlash('/static/favicons/site.webmanifest'), true)
  assert.equal(isExemptFromTrailingSlash('/feed.xml'), true)
  assert.equal(isExemptFromTrailingSlash('/docs/install'), false)
  assert.equal(isExemptFromTrailingSlash('/docs/install/'), false)
})
