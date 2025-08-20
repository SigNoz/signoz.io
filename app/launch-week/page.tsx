import React from 'react'
import MainSection from './LaunchWeek'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    absolute: 'Launch Week 5.0 | Sep 08 - 12 | 9 AM PT',
  },
  openGraph: {
    title: 'Launch Week 5.0 | Sep 08 - 12 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/events/launch-week-5/launch-week-5-cover.webp',
  },
  description: 'Join us for a week of announcing new features at 9 AM PT daily.',
  twitter: {
    title: 'Launch Week 5.0 | Sep 08 - 12 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/events/launch-week-5/launch-week-5-cover.webp',
  },
}

export default function LaunchWeekPage() {
  return (
    <>
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
      <MainSection />
    </>
  )
}
