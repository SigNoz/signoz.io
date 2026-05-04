'use client'

import Button from '@/components/ui/Button'
import Link from 'next/link'
import React, { useState } from 'react'

interface FAQ {
  title: string
  description: string
  path: string
  date: string
  tags: string[]
  draft: boolean
}

interface FAQsClientProps {
  faqs: FAQ[]
}

export default function FAQsClient({ faqs }: FAQsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get unique tags from all FAQs
  const allTags = Array.from(
    new Set(faqs.filter((faq) => !faq.draft).flatMap((faq) => faq.tags || []))
  ).sort()

  // Filter only by tags
  const filteredFaqs = faqs
    .filter((faq) => !faq.draft)
    .filter(
      (faq) => selectedTags.length === 0 || selectedTags.some((tag) => faq.tags?.includes(tag))
    )

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="relative min-h-screen w-full bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:h-[450px] sm:bg-[center_-500px] md:h-[956px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12 md:py-24 lg:px-8">
        <div className="w-full space-y-4 sm:space-y-6">
          <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-signoz_vanilla-100 sm:text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-signoz_vanilla-400 sm:text-lg">
            Find answers to common questions about SigNoz's features, capabilities, and
            implementation
          </p>
          <div className="mx-auto mt-6 w-full max-w-2xl px-4 sm:mt-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {allTags.map((tag) => (
                <Button
                  isButton
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-2 py-1 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-500 text-signoz_vanilla-100'
                      : 'bg-signoz_ink-400 text-signoz_vanilla-400 hover:bg-signoz_ink-300'
                  } border border-signoz_slate-400`}
                >
                  {tag}
                </Button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <Button
                isButton
                type="button"
                onClick={() => setSelectedTags([])}
                variant="link"
                className="mt-4 w-full justify-center text-xs font-medium text-primary-400 hover:text-primary-300 sm:text-sm"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        <div className="w-full py-8 sm:py-10">
          <ul className="space-y-4 p-2 sm:space-y-6">
            {filteredFaqs.map((faq) => (
              <li key={faq.path}>
                <Link
                  href={`/faqs${faq.path}`}
                  className="block transform rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 shadow-md transition duration-500 hover:shadow-lg sm:p-6"
                >
                  <article>
                    <div>
                      <h2 className="mb-2 text-lg font-bold leading-snug tracking-tight text-signoz_vanilla-100 sm:mb-3 sm:text-xl">
                        {faq.title}
                      </h2>
                      <p className="prose mb-3 line-clamp-3 max-w-none text-sm text-signoz_vanilla-400 sm:text-base">
                        {faq.description}
                      </p>
                    </div>
                    <div className="text-sm font-medium leading-6 text-primary-500 hover:text-primary-400 sm:text-base">
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
