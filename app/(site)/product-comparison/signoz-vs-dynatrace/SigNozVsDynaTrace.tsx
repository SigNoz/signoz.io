import React from 'react'
import TopReasons from '@/components/comparison/top-reasons'
import Migration from '@/components/comparison/migration'
import Hero from '@/components/comparison/hero'
import ComparisonGrid from '@/components/comparison/grid'
import GetStarted from '@/components/comparison/get-started'
import ComparisonLayout from '@/components/comparison/layout'
import Link from 'next/link'

function SigNozVSDynatrace() {
  return (
    <div title="SigNoz vs Dynatrace">
      <ComparisonLayout>
        <Hero
          title={COMPARISON_DATA.HERO.TITLE}
          desc={COMPARISON_DATA.HERO.DESC}
          billForComparison={COMPARISON_DATA.HERO.BILL_FOR_COMPARISON}
          trySigNozCloud={COMPARISON_DATA.HERO.TRY_SIGNOZ_CLOUD}
          selfHost={COMPARISON_DATA.HERO.SELF_HOST}
        />
        <Migration title={COMPARISON_DATA.MIGRATE.TITLE} desc={COMPARISON_DATA.MIGRATE.DESC} />
        <TopReasons
          title={COMPARISON_DATA.REASON_TITLE}
          reasons={COMPARISON_DATA.REASONS}
          withElonMuskReason
        />
        <ComparisonGrid comparisonData={COMPARISON_DATA.COMPARISON} />
        <GetStarted withMigrationSupport data={COMPARISON_DATA.MIGRATION_SUPPORT} />
      </ComparisonLayout>
    </div>
  )
}

export default SigNozVSDynatrace

const COMPARISON_DATA = {
  HERO: {
    TITLE: <>SigNoz Cloud vs Dynatrace</>,
    DESC: (
      <>
        Dynatrace Platform Subscription uses a published rate card across host, memory, and
        telemetry usage. SigNoz Cloud uses data-volume pricing for logs and traces and sample-based
        pricing for metrics.
      </>
    ),
    BILL_FOR_COMPARISON: {
      path: '/comparisons/dynatrace-savings/',
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
  MIGRATE: {
    TITLE: <>Migrate from Dynatrace to SigNoz Cloud with ease.</>,
    DESC: (
      <>
        We provide support for migrating from Dynatrace to SigNoz Cloud.
        <br />
        <Link href="/product-comparison/migrate-from-dynatrace/" className="highlight">
          Request a migration support
        </Link>{' '}
        from one of our experts and get started with SigNoz Cloud quickly.
      </>
    ),
  },
  REASON_TITLE: <>In depth: SigNoz Cloud vs Dynatrace</>,
  REASONS: [
    {
      FIGURE: '/img/reasons/ot-native.webp',
      TITLE: <>SigNoz is OpenTelemetry native </>,
      DESC: (
        <>
          OpenTelemetry is the second most active project in the CNCF, with only Kubernetes being
          more active. Using an open source standard like OpenTelemetry for generating telemetry
          signals frees you from vendor lock-in. SigNoz is built to support OpenTelemetry from Day
          1.
          <br />
          We provide features like application exceptions to traces from OTel data for fast
          debugging.
        </>
      ),
    },
    {
      FIGURE: '/img/reasons/use-of-columnar-database-for-faster-ingestion-and-aggregation.webp',
      TITLE: <>Use of columnar database for faster ingestion & aggregation </>,
      DESC: (
        <>
          SigNoz uses ClickHouse - a fast open source column-oriented database. Ingestion and
          aggregation are lightning fast, while providing best-in-class compression for economical
          storage. Learn{' '}
          <Link
            href="https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast"
            className="highlight"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            why is ClickHouse so fast
          </Link>
          .
        </>
      ),
    },
    {
      FIGURE: '/img/reasons/dynatrace-host-based-billing.webp',
      TITLE: <>Compare Dynatrace rate-card pricing with usage-based pricing</>,
      DESC: (
        <>
          Dynatrace Platform Subscription uses rate-card units such as hosts, memory-GiB-hours,
          ingested telemetry, retention, and query volume. SigNoz Cloud prices logs and traces by
          ingested volume and metrics by samples, without per-host charges.{' '}
          <Link href="/teams/" className="highlight">
            Sign up
          </Link>{' '}
          for a free cloud trial to get started.
        </>
      ),
    },
    {
      FIGURE: '/img/reasons/dynatrace-complex-ui.webp',
      TITLE: <>Compare the platform scope your team needs</>,
      DESC: (
        <>
          Dynatrace offers application, infrastructure, log, digital experience, security, and other
          capabilities through its platform subscription.
          <br />
          SigNoz Cloud includes its observability features in the Teams plan and bills additional
          use by telemetry volume.
        </>
      ),
    },
    {
      FIGURE: '/img/reasons/dynatrace-send-data-directly.webp',
      TITLE: <>Send data directly from applications without needing any host-based agents</>,
      DESC: (
        <>
          ​SigNoz supports OpenTelemetry libraries for application instrumentation. You don’t need
          to install any host-based agents. Using OpenTelemetry libraries gives you the flexibility
          to send data to any backend.
          <br />
          If your use case requires, you can also run the OpenTelemetry collector as an agent to
          collect data.
        </>
      ),
    },
  ],
  COMPARISON: {
    TITLE: <>SigNoz Cloud and Dynatrace Side by Side</>,
    OTHER_HEADING: 'Dynatrace',
    DATA: [
      {
        sideHeader: 'Self-hosted edition available',
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: 'Self-Hosted SigNoz is available as a separate deployment option.',
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
        sideHeader: 'Synthetic Monitoring',
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'Runtime Vulnerability Analytics',
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: 'OpenTelemetry ingestion',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
        signozExtraDetail: 'Built to ingest OpenTelemetry data.',
        otherExtraDetail: 'Supports OpenTelemetry metrics and traces.',
      },
      {
        sideHeader: 'Managed On-premise deployment',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
        signozExtraDetail: 'Provides enterprise-grade managed on-premise deployment.',
      },
      {
        sideHeader: 'Transparent usage-based billing',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
        signozExtraDetail: 'Logs and traces by GB; metrics by samples.',
        otherExtraDetail:
          'Published rate card covers hosts, memory, telemetry, retention, and queries.',
      },
      {
        sideHeader: 'Managed cloud service',
        isAvailableInSignoz: true,
        isAvailableInOther: true,
        signozExtraDetail: 'SigNoz Cloud is managed by SigNoz.',
        otherExtraDetail: 'Dynatrace provides its platform as a managed service.',
      },
    ],
  },
  MIGRATION_SUPPORT: {
    HACKER_THREAD_TITLE: '',
    TITLE: <>Migrate from Dynatrace to SigNoz Cloud with ease.</>,
    DESC: (
      <>
        We provide support for migrating from Dynatrace to SigNoz Cloud.{' '}
        <Link href="/product-comparison/migrate-from-dynatrace/" className="highlight">
          Request a migration support
        </Link>{' '}
        from one of our experts and get started with SigNoz Cloud quickly.
      </>
    ),
  },
}
