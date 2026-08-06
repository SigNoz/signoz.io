import GoogleCloudMonitoringPage from './GoogleCloudMonitoringPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Google Cloud Monitoring with SigNoz | OTel-Native GCP Observability',
  },
  openGraph: {
    title: 'Google Cloud Monitoring with SigNoz | OTel-Native GCP Observability',
    description:
      'Use SigNoz Cloud to monitor Cloud Run, GKE, Compute Engine, Cloud SQL, Pub/Sub, Cloud Storage, App Engine, Cloud Functions, and more with correlated metrics, logs, and traces.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
  description:
    'Use SigNoz Cloud to monitor Cloud Run, GKE, Compute Engine, Cloud SQL, Pub/Sub, Cloud Storage, App Engine, Cloud Functions, and more with correlated metrics, logs, and traces.',
  twitter: {
    title: 'Google Cloud Monitoring with SigNoz | OTel-Native GCP Observability',
    description:
      'Use SigNoz Cloud to monitor Cloud Run, GKE, Compute Engine, Cloud SQL, Pub/Sub, Cloud Storage, App Engine, Cloud Functions, and more with correlated metrics, logs, and traces.',
    images: '/img/website/hero-tabs/infrastructure.webp',
  },
}

export default function GoogleCloudMonitoring() {
  return <GoogleCloudMonitoringPage />
}
