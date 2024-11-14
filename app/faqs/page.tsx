'use client'

import { allFAQs } from 'contentlayer/generated'
import Link from 'next/link'
import { useState } from 'react'

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter out drafts, sort by date, and filter by search term
  const faqs = allFAQs
    .filter((faq) => !faq.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((faq) => 
      faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="relative bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-0 pt-12 md:!w-[80vw] md:px-5 md:pt-24">
        <div className="w-full space-y-2 pb-8 md:space-y-5">
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-signoz_vanilla-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-lg leading-7 text-signoz_vanilla-400">
            Find answers to common questions about SigNoz's features, capabilities, and implementation
          </p>
          
          <div className="mx-auto mt-6 max-w-xl">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 px-4 py-2 text-signoz_vanilla-100 placeholder-signoz_vanilla-400 focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full py-10">
          <ul className="space-y-6">
            {faqs.map((faq) => (
              <li key={faq.slug}>
                <Link
                  href={`/faqs/${faq.slug}`}
                  className="block transform rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-6 shadow-md transition duration-500 hover:shadow-lg"
                >
                  <article>
                    <div>
                      <h2 className="mb-3 text-xl font-bold leading-8 tracking-tight text-signoz_vanilla-100">
                        {faq.title}
                      </h2>
                      <p className="prose mb-3 max-w-none text-signoz_vanilla-400 line-clamp-3">
                        {faq.description}
                      </p>
                    </div>
                    <div className="text-base font-medium leading-6 text-primary-500 hover:text-primary-400">
                      Read more &rarr;
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
