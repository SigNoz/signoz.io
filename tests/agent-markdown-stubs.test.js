const test = require('node:test')
const assert = require('node:assert/strict')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildAgentMdxComponentsForDoc } = loadTsModule('utils/docs/agentMarkdownStubs.ts')

const createDoc = (raw) => ({
  slug: 'monitor-http-endpoints',
  title: 'Monitor HTTP Endpoints',
  body: {
    raw,
  },
})

test('unknown component stubs preserve titles when children are rendered', async () => {
  const doc = createDoc(
    '<KeyPointCallout title="Using self-hosted SigNoz?">Most steps are identical.</KeyPointCallout>'
  )
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(
      components.KeyPointCallout,
      { title: 'Using self-hosted SigNoz?' },
      React.createElement('p', null, 'Most steps are identical.')
    )
  )

  assert.match(html, /Using self-hosted SigNoz\?/)
  assert.match(html, /Most steps are identical\./)
})

test('Admonition stubs preserve the admonition type label', async () => {
  const doc = createDoc('<Admonition type="warning">Keep existing receivers.</Admonition>')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(
      components.Admonition,
      { type: 'warning' },
      React.createElement('p', null, 'Keep existing receivers.')
    )
  )

  assert.match(html, /Warning/)
  assert.match(html, /Keep existing receivers\./)
})

test('Listicle stubs respect the selected default section', async () => {
  const doc = createDoc('<Listicle name="collection-agents" defaultSection="kubernetes" />')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.Listicle, {
      name: 'collection-agents',
      defaultSection: 'kubernetes',
    })
  )

  assert.match(html, /Collection Agents/)
  assert.match(html, /K8s-Infra \(Helm Chart\)/)
  assert.match(html, /OpenTelemetry Operator/)
  assert.match(html, /K8s Serverless \(EKS Fargate\)/)
  assert.doesNotMatch(html, /Docker Swarm/)
  assert.doesNotMatch(html, /ECS Serverless \(Sidecar\)/)
  assert.doesNotMatch(html, /OpenTelemetry Binary/)
})

test('Listicle stubs render flat listicle items from JSON', async () => {
  const doc = createDoc('<Listicle name="llm-monitoring" />')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.Listicle, {
      name: 'llm-monitoring',
    })
  )

  assert.match(html, /LLM Monitoring Guides/)
  assert.match(html, /Amazon Bedrock/)
  assert.match(html, /Anthropic API/)
  assert.match(html, /\/docs\/amazon-bedrock-monitoring/)
})

test('Listicle stubs render metrics quick start sections from JSON', async () => {
  const doc = createDoc('<Listicle name="metrics-quick-start" defaultSection="databases" />')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.Listicle, {
      name: 'metrics-quick-start',
      defaultSection: 'databases',
    })
  )

  assert.match(html, /Metrics Quick Start/)
  assert.match(html, /ClickHouse/)
  assert.match(html, /PostgreSQL/)
  assert.doesNotMatch(html, /OTel Receivers/)
})

test('Listicle stubs use the configured markdown title', async () => {
  const doc = createDoc('<Listicle name="aws-monitoring" />')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.Listicle, {
      name: 'aws-monitoring',
    })
  )

  assert.match(html, /AWS Monitoring Guides/)
  assert.doesNotMatch(html, /<h2>Listicle<\/h2>/)
})

test('HostingDecision stub matches the banner CTA destinations', async () => {
  const doc = createDoc('<HostingDecision />')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(React.createElement(components.HostingDecision))

  assert.match(html, /Compare Self Host vs Cloud/)
  assert.match(html, /\/blog\/cloud-vs-self-hosted-deployment-guide\//)
  assert.match(html, /Get Started - Free/)
  assert.match(html, /\/teams\//)
  assert.doesNotMatch(html, /\/docs\/cloud\//)
  assert.doesNotMatch(html, /\/docs\/install\//)
})

test('RegionTable stub renders the region rows, not a pointer to the rendered page', async () => {
  const doc = createDoc('<RegionTable />')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(React.createElement(components.RegionTable))

  // Every region and its ingestion host must be readable without a browser.
  for (const region of ['us', 'eu', 'in']) {
    assert.match(html, new RegExp(`https://ingest\\.${region}\\.signoz\\.cloud`))
  }
  assert.match(html, /asia-south1/)
  assert.match(html, /Ingestion Endpoint/)
  assert.doesNotMatch(html, /Component: RegionTable/)
  // The old stub pointed at data the HTML did not contain either.
  assert.doesNotMatch(html, /available in the rendered docs/)
})

test('DashboardActions stub renders both schema versions with their URLs', async () => {
  const v2Url =
    'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/agno/agno-dashboard.json'
  const v1Url =
    'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/agno/v1/agno-dashboard.json'
  const doc = createDoc(
    `<DashboardActions dashboardJsonV2Url="${v2Url}" dashboardJsonV1Url="${v1Url}" />`
  )
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.DashboardActions, {
      dashboardJsonV2Url: v2Url,
      dashboardJsonV1Url: v1Url,
    })
  )

  assert.match(html, /V2 dashboard JSON \(recommended, requires SigNoz v0\.135\.0 or newer\)/)
  assert.match(html, /V1 dashboard JSON \(deprecated, only for SigNoz older than v0\.135\.0\)/)
  assert.match(html, /agno\/agno-dashboard\.json/)
  assert.match(html, /agno\/v1\/agno-dashboard\.json/)
  assert.match(html, /New dashboard → Import JSON/)
  assert.doesNotMatch(html, /Component: DashboardActions/)
})

test('DashboardActions stub omits V1 when a dashboard is V2 only', async () => {
  const v2Url =
    'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/openai/openai-dashboard.json'
  const doc = createDoc(`<DashboardActions dashboardJsonV2Url="${v2Url}" />`)
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.DashboardActions, { dashboardJsonV2Url: v2Url })
  )

  assert.match(html, /V2 dashboard JSON/)
  assert.doesNotMatch(html, /V1 dashboard JSON/)
})

test('DashboardActions stub still handles the legacy dashboardJsonUrl prop', async () => {
  const url = 'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json'
  const doc = createDoc(`<DashboardActions dashboardJsonUrl="${url}" dashboardName="NGINX" />`)
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.DashboardActions, {
      dashboardJsonUrl: url,
      dashboardName: 'NGINX',
    })
  )

  assert.match(html, /V2 dashboard JSON/)
  assert.match(html, /nginx\/nginx\.json/)
})

test('MCPInstallButton stub renders child text with client context', async () => {
  const doc = createDoc('<MCPInstallButton client="cursor">Add to Cursor</MCPInstallButton>')
  const components = await buildAgentMdxComponentsForDoc(doc)
  const html = renderToStaticMarkup(
    React.createElement(components.MCPInstallButton, { client: 'cursor' }, 'Add to Cursor')
  )

  assert.match(html, /Add to Cursor/)
  assert.match(html, /Add to Cursor \(US\)/)
  assert.match(html, /cursor:\/\/anysphere\.cursor-deeplink\/mcp\/install/)
})
