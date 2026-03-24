import type { ComponentItem } from './types'

export const JAVA_INSTRUMENTATION_ITEMS = {
  frameworks: [
    {
      name: 'Java / Spring Boot',
      href: '/docs/instrumentation/java/opentelemetry-java',
      clickName: 'Java Spring Boot Instrumentation Link',
    },
    {
      name: 'Quarkus',
      href: '/docs/instrumentation/java/opentelemetry-quarkus',
      clickName: 'Quarkus Instrumentation Link',
    },
    {
      name: 'Tomcat',
      href: '/docs/instrumentation/java/opentelemetry-tomcat',
      clickName: 'Tomcat Instrumentation Link',
    },
    {
      name: 'JBoss / WildFly',
      href: '/docs/instrumentation/java/opentelemetry-jboss',
      clickName: 'JBoss WildFly Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  advanced: [
    {
      name: 'Manual Instrumentation',
      href: '/docs/instrumentation/java/manual-instrumentation',
      clickName: 'Java Manual Instrumentation Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllJavaInstrumentationItems = (): ComponentItem[] =>
  Object.values(JAVA_INSTRUMENTATION_ITEMS).flat()
