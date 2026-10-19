const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildMcpDiscoveryDocument, MCP_URL_TEMPLATE } = loadTsModule(
  'utils/docs/buildMcpDiscoveryDocument.ts'
)
const { GET: getMcpJson } = loadTsModule('app/(site)/.well-known/mcp.json/route.ts')
const { GET: getMcp } = loadTsModule('app/(site)/.well-known/mcp/route.ts')

const SERVER_URL_PATTERN = /^https:\/\/mcp\.[^.]+\.signoz\.cloud\/mcp$/

const assertDiscoverySchema = (document) => {
  assert.equal(document.version, '1.0.0')
  assert.equal(document.transport, 'http')
  assert.equal(typeof document.url, 'string')
  assert.equal(Array.isArray(document.servers), true)
  assert.equal(document.servers.length > 0, true)

  document.servers.forEach((server) => {
    assert.equal(typeof server.name, 'string')
    assert.match(server.url, SERVER_URL_PATTERN)
    assert.equal(server.transport, 'http')
    assert.equal(server.authentication, 'oauth2')
  })
}

test('discovery document lists one server per control-plane region', () => {
  const document = buildMcpDiscoveryDocument(['us', 'eu', 'in'])

  assertDiscoverySchema(document)
  assert.deepEqual(
    document.servers.map((server) => server.url),
    ['us', 'eu', 'in'].map((region) => `https://mcp.${region}.signoz.cloud/mcp`)
  )
})

test('discovery document falls back to the <region> placeholder with instructions', () => {
  const document = buildMcpDiscoveryDocument([])

  assert.equal(document.servers.length, 1)
  assert.equal(document.servers[0].url, MCP_URL_TEMPLATE)
  assert.equal(document.servers[0].url.includes('<region>'), true)
  assert.match(document.servers[0].description, /Replace <region> with your SigNoz Cloud region/)
})

test('discovery document keeps the region placeholder as the canonical url', () => {
  const document = buildMcpDiscoveryDocument(['us', 'eu'])

  assert.equal(document.url, MCP_URL_TEMPLATE)
  assert.match(document.instructions, /Replace <region> with your SigNoz Cloud region/)
})

test('discovery document records the authentication model and self-hosted path', () => {
  const document = buildMcpDiscoveryDocument(['us'])

  assert.equal(document.authentication.type, 'oauth2')
  assert.match(document.authentication.description, /OAuth 2\.1/)
  assert.match(document.authentication.description, /SIGNOZ-API-KEY/)
  assert.equal(document.documentation, 'https://signoz.io/docs/ai/signoz-mcp-server/')
  assert.equal(document.selfHosted.repository, 'https://github.com/SigNoz/signoz-mcp-server')
})

const fetchRouteBody = async (handler, url) => {
  const response = await handler(new Request(url))
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^application\/json/)
  return response.text()
}

test('both .well-known routes serve the same valid discovery JSON', async () => {
  const [json, bare] = await Promise.all([
    fetchRouteBody(getMcpJson, 'https://signoz.io/.well-known/mcp.json'),
    fetchRouteBody(getMcp, 'https://signoz.io/.well-known/mcp'),
  ])

  assert.equal(bare, json)

  const document = JSON.parse(json)
  const serverUrls = document.servers.map((server) => server.url)
  assert.equal(document.version, '1.0.0')
  assert.equal(document.transport, 'http')
  serverUrls.forEach((url) => {
    assert.equal(SERVER_URL_PATTERN.test(url) || url === MCP_URL_TEMPLATE, true, url)
  })
})
