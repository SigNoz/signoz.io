const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  PRODUCT_SITEMAP_ROUTES,
  CORPORATE_SITEMAP_ROUTES,
  ALTERNATIVES_SITEMAP_ROUTES,
  routeLabel,
  routeUrl,
  buildRoutesSitemapMarkdown,
  buildCmsContentSitemapMarkdown,
} = loadTsModule('utils/sitemapRoutes.ts')

test('routeLabel derives readable labels with brand casing', () => {
  assert.equal(routeLabel(''), 'Home')
  assert.equal(routeLabel('llm-observability'), 'LLM Observability')
  assert.equal(routeLabel('why-signoz'), 'Why SigNoz')
  assert.equal(routeLabel('external-apis'), 'External APIs')
  assert.equal(routeLabel('newrelic-alternative'), 'New Relic Alternative')
  assert.equal(routeLabel('terms-of-service'), 'Terms of Service')
  assert.equal(
    routeLabel('product-comparison/migrate-from-datadog'),
    'Product Comparison / Migrate from Datadog'
  )
  assert.equal(
    routeLabel('product-comparison/signoz-vs-dynatrace'),
    'Product Comparison / SigNoz vs Dynatrace'
  )
})

test('routeUrl appends a trailing slash and maps the empty route to the site root', () => {
  assert.equal(routeUrl(''), 'https://signoz.io/')
  assert.equal(routeUrl('pricing'), 'https://signoz.io/pricing/')
  assert.equal(
    routeUrl('pricing/metrics-cost-estimation'),
    'https://signoz.io/pricing/metrics-cost-estimation/'
  )
})

test('buildRoutesSitemapMarkdown lists every route as a markdown link', () => {
  const markdown = buildRoutesSitemapMarkdown(
    'SigNoz Product Pages Sitemap',
    PRODUCT_SITEMAP_ROUTES
  )

  assert.equal(markdown.startsWith('# SigNoz Product Pages Sitemap'), true)
  const links = markdown.match(/^- \[[^\]]+\]\(https:\/\/signoz\.io\/[^)]*\/\)$/gm) || []
  assert.equal(links.length, PRODUCT_SITEMAP_ROUTES.length)
  assert.equal(markdown.includes('- [Pricing](https://signoz.io/pricing/)'), true)
})

test('buildCmsContentSitemapMarkdown groups sections and filters excluded blogs', () => {
  const markdown = buildCmsContentSitemapMarkdown({
    blogs: {
      data: [
        { title: 'Kept post', path: '/kept-post' },
        { title: 'Hidden post', path: '/hidden-post', excludeFromSitemap: true },
      ],
    },
    guides: { data: [{ title: 'A guide', path: '/a-guide' }] },
    faqs: undefined,
    caseStudies: { data: [] },
    opentelemetries: { data: [{ title: 'OTel article', path: '/otel-article' }] },
    comparisons: { data: [{ title: 'X vs Y', path: '/x-vs-y' }] },
  })

  assert.equal(markdown.startsWith('# SigNoz Blog & Content Sitemap'), true)
  ;[
    '## Blog',
    '## Guides',
    '## FAQs',
    '## Case Studies',
    '## OpenTelemetry',
    '## Comparisons',
  ].forEach((heading) => assert.equal(markdown.includes(heading), true, `missing ${heading}`))

  assert.equal(markdown.includes('- [Kept post](https://signoz.io/blog/kept-post/)'), true)
  assert.equal(markdown.includes('Hidden post'), false)
  assert.equal(markdown.includes('- [A guide](https://signoz.io/guides/a-guide/)'), true)
  assert.equal(
    markdown.includes('- [OTel article](https://signoz.io/opentelemetry/otel-article/)'),
    true
  )
  assert.equal(markdown.includes('- [X vs Y](https://signoz.io/comparisons/x-vs-y/)'), true)

  // Section index links survive even when a collection is missing or empty.
  assert.equal(markdown.includes('- [FAQs](https://signoz.io/faqs/)'), true)
  assert.equal(markdown.includes('- [Case Studies](https://signoz.io/customers/)'), true)
})

test('sitemap route constants stay non-empty and slash-free at the edges', () => {
  ;[PRODUCT_SITEMAP_ROUTES, ALTERNATIVES_SITEMAP_ROUTES].forEach((routes) => {
    assert.equal(routes.length > 0, true)
    routes.forEach((route) => {
      assert.equal(route.startsWith('/'), false, route)
      assert.equal(route.endsWith('/'), false, route)
    })
  })
  assert.equal(
    CORPORATE_SITEMAP_ROUTES.includes(''),
    true,
    'corporate sitemap covers the home page'
  )
})
