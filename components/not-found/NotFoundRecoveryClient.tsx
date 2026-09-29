'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SuggestedDoc } from './types'
import { QUICK_LINK_FALLBACK } from './constants'

type SuggestionsResponse = {
  suggestions: SuggestedDoc[]
  suggestionIntro: string
}

export default function NotFoundRecoveryClient() {
  const pathname = usePathname()
  const [suggestions, setSuggestions] = useState<SuggestedDoc[]>(QUICK_LINK_FALLBACK)
  const [suggestionIntro, setSuggestionIntro] = useState('You might be looking for:')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/not-found-suggestions?pathname=${encodeURIComponent(pathname)}&count=3`
        )
        if (response.ok) {
          const data: SuggestionsResponse = await response.json()
          setSuggestions(data.suggestions)
          setSuggestionIntro(data.suggestionIntro)
        }
      } catch {
        // Keep fallback suggestions on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchSuggestions()
  }, [pathname])

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--l1-background)] px-4 sm:px-6">
      <div className="bg-dot-pattern masked-dots pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 mx-auto h-80 w-full flex-shrink-0 rounded-full bg-gradient-to-b from-[var(--l2-background-60)] via-[var(--l3-background-60)] to-[var(--l2-background)] opacity-30 blur-3xl sm:h-[28rem] md:h-[56rem]" />
      <section
        className="relative z-10 mx-auto -mt-8 w-full max-w-2xl text-center sm:-mt-10"
        aria-labelledby="not-found-title"
      >
        <p className="text-4xl font-semibold leading-none text-[var(--accent-primary)] sm:text-5xl">
          404
        </p>
        <h1
          id="not-found-title"
          className="mt-4 text-2xl font-medium leading-8 text-[var(--l1-foreground)]"
        >
          Page Not Found
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[var(--l2-foreground)]">
          We could not find{' '}
          <code className="rounded bg-[var(--l3-background)] px-1.5 py-0.5">{pathname}</code>.{' '}
          {suggestionIntro}
        </p>

        <ul className="mt-8 list-none space-y-3 p-0">
          {suggestions.map((item) => (
            <li key={item.href} className={isLoading ? 'animate-pulse' : ''}>
              <Link
                href={item.href}
                className="text-base leading-6 text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
                prefetch={false}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-3 list-none space-y-3 p-0">
          <li className={isLoading ? 'animate-pulse' : ''}>
            <Link
              href="https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=404_page&utm_campaign=newsletter"
              className="text-base leading-6 text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
              target="_blank"
              prefetch={false}
            >
              Newsletter - Observability Real Talk
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
