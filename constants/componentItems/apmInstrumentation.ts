import type { ComponentItem } from './types'

export const APM_INSTRUMENTATION_ITEMS = {
  javascript: [
    {
      name: 'Node.js',
      href: '/docs/instrumentation/opentelemetry-nodejs',
      clickName: 'Node.js Instrumentation Link',
    },
    {
      name: 'Next.js',
      href: '/docs/instrumentation/opentelemetry-nextjs',
      clickName: 'Next.js Instrumentation Link',
    },
    {
      name: 'ReactJS',
      href: '/docs/instrumentation/opentelemetry-reactjs',
      clickName: 'ReactJS Instrumentation Link',
    },
    {
      name: 'React Native',
      href: '/docs/instrumentation/opentelemetry-react-native',
      clickName: 'React Native Instrumentation Link',
    },
    {
      name: 'NuxtJS',
      href: '/docs/instrumentation/opentelemetry-nuxtjs',
      clickName: 'Nuxt.js Instrumentation Link',
    },
    {
      name: 'Cloudflare Workers',
      href: '/docs/instrumentation/opentelemetry-cloudflare',
      clickName: 'Cloudflare Workers Instrumentation Link',
    },
    {
      name: 'Frontend Monitoring',
      href: '/docs/frontend-monitoring',
      clickName: 'Frontend Monitoring Overview Link',
    },
  ] satisfies ComponentItem[],
  python: [
    {
      name: 'Python',
      href: '/docs/instrumentation/python',
      clickName: 'Python Instrumentation Link',
    },
    {
      name: 'Django',
      href: '/docs/instrumentation/django',
      clickName: 'Django Instrumentation Link',
    },
    {
      name: 'FastAPI',
      href: '/docs/instrumentation/fastapi',
      clickName: 'FastAPI Instrumentation Link',
    },
    { name: 'Flask', href: '/docs/instrumentation/flask', clickName: 'Flask Instrumentation Link' },
    {
      name: 'Falcon',
      href: '/docs/instrumentation/falcon',
      clickName: 'Falcon Instrumentation Link',
    },
    {
      name: 'Hypercorn/Unicorn',
      href: '/docs/instrumentation/hypercorn-unicorn-support',
      clickName: 'Hypercorn/Unicorn Instrumentation Link',
    },
    {
      name: 'Celery',
      href: '/docs/instrumentation/celery',
      clickName: 'Celery Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  java: [
    {
      name: 'Java / Spring Boot',
      href: '/docs/instrumentation/java/opentelemetry-java',
      clickName: 'Java Instrumentation Link',
    },
    {
      name: 'Quarkus',
      href: '/docs/instrumentation/opentelemetry-quarkus',
      clickName: 'Quarkus Instrumentation Link',
    },
    {
      name: 'Tomcat',
      href: '/docs/instrumentation/tomcat',
      clickName: 'Tomcat Instrumentation Link',
    },
    { name: 'JBoss', href: '/docs/instrumentation/jboss', clickName: 'JBoss Instrumentation Link' },
  ] satisfies ComponentItem[],
  other: [
    {
      name: 'Golang (Go)',
      href: '/docs/instrumentation/golang',
      clickName: 'Golang Instrumentation Link',
    },
    {
      name: 'Deno',
      href: '/docs/instrumentation/opentelemetry-deno',
      clickName: 'Deno Instrumentation Link',
    },
    { name: 'PHP', href: '/docs/instrumentation/php', clickName: 'PHP Instrumentation Link' },
    {
      name: 'Laravel',
      href: '/docs/instrumentation/laravel',
      clickName: 'Laravel Instrumentation Link',
    },
    { name: '.NET', href: '/docs/instrumentation/dotnet', clickName: '.NET Instrumentation Link' },
    {
      name: 'Ruby',
      href: '/docs/instrumentation/ruby-on-rails',
      clickName: 'Ruby on Rails Instrumentation Link',
    },
    {
      name: 'Elixir',
      href: '/docs/instrumentation/elixir',
      clickName: 'Elixir Instrumentation Link',
    },
    { name: 'Rust', href: '/docs/instrumentation/rust', clickName: 'Rust Instrumentation Link' },
    {
      name: 'C++',
      href: '/docs/instrumentation/opentelemetry-cpp',
      clickName: 'C++ Instrumentation Link',
    },
    { name: 'Swift', href: '/docs/instrumentation/swift', clickName: 'Swift Instrumentation Link' },
  ] satisfies ComponentItem[],
  mobile: [
    {
      name: 'Android (Java)',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-java',
      clickName: 'Android (Java) Instrumentation Link',
    },
    {
      name: 'Android (Kotlin)',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-kotlin',
      clickName: 'Android (Kotlin) Instrumentation Link',
    },
    {
      name: 'iOS (SwiftUI)',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-swiftui',
      clickName: 'iOS (SwiftUI) Instrumentation Link',
    },
    {
      name: 'Flutter',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-flutter',
      clickName: 'Flutter Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  additional: [
    {
      name: 'NGINX',
      href: '/docs/instrumentation/opentelemetry-nginx',
      clickName: 'NGINX Instrumentation Link',
    },
    {
      name: 'Manual JS',
      href: '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs',
      clickName: 'Manual JavaScript Instrumentation Link',
    },
    {
      name: 'WordPress',
      href: '/docs/instrumentation/opentelemetry-wordpress',
      clickName: 'WordPress Instrumentation Link',
    },
    {
      name: 'Vercel',
      href: '/docs/userguide/vercel-to-signoz',
      clickName: 'Vercel Instrumentation Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllAPMInstrumentationItems = (): ComponentItem[] =>
  Object.values(APM_INSTRUMENTATION_ITEMS).flat()
