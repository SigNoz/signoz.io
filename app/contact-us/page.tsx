import React from 'react'
import ContactUsLayout from './ContactUsLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Grade Observability at any scale | SigNoz',
  description:
    'Enterprise cloud environment, BYOC (managed by SigNoz in your cloud), or self-hosted options with dedicated support, volume discounts, and dashboard migration.',
  openGraph: {
    title: 'Enterprise Grade Observability at any scale | SigNoz',
    description:
      'Enterprise cloud environment, BYOC (managed by SigNoz in your cloud), or self-hosted options with dedicated support, volume discounts, and dashboard migration.',
    url: 'https://signoz.io/contact-us/',
    siteName: 'SigNoz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Grade Observability at any scale | SigNoz',
    description:
      'Enterprise cloud environment, BYOC (managed by SigNoz in your cloud), or self-hosted options with dedicated support, volume discounts, and dashboard migration.',
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
