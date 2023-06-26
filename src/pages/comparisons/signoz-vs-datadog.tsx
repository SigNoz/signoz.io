import React from "react";
import Layout from "@theme/Layout";
import TopReasons from "../../components/comparison/top-reasons";
import Migration from "../../components/comparison/migration";
import Hero from "../../components/comparison/hero";
import ComparisonGrid from "../../components/comparison/grid";
import GetStarted from "../../components/comparison/get-started";
import ComparisonLayout from "../../components/comparison/layout";
import Link from "@docusaurus/Link";

function SigNozVSDatadog() {
  return (
    <Layout title="SigNoz vs Datadog">
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
        <GetStarted withHackerNews data={COMPARISON_DATA.MIGRATION_SUPPORT} />
      </ComparisonLayout>
    </Layout>
  );
}

export default SigNozVSDatadog;

const COMPARISON_DATA = {
  HERO: {
    TITLE: <>SigNoz vs Datadog</>,
    DESC: (
      <>
        For 20 APM and 50 infra hosts, SigNoz can save up to 86% of your Datadog
        bill - check{" "}
        <Link
          href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
          className="highlight"
        >
          comparison with detailed spreadsheet
        </Link>
        .
      </>
    ),
    BILL_FOR_COMPARISON: "/comparisons/datadog-savings/",
  },
  MIGRATE: {
    TITLE: <>Migrate from Datadog to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from Datadog to SigNoz. <br />
        <Link
          href="/comparisons/migrate-from-datadog/"
          className={`highlight`}
        >
          Request a migration support
        </Link>{" "}
        from one of our experts and get started with SigNoz quickly.
      </>
    ),
  },
  REASON_TITLE: <>Top reasons why devs choose SigNoz over Datadog</>,
  REASONS: [
    {
      FIGURE: "/img/reasons/ot-native.png",
      TITLE: <>SigNoz is OpenTelemetry native </>,
      DESC: (
        <>
          ​OpenTelemetry is the second most active project in the CNCF, with
          only Kubernetes being more active. Using an open source standard like
          OpenTelemetry frees you from vendor lock-in. SigNoz is built to
          support OpenTelemetry from Day 1. However, Datadog does not support OTel as
          its primary data format, and it even tried to{" "}
          <Link
            href="https://news.ycombinator.com/item?id=34540419"
            className="highlight"
          >
            kill an OTel pull request
          </Link>
          .
        </>
      ),
    },
    {
      FIGURE:
        "/img/reasons/use-of-columnar-database-for-faster-ingestion-and-aggregation.png",
      TITLE: <>Use of columnar database for faster ingestion & aggregation</>,
      DESC: (
        <>
          SigNoz uses ClickHouse - a fast open source distributed columnar
          database. Ingestion and aggregations are lightening fast, while
          providing best-in-class compression for economical storage. Learn{" "}
          <Link
            href="https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast"
            className={`highlight`}
          >
            why is ClickHouse so fast
          </Link>
          .
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/datadog-bill-saving.png",
      TITLE: <>Save up to 86% on your Datadog bill</>,
      DESC: (
        <>
          Datadog has a very complex pricing tier which makes Datadog bills
          unpredictable. For 20 APM hosts, 50 infra hosts, and 2500 GB logs
          data, SigNoz can provide up to 7x more value than Datadog.{" "}
          <Link
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
            className="highlight"
          >
            Lean more.
          </Link>
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/datadog-no-pricing-for-custom-metic.png",
      TITLE: <>No special pricing for custom metrics</>,
      DESC: (
        <>
          Datadog’s custom metrics pricing is insane. It charges $0.5 per custom
          metric. You can end up with unpredictable bills, and custom metrics
          pricing can constitute up to 52% of your bill for a large engineering
          team. SigNoz does not treat custom metrics differently and charges
          only $0.1 per million samples.{" "}
          <Link
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-limits-on-custom-metrics-with-signoz"
            className="highlight"
          >
            Learn more.
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
        </>
      ),
    },
  ],
  COMPARISON: {
    TITLE: <>Side by Side Comparison</>,
    OTHER_HEADING: "Datadog",
    DATA: [
      {
        sideHeader: "Open Source",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
      },
      {
        sideHeader: "OpenTelemetry-Native",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "No vendor lock-in in instrumentation",
      },
      {
        sideHeader: "Network monitoring",
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: "Cloud SIEM",
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: "OpenTelemetry visualization",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "Best visualizations for OTel data",
      },
      {
        sideHeader: "No peak usage billing for data.",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
      },
      {
        sideHeader: "No outrageous pricing for custom metrics",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "Priced at only $0.1 per million samples.",
        otherExtraDetail: "0.05 dollar per custom metrics",
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
        sideHeader: "Transparent usage-based billing",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        otherExtraDetail: "Very complex SKU-based billing",
      },
      {
        sideHeader: "Host Yourself",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
      },
    ],
  },
  MIGRATION_SUPPORT: {
    HACKER_THREAD_TITLE: (
      <>
        Datadog shocking bill of $65 million. Check out the{" "}
        <Link
          href="https://news.ycombinator.com/item?id=35837330"
          className={`highlight`}
        >
          HackerNews thread.
        </Link>
      </>
    ),
    TITLE: <>Migrate from Datadog to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from Datadog to SigNoz.{" "}
        <Link className={`highlight`} href="/comparisons/migrate-from-datadog/">
          Request a migration support
        </Link>{" "}
        from one of our experts and get started with SigNoz quickly.
      </>
    ),
  },
};
