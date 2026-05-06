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
