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

// Sectioned exports intentionally reuse some hrefs across sibling sections
// (for example, one doc can represent the AWS and Azure variants of the same
// integration path). Validate uniqueness within each leaf array instead of the
// flattened getAll*() results so we still catch accidental duplicates where
// editors actually add items.
const SECTIONED_EXPORTS = [
  'SELF_HOST_INSTALLATION_ITEMS',
  'COLLECTION_AGENTS_ITEMS',
  'APM_INSTRUMENTATION_ITEMS',
  'JAVA_INSTRUMENTATION_ITEMS',
  'JAVASCRIPT_INSTRUMENTATION_ITEMS',
  'LOGS_INSTRUMENTATION_ITEMS',
  'INTEGRATIONS_ITEMS',
  'CICD_MONITORING_ITEMS',
  'AWS_MONITORING_ITEMS',
  'AWS_ONE_CLICK_ITEMS',
  'METRICS_QUICK_START_ITEMS',
]

const assertNoDuplicateHrefs = (items, name) => {
  const hrefs = items.map((item) => item.href)
  const uniqueHrefs = new Set(hrefs)

  assert.equal(
    hrefs.length,
    uniqueHrefs.size,
    `${name} has duplicate hrefs: ${hrefs.filter((h, i) => hrefs.indexOf(h) !== i).join(', ')}`
  )
}

const walkLeafArrays = (value, path = []) => {
  if (Array.isArray(value)) {
    return [{ path, items: value }]
  }

  if (!value || typeof value !== 'object') {
    return []
  }

  return Object.entries(value).flatMap(([key, nestedValue]) =>
    walkLeafArrays(nestedValue, [...path, key])
  )
}

const isValidHref = (href) =>
  typeof href === 'string' && (href.startsWith('/') || href.startsWith('https://'))

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
        isValidHref(item.href),
        `${name}[${i}].href should start with / or https://, got: ${JSON.stringify(item.href)}`
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
    assertNoDuplicateHrefs(componentItems[name], name)
  }
})

test('no duplicate hrefs within each section leaf array', () => {
  for (const name of SECTIONED_EXPORTS) {
    const leafArrays = walkLeafArrays(componentItems[name], [name])

    assert.ok(leafArrays.length > 0, `${name} should contain at least one leaf array`)

    for (const { path, items } of leafArrays) {
      assertNoDuplicateHrefs(items, path.join('.'))
    }
  }
})
