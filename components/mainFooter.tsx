'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Github, Linkedin, Slack, Twitter, Youtube } from '@/components/social-icons/SolidIcons'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { ONBOARDING_SOURCE } from '../constants/globals'
import { QUERY_PARAMS } from '../constants/queryParams'

function Footer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)
  const isLoginRoute = pathname === '/login/'
  const isTeamsRoute = pathname === '/teams/'
  const isOnboardingRoute = source === ONBOARDING_SOURCE

  if (isLoginRoute || isTeamsRoute || isOnboardingRoute) {
    return null
  }

  return (
    <div className="z-[10] flex flex-col justify-center border-t border-solid border-gray-900 bg-signoz_ink-500 bg-opacity-70 backdrop-blur-md">
      <div className="flex w-full items-center justify-center bg-opacity-70 px-16 py-14 max-md:max-w-full max-md:px-5">
        <div className="container w-full max-w-[1200px] justify-between max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col pb-2.5 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide">Docs</div>
                <Link href="/docs/" className="mt-5 hover:underline">
                  Introduction
                </Link>
                <Link href="/docs/contributing/" className="mt-5 hover:underline">
                  Contributing
                </Link>
                <Link href="/docs/migration/migrate-from-datadog" className="mt-5 hover:underline">
                  Migrate from Datadog
                </Link>
                <Link href="/api_reference/" className="mt-5 hover:underline">
                  SigNoz API
                </Link>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide">
                  Community
                </div>

                <div className="mt-5 flex items-center gap-2 pr-7 hover:underline max-md:pr-5">
                  <Link href="/support">Support</Link>
                </div>

                <div className="mt-5 flex items-center gap-2 pr-7 hover:underline max-md:pr-5">
                  <Link href="https://signoz.io/slack" target="_blank">
                    Slack
                  </Link>
                  <ArrowUpRight size={16} />
                </div>
                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 hover:underline max-md:pr-5">
                  <Link href="https://twitter.com/SigNozHQ" target="_blank">
                    Twitter
                  </Link>
                  <ArrowUpRight size={16} />
                </div>
                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 hover:underline max-md:pr-5">
                  <Link href="/launch-week/" target="_blank">
                    Launch Week
                  </Link>
                  <ArrowUpRight size={16} />
                </div>
                <div className="mt-5 flex items-center gap-2 pr-7 hover:underline max-md:pr-5">
                  <Link href="/changelog">Changelog</Link>
                </div>
                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 hover:underline max-md:pr-5">
                  <Link href="/dashboards" target="_blank">
                    Dashboard Templates
                  </Link>
                  <ArrowUpRight size={16} />
                </div>
                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 hover:underline max-md:pr-5">
                  <Link href="https://newsletter.signoz.io/" target="_blank">
                    Newsletter
                  </Link>
                </div>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide">More</div>

                <Link
                  href="/product-comparison/signoz-vs-datadog/"
                  className="mt-5 hover:underline"
                >
                  SigNoz vs Datadog
                </Link>
                <Link
                  href="/product-comparison/signoz-vs-newrelic/"
                  className="mt-5 hover:underline"
                >
                  SigNoz vs New Relic
                </Link>
                <Link
                  href="/product-comparison/signoz-vs-grafana/"
                  className="mt-5 hover:underline"
                >
                  SigNoz vs Grafana
                </Link>
                <Link
                  href="/product-comparison/signoz-vs-dynatrace/"
                  className="mt-5 hover:underline"
                >
                  SigNoz vs Dynatrace
                </Link>

                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 hover:underline max-md:pr-5">
                  <Link href="https://signoz.io/careers/" target="_blank">
                    Careers
                  </Link>
                  <ArrowUpRight size={16} />
                </div>

                <Link href="/about-us" className="mt-5 hover:underline ">
                  About
                </Link>
                <Link href="/terms-of-service" className="mt-5 hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="mt-5 hover:underline">
                  Privacy
                </Link>

                <Link
                  href="https://trust.signoz.io/"
                  target="_blank"
                  className="mt-5 hover:underline"
                >
                  Security & Compliance
                </Link>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-end shadow-sm max-md:mt-10">
                <div className="flex items-center justify-between gap-2 self-end whitespace-nowrap text-center text-lg font-medium leading-5 text-white">
                  <Image
                    className="h-5 w-auto"
                    src="/img/SigNozLogo-orange.svg"
                    width={50}
                    height={50}
                    alt=""
                  />
                  <div className="font-satoshi-bold font-medium">SigNoz</div>
                </div>
                <div className="mt-5 items-end justify-center rounded text-sm leading-5 text-emerald-300">
                  <Link href="https://status.signoz.io/" target="_blank">
                    All systems operational
                  </Link>
                </div>
                <div className="footer-icons mt-5 flex items-end justify-between gap-4 py-2">
                  <Link
                    href={'https://github.com/SigNoz'}
                    target="_blank"
                    aria-label="SigNoz Github URL"
                  >
                    <Github />
                  </Link>

                  <Link
                    href={'https://www.linkedin.com/company/signozio/'}
                    target="_blank"
                    aria-label="SigNoz LinkedIN URL"
                  >
                    <Linkedin />
                  </Link>

                  <Link
                    href={'https://signoz.io/slack'}
                    target="_blank"
                    aria-label="SigNoz Slack Connect URL"
                  >
                    <Slack />
                  </Link>

                  <Link
                    href={'https://twitter.com/SigNozHQ'}
                    target="_blank"
                    aria-label="SigNoz Twitter URL"
                  >
                    <Twitter />
                  </Link>

                  <Link
                    href={'https://www.youtube.com/@signoz'}
                    target="_blank"
                    aria-label="SigNoz Youtube Channel URL"
                  >
                    <Youtube />
                  </Link>
                </div>
                <div className="mt-5 flex flex-row gap-8">
                  <img
                    className="cursor-pointer opacity-60 hover:opacity-100"
                    src="/svgs/icons/hipaa.svg"
                    width={90}
                    height={90}
                    alt=""
                    onClick={() => window.open('https://trust.signoz.io/', '_blank')}
                  />
                  <img
                    className="cursor-pointer rounded-full opacity-60 shadow-[0px_0_40px_0_rgba(255,255,255,0.27)] transition-opacity hover:opacity-100"
                    src="/svgs/icons/SOC-2.svg"
                    width={60}
                    height={60}
                    alt=""
                    onClick={() => window.open('https://trust.signoz.io/', '_blank')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
