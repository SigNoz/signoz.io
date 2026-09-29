'use client'

import * as React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import { LAUNCH_WEEK_6_ANNOUNCEMENTS, LAUNCH_WEEK_CTA_BUTTONS } from './LaunchWeek.constants'

const DIVIDER_CLASS_NAME = '!border-t-2 !border-signoz_slate-200/50'

const LaunchWeek: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false} showDotPattern={false}>
      <div className="px-5 pb-16 pt-12 font-medium md:px-0">
        <SectionLayout
          variant="border-x"
          withBackground
          className="!border-2 !border-signoz_slate-200/50 !px-0"
        >
          <div
            style={{
              backgroundImage: "url('/img/launch_week/launch-week-3-bg.svg')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right',
            }}
          >
            <header className="flex w-full flex-col pt-[74px] md:pt-20">
              <div className="mt-[3px] flex flex-col justify-between gap-6 px-6 md:mt-0 lg:flex-row">
                <div className="max-w-full font-mono text-xl text-signoz_vanilla-400">
                  {'// OCTOBER 12 \u2015 16'}
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="inline-block h-3 w-3 rounded-sm bg-signoz_forest-500" />
                  <div className="pr-2 font-mono text-lg uppercase text-signoz_vanilla-400 sm:text-xl">
                    ONLINE | WORLDWIDE | OCT 12 - 16 | 9AM PT
                  </div>
                </div>
              </div>
              <h1 className="order-first mb-0 mt-[26px] max-w-full px-6 text-4xl font-medium uppercase text-signoz_vanilla-100 md:order-none md:mt-8 md:text-5xl">
                Launch Week{' '}
                <span className="launch-week-counter rounded bg-signoz_cherry-500 text-signoz_vanilla-100">
                  6.0
                </span>
              </h1>
            </header>

            <Divider className={`${DIVIDER_CLASS_NAME} mt-8`} />

            <div className="z-10 px-6 py-10 font-mono text-base font-medium leading-8 text-signoz_vanilla-400">
              <p className="mb-0 max-w-5xl">
                Join us for a week of launches that go deeper on core observability workflows. Get
                live walkthroughs
                <br className="hidden lg:block" /> from the engineers who built them, see what’s
                new, and ask questions along the way.
              </p>
            </div>

            <Divider className={DIVIDER_CLASS_NAME} />

            <div className="px-6 py-8">
              <a
                href="https://luma.com/signoz-launch-week-6"
                target="_blank"
                rel="noopener noreferrer"
                id="launch-week-6-subscribe"
                className="z-[1] flex min-h-10 w-fit items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-white px-4 py-2 text-sm leading-none text-signoz_ink-500 no-underline hover:text-signoz_ink-500"
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

            <Divider className={DIVIDER_CLASS_NAME} />

            {LAUNCH_WEEK_6_ANNOUNCEMENTS.map((announcement, index) => (
              <React.Fragment key={announcement.title}>
                <div className="flex flex-col justify-between gap-4 px-6 py-6 lg:flex-row lg:gap-6">
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
                      className="button-background hidden min-h-10 w-fit items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-signoz_vanilla-100 no-underline transition-colors hover:bg-signoz_ink-300 hover:text-signoz_vanilla-100 md:inline-flex lg:mt-auto lg:w-full"
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
                <Divider className={DIVIDER_CLASS_NAME} />
              </React.Fragment>
            ))}

            <CTABanner
              title={
                <>
                  Get started with <br /> SigNoz Cloud today
                </>
              }
              buttons={LAUNCH_WEEK_CTA_BUTTONS}
              className="bg-transparent"
            />
          </div>
        </SectionLayout>
      </div>
    </FeaturePageLayout>
  )
}

export default LaunchWeek
