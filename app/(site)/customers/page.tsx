import type { Metadata } from 'next'

import type { CustomerStory } from '@/components/Customers/Customers.types'
import siteMetadata from '@/data/siteMetadata'
import { fetchAllCaseStudiesForPage } from '@/utils/cachedData'

import CustomersPage from './CustomersPage'
import { CUSTOMERS_PAGE_CONTENT } from './customersPageContent'

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

function getCustomerStories(caseStudyCards: CustomerStory[]): CustomerStory[] {
  return [...caseStudyCards].sort((a, b) => {
    const dateDiff = (b.publishedAt || '').localeCompare(a.publishedAt || '')
    if (dateDiff !== 0) return dateDiff
    return a.company.localeCompare(b.company)
  })
}

export default async function Page() {
  const caseStudyCards = await fetchAllCaseStudiesForPage()
  const stories = getCustomerStories(caseStudyCards)

  return <CustomersPage content={CUSTOMERS_PAGE_CONTENT} stories={stories} />
}
