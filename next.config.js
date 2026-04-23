const { withContentlayer } = require('next-contentlayer2')
const { getAllowedImageDomains } = require('./constants/allowedImageDomains')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const defaultFrameAncestors =
  "'self' https://signoz.io https://*.us.signoz.cloud https://*.in.signoz.cloud https://*.eu.signoz.cloud"

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app https://www.googletagmanager.com https://js.hsforms.net https://f.vimeocdn.com https://embed.lu.ma https://www.clarity.ms https://*.contentsquare.net http://*.contentsquare.net https://www.chatbase.co https://static.reo.dev https://*.clarity.ms https://snap.licdn.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.lu.ma;
  img-src * blob: data:;
  media-src *;
  connect-src * https://api.reo.dev https://www.clarity.ms https://*.clarity.ms;
  font-src * 'self';
  frame-src * giscus.app youtube.com;
  worker-src 'self' blob:;
  frame-ancestors ${process.env.CSP_FRAME_ANCESTORS || defaultFrameAncestors};
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
    value: 'camera=(), microphone=(), geolocation=(), clipboard-read=*, clipboard-write=*',
  },
]

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    productionBrowserSourceMaps: true, // Enable source maps for debugging
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    trailingSlash: true,
    swcMinify: true,
    images: {
      remotePatterns: getAllowedImageDomains().map((domain) => ({
        protocol: 'https',
        hostname: domain,
      })),
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
          source: '/enterprise-self-hosted/',
          destination: '/contact-us/?source=redirect-enterprise-self-hosted',
          permanent: true,
        },
        {
          source: '/enterprise-cloud/',
          destination: '/contact-us/?source=redirect-enterprise-cloud',
          permanent: true,
        },
        {
          source: '/oss-to-cloud/',
          destination: '/teams/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.113/',
          destination: '/docs/operate/migration/upgrade-0-113/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.113',
          destination: '/docs/operate/migration/upgrade-0-113/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.94/',
          destination: '/docs/operate/migration/upgrade-0-94/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.94',
          destination: '/docs/operate/migration/upgrade-0-94/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.92/',
          destination: '/docs/operate/migration/upgrade-0-92/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.92',
          destination: '/docs/operate/migration/upgrade-0-92/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.88/',
          destination: '/docs/operate/migration/upgrade-0-88/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.88',
          destination: '/docs/operate/migration/upgrade-0-88/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.86/',
          destination: '/docs/operate/migration/upgrade-0-86/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.86',
          destination: '/docs/operate/migration/upgrade-0-86/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.76/',
          destination: '/docs/operate/migration/upgrade-0-76/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.76',
          destination: '/docs/operate/migration/upgrade-0-76/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.70/',
          destination: '/docs/operate/migration/upgrade-0-70/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.70',
          destination: '/docs/operate/migration/upgrade-0-70/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.64/',
          destination: '/docs/operate/migration/upgrade-0-64/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.64',
          destination: '/docs/operate/migration/upgrade-0-64/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.55/',
          destination: '/docs/operate/migration/upgrade-0-55/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.55',
          destination: '/docs/operate/migration/upgrade-0-55/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.51/',
          destination: '/docs/operate/migration/upgrade-0-51/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.51',
          destination: '/docs/operate/migration/upgrade-0-51/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.49/',
          destination: '/docs/operate/migration/upgrade-0-49/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.49',
          destination: '/docs/operate/migration/upgrade-0-49/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.45/',
          destination: '/docs/operate/migration/upgrade-0-45/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.45',
          destination: '/docs/operate/migration/upgrade-0-45/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.38/',
          destination: '/docs/operate/migration/upgrade-0-38/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.38',
          destination: '/docs/operate/migration/upgrade-0-38/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.37/',
          destination: '/docs/operate/migration/upgrade-0-37/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.37',
          destination: '/docs/operate/migration/upgrade-0-37/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.36/',
          destination: '/docs/operate/migration/upgrade-0-36/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.36',
          destination: '/docs/operate/migration/upgrade-0-36/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.27/',
          destination: '/docs/operate/migration/upgrade-0-27/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.27',
          destination: '/docs/operate/migration/upgrade-0-27/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.23/',
          destination: '/docs/operate/migration/upgrade-0-23/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.23',
          destination: '/docs/operate/migration/upgrade-0-23/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.19/',
          destination: '/docs/operate/migration/upgrade-0-19/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.19',
          destination: '/docs/operate/migration/upgrade-0-19/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.12/',
          destination: '/docs/operate/migration/upgrade-0-12/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.12',
          destination: '/docs/operate/migration/upgrade-0-12/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.10/',
          destination: '/docs/operate/migration/upgrade-0-10/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.10',
          destination: '/docs/operate/migration/upgrade-0-10/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.9/',
          destination: '/docs/operate/migration/upgrade-0-9/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.9',
          destination: '/docs/operate/migration/upgrade-0-9/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.8.1/',
          destination: '/docs/operate/migration/upgrade-0-8-1/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.8.1',
          destination: '/docs/operate/migration/upgrade-0-8-1/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.8.0/',
          destination: '/docs/operate/migration/upgrade-0-8-0/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0.8.0',
          destination: '/docs/operate/migration/upgrade-0-8-0/',
          permanent: true,
        },
        {
          source:
            '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/upgrade-k8s-infra-v0.15/',
          destination:
            '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/upgrade-k8s-infra-v0-15/',
          permanent: true,
        },
        {
          source:
            '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/upgrade-k8s-infra-v0.15',
          destination:
            '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/upgrade-k8s-infra-v0-15/',
          permanent: true,
        },
        {
          source: '/feed.xml',
          destination: '/rss',
          permanent: true,
        },
        {
          source: '/docs/signoz-mcp-server/',
          destination: '/docs/ai/signoz-mcp-server/',
          permanent: true,
        },
        {
          source: '/resource-center',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/resource-center/',
          destination: '/blog/',
          permanent: true,
        },
        {
          source: '/resource-center/blog',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/resource-center/blog/',
          destination: '/blog/',
          permanent: true,
        },
        {
          source: '/resource-center/blog/page/:page',
          destination: '/blog/page/:page',
          permanent: true,
        },
        {
          source: '/resource-center/comparisons',
          destination: '/comparisons',
          permanent: true,
        },
        {
          source: '/resource-center/comparisons/',
          destination: '/comparisons/',
          permanent: true,
        },
        {
          source: '/resource-center/comparisons/page/:page',
          destination: '/comparisons/page/:page',
          permanent: true,
        },
        {
          source: '/resource-center/guides',
          destination: '/guides',
          permanent: true,
        },
        {
          source: '/resource-center/guides/',
          destination: '/guides/',
          permanent: true,
        },
        {
          source: '/resource-center/guides/page/:page',
          destination: '/guides/page/:page',
          permanent: true,
        },
        {
          source: '/resource-center/opentelemetry',
          destination: '/opentelemetry',
          permanent: true,
        },
        {
          source: '/resource-center/opentelemetry/',
          destination: '/opentelemetry/',
          permanent: true,
        },
        {
          source: '/resource-center/opentelemetry/page/:page',
          destination: '/opentelemetry/page/:page',
          permanent: true,
        },
        {
          source: '/docs/',
          destination: '/docs/introduction',
          permanent: true,
        },
        {
          source: '/docs/logs-pipelines/guides/severity/',
          destination: '/docs/logs-pipelines/guides/severity-parsing/',
          permanent: true,
        },
        {
          source: '/docs/logs-pipelines/guides/timestamp/',
          destination: '/docs/logs-pipelines/guides/timestamp-parsing/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/php/',
          destination: '/docs/instrumentation/opentelemetry-php/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/laravel/',
          destination: '/docs/instrumentation/opentelemetry-php/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-laravel/',
          destination: '/docs/instrumentation/opentelemetry-php/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-wordpress/',
          destination: '/docs/instrumentation/opentelemetry-php/',
          permanent: true,
        },
        {
          source: '/docs/tutorial/jvm-metrics/',
          destination:
            '/docs/metrics-management/send-metrics/applications/opentelemetry-java/#jvm-runtime-metrics',
          permanent: true,
        },
        {
          source: '/docs/tutorial/jmx-metrics/',
          destination:
            '/docs/metrics-management/send-metrics/applications/opentelemetry-java/jmx-metrics/',
          permanent: true,
        },
        {
          source: '/docs/metrics-management/send-metrics/runtimes/java-metrics/jmx-metrics/',
          destination:
            '/docs/metrics-management/send-metrics/applications/opentelemetry-java/jmx-metrics/',
          permanent: true,
        },
        {
          source: '/docs/migration/opentelemetry-datadog-receiver/',
          destination: '/docs/migration/migrate-from-datadog/opentelemetry-datadog-receiver/',
          permanent: true,
        },
        {
          source: '/security/',
          destination: 'https://trust.signoz.io/',
          permanent: true,
        },
        {
          source: '/docs/alerts-management/notification-channel/',
          destination: '/docs/setup-alerts-notification/',
          permanent: true,
        },
        {
          source: '/docs/integrations/aws/',
          destination: '/docs/integrations/aws/one-click-aws-integrations/',
          permanent: true,
        },
        {
          source: '/docs/mobile-instrumentation/',
          destination: '/docs/mobile-monitoring/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/migrate/',
          destination: '/docs/operate/upgrade/',
          permanent: true,
        },
        {
          source: '/docs/overview/breaking-changes/breaking-changes-0.76/',
          destination: '/changelog/',
          permanent: true,
        },
        {
          source: '/docs/overview/breaking-changes/breaking-changes-0.76',
          destination: '/changelog/',
          permanent: true,
        },
        {
          source: '/docs/overview/whats-new/changelog-0.76/',
          destination: '/changelog/',
          permanent: true,
        },
        {
          source: '/docs/overview/whats-new/changelog-0.76',
          destination: '/changelog/',
          permanent: true,
        },
        {
          source: '/docs/userguide/create-a-custom-query/',
          destination: '/docs/userguide/query-builder-v5/',
          permanent: true,
        },
        {
          source: '/docs/userguide/navigate-user-interface/',
          destination: '/docs/what-is-signoz/',
          permanent: true,
        },
        {
          source: '/docs/userguide/manage-dashboards-and-panels/',
          destination: '/docs/userguide/manage-dashboards/',
          permanent: true,
        },
        {
          source: '/docs/userguide/overview/',
          destination: '/docs/what-is-signoz/',
          permanent: true,
        },
        {
          source: '/comparisons/signoz-vs-datadog/',
          destination: '/datadog-alternative/',
          permanent: true,
        },
        {
          source: '/product-comparison/signoz-vs-datadog/',
          destination: '/datadog-alternative/',
          permanent: true,
        },
        {
          source: '/comparisons/signoz-vs-newrelic/',
          destination: '/newrelic-alternative/',
          permanent: true,
        },
        {
          source: '/product-comparison/signoz-vs-newrelic/',
          destination: '/newrelic-alternative/',
          permanent: true,
        },
        {
          source: '/comparisons/signoz-vs-grafana/',
          destination: '/grafana-alternative/',
          permanent: true,
        },
        {
          source: '/product-comparison/signoz-vs-grafana/',
          destination: '/grafana-alternative/',
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
          source: '/blog/getting-started-with-opentelemetry/',
          destination: '/blog/opentelemetry-demo/',
          permanent: true,
        },
        {
          source: '/blog/opentelemetry-distributed-tracing-part-2/',
          destination: '/blog/opentelemetry-tracing/',
          permanent: true,
        },
        {
          source: '/blog/opentelemetry-distributed-tracing-part-1/',
          destination: '/blog/what-is-distributed-tracing-in-opentelemetry/',
          permanent: true,
        },
        {
          source: '/blog/introduction-to-opentelemetry-metrics/',
          destination: '/blog/opentelemetry-metrics-with-examples/',
          permanent: true,
        },
        {
          source: '/blog/gathering-data-with-opentelemetry-collector/',
          destination: '/blog/opentelemetry-collector-complete-guide/',
          permanent: true,
        },
        {
          source: '/blog/opentelemetry-nodejs/',
          destination: '/opentelemetry/nodejs/',
          permanent: true,
        },
        {
          source: '/blog/opentelemetry-python-auto-and-manual-instrumentation/',
          destination: '/opentelemetry/python/',
          permanent: true,
        },
        {
          source: '/blog/kubernetes-observability-with-opentelemetry/',
          destination: '/blog/opentelemetry-kubernetes/',
          permanent: true,
        },
        {
          source: '/why-opentelemetry/',
          destination: '/opentelemetry/',
          permanent: true,
        },
        {
          source: '/blog/what-is-opentelemetry/',
          destination: '/opentelemetry/',
          permanent: true,
        },
        {
          source: '/learn/user-stories/',
          destination: '/blog/community-update-06/#observability-user-stories',
          permanent: true,
        },
        {
          source: '/slack/',
          destination:
            'https://join.slack.com/t/signoz-community/shared_invite/zt-3uf4h5hpi-qnBT5dBELJIxWFHjRB28Sw',
          basePath: false,
          permanent: true,
        },
        {
          source: '/careers/',
          destination: 'https://jobs.ashbyhq.com/SigNoz',
          basePath: false,
          permanent: true,
        },
        {
          source: '/docs/deployment/docker/',
          destination: '/docs/install/docker',
          permanent: true,
        },
        {
          source: '/docs/deployment/docker_swarm/',
          destination: '/docs/install/docker-swarm',
          permanent: true,
        },
        {
          source: '/docs/deployment/helm_chart/',
          destination: '/docs/install/kubernetes',
          permanent: true,
        },
        {
          source: '/docs/deployment/troubleshooting/',
          destination: '/docs/install/troubleshooting',
          permanent: true,
        },
        {
          source: '/docs/kubernetes/deployment/',
          destination: '/docs/install/kubernetes/',
          permanent: true,
        },
        {
          source: '/docs/installation/',
          destination: '/docs/install',
          permanent: true,
        },
        {
          source: '/docs/install/cloud/',
          destination: '/docs/cloud/',
          permanent: true,
        },
        {
          source: '/docs/userguide/metrics-dashboard/',
          destination: '/docs/userguide/dashboards',
          permanent: true,
        },
        {
          source: '/docs/userguide/apis/',
          destination: '/api-reference/',
          permanent: true,
        },
        {
          source: '/docs/operate/migration',
          destination: '/docs/operate/upgrade',
          permanent: true,
        },
        {
          source: '/docs/operate/',
          destination: '/docs/manage/administrator-guide/',
          permanent: true,
        },
        {
          source: '/docs/operate/kubernetes/',
          destination: '/docs/install/kubernetes/',
          permanent: true,
        },
        {
          source: '/docs/userguide/dashboards/',
          destination: '/docs/userguide/manage-dashboards/',
          permanent: true,
        },
        {
          source: '/docs/userguide/vercel_logs_to_signoz/',
          destination: '/docs/userguide/vercel-to-signoz/',
          permanent: true,
        },
        {
          source: '/blog/signoz-benchmarks/',
          destination: '/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/',
          permanent: true,
        },
        {
          source: '/blog/monitoring-your-go-application-with-signoz/',
          destination: '/blog/golang-monitoring/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/nodejs/',
          destination: '/docs/instrumentation/javascript/',
          permanent: true,
        },
        {
          source: '/gh/',
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
          destination: '/docs/operate/reset-admin-password/',
          permanent: true,
        },
        {
          source: '/blog/open-source-log-management/',
          destination: '/blog/best-open-source-log-management-tools',
          permanent: true,
        },
        {
          source: '/blog/N\\+1-query-distributed-tracing/',
          destination: '/blog/N-1-query-distributed-tracing/',
          permanent: true,
        },
        {
          source: '/observability-user-stories/',
          destination: '/case-study/',
          permanent: true,
        },
        {
          source: '/monitoring-openclaw-with-opentelemetry/',
          destination: '/blog/monitoring-openclaw-with-opentelemetry/',
          permanent: true,
        },
        // Keep /opentelemetry/ as the canonical hub landing instead of redirecting to the Resource Center.
        {
          source: '/opentelemetry/series/nextjs/',
          destination: '/blog/opentelemetry-nextjs/',
          permanent: true,
        },
        {
          source: '/guides/cloudwatch-cost-optimization-part-2/',
          destination: '/guides/cloudwatch-cost-optimization/',
          permanent: true,
        },
        {
          source: '/api_reference/',
          destination: '/api-reference/',
          permanent: true,
        },
        {
          source: '/users/',
          destination: '/workspace-setup/',
          permanent: false,
          has: [
            {
              type: 'query',
              key: 'code',
            },
            {
              type: 'query',
              key: 'email',
            },
          ],
        },
        {
          source: '/docs/instrumentation/angular/',
          destination: '/docs/frontend-monitoring/sending-traces-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/celery/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/django/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/dotnet/',
          destination: '/docs/instrumentation/opentelemetry-dotnet/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/manual-instrumentation/dotnet/manual-instrumentation/',
          destination: '/docs/instrumentation/dotnet/manual-instrumentation/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/elixir/',
          destination: '/docs/instrumentation/opentelemetry-elixir/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/express/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nodejs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/falcon/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/fastapi/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/flask/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/golang/',
          destination: '/docs/instrumentation/opentelemetry-golang/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/hypercorn-unicorn-support/',
          destination: '/docs/instrumentation/opentelemetry-hypercorn-unicorn-support/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/java/',
          destination: '/docs/instrumentation/java/opentelemetry-java/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/javascript/',
          destination: '/docs/instrumentation/opentelemetry-javascript/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-angular/',
          destination: '/docs/frontend-monitoring/sending-traces-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-express/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nodejs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/jboss/',
          destination: '/docs/instrumentation/java/opentelemetry-jboss/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/nestjs/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nodejs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-nestjs/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nodejs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-nodejs/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nodejs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/nextjs/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nextjs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-nextjs/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nextjs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-nuxtjs/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nuxtjs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-reactjs/',
          destination: '/docs/frontend-monitoring/sending-traces-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/react-native/',
          destination: '/docs/instrumentation/javascript/opentelemetry-react-native/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-react-native/',
          destination: '/docs/instrumentation/javascript/opentelemetry-react-native/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/python/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-django/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-flask/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-fastapi/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-falcon/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-celery/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-hypercorn-unicorn-support/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        // Python framework-specific redirects to consolidated page
        {
          source: '/docs/instrumentation/opentelemetry-python/django/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-python/flask/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-python/fastapi/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-python/falcon/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-python/celery/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-python/python/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/ruby/',
          destination: '/docs/instrumentation/opentelemetry-ruby/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/ruby-on-rails/',
          destination: '/docs/instrumentation/opentelemetry-ruby/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-ruby-on-rails/',
          destination: '/docs/instrumentation/opentelemetry-ruby/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/rust/',
          destination: '/docs/instrumentation/opentelemetry-rust/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/springboot/',
          destination: '/docs/instrumentation/java/opentelemetry-java/',
          permanent: true,
        },
        // Java framework-specific redirects to new java/ folder structure
        {
          source: '/docs/instrumentation/opentelemetry-springboot/',
          destination: '/docs/instrumentation/java/opentelemetry-java/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-quarkus/',
          destination: '/docs/instrumentation/java/opentelemetry-quarkus/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-tomcat/',
          destination: '/docs/instrumentation/java/opentelemetry-tomcat/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-jboss/',
          destination: '/docs/instrumentation/java/opentelemetry-jboss/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-java/',
          destination: '/docs/instrumentation/java/opentelemetry-java/',
          permanent: true,
        },
        // Java manual instrumentation redirect
        {
          source: '/docs/instrumentation/manual-instrumentation/java/annotations/',
          destination: '/docs/instrumentation/java/manual-instrumentation/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/swift/',
          destination: '/docs/instrumentation/opentelemetry-swift/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/tomcat/',
          destination: '/docs/instrumentation/java/opentelemetry-tomcat/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/manual-instrumentation/javascript/nodejs/',
          destination: '/docs/instrumentation/javascript/nodejs-manual-instrumentation/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs/',
          destination: '/docs/instrumentation/javascript/nodejs-manual-instrumentation/',
          permanent: true,
        },
        {
          source:
            '/docs/instrumentation/manual-instrumentation/javascript/nodejs-selective-instrumentation/',
          destination: '/docs/instrumentation/javascript/nodejs-selective-instrumentation/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/opentelemetry-javascript/',
          destination: '/docs/instrumentation/javascript/opentelemetry-nodejs/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/mobile-instrumentation/swiftUi/',
          destination: '/docs/instrumentation/mobile-instrumentation/opentelemetry-swiftui/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/mobile-instrumentation/flutter/',
          destination: '/docs/instrumentation/mobile-instrumentation/opentelemetry-flutter/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/mobile-instrumentation/java/',
          destination: '/docs/instrumentation/mobile-instrumentation/opentelemetry-java/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/mobile-instrumentation/kotlin/',
          destination: '/docs/instrumentation/mobile-instrumentation/opentelemetry-kotlin/',
          permanent: true,
        },
        {
          source: '/docs/frontend-monitoring/web-vitals/',
          destination: '/docs/frontend-monitoring/opentelemetry-web-vitals/',
          permanent: true,
        },
        {
          source: '/docs/frontend-monitoring/sending-logs/',
          destination: '/docs/frontend-monitoring/sending-logs-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/docs/frontend-monitoring/sending-metrics/',
          destination: '/docs/frontend-monitoring/sending-metrics-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/docs/frontend-monitoring/sending-traces/',
          destination: '/docs/frontend-monitoring/sending-traces-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/guides/unified-observability/',
          destination: '/unified-observability/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/lambda-logs',
          destination: '/docs/aws-monitoring/lambda/lambda-logs',
          permanent: true,
        },
        // AWS Monitoring renamed/deleted docs
        {
          source: '/docs/aws-monitoring/getting-started/',
          destination: '/docs/aws-monitoring/overview/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/rds-logs/',
          destination: '/docs/aws-monitoring/rds/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/vpc-logs/',
          destination: '/docs/aws-monitoring/vpc/',
          permanent: true,
        },
        {
          source: '/docs/userguide/collecting_nodejs_winston_logs',
          destination: '/docs/logs-management/send-logs/nodejs-winston-logs',
          permanent: true,
        },
        {
          source: '/docs/self-host/install',
          destination: '/docs/install/self-host',
          permanent: true,
        },
        {
          source: '/comparisons/opentelemetry-vs-new-relic/',
          destination: '/comparisons/opentelemetry-vs-newrelic/',
          permanent: true,
        },
        {
          source: '/blog/ten-reasons-not-to-add-observability/',
          destination: '/blog/ten-reasons-not-add-observability/',
          permanent: true,
        },
        {
          source: '/blog/otel-webinar-opamp/',
          destination: '/blog/opentelemetry-webinar-on-opamp/',
          permanent: true,
        },
        {
          source: '/docs/operate/0.75.0/query-service/user-invitation-setup/',
          destination: '/docs/manage/administrator-guide/configuration/smtp-email-invitations/',
          permanent: true,
        },
        {
          source: '/docs/operate/query-service/user-invitation-smtp/',
          destination: '/docs/manage/administrator-guide/configuration/smtp-email-invitations/',
          permanent: true,
        },
        {
          source: '/guides/what-is-opentelemetry/',
          destination: '/blog/what-is-opentelemetry/',
          permanent: true,
        },
        {
          source: '/docs/migration/migrate-to-signoz-cloud/',
          destination: '/docs/migration/migrate-from-signoz-self-host-to-signoz-cloud/',
          permanent: true,
        },
        {
          source: '/docs/migration/migrate-from-datadog/',
          destination: '/docs/migration/migrate-from-datadog-to-signoz/',
          permanent: true,
        },
        {
          source: '/docs/migration/migrate-from-grafana/',
          destination: '/docs/migration/migrate-from-grafana-to-signoz/',
          permanent: true,
        },
        {
          source: '/docs/migration/migrate-from-elk/',
          destination: '/docs/migration/migrate-from-elk-to-signoz/',
          permanent: true,
        },
        {
          source: '/docs/migration/migrate-from-newrelic/',
          destination: '/docs/migration/migrate-from-newrelic-to-signoz/',
          permanent: true,
        },
        {
          source: '/dashboards',
          destination: '/docs/dashboards/dashboard-templates/overview/',
          permanent: true,
        },
        // ECS and EKS folder restructuring redirects
        {
          source: '/docs/ecs-monitoring/',
          destination: '/docs/aws-monitoring/ecs/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/ecs-monitoring-overview/',
          destination: '/docs/aws-monitoring/ecs/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/ecs-ec2-external/',
          destination: '/docs/aws-monitoring/ecs/ecs-ec2-external/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/ecs-fargate/',
          destination: '/docs/aws-monitoring/ecs/ecs-fargate/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/eks-monitoring-overview/',
          destination: '/docs/aws-monitoring/eks/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/eks-fargate/',
          destination: '/docs/aws-monitoring/eks/eks-fargate/',
          permanent: true,
        },
        // EC2 folder restructuring redirects
        {
          source: '/docs/ec2-monitoring/',
          destination: '/docs/aws-monitoring/ec2/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/ec2-logs/',
          destination: '/docs/aws-monitoring/ec2/ec2-logs/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/ec2-infra-metrics/',
          destination: '/docs/aws-monitoring/ec2/ec2-infra-metrics/',
          permanent: true,
        },
        {
          source: '/docs/tutorial/kubernetes-infra-metrics/',
          destination: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/install-k8s-infra/',
          permanent: true,
        },
        {
          source: '/docs/metrics-management/k8s-infra-otel-config/',
          destination: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/configure-k8s-infra/',
          permanent: true,
        },
        {
          source: '/docs/aws-monitoring/elb-logs/',
          destination: '/docs/aws-monitoring/elb/',
          permanent: true,
        },
        {
          source: '/docs/troubleshooting/signoz-cloud/logs-troubleshooting/',
          destination: '/docs/logs-management/troubleshooting/troubleshooting/',
          permanent: true,
        },
        {
          source: '/docs/userguide/logs_troubleshooting/',
          destination: '/docs/logs-management/troubleshooting/troubleshooting/',
          permanent: true,
        },
        {
          source: '/docs/troubleshooting/signoz-cloud/traces-troubleshooting/',
          destination: '/docs/traces-management/troubleshooting/troubleshooting/',
          permanent: true,
        },
        {
          source: '/docs/troubleshooting/signoz-cloud/metrics-troubleshooting/',
          destination: '/docs/metrics-management/troubleshooting/troubleshooting/',
          permanent: true,
        },
        {
          source: '/docs/troubleshooting/signoz-cloud/general-troubleshooting/',
          destination: '/docs/faqs/general/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/troubleshoot-instrumentation/',
          destination: '/docs/traces-management/troubleshooting/troubleshooting/',
          permanent: true,
        },
        {
          source: '/docs/userguide/query-handles-missing-values/',
          destination: '/docs/userguide/query-builder/',
          permanent: true,
        },
        {
          source: '/newsroom/launch-week-1-day-1/',
          destination: '/blog/launch-week-1-day-1/',
          permanent: true,
        },
        {
          source: '/newsroom/launch-week-1-day-2/',
          destination: '/blog/launch-week-1-day-2/',
          permanent: true,
        },
        {
          source: '/newsroom/launch-week-1-day-3/',
          destination: '/blog/launch-week-1-day-3/',
          permanent: true,
        },
        {
          source: '/newsroom/launch-week-1-day-4/',
          destination: '/blog/launch-week-1-day-4/',
          permanent: true,
        },
        {
          source: '/newsroom/launch-week-1-day-5/',
          destination: '/blog/launch-week-1-day-5/',
          permanent: true,
        },
        {
          source: '/newsroom/launch-week-1/',
          destination: '/blog/launch-week-1/',
          permanent: true,
        },
        {
          source: '/newsroom/signoz-funding/',
          destination: '/blog/signoz-funding/',
          permanent: true,
        },
        {
          source: '/newsroom/',
          destination: '/blog/',
          permanent: true,
        },
        {
          source: '/docs/userguide/collecting-ecs-logs-and-metrics/',
          destination: '/docs/opentelemetry-collection-agents/ecs/ec2/install/',
          permanent: true,
        },
        {
          source: '/docs/userguide/collecting-ecs-sidecar-infra/',
          destination: '/docs/opentelemetry-collection-agents/ecs/sidecar/install/',
          permanent: true,
        },
        {
          source: '/docs/operate/0.75.0/query-service/user-invitation-smtp',
          destination:
            '/docs/manage/administrator-guide/configuration/smtp-email-invitations/#versions-less-than-or-equal-to-084x',
          permanent: true,
        },
        {
          source: '/docs/operate/0.75.0/query-service/reset-admin-password',
          destination: 'docs/operate/reset-admin-password',
          permanent: true,
        },
        {
          source: '/docs/operate/0.75.0/configuration',
          destination: '/docs/operate/configuration',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-standalone/#upgrade',
          destination: '/docs/operate/migration/upgrade-standard/#docker-standalone',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-standalone/#uninstall-signoz-cluster',
          destination: '/docs/install/uninstall/#docker-standalone',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-swarm/#upgrade-signoz-cluster',
          destination: '/docs/operate/migration/upgrade-standard/#docker-swarm-cluster',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-standalone/#uninstall-signoz-cluster',
          destination: '/docs/install/uninstall/#docker-swarm',
          permanent: true,
        },
        {
          source: '/docs/operate/kubernetes/#upgrade-signoz',
          destination: '/docs/operate/migration/upgrade-standard/#kubernetes-deployment',
          permanent: true,
        },
        {
          source: '/docs/operate/kubernetes/#uninstall-signoz',
          destination: '/docs/install/uninstall/#kubernetes',
          permanent: true,
        },
        {
          source: '/docs/tutorial/opentelemetry-operator-usage/',
          destination: '/docs/opentelemetry-collection-agents/k8s/otel-operator/overview',
          permanent: true,
        },
        {
          source: '/docs/llm/opentelemetry-openai-monitoring/',
          destination: '/docs/openai-monitoring/',
          permanent: true,
        },
        {
          source: '/docs/community/llm-monitoring/',
          destination: '/docs/llm-observability/',
          permanent: true,
        },
        {
          source: '/docs/llm/vercel-ai-sdk-monitoring/',
          destination: '/docs/vercel-ai-sdk-observability/',
          permanent: true,
        },
        {
          source: '/docs/llm/llamaindex-monitoring/',
          destination: '/docs/llamaindex-observability/',
          permanent: true,
        },
        // Redirects for renamed LLM observability docs (SEO edits #2090)
        {
          source: '/docs/opentelemetry-openai-monitoring/',
          destination: '/docs/openai-monitoring/',
          permanent: true,
        },
        {
          source: '/docs/crewai-monitoring/',
          destination: '/docs/crewai-observability/',
          permanent: true,
        },
        {
          source: '/docs/langchain-monitoring/',
          destination: '/docs/langchain-observability/',
          permanent: true,
        },
        {
          source: '/docs/llamaindex-monitoring/',
          destination: '/docs/llamaindex-observability/',
          permanent: true,
        },
        {
          source: '/docs/mastra-monitoring/',
          destination: '/docs/mastra-observability/',
          permanent: true,
        },
        {
          source: '/docs/vercel-ai-sdk-monitoring/',
          destination: '/docs/vercel-ai-sdk-observability/',
          permanent: true,
        },
        {
          source:
            '/guides/upstream-connect-error-or-disconnect-reset-before-headers-reset-reason-connection-failure-spring-boot-and-java-11/',
          destination: '/guides/upstream-connect-error/',
          permanent: true,
        },
        {
          source: '/docs/tutorial/writing-clickhouse-queries-in-dashboard/',
          destination: '/docs/userguide/writing-clickhouse-traces-query/',
          permanent: true,
        },
        {
          source: '/docs/tutorial/instrumenting-angular-frontend/',
          destination: '/docs/frontend-monitoring/sending-traces-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/get-started',
          destination: '/docs/opentelemetry-collection-agents/get-started',
          permanent: true,
        },
        // Docker Collection Agent redirects
        {
          source: '/docs/collection-agents/docker/install',
          destination: '/docs/opentelemetry-collection-agents/docker/install',
          permanent: true,
        },
        // Docker Swarm Collection Agent redirects
        {
          source: '/docs/collection-agents/docker-swarm/configure',
          destination: '/docs/opentelemetry-collection-agents/docker-swarm/configure',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/docker-swarm/install',
          destination: '/docs/opentelemetry-collection-agents/docker-swarm/install',
          permanent: true,
        },
        // ECS Collection Agent redirects
        {
          source: '/docs/collection-agents/ecs/ec2/overview',
          destination: '/docs/opentelemetry-collection-agents/ecs/ec2/overview',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/ecs/ec2/install',
          destination: '/docs/opentelemetry-collection-agents/ecs/ec2/install',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/ecs/ec2/configure',
          destination: '/docs/opentelemetry-collection-agents/ecs/ec2/configure',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/ecs/sidecar/overview',
          destination: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/ecs/sidecar/install',
          destination: '/docs/opentelemetry-collection-agents/ecs/sidecar/install',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/ecs/sidecar/configure',
          destination: '/docs/opentelemetry-collection-agents/ecs/sidecar/configure',
          permanent: true,
        },
        // Kubernetes Collection Agent redirects
        {
          source: '/docs/collection-agents/k8s/k8s-infra/overview',
          destination: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra',
          destination: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/install-k8s-infra',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/k8s-infra/configure-k8s-infra',
          destination: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/configure-k8s-infra',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/k8s-infra/user-guides/k8s-infra-multi-cluster',
          destination:
            '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/k8s-infra-multi-cluster',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/otel-operator/overview',
          destination: '/docs/opentelemetry-collection-agents/k8s/otel-operator/overview',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/otel-operator/install',
          destination: '/docs/opentelemetry-collection-agents/k8s/otel-operator/install',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/otel-operator/configure',
          destination: '/docs/opentelemetry-collection-agents/k8s/otel-operator/configure',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/serverless/overview',
          destination: '/docs/opentelemetry-collection-agents/k8s/serverless/overview',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/serverless/install',
          destination: '/docs/opentelemetry-collection-agents/k8s/serverless/install',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/k8s/serverless/configure',
          destination: '/docs/opentelemetry-collection-agents/k8s/serverless/configure',
          permanent: true,
        },
        // OpenTelemetry Collector redirects
        {
          source: '/docs/collection-agents/opentelemetry-collector/configuration',
          destination:
            '/docs/opentelemetry-collection-agents/opentelemetry-collector/configuration',
          permanent: true,
        },
        // SSO redirects
        {
          source: '/docs/manage/administrator-guide/security-and-compliance/saml-authentication/',
          destination: '/docs/manage/administrator-guide/sso/overview/',
          permanent: true,
        },
        {
          source: '/docs/userguide/sso-authentication/',
          destination: '/docs/manage/administrator-guide/sso/overview/',
          permanent: true,
        },
        {
          source: '/docs/tutorial/setting-up-sso-saml-with-keycloak/',
          destination: '/docs/manage/administrator-guide/sso/user-guides/saml-keycloak',
          permanent: true,
        },
        {
          source: '/docs/install/troubleshooting/',
          destination: '/docs/setup/docker/troubleshooting/faq',
          permanent: true,
        },
        {
          source: '/docs/userguide/send-metrics-cloud/',
          destination: '/docs/metrics-management/send-metrics/',
          permanent: true,
        },
        {
          source: '/docs/userguide/send-metrics/',
          destination: '/docs/metrics-management/send-metrics/',
          permanent: true,
        },
        {
          source: '/docs/tutorials/',
          destination: '/docs/install/',
          permanent: true,
        },
        {
          source: '/docs/integrations/aws/integration-template/',
          destination: '/docs/integrations/aws/',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-standalone/',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/docs/migration/migrate-from-opentelemetry/cloud/',
          destination: '/docs/migration/migrate-from-opentelemetry-to-signoz/',
          permanent: true,
        },
        {
          source: '/docs/migration/migrate-from-opentelemetry/self-hosted/',
          destination: '/docs/migration/migrate-from-opentelemetry-to-signoz/',
          permanent: true,
        },
        {
          source: '/docs/userguide/collecting_application_logs_otel_sdk_python/',
          destination: '/docs/logs-management/send-logs/python-logs/',
          permanent: true,
        },
        {
          source: '/docs/userguide/python-logs-auto-instrumentation/',
          destination: '/docs/logs-management/send-logs/python-logs/',
          permanent: true,
        },
        {
          source: '/docs/llm-community-integrations/',
          destination: '/docs/llm-observability/',
          permanent: true,
        },
        {
          source: '/docs/userguide/hostmetrics/',
          destination: '/docs/infrastructure-monitoring/hostmetrics/',
          permanent: true,
        },
        {
          source: '/docs/userguide/k8s-metrics/',
          destination: '/docs/infrastructure-monitoring/k8s-metrics/',
          permanent: true,
        },
        {
          source: '/docs/userguide/collecting_application_logs_otel_sdk_java/',
          destination: '/docs/logs-management/send-logs/java-logs/',
          permanent: true,
        },
        {
          source: '/comparisons/open-source-datadog-alternatives/',
          destination: '/blog/open-source-datadog-alternative/',
          permanent: true,
        },
        {
          source: '/docs/userguide/logs/',
          destination: '/docs/logs-management/overview/',
          permanent: true,
        },
        {
          source: '/docs/logs-management/send-logs/log-export-methods/',
          destination: '/docs/logs-management/send-logs/collection-methods/',
          permanent: true,
        },
        {
          source: '/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/',
          destination: '/docs/opentelemetry-collection-agents/vm/install',
          permanent: true,
        },
        {
          source: '/docs/tutorial/opentelemetry-binary-usage/',
          destination: '/docs/opentelemetry-collection-agents/vm/install',
          permanent: true,
        },
        {
          source: '/opentelemetry/tomcat/',
          destination: '/guides/tomcat-performance-monitoring/',
          permanent: true,
        },
        {
          source: '/guides/pino-logger/',
          destination: '/guides/pino-logger-nodejs-logging-library/',
          permanent: true,
        },
        // April 2026 tech SEO 404 remediation redirects
        {
          source: '/docs/troubleshooting/signoz-cloud/ingestion-troubleshooting/',
          destination: '/docs/ingestion/signoz-cloud/troubleshooting/troubleshooting/',
          permanent: true,
        },
        {
          source: '/docs/operate/query-service/',
          destination: '/docs/operate/configuration/',
          permanent: true,
        },
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
        {
          source: '/docs/us',
          destination: '/docs/introduction/',
          permanent: true,
        },
        {
          source: '/docs/in',
          destination: '/docs/introduction/',
          permanent: true,
        },
        {
          source: '/docs/shared/k8s-common-prerequisites/',
          destination: '/docs/install/kubernetes/',
          permanent: true,
        },
        {
          source: '/docs/getting-started/',
          destination: '/docs/introduction/',
          permanent: true,
        },
        {
          source: '/docs/operate/query-service/reset-admin-password/',
          destination: '/docs/operate/reset-admin-password/',
          permanent: true,
        },
        {
          source: '/docs/gemini-observability/',
          destination: '/docs/google-gemini-monitoring/',
          permanent: true,
        },
        {
          source: '/docs/alerts-management/',
          destination: '/docs/userguide/alerts-management/',
          permanent: true,
        },
        {
          source: '/docs/operate/query-service/reset-admin-password',
          destination: '/docs/operate/reset-admin-password/',
          permanent: true,
        },
        {
          source: '/docs/operate/0\\.75\\.0/query-service/',
          destination: '/docs/operate/configuration/',
          permanent: true,
        },
        {
          source: '/docs/operate/feature-flags/',
          destination: '/docs/operate/configuration/',
          permanent: true,
        },
        {
          source: '/blog/unified-observability',
          destination: '/unified-observability/',
          permanent: true,
        },
        {
          source: '/docs/userguide/logs_clickhouse_queries/\\|here',
          destination: '/docs/userguide/logs_clickhouse_queries/',
          permanent: true,
        },
        {
          source: '/docs/tutorial/',
          destination: '/docs/introduction/',
          permanent: true,
        },
        {
          source: '/docs/userguide/',
          destination: '/docs/introduction/',
          permanent: true,
        },
        {
          source: '/docs/dashboards/dashboard-templates/aws-rds/',
          destination: '/docs/dashboards/dashboard-templates/overview/',
          permanent: true,
        },
        {
          source: '/docs/dashboards/dashboard-templates/redis',
          destination: '/docs/dashboards/dashboard-templates/overview/',
          permanent: true,
        },
        {
          source: '/docs/dashboards/dashboard-templates/redis/',
          destination: '/docs/dashboards/dashboard-templates/overview/',
          permanent: true,
        },
        {
          source: '/docs/troubleshooting/signoz-cloud/ingestion-troubleshooting',
          destination: '/docs/ingestion/signoz-cloud/troubleshooting/troubleshooting/',
          permanent: true,
        },
        {
          source: '/careers/senior-frontend-engineer-in/',
          destination: 'https://jobs.ashbyhq.com/SigNoz',
          permanent: true,
        },
        {
          source: '/learn/kubernetes-tools/',
          destination: '/blog/kubernetes-monitoring-tools/',
          permanent: true,
        },
        {
          source: '/autoinstrumented-tracing-nodejs',
          destination: '/opentelemetry/autoinstrumented-tracing-nodejs/',
          permanent: true,
        },
        {
          source: '/learn/why-is-observability-critical-for-cloud-native-applications/',
          destination: '/guides/cloud-native-monitoring/',
          permanent: true,
        },
        {
          source: '/docs/faq/',
          destination: '/docs/faqs/',
          permanent: true,
        },
        {
          source: '/docs/metrics-management/hostmetrics/',
          destination: '/docs/infrastructure-monitoring/overview/',
          permanent: true,
        },
        {
          source: '/docs/userguide/trac',
          destination: '/docs/userguide/traces/',
          permanent: true,
        },
        {
          source: '/firebase-alternatives',
          destination: '/comparisons/firebase-alternatives/',
          permanent: true,
        },
        {
          source: '/appdynamics-competitors',
          destination: '/comparisons/appdynamics-competitors/',
          permanent: true,
        },
        {
          source: '/heroku-alternatives',
          destination: '/comparisons/heroku-alternatives/',
          permanent: true,
        },
        {
          source: '/kubernetes-alternatives',
          destination: '/comparisons/kubernetes-alternatives/',
          permanent: true,
        },
        {
          source: '/datadog-vs-elasticstack',
          destination: '/comparisons/datadog-vs-elasticstack/',
          permanent: true,
        },
        {
          source:
            '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker/data/clickhouse',
          destination: '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker/',
          permanent: true,
        },
        {
          source: '/azure-alternatives',
          destination: '/comparisons/azure-alternatives/',
          permanent: true,
        },
        {
          source: '/zabbix-alternatives',
          destination: '/comparisons/zabbix-alternatives/',
          permanent: true,
        },
        {
          source: '/docs/userguide/collecting_application_logs_otel_collector/',
          destination: '/docs/userguide/collect_logs_from_file/',
          permanent: true,
        },
        {
          source: '/docs/logs-management/',
          destination: '/docs/logs-management/overview/',
          permanent: true,
        },
        {
          source: '/docs/metrics/',
          destination: '/docs/metrics-management/overview/',
          permanent: true,
        },
        {
          source: '/docs/traces/',
          destination: '/docs/instrumentation/overview/',
          permanent: true,
        },
        {
          source: '/docs/install/linux/signoz-otel-collector_linux_',
          destination: '/docs/install/linux/',
          permanent: true,
        },
        {
          source: '/docs/logs/',
          destination: '/docs/logs-management/overview/',
          permanent: true,
        },
        {
          source: '/docs/infrastructure-monitoring/',
          destination: '/docs/infrastructure-monitoring/overview/',
          permanent: true,
        },
        {
          source: '/platform-engineering-vs-DevOps',
          destination: '/comparisons/platform-engineering-vs-DevOps/',
          permanent: true,
        },
        {
          source: '/docs/logs-management/send-logs/docker-logs/',
          destination: '/docs/userguide/collect_docker_logs/',
          permanent: true,
        },
        {
          source: '/what-is-signoz/',
          destination: '/docs/what-is-signoz/',
          permanent: true,
        },
        {
          source: '/opentelemetry-vs-newrelic',
          destination: '/comparisons/opentelemetry-vs-newrelic/',
          permanent: true,
        },
        {
          source: '/docs/configuration/deep_storage',
          destination: '/docs/logs-management/long-term-storage/',
          permanent: true,
        },
        {
          source: '/guides/claude\u2011api\u2011latency/',
          destination: '/guides/claude-api-latency/',
          permanent: true,
        },
        {
          source: '/justifying-a-million-dollar-observability-bill/',
          destination: '/blog/justifying-a-million-dollar-observability-bill/',
          permanent: true,
        },
        {
          source: '/docs/frontend-and-mobile-monitoring/',
          destination: '/docs/frontend-monitoring/',
          permanent: true,
        },
        {
          source: '/work',
          destination: 'https://jobs.ashbyhq.com/SigNoz',
          permanent: true,
        },
        {
          source: '/docs/operate/migration/upgrade-0\\.112',
          destination: '/docs/operate/migration/upgrade-standard/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/kafka/',
          destination: '/docs/messaging-queues/overview/',
          permanent: true,
        },
        {
          source: '/opentelemetry-vs-logstash',
          destination: '/comparisons/opentelemetry-vs-logstash/',
          permanent: true,
        },
        {
          source: '/newrelic-vs-sentry',
          destination: '/comparisons/newrelic-vs-sentry/',
          permanent: true,
        },
        {
          source: '/datadog-vs-sentry',
          destination: '/comparisons/datadog-vs-sentry/',
          permanent: true,
        },
        {
          source: '/dynatrace-vs-newrelic',
          destination: '/comparisons/dynatrace-vs-newrelic/',
          permanent: true,
        },
        {
          source: '/datadog-vs-dynatrace',
          destination: '/comparisons/datadog-vs-dynatrace/',
          permanent: true,
        },
        {
          source: '/dynatrace-vs-appdynamics',
          destination: '/comparisons/dynatrace-vs-appdynamics/',
          permanent: true,
        },
        {
          source: '/platform-engineering-tools',
          destination: '/comparisons/platform-engineering-tools/',
          permanent: true,
        },
        {
          source: '/datadog-vs-appdynamics',
          destination: '/comparisons/datadog-vs-appdynamics/',
          permanent: true,
        },
        {
          source: '/log-analysis-tools',
          destination: '/comparisons/log-analysis-tools/',
          permanent: true,
        },
        {
          source: '/docker-alternatives',
          destination: '/comparisons/docker-alternatives/',
          permanent: true,
        },
        {
          source: '/aws-vs-gcp-vs-azure',
          destination: '/comparisons/aws-vs-gcp-vs-azure/',
          permanent: true,
        },
        {
          source: '/network-security-monitoring-tools',
          destination: '/comparisons/network-security-monitoring-tools/',
          permanent: true,
        },
        {
          source: '/cloud-monitoring-tools',
          destination: '/comparisons/cloud-monitoring-tools/',
          permanent: true,
        },
        {
          source: '/new-relic-vs-grafana',
          destination: '/comparisons/new-relic-vs-grafana/',
          permanent: true,
        },
        {
          source: '/new-relic-vs-appdynamics',
          destination: '/comparisons/new-relic-vs-appdynamics/',
          permanent: true,
        },
        {
          source: '/solarwinds-alternatives',
          destination: '/comparisons/solarwinds-alternatives/',
          permanent: true,
        },
        {
          source: '/aws-monitoring-tools',
          destination: '/comparisons/aws-monitoring-tools/',
          permanent: true,
        },
        {
          source: '/aws-alternatives',
          destination: '/comparisons/aws-alternatives/',
          permanent: true,
        },
        {
          source: '/newrelic-vs-prometheus',
          destination: '/comparisons/newrelic-vs-prometheus/',
          permanent: true,
        },
        {
          source: '/prometheus-alternatives',
          destination: '/comparisons/prometheus-alternatives/',
          permanent: true,
        },
        {
          source: '/digitalocean-alternatives',
          destination: '/comparisons/digitalocean-alternatives/',
          permanent: true,
        },
        {
          source: '/infrastructure-monitoring-tools',
          destination: '/comparisons/infrastructure-monitoring-tools/',
          permanent: true,
        },
        {
          source: '/prometheus-vs-grafana',
          destination: '/comparisons/prometheus-vs-grafana/',
          permanent: true,
        },
        {
          source: '/opentelemetry-vs-cloudwatch',
          destination: '/comparisons/opentelemetry-vs-cloudwatch/',
          permanent: true,
        },
        {
          source: '/datadog-vs-splunk',
          destination: '/comparisons/datadog-vs-splunk/',
          permanent: true,
        },
        {
          source: '/graylog-alternatives',
          destination: '/comparisons/graylog-alternatives/',
          permanent: true,
        },
        {
          source: '/splunk-vs-prometheus',
          destination: '/comparisons/splunk-vs-prometheus/',
          permanent: true,
        },
        {
          source: '/log-aggregation-tools',
          destination: '/comparisons/log-aggregation-tools/',
          permanent: true,
        },
        {
          source: '/newrelic-vs-splunk',
          destination: '/comparisons/newrelic-vs-splunk/',
          permanent: true,
        },
        {
          source: '/kibana-vs-splunk',
          destination: '/comparisons/kibana-vs-splunk/',
          permanent: true,
        },
        {
          source: '/splunk-vs-dynatrace',
          destination: '/comparisons/splunk-vs-dynatrace/',
          permanent: true,
        },
        {
          source: '/open-source-datadog-alternatives',
          destination: '/blog/open-source-datadog-alternative/',
          permanent: true,
        },
        {
          source: '/building-a-high-performance-log-store',
          destination: '/blog/building-a-high-performance-log-store/',
          permanent: true,
        },
        {
          source: '/install/docker-swarm',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/docs/dashboards/',
          destination: '/docs/dashboards/dashboard-templates/overview/',
          permanent: true,
        },
        {
          source: '/reduce-telemetry-volume-by-40-percent',
          destination: '/blog/reduce-telemetry-volume-by-40-percent/',
          permanent: true,
        },
        {
          source: '/Pranay',
          destination: '/about-us/',
          permanent: true,
        },
        {
          source: '/bug-fixes-in-our-changelog',
          destination: '/blog/bug-fixes-in-our-changelog/',
          permanent: true,
        },
        {
          source: '/docs/operate/sqlite/',
          destination: '/docs/operate/reset-admin-password/',
          permanent: true,
        },
        {
          source: '/docs/undefined',
          destination: '/docs/introduction/',
          permanent: true,
        },
        {
          source: '/install/docker',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/signoz\\.io',
          destination: '/',
          permanent: true,
        },
        {
          source: '/opentelemetry-serilog',
          destination: '/blog/opentelemetry-serilog/',
          permanent: true,
        },
        {
          source: '/careers/technical-content-writer-in/',
          destination: 'https://jobs.ashbyhq.com/SigNoz',
          permanent: true,
        },
        {
          source: '/reset-password',
          destination: '/support/',
          permanent: true,
        },
        {
          source: '/manually-configuring-opentelemetry-agent',
          destination: '/opentelemetry/manually-configuring-opentelemetry-agent/',
          permanent: true,
        },
        {
          source: '/docs/logs-management/send-logs/kubernetes/',
          destination: '/docs/userguide/collect_kubernetes_pod_logs/',
          permanent: true,
        },
        {
          source: '/careers/site-reliability-engineer/',
          destination: 'https://jobs.ashbyhq.com/SigNoz',
          permanent: true,
        },
        {
          source: '/cost-effective-datadog-alternative',
          destination: '/blog/cost-effective-datadog-alternative/',
          permanent: true,
        },
        {
          source: '/datadog-vs-grafana',
          destination: '/blog/datadog-vs-grafana/',
          permanent: true,
        },
        {
          source:
            '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker/data/zookeeper/',
          destination: '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker/',
          permanent: true,
        },
        {
          source: '/docs/userguide/infrastructure-monitoring/',
          destination: '/docs/infrastructure-monitoring/overview/',
          permanent: true,
        },
        {
          source: '/docs/userguide/dashboard-templates/',
          destination: '/docs/dashboards/dashboard-templates/overview/',
          permanent: true,
        },
        {
          source: '/learn/',
          destination: '/guides/',
          permanent: true,
        },
        {
          source: '/opentelemetry-llamaindex',
          destination: '/blog/opentelemetry-llamaindex/',
          permanent: true,
        },
        {
          source: '/collector-nodejs',
          destination: '/opentelemetry/collector-nodejs/',
          permanent: true,
        },
        {
          source: '/setting-up-signoz',
          destination: '/opentelemetry/setting-up-signoz/',
          permanent: true,
        },
        {
          source: '/does-signoz-work-well-with-existing-prometheus-setups/',
          destination: '/faqs/does-signoz-work-well-with-existing-prometheus-setups/',
          permanent: true,
        },
        {
          source: '/correlating-traces-logs-metrics-nodejs',
          destination: '/opentelemetry/correlating-traces-logs-metrics-nodejs/',
          permanent: true,
        },
        {
          source: '/can-signoz-handle-large-scale-production-environments-effectively/',
          destination: '/faqs/can-signoz-handle-large-scale-production-environments-effectively/',
          permanent: true,
        },
        {
          source: '/metrics-nodejs',
          destination: '/opentelemetry/metrics-nodejs/',
          permanent: true,
        },
        {
          source: '/python',
          destination: '/opentelemetry/python/',
          permanent: true,
        },
        {
          source: '/python-custom-metrics',
          destination: '/opentelemetry/python-custom-metrics/',
          permanent: true,
        },
        {
          source: '/manual-spans-in-python-application',
          destination: '/opentelemetry/manual-spans-in-python-application/',
          permanent: true,
        },
        {
          source: '/nodejs-clone-application',
          destination: '/opentelemetry/nodejs-clone-application/',
          permanent: true,
        },
        {
          source: '/docs/collection-agents/overview/',
          destination: '/docs/opentelemetry-collection-agents/get-started/',
          permanent: true,
        },
        {
          source: '/nodejs-tutorial-overview',
          destination: '/opentelemetry/nodejs-tutorial-overview/',
          permanent: true,
        },
        {
          source: '/error-log',
          destination: '/guides/error-log/',
          permanent: true,
        },
        {
          source: '/java-auto-instrumentation',
          destination: '/opentelemetry/java-auto-instrumentation/',
          permanent: true,
        },
        {
          source: '/python-auto-instrumentation',
          destination: '/opentelemetry/python-auto-instrumentation/',
          permanent: true,
        },
        {
          source: '/add-manual-span-to-traces-nodejs',
          destination: '/opentelemetry/add-manual-span-to-traces-nodejs/',
          permanent: true,
        },
        {
          source: '/customize-metrics-streams-produced-by-opentelemetry-python-sdk',
          destination:
            '/opentelemetry/customize-metrics-streams-produced-by-opentelemetry-python-sdk/',
          permanent: true,
        },
        {
          source: '/logging-in-python',
          destination: '/opentelemetry/logging-in-python/',
          permanent: true,
        },
        {
          source: '/go',
          destination: '/opentelemetry/go/',
          permanent: true,
        },
        {
          source: '/nodejs',
          destination: '/docs/instrumentation/javascript/opentelemetry-nodejs/',
          permanent: true,
        },
        {
          source: '/setting-up-flask-application',
          destination: '/opentelemetry/setting-up-flask-application/',
          permanent: true,
        },
        {
          source: '/nodejs-docker-setup',
          destination: '/opentelemetry/nodejs-docker-setup/',
          permanent: true,
        },
        {
          source: '/new-relic-ccu-pricing-unpredictable-costs',
          destination: '/blog/new-relic-ccu-pricing-unpredictable-costs/',
          permanent: true,
        },
        {
          source: '/datadog-pricing',
          destination: '/blog/datadog-pricing/',
          permanent: true,
        },
        {
          source: '/java-agent',
          destination: '/opentelemetry/java-agent/',
          permanent: true,
        },
        {
          source: '/logging-nodejs',
          destination: '/opentelemetry/logging-nodejs/',
          permanent: true,
        },
        {
          source: '/golang-monitoring',
          destination: '/blog/golang-monitoring/',
          permanent: true,
        },
        {
          source: '/tomcat',
          destination: '/docs/instrumentation/java/opentelemetry-tomcat/',
          permanent: true,
        },
        {
          source: '/python-overview',
          destination: '/opentelemetry/python-overview/',
          permanent: true,
        },
        {
          source: '/custom-metrics-nodejs',
          destination: '/opentelemetry/custom-metrics-nodejs/',
          permanent: true,
        },
        {
          source: '/install/linux',
          destination: '/docs/install/linux/',
          permanent: true,
        },
        {
          source: '/parsing-logs-with-the-opentelemetry-collector',
          destination: '/blog/parsing-logs-with-the-opentelemetry-collector/',
          permanent: true,
        },
        {
          source: '/sending-and-filtering-python-logs-with-opentelemetry',
          destination: '/blog/sending-and-filtering-python-logs-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/opentelemetry-deployment-patterns',
          destination: '/blog/opentelemetry-deployment-patterns/',
          permanent: true,
        },
        {
          source: '/what-is-ebpf-and-what-does-it-mean-for-observability',
          destination: '/blog/what-is-ebpf-and-what-does-it-mean-for-observability/',
          permanent: true,
        },
        {
          source: '/developer-marketing-at-signoz',
          destination: '/blog/developer-marketing-at-signoz/',
          permanent: true,
        },
        {
          source: '/kubecon-atlanta-2025-observability-guide',
          destination: '/blog/kubecon-atlanta-2025-observability-guide/',
          permanent: true,
        },
        {
          source: '/guides/cloud-nativemonitoring/',
          destination: '/guides/cloud-native-monitoring/',
          permanent: true,
        },
        {
          source: '/how-signoz-ensures-data-security-and-privacy/',
          destination: '/faqs/how-signoz-ensures-data-security-and-privacy/',
          permanent: true,
        },
        {
          source: '/quantile-aggregation-for-statsd-exporter',
          destination: '/blog/quantile-aggregation-for-statsd-exporter/',
          permanent: true,
        },
        {
          source: '/challenges-in-choosing-a-monitoring-tool-for-fintech-companies-in-india',
          destination:
            '/blog/challenges-in-choosing-a-monitoring-tool-for-fintech-companies-in-india/',
          permanent: true,
        },
        {
          source: '/out-of-box-application-monitoring-prometheus',
          destination: '/blog/out-of-box-application-monitoring-prometheus/',
          permanent: true,
        },
        {
          source: '/ha-prometheus-cortex-cassandra',
          destination: '/blog/ha-prometheus-cortex-cassandra/',
          permanent: true,
        },
        {
          source: '/distributed-tracing-tools',
          destination: '/blog/distributed-tracing-tools/',
          permanent: true,
        },
        {
          source: '/how-signoz-ensures-data-security-and-privacy',
          destination: '/faqs/how-signoz-ensures-data-security-and-privacy/',
          permanent: true,
        },
        {
          source: '/openfeature',
          destination: '/blog/openfeature/',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-swarm/',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/are-there-any-hidden-costs-associated-with-using-signoz',
          destination: '/faqs/are-there-any-hidden-costs-associated-with-using-signoz/',
          permanent: true,
        },
        {
          source: '/does-signoz-work-well-with-existing-prometheus-setups',
          destination: '/faqs/does-signoz-work-well-with-existing-prometheus-setups/',
          permanent: true,
        },
        {
          source: '/how-signozs-columnar-datastore-enhances-query-performance',
          destination: '/faqs/how-signozs-columnar-datastore-enhances-query-performance/',
          permanent: true,
        },
        {
          source:
            '/how-signozs-advanced-filtering-and-aggregation-capabilities-improve-root-cause-analysis',
          destination:
            '/faqs/how-signozs-advanced-filtering-and-aggregation-capabilities-improve-root-cause-analysis/',
          permanent: true,
        },
        {
          source: '/how-signozs-columnar-datastore-enhances-query-performance/',
          destination: '/faqs/how-signozs-columnar-datastore-enhances-query-performance/',
          permanent: true,
        },
        {
          source: '/who-uses-signoz-in-production',
          destination: '/faqs/who-uses-signoz-in-production/',
          permanent: true,
        },
        {
          source: '/who-uses-signoz-in-production/',
          destination: '/faqs/who-uses-signoz-in-production/',
          permanent: true,
        },
        {
          source: '/can-i-integrate-signoz-with-other-tools',
          destination: '/faqs/can-i-integrate-signoz-with-other-tools/',
          permanent: true,
        },
        {
          source: '/can-i-integrate-signoz-with-other-tools/',
          destination: '/faqs/can-i-integrate-signoz-with-other-tools/',
          permanent: true,
        },
        {
          source:
            '/how-signozs-advanced-filtering-and-aggregation-capabilities-improve-root-cause-analysis/',
          destination:
            '/faqs/how-signozs-advanced-filtering-and-aggregation-capabilities-improve-root-cause-analysis/',
          permanent: true,
        },
        {
          source: '/cloud-infrastructure',
          destination: '/blog/cloud-infrastructure/',
          permanent: true,
        },
        {
          source: '/what-is-platform-engineering',
          destination: '/blog/what-is-platform-engineering/',
          permanent: true,
        },
        {
          source: '/open-source-apm-tools',
          destination: '/blog/open-source-apm-tools/',
          permanent: true,
        },
        {
          source: '/how-signozs-integration-with-opentelemetry-simplifies-instrumentation/',
          destination:
            '/faqs/how-signozs-integration-with-opentelemetry-simplifies-instrumentation/',
          permanent: true,
        },
        {
          source: '/blog/claude-code-opentelemetry-monitoring/',
          destination: '/blog/claude-code-monitoring-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/blog/opentelemetry-collector-processors/',
          destination: '/blog/opentelemetry-processors/',
          permanent: true,
        },
        {
          source: '/alerts',
          destination: '/alerts-management/',
          permanent: true,
        },
        {
          source: '/observability-user-stories',
          destination: '/case-study/',
          permanent: true,
        },
        {
          source:
            '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker-swarm/data/zookeeper',
          destination:
            '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker-swarm/',
          permanent: true,
        },
        {
          source: '/docs/install/docker-n\u00e1l',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/metrics',
          destination: '/metrics-and-dashboards/',
          permanent: true,
        },
        {
          source: '/docs/install/docker\uc5d0',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-standalone',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/guides/sending-and-filtering-python-logs-with-opentelemetry/',
          destination: '/blog/sending-and-filtering-python-logs-with-opentelemetry/',
          permanent: true,
        },
        {
          source: '/technical-writer-prog',
          destination: '/technical-writer-program/',
          permanent: true,
        },
        {
          source: '/contact',
          destination: '/contact-us/',
          permanent: true,
        },
        {
          source: '/docs/troubleshooting/',
          destination: '/docs/faqs/general/',
          permanent: true,
        },
        {
          source: '/docs/operate/docker-swarm',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/docs/install/dockeradresinde/',
          destination: '/docs/install/docker/',
          permanent: true,
        },
        {
          source: '/docs/dashboards/dashboard-templates/claude-agent-dashboard/',
          destination: '/docs/dashboards/dashboard-templates/claude-agent-sdk-dashboard/',
          permanent: true,
        },
        {
          source: '/docs/logs-management/send-logs/deno-logs/',
          destination: '/docs/instrumentation/opentelemetry-deno/',
          permanent: true,
        },
      ]
    },
    webpack: (config, options) => {
      // Find Next.js's existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

      config.module.rules.push(
        // Reapply Next.js file loader for *.svg?url (cacheable with content hash)
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        // Convert other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
          use: ['@svgr/webpack'],
        }
      )

      // Exclude *.svg from the original rule since we handle it above
      fileLoaderRule.exclude = /\.svg$/i

      // this is to avoid caching for webpack
      // reference https://nextjs.org/docs/app/building-your-application/optimizing/memory-usage#disable-webpack-cache
      if (config.cache && !options.dev) {
        config.cache = Object.freeze({
          type: 'memory',
        })
      }

      // Ensure source maps are generated in production (server & client)
      if (!options.dev) {
        config.devtool = 'source-map'
      }

      return config
    },
  })
}
