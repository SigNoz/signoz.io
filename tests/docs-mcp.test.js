const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  handleDocsMcpPost,
  handleDocsMcpMessage,
  resolveDocsUrl,
  extractMarkdownSection,
  docsMcpMethodNotAllowed,
  docsMcpPreflight,
  LATEST_PROTOCOL_VERSION,
  MAX_REQUEST_BYTES,
  JSON_RPC_ERRORS,
} = loadTsModule('utils/docs/docsMcp.ts')
const { mapDocsSearchHits, searchDocsWithAlgolia } = loadTsModule(
  'utils/docs/searchDocsWithAlgolia.ts'
)

const REPO_ROOT = path.resolve(__dirname, '..')
const REAL_DOC_SLUG = 'instrumentation/opentelemetry-python'

// Reads the real MDX source so URL → slug resolution is checked against an actual docs file.
const readRealDoc = async (slug) => {
  const filePath = path.join(REPO_ROOT, 'data/docs', `${slug}.mdx`)
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null
}

const SAMPLE_MARKDOWN = [
  '# Page',
  '',
  'Intro.',
  '',
  '## Prerequisites',
  '',
  'Need Python.',
  '',
  '```bash',
  '## not a heading',
  '```',
  '',
  '### Detail',
  '',
  'More.',
  '',
  '## Setup',
  '',
  'Steps.',
].join('\n')

const makeDeps = (overrides = {}) => ({
  searchDocs: async () => [],
  fetchDocMarkdown: readRealDoc,
  ...overrides,
})

const post = async (body, deps = makeDeps(), headers = {}) => {
  const request = new Request('https://signoz.io/docs/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...headers,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
  return handleDocsMcpPost(request, deps)
}

const rpc = (id, method, params) => ({ jsonrpc: '2.0', id, method, ...(params ? { params } : {}) })

test('initialize negotiates the protocol version and advertises tools only', async () => {
  const response = await post(
    rpc(1, 'initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 'test', version: '1' },
    })
  )
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^application\/json/)
  assert.equal(response.headers.get('access-control-allow-origin'), '*')

  const body = await response.json()
  assert.equal(body.id, 1)
  assert.equal(body.result.protocolVersion, '2025-06-18')
  assert.deepEqual(body.result.capabilities, { tools: { listChanged: false } })
  assert.equal(body.result.serverInfo.name, 'signoz-docs')
  assert.match(body.result.instructions, /no access/i)
  assert.match(body.result.instructions, /signoz-mcp-server/)
})

test('initialize answers unknown protocol versions with the latest supported one', async () => {
  const body = await (await post(rpc(1, 'initialize', { protocolVersion: '1999-01-01' }))).json()
  assert.equal(body.result.protocolVersion, LATEST_PROTOCOL_VERSION)
})

test('notifications get 202 with no body', async () => {
  const response = await post({ jsonrpc: '2.0', method: 'notifications/initialized' })
  assert.equal(response.status, 202)
  assert.equal(await response.text(), '')
})

test('ping returns an empty result', async () => {
  const body = await (await post(rpc('a', 'ping'))).json()
  assert.deepEqual(body, { jsonrpc: '2.0', id: 'a', result: {} })
})

test('tools/list returns exactly the two read-only docs tools', async () => {
  const body = await (await post(rpc(2, 'tools/list'))).json()
  const names = body.result.tools.map((tool) => tool.name)
  assert.deepEqual(names, ['signoz_search_docs', 'signoz_fetch_doc'])
  body.result.tools.forEach((tool) => {
    assert.equal(tool.annotations.readOnlyHint, true)
    assert.equal(tool.inputSchema.type, 'object')
  })
})

test('signoz_fetch_doc returns the markdown of a real docs page from a URL', async () => {
  const body = await (
    await post(
      rpc(3, 'tools/call', {
        name: 'signoz_fetch_doc',
        arguments: { url: `https://signoz.io/docs/${REAL_DOC_SLUG}/` },
      })
    )
  ).json()
  const expected = await readRealDoc(REAL_DOC_SLUG)
  assert.ok(expected, 'fixture doc missing from data/docs')
  assert.equal(body.result.isError, undefined)
  assert.equal(body.result.content[0].type, 'text')
  assert.equal(body.result.content[0].text, expected)
})

test('signoz_fetch_doc accepts /docs paths and .md URLs', async () => {
  const seen = []
  const deps = makeDeps({
    fetchDocMarkdown: async (slug) => {
      seen.push(slug)
      return '# Doc'
    },
  })
  for (const url of [
    `/docs/${REAL_DOC_SLUG}`,
    `https://signoz.io/docs/${REAL_DOC_SLUG}.md`,
    `https://www.signoz.io/docs/${REAL_DOC_SLUG}/`,
  ]) {
    await post(rpc(1, 'tools/call', { name: 'signoz_fetch_doc', arguments: { url } }), deps)
  }
  assert.deepEqual(seen, [REAL_DOC_SLUG, REAL_DOC_SLUG, REAL_DOC_SLUG])
})

