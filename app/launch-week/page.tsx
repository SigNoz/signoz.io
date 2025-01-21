import React from 'react'
import MainSection from './LaunchWeek'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    absolute: 'Launch Week 3.0 | Feb 10 - 14 | 9 AM PT',
  },
  openGraph: {
    title: 'Launch Week 3.0 | Feb 10 - 14 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/launch_week/launch-week-meta.webp',
  },
  description: 'Join us for a week of announcing new features at 9 AM PT daily.',
  twitter: {
    title: 'Launch Week 3.0 | Feb 10 - 14 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/launch_week/launch-week-meta.webp',
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
