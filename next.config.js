const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app https://www.googletagmanager.com https://js.hsforms.net https://f.vimeocdn.com https://embed.lu.ma https://www.clarity.ms https://*.contentsquare.net http://*.contentsquare.net https://www.chatbase.co https://static.reo.dev https://*.clarity.ms;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.lu.ma;
  img-src * blob: data:;
  media-src *;
  connect-src * https://api.reo.dev https://www.clarity.ms https://*.clarity.ms;
  font-src * 'self';
  frame-src * giscus.app youtube.com;
  worker-src 'self' blob:;
  frame-ancestors 'self' https://signoz.io https://*.us.signoz.cloud https://*.in.signoz.cloud https://*.eu.signoz.cloud;
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
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
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
          source: '/docs/',
          destination: '/docs/introduction',
          permanent: true,
        },
        {
          source: '/security/',
          destination: 'https://trust.signoz.io/',
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
          source: '/comparisons/',
          destination: '/resource-center/comparisons/',
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
            'https://join.slack.com/t/signoz-community/shared_invite/zt-3hr54hgo7-eZZHi6MRX4KodCfArtnTXA',
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
          source: '/docs/userguide/metrics-dashboard/',
          destination: '/docs/userguide/dashboards',
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
          source: '/guides/',
          destination: '/resource-center/guides/',
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
          destination: '/docs/instrumentation/opentelemetry-celery/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/django/',
          destination: '/docs/instrumentation/opentelemetry-django/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/dotnet/',
          destination: '/docs/instrumentation/opentelemetry-dotnet/',
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
          destination: '/docs/instrumentation/opentelemetry-falcon/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/fastapi/',
          destination: '/docs/instrumentation/opentelemetry-fastapi/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/flask/',
          destination: '/docs/instrumentation/opentelemetry-flask/',
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
          destination: '/docs/instrumentation/opentelemetry-java/',
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
          destination: '/docs/instrumentation/opentelemetry-jboss/',
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
          source: '/docs/instrumentation/php/',
          destination: '/docs/instrumentation/opentelemetry-php/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/laravel/',
          destination: '/docs/instrumentation/opentelemetry-laravel/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/python/',
          destination: '/docs/instrumentation/opentelemetry-python/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/ruby/',
          destination: '/docs/instrumentation/ruby-on-rails/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/ruby-on-rails/',
          destination: '/docs/instrumentation/opentelemetry-ruby-on-rails/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/rust/',
          destination: '/docs/instrumentation/opentelemetry-rust/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/springboot/',
          destination: '/docs/instrumentation/opentelemetry-springboot/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/swift/',
          destination: '/docs/instrumentation/opentelemetry-swift/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/tomcat/',
          destination: '/docs/instrumentation/opentelemetry-tomcat/',
          permanent: true,
        },
        {
          source: '/docs/instrumentation/manual-instrumentation/javascript/nodejs/',
          destination:
            '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs/',
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
          source: '/docs/userguide/collecting-ecs-logs-and-metrics',
          destination: '/docs/opentelemetry-collection-agents/ecs/ec2/overview/',
          permanent: true,
        },
        {
          source: '/docs/userguide/collecting-ecs-sidecar-infra',
          destination: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview',
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
          source: '/docs/install/troubleshooting/',
          destination: '/docs/setup/docker/troubleshooting/faq',
          permanent: true,
        },
        {
          source: '/docs/integrations/aws/integration-template/',
          destination: '/docs/integrations/aws/',
          permanent: true,
        },
      ]
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

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

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: `${process.env.NEXT_PUBLIC_SENTRY_ORG}`,
  project: `${process.env.NEXT_PUBLIC_SENTRY_PROJECT}`,
  sentryUrl: `${process.env.NEXT_PUBLIC_SENTRY_URL}`,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
