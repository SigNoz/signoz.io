import type { Metadata } from 'next'
import Script from 'next/script'

import LaunchWeek from './LaunchWeek'

const title = 'Launch Week 6.0 | October 12 - 16 2026 | SigNoz'
const description =
  'Join SigNoz Launch Week 6.0. Live sessions on logs, traces, infra monitoring, MCP and access control, with the engineers who built them. Oct 12–16 2026.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  openGraph: {
    title,
    description,
    url: 'https://signoz.io/launch-week/',
    siteName: 'SigNoz',
    images: '/img/events/launch-week-6/engg first.webp',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: '/img/events/launch-week-6/engg first.webp',
  },
}

export default function LaunchWeekPage() {
  return (
    <>
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
      <LaunchWeek />
    </>
  )
}
