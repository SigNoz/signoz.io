import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Product Comparisons',
  description: 'Product Comparisons | SigNoz',
  openGraph: {
    title: 'Product Comparisons | SigNoz',
    description: 'Product Comparisons | SigNoz',
    url: `${siteMetadata.siteUrl}/product-comparison`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Product Comparisons | SigNoz',
    description: 'Product Comparisons | SigNoz',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/product-comparison`,
  },
}

const comparisons = [
  {
    id: 1,
    title: 'SigNoz vs Datadog',
    url: '/datadog-alternative/',
    desc: (
      <>
        For 20 APM and 50 infra hosts, SigNoz can save up to 90% of your Datadog bill - check{' '}
        <Link
          href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
          className="highlight"
        >
          comparison with detailed spreadsheet
        </Link>
        .
      </>
    ),
  },
  {
    id: 2,
    title: 'SigNoz vs Dynatrace',
    url: '/product-comparison/signoz-vs-dynatrace/',
    desc: (
      <>
        Dynatrace is complex to set up and use. Its host-based billing is outdated for applications
        that need on-demand scaling. SigNoz provides predictable usage-based billing that you can
        rely on.
      </>
    ),
  },
  {
    id: 3,
    title: 'SigNoz vs Grafana',
    url: '/grafana-alternative/',
    desc: (
      <>
        Under the hood, Grafana is powered by multiple tools like Loki, Tempo, Mimir & Prometheus.
        SigNoz is built as a single tool to serve logs, metrics, and traces in a single pane of
        glass from Day 1.
      </>
    ),
  },
  {
    id: 4,
    title: 'SigNoz vs NewRelic',
    url: '/newrelic-alternative/',
    desc: (
      <>
        Tired of New Relic’s user-based pricing? Even for teams of 10-15 devs, New Relic’s pricing
        for user seats can be a significant portion of your monthly bill - check{' '}
        <Link
          href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
          className="highlight"
        >
          comparison with detailed spreadsheet
        </Link>
        .
      </>
    ),
  },
]

export default function ProductComparisons() {
  return (
    <div className="container mx-auto">
      <h2 className="font-heading text-gradient mt-8 px-8 text-center text-4xl font-bold tracking-normal">
        Product Comparisons
      </h2>

      <div className="my-8 flex flex-wrap">
        {comparisons.map((comparison) => {
          return (
            <div className="w-full p-4 md:w-1/2" key={comparison.id}>
              <Link href={comparison.url}>
                <div className="border-border bg-card min-h-[240px] rounded-md border p-4">
                  <h2 className="text-l1-foreground mb-3 text-2xl font-semibold">
                    {comparison.title}
                  </h2>
                  <div className="text-foreground">{comparison?.desc}</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
