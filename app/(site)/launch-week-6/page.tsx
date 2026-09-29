import type { Metadata } from 'next'
import Script from 'next/script'

import MainSection from './LaunchWeek6'

const title = 'Launch Week 6.0 | October 12 - 16 | 9 AM PT'
const description =
  'Join Launch Week 6.0 for live walkthroughs of new SigNoz observability workflows, presented by the engineers who built them.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  openGraph: {
    title,
    description,
    url: 'https://signoz.io/launch-week-6/',
    siteName: 'SigNoz',
    images: '/img/events/launch-week-5/launch-week-5-cover.webp',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: '/img/events/launch-week-5/launch-week-5-cover.webp',
  },
}

export default function LaunchWeek6Page() {
  return (
    <>
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
      <MainSection />
    </>
  )
}
