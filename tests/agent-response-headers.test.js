const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  AGENT_CACHE_CONTROL,
  AGENT_CDN_CACHE_CONTROL,
  computeWeakEtag,
  etagMatches,
  agentResponse,
} = loadTsModule('utils/agentResponseHeaders.ts')

const makeRequest = (headers = {}) => new Request('https://signoz.io/llms.txt', { headers })

test('agentResponse sets client-visible and CDN cache headers', async () => {
  const response = agentResponse(makeRequest(), 'body')

  assert.equal(response.status, 200)
  assert.equal(response.headers.get('Cache-Control'), 'public, max-age=300, must-revalidate')
  assert.equal(
    response.headers.get('Vercel-CDN-Cache-Control'),
    'public, s-maxage=3600, stale-while-revalidate=86400'
  )
  assert.equal(response.headers.get('Cache-Control'), AGENT_CACHE_CONTROL)
  assert.equal(response.headers.get('Vercel-CDN-Cache-Control'), AGENT_CDN_CACHE_CONTROL)
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(await response.text(), 'body')
})

test('agentResponse emits a deterministic weak ETag', async () => {
  const first = agentResponse(makeRequest(), 'same body')
  const second = agentResponse(makeRequest(), 'same body')
  const different = agentResponse(makeRequest(), 'other body')

  const etag = first.headers.get('ETag')
  assert.match(etag, /^W\/"[0-9a-f]{40}"$/)
  assert.equal(etag, second.headers.get('ETag'))
  assert.notEqual(etag, different.headers.get('ETag'))
  assert.equal(etag, computeWeakEtag('same body'))
})

test('agentResponse returns 304 with no body when If-None-Match matches', async () => {
  const etag = computeWeakEtag('cached body')
  const response = agentResponse(makeRequest({ 'if-none-match': etag }), 'cached body')

  assert.equal(response.status, 304)
  assert.equal(response.headers.get('ETag'), etag)
  assert.equal(response.headers.get('Cache-Control'), AGENT_CACHE_CONTROL)
  assert.equal(await response.text(), '')
})

test('agentResponse 304 uses weak comparison and handles etag lists', async () => {
  const etag = computeWeakEtag('cached body')
  const strongForm = etag.replace(/^W\//, '')

  assert.equal(
    agentResponse(makeRequest({ 'if-none-match': strongForm }), 'cached body').status,
    304
  )
  assert.equal(
    agentResponse(makeRequest({ 'if-none-match': `"stale", ${etag}` }), 'cached body').status,
    304
  )
  assert.equal(agentResponse(makeRequest({ 'if-none-match': '*' }), 'cached body').status, 304)
  assert.equal(
    agentResponse(makeRequest({ 'if-none-match': '"mismatch"' }), 'cached body').status,
    200
  )
})

test('etagMatches handles missing header', () => {
  assert.equal(etagMatches(null, 'W/"abc"'), false)
})

test('agentResponse applies X-Robots-Tag noindex by default', () => {
  const defaulted = agentResponse(makeRequest(), 'body')
  const disabled = agentResponse(makeRequest(), 'body', { noindex: false })

  assert.equal(defaulted.headers.get('X-Robots-Tag'), 'noindex')
  assert.equal(disabled.headers.get('X-Robots-Tag'), null)
})

test('agentResponse sets Vary: Accept only for negotiated URLs', () => {
  const negotiated = agentResponse(makeRequest(), 'body', { varyAccept: true })
  const single = agentResponse(makeRequest(), 'body')

  assert.equal(negotiated.headers.get('Vary'), 'Accept')
  assert.equal(single.headers.get('Vary'), null)
})

test('agentResponse honors a custom content type', () => {
  const response = agentResponse(makeRequest(), 'body', {
    contentType: 'text/plain; charset=utf-8',
  })

  assert.equal(response.headers.get('Content-Type'), 'text/plain; charset=utf-8')
})
