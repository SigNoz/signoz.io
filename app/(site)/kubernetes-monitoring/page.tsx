import KubernetesMonitoringPage from './KubernetesMonitoringPage'
import { Metadata } from 'next'

export const revalidate = 31536000

export const metadata: Metadata = {
  title: {
    absolute: 'Supercharge your Kubernetes Monitoring. With AI powered insights. | SigNoz',
  },
  openGraph: {
    title: 'Supercharge your Kubernetes Monitoring. With AI powered insights. | SigNoz',
    description:
      'Use SigNoz Cloud for actionable insights across Kubernetes pods, nodes, namespaces, workloads, and services, unified across logs, traces, and metrics in one OTel-native platform.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
  description:
    'Use SigNoz Cloud for actionable insights across Kubernetes pods, nodes, namespaces, workloads, and services, unified across logs, traces, and metrics in one OTel-native platform.',
  twitter: {
    title: 'Supercharge your Kubernetes Monitoring. With AI powered insights. | SigNoz',
    description:
      'Use SigNoz Cloud for actionable insights across Kubernetes pods, nodes, namespaces, workloads, and services, unified across logs, traces, and metrics in one OTel-native platform.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
}

export default function KubernetesMonitoring() {
  return <KubernetesMonitoringPage />
}
