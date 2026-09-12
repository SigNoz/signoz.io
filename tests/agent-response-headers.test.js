const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  AGENT_CACHE_CONTROL,
  AGENT_CDN_CACHE_CONTROL,
  computeWeakEtag,
  agentResponse,
  agentNotFoundResponse,
} = loadTsModule('utils/agentResponseHeaders.ts')

test('agentResponse sets client-visible and CDN cache headers', async () => {
  const response = agentResponse('body')

  assert.equal(response.status, 200)
  assert.equal(response.headers.get('Cache-Control'), AGENT_CACHE_CONTROL)
  assert.equal(response.headers.get('Vercel-CDN-Cache-Control'), AGENT_CDN_CACHE_CONTROL)
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(await response.text(), 'body')
})

test('client cache policy allows stale fallback (no must-revalidate)', () => {
  assert.equal(AGENT_CACHE_CONTROL, 'public, max-age=300')
  assert.equal(AGENT_CDN_CACHE_CONTROL, 'public, s-maxage=3600, stale-while-revalidate=86400')
})

test('agentResponse emits a deterministic weak ETag', () => {
  const first = agentResponse('same body')
  const second = agentResponse('same body')
  const different = agentResponse('other body')

  const etag = first.headers.get('ETag')
  assert.match(etag, /^W\/"[0-9a-f]{40}"$/)
  assert.equal(etag, second.headers.get('ETag'))
  assert.notEqual(etag, different.headers.get('ETag'))
  assert.equal(etag, computeWeakEtag('same body'))
})

test('agentResponse applies X-Robots-Tag noindex by default', () => {
  const defaulted = agentResponse('body')
  const disabled = agentResponse('body', { noindex: false })

  assert.equal(defaulted.headers.get('X-Robots-Tag'), 'noindex')
  assert.equal(disabled.headers.get('X-Robots-Tag'), null)
})

test('agentResponse sets Vary: Accept only for negotiated URLs', () => {
  const negotiated = agentResponse('body', { varyAccept: true })
  const single = agentResponse('body')

  assert.equal(negotiated.headers.get('Vary'), 'Accept')
  assert.equal(single.headers.get('Vary'), null)
})

test('agentResponse honors a custom content type', () => {
  const response = agentResponse('body', { contentType: 'text/plain; charset=utf-8' })

  assert.equal(response.headers.get('Content-Type'), 'text/plain; charset=utf-8')
})

test('agentNotFoundResponse answers a miss with a recoverable markdown body', async () => {
  const response = agentNotFoundResponse('/does-not-exist')
  const body = await response.text()

  assert.equal(response.status, 404)
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(response.headers.get('Cache-Control'), 'no-store')
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex')
  assert.match(body.split('\n')[0], /^# 404 Not Found$/)
  assert.match(body, /`\/does-not-exist`/)
  assert.match(body, /https:\/\/signoz\.io\/llms\.txt/)
  assert.match(body, /https:\/\/signoz\.io\/sitemap\.xml/)
  assert.match(body, /https:\/\/signoz\.io\/docs\/introduction\//)
})

test('agentNotFoundResponse works without a pathname', async () => {
  const body = await agentNotFoundResponse().text()

  assert.match(body, /^# 404 Not Found/)
  assert.equal(body.includes('undefined'), false)
})
