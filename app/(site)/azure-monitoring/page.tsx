import AzureMonitoringPage from './AzureMonitoringPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Azure Monitoring with One-Click Integration | SigNoz',
  },
  openGraph: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz',
    description:
      'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
  description:
    'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
  twitter: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz',
    description:
      'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
}

export default function AzureMonitoring() {
  return <AzureMonitoringPage />
}
