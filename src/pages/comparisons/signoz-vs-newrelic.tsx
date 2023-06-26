import React from "react";
import Layout from "@theme/Layout";
import TopReasons from "../../components/comparison/top-reasons";
import Migration from "../../components/comparison/migration";
import Hero from "../../components/comparison/hero";
import ComparisonGrid from "../../components/comparison/grid";
import GetStarted from "../../components/comparison/get-started";
import ComparisonLayout from "../../components/comparison/layout";
import Link from "@docusaurus/Link";

function SigNozVSNewRelic() {
  return (
    <Layout title="SigNoz vs New Relic">
      <ComparisonLayout>
        <Hero
          title={COMPARISON_DATA.HERO.TITLE}
          desc={COMPARISON_DATA.HERO.DESC}
          billForComparison={COMPARISON_DATA.HERO.BILL_FOR_COMPARISON}
        />
        <Migration
          title={COMPARISON_DATA.MIGRATE.TITLE}
          desc={COMPARISON_DATA.MIGRATE.DESC}
        />
        <TopReasons
          title={COMPARISON_DATA.REASON_TITLE}
          reasons={COMPARISON_DATA.REASONS}
        />
        <ComparisonGrid comparisonData={COMPARISON_DATA.COMPARISON} />
        <GetStarted data={COMPARISON_DATA.MIGRATION_SUPPORT} />
      </ComparisonLayout>
    </Layout>
  );
}

export default SigNozVSNewRelic;

const COMPARISON_DATA = {
  HERO: {
    TITLE: <>SigNoz vs New Relic</>,
    DESC: (
      <>
        Tired of New Relic’s user-based pricing? Even for teams of 10-15 devs,
        New Relic’s pricing for user seats can be a significant portion of your
        monthly bill - check{" "}
        <Link
          href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
          className="highlight"
        >
          comparison with detailed spreadsheet
        </Link>
        .
      </>
    ),
    BILL_FOR_COMPARISON: "/comparisons/newrelic-savings/",
  },
  MIGRATE: {
    TITLE: <>Migrate from New Relic to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from New Relic to SigNoz.
        <br />
        <Link href="/comparisons/migrate-from-newrelic/" className="highlight">
          Request a migration support
        </Link>{" "}
        from one of our experts and get started with SigNoz quickly.
      </>
    ),
  },
  REASON_TITLE: <>Top reasons why devs choose SigNoz over New Relic</>,
  REASONS: [
    {
      FIGURE: "/img/reasons/ot-native.png",
      TITLE: <>SigNoz is OpenTelemetry native </>,
      DESC: (
        <>
          ​OpenTelemetry is the second most active project in the CNCF, with
          only Kubernetes being more active. Using an open source standard like
          OpenTelemetry frees you from vendor lock-in. SigNoz is built to
          support OpenTelemetry from Day 1. New Relic treats OTel data
          differently than data from its own SDKs.
        </>
      ),
    },
    {
      FIGURE:
        "/img/reasons/use-of-columnar-database-for-faster-ingestion-and-aggregation.png",
      TITLE: <>Use of columnar database for faster ingestion & aggregation </>,
      DESC: (
        <>
          SigNoz uses ClickHouse - a fast open source distributed columnar
          database. Ingestion and aggregations are lightening fast, while
          providing best-in-class compression for economical storage. Learn{" "}
          <Link
            href="https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast"
            className="highlight"
          >
            why is ClickHouse so fast
          </Link>
          .
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/new-relic-pricing-collaboration.png",
      TITLE: <>No user-based pricing, collaborate peacefully </>,
      DESC: (
        <>
          User-based pricing is outdated. You never know which engineer might
          need to access the monitoring tool for debugging. At SigNoz, we don’t
          charge based on user seats. New Relic’s user pricing can go up to
          $549/user. Even for teams with 10-15 devs, the cost becomes
          significant. At scale, the cost of adding users can go up to 66% of
          the total bill.{" "}
          <Link
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-user-based-pricing-collaborate-seamlessly-with-signoz"
            className="highlight"
          >
            Learn more.
          </Link>
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/new-relic-bill-saving.png",
      TITLE: <>Save up to 60% on your New Relic bill</>,
      DESC: (
        <>
          For 20 APM hosts, 50 million indexed spans, 50 infra hosts, and 2500
          GB logs data, SigNoz can save 60% of your New Relic bill.{" "}
          <Link
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#cost-comparison-of-signoz-with-datadog-new-relic-and-grafana"
            className="highlight"
          >
            Lean more.
          </Link>
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/we-provided-managed-self-hosted-option.png",
      TITLE: <>We provide managed self-hosted option</>,
      DESC: (
        <>
          You can host SigNoz in your own cloud. We also provide managed
          services. It’s perfect for customers having data privacy and data
          governance requirements.
          <br />
          We have data centers in the EU, US, and India region to help you
          comply with data regulations.{" "}
          <Link href="/teams/" className="highlight">
            Get started for free
          </Link>
          .
        </>
      ),
    },
  ],
  COMPARISON: {
    TITLE: <>Side by Side Comparison</>,
    OTHER_HEADING: "New Relic",
    DATA: [
      {
        sideHeader: "Open Source",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
      },
      {
        sideHeader: "Logs, Metrics, Traces",
        isAvailableInSignoz: true,
        isAvailableInOther: true,
      },
      {
        sideHeader: "OpenTelemetry-Native",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "No vendor lock-in in instrumentation",
        otherExtraDetail:
          "Treats Otel data differently than data from its own SDKs",
      },
      {
        sideHeader: "OpenTelemetry visualization",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "Best visualizations for OTel data",
      },
      {
        sideHeader: "Network monitoring",
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: "Synthetic Monitoring",
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: "Change Tracking",
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: "No user-based pricing",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "Free unlimited user seats",
        otherExtraDetail:
          "Goes up to $549 per user per month for enterprise users",
      },
      {
        sideHeader: "Managed in your cloud options",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail:
          "More suited if you have data privacy and data governance requirements",
        otherExtraDetail: "No self-hosting options available",
      },
      {
        sideHeader: "Host Yourself",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail:
          "Managed self-hosting also available",
      },
    ],
  },
  MIGRATION_SUPPORT: {
    HACKER_THREAD_TITLE: "",
    TITLE: <>Migrate from New Relic to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from New Relic to SigNoz.{" "}
        <Link href="/comparisons/migrate-from-newrelic/" className="highlight">
          Request a migration support
        </Link>{" "}
        from one of our experts and get started with SigNoz quickly.
      </>
    ),
  },
};
