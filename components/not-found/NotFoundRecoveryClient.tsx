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
    <main className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="bg-dot-pattern masked-dots pointer-events-none absolute inset-0" />
      <div className="from-ink-500/50 via-ink-500/25 to-ink-500/90 pointer-events-none absolute top-0 right-0 left-0 mx-auto h-80 w-full flex-shrink-0 rounded-full bg-gradient-to-b opacity-30 blur-3xl sm:h-[28rem] md:h-[56rem]" />
      <section
        className="relative z-10 mx-auto -mt-8 w-full max-w-2xl text-center sm:-mt-10"
        aria-labelledby="not-found-title"
      >
        <p className="text-primary text-4xl leading-none font-semibold sm:text-5xl">404</p>
        <h1 id="not-found-title" className="text-l1-foreground mt-4 text-2xl leading-8 font-medium">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-7">
          We could not find{' '}
          <code className="bg-l3-background rounded px-1.5 py-0.5">{pathname}</code>.{' '}
          {suggestionIntro}
        </p>

        <ul className="mt-8 list-none space-y-3 p-0">
          {suggestions.map((item) => (
            <li key={item.href} className={isLoading ? 'animate-pulse' : ''}>
              <Link
                href={item.href}
                className="text-accent-primary hover:text-accent-primary text-base leading-6 transition-colors"
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
              className="text-accent-primary hover:text-accent-primary text-base leading-6 transition-colors"
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
