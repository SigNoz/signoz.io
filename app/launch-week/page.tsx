import React from 'react'
import MainSection from './LaunchWeek'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    absolute: 'Launch Week 2.0 | Sep 16 - 20 | 9 AM PT',
  },
  openGraph: {
    title: 'Launch Week 2.0 | Sep 16 - 20 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/launch_week/launch-week-cover.webp'
  },
  description:
    'Join us for a week of announcing new features at 9 AM PT daily.',
  twitter: {
    title: 'Launch Week 2.0 | Sep 16 - 20 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/launch_week/launch-week-cover.webp'
  }
}

export default function LaunchWeekPage() {
  return <MainSection />
} 