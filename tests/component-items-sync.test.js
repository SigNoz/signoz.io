const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const componentItems = loadTsModule('constants/componentItems.ts')

// Flat arrays that should be non-empty
const FLAT_EXPORTS = [
  'LLM_MONITORING_ITEMS',
  'K8S_INSTALLATION_ITEMS',
  'MARKETPLACE_INSTALLATION_ITEMS',
  'DASHBOARD_TEMPLATES_ITEMS',
  'APM_DASHBOARDS_ITEMS',
  'KUBERNETES_DASHBOARDS_ITEMS',
  'LITELLM_DASHBOARDS_ITEMS',
  'HOST_METRICS_DASHBOARDS_ITEMS',
  'APM_QUICK_START_ITEMS',
  'LOGS_QUICK_START_ITEMS',
  'MIGRATE_TO_SIGNOZ_ITEMS',
  'WEB_VITALS_ITEMS',
  'HOSTING_DECISION_ITEMS',
]

// getAll*() helpers that flatten sectioned data
const GET_ALL_HELPERS = [
  'getAllSelfHostInstallationItems',
  'getAllCollectionAgentsItems',
  'getAllAPMInstrumentationItems',
  'getAllJavaInstrumentationItems',
  'getAllJavascriptInstrumentationItems',
  'getAllLogsInstrumentationItems',
  'getAllIntegrationsItems',
  'getAllCICDMonitoringItems',
  'getAllAWSMonitoringItems',
  'getAllAWSOneClickItems',
  'getAllMetricsQuickStartItems',
]

test('all flat item arrays are non-empty', () => {
  for (const name of FLAT_EXPORTS) {
    const items = componentItems[name]
    assert.ok(Array.isArray(items), `${name} should be an array`)
    assert.ok(items.length > 0, `${name} should not be empty`)
  }
})

test('all getAll*() helpers return non-empty arrays', () => {
  for (const name of GET_ALL_HELPERS) {
    const fn = componentItems[name]
    assert.ok(typeof fn === 'function', `${name} should be a function`)
    const items = fn()
    assert.ok(Array.isArray(items), `${name}() should return an array`)
    assert.ok(items.length > 0, `${name}() should not return empty`)
  }
})

test('all items have valid name, href, and clickName', () => {
  const allArrays = [
    ...FLAT_EXPORTS.map((name) => ({ name, items: componentItems[name] })),
    ...GET_ALL_HELPERS.map((name) => ({ name: `${name}()`, items: componentItems[name]() })),
  ]

  for (const { name, items } of allArrays) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      assert.ok(
        typeof item.name === 'string' && item.name.trim().length > 0,
        `${name}[${i}].name should be a non-empty string, got: ${JSON.stringify(item.name)}`
      )
      assert.ok(
        typeof item.href === 'string' &&
          (item.href.startsWith('/docs/') ||
            item.href.startsWith('https://') ||
            item.href.startsWith('/docs')),
        `${name}[${i}].href should start with /docs/ or https://, got: ${JSON.stringify(item.href)}`
      )
      assert.ok(
        typeof item.clickName === 'string' && item.clickName.trim().length > 0,
        `${name}[${i}].clickName should be a non-empty string, got: ${JSON.stringify(item.clickName)}`
      )
    }
  }
})

test('no duplicate hrefs within each flat array', () => {
  for (const name of FLAT_EXPORTS) {
    const items = componentItems[name]
    const hrefs = items.map((item) => item.href)
    const uniqueHrefs = new Set(hrefs)
    assert.equal(
      hrefs.length,
      uniqueHrefs.size,
      `${name} has duplicate hrefs: ${hrefs.filter((h, i) => hrefs.indexOf(h) !== i).join(', ')}`
    )
  }
})
