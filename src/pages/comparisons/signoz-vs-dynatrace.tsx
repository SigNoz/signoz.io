import React from "react";
import Layout from "@theme/Layout";
import TopReasons from "../../components/comparison/top-reasons";
import Migration from "../../components/comparison/migration";
import Hero from "../../components/comparison/hero";
import ComparisonGrid from "../../components/comparison/grid";
import GetStarted from "../../components/comparison/get-started";
import ComparisonLayout from "../../components/comparison/layout";
import Link from "@docusaurus/Link";

function SigNozVSDynatrace() {
  return (
    <Layout title="SigNoz vs Dynatrace">
      <ComparisonLayout>
        <Hero
          title={COMPARISON_DATA.HERO.TITLE}
          desc={COMPARISON_DATA.HERO.DESC}
          billForComparison={COMPARISON_DATA.HERO.BILL_FOR_COMPARISON}
          trySigNozCloud={COMPARISON_DATA.HERO.TRY_SIGNOZ_CLOUD}
          selfHost={COMPARISON_DATA.HERO.SELF_HOST}
        />
        <Migration
          title={COMPARISON_DATA.MIGRATE.TITLE}
          desc={COMPARISON_DATA.MIGRATE.DESC}
        />
        <TopReasons
          title={COMPARISON_DATA.REASON_TITLE}
          reasons={COMPARISON_DATA.REASONS}
          withElonMuskReason
        />
        <ComparisonGrid comparisonData={COMPARISON_DATA.COMPARISON} />
        <GetStarted
          withMigrationSupport
          data={COMPARISON_DATA.MIGRATION_SUPPORT}
        />
      </ComparisonLayout>
    </Layout>
  );
}

export default SigNozVSDynatrace;

const COMPARISON_DATA = {
  HERO: {
    TITLE: <>SigNoz vs Dynatrace</>,
    DESC: (
      <>
        Dynatrace is complex to set up and use. Its host-based billing is
        outdated for applications that need on-demand scaling. SigNoz provides
        predictable usage-based billing that you can rely on.
      </>
    ),
    BILL_FOR_COMPARISON: {
      path: "/comparisons/dynatrace-savings/",
      className: "button--primary",
      isVisible: false,
    },
    TRY_SIGNOZ_CLOUD: {
      path: "/teams/",
      className: "button--primary",
      isVisible: true,
    },
    SELF_HOST: {
      path: "/docs/install/",
      className: "button--outline button--secondary",
      isVisible: true,
    },
  },
  MIGRATE: {
    TITLE: <>Migrate from Dynatrace to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from Dynatrace to SigNoz.
        <br />
        <Link href="/comparisons/migrate-from-dynatrace/" className="highlight">
          Request a migration support
        </Link>{" "}
        from one of our experts and get started with SigNoz quickly.
      </>
    ),
  },
  REASON_TITLE: <>In depth: SigNoz vs Dynatrace</>,
  REASONS: [
    {
      FIGURE: "/img/reasons/ot-native.webp",
      TITLE: <>SigNoz is OpenTelemetry native </>,
      DESC: (
        <>
          OpenTelemetry is the second most active project in the CNCF, with only
          Kubernetes being more active. Using an open source standard like
          OpenTelemetry for generating telemetry signals frees you from vendor
          lock-in. SigNoz is built to support OpenTelemetry from Day 1.
          <br />
          We provide features like application exceptions to traces from OTel
          data for fast debugging.
        </>
      ),
    },
    {
      FIGURE:
        "/img/reasons/use-of-columnar-database-for-faster-ingestion-and-aggregation.webp",
      TITLE: <>Use of columnar database for faster ingestion & aggregation </>,
      DESC: (
        <>
          SigNoz uses ClickHouse - a fast open source column-oriented database.
          Ingestion and aggregation are lightning fast, while providing
          best-in-class compression for economical storage. Learn{" "}
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
      FIGURE: "/img/reasons/dynatrace-host-based-billing.webp",
      TITLE: <>Dynatrace’s host-based billing is limiting for modern apps</>,
      DESC: (
        <>
          Dynatrace charges per hour per host which is not suitable for
          cloud-native environments that need on-demand scaling. SigNoz paid
          plans are based on the amount of data sent with rates that provides
          the best value for money.{" "}
          <Link href="/teams/" className="highlight">
            Sign up
          </Link>{" "}
          for a free cloud trial to get started.
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/dynatrace-complex-ui.webp",
      TITLE: <>Dynatrace has a complex UI, and a steep learning curve </>,
      DESC: (
        <>
          Dynatrace is one of the top APM products. But it’s difficult to
          navigate its complex UI/UX. There is a steep learning curve, and if
          your company does not have access to its full platform plan, the
          usability reduces.
          <br />
          SigNoz is not gated by any SKU-based subscription. You can access all
          its features in its basic paid plan and pay based only on the amount
          of data you send.
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/dynatrace-send-data-directly.webp",
      TITLE: (
        <>
          Send data directly from applications without needing any host-based
          agents
        </>
      ),
      DESC: (
        <>
          ​SigNoz supports OpenTelemetry libraries for application
          instrumentation. You don’t need to install any host-based agents.
          Using OpenTelemetry libraries gives you the flexibility to send data
          to any backend.
          <br />
          If your use case requires, you can also run the OpenTelemetry collector
          as an agent to collect data.
        </>
      ),
    },
  ],
  COMPARISON: {
    TITLE: <>Side by Side Comparison</>,
    OTHER_HEADING: "Dynatrace",
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
        sideHeader: "APM",
        isAvailableInSignoz: true,
        isAvailableInOther: true,
      },
      {
        sideHeader: "Synthetic Monitoring",
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: "Runtime Vulnerability Analytics",
        isAvailableInSignoz: false,
        isAvailableInOther: true,
      },
      {
        sideHeader: "OpenTelemetry visualization",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail:
          "Best visualizations for OTel data. Built for Otel data from Day 1.",
        otherExtraDetail: "Has OneAgent as its primary data collection method.",
      },
      {
        sideHeader: "Managed On-premise deployment",
        isAvailableInSignoz: true,
        isAvailableInOther: true,
        signozExtraDetail:
          "Provides enterprise-grade managed on-premise deployment.",
      },
      {
        sideHeader: "Transparent usage-based billing",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "Pay only for the amount of data you send",
        otherExtraDetail:
          "Charges per hour per host which is not suitable for microservices- based apps",
      },
      {
        sideHeader: "No SKU-based pricing",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail:
          "Entire platform available with all features in basic paid plan",
        otherExtraDetail:
          "Has SKU-based pricing that limits full usage of its capabilities",
      },
      {
        sideHeader: "Simple UI",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        otherExtraDetail: "Complex UI with steep learning curve",
      },
      {
        sideHeader: "Send data directly to applications",
        isAvailableInSignoz: true,
        isAvailableInOther: false,
        signozExtraDetail: "Use OTel libraries to send directly to SigNoz",
        otherExtraDetail: "Have to use host-based agent to collect data",
      },
    ],
  },
  MIGRATION_SUPPORT: {
    HACKER_THREAD_TITLE: "",
    TITLE: <>Migrate from Dynatrace to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from Dynatrace to SigNoz.{" "}
        <Link href="/comparisons/migrate-from-dynatrace/" className="highlight">
          Request a migration support
        </Link>{" "}
        from one of our experts and get started with SigNoz quickly.
      </>
    ),
  },
};
