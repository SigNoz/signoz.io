import { fetchMDXContentByPath, MDXContentApiResponse } from '@/utils/strapi'
import { notFound } from 'next/navigation'
import FAQsClient from './FAQsClient'

export const revalidate = 0
export const dynamicParams = true

export default async function FAQsPage() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const deploymentStatus = isProduction ? 'live' : 'staging'

  try {
    // Fetch all FAQs from Strapi
    const response = (await fetchMDXContentByPath(
      'faqs',
      undefined,
      deploymentStatus,
      true
    )) as MDXContentApiResponse

    if (!response || !response.data) {
      console.error('Invalid response from Strapi')
      notFound()
    }

    // Transform the data to match the client component's expected format
    const faqs = response.data.map((faq) => ({
      title: faq.title,
      description: faq.description,
      path: faq.path,
      date: faq.date,
      tags: faq.tags?.map((tag) => tag.value) || [],
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
