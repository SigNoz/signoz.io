import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, HeartHandshakeIcon } from 'lucide-react'
import Admonition from '@/components/Admonition/Admonition'

export const metadata: Metadata = {
  title: 'SigNoz Expert Contributors Program (Closed)',
}

export default function Page() {
  return (
    <div className="mx-auto mt-10 max-w-5xl px-6">
      <h1 className="text-l1-foreground text-4xl font-bold tracking-tight">
        SigNoz Expert Contributors Program
      </h1>

      <div className="mt-6">
        <Admonition type="info" title="This program is now closed">
          <p>
            We are no longer accepting new applications. Thank you to everyone who participated and
            contributed - your work has made real impact on SigNoz and the broader observability
            community.
          </p>
        </Admonition>
      </div>

      <Image
        width={1200}
        height={675}
        priority={true}
        src="/img/ecp-cover.webp"
        alt="SigNoz Expert Contributors Program"
        className="mt-10 w-full rounded-lg"
      />

      <div className="mt-16">
        <h2 className="text-l1-foreground flex items-center gap-2 text-2xl font-semibold">
          A Heartfelt Thank You{' '}
          <HeartHandshakeIcon className="text-danger-foreground inline-block h-6 w-6" />
        </h2>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          The SigNoz Expert Contributors Program brought together talented professionals from across
          the observability space to help build dashboards, documentation, and resources used by
          thousands of developers worldwide. We&apos;re incredibly grateful for every contribution
          made through this program.
        </p>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          Your dashboards, tutorials, and documentation continue to help developers monitor,
          optimize, and maintain their applications with ease. The impact of your work lives on in
          the SigNoz ecosystem.
        </p>
      </div>

      <hr className="border-border my-12 border-t border-dashed" />

      <div>
        <h2 className="text-l1-foreground flex items-center gap-2 text-2xl font-semibold">
          We Still Welcome Contributions
        </h2>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          While the formal program has ended, SigNoz remains an open-source project at heart - and
          we always welcome community contributions. Here are some ways you can get involved:
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ContributionCard
            title="Open a PR"
            description="Bug fixes, feature improvements, and dashboard contributions are always appreciated."
            href="https://github.com/SigNoz/signoz"
            linkText="View on GitHub"
          />
          <ContributionCard
            title="Improve the Docs"
            description="Help us make our documentation even better by submitting improvements or new guides."
            href="https://signoz.io/docs/introduction/"
            linkText="Read the docs"
          />
          <ContributionCard
            title="Share Dashboards"
            description="Contribute monitoring dashboards for technologies and use cases you know well."
            href="https://github.com/SigNoz/dashboards"
            linkText="View dashboards"
          />
          <ContributionCard
            title="Join the Community"
            description="Connect with other users and contributors in our Slack community."
            href="https://signoz.io/slack/"
            linkText="Join Slack"
          />
        </div>
      </div>

      <p className="text-muted-foreground mt-16 text-center text-base leading-relaxed">
        Thank you for being part of the SigNoz journey.
        <br />
        We look forward to continued collaboration with the community!
      </p>
    </div>
  )
}

function ContributionCard({
  title,
  description,
  href,
  linkText,
}: {
  title: string
  description: string
  href: string
  linkText: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group border-border bg-card/50 hover:border-primary/60 hover:bg-card flex flex-col justify-between rounded-xl border p-5 transition-all duration-200"
      prefetch={false}
    >
      <div>
        <h3 className="text-sm leading-snug font-medium text-white/90 group-hover:text-white">
          {title}
        </h3>
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{description}</p>
      </div>
      <div className="text-accent-primary/60 group-hover:text-accent-primary mt-4 flex items-center gap-1 text-xs transition-all duration-200 group-hover:gap-2">
        <span>{linkText}</span>
        <ArrowRight size={12} />
      </div>
    </Link>
  )
}
