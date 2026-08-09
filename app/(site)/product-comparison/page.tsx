import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Product Comparisons',
  description:
    'Compare SigNoz Cloud with managed observability platforms, with clear Self-Hosted SigNoz labels for self-managed options.',
  openGraph: {
    title: 'Product Comparisons | SigNoz',
    description:
      'Compare SigNoz Cloud with managed observability platforms, with clear Self-Hosted SigNoz labels for self-managed options.',
    url: `${siteMetadata.siteUrl}/product-comparison`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Product Comparisons | SigNoz',
    description:
      'Compare SigNoz Cloud with managed observability platforms, with clear Self-Hosted SigNoz labels for self-managed options.',
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
    title: 'SigNoz Cloud vs Datadog',
    url: '/datadog-alternative/',
    desc: (
      <>
        Compare Datadog with SigNoz Cloud for OpenTelemetry support, product capabilities, and
        usage-based pricing. See the existing{' '}
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
    title: 'SigNoz Cloud vs Dynatrace',
    url: '/product-comparison/signoz-vs-dynatrace/',
    desc: (
      <>
        Compare the Dynatrace platform and its rate-card model with SigNoz Cloud and its usage-based
        pricing.
      </>
    ),
  },
  {
    id: 3,
    title: 'SigNoz Cloud vs Grafana Cloud',
    url: '/grafana-alternative/',
    desc: (
      <>
        Compare Grafana Cloud with SigNoz Cloud. The page also labels Grafana OSS and Self-Hosted
        SigNoz when it discusses self-managed software.
      </>
    ),
  },
  {
    id: 4,
    title: 'SigNoz Cloud vs New Relic',
    url: '/newrelic-alternative/',
    desc: (
      <>
        Compare New Relic user-based and eligible compute-based options with SigNoz Cloud's
        usage-based pricing. See the existing{' '}
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
    id: 5,
    title: 'SigNoz Cloud vs AWS CloudWatch',
    url: '/cloudwatch-alternative/',
    desc: (
      <>
        Compare AWS CloudWatch's service and Region-based charges with SigNoz Cloud's unified
        observability and usage-based pricing.
      </>
    ),
  },
  {
    id: 6,
    title: 'SigNoz Cloud vs Managed ClickStack',
    url: '/clickstack-alternative/',
    desc: (
      <>
        Compare Managed ClickStack with SigNoz Cloud. The page also separates ClickStack OSS from
        Self-Hosted SigNoz.
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
            <div className="col col--6" key={comparison.id}>
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
