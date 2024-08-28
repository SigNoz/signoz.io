import React from 'react'
import Alerts from './Alerts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Alerts | SigNoz',
  },
  openGraph: {
    title: 'Alerts | SigNoz',
    description: 'Create actionable alerts on metrics, logs, traces and exceptions and get notified in your preferred channel. Creating alerts in SigNoz is easy - just 3 simple steps.',
    images:"/img/features/alerts/alerts-management-signoz.png"
  },
  description:
    'Create actionable alerts on metrics, logs, traces and exceptions and get notified in your preferred channel. Creating alerts in SigNoz is easy - just 3 simple steps.',
  twitter:{
    title: 'Alerts | SigNoz',
    description: 'Create actionable alerts on metrics, logs, traces and exceptions and get notified in your preferred channel. Creating alerts in SigNoz is easy - just 3 simple steps.',
    images:"/img/features/alerts/alerts-management-signoz.png",
  }
}

export default function AlertsPage() {
  return <Alerts />
}