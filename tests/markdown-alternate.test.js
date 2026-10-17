const test = require('node:test')
const assert = require('node:assert/strict')
const { pathToRegexp, compile } = require('next/dist/compiled/path-to-regexp')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildMarkdownAlternateUrl, withMarkdownAlternate } = loadTsModule(
  'utils/markdownAlternate.ts'
)
const loadNextConfig = require('../next.config.js')

test('markdown alternate URL uses the .md form the site serves', () => {
  assert.equal(
    buildMarkdownAlternateUrl('/docs/instrumentation/opentelemetry-python/'),
    'https://signoz.io/docs/instrumentation/opentelemetry-python.md'
  )
  assert.equal(buildMarkdownAlternateUrl('docs/install'), 'https://signoz.io/docs/install.md')
})

test('withMarkdownAlternate keeps layout defaults and explicit canonical', () => {
  const defaults = withMarkdownAlternate('/blog/some-post')
  assert.equal(defaults.canonical, './')
  assert.equal(defaults.types['application/rss+xml'], 'https://signoz.io/rss/')
  assert.equal(defaults.types['text/markdown'], 'https://signoz.io/blog/some-post.md')

  const docs = withMarkdownAlternate('/docs/install', {
    canonical: 'https://signoz.io/docs/install/',
  })
  assert.equal(docs.canonical, 'https://signoz.io/docs/install/')
  assert.equal(docs.types['text/markdown'], 'https://signoz.io/docs/install.md')
})

// Mirror how Next compiles redirect sources (lib/build-custom-route.js).
const resolveRedirect = (redirects, pathname) => {
  for (const redirect of redirects) {
    const keys = []
    const regex = pathToRegexp(redirect.source, keys, {
      strict: true,
      sensitive: false,
      delimiter: '/',
    })
    const match = regex.exec(pathname)
    if (match) {
      const params = Object.fromEntries(keys.map((key, i) => [key.name, match[i + 1]]))
      return compile(redirect.destination, { validate: false })(params)
    }
  }
  return null
}

test('old .md URLs follow the same redirect as the HTML page', async () => {
  const redirects = await loadNextConfig().redirects()

  // /docs/userguide/logs/ -> /docs/userguide/logs_query_builder/
  assert.equal(
    resolveRedirect(redirects, '/docs/userguide/logs/'),
    '/docs/userguide/logs_query_builder/'
  )
  for (const markdownPath of ['/docs/userguide/logs.md', '/docs/userguide/logs/.md']) {
    assert.equal(
      resolveRedirect(redirects, markdownPath),
      '/docs/userguide/logs_query_builder.md',
      markdownPath
    )
  }

  // Non-docs content redirects get the same treatment.
  assert.equal(
    resolveRedirect(redirects, '/guides/prometheus-monitoring-101.md'),
    '/guides/what-is-prometheus-for-monitoring.md'
  )
})

test('generated .md redirects skip patterns, externals, and non-markdown paths', async () => {
  const redirects = await loadNextConfig().redirects()
  const markdownRedirects = redirects.filter((r) => r.source.endsWith('{/}?.md'))

  assert.equal(markdownRedirects.length > 0, true)
  const sources = new Set()
  for (const redirect of markdownRedirects) {
    assert.match(redirect.destination, /^\/[^?#]*[^/]\.md$/, redirect.destination)
    assert.doesNotMatch(redirect.source, /^\/docs-onboarding\//)
    assert.doesNotMatch(redirect.source, /:/)
    assert.equal(sources.has(redirect.source), false, `duplicate source ${redirect.source}`)
    sources.add(redirect.source)
  }

  // Current pages' markdown is never redirected.
  assert.equal(resolveRedirect(markdownRedirects, '/docs/userguide/logs_query_builder.md'), null)
  assert.equal(resolveRedirect(markdownRedirects, '/docs/sitemap.md'), null)
  assert.equal(resolveRedirect(markdownRedirects, '/skill.md'), null)
})
