import React from 'react'
import ContactUsLayout from './ContactUsLayout'
import { Metadata } from 'next'

const contactDescription =
  'Discuss SigNoz Cloud, managed BYOC, or Self-Hosted SigNoz with enterprise pricing, support, deployment responsibility, and migration guidance.'

export const metadata: Metadata = {
  title: 'Enterprise Grade Observability at any scale',
  description: contactDescription,
  openGraph: {
    title: 'Enterprise Grade Observability at any scale | SigNoz',
    description: contactDescription,
    url: 'https://signoz.io/contact-us/',
    siteName: 'SigNoz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Grade Observability at any scale | SigNoz',
    description: contactDescription,
    creator: '@SigNozHQ',
  },
  alternates: {
    canonical: 'https://signoz.io/contact-us/',
  },
  keywords:
    'signoz enterprise, enterprise observability, dedicated cloud, byoc, self-hosted, volume discounts',
}

export default function ContactUsPage() {
  return <ContactUsLayout />
}
