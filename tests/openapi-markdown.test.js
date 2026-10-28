const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildApiReferenceMarkdown } = loadTsModule('utils/openapiMarkdown.ts')

const SPEC = {
  version: 'v0.110.0',
  yaml: '',
  document: {
    openapi: '3.0.3',
    info: { title: 'SigNoz', description: 'HTTP API for SigNoz.', version: '0.110.0' },
    servers: [{ url: 'https://{host}:{port}{base_path}', description: 'SigNoz APIServer.' }],
    components: {
      securitySchemes: {
        api_key: { type: 'apiKey', in: 'header', name: 'SigNoz-Api-Key', description: 'API Keys' },
        tokenizer: { type: 'http', scheme: 'bearer' },
      },
    },
    paths: {
      '/api/v1/alerts': {
        get: { operationId: 'GetAlerts', summary: 'Get alerts', tags: ['alerts'] },
        post: { operationId: 'CreateAlert', summary: 'Create an alert', tags: ['alerts'] },
      },
      '/api/v1/logs': {
        get: { operationId: 'GetLogs', description: 'Query logs.', tags: ['logs'] },
      },
      '/api/v1/untagged': {
        get: { operationId: 'GetUntagged', summary: 'No tags here' },
      },
      '/api/v1/export_raw_data': {
        post: {
          operationId: 'ExportRawData',
          summary: 'Export raw data',
          tags: ['logs', 'traces'],
        },
      },
      '/api/v1/ignored': { parameters: [] },
    },
  },
}

const markdown = buildApiReferenceMarkdown(SPEC)

test('the markdown index leads with the spec identity and machine-readable links', () => {
  assert.equal(markdown.split('\n')[0], '# SigNoz API Reference')
  assert.match(markdown, /https:\/\/signoz\.io\/openapi\.json/)
  assert.match(markdown, /https:\/\/signoz\.io\/openapi\.yaml/)
  assert.match(markdown, /Spec release: `v0\.110\.0` \(OpenAPI 3\.0\.3\)/)
})

test('authentication and base URL come from the spec, not hardcoded prose', () => {
  assert.match(markdown, /- `api_key` \(`SigNoz-Api-Key` header\): API Keys/)
  assert.match(markdown, /- `tokenizer` \(HTTP `bearer`\)/)
  assert.match(markdown, /- `https:\/\/\{host\}:\{port\}\{base_path\}`: SigNoz APIServer\./)
})

test('every operation is listed once per tag, with untagged operations grouped', () => {
  assert.match(markdown, /## Endpoints \(5 operations across 5 paths\)/)
  assert.match(markdown, /### alerts\n\n- `GET \/api\/v1\/alerts` \(`GetAlerts`\): Get alerts/)
  assert.match(markdown, /- `POST \/api\/v1\/alerts` \(`CreateAlert`\): Create an alert/)
  assert.match(markdown, /### logs\n\n- `POST \/api\/v1\/export_raw_data`/)
  assert.match(markdown, /- `GET \/api\/v1\/logs` \(`GetLogs`\): Query logs\./)
  assert.match(markdown, /### other\n\n- `GET \/api\/v1\/untagged`/)
})

test('non-operation path members are skipped', () => {
  assert.equal(markdown.includes('/api/v1/ignored'), false)
})

test('tags and operations are sorted so the output is stable', () => {
  const tags = [...markdown.matchAll(/^### (.+)$/gm)].map((match) => match[1])
  assert.deepEqual(tags, ['alerts', 'logs', 'other', 'traces'])
})

const { stampSpecVersion } = loadTsModule('utils/openapiSpec.ts')

test('the empty upstream info.version is stamped with the release tag', () => {
  const stamped = stampSpecVersion({ info: { title: 'SigNoz', version: '' } }, 'v0.110.0')
  assert.equal(stamped.info.version, '0.110.0')
})

test('a spec that already declares a version keeps it', () => {
  const stamped = stampSpecVersion({ info: { version: '2.1.0' } }, 'v0.110.0')
  assert.equal(stamped.info.version, '2.1.0')
})

test('stamping a spec with no info block still produces one', () => {
  const stamped = stampSpecVersion({ paths: {} }, 'v0.110.0')
  assert.equal(stamped.info.version, '0.110.0')
  assert.deepEqual(stamped.paths, {})
})

test('a multi-tagged operation is listed under each tag but counted once', () => {
  // POST /api/v1/export_raw_data is tagged both logs and traces.
  assert.match(markdown, /### logs\n\n- `POST \/api\/v1\/export_raw_data`/)
  assert.match(markdown, /### traces\n\n- `POST \/api\/v1\/export_raw_data`/)
  assert.match(markdown, /## Endpoints \(5 operations across 5 paths\)/)
})

test('per-release specs point at an endpoint that resolves without negotiation', () => {
  assert.match(
    markdown,
    /- Per-release specs: https:\/\/signoz\.io\/api\/api-reference-openapi\/<release> \(a release tag, e\.g\. `v0\.110\.0`, or `latest`\)/
  )
  assert.equal(markdown.includes('/api-reference/<release>/'), false)
})
