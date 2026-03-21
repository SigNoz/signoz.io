const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { getLlmStarterLinks } = loadTsModule('utils/docs/agentDiscovery.ts')

test('getLlmStarterLinks includes LLM, AWS, and GCP landing routes', async () => {
  const starters = getLlmStarterLinks()
  const routes = starters.map((item) => item.route)

  assert.equal(routes.includes('/docs/llm-observability'), true)
  assert.equal(routes.includes('/docs/aws-monitoring/overview'), true)
  assert.equal(routes.includes('/docs/gcp-monitoring'), true)
})

test('getLlmStarterLinks includes migration landing pages', async () => {
  const starters = getLlmStarterLinks()
  const routes = starters.map((item) => item.route)

  assert.equal(routes.includes('/docs/migration/migrate-to-signoz'), true)
  assert.equal(routes.includes('/docs/migration/migrate-from-datadog-to-signoz'), true)
  assert.equal(routes.includes('/docs/migration/migrate-from-grafana-to-signoz'), true)
  assert.equal(routes.includes('/docs/migration/migrate-from-elk-to-signoz'), true)
  assert.equal(routes.includes('/docs/migration/migrate-from-newrelic-to-signoz'), true)
  assert.equal(routes.includes('/docs/migration/migrate-from-honeycomb-to-signoz'), true)
  assert.equal(routes.includes('/docs/migration/migrate-from-opentelemetry-to-signoz'), true)
  assert.equal(
    routes.includes('/docs/migration/migrate-from-signoz-self-host-to-signoz-cloud'),
    true
  )
})

test('getLlmStarterLinks orders setup before LLM/AWS/GCP and migration routes', async () => {
  const starters = getLlmStarterLinks()
  const routes = starters.map((item) => item.route)

  const setupIndex = routes.indexOf('/docs/opentelemetry-collection-agents/get-started')
  const llmIndex = routes.indexOf('/docs/llm-observability')
  const awsIndex = routes.indexOf('/docs/aws-monitoring/overview')
  const gcpIndex = routes.indexOf('/docs/gcp-monitoring')
  const migrationIndex = routes.indexOf('/docs/migration/migrate-to-signoz')

  assert.notEqual(setupIndex, -1)
  assert.notEqual(llmIndex, -1)
  assert.notEqual(awsIndex, -1)
  assert.notEqual(gcpIndex, -1)
  assert.notEqual(migrationIndex, -1)
  assert.equal(setupIndex < llmIndex, true)
  assert.equal(setupIndex < awsIndex, true)
  assert.equal(setupIndex < gcpIndex, true)
  assert.equal(llmIndex < migrationIndex, true)
  assert.equal(awsIndex < migrationIndex, true)
  assert.equal(gcpIndex < migrationIndex, true)
})

test('getLlmStarterLinks is unique and respects default max size', async () => {
  const starters = getLlmStarterLinks()
  const routes = starters.map((item) => item.route)
  const uniqueRoutes = new Set(routes)

  assert.equal(uniqueRoutes.size, routes.length)
  assert.equal(starters.length <= 24, true)
})
