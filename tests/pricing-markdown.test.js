const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildPricingMarkdown } = loadTsModule('utils/pricing/buildPricingMarkdown.ts')
const {
  TRACES_AND_LOGS_PRICES,
  METRICS_PRICES,
  TEAMS_BASE_PRICE_USD,
  ENTERPRISE_FLOOR_USD,
  STARTUP_PRICE_USD,
} = loadTsModule('constants/pricing.ts')

const SITE_URL = 'https://signoz.io'
const markdown = buildPricingMarkdown(SITE_URL)

test('pricing markdown lists every traces/logs retention tier from the calculator constants', () => {
  for (const [days, price] of Object.entries(TRACES_AND_LOGS_PRICES)) {
    const label = Number(days) === 365 ? '1 year' : `${days} days`
    const expected = `| ${label} | $${Number(price).toFixed(2)} |`
    assert.ok(
      markdown.includes(expected),
      `expected traces/logs row for ${label} at $${price}, got:\n${markdown}`
    )
  }
})

test('pricing markdown lists every metrics retention tier from the calculator constants', () => {
  for (const [months, price] of Object.entries(METRICS_PRICES)) {
    const label = `${months} month${Number(months) > 1 ? 's' : ''}`
    const expected = `| ${label} | $${Number(price).toFixed(2)} |`
    assert.ok(
      markdown.includes(expected),
      `expected metrics row for ${label} at $${price}, got:\n${markdown}`
    )
  }
})

test('pricing markdown has no more rate rows than the constants define', () => {
  const tableRowCount = (markdown.match(/^\| (?:\d+ days|1 year|\d+ months?) \| \$/gm) || []).length
  const expected = Object.keys(TRACES_AND_LOGS_PRICES).length + Object.keys(METRICS_PRICES).length
  assert.equal(tableRowCount, expected)
})

test('pricing markdown states the plan prices', () => {
  assert.match(markdown, new RegExp(`from \\$${TEAMS_BASE_PRICE_USD}/month`))
  assert.match(markdown, new RegExp(`from \\$${ENTERPRISE_FLOOR_USD}/month`))
  assert.match(markdown, new RegExp(`\\$${STARTUP_PRICE_USD}/month`))
})

test('pricing markdown covers the plan and policy sections agents ask about', () => {
  assert.match(markdown, /^# SigNoz Pricing$/m)
  assert.match(markdown, /^## Plans$/m)
  assert.match(markdown, /^## Ingestion rates$/m)
  assert.match(markdown, /^## Teams plan$/m)
  assert.match(markdown, /^## Enterprise plan$/m)
  assert.match(markdown, /^## Startup program$/m)
  assert.match(markdown, /^## How metrics samples are counted$/m)
  // The differentiators agents most often get wrong.
  assert.match(markdown, /no per-user pricing/i)
  assert.match(markdown, /no surcharge for custom metrics/i)
})

test('pricing markdown references llms.txt with an absolute URL', () => {
  assert.match(markdown, new RegExp(`Agent guide: ${SITE_URL}/llms\\.txt`))
})

test('pricing markdown builds absolute URLs from the passed site URL', () => {
  assert.match(markdown, new RegExp(`${SITE_URL}/pricing/`))
  assert.match(markdown, new RegExp(`${SITE_URL}/startups/`))
  // No site-relative links that would break when pasted into an agent context.
  assert.doesNotMatch(markdown, /\]\(\/(?!\/)/)
})

test('pricing markdown derives included usage from the cheapest tier', () => {
  const cheapestGbPrice = Math.min(...Object.values(TRACES_AND_LOGS_PRICES))
  const expectedGb = Math.floor(TEAMS_BASE_PRICE_USD / cheapestGbPrice)
  assert.match(markdown, new RegExp(`${expectedGb} GB of logs/traces`))
})
