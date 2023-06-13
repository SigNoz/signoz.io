import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import TopReasons from "../../components/comparison/top-reasons";
import Migration from "../../components/comparison/migration";
import Hero from "../../components/comparison/hero";
import ComparisonGrid from "../../components/comparison/grid";
import GetStarted from "../../components/comparison/get-started";

function SigNozVSDataDog() {
  return (
    <Layout title="SigNoz vs Datadog">
      <section className={styles.comparisonContainer}>
        <Hero title={COMPARISON_DATA.HERO.TITLE} desc={COMPARISON_DATA.HERO.DESC}/>
        <Migration title={COMPARISON_DATA.MIGRATE.TITLE} desc={COMPARISON_DATA.MIGRATE.DESC}/>
        <TopReasons reasons={COMPARISON_DATA.REASONS} />
        <ComparisonGrid comparisonData={COMPARISON_DATA.COMPARISON} />
        <GetStarted />
      </section>
    </Layout>
  );
}

export default SigNozVSDataDog;

const COMPARISON_DATA = {
  HERO: {
    TITLE: <>SigNoz vs New Relic</>,
    DESC: (
      <>
        Tired of New Relic’s user-based pricing? Even for teams of 10-15 devs,
        New Relic’s pricing for user seats can be a significant portion of your
        monthly bill - check comparison with detailed spreadsheet.
      </>
    ),
  },
  MIGRATE: {
    TITLE: <>Migrate from New Relic to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from New Relic to SigNoz.Request a
        migration support from one of our experts and get started with SigNoz
        quickly.
      </>
    ),
  },
  REASONS: [
    {
      FIGURE: "/img/reasons/placeholder.png",
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
      FIGURE: "/img/reasons/placeholder.png",
      TITLE: <>Use of columnar database for faster ingestion & aggregation </>,
      DESC: (
        <>
          SigNoz uses ClickHouse - a fast open source distributed columnar
          database. Ingestion and aggregations are lightening fast, while
          providing best-in-class compression for economical storage. Learn why
          is ClickHouse so fast.
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/placeholder.png",
      TITLE: <>No user-based pricing, collaborate peacefully </>,
      DESC: (
        <>
          User-based pricing is outdated. You never know which engineer might
          need to access the monitoring tool for debugging. At SigNoz, we don’t
          charge based on user seats. New Relic’s user pricing can go up to
          $549/user. Even for teams with 10-15 devs, the cost becomes
          significant. At scale, the cost of adding users can go up to 66% of
          the total bill. Learn more.
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/placeholder.png",
      TITLE: <>Save up to 60% on your New Relic bill</>,
      DESC: (
        <>
          For 20 APM hosts, 50 million indexed spans, 50 infra hosts, and 2500
          GB logs data, SigNoz can save 60% of your New Relic bill. Lean more.
        </>
      ),
    },
    {
      FIGURE: "/img/reasons/placeholder.png",
      TITLE: <>We provide managed self-hosted option</>,
      DESC: (
        <>
          You can host SigNoz in your own cloud. We also provide managed
          services. It’s perfect for customers having data privacy and data
          governance requirements.We have data centers in EU, US and India
          region to help you comply with data regulations. Check out our paid
          plans.
        </>
      ),
    },
  ],
  COMPARISON: {
    TITLE: <>Side by Side Comparison</>,
    DATA: [
      {
        sideHeader: "Open Source",
        isAvailableInSignoz: true,
        isAvailableInDatadog: false,
      },
      {
        sideHeader: "OpenTelemetry-Native",
        isAvailableInSignoz: true,
        isAvailableInDatadog: false,
        signozExtraDetail: "(No vendor lock-in in instrumentation)",
      },
      {
        sideHeader: "Network monitoring",
        isAvailableInSignoz: false,
        isAvailableInDatadog: true,
      },
      {
        sideHeader: "Cloud SIEM",
        isAvailableInSignoz: false,
        isAvailableInDatadog: true,
      },
      {
        sideHeader: "OpenTelemetry visualization",
        isAvailableInSignoz: true,
        isAvailableInDatadog: false,
        signozExtraDetail: "Best visualizations for OTel data",
      },
      {
        sideHeader: "No peak usage billing for data.",
        isAvailableInSignoz: true,
        isAvailableInDatadog: false,
      },
      {
        sideHeader: "No outrageous pricing for custom metrics",
        isAvailableInSignoz: true,
        isAvailableInDatadog: false,
        signozExtraDetail: "Priced at only $0.1 per million samples.",
        datadogExtraDetail: "0.05 dollar per custom metrics",
      },
      {
        sideHeader: "Managed in your cloud options",
        isAvailableInSignoz: true,
        isAvailableInDatadog: false,
        signozExtraDetail:
          "More suited if you have data privacy and data governance requirements",
        datadogExtraDetail: "No self-hosting options available",
      },
      {
        sideHeader: "Transparent usage-based billing",
        isAvailableInSignoz: true,
        isAvailableInDatadog: false,
        datadogExtraDetail: "Transparent usage-based billing",
      },
    ],
  },
  MIGRATION_SUPPORT: {
    TITLE: <>Migrate from New Relic to SigNoz with ease.</>,
    DESC: (
      <>
        We provide support for migrating from New Relic to SigNoz. Request a
        migration support from one of our experts and get started with SigNoz
        quickly.
      </>
    ),
  },
};
