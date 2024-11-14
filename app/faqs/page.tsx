import { allFAQs } from 'contentlayer/generated'
import Link from 'next/link'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions about SigNoz',
  description: 'Find answers to common questions about SigNoz - the open-source observability platform.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/faqs`,
  },
}

export default function FAQsPage() {
  // Filter out drafts and sort by date
  const faqs = allFAQs
    .filter((faq) => !faq.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Frequently Asked Questions about SigNoz
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Find answers to common questions about SigNoz's features, capabilities, and implementation
        </p>
      </div>

      <div className="grid gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {faqs.map((faq) => (
          <Link
            key={faq.slug}
            href={`/faqs/${faq.slug}`}
            className="transform rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <article>
              <div>
                <h2 className="mb-3 text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                  {faq.title}
                </h2>
                <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                  {faq.description}
                </p>
              </div>
              <div className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                Read more &rarr;
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
