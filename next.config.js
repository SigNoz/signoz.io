const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app https://www.googletagmanager.com https://js.hsforms.net https://f.vimeocdn.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src * blob: data:;
  media-src *;
  connect-src *;
  font-src * 'self';
  frame-src * giscus.app youtube.com
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    trailingSlash: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
        {
          protocol: 'https',
          hostname: 'signoz.io',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
      ],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    async redirects() {
      return [
        {
          source: '/docs',
          destination: '/docs/introduction',
          permanent: true,
        },
        {
          source: '/comparisons/signoz-vs-datadog/',
          destination: '/product-comparison/signoz-vs-datadog/',
          permanent: true,
        },
        {
          source: '/comparisons/signoz-vs-newrelic/',
          destination: '/product-comparison/signoz-vs-newrelic/',
          permanent: true,
        },
        {
          source: '/comparisons/signoz-vs-grafana/',
          destination: '/product-comparison/signoz-vs-grafana/',
          permanent: true,
        },
        {
          source: '/comparisons/signoz-vs-dynatrace/',
          destination: '/product-comparison/signoz-vs-dynatrace/',
          permanent: true,
        },
        {
          source: '/blog/tags/',
          destination: '/tags/',
          permanent: true,
        },
        {
          source: '/comparisons/',
          destination: '/resource-center/comparisons/',
          permanent: true,
        },
        {
          source: '/learn/user-stories',
          destination: '/observability-user-stories',
          permanent: true,
        },
        {
          source: '/slack',
          destination:
            'https://join.slack.com/t/signoz-community/shared_invite/zt-2lf7lz2rb-~yiQUjEisGTJm56Hlde4pA',
          basePath: false,
          permanent: true,
        },
        {
          source: '/docs/deployment/docker',
          destination: '/docs/install/docker',
          permanent: true,
        },
        {
          source: '/docs/deployment/docker_swarm',
          destination: '/docs/install/docker-swarm',
          permanent: true,
        },
        {
          source: '/docs/deployment/helm_chart',
          destination: '/docs/install/kubernetes',
          permanent: true,
        },
        {
          source: '/docs/deployment/troubleshooting',
          destination: '/docs/install/troubleshooting',
          permanent: true,
        },
        {
          source: '/docs/installation',
          destination: '/docs/install',
          permanent: true,
        },
        {
          source: '/docs/userguide/metrics-dashboard',
          destination: '/docs/userguide/dashboards',
          permanent: true,
        },
        {
          source: '/docs/operate/upgrade',
          destination: '/docs/operate/migration/upgrade-0.8.0',
          permanent: true,
        },
        {
          source: '/docs/userguide/dashboards/',
          destination: '/docs/userguide/manage-dashboards/',
          permanent: true,
        },
        {
          source: '/distributed-tracing/',
          destination: '/blog/distributed-tracing/',
          permanent: true,
        },
        {
          source: '/blog/signoz-benchmarks/',
          destination: '/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/nodejs/',
          destination: '/docs/instrumentation/javascript/',
          permanent: true,
        },
        {
          source: '/gh',
          destination: 'https://github.com/SigNoz/signoz/',
          basePath: false,
          permanent: true,
        },
        {
          source: '/free-trial/',
          destination: '/teams/',
          permanent: true,
        },
        {
          source: '/opentelemetry-2023/',
          destination: '/blog/opentelemetry-roundup-2023/',
          permanent: true,
        },
        {
          source: '/blog/what-is-cloudwatch-metrics/',
          destination: '/blog/cloudwatch-metrics/',
          permanent: true,
        },
        {
          source: '/docs/operate/sqlite/reset-admin-password/',
          destination: '/docs/operate/query-service/reset-admin-password/',
          permanent: true,
        },
        {
          source: '/blog/',
          destination: '/resource-center/blog/',
          permanent: true,
        },
        {
          source: '/opentelemetry/',
          destination: '/resource-center/opentelemetry/',
          permanent: true,
        },
        {
          source: '/api_reference/',
          destination: '/api-reference/',
          permanent: true,
        },
      ]
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  })
}
