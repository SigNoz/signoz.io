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
      'Get actionable insights across pods, nodes, namespaces, workloads, and the services running inside them. All unified across logs, traces, and metrics in consolidated OTel-native architecture.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
  description:
    'Get actionable insights across pods, nodes, namespaces, workloads, and the services running inside them. All unified across logs, traces, and metrics in consolidated OTel-native architecture.',
  twitter: {
    title: 'Supercharge your Kubernetes Monitoring. With AI powered insights. | SigNoz',
    description:
      'Get actionable insights across pods, nodes, namespaces, workloads, and the services running inside them. All unified across logs, traces, and metrics in consolidated OTel-native architecture.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
}

export default function KubernetesMonitoring() {
  return <KubernetesMonitoringPage />
}
