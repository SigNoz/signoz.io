import React from 'react'
import ContactUsLayout from './ContactUsLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | SigNoz - Enterprise Grade Observability',
  description:
    'Dedicated support, advanced security & compliance features for your enterprise needs. Our experts will connect to give a brief demo and answer any questions.',
  openGraph: {
    title: 'Contact Us | SigNoz - Enterprise Grade Observability',
    description:
      'Dedicated support, advanced security & compliance features for your enterprise needs. Our experts will connect to give a brief demo and answer any questions.',
    url: 'https://signoz.io/contact-us/',
    siteName: 'SigNoz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | SigNoz - Enterprise Grade Observability',
    description:
      'Dedicated support, advanced security & compliance features for your enterprise needs. Our experts will connect to give a brief demo and answer any questions.',
    creator: '@SigNozHQ',
  },
  alternates: {
    canonical: 'https://signoz.io/contact-us/',
  },
  keywords:
    'signoz contact, enterprise observability, enterprise monitoring, contact signoz, observability demo',
}

export default function ContactUsPage() {
  return <ContactUsLayout />
}
