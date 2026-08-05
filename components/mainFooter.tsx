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
  newTab?: boolean
  className?: string
}

function isSigNozOwnedHref(href: string): boolean {
  if (href.startsWith('/') || href.startsWith('#')) {
    return true
  }

  try {
    const { hostname } = new URL(href)
    return hostname === 'signoz.io' || hostname.endsWith('.signoz.io')
  } catch {
    return false
  }
}

function FooterPillLink({
  href,
  children,
  external = false,
  newTab = false,
  className = '',
}: FooterPillLinkProps) {
  const classes = `footer-pill-link mt-5 ${className}`.trim()
  const isOwned = isSigNozOwnedHref(href)

  if ((external || newTab) && isOwned) {
    return (
      <Link href={href} className={classes} target="_blank" prefetch={false}>
        {children}
      </Link>
    )
  }

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener nofollow">
        {children}
      </a>
    )
  }

  if (newTab) {
    return (
      <Link href={href} className={classes} target="_blank" prefetch={false}>
        {children}
      </Link>
    )
  }

  return (
    <Link href={href} className={classes} prefetch={false}>
      {children}
    </Link>
  )
}

type FooterProps = {
  /** When true, only render on /docs routes (content-column placement). Site layout omits this. */
  inDocsShell?: boolean
}

function Footer({ inDocsShell = false }: FooterProps) {
  const pathname = usePathname()
  const isLoginRoute = pathname === '/login/'
  const isTeamsRoute = pathname === '/teams/'
  const isContactUsRoute = pathname === '/contact-us/'
  const isDocsRoute = pathname?.startsWith('/docs') ?? false

  if (isLoginRoute || isTeamsRoute || isContactUsRoute) {
    return null
  }

  // Docs footer lives beside the sidenav inside DocsShell — not under the full site chrome.
  if (inDocsShell ? !isDocsRoute : isDocsRoute) {
    return null
  }

  return (
    <div className="z-[10] flex flex-col justify-center border-t border-solid border-[var(--l1-border)] bg-[var(--l1-background-60)] backdrop-blur-[10px]">
      <div
        className={`flex w-full items-center px-4 py-14 max-md:max-w-full ${
          inDocsShell ? 'justify-start' : 'justify-center'
        }`}
      >
        <div className="w-full max-w-8xl justify-between max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col pb-2.5 text-sm tracking-wide text-[var(--l2-foreground)] max-md:mt-10">
                <div className="text-xs font-medium uppercase leading-5 tracking-wide text-[var(--l1-foreground-hover)]">
                  Docs
                </div>
                <FooterPillLink href="/docs/introduction/">Introduction</FooterPillLink>
                <FooterPillLink href="/docs/contributing/">Contributing</FooterPillLink>
                <FooterPillLink href="/docs/migration/migrate-from-datadog-to-signoz/">
                  Migrate from Datadog
                </FooterPillLink>
                <FooterPillLink href="/api-reference/">SigNoz API</FooterPillLink>
                <div className="mt-10 text-xs font-medium uppercase leading-5 tracking-wide text-[var(--l1-foreground-hover)]">
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
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-[var(--l2-foreground)] max-md:mt-10">
                <div className="text-xs font-medium uppercase leading-5 tracking-wide text-[var(--l1-foreground-hover)]">
                  Community
                </div>

                <FooterPillLink href="/support/">Support</FooterPillLink>
                <FooterPillLink href="https://signoz.io/slack/" newTab>
                  Slack
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="https://x.com/SigNozHQ" newTab>
                  X
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/launch-week/" newTab>
                  Launch Week
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/changelog/">Changelog</FooterPillLink>
                <FooterPillLink href="/docs/dashboards/dashboard-templates/overview/" newTab>
                  Dashboard Templates
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/todaysdevopswordle/" newTab>
                  DevOps Wordle
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="https://newsletter.signoz.io/" newTab>
                  Newsletter
                </FooterPillLink>
                <FooterPillLink href="/events/kubecon-cloudnativecon-north-america-2025/" newTab>
                  KubeCon, Atlanta 2025
                  <ArrowUpRight size={16} />
                </FooterPillLink>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-[var(--l2-foreground)] max-md:mt-10">
                <div className="text-xs font-medium uppercase leading-5 tracking-wide text-[var(--l1-foreground-hover)]">
                  More
                </div>

                <FooterPillLink href="/datadog-alternative/">SigNoz vs Datadog</FooterPillLink>
                <FooterPillLink href="/newrelic-alternative/">SigNoz vs New Relic</FooterPillLink>
                <FooterPillLink href="/grafana-alternative/">SigNoz vs Grafana</FooterPillLink>
                <FooterPillLink href="/product-comparison/signoz-vs-dynatrace/">
                  SigNoz vs Dynatrace
                </FooterPillLink>
                <FooterPillLink href="https://signoz.io/careers/" newTab>
                  Careers
                  <ArrowUpRight size={16} />
                </FooterPillLink>
                <FooterPillLink href="/about-us/">About</FooterPillLink>
                <FooterPillLink href="/terms-of-service/">Terms</FooterPillLink>
                <FooterPillLink href="/privacy/">Privacy</FooterPillLink>
                <FooterPillLink href="https://trust.signoz.io/" newTab>
                  Security & Compliance
                </FooterPillLink>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-end max-md:mt-10 max-md:items-start">
                <div className="flex items-center justify-between gap-2 self-end whitespace-nowrap text-center text-lg font-medium leading-5 text-[var(--l1-foreground)] max-md:self-start">
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
                <div className="mt-5 flex items-center justify-end gap-2 rounded text-[13px] font-medium leading-none tracking-[-0.065px] text-[var(--callout-success-description)] max-md:justify-start">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-[var(--callout-success-description)]"
                    aria-hidden
                  />
                  <Link href="https://status.signoz.io/" target="_blank" prefetch={false}>
                    All systems operational
                  </Link>
                </div>
                <div className="footer-icons mt-5 flex items-end justify-between gap-4 py-2 text-[var(--l2-foreground)] max-md:justify-start [&_a:hover]:text-[var(--l1-foreground)] [&_path]:fill-current [&_svg]:fill-current">
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
                    className="cursor-pointer opacity-60 invert transition-opacity hover:opacity-100 dark:invert-0"
                    src="/svgs/icons/hipaa.svg"
                    width={90}
                    height={90}
                    alt="HIPAA"
                    loading="lazy"
                    onClick={() => window.open('https://trust.signoz.io/', '_blank')}
                  />
                  <Image
                    className="cursor-pointer rounded-full opacity-60 invert transition-opacity hover:opacity-100 dark:shadow-[0px_0_40px_0_color-mix(in_srgb,var(--base-white)_27%,transparent)] dark:invert-0"
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
