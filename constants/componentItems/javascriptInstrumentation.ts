import type { ComponentItem } from './types'

export const JAVASCRIPT_INSTRUMENTATION_ITEMS = {
  server: [
    {
      name: 'Node.js',
      href: '/docs/instrumentation/javascript/opentelemetry-nodejs',
      clickName: 'Node.js Instrumentation Link',
    },
    {
      name: 'Next.js',
      href: '/docs/instrumentation/javascript/opentelemetry-nextjs',
      clickName: 'Next.js Instrumentation Link',
    },
    {
      name: 'Nuxt.js',
      href: '/docs/instrumentation/javascript/opentelemetry-nuxtjs',
      clickName: 'Nuxt.js Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  frontend: [
    {
      name: 'Send Frontend Traces',
      href: '/docs/frontend-monitoring/sending-traces-with-opentelemetry',
      clickName: 'Frontend Traces Instrumentation Link',
    },
    {
      name: 'Send Frontend Logs',
      href: '/docs/frontend-monitoring/sending-logs-with-opentelemetry',
      clickName: 'Frontend Logs Instrumentation Link',
    },
    {
      name: 'Send Frontend Metrics',
      href: '/docs/frontend-monitoring/sending-metrics-with-opentelemetry',
      clickName: 'Frontend Metrics Instrumentation Link',
    },
    {
      name: 'React Native',
      href: '/docs/instrumentation/javascript/opentelemetry-react-native',
      clickName: 'React Native Instrumentation Link',
    },
    {
      name: 'Monitor Web Vitals',
      href: '/docs/frontend-monitoring/opentelemetry-web-vitals',
      clickName: 'Web Vitals Instrumentation Link',
    },
    {
      name: 'Document Load Timings',
      href: '/docs/frontend-monitoring/document-load',
      clickName: 'Document Load Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  advanced: [
    {
      name: 'Manual Node.js Instrumentation',
      href: '/docs/instrumentation/javascript/nodejs-manual-instrumentation',
      clickName: 'Manual Node.js Instrumentation Link',
    },
    {
      name: 'Selective Auto-Instrumentation',
      href: '/docs/instrumentation/javascript/nodejs-selective-instrumentation',
      clickName: 'Selective Auto-Instrumentation Link',
    },
    {
      name: 'Enable OTLP HTTP CORS',
      href: '/docs/userguide/otlp-http-enable-cors',
      clickName: 'OTLP HTTP CORS Guide Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllJavascriptInstrumentationItems = (): ComponentItem[] =>
  Object.values(JAVASCRIPT_INSTRUMENTATION_ITEMS).flat()
