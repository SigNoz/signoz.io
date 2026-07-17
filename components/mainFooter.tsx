'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Github, Linkedin, Slack, Twitter, Youtube } from '@/components/social-icons/SolidIcons'
import { usePathname } from 'next/navigation'
import './footer/footer-pill-links.css'

type FooterPillLinkProps = {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}

function FooterPillLink({ href, children, external = false, className = '' }: FooterPillLinkProps) {
  const classes = `footer-pill-link mt-5 ${className}`.trim()

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer nofollow">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} prefetch={false}>
      {children}
    </Link>
  )
}

function Footer() {
  const pathname = usePathname()
  const isLoginRoute = pathname === '/login/'
  const isTeamsRoute = pathname === '/teams/'
  const isContactUsRoute = pathname === '/contact-us/'

  if (isLoginRoute || isTeamsRoute || isContactUsRoute) {
    return null
  }

  return (
    <div className="z-[10] flex flex-col justify-center border-t border-solid border-gray-900 bg-signoz_ink-500 bg-opacity-70 backdrop-blur-md">
      <div className="flex w-full items-center justify-center bg-opacity-70 px-4 py-14 max-md:max-w-full">
        <div className="w-full max-w-8xl justify-between max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col pb-2.5 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide">Docs</div>
                <FooterPillLink href="/docs/introduction/">Introduction</FooterPillLink>
                <FooterPillLink href="/docs/contributing/">Contributing</FooterPillLink>
                <FooterPillLink href="/docs/migration/migrate-from-datadog-to-signoz/">
                  Migrate from Datadog
                </FooterPillLink>
                <FooterPillLink href="/api-reference/">SigNoz API</FooterPillLink>
                <div className="mt-10 text-sm font-semibold uppercase leading-5 tracking-wide">
                  OpenTelemetry
                </div>
                <FooterPillLink href="/opentelemetry/">What is OpenTelemetry</FooterPillLink>
                <FooterPillLink href="/blog/opentelemetry-collector-complete-guide/">
                  OpenTelemetry Collector Guide
                </FooterPillLink>
                <FooterPillLink href="/blog/opentelemetry-demo/">OpenTelemetry Demo</FooterPillLink>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide">
                  Community
                </div>

                <FooterPillLink href="/support/">Support</FooterPillLink>
                <FooterPillLink href="https://signoz.io/slack/" external>
                  Slack
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="https://x.com/SigNozHQ" external>
                  X
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/launch-week/" external>
                  Launch Week
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/changelog/">Changelog</FooterPillLink>
                <FooterPillLink href="/docs/dashboards/dashboard-templates/overview/" external>
                  Dashboard Templates
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/todaysdevopswordle/" external>
                  DevOps Wordle
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="https://newsletter.signoz.io/" external>
                  Newsletter
                </FooterPillLink>
                <FooterPillLink href="/events/kubecon-cloudnativecon-north-america-2025/" external>
                  KubeCon, Atlanta 2025
                  <ArrowUpRight size={16} />
                </FooterPillLink>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide">More</div>

                <FooterPillLink href="/datadog-alternative/">SigNoz vs Datadog</FooterPillLink>
                <FooterPillLink href="/newrelic-alternative/">SigNoz vs New Relic</FooterPillLink>
                <FooterPillLink href="/grafana-alternative/">SigNoz vs Grafana</FooterPillLink>
                <FooterPillLink href="/product-comparison/signoz-vs-dynatrace/">
                  SigNoz vs Dynatrace
                </FooterPillLink>
                <FooterPillLink href="https://signoz.io/careers/" external>
                  Careers
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/about-us/">About</FooterPillLink>
                <FooterPillLink href="/terms-of-service/">Terms</FooterPillLink>
                <FooterPillLink href="/privacy/">Privacy</FooterPillLink>
                <FooterPillLink href="https://trust.signoz.io/" external>
                  Security & Compliance
                </FooterPillLink>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-end shadow-sm max-md:mt-10">
                <div className="flex items-center justify-between gap-2 self-end whitespace-nowrap text-center text-lg font-medium leading-5 text-white">
                  <Link href="/" prefetch={false} className="flex items-center gap-2">
                    <Image
                      className="h-5 w-auto"
                      src="/img/SigNozLogo-orange.svg"
                      width={50}
                      height={50}
                      alt="SigNoz - Open Source Datadog Alternative"
                      title="Open Source Datadog Alternative"
                      loading="lazy"
                    />
                    <div className="font-satoshi-bold font-medium">SigNoz</div>
                  </Link>
                </div>
                <div className="mt-5 items-end justify-center rounded text-sm leading-5 text-emerald-300">
                  <Link href="https://status.signoz.io/" target="_blank" prefetch={false}>
                    All systems operational
                  </Link>
                </div>
                <div className="footer-icons mt-5 flex items-end justify-between gap-4 py-2">
                  <Link
                    href={'https://github.com/SigNoz'}
                    target="_blank"
                    aria-label="SigNoz Github URL"
                    prefetch={false}
                  >
                    <Github />
                  </Link>

                  <Link
                    href={'https://www.linkedin.com/company/signozio/'}
                    target="_blank"
                    aria-label="SigNoz LinkedIN URL"
                    prefetch={false}
                  >
                    <Linkedin />
                  </Link>

                  <Link
                    href={'https://signoz.io/slack/'}
                    target="_blank"
                    aria-label="SigNoz Slack Connect URL"
                    prefetch={false}
                  >
                    <Slack />
                  </Link>

                  <Link
                    href={'https://x.com/SigNozHQ'}
                    target="_blank"
                    aria-label="SigNoz Twitter URL"
                    prefetch={false}
                  >
                    <Twitter />
                  </Link>

                  <Link
                    href={'https://www.youtube.com/@signoz'}
                    target="_blank"
                    aria-label="SigNoz Youtube Channel URL"
                    prefetch={false}
                  >
                    <Youtube />
                  </Link>
                </div>
                <div className="mt-5 flex flex-row gap-8">
                  <Image
                    className="cursor-pointer opacity-60 hover:opacity-100"
                    src="/svgs/icons/hipaa.svg"
                    width={90}
                    height={90}
                    alt="HIPAA"
                    loading="lazy"
                    onClick={() => window.open('https://trust.signoz.io/', '_blank')}
                  />
                  <Image
                    className="cursor-pointer rounded-full opacity-60 shadow-[0px_0_40px_0_rgba(255,255,255,0.27)] transition-opacity hover:opacity-100"
                    src="/svgs/icons/SOC-2.svg"
                    width={60}
                    height={60}
                    alt="SOC-2"
                    loading="lazy"
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
