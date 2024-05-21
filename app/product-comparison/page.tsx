import Hero from '@/components/ui/Hero'
import Link from 'next/link'
import { Children } from 'react'

const comparisons = [
  {
    id: 1,
    title: 'SigNoz vs Datadog | SigNoz',
    url: '/product-comparison/signoz-vs-datadog',
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
    url: '/product-comparison/signoz-vs-dynatrace',
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
    url: '/product-comparison/signoz-vs-grafana',
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
    url: '/product-comparison/signoz-vs-newrelic',
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
      <h2 className="font-heading text-gradient mt-8 px-8 text-center text-4xl font-bold tracking-normal ">
        Product Comparisons
      </h2>

      <div className="my-8 flex flex-wrap">
        {comparisons.map((comparison) => {
          return (
            <div className="col col--6">
              <div className="card-demo margin--md">
                <Link href={comparison.url}>
                  <div className="card-dark min-h-[240px] rounded-sm border p-4">
                    <div className="card__header">
                      <div className="avatar">
                        <div className="avatar__intro">
                          <h2 className="avatar__name mb-0 text-2xl">{comparison.title}</h2>
                          {/* <small className="avatar__subtitle">{comparison.designation}</small> */}
                        </div>
                      </div>
                    </div>

                    <div className="card__body">{comparison?.desc}</div>
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
