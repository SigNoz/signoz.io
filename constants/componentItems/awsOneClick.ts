import type { ComponentItem } from './types'

export const AWS_ONE_CLICK_ITEMS = {
  compute: [
    { name: 'EC2', href: '/docs/integrations/aws/ec2', clickName: 'EC2 Integration Link' },
    { name: 'ECS', href: '/docs/integrations/aws/ecs', clickName: 'ECS Integration Link' },
    { name: 'EKS', href: '/docs/integrations/aws/eks', clickName: 'EKS Integration Link' },
    { name: 'Lambda', href: '/docs/integrations/aws/lambda', clickName: 'Lambda Integration Link' },
  ] satisfies ComponentItem[],
  databases: [
    { name: 'RDS', href: '/docs/integrations/aws/rds', clickName: 'RDS Integration Link' },
    {
      name: 'DynamoDB',
      href: '/docs/integrations/aws/dynamodb',
      clickName: 'DynamoDB Integration Link',
    },
    {
      name: 'ElastiCache',
      href: '/docs/integrations/aws/elasticache',
      clickName: 'ElastiCache Integration Link',
    },
  ] satisfies ComponentItem[],
  networking: [
    { name: 'ALB', href: '/docs/integrations/aws/alb', clickName: 'ALB Integration Link' },
    {
      name: 'API Gateway',
      href: '/docs/integrations/aws/api-gateway',
      clickName: 'API Gateway Integration Link',
    },
  ] satisfies ComponentItem[],
  messaging: [
    { name: 'MSK', href: '/docs/integrations/aws/msk', clickName: 'MSK Integration Link' },
    { name: 'SQS', href: '/docs/integrations/aws/sqs', clickName: 'SQS Integration Link' },
    { name: 'SNS', href: '/docs/integrations/aws/sns', clickName: 'SNS Integration Link' },
  ] satisfies ComponentItem[],
} as const

export const getAllAWSOneClickItems = (): ComponentItem[] =>
  Object.values(AWS_ONE_CLICK_ITEMS).flat()
