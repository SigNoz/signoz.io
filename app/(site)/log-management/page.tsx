import React from 'react'
import LogManagement from './LogManagement'
import { Metadata } from 'next'
import RelatedPageLinks from '@/components/RelatedPageLinks/RelatedPageLinks'
import { getRelatedPageLinks } from '@/utils/relatedPageLinks'

const SEO_TITLE = 'Log Management Tool - Ingest, Search & Analyze Logs at Scale'

export const metadata: Metadata = {
  title: {
    absolute: `${SEO_TITLE} | SigNoz`,
  },
  openGraph: {
    title: `${SEO_TITLE} | SigNoz`,
    description:
      'Ingest, search, and analyze logs at scale with SigNoz Cloud, then correlate them with metrics and traces for faster debugging.',
    images: '/img/platform/LogsManagementHero.webp',
  },
  description:
    'Ingest, search, and analyze logs at scale with SigNoz Cloud, then correlate them with metrics and traces for faster debugging.',
  twitter: {
    title: `${SEO_TITLE} | SigNoz`,
    description:
      'Ingest, search, and analyze logs at scale with SigNoz Cloud, then correlate them with metrics and traces for faster debugging.',
    images: '/img/platform/LogsManagementHero.webp',
  },
}

export default function LogManagementPage() {
  return (
    <>
      <RelatedPageLinks entry={getRelatedPageLinks('/log-management', SEO_TITLE)} />
      <LogManagement />
    </>
  )
}
