const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { proxy } = loadTsModule('proxy.ts')
const { NOT_FOUND_PATHNAME_HEADER } = loadTsModule('components/not-found/constants.ts')
const { AGENT_MARKDOWN_SELF_FETCH_HEADER } = loadTsModule('utils/agentMarkdownRouting.ts')

const { NextRequest } = require('next/server')

const BOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
const HUMAN_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const run = (url, { method = 'GET', headers = {} } = {}) =>
  proxy(new NextRequest(`https://signoz.io${url}`, { method, headers }))

/** Pathname + search of the middleware rewrite target, or null when no rewrite happened. */
const rewriteTarget = (res) => {
  const rewrite = res.headers.get('x-middleware-rewrite')
  if (!rewrite) return null
  const url = new URL(rewrite)
  return `${url.pathname}${url.search}`
}

const isPassthrough = (res) =>
  res.headers.get('x-middleware-next') === '1' && rewriteTarget(res) === null

const setCookies = (res) => res.headers.get('x-middleware-set-cookie') || ''

test('redirects legacy ?source=onboarding docs URLs to /docs-onboarding', () => {
  const res = run('/docs/instrumentation/python?source=onboarding')
  assert.equal(res.status, 307)
  assert.equal(
    res.headers.get('location'),
    'https://signoz.io/docs-onboarding/instrumentation/python'
  )
})

test('onboarding redirect maps /docs root to the onboarding introduction', () => {
  const res = run('/docs?source=onboarding')
  assert.equal(res.status, 307)
  assert.equal(res.headers.get('location'), 'https://signoz.io/docs-onboarding/introduction')
})

test('onboarding redirect drops the source param but preserves other params', () => {
  const res = run('/docs/introduction?source=onboarding&foo=bar')
  assert.equal(res.status, 307)
  const location = new URL(res.headers.get('location'))
  assert.equal(location.pathname, '/docs-onboarding/introduction')
  assert.equal(location.searchParams.get('source'), null)
  assert.equal(location.searchParams.get('foo'), 'bar')
})

test('onboarding redirect only applies to docs paths with source=onboarding', () => {
  assert.equal(isPassthrough(run('/pricing?source=onboarding')), true)
  assert.equal(isPassthrough(run('/docs/introduction?source=other')), true)
  assert.equal(isPassthrough(run('/docs-onboarding/introduction?source=onboarding')), true)
})

test('rewrites .md docs URLs to the docs markdown API', () => {
  assert.equal(rewriteTarget(run('/docs/introduction.md')), '/api/docs-markdown/introduction')
  assert.equal(
    rewriteTarget(run('/docs/instrumentation/python.md')),
    '/api/docs-markdown/instrumentation/python'
  )
})

test('rewrites .md docs URLs with a trailing slash', () => {
  // NextURL re-applies the original trailing slash; Next's trailing-slash
  // normalization resolves it against the same route.
  assert.equal(rewriteTarget(run('/docs/introduction.md/')), '/api/docs-markdown/introduction/')
})

test('rewrites docs URLs when Accept: text/markdown is sent', () => {
  const res = run('/docs/introduction', { headers: { accept: 'text/markdown' } })
  assert.equal(rewriteTarget(res), '/api/docs-markdown/introduction')
})

test('docs Accept negotiation is case-insensitive and works in composite Accept headers', () => {
  assert.equal(
    rewriteTarget(run('/docs/introduction', { headers: { accept: 'TEXT/MARKDOWN' } })),
    '/api/docs-markdown/introduction'
  )
  assert.equal(
    rewriteTarget(
      run('/docs/introduction', { headers: { accept: 'text/markdown, text/html;q=0.8' } })
    ),
    '/api/docs-markdown/introduction'
  )
})

test('rewrites the /docs root to the docs markdown API root', () => {
  assert.equal(
    rewriteTarget(run('/docs', { headers: { accept: 'text/markdown' } })),
    '/api/docs-markdown'
  )
})

test('does not rewrite docs URLs for HTML requests', () => {
  assert.equal(isPassthrough(run('/docs/introduction')), true)
  assert.equal(isPassthrough(run('/docs/introduction', { headers: { accept: 'text/html' } })), true)
})

test('does not rewrite /docs/sitemap.md (served by its dedicated route)', () => {
  assert.equal(isPassthrough(run('/docs/sitemap.md')), true)
  assert.equal(isPassthrough(run('/docs/sitemap.md/')), true)
})

test('does not re-enter docs markdown routing for agent self-fetches', () => {
  const res = run('/docs/introduction.md', {
    headers: { [AGENT_MARKDOWN_SELF_FETCH_HEADER]: '1' },
  })
  assert.equal(isPassthrough(res), true)
})

test('rewrites versioned api-reference pages to the OpenAPI spec for markdown-preferring bots', () => {
  assert.equal(
    rewriteTarget(
      run('/api-reference/latest', { headers: { 'user-agent': BOT_UA, accept: 'text/markdown' } })
    ),
    '/api/api-reference-openapi/latest'
  )
  assert.equal(
    rewriteTarget(
      run('/api-reference/v1.2.3', { headers: { 'user-agent': BOT_UA, accept: 'text/markdown' } })
    ),
    '/api/api-reference-openapi/v1.2.3'
  )
})

test('api-reference OpenAPI rewrite requires both a bot UA and markdown Accept', () => {
  assert.equal(
    isPassthrough(run('/api-reference/latest', { headers: { accept: 'text/markdown' } })),
    true
  )
  assert.equal(
    isPassthrough(run('/api-reference/latest', { headers: { 'user-agent': BOT_UA } })),
    true
  )
})

test('api-reference OpenAPI rewrite skips the index and non-version segments', () => {
  const headers = { 'user-agent': BOT_UA, accept: 'text/markdown' }
  assert.equal(isPassthrough(run('/api-reference', { headers })), true)
  assert.equal(isPassthrough(run('/api-reference/not-a-version', { headers })), true)
  assert.equal(isPassthrough(run('/api-reference/latest/logs', { headers })), true)
})

test('rewrites .md content-section URLs to the content markdown API', () => {
  assert.equal(rewriteTarget(run('/blog/some-post.md')), '/api/content-markdown/blog/some-post')
  assert.equal(
    rewriteTarget(run('/comparisons/foo-vs-bar.md')),
    '/api/content-markdown/comparisons/foo-vs-bar'
  )
  assert.equal(
    rewriteTarget(run('/guides/nested/slug.md')),
    '/api/content-markdown/guides/nested/slug'
  )
  assert.equal(
    rewriteTarget(run('/opentelemetry/python.md')),
    '/api/content-markdown/opentelemetry/python'
  )
  assert.equal(
    rewriteTarget(run('/faqs/what-is-signoz.md')),
    '/api/content-markdown/faqs/what-is-signoz'
  )
  assert.equal(rewriteTarget(run('/case-study/acme.md')), '/api/content-markdown/case-study/acme')
})

test('rewrites content-section URLs via Accept negotiation and trailing slashes', () => {
  assert.equal(
    rewriteTarget(run('/blog/some-post', { headers: { accept: 'text/markdown' } })),
    '/api/content-markdown/blog/some-post'
  )
  assert.equal(rewriteTarget(run('/blog/some-post.md/')), '/api/content-markdown/blog/some-post/')
})

test('content markdown rewrites only apply to GET and HEAD requests', () => {
  assert.equal(
    rewriteTarget(run('/blog/some-post.md', { method: 'HEAD' })),
    '/api/content-markdown/blog/some-post'
  )
  for (const method of ['POST', 'PUT', 'DELETE']) {
    assert.equal(isPassthrough(run('/blog/some-post.md', { method })), true, method)
  }
})

test('does not re-enter content markdown routing for agent self-fetches', () => {
  const res = run('/blog/some-post.md', { headers: { [AGENT_MARKDOWN_SELF_FETCH_HEADER]: '1' } })
  assert.equal(isPassthrough(res), true)
})

test('rewrites .md page URLs to the page markdown API', () => {
  assert.equal(rewriteTarget(run('/pricing.md')), '/api/page-markdown/pricing')
  assert.equal(
    rewriteTarget(run('/product-comparison/signoz-vs-datadog.md')),
    '/api/page-markdown/product-comparison/signoz-vs-datadog'
  )
})

test('rewrites the home page and section indexes via the page pipeline', () => {
  assert.equal(
    rewriteTarget(run('/', { headers: { accept: 'text/markdown' } })),
    '/api/page-markdown'
  )
  assert.equal(rewriteTarget(run('/blog.md')), '/api/page-markdown/blog')
  assert.equal(
    rewriteTarget(run('/blog', { headers: { accept: 'text/markdown' } })),
    '/api/page-markdown/blog'
  )
})

test('page markdown rewrites require markdown intent', () => {
  assert.equal(isPassthrough(run('/pricing')), true)
  assert.equal(isPassthrough(run('/pricing', { headers: { accept: 'text/html' } })), true)
})

test('page markdown rewrites skip excluded prefixes', () => {
  const headers = { accept: 'text/markdown' }
  assert.equal(isPassthrough(run('/docs-onboarding/introduction', { headers })), true)
  assert.equal(isPassthrough(run('/api-reference', { headers })), true)
  // /api/* is excluded by the matcher in production; the predicate must also hold.
  assert.equal(isPassthrough(run('/api/page-markdown/pricing', { headers })), true)
})

test('page markdown rewrites skip file-like paths', () => {
  const headers = { accept: 'text/markdown' }
  assert.equal(isPassthrough(run('/llms.txt', { headers })), true)
  assert.equal(isPassthrough(run('/llms.txt.md')), true)
  assert.equal(isPassthrough(run('/sitemap.xml', { headers })), true)
  assert.equal(isPassthrough(run('/robots.txt', { headers })), true)
})

