import AzureMonitoringPage from './AzureMonitoringPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Azure Monitoring with One-Click Integration | SigNoz',
  },
  openGraph: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz Cloud',
    description:
      'Use SigNoz Cloud to monitor Azure VMs, AKS, App Service, Container Apps, Functions, SQL Database, Blob Storage, and Cosmos DB with metrics, logs, and traces correlated in one OTel-native platform.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
  description:
    'Use SigNoz Cloud to monitor Azure VMs, AKS, App Service, Container Apps, Functions, SQL Database, Blob Storage, and Cosmos DB with metrics, logs, and traces correlated in one OTel-native platform.',
  twitter: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz Cloud',
    description:
      'Use SigNoz Cloud to monitor Azure VMs, AKS, App Service, Container Apps, Functions, SQL Database, Blob Storage, and Cosmos DB with metrics, logs, and traces correlated in one OTel-native platform.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
}

export default function AzureMonitoring() {
  return <AzureMonitoringPage />
}
