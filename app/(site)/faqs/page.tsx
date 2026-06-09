import { getAllContent } from '@/utils/contentRepository'
import { notFound } from 'next/navigation'
import FAQsClient from './FAQsClient'
import { getTagValues } from '@/utils/contentHelpers'

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

export default async function FAQsPage() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    const response = await getAllContent('faqs', deploymentStatus, null)

    if (!response) {
      console.error('Invalid FAQ content response')
      notFound()
    }

    // Transform the data to match the client component's expected format
    const faqs = response.map((faq) => ({
      title: faq.title,
      description: faq.description,
      path: faq.path,
      date: faq.date,
      tags: getTagValues(faq),
      draft: faq.deployment_status === 'draft',
    }))

    // Sort by date (since API sorts but we want to ensure client side too)
    const sortedFaqs = faqs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return <FAQsClient faqs={sortedFaqs} />
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    notFound()
  }
}
