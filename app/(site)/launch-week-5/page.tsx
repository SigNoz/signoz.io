import React from 'react'
import LaunchWeek5 from './LaunchWeek5'
import type { Metadata } from 'next'
import Script from 'next/script'

const title = 'Launch Week 5.0 | September 8 - 12 | SigNoz'
const description =
  'Watch Launch Week 5.0 sessions on interactive dashboards, Query Builder v5, OSS improvements, trace operators, and cost control.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  openGraph: {
    title,
    description,
    url: 'https://signoz.io/launch-week-5/',
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

export default function LaunchWeek5Page() {
  return (
    <>
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
      <LaunchWeek5 />
    </>
  )
}
