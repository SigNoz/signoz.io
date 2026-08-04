const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildLlmsTxt, docsSlugFromRoute } = loadTsModule('utils/docs/buildLlmsTxt.ts')

const SITE_URL = 'https://signoz.io'

const TREE = [
  {
    label: 'Get Started',
    route: '/docs/introduction',
    children: [{ label: 'Install', route: '/docs/install', children: [] }],
  },
  {
    // Category with no route of its own — a heading only.
    label: 'Logs',
    children: [
      { label: 'Send Logs', route: '/docs/logs-management/send-logs', children: [] },
      { label: 'Parsing', route: '/docs/logs-management/parsing', children: [] },
    ],
  },
]

const build = (descriptions) => buildLlmsTxt({ siteUrl: SITE_URL, tree: TREE, descriptions })

test('llms.txt lists every route in the tree with an absolute canonical URL', () => {
  const body = build()

  for (const route of [
    '/docs/introduction',
    '/docs/install',
    '/docs/logs-management/send-logs',
    '/docs/logs-management/parsing',
  ]) {
    assert.ok(body.includes(`(${SITE_URL}${route}/)`), `missing entry for ${route}`)
  }
})

test('llms.txt groups entries under their top-level nav section', () => {
  const body = build()

  assert.match(body, /^## Get Started$/m)
  assert.match(body, /^## Logs$/m)
  // Nested children are flattened into their section, not indented.
  assert.doesNotMatch(body, /^[ \t]+- \[/m)
})

test('llms.txt appends descriptions when available', () => {
  const body = build(
    new Map([
      ['introduction', 'What SigNoz is and how to get started.'],
      ['logs-management/send-logs', 'Ship logs from any source.'],
    ])
  )

  assert.match(body, /- \[Get Started\]\(.*\): What SigNoz is and how to get started$/m)
  assert.match(body, /- \[Send Logs\]\(.*\): Ship logs from any source$/m)
  // Pages without a description still get an entry, just no colon suffix.
  assert.match(body, /- \[Parsing\]\(https:\/\/signoz\.io\/docs\/logs-management\/parsing\/\)$/m)
})

test('llms.txt normalizes multi-line descriptions to a single line', () => {
  const body = build(new Map([['install', 'Line one.\n\n  Line   two.']]))

  assert.match(body, /- \[Install\]\(.*\): Line one\. Line two$/m)
  assert.doesNotMatch(body, /Line one\.\n/)
})

test('llms.txt does not repeat a route that appears twice in the nav', () => {
  const body = buildLlmsTxt({
    siteUrl: SITE_URL,
    tree: [
      { label: 'A', route: '/docs/shared', children: [] },
      { label: 'B', children: [{ label: 'Shared again', route: '/docs/shared', children: [] }] },
    ],
  })

  assert.equal((body.match(/\/docs\/shared\//g) || []).length, 1)
})

test('llms.txt tells agents how to get markdown and not to invent URLs', () => {
  const body = build()

  assert.match(body, /Append "\.md" to any docs URL/)
  assert.match(body, /Accept: text\/markdown/)
  assert.match(body, /Do not construct docs URLs that are not in this file/)
})

test('llms.txt links the non-docs markdown surfaces', () => {
  const body = build()

  assert.ok(body.includes(`${SITE_URL}/pricing.md`))
  assert.ok(body.includes(`${SITE_URL}/docs/sitemap.md`))
})

test('llms.txt contains no site-relative links', () => {
  const body = build()

  assert.doesNotMatch(body, /\]\(\/(?!\/)/)
})

test('llms.txt collapses blank runs and ends with exactly one newline', () => {
  const body = build()

  assert.doesNotMatch(body, /\n{3,}/)
  assert.ok(body.endsWith('\n'))
  assert.ok(!body.endsWith('\n\n'))
})

test('docsSlugFromRoute strips the docs prefix and trailing slashes', () => {
  assert.equal(docsSlugFromRoute('/docs/introduction'), 'introduction')
  assert.equal(docsSlugFromRoute('/docs/foo/bar/'), 'foo/bar')
  assert.equal(docsSlugFromRoute('/docs'), '')
})
