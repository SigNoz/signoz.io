import GoogleCloudMonitoringPage from './GoogleCloudMonitoringPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Google Cloud Monitoring with SigNoz | OTel-Native GCP Observability',
  },
  openGraph: {
    title: 'Google Cloud Monitoring with SigNoz | OTel-Native GCP Observability',
    description:
      'Monitor every Google Cloud service - Cloud Run, GKE, Compute Engine, Cloud SQL, Pub/Sub, Cloud Storage, App Engine, Cloud Functions, and more - in a single OTel-native backend. Correlated metrics, logs, and traces. No per-metric charges. No proprietary agents.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
  description:
    'Monitor every Google Cloud service - Cloud Run, GKE, Compute Engine, Cloud SQL, Pub/Sub, Cloud Storage, App Engine, Cloud Functions, and more - in a single OTel-native backend. Correlated metrics, logs, and traces. No per-metric charges. No proprietary agents.',
  twitter: {
    title: 'Google Cloud Monitoring with SigNoz | OTel-Native GCP Observability',
    description:
      'Monitor every Google Cloud service - Cloud Run, GKE, Compute Engine, Cloud SQL, Pub/Sub, Cloud Storage, App Engine, Cloud Functions, and more - in a single OTel-native backend. Correlated metrics, logs, and traces. No per-metric charges. No proprietary agents.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
}

export default function GoogleCloudMonitoring() {
  return <GoogleCloudMonitoringPage />
}
