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
      className="group inline-flex items-center gap-2 text-sm font-medium text-signoz_vanilla-300 transition-colors hover:text-signoz_robin-300"
      href="https://github.com/SigNoz/signoz"
      target="_blank"
    >
      <Github className="h-4 w-4 fill-current" />
      <span>{stars === null ? 'Open source on GitHub' : `${formatStars(stars)} GitHub stars`}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        -&gt;
      </span>
    </CustomLink>
  )
}

function StoryCard({ story }: { story: CustomerStory }) {
  return (
    <CustomLink
      className="border-signoz_slate-400/22 group relative flex min-h-[300px] flex-col justify-between overflow-hidden border bg-[#07090d] p-8 transition-colors hover:border-signoz_robin-400/50"
      href={story.href}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.08),transparent_34%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(190,198,207,0.035)_1px,transparent_1px),linear-gradient(rgba(190,198,207,0.035)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />

      <div className="relative">
        <div className="mb-12 flex h-14 w-14 items-center justify-center border border-signoz_slate-400/25 bg-white/[0.035]">
          <Image
            alt={story.logoAlt}
            className={`max-h-9 w-auto object-contain opacity-85 transition-opacity group-hover:opacity-100 ${
              story.logoClassName ?? ''
            }`}
            height={42}
            src={story.logoSrc}
            width={42}
          />
        </div>

        <p className="m-0 text-[12px] font-medium uppercase tracking-[0.14em] text-signoz_robin-400">
          {story.metric}
        </p>
        <h3 className="m-0 mt-5 text-[24px] font-medium leading-tight tracking-[-0.35px] text-signoz_vanilla-100">
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
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="m-0 max-w-[760px] text-[40px] font-medium leading-[1.04] tracking-[-1.1px] text-signoz_vanilla-100 md:text-[58px] md:tracking-[-1.65px]">
              Production stories from teams running SigNoz.
            </h2>
          </div>

          <div className="max-w-[430px]">
            <p className="m-0 text-[17px] leading-8 tracking-[-0.2px] text-signoz_vanilla-400">
              See how engineering teams use SigNoz to debug faster, reduce tool sprawl, and keep
              production reliable.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3">
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
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div
              className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
              style={{ left: 'calc(33.333333% - 6.333px)' }}
            />
            <div
              className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
              style={{ left: 'calc(33.333333% - 0.333px)' }}
            />
            <div
              className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
              style={{ left: 'calc(66.666667% + 0.333px)' }}
            />
            <div
              className="absolute bottom-0 top-0 w-px bg-signoz_slate-400/30"
              style={{ left: 'calc(66.666667% + 6.333px)' }}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {customerStories.map((story) => (
              <StoryCard key={story.title} story={story} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
