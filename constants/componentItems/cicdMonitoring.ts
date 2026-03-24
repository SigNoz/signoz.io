import type { ComponentItem } from './types'

export const CICD_MONITORING_ITEMS = {
  github: [
    {
      name: 'GitHub Actions Traces',
      href: '/docs/cicd/github/github-actions-traces',
      clickName: 'GitHub Actions Traces Link',
    },
    {
      name: 'GitHub Metrics',
      href: '/docs/cicd/github/github-metrics',
      clickName: 'GitHub Metrics Link',
    },
  ] satisfies ComponentItem[],
  jenkins: [
    {
      name: 'Jenkins Agent Monitoring',
      href: '/docs/cicd/jenkins/agent-node-monitoring',
      clickName: 'Jenkins Agent Monitoring Link',
    },
    {
      name: 'Jenkins Tracing',
      href: '/docs/cicd/jenkins/jenkins-tracing',
      clickName: 'Jenkins Tracing Link',
    },
  ] satisfies ComponentItem[],
  argocd: [
    {
      name: 'ArgoCD Metrics',
      href: '/docs/cicd/argocd/argocd-metrics',
      clickName: 'ArgoCD Metrics Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllCICDMonitoringItems = (): ComponentItem[] =>
  Object.values(CICD_MONITORING_ITEMS).flat()
