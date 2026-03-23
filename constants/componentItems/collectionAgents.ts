import type { ComponentItem } from './types'

export const COLLECTION_AGENTS_ITEMS = {
  docker: [
    {
      name: 'Docker',
      href: '/docs/opentelemetry-collection-agents/docker/install',
      clickName: 'Collection Agent on Docker',
    },
    {
      name: 'Docker Swarm',
      href: '/docs/opentelemetry-collection-agents/docker-swarm/install',
      clickName: 'Collection Agent on Docker Swarm',
    },
  ] satisfies ComponentItem[],
  ecs: [
    {
      name: 'ECS EC2 (Daemon Service)',
      href: '/docs/opentelemetry-collection-agents/ecs/ec2/overview',
      clickName: 'ECS EC2 Daemon Service',
    },
    {
      name: 'ECS Serverless (Sidecar)',
      href: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview',
      clickName: 'ECS Serverless Sidecar',
    },
  ] satisfies ComponentItem[],
  kubernetes: [
    {
      name: 'K8s-Infra (Helm Chart)',
      href: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview',
      clickName: 'K8s Infra Overview',
    },
    {
      name: 'OpenTelemetry Operator',
      href: '/docs/opentelemetry-collection-agents/k8s/otel-operator/overview',
      clickName: 'OTel Operator Overview',
    },
    {
      name: 'K8s Serverless (EKS Fargate)',
      href: '/docs/opentelemetry-collection-agents/k8s/serverless/overview',
      clickName: 'K8s Serverless Overview',
    },
  ] satisfies ComponentItem[],
  vm: [
    {
      name: 'OpenTelemetry Binary',
      href: '/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/',
      clickName: 'OpenTelemetry Binary',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllCollectionAgentsItems = (): ComponentItem[] =>
  Object.values(COLLECTION_AGENTS_ITEMS).flat()
