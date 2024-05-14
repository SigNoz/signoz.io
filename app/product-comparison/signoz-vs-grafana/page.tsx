import React from 'react'
import TopReasons from '../../../components/comparison/top-reasons'
import Hero from '../../../components/comparison/hero'
import ComparisonGrid from '../../../components/comparison/grid'
import GetStarted from '../../../components/comparison/get-started'
import ComparisonLayout from '../../../components/comparison/layout'
import Link from 'next/link'
import { ShowCompanyLogos } from '@/components/company-logos'

function SigNozVSGrafana() {
  return (
    <div title="SigNoz vs Grafana">
      <ComparisonLayout>
        <Hero
          title={COMPARISON_DATA.HERO.TITLE}
          desc={COMPARISON_DATA.HERO.DESC}
          billForComparison={COMPARISON_DATA.HERO.BILL_FOR_COMPARISON}
          trySigNozCloud={COMPARISON_DATA.HERO.TRY_SIGNOZ_CLOUD}
          selfHost={COMPARISON_DATA.HERO.SELF_HOST}
        />
        <TopReasons
          points
          title={COMPARISON_DATA.REASON_TITLE}
          reasons={COMPARISON_DATA.REASONS_QNA}
        />
        <ComparisonGrid comparisonData={COMPARISON_DATA.COMPARISON} />
        <TopReasons title={COMPARISON_DATA.REASON_TITLE} reasons={COMPARISON_DATA.REASONS} />
        <ShowCompanyLogos />
        <GetStarted data={COMPARISON_DATA.MIGRATION_SUPPORT} withMigrationSupport />
      </ComparisonLayout>
    </div>
  )
}

export default SigNozVSGrafana

