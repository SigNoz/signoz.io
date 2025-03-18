'use client'

import { allFAQs } from 'contentlayer/generated'
import Link from 'next/link'
import { useState } from 'react'
import { TrieveModalSearch } from 'trieve-search-component'
import "trieve-search-component/styles"

export default function FAQsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get unique tags from all FAQs
  const allTags = Array.from(
    new Set(
      allFAQs
        .filter((faq) => !faq.draft)
        .flatMap((faq) => faq.tags || [])
    )
  ).sort()

  // Filter only by tags now since search is handled by Trieve
  const faqs = allFAQs
    .filter((faq) => !faq.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((faq) => 
      selectedTags.length === 0 || selectedTags.some(tag => faq.tags?.includes(tag))
    )

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] sm:h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-24">
        <div className="w-full space-y-4 sm:space-y-6">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-signoz_vanilla-100">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-base sm:text-lg leading-relaxed text-signoz_vanilla-400 max-w-2xl mx-auto">
            Find answers to common questions about SigNoz's features, capabilities, and implementation
          </p>
          
          <div className="mx-auto mt-6 sm:mt-8 w-full max-w-xl px-4 flex flex-col">
            <TrieveModalSearch
              theme="dark"
              apiKey='tr-cK2MylVI0my78NUoafAiTvvmpdktntO3'
              datasetId='4650e231-7857-45aa-beb1-cb52006a2460'
              defaultSearchQueries={[
                "How does SigNoz ensure data security and privacy?",
                "Who uses SigNoz in production?",
                "Can SigNoz handle large-scale production environments effectively?",
              ]}
              defaultAiQuestions={[
                "What is SigNoz?",
                "How to change retention period?",
                "How do I install SigNoz?",
              ]}
              brandColor="#E75536"
              brandName='SigNoz'
              brandLogoImgSrcUrl="https://avatars.githubusercontent.com/u/76905799?s=200&v=4"
              ButtonEl={() => (
                <div className="w-full rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 px-4 py-2 text-signoz_vanilla-100 placeholder-signoz_vanilla-400 focus:border-primary-500 focus:outline-none flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <span className="text-signoz_vanilla-400">Ask a question about SigNoz</span>
                </div>
              )}
            />

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-500 text-signoz_vanilla-100'
                      : 'bg-signoz_ink-400 text-signoz_vanilla-400 hover:bg-signoz_ink-300'
                  } border border-signoz_slate-400`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full py-8 sm:py-10">
          <ul className="space-y-4 p-2 sm:space-y-6">
            {faqs.map((faq) => (
              <li key={faq.slug}>
                <Link
                  href={`/faqs/${faq.slug}`}
                  className="block transform rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 sm:p-6 shadow-md transition duration-500 hover:shadow-lg"
                >
                  <article>
                    <div>
                      <h2 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold leading-snug tracking-tight text-signoz_vanilla-100">
                        {faq.title}
                      </h2>
                      <p className="prose mb-3 max-w-none text-sm sm:text-base text-signoz_vanilla-400 line-clamp-3">
                        {faq.description}
                      </p>
                    </div>
                    <div className="text-sm sm:text-base font-medium leading-6 text-primary-500 hover:text-primary-400">
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
