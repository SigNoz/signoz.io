import Link from 'next/link'
import type { SuggestedDoc } from './types'

type NotFoundRecoveryProps = {
  pathname: string
  suggestions: SuggestedDoc[]
  suggestionIntro: string
}

export default function NotFoundRecovery({
  pathname,
  suggestions,
  suggestionIntro,
}: NotFoundRecoveryProps) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-signoz_ink-500 px-4 sm:px-6">
      <div className="bg-dot-pattern masked-dots pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 mx-auto h-80 w-full flex-shrink-0 rounded-full bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90 opacity-30 blur-3xl sm:h-[28rem] md:h-[56rem]" />
      <section
        className="relative z-10 mx-auto -mt-8 w-full max-w-2xl text-center sm:-mt-10"
        aria-labelledby="not-found-title"
      >
        <p className="text-4xl font-semibold leading-none text-signoz_robin-500 sm:text-5xl">404</p>
        <h1
          id="not-found-title"
          className="mt-4 text-2xl font-medium leading-8 text-signoz_vanilla-100"
        >
          Page Not Found
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-signoz_vanilla-300">
          We could not find{' '}
          <code className="rounded bg-signoz_ink-300 px-1.5 py-0.5">{pathname}</code>.{' '}
          {suggestionIntro}
        </p>

        <ul className="mt-8 list-none space-y-3 p-0">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-base leading-6 text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
