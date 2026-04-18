import type { ComponentItem } from './types'

export const AWS_MONITORING_ITEMS = {
  compute: [
    { name: 'EC2', href: '/docs/aws-monitoring/ec2/', clickName: 'EC2 Monitoring Link' },
    { name: 'ECS', href: '/docs/aws-monitoring/ecs/', clickName: 'ECS Monitoring Link' },
    { name: 'EKS', href: '/docs/aws-monitoring/eks', clickName: 'EKS Monitoring Link' },
    { name: 'Lambda', href: '/docs/aws-monitoring/lambda', clickName: 'Lambda Monitoring Link' },
  ] satisfies ComponentItem[],
  databases: [
    { name: 'RDS', href: '/docs/aws-monitoring/rds', clickName: 'RDS Monitoring Link' },
    {
      name: 'DynamoDB',
      href: '/docs/aws-monitoring/dynamodb',
      clickName: 'DynamoDB Monitoring Link',
    },
    {
      name: 'ElastiCache',
      href: '/docs/aws-monitoring/elasticache',
      clickName: 'ElastiCache Monitoring Link',
    },
  ] satisfies ComponentItem[],
  networking: [
    { name: 'ALB', href: '/docs/aws-monitoring/alb', clickName: 'ALB Monitoring Link' },
    { name: 'ELB', href: '/docs/aws-monitoring/elb-logs', clickName: 'ELB Monitoring Link' },
    { name: 'VPC', href: '/docs/aws-monitoring/vpc', clickName: 'VPC Monitoring Link' },
    {
      name: 'API Gateway',
      href: '/docs/aws-monitoring/api-gateway',
      clickName: 'API Gateway Monitoring Link',
    },
  ] satisfies ComponentItem[],
  messaging: [
    { name: 'MSK', href: '/docs/aws-monitoring/msk', clickName: 'MSK Monitoring Link' },
    { name: 'SQS', href: '/docs/aws-monitoring/sqs', clickName: 'SQS Monitoring Link' },
    { name: 'SNS', href: '/docs/aws-monitoring/sns', clickName: 'SNS Monitoring Link' },
  ] satisfies ComponentItem[],
  storage: [
    { name: 'S3', href: '/docs/aws-monitoring/s3', clickName: 'S3 Monitoring Link' },
  ] satisfies ComponentItem[],
} as const

export const getAllAWSMonitoringItems = (): ComponentItem[] =>
  Object.values(AWS_MONITORING_ITEMS).flat()