const COMPARISON_DATA = {
  HERO: {
    TITLE: <>In-Depth: SigNoz vs Grafana</>,
    DESC: (
      <>
        Under the hood, Grafana is powered by multiple tools like Loki, Tempo, Mimir & Prometheus.
        SigNoz is built as a single tool to serve logs, metrics, and traces in a single pane of
        glass from Day 1.
      </>
    ),
    BILL_FOR_COMPARISON: {
      path: '/comparisons/newrelic-savings/',
      className: 'button--primary',
      isVisible: false,
    },
    TRY_SIGNOZ_CLOUD: {
      path: '/teams/',
      className: 'button--primary',
      isVisible: true,
    },
    SELF_HOST: {
      path: '/docs/install/',
      className: 'button--outline button--secondary',
      isVisible: true,
    },
  },
  COMPARISON: {
    TITLE: <>Side by Side Comparison</>,
    OTHER_HEADING: 'Grafana',
    DATA: [
      {
        sideHeader: 'Open Source',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'Logs, Metrics, Traces',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'APM',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'Alerts',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'Single Backend',
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        otherExtraDetail:
          'Has multiple backends. Loki for logs, Tempo for traces, and Mimir for metrics',
      },
      {
        sideHeader: 'OpenTelemetry visualization',
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: 'Best visualizations for OTel data',
      },
      {
        sideHeader: 'No user-based pricing',
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: 'Free unlimited user seats',
        otherExtraDetail: '$20 per active user',
      },
      {
        sideHeader: 'Exceptions Monitoring',
        isAvailableInSignoz: true,
        isAvailableInOther: false,
      },
      {
        sideHeader: 'Synthetic Monitoring',
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'Incident Response',
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'Easy self-host',
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        otherExtraDetail: 'Have to manage multiple backends and configurations',
      },
      {
        sideHeader: 'Analytics on high cardinality data',
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        otherExtraDetail: 'Loki is not built for high cardinality data',
      },
    ],
  },
  REASON_TITLE: '',
  REASONS: [
    {
      FIGURE: '/img/reasons/signoz-vs-grafana-bill.webp',
      TITLE: <>SigNoz is also better value for money.</>,
      DESC: (
        <>
          <p>
            We did a pricing comparsion of SigNoz with other popularity observability tools
            including Grafana. SigNoz can save up to 45% of your Grafana bill.
          </p>
          <Link
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
            className="button button--primary"
          >
            Read our pricing comparison
          </Link>
        </>
      ),
    },
  ],
  REASONS_QNA: [
    {
      reason: <>SigNoz is built as a single application to serve logs, metrics, and traces.</>,
      reasonDesc: (
        <>
          <p>
            Grafana started as a data visualization tool. It slowly evolved into a tool that can
            take data from multiple data sources for visualization.
          </p>
          <p>
            For observability, Grafana offers the LGTM stack (Loki for logs, Grafana for
            visualization, Tempo for traces, and Mimir for metrics). You need to configure and
            maintain multiple configurations for a full-stack observability setup.
          </p>
          <p>
            SigNoz is a single application that provides logs, metrics and traces under a single
            pane of glass. Ingestion, storage, and querying of signals are optimized for ease of use
            and intelligent out-of-box correlation between the three signals. There is less
            operational overhead and better developer experience with SigNoz.
          </p>
        </>
      ),
    },
    {
      reason: <>SigNoz is OpenTelemetry-native</>,
      reasonDesc: (
        <>
          <p>
            OpenTelemetry is the second most active project in the CNCF, with only Kubernetes being
            more active. Using an open source standard like OpenTelemetry for generating telemetry
            signals frees you from vendor lock-in. SigNoz is built to support OpenTelemetry from Day
            1.
          </p>
          <p>
            We provide features like application exceptions to traces from OTel data for fast
            debugging. Grafana also supports OpenTelemetry. But it uses different backends for
            different signals - Loki for logs and Tempo for traces.
          </p>
        </>
      ),
    },
    {
      reason: <>SigNoz uses columnar database for faster ingestion & aggregation</>,
      reasonDesc: (
        <>
          <p>
            SigNoz uses ClickHouse - a fast open source distributed columnar database. Ingestion and
            aggregations are lightning-fast while providing best-in-class compression for economical
            storage. It was built to do analytical queries like Group By fast. Read more on{' '}
            <Link
              href="https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast"
              className={'highlight'}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              what makes ClickHouse so fast
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      reason: <>Loki was not built to index and query high-cardinality data</>,
      reasonDesc: (
        <>
          <p>Loki doesn’t perform well if you want to index and query high-cardinality data.</p>
          <h3 className="highlight-secondary margin-vert--md">
            “As a Loki user or operator, your goal should be to use the fewest labels possible to
            store your logs. (Source:{' '}
            <Link
              href="https://grafana.com/blog/2020/08/27/the-concise-guide-to-labels-in-loki/"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              <em>Grafana</em>
            </Link>
            )”
          </h3>
          <p>
            We did a{' '}
            <Link className={'highlight'} href="/blog/logs-performance-benchmark/">
              logs performance benchmark
            </Link>{' '}
            of SigNoz with Elasticsearch and Loki. Below are our key findings for Loki for
            ingestion, querying, and storage:
          </p>
          <ul>
            <li>Ingestion is mostly limited by the number of streams that it can handle.</li>
            <li>For our test queries, Loki was not able to return the results.</li>
            <li>Loki took the least amount of storage as it indexed only two keys.</li>
          </ul>
          <p>
            SigNoz is able to perform fast aggregation queries and also has efficient resource
            utilization during ingestion.
          </p>
        </>
      ),
    },
    {
      reason: <>SigNoz is much easier to self-host</>,
      reasonDesc: (
        <>
          If you want a self-hosted solution, SigNoz is a better choice. Since Grafana has multiple
          backends for different telemetry signals, it’s difficult to manage. With SigNoz, you only
          need to manage a single backend for a full-stack observability setup. We also provide{' '}
          <Link href="/pricing/" className={'highlight'}>
            managed self-host services
          </Link>
          .
        </>
      ),
    },
  ],
  MIGRATION_SUPPORT: {
    HACKER_THREAD_TITLE: '',
    TITLE: <>Still undecided? Let us help.</>,
    DESC: (
      <>
        If you have concerns about whether SigNoz is a good fit or not, let us chat.{' '}
        <Link
          href="mailto:support@signoz.io?subject=Question on SigNoz vs Grafana!"
          className="highlight"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          Write to us
        </Link>{' '}
        with your queries and we will get back to you.
      </>
    ),
  },
}
