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
  const components = buildAgentMdxComponentsForDoc(doc, [])
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
  const components = buildAgentMdxComponentsForDoc(doc, [])
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

test('CollectionAgentsListicle stubs respect the selected platform', async () => {
  const doc = createDoc('<CollectionAgentsListicle platform="kubernetes" />')
  const components = buildAgentMdxComponentsForDoc(doc, [])
  const html = renderToStaticMarkup(
    React.createElement(components.CollectionAgentsListicle, {
      platform: 'kubernetes',
    })
  )

  assert.match(html, /K8s-Infra \(Helm Chart\)/)
  assert.match(html, /OpenTelemetry Operator/)
  assert.doesNotMatch(html, /Docker Swarm/)
  assert.doesNotMatch(html, /ECS Serverless \(Sidecar\)/)
  assert.doesNotMatch(html, /OpenTelemetry Binary/)
})

test('HostingDecision stub matches the banner CTA destinations', async () => {
  const doc = createDoc('<HostingDecision />')
  const components = buildAgentMdxComponentsForDoc(doc, [])
  const html = renderToStaticMarkup(React.createElement(components.HostingDecision))

  assert.match(html, /Compare Self Host vs Cloud/)
  assert.match(html, /\/blog\/cloud-vs-self-hosted-deployment-guide\//)
  assert.match(html, /Get Started - Free/)
  assert.match(html, /\/teams\//)
  assert.doesNotMatch(html, /\/docs\/cloud\//)
  assert.doesNotMatch(html, /\/docs\/install\//)
})