test('page markdown rewrites only apply to GET and HEAD requests', () => {
  assert.equal(rewriteTarget(run('/pricing.md', { method: 'HEAD' })), '/api/page-markdown/pricing')
  assert.equal(isPassthrough(run('/pricing.md', { method: 'POST' })), true)
})

test('does not re-enter page markdown routing for agent self-fetches', () => {
  const res = run('/pricing.md', { headers: { [AGENT_MARKDOWN_SELF_FETCH_HEADER]: '1' } })
  assert.equal(isPassthrough(res), true)
})

test('markdown rewrites preserve the query string', () => {
  assert.equal(
    rewriteTarget(run('/blog/some-post.md?utm_source=x')),
    '/api/content-markdown/blog/some-post?utm_source=x'
  )
  assert.equal(rewriteTarget(run('/pricing.md?a=1')), '/api/page-markdown/pricing?a=1')
})

test('content sections take precedence over the generic page pipeline', () => {
  assert.equal(rewriteTarget(run('/blog/some-post.md')), '/api/content-markdown/blog/some-post')
})

test('sets the markdown rewrite debug header outside production', () => {
  assert.equal(run('/pricing.md').headers.get('x-markdown-rewrite'), 'true')
  assert.equal(run('/pricing').headers.get('x-markdown-rewrite'), null)
})

test('adds Vary: Accept on every URL that serves a markdown alternate, even for HTML requests', () => {
  assert.equal(run('/docs/introduction').headers.get('vary'), 'Accept')
  assert.equal(run('/docs').headers.get('vary'), 'Accept')
  assert.equal(run('/blog/some-post').headers.get('vary'), 'Accept')
  assert.equal(run('/pricing').headers.get('vary'), 'Accept')
  assert.equal(run('/').headers.get('vary'), 'Accept')
})

test('does not add Vary: Accept on paths without a markdown alternate', () => {
  assert.equal(run('/llms.txt').headers.get('vary'), null)
  assert.equal(run('/sitemap.xml').headers.get('vary'), null)
  assert.equal(run('/api-reference/latest').headers.get('vary'), null)
  assert.equal(run('/docs-onboarding/introduction').headers.get('vary'), null)
})

test('preserves the request pathname for not-found suggestions on passthrough and rewrite', () => {
  assert.equal(run('/nonexistent-page').headers.get(NOT_FOUND_PATHNAME_HEADER), '/nonexistent-page')
  assert.equal(run('/pricing.md').headers.get(NOT_FOUND_PATHNAME_HEADER), '/pricing.md')
})

test('flags bot requests with bot headers', () => {
  const res = run('/pricing', { headers: { 'user-agent': BOT_UA } })
  assert.equal(res.headers.get('x-bot-detected'), 'true')
  assert.equal(res.headers.get('x-bot-type'), 'googlebot')
  assert.equal(res.headers.get('x-prefers-markdown'), null)
})

test('flags markdown-preferring bots with x-prefers-markdown', () => {
  const res = run('/pricing', { headers: { 'user-agent': BOT_UA, accept: 'text/markdown' } })
  assert.equal(res.headers.get('x-prefers-markdown'), 'true')
})

test('does not set bot headers for regular browser requests', () => {
  const res = run('/pricing', { headers: { 'user-agent': HUMAN_UA } })
  assert.equal(res.headers.get('x-bot-detected'), null)
  assert.equal(res.headers.get('x-bot-type'), null)
  assert.equal(res.headers.get('x-prefers-markdown'), null)
})

test('assigns a persistent anonymous id cookie when missing', () => {
  const cookies = setCookies(run('/pricing'))
  assert.match(
    cookies,
    /gb_anonymous_id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  )
  assert.match(cookies, /Max-Age=31536000/)
})

test('keeps an existing anonymous id and forwards it to the request headers', () => {
  const res = run('/pricing', { headers: { cookie: 'gb_anonymous_id=existing-id' } })
  assert.equal(setCookies(res).includes('gb_anonymous_id'), false)
  assert.equal(res.headers.get('x-middleware-request-x-gb-anonymous-id'), 'existing-id')
})

test('sets ip cookies from forwarding headers when they change', () => {
  const res = run('/pricing', {
    headers: { 'x-forwarded-for': '1.2.3.4', 'x-real-ip': '5.6.7.8' },
  })
  const cookies = setCookies(res)
  assert.match(cookies, /user_ip=1\.2\.3\.4/)
  assert.match(cookies, /vercel_ip=5\.6\.7\.8/)
})

test('does not reset ip cookies when they already match, nor set them when unknown', () => {
  const matching = run('/pricing', {
    headers: {
      cookie: 'user_ip=1.2.3.4; vercel_ip=5.6.7.8',
      'x-forwarded-for': '1.2.3.4',
      'x-real-ip': '5.6.7.8',
    },
  })
  assert.equal(setCookies(matching).includes('user_ip'), false)
  assert.equal(setCookies(matching).includes('vercel_ip'), false)

  const unknown = run('/pricing')
  assert.equal(setCookies(unknown).includes('user_ip'), false)
  assert.equal(setCookies(unknown).includes('vercel_ip'), false)
})
