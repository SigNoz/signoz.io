import AzureMonitoringPage from './AzureMonitoringPage'
import { Metadata } from 'next'
import section3Url from '@/public/img/azure-monitoring/section-3.svg?url'

export const metadata: Metadata = {
  title: {
    absolute: 'Azure Monitoring with One-Click Integration | SigNoz',
  },
  openGraph: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz',
    description:
      'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
    images: section3Url,
  },
  description:
    'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
  twitter: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz',
    description:
      'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
    images: section3Url,
  },
}

export default function AzureMonitoring() {
  return <AzureMonitoringPage />
}
