import type { ComponentItem } from './types'

export const METRICS_QUICK_START_ITEMS = {
  collection: [
    {
      name: 'OTel Receivers',
      href: '/docs/userguide/otel-metrics-receivers',
      clickName: 'OTel Receivers Link',
    },
    {
      name: 'Prometheus',
      href: '/docs/userguide/prometheus-metrics',
      clickName: 'Prometheus Metrics Link',
    },
    {
      name: 'GCP Cloud Monitoring',
      href: '/docs/gcp-monitoring/cloud-monitoring/metrics',
      clickName: 'GCP Cloud Monitoring Metrics Link',
    },
    {
      name: 'HTTP Endpoints',
      href: '/docs/monitor-http-endpoints',
      clickName: 'HTTP Endpoints Link',
    },
    {
      name: 'Datadog Receiver',
      href: '/docs/migration/opentelemetry-datadog-receiver',
      clickName: 'Datadog Receiver Link',
    },
    {
      name: 'StatsD',
      href: '/docs/userguide/opentelemetry-statsd',
      clickName: 'StatsD Metrics Link',
    },
  ] satisfies ComponentItem[],
  infrastructure: [
    { name: 'Host Metrics', href: '/docs/userguide/hostmetrics', clickName: 'Host Metrics Link' },
    {
      name: 'Docker',
      href: '/docs/metrics-management/docker-container-metrics',
      clickName: 'Docker Metrics Link',
    },
    {
      name: 'Kubernetes',
      href: '/docs/userguide/k8s-metrics',
      clickName: 'Kubernetes Metrics Link',
    },
    { name: 'AWS ECS', href: '/docs/integrations/aws/ecs', clickName: 'AWS ECS Metrics Link' },
    {
      name: 'AWS ECS Fargate',
      href: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview/',
      clickName: 'AWS ECS Fargate Metrics Link',
    },
    {
      name: 'AWS EC2',
      href: '/docs/opentelemetry-collection-agents/ecs/ec2/overview/',
      clickName: 'AWS EC2 Metrics Link',
    },
    { name: 'AWS EKS', href: '/docs/aws-monitoring/eks', clickName: 'AWS EKS Metrics Link' },
    {
      name: 'GCP Compute Engine',
      href: '/docs/gcp-monitoring/compute-engine/metrics',
      clickName: 'GCP Compute Engine Metrics Link',
    },
    {
      name: 'Azure VM',
      href: '/docs/azure-monitoring/virtual-machines/vm-metrics',
      clickName: 'Azure VM Metrics Link',
    },
    {
      name: 'GCP VPC',
      href: '/docs/gcp-monitoring/vpc/metrics',
      clickName: 'GCP VPC Metrics Link',
    },
    {
      name: 'GKE (GCP)',
      href: '/docs/gcp-monitoring/gke/gke-logging-and-metrics',
      clickName: 'GKE Metrics Link',
    },
    {
      name: 'Traefik',
      href: '/docs/tutorial/traefik-observability',
      clickName: 'Traefik Metrics Link',
    },
    { name: 'Nomad', href: '/docs/integrations/nomad', clickName: 'Nomad Metrics Link' },
    {
      name: 'Fly.io',
      href: '/docs/metrics-management/fly-metrics',
      clickName: 'Fly.io Metrics Link',
    },
    { name: 'Envoy', href: '/docs/userguide/envoy-metrics', clickName: 'Envoy Metrics Link' },
    {
      name: 'NVIDIA GPU (DCGM)',
      href: '/docs/metrics-management/nvidia-dcgm-metrics',
      clickName: 'NVIDIA DCGM Metrics Link',
    },
    {
      name: 'SLURM',
      href: '/docs/metrics-management/slurm-metrics',
      clickName: 'SLURM Metrics Link',
    },
    {
      name: 'Render',
      href: '/docs/metrics-management/render-metrics',
      clickName: 'Render Metrics Link',
    },
  ] satisfies ComponentItem[],
  applications: [
    {
      name: 'Golang',
      href: '/docs/metrics-management/send-metrics/applications/golang',
      clickName: 'Golang Metrics Link',
    },
    {
      name: 'Rust',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-rust',
      clickName: 'Rust Metrics Link',
    },
    {
      name: 'Java',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-java',
      clickName: 'Java Metrics Link',
    },
    {
      name: '.NET',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-dotnet',
      clickName: '.NET Metrics Link',
    },
    {
      name: 'Node.js',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-nodejs',
      clickName: 'Node.js Metrics Link',
    },
    {
      name: 'Python',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-python',
      clickName: 'Python Metrics Link',
    },
    {
      name: 'Deno',
      href: '/docs/instrumentation/opentelemetry-deno',
      clickName: 'Deno Metrics Link',
    },
  ] satisfies ComponentItem[],
  databases: [
    {
      name: 'ClickHouse',
      href: '/docs/integrations/clickhouse',
      clickName: 'ClickHouse Metrics Link',
    },
    {
      name: 'Snowflake',
      href: '/docs/integrations/snowflake',
      clickName: 'Snowflake Metrics Link',
    },
    { name: 'MongoDB', href: '/docs/tutorial/mongodb-metrics', clickName: 'MongoDB Metrics Link' },
    {
      name: 'MongoDB Atlas',
      href: '/docs/integrations/mongodb-atlas',
      clickName: 'MongoDB Atlas Metrics Link',
    },
    {
      name: 'PostgreSQL',
      href: '/docs/integrations/postgresql',
      clickName: 'PostgreSQL Metrics Link',
    },
    {
      name: 'GCP Cloud SQL',
      href: '/docs/gcp-monitoring/cloud-sql/metrics',
      clickName: 'GCP Cloud SQL Metrics Link',
    },
    { name: 'Redis', href: '/docs/integrations/redis', clickName: 'Redis Metrics Link' },
    {
      name: 'MySQL',
      href: '/docs/metrics-management/mysql-metrics',
      clickName: 'MySQL Metrics Link',
    },
    {
      name: 'Neon',
      href: '/docs/integrations/opentelemetry-neondb',
      clickName: 'Neon Metrics Link',
    },
    {
      name: 'SQL Server',
      href: '/docs/integrations/sql-server',
      clickName: 'SQL Server Metrics Link',
    },
    {
      name: 'Azure SQL Database',
      href: '/docs/azure-monitoring/db-metrics',
      clickName: 'Azure SQL Database Metrics Link',
    },
    {
      name: 'AWS RDS MySQL',
      href: '/docs/integrations/aws-rds-mysql',
      clickName: 'AWS RDS MySQL Link',
    },
    {
      name: 'AWS RDS PostgreSQL',
      href: '/docs/integrations/aws-rds-postgres',
      clickName: 'AWS RDS PostgreSQL Link',
    },
    {
      name: 'AWS ElastiCache',
      href: '/docs/integrations/aws-elasticache-redis',
      clickName: 'AWS ElastiCache Link',
    },
    {
      name: 'Hasura',
      href: '/docs/integrations/opentelemetry-hasura',
      clickName: 'Hasura Metrics Link',
    },
  ] satisfies ComponentItem[],
  webServers: [
    {
      name: 'NGINX',
      href: '/docs/metrics-management/nginx-metrics',
      clickName: 'NGINX Metrics Link',
    },
    {
      name: 'GCP Cloud Load Balancer',
      href: '/docs/gcp-monitoring/gcp-clb/metrics',
      clickName: 'GCP Cloud Load Balancer Metrics Link',
    },
  ] satisfies ComponentItem[],
  messaging: [
    { name: 'Kafka', href: '/docs/messaging-queues/kafka', clickName: 'Kafka Metrics Link' },
    { name: 'MSK', href: '/docs/messaging-queues/msk', clickName: 'MSK Metrics Link' },
    {
      name: 'Confluent Kafka',
      href: '/docs/messaging-queues/confluent-kafka',
      clickName: 'Confluent Kafka Metrics Link',
    },
    { name: 'Strimzi', href: '/docs/messaging-queues/strimzi', clickName: 'Strimzi Metrics Link' },
    {
      name: 'Celery',
      href: '/docs/messaging-queues/celery-setup',
      clickName: 'Celery Metrics Link',
    },
  ] satisfies ComponentItem[],
  runtimes: [
    {
      name: 'JVM',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-java/#jvm-runtime-metrics',
      clickName: 'JVM Metrics Link',
    },
    { name: 'JMX', href: '/docs/tutorial/jmx-metrics', clickName: 'JMX Metrics Link' },
  ] satisfies ComponentItem[],
  cloudPlatforms: [
    {
      name: 'GCP Cloud Run',
      href: '/docs/gcp-monitoring/cloud-run/metrics',
      clickName: 'GCP Cloud Run Metrics Link',
    },
    {
      name: 'GCP App Engine',
      href: '/docs/gcp-monitoring/app-engine/metrics',
      clickName: 'GCP App Engine Metrics Link',
    },
    {
      name: 'GCP Cloud Functions',
      href: '/docs/gcp-monitoring/gcp-fns/fns-metrics',
      clickName: 'GCP Cloud Functions Metrics Link',
    },
    {
      name: 'GCP Cloud Storage',
      href: '/docs/gcp-monitoring/gcs/metrics',
      clickName: 'GCP Cloud Storage Metrics Link',
    },
    {
      name: 'Temporal Cloud',
      href: '/docs/integrations/temporal-cloud-metrics',
      clickName: 'Temporal Cloud Link',
    },
    { name: 'Supabase', href: '/docs/integrations/supabase', clickName: 'Supabase Metrics Link' },
    { name: 'ArgoCD', href: '/docs/cicd/argocd/argocd-metrics', clickName: 'ArgoCD Metrics Link' },
    {
      name: 'GitHub Actions',
      href: '/docs/cicd/github/github-metrics',
      clickName: 'GitHub Actions Link',
    },
    {
      name: 'Azure App Service',
      href: '/docs/azure-monitoring/app-service/metrics',
      clickName: 'Azure App Service Metrics Link',
    },
    {
      name: 'Azure Functions',
      href: '/docs/azure-monitoring/az-fns/metrics',
      clickName: 'Azure Functions Metrics Link',
    },
    {
      name: 'Azure Container Apps',
      href: '/docs/azure-monitoring/az-container-apps/metrics',
      clickName: 'Azure Container Apps Metrics Link',
    },
    {
      name: 'Azure Blob Storage',
      href: '/docs/azure-monitoring/az-blob-storage/metrics',
      clickName: 'Azure Blob Storage Metrics Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllMetricsQuickStartItems = (): ComponentItem[] =>
  Object.values(METRICS_QUICK_START_ITEMS).flat()
