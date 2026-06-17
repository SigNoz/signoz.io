'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import CustomLink from '@/components/Link'
import { Github } from '@/components/social-icons/SolidIcons'

type CustomerStory = {
  description: string
  href: string
  logoAlt: string
  logoClassName?: string
  logoSrc: string
  metric: string
  title: string
}

type GitHubStarsResponse = {
  stars?: number
}

const customerStories: CustomerStory[] = [
  {
    title: 'Blip',
    description:
      'Traced production requests end-to-end, surfaced slow database calls, and improved issue resolution time by 14x.',
    href: '/case-study/blip/',
    logoAlt: 'Blip logo',
    logoSrc: '/img/users/blip_logo.webp',
    metric: '14x faster issue resolution',
  },
  {
    title: 'Mailmodo',
    description:
      'Centralized 200GB+ daily logs from 200+ microservices so support teams could self-serve customer issues.',
    href: '/case-study/mailmodo/',
    logoAlt: 'Mailmodo logo',
    logoSrc: '/img/case_study/mailmodo-logo-white.svg',
    metric: '6 hours saved daily',
  },
  {
    title: 'Brainfish',
    description:
      'Replaced Elastic with SigNoz to monitor Kubernetes workloads, track AI token usage, and correlate logs with metrics.',
    href: '/case-study/brainfish/',
    logoAlt: 'Brainfish logo',
    logoSrc: '/img/users/brainfish-icon.svg',
    metric: 'Kubernetes and AI monitoring',
    logoClassName: 'rounded-xl bg-white p-2',
  },
]

function formatStars(stars: number) {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`
  }

  return String(stars)
}

function GitHubProof() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchStars() {
      try {
        const response = await fetch('/api/github-stars/')
        if (!response.ok) {
          return
        }

        const data: GitHubStarsResponse = await response.json()
        if (isMounted && Number.isFinite(data.stars)) {
          setStars(data.stars ?? null)
        }
      } catch {
        // Keep the proof line useful even if the stars endpoint is unavailable.
      }
    }

    fetchStars()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <CustomLink
      className="inline-flex h-10 items-center gap-2 rounded-full border border-signoz_slate-400/45 bg-signoz_ink-400/70 px-4 text-sm font-medium text-signoz_vanilla-100 transition-colors hover:border-signoz_robin-400/45 hover:bg-signoz_slate-500"
      href="https://github.com/SigNoz/signoz"
      target="_blank"
    >
      <Github className="h-4 w-4 fill-signoz_vanilla-100" />
      <span>{stars === null ? 'Open source on GitHub' : `${formatStars(stars)} GitHub stars`}</span>
      <span aria-hidden="true">-&gt;</span>
    </CustomLink>
  )
}

function StoryCard({ story }: { story: CustomerStory }) {
  return (
    <CustomLink
      className="bg-signoz_ink-500/72 group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[22px] border border-signoz_slate-400/45 p-8 transition-colors hover:border-signoz_robin-400/50"
      href={story.href}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(78,116,248,0.16),transparent_38%)] opacity-80 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(190,198,207,0.045)_1px,transparent_1px),linear-gradient(rgba(190,198,207,0.045)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      <div className="relative">
        <div className="mb-12 flex h-16 w-16 items-center justify-center rounded-full border border-signoz_slate-400/35 bg-white/[0.04]">
          <Image
            alt={story.logoAlt}
            className={`max-h-10 w-auto object-contain ${story.logoClassName ?? ''}`}
            height={42}
            src={story.logoSrc}
            width={42}
          />
        </div>

        <p className="m-0 text-sm font-medium uppercase tracking-[0.12em] text-signoz_robin-300">
          {story.metric}
        </p>
        <h3 className="m-0 mt-4 text-[26px] font-medium leading-tight tracking-[-0.45px] text-signoz_vanilla-100">
          {story.title}
        </h3>
        <p className="m-0 mt-4 max-w-[360px] text-[16px] leading-7 tracking-[-0.15px] text-signoz_vanilla-400">
          {story.description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="relative mt-8 inline-flex text-xl text-signoz_vanilla-300 transition-transform duration-200 group-hover:translate-x-1"
      >
        -&gt;
      </span>
    </CustomLink>
  )
}

export default function CustomerStoriesExperiment() {
  return (
    <section
      className="homepage-variant-only relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-4 py-24 sm:px-6 lg:px-[78px] lg:py-32"
      data-homepage-floating-cta="Read customer stories"
      data-homepage-floating-href="/case-study/"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="m-0 max-w-[720px] text-[40px] font-medium leading-[1.04] tracking-[-1.1px] text-signoz_vanilla-100 md:text-[56px] md:tracking-[-1.6px]">
              Production stories from teams running SigNoz.
            </h2>
            <p className="m-0 mt-4 max-w-[720px] text-[18px] leading-8 tracking-[-0.2px] text-signoz_vanilla-400">
              See how engineering teams use SigNoz to debug faster, reduce tool sprawl, and keep
              production reliable.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <GitHubProof />
            <CustomLink
              className="group inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              href="/case-study/"
            >
              Read customer stories
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                -&gt;
              </span>
            </CustomLink>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {customerStories.map((story) => (
            <StoryCard key={story.title} story={story} />
          ))}
        </div>
      </div>
    </section>
  )
}
