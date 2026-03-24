import type { ComponentItem } from './types'

export const LOGS_INSTRUMENTATION_ITEMS = {
  platforms: [
    {
      name: 'Kubernetes',
      href: '/docs/userguide/collect_kubernetes_pod_logs',
      clickName: 'Kubernetes Logs Link',
    },
    { name: 'Docker', href: '/docs/userguide/collect_docker_logs', clickName: 'Docker Logs Link' },
    {
      name: 'Heroku',
      href: '/docs/userguide/heroku_logs_to_signoz',
      clickName: 'Heroku Logs Link',
    },
    {
      name: 'Vercel',
      href: '/docs/userguide/vercel-to-signoz',
      clickName: 'Vercel Logs Link',
    },
    {
      name: 'Tomcat',
      href: '/docs/logs-management/send-logs/collect-tomcat-access-and-garbage-collector-logs',
      clickName: 'Tomcat Logs Link',
    },
    {
      name: 'Windows Event',
      href: '/docs/logs-management/send-logs/windows-events-log',
      clickName: 'Windows Logs Link',
    },
    {
      name: 'Cloudflare',
      href: '/docs/logs-management/send-logs/cloudflare-logs',
      clickName: 'Cloudflare Logs Link',
    },
    { name: 'Neon', href: '/docs/integrations/opentelemetry-neondb', clickName: 'Neon Logs Link' },
    {
      name: 'Convex',
      href: '/docs/logs-management/send-logs/convex-log-streams-signoz',
      clickName: 'Convex Logs Link',
    },
  ] satisfies ComponentItem[],
  languages: [
    {
      name: 'Python',
      href: '/docs/logs-management/send-logs/python-logs',
      clickName: 'Python Logs Link',
    },
    {
      name: 'Java',
      href: '/docs/logs-management/send-logs/java-logs',
      clickName: 'Java Logs Link',
    },
    {
      name: 'Node.js',
      href: '/docs/logs-management/send-logs/nodejs-logs',
      clickName: 'Node.js Logs Link',
    },
    {
      name: 'Bunyan (Node.js)',
      href: '/docs/logs-management/send-logs/opentelemetry-nodejs-bunyan-logs',
      clickName: 'Bunyan Logs Link',
    },
    {
      name: 'Winston (Node.js)',
      href: '/docs/logs-management/send-logs/nodejs-winston-logs',
      clickName: 'Winston Logs Link',
    },
    {
      name: 'Pino (Node.js)',
      href: '/docs/logs-management/send-logs/nodejs-pino-logs',
      clickName: 'Pino Logs Link',
    },
    {
      name: 'Lambda (Node.js)',
      href: '/docs/logs-management/send-logs/aws-lambda-nodejs',
      clickName: 'Lambda Node.js Logs Link',
    },
    {
      name: 'Logrus (Go)',
      href: '/docs/logs-management/send-logs/logrus-to-signoz',
      clickName: 'Logrus Logs Link',
    },
    {
      name: 'Zap (Go)',
      href: '/docs/logs-management/send-logs/zap-to-signoz',
      clickName: 'Zap Logs Link',
    },
    { name: 'Deno', href: '/docs/instrumentation/opentelemetry-deno', clickName: 'Deno Logs Link' },
  ] satisfies ComponentItem[],
  collectors: [
    {
      name: 'Log Files',
      href: '/docs/userguide/collect_logs_from_file',
      clickName: 'File Logs Link',
    },
    { name: 'HTTP Logs', href: '/docs/userguide/send-logs-http', clickName: 'HTTP Logs Link' },
    { name: 'Syslogs', href: '/docs/userguide/collecting_syslogs', clickName: 'Syslogs Link' },
    { name: 'FluentD', href: '/docs/userguide/fluentd_to_signoz', clickName: 'FluentD Logs Link' },
    {
      name: 'FluentBit',
      href: '/docs/userguide/fluentbit_to_signoz',
      clickName: 'FluentBit Logs Link',
    },
    {
      name: 'Logstash',
      href: '/docs/userguide/logstash_to_signoz',
      clickName: 'Logstash Logs Link',
    },
    {
      name: 'Vector',
      href: '/docs/logs-management/send-logs/vector-logs-to-signoz',
      clickName: 'Vector Logs Link',
    },
  ] satisfies ComponentItem[],
  cloud: {
    aws: [
      { name: 'EC2', href: '/docs/aws-monitoring/ec2/ec2-logs', clickName: 'EC2 Logs Link' },
      { name: 'ECS', href: '/docs/integrations/aws/ecs', clickName: 'ECS Link' },
      {
        name: 'EKS',
        href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
        clickName: 'EKS Logs Link',
      },
      { name: 'Lambda', href: '/docs/integrations/aws/lambda', clickName: 'AWS Lambda Link' },
      { name: 'S3', href: '/docs/aws-monitoring/s3', clickName: 'S3 Link' },
      { name: 'RDS', href: '/docs/integrations/aws/rds', clickName: 'RDS Link' },
      { name: 'DynamoDB', href: '/docs/integrations/aws/dynamodb', clickName: 'DynamoDB Link' },
      {
        name: 'ElastiCache',
        href: '/docs/integrations/aws/elasticache',
        clickName: 'ElastiCache Link',
      },
      { name: 'ELB', href: '/docs/aws-monitoring/elb', clickName: 'ELB Link' },
      { name: 'ALB', href: '/docs/integrations/aws/alb', clickName: 'ALB Link' },
      {
        name: 'API Gateway',
        href: '/docs/integrations/aws/api-gateway',
        clickName: 'API Gateway Link',
      },
      { name: 'MSK', href: '/docs/integrations/aws/msk', clickName: 'MSK Link' },
      { name: 'SNS', href: '/docs/integrations/aws/sns', clickName: 'SNS Link' },
      { name: 'SQS', href: '/docs/integrations/aws/sqs', clickName: 'SQS Link' },
      { name: 'VPC', href: '/docs/aws-monitoring/vpc', clickName: 'VPC Link' },
      {
        name: 'Cloudwatch',
        href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
        clickName: 'Cloudwatch Logs Link',
      },
    ] satisfies ComponentItem[],
    azure: [
      {
        name: 'App Service',
        href: '/docs/azure-monitoring/app-service/logging/',
        clickName: 'App Service Logs Link',
      },
      {
        name: 'AKS',
        href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
        clickName: 'AKS Logs Link',
      },
      {
        name: 'Container Apps',
        href: '/docs/azure-monitoring/az-container-apps/logging/',
        clickName: 'Container Apps Logs Link',
      },
      {
        name: 'Azure Functions',
        href: '/docs/azure-monitoring/az-fns/logging/',
        clickName: 'Azure Functions Logs Link',
      },
      {
        name: 'Blob Storage',
        href: '/docs/azure-monitoring/az-blob-storage/logging/',
        clickName: 'Blob Storage Logs Link',
      },
      {
        name: 'Virtual Machines',
        href: '/docs/azure-monitoring/virtual-machines/vm-metrics',
        clickName: 'Azure VMs Link',
      },
      {
        name: 'MySQL Flexible Server',
        href: '/docs/azure-monitoring/mysql-flexible-server',
        clickName: 'Azure MySQL Link',
      },
    ] satisfies ComponentItem[],
    gcp: [
      {
        name: 'Cloud Functions',
        href: '/docs/gcp-monitoring/gcp-fns/logging/',
        clickName: 'Cloud Functions Logs Link',
      },
      {
        name: 'App Engine',
        href: '/docs/gcp-monitoring/app-engine/logging/',
        clickName: 'App Engine Logs Link',
      },
      {
        name: 'Compute Engine',
        href: '/docs/gcp-monitoring/compute-engine/logging/',
        clickName: 'Compute Engine Logs Link',
      },
      {
        name: 'Cloud Storage',
        href: '/docs/gcp-monitoring/gcs/logging/',
        clickName: 'Cloud Storage Logs Link',
      },
      {
        name: 'Cloud SQL',
        href: '/docs/gcp-monitoring/cloud-sql/logging/',
        clickName: 'Cloud SQL Logs Link',
      },
      {
        name: 'Cloud Load Balancer',
        href: '/docs/gcp-monitoring/gcp-clb/logging/',
        clickName: 'Cloud Load Balancer Logs Link',
      },
      { name: 'VPC', href: '/docs/gcp-monitoring/vpc/logging/', clickName: 'VPC Logs Link' },
      {
        name: 'GKE',
        href: '/docs/gcp-monitoring/gke/gke-logging-and-metrics/',
        clickName: 'GKE Logs Link',
      },
      {
        name: 'Cloud Run',
        href: '/docs/gcp-monitoring/cloud-run/logging/',
        clickName: 'Cloud Run Logs Link',
      },
    ] satisfies ComponentItem[],
  },
} as const

export const getAllLogsInstrumentationItems = (): ComponentItem[] => [
  ...LOGS_INSTRUMENTATION_ITEMS.platforms,
  ...LOGS_INSTRUMENTATION_ITEMS.languages,
  ...LOGS_INSTRUMENTATION_ITEMS.collectors,
  ...LOGS_INSTRUMENTATION_ITEMS.cloud.aws,
  ...LOGS_INSTRUMENTATION_ITEMS.cloud.azure,
  ...LOGS_INSTRUMENTATION_ITEMS.cloud.gcp,
]