test('signoz_fetch_doc rejects non-docs URLs without fetching', async () => {
  let fetched = false
  const deps = makeDeps({
    fetchDocMarkdown: async () => {
      fetched = true
      return '# Doc'
    },
  })
  for (const url of [
    'https://example.com/docs/introduction/',
    'https://signoz.io/blog/opentelemetry-collector-complete-guide/',
    'https://signoz.io.evil.com/docs/introduction/',
    'file:///etc/passwd',
    '/docs/mcp',
  ]) {
    const body = await (
      await post(rpc(4, 'tools/call', { name: 'signoz_fetch_doc', arguments: { url } }), deps)
    ).json()
    assert.equal(body.result.isError, true, url)
  }
  assert.equal(fetched, false)
})

test('signoz_fetch_doc reports a missing page as a tool error', async () => {
  const deps = makeDeps({ fetchDocMarkdown: async () => null })
  const body = await (
    await post(
      rpc(5, 'tools/call', { name: 'signoz_fetch_doc', arguments: { url: '/docs/nope/' } }),
      deps
    )
  ).json()
  assert.equal(body.result.isError, true)
  assert.match(body.result.content[0].text, /signoz_search_docs/)
})

test('signoz_fetch_doc returns only the requested section', async () => {
  const deps = makeDeps({ fetchDocMarkdown: async () => SAMPLE_MARKDOWN })
  const call = async (args) =>
    (
      await (
        await post(rpc(6, 'tools/call', { name: 'signoz_fetch_doc', arguments: args }), deps)
      ).json()
    ).result

  const byHeading = await call({ url: '/docs/page/', heading: '## Prerequisites' })
  assert.match(byHeading.content[0].text, /^## Prerequisites/)
  assert.match(byHeading.content[0].text, /### Detail/)
  assert.doesNotMatch(byHeading.content[0].text, /## Setup/)

  const byAnchor = await call({ url: 'https://signoz.io/docs/page/#setup' })
  assert.equal(byAnchor.content[0].text, '## Setup\n\nSteps.')

  const missing = await call({ url: '/docs/page/', heading: 'nothing-here' })
  assert.equal(missing.isError, true)
  assert.match(missing.content[0].text, /- Prerequisites/)
})

test('extractMarkdownSection ignores headings inside code fences', () => {
  const { headings } = extractMarkdownSection(SAMPLE_MARKDOWN, 'setup')
  assert.deepEqual(headings, ['Page', 'Prerequisites', 'Detail', 'Setup'])
})

test('resolveDocsUrl maps the docs root to the introduction page', () => {
  assert.deepEqual(resolveDocsUrl('https://signoz.io/docs/'), { slug: 'introduction' })
  assert.deepEqual(resolveDocsUrl('docs/install/docker'), { slug: 'install/docker' })
})

test('signoz_search_docs passes the query and clamps limit', async () => {
  const calls = []
  const deps = makeDeps({
    searchDocs: async (query, limit) => {
      calls.push({ query, limit })
      return [
        {
          title: 'Send Logs',
          url: 'https://signoz.io/docs/logs/',
          markdownUrl: 'https://signoz.io/docs/logs.md',
          snippet: 'Collect logs',
        },
      ]
    },
  })
  const body = await (
    await post(
      rpc(7, 'tools/call', {
        name: 'signoz_search_docs',
        arguments: { searchText: ' kubernetes logs ', limit: 500 },
      }),
      deps
    )
  ).json()
  assert.deepEqual(calls, [{ query: 'kubernetes logs', limit: 25 }])
  assert.equal(body.result.structuredContent.results.length, 1)
  assert.match(body.result.content[0].text, /https:\/\/signoz\.io\/docs\/logs\.md/)
})

test('signoz_search_docs validates input', async () => {
  const call = async (args) =>
    (
      await (
        await post(rpc(8, 'tools/call', { name: 'signoz_search_docs', arguments: args }))
      ).json()
    ).result
  assert.equal((await call({})).isError, true)
  assert.equal((await call({ searchText: 'x'.repeat(301) })).isError, true)
  assert.equal((await call({ searchText: 'logs', limit: 0 })).isError, true)
})

test('signoz_search_docs turns search outages into a tool error', async () => {
  const originalError = console.error
  console.error = () => {}
  try {
    const deps = makeDeps({
      searchDocs: async () => {
        throw new Error('boom')
      },
    })
    const body = await (
      await post(
        rpc(9, 'tools/call', { name: 'signoz_search_docs', arguments: { searchText: 'logs' } }),
        deps
      )
    ).json()
    assert.equal(body.result.isError, true)
    assert.match(body.result.content[0].text, /llms\.txt/)
  } finally {
    console.error = originalError
  }
})

test('unknown methods and tools return JSON-RPC errors', async () => {
  const unknownMethod = await (await post(rpc(10, 'resources/list'))).json()
  assert.equal(unknownMethod.error.code, JSON_RPC_ERRORS.METHOD_NOT_FOUND)

  const unknownTool = await (
    await post(rpc(11, 'tools/call', { name: 'signoz_list_alerts', arguments: {} }))
  ).json()
  assert.equal(unknownTool.error.code, JSON_RPC_ERRORS.INVALID_PARAMS)
})

test('malformed, oversized, and version-mismatched requests are rejected', async () => {
  const parse = await post('{not json')
  assert.equal(parse.status, 400)
  assert.equal((await parse.json()).error.code, JSON_RPC_ERRORS.PARSE_ERROR)

  const invalid = await (await post({ id: 1, method: 'ping' })).json()
  assert.equal(invalid.error.code, JSON_RPC_ERRORS.INVALID_REQUEST)

  const tooLarge = await post(
    rpc(1, 'tools/call', {
      name: 'signoz_search_docs',
      arguments: { searchText: 'x'.repeat(MAX_REQUEST_BYTES) },
    })
  )
  assert.equal(tooLarge.status, 413)

  const badVersion = await post(rpc(1, 'ping'), makeDeps(), {
    'MCP-Protocol-Version': '1999-01-01',
  })
  assert.equal(badVersion.status, 400)
})

test('batches return one response per request and skip notifications', async () => {
  const body = await (
    await post([
      rpc(1, 'ping'),
      { jsonrpc: '2.0', method: 'notifications/initialized' },
      rpc(2, 'ping'),
    ])
  ).json()
  assert.deepEqual(
    body.map((entry) => entry.id),
    [1, 2]
  )
})

test('client responses get no reply', async () => {
  assert.equal(await handleDocsMcpMessage({ jsonrpc: '2.0', id: 1, result: {} }, makeDeps()), null)
})

test('GET and DELETE are not allowed; OPTIONS answers CORS preflight', () => {
  const notAllowed = docsMcpMethodNotAllowed()
  assert.equal(notAllowed.status, 405)
  assert.equal(notAllowed.headers.get('allow'), 'POST, OPTIONS')

  const preflight = docsMcpPreflight()
  assert.equal(preflight.status, 204)
  assert.match(preflight.headers.get('access-control-allow-headers'), /MCP-Protocol-Version/)
  assert.match(preflight.headers.get('access-control-allow-methods'), /POST/)
})

test('mapDocsSearchHits keeps docs pages only, one result per page', () => {
  const results = mapDocsSearchHits(
    [
      {
        url: 'https://signoz.io/docs/logs-management/send-logs/#kubernetes',
        hierarchy: { lvl0: 'Logs', lvl1: 'Send Logs', lvl2: 'Kubernetes' },
        _snippetResult: { content: { value: 'Collect <em>pod</em> logs' } },
      },
      {
        url: 'https://signoz.io/docs/logs-management/send-logs/#docker',
        hierarchy: { lvl0: 'Logs', lvl1: 'Send Logs', lvl2: 'Docker' },
      },
      { url: 'https://signoz.io/blog/some-post/', hierarchy: { lvl1: 'Blog post' } },
      {
        url: 'https://signoz.io/docs/install/',
        hierarchy: { lvl0: 'Setup', lvl1: 'Install' },
        content: 'Install SigNoz',
      },
    ],
    10
  )
  assert.deepEqual(results, [
    {
      title: 'Send Logs',
      section: 'Kubernetes',
      url: 'https://signoz.io/docs/logs-management/send-logs/#kubernetes',
      markdownUrl: 'https://signoz.io/docs/logs-management/send-logs.md',
      snippet: 'Collect pod logs',
    },
    {
      title: 'Install',
      url: 'https://signoz.io/docs/install/',
      markdownUrl: 'https://signoz.io/docs/install.md',
      snippet: 'Install SigNoz',
    },
  ])
})

test('searchDocsWithAlgolia queries Algolia with the site search config', async () => {
  const originalFetch = global.fetch
  const originalEnv = { ...process.env }
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID = 'APPID'
  process.env.ALGOLIA_SEARCH_API_KEY = 'server-key'
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME = 'docs index'

  let captured
  global.fetch = async (url, init) => {
    captured = { url, init }
    return new Response(
      JSON.stringify({
        hits: [{ url: 'https://signoz.io/docs/install/', hierarchy: { lvl1: 'Install' } }],
      }),
      { status: 200 }
    )
  }

  try {
    const results = await searchDocsWithAlgolia('install', 3)
    assert.equal(captured.url, 'https://APPID-dsn.algolia.net/1/indexes/docs%20index/query')
    assert.equal(captured.init.headers['X-Algolia-API-Key'], 'server-key')
    const body = JSON.parse(captured.init.body)
    assert.equal(body.query, 'install')
    assert.equal(body.hitsPerPage, 12)
    assert.equal(results[0].markdownUrl, 'https://signoz.io/docs/install.md')
  } finally {
    global.fetch = originalFetch
    process.env = originalEnv
  }
})

test('searchDocsWithAlgolia fails clearly when search is not configured', async () => {
  const originalEnv = { ...process.env }
  delete process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  try {
    await assert.rejects(() => searchDocsWithAlgolia('install', 3), /not configured/)
  } finally {
    process.env = originalEnv
  }
})
