import AzureMonitoringPage from './AzureMonitoringPage'
import { Metadata } from 'next'

// 1 year
export const revalidate = 31536000

export const metadata: Metadata = {
  title: {
    absolute: 'Azure Monitoring with One-Click Integration | SigNoz',
  },
  openGraph: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz',
    description:
      'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
  },
  description:
    'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
  twitter: {
    title: 'Azure Monitoring with One-Click Integration | SigNoz',
    description:
      'Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions, SQL Database, Blob Storage, Cosmos DB — in a single OTel-native ClickHouse backend. Metrics, logs, and traces correlated in one view.',
  },
}

export default function AzureMonitoring() {
  return <AzureMonitoringPage />
}
