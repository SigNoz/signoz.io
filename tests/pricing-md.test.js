const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { GET } = loadTsModule('app/(site)/pricing.md/route.ts')
const { METRICS_PRICES, TRACES_AND_LOGS_PRICES, PLAN_PRICING } =
  loadTsModule('constants/pricing.ts')

let cachedBody

const getBody = async () => {
  if (!cachedBody) {
    const response = await GET(new Request('https://signoz.io/pricing.md'))
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /^text\/markdown/)
    assert.equal(response.headers.get('vary'), 'Accept')
    cachedBody = await response.text()
  }
  return cachedBody
}

test('pricing.md leads with a title and usage-based summary', async () => {
  const body = await getBody()

  assert.match(body, /^# SigNoz Pricing\n/)
  assert.match(body, /^> .*usage-based/m)
})

test('pricing.md documents all three plan tiers', async () => {
  const body = await getBody()

  assert.match(body, /Community Edition/)
  assert.match(body, /Teams/)
  assert.match(body, /Enterprise/)
  assert.match(body, new RegExp(`\\$${PLAN_PRICING.TEAMS_MONTHLY_MINIMUM}/month`))
  assert.match(
    body,
    new RegExp(`\\$${PLAN_PRICING.ENTERPRISE_MONTHLY_MINIMUM.toLocaleString('en-US')}/month`)
  )
})

test('pricing.md lists every retention tier and its rate', async () => {
  const body = await getBody()

  Object.entries(TRACES_AND_LOGS_PRICES).forEach(([days, price]) => {
    const label = days === '365' ? '1 year' : `${days} days`
    assert.match(
      body,
      new RegExp(`\\| ${label} \\| \\$${price}`),
      `missing logs/traces tier ${label}`
    )
  })

  Object.entries(METRICS_PRICES).forEach(([months, price]) => {
    const label = `${months} month${Number(months) > 1 ? 's' : ''}`
    assert.match(body, new RegExp(`\\| ${label} \\| \\$${price}`), `missing metrics tier ${label}`)
  })
})

test('pricing.md explains what usage is billed on', async () => {
  const body = await getBody()

  assert.match(body, /per GB ingested|Volume ingested/)
  assert.match(body, /million samples/)
  assert.match(body, /cardinality/i)
})

test('pricing.md includes a plan feature breakdown', async () => {
  const body = await getBody()

  assert.match(body, /## Feature Availability/)
  assert.match(body, /\| Feature \| Community \(self-hosted\) \| Teams \(Cloud\) \| Enterprise \|/)
  assert.match(body, /SOC 2 Type II/)
})

test('pricing.md markdown links are absolute and parseable', async () => {
  const body = await getBody()
  const links = [...body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1])

  assert.equal(links.length > 0, true)
  links.forEach((url) => {
    assert.match(url, /^https:\/\//, `link is not absolute: ${url}`)
  })
})
