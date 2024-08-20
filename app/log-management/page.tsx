import React from 'react'
import LogManagement from './LogManagement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Log Management | SigNoz',
  },
  openGraph: {
    title: 'Log Management | SigNoz',
    description: 'Ingest logs from anywhere, quickly search and analyze with a powerful query builder, and correlate your logs with other signals. Logs at SigNoz is powered by ClickHouse - a lightning-fast columnar datastore suited for storing logs at scale.',
    images:"/img/platform/LogsManagementHero.webp"
  },
  description:
    'Ingest logs from anywhere, quickly search and analyze with a powerful query builder, and correlate your logs with other signals. Logs at SigNoz is powered by ClickHouse - a lightning-fast columnar datastore suited for storing logs at scale.',
  twitter:{
    title: 'Log Management | SigNoz',
    description: 'Ingest logs from anywhere, quickly search and analyze with a powerful query builder, and correlate your logs with other signals. Logs at SigNoz is powered by ClickHouse - a lightning-fast columnar datastore suited for storing logs at scale.',
    images:"/img/platform/LogsManagementHero.webp",
  }
}

export default function LogManagementPage() {
  return <LogManagement />
}