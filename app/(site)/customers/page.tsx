import type { Metadata } from 'next'

import siteMetadata from '@/data/siteMetadata'

import CustomersPage from './CustomersPage'

export const metadata: Metadata = {
  title: {
    absolute: 'Customers | SigNoz',
  },
  description:
    'Meet the engineering teams using SigNoz to debug faster, consolidate observability tools, and run reliable systems at scale.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/customers/`,
  },
  openGraph: {
    title: 'Customers | SigNoz',
    description:
      'Meet the engineering teams using SigNoz to debug faster, consolidate observability tools, and run reliable systems at scale.',
    url: `${siteMetadata.siteUrl}/customers/`,
  },
  twitter: {
    title: 'Customers | SigNoz',
    description:
      'Meet the engineering teams using SigNoz to debug faster, consolidate observability tools, and run reliable systems at scale.',
  },
}

export default function Page() {
  return <CustomersPage />
}
