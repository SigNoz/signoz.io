import type { ComponentItem } from './types'

export const INTEGRATIONS_ITEMS = {
  temporal: [
    {
      name: 'Cloud Metrics',
      href: '/docs/integrations/temporal-cloud-metrics',
      clickName: 'Temporal Cloud Metrics Link',
    },
    {
      name: 'Golang',
      href: '/docs/integrations/temporal-golang-opentelemetry',
      clickName: 'Temporal Golang Link',
    },
    {
      name: 'Typescript',
      href: '/docs/integrations/temporal-typescript-opentelemetry',
      clickName: 'Temporal Typescript Link',
    },
  ] satisfies ComponentItem[],
  databases: [
    { name: 'Redis', href: '/docs/integrations/redis', clickName: 'Redis Integration Link' },
    {
      name: 'PostgreSQL',
      href: '/docs/integrations/postgresql',
      clickName: 'PostgreSQL Integration Link',
    },
    { name: 'MongoDB', href: '/docs/integrations/mongodb', clickName: 'MongoDB Integration Link' },
    {
      name: 'Clickhouse',
      href: '/docs/integrations/clickhouse',
      clickName: 'Clickhouse Integration Link',
    },
    {
      name: 'Neon',
      href: '/docs/integrations/opentelemetry-neondb',
      clickName: 'Neon Integration Link',
    },
    {
      name: 'Microsoft SQL Server',
      href: '/docs/integrations/sql-server',
      clickName: 'Microsoft SQL Server Integration Link',
    },
    {
      name: 'Hasura',
      href: '/docs/integrations/opentelemetry-hasura',
      clickName: 'Hasura Integration Link',
    },
    {
      name: 'DBOS',
      href: '/docs/integrations/opentelemetry-dbos',
      clickName: 'DBOS Integration Link',
    },
  ] satisfies ComponentItem[],
  aws: [
    {
      name: 'One-Click AWS Integrations',
      href: '/docs/integrations/aws/one-click-aws-integrations',
      clickName: 'One-Click AWS Integrations Link',
    },
    {
      name: 'AWS RDS PostgreSQL (Manual)',
      href: '/docs/integrations/aws-rds-postgres',
      clickName: 'AWS RDS PostgreSQL Link',
    },
    {
      name: 'AWS RDS MySQL (Manual)',
      href: '/docs/integrations/aws-rds-mysql',
      clickName: 'AWS RDS MySQL Link',
    },
    {
      name: 'AWS Elasticache Redis (Manual)',
      href: '/docs/integrations/aws-elasticache-redis',
      clickName: 'AWS Elasticache Redis Link',
    },
  ] satisfies ComponentItem[],
  other: [
    { name: 'Nginx', href: '/docs/integrations/nginx', clickName: 'Nginx Integration Link' },
  ] satisfies ComponentItem[],
} as const

export const getAllIntegrationsItems = (): ComponentItem[] =>
  Object.values(INTEGRATIONS_ITEMS).flat()
