import { Metadata } from 'next'
import siteMetadata from '../../data/siteMetadata.js' 

export const metadata: Metadata = {
  title: 'Frequently Asked Questions about SigNoz',
  description: 'Find answers to common questions about SigNoz - the open-source observability platform.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/faqs`,
  },
} 