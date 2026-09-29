'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

import { LAUNCH_WEEK_6_ANNOUNCEMENTS } from './LaunchWeek6.constants'

const MainSection: React.FC = () => {
  return (
    <>
      <section className="flex w-full flex-col items-start px-20 pt-12 font-medium max-md:max-w-full max-md:px-5">
        <Card
          className="container !mt-[-40px] mb-0 flex max-h-full max-w-full flex-col bg-transparent !px-0 md:ml-5"
          style={{
            backgroundImage: "url('/img/launch_week/launch-week-3-bg.svg')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
          }}
        >
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="mt-10 flex max-w-full flex-col">
              <div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row">
                <div className="max-w-full px-6 font-mono text-xl text-signoz_vanilla-400 max-md:max-w-full">
                  {'// OCTOBER 12 \u2015 16'}
                </div>
                <div className="flex flex-row items-center gap-4 px-6">
                  <div className="inline-block h-3 w-3 rounded-sm bg-signoz_forest-500" />
                  <div className="pr-2 font-mono text-lg uppercase text-signoz_vanilla-400 max-md:max-w-full sm:text-xl">
                    ONLINE | WORLDWIDE | OCT 12 - 16 | 9AM PT
                  </div>
                </div>
              </div>
              <h1 className="mt-8 max-w-full border-b-2 border-dashed border-signoz_slate-200/50 px-6 text-5xl font-medium uppercase text-signoz_vanilla-100 max-md:max-w-full max-md:text-4xl">
                Launch Week{' '}
                <span className="launch-week-counter rounded bg-signoz_cherry-500 text-signoz_vanilla-100">
                  6.0
                </span>
              </h1>
            </div>
            <div className="z-10 mt-11 self-stretch border-b-2 border-dashed border-signoz_slate-200/50 px-6 pb-6 font-mono text-base font-medium leading-8 text-signoz_vanilla-400 max-md:mt-10 max-md:max-w-full">
              <p className="mb-0 max-w-5xl">
                Join us for a week of launches that go deeper on core observability workflows. Get
                live walkthroughs
                <br className="hidden lg:block" /> from the engineers who built them, see what’s
                new, and ask questions along the way.
              </p>
            </div>
          </div>

          <div className="z-[1] my-6 ml-5 flex min-h-[40px] w-fit items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-white px-4 py-2 text-sm leading-none text-signoz_ink-500">
            <a
              href="https://luma.com/signoz-launch-week-6"
              target="_blank"
              rel="noopener noreferrer"
              id="launch-week-6-subscribe"
            >
              <div className="flex items-center gap-1.5">
                <Image
                  src="/svgs/icons/subscribe.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                <span className="px-2 py-1 text-sm font-medium leading-none text-neutral-950">
                  Subscribe for updates
                </span>
              </div>
            </a>
          </div>

          {LAUNCH_WEEK_6_ANNOUNCEMENTS.map((announcement, index) => (
            <div
              key={announcement.title}
              className="flex flex-col justify-between gap-4 border-b-2 border-t border-dashed border-signoz_slate-200/50 px-6 py-6 lg:flex-row lg:gap-6"
            >
              <div className="flex shrink-0 flex-col items-start gap-6 self-stretch lg:w-72 lg:pr-4">
                <div className="w-max whitespace-nowrap font-mono text-sm font-medium uppercase leading-6 text-signoz_vanilla-400 sm:text-base">
                  <div>{announcement.date}</div>
                  <div>{announcement.time}</div>
                </div>
                <a
                  href={announcement.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`btn-register-launch-week-6-${index + 1}`}
                  className="button-background inline-flex min-h-10 w-fit items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-signoz_vanilla-100 no-underline transition-colors hover:bg-signoz_ink-300 hover:text-signoz_vanilla-100 lg:mt-auto lg:w-full"
                >
                  Register Now
                </a>
              </div>
              <a
                href={announcement.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`card-register-launch-week-6-${index + 1}`}
                className="launch-week-card-background group flex w-[864px] max-w-full flex-col gap-6 rounded-md border border-signoz_slate-500 p-6 text-inherit no-underline transition-colors duration-300 hover:bg-signoz_ink-300 hover:text-inherit lg:flex-row"
              >
                <div className="relative aspect-[40/21] w-full shrink-0 overflow-hidden rounded-sm lg:w-3/5">
                  <Image
                    src={announcement.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 52vw, calc(100vw - 88px)"
                    className="object-cover"
                    aria-hidden="true"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-signoz_vanilla-100">
                      {announcement.title}
                    </h2>
                    <p className="mb-0 text-sm font-normal leading-6 text-signoz_vanilla-400">
                      {announcement.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="button-background flex h-8 w-8 transform items-center justify-center rounded-full transition-transform group-hover:translate-x-1.5">
                      <ArrowRight size={14} aria-hidden="true" />
                      <span className="sr-only">Register for {announcement.title}</span>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Card>
      </section>
      <GetStarted page="launch-week-6" />
    </>
  )
}

export default MainSection

interface GetStartedProps {
  page: string
}

const GetStarted: React.FC<GetStartedProps> = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <Card className="flex flex-col gap-16 bg-transparent px-20 font-medium max-md:max-w-full max-md:px-5">
      <div className="bg-[url('/img/background_blur/Frame_2185.webp')] bg-[length:45%] bg-[center_top_-12rem] sm:bg-no-repeat">
        <section className="container flex max-h-full max-w-full flex-col !px-0">
          <div className="bg-blur-ellipse-206">
            <div className="flex flex-col gap-12">
              <p className="mb-0 mt-20 text-center text-4xl font-bold">
                Get started with <br /> SigNoz Cloud today
              </p>
              <div className="mb-10 flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                <Button variant="legacyPrimary" id={getStartedId}>
                  <Link href="/teams/" className="flex-center">
                    Get Started - Free
                    <ArrowRight size={14} />
                  </Link>
                </Button>

                <Button variant="legacySecondary" id={readDocumentationId}>
                  <Link href="/docs/introduction/" className="flex-center">
                    <BookOpen size={14} />
                    Read Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <Image
                src="/img/landing/landing_thumbnail.webp"
                alt="SigNoz dashboard showing application performance metrics"
                width={2400}
                height={1194}
                className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
              />
            </div>
          </div>
        </section>
      </div>
    </Card>
  )
}
