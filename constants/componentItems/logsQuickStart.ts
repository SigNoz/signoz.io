import type { ComponentItem } from './types'

export const LOGS_QUICK_START_ITEMS: ComponentItem[] = [
  {
    name: 'Kubernetes',
    href: '/docs/userguide/collect_kubernetes_pod_logs',
    clickName: 'Kubernetes Logs Link',
  },
  { name: 'Docker', href: '/docs/userguide/collect_docker_logs', clickName: 'Docker Logs Link' },
  {
    name: 'Log Files',
    href: '/docs/userguide/collect_logs_from_file',
    clickName: 'File Logs Link',
  },
  { name: 'Syslogs', href: '/docs/userguide/collecting_syslogs', clickName: 'Syslogs Link' },
  {
    name: 'Python',
    href: '/docs/logs-management/send-logs/python-logs',
    clickName: 'Python Logs Link',
  },
  { name: 'Java', href: '/docs/logs-management/send-logs/java-logs', clickName: 'Java Logs Link' },
  {
    name: 'Node.js',
    href: '/docs/logs-management/send-logs/nodejs-logs',
    clickName: 'Node.js Logs Link',
  },
  {
    name: 'Go',
    href: '/docs/logs-management/send-logs/logrus-to-signoz',
    clickName: 'Go Logs Link',
  },
  {
    name: 'FluentBit',
    href: '/docs/userguide/fluentbit_to_signoz',
    clickName: 'FluentBit Logs Link',
  },
  { name: 'Logstash', href: '/docs/userguide/logstash_to_signoz', clickName: 'Logstash Logs Link' },
  { name: 'HTTP', href: '/docs/userguide/send-logs-http', clickName: 'HTTP Logs Link' },
  {
    name: 'AWS',
    href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
    clickName: 'AWS Logs Link',
  },
]
