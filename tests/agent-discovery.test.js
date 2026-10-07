const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { getLlmStarterLinks, INTRO_DESCRIPTION } = loadTsModule('utils/docs/agentDiscovery.ts')

test('getLlmStarterLinks includes LLM, AWS, and GCP landing routes', async () => {
  const starters = await getLlmStarterLinks()
  const routes = starters.map((item) => item.route)

  assert.equal(routes.includes('/docs/llm-observability'), true)
  assert.equal(routes.includes('/docs/aws-monitoring/overview'), true)
  assert.equal(routes.includes('/docs/gcp-monitoring'), true)
})

test('getLlmStarterLinks includes migration landing pages', async () => {
  const starters = await getLlmStarterLinks()
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
  const starters = await getLlmStarterLinks()
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

test('getLlmStarterLinks attaches metadata descriptions to every starter', async () => {
  const starters = await getLlmStarterLinks()

  assert.equal(starters.length > 0, true)
  starters.forEach((item) => {
    assert.equal(typeof item.label === 'string' && item.label.length > 0, true)
    assert.match(item.route, /^\/docs\//)
    assert.equal(
      typeof item.description === 'string' && item.description.trim().length > 0,
      true,
      `starter ${item.route} is missing a description`
    )
    assert.equal(/\r|\n/.test(item.description), false)
  })
})

test('getLlmStarterLinks uses the introduction meta description for the docs root', async () => {
  const starters = await getLlmStarterLinks()
  const intro = starters.find((item) => item.route === '/docs/introduction')

  assert.notEqual(intro, undefined)
  assert.equal(intro.description, INTRO_DESCRIPTION)
  assert.match(INTRO_DESCRIPTION, /^Learn about SigNoz, an open-source observability platform/)
})

test('getLlmStarterLinks is unique and respects default max size', async () => {
  const starters = await getLlmStarterLinks()
  const routes = starters.map((item) => item.route)
  const uniqueRoutes = new Set(routes)

  assert.equal(uniqueRoutes.size, routes.length)
  // Raised from 24 when the access-control matchers were added, so the new
  // entries cannot evict existing starter docs from the cap.
  assert.equal(starters.length <= 30, true)
})
