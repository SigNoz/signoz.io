const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildRobotsTxt, CONTENT_SIGNAL } = loadTsModule('utils/robotsTxt.ts')

const withVercelEnv = async (value, fn) => {
  const previous = process.env.VERCEL_ENV
  if (value === undefined) delete process.env.VERCEL_ENV
  else process.env.VERCEL_ENV = value
  try {
    return await fn()
  } finally {
    if (previous === undefined) delete process.env.VERCEL_ENV
    else process.env.VERCEL_ENV = previous
  }
}

test('production robots.txt keeps the existing rules and adds the Content-Signal', () => {
  assert.equal(
    buildRobotsTxt(true),
    [
      'User-Agent: *',
      'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
      'Allow: /',
      'Disallow: /resource-center',
      '',
      'Host: https://signoz.io',
      'Sitemap: https://signoz.io/sitemap.xml',
      '',
    ].join('\n')
  )
})

test('Content-Signal sits inside the User-Agent group', () => {
  const lines = buildRobotsTxt(true).split('\n')
  const agentIndex = lines.indexOf('User-Agent: *')
  const signalIndex = lines.indexOf(`Content-Signal: ${CONTENT_SIGNAL}`)
  const groupEnd = lines.indexOf('', agentIndex)

  assert.equal(agentIndex >= 0, true)
  assert.equal(signalIndex > agentIndex && signalIndex < groupEnd, true)
})

test('non-production robots.txt blocks all crawling without a Content-Signal', () => {
  const body = buildRobotsTxt(false)

  assert.equal(body, 'User-Agent: *\nDisallow: /\n')
  assert.equal(body.includes('Content-Signal'), false)
})

test('route serves plain text and follows VERCEL_ENV', async () => {
  const { GET, dynamic } = loadTsModule('app/robots.txt/route.ts')
  assert.equal(dynamic, 'force-static')

  await withVercelEnv('production', async () => {
    const response = GET()
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('content-type'), 'text/plain; charset=utf-8')
    assert.match(await response.text(), /^Content-Signal: /m)
  })

  for (const env of ['preview', 'development', undefined]) {
    await withVercelEnv(env, async () => {
      assert.equal(await GET().text(), 'User-Agent: *\nDisallow: /\n')
    })
  }
})
