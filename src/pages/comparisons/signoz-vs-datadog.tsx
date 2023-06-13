import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

const COMPARISON_GRID_DATA = [
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
];

function SigNozVSDataDog() {
  return (
    <Layout title="SigNoz vs Datadog">
      <section className={styles.svsd}>
        <ComparisonHero />
        <MigrationSupport />

        <TopReasons />
        <ComparisonSection />

        <HackerNewsThread />
      </section>
    </Layout>
  );
}

export default SigNozVSDataDog;

const ComparisonHero = () => {
  return (
    <div className={styles.svsdHeaderContainer}>
      <h2 className={styles.headerTitle}>SigNoz vs Datadog</h2>
      <p className={styles.headerDesc}>
        For 20 APM and 50 infra hosts, SigNoz can save up to 86% of your Datadog
        bill - check{" "}
        <span className="highlight">comparison with detailed spreadsheet</span>.
      </p>
      <div className={styles.ctaContainer}>
        <button
          className={`button button--primary ${styles.ctaButton}`}
          type="button"
        >
          Send your bill for comparison
        </button>
        <button
          className={`button button--outline button--secondary ${styles.ctaButton}`}
          type="button"
        >
          Sign Up for free
        </button>
      </div>
      <div className={styles.headerHeroImageContainer}>
        <img
          src="/img/signoz-dsitributed-tracing.png"
          className="headerHeroImage"
        />
      </div>
    </div>
  );
};

const MigrationSupport = () => {
  return (
    <div className={styles.svsdMigrationContainer}>
      <div className="container">
        <h3 className={styles.title}>
          Migrate from Datadog to SigNoz with ease.
        </h3>
        <p className={styles.desc}>
          We provide support for migrating from Datadog to SigNoz.{" "}
          <a href="" className={`${styles.underline} highlight`}>
            Request a migration support
          </a>{" "}
          from one of our experts and get started with SigNoz quickly.
        </p>
      </div>
    </div>
  );
};

const TopReasons = () => {
  return (
    <div className={styles.svsdReasonContainer}>
      <h3 className={styles.reasonHeaderTitle}>
        Top reasons why devs choose SigNoz over Datadog
      </h3>
      <div className="container">
        <div className={`row ${styles.reasonRow} ${styles.reasonElonMusk}`}>
          <div
            className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
          >
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/elon-musk.png" alt="reason" />
              <div className={styles.reasonReviewContainer}>
                <p className={styles.reasonReview}>
                  “In order to really build trust, you have to have
                  transparency. If you want to trust something, you want to know
                  how it works.” -&nbsp;<strong>Elon Musk</strong>
                </p>
              </div>
            </div>
          </div>
          <div className={`col col--6 margin-vert--md`}>
            <div className={styles.reasonDetailContainer}>
              <h4 className={styles.reasonTitle}>SigNoz is open source</h4>
              <p className={styles.reasonDesc}>
                We believe the decision of choosing one product over the other
                ultimately comes down to trust - whether you trust the product
                to fulfil all your use-cases, whether you trust it to be good
                value for your money. Trust starts with transparency. SigNoz is
                open source - have a look at our code, test it out, and then
                make a decision.
              </p>
              <a
                href="https://github.com/SigNoz/signoz"
                className="button button--primary"
              >
                Check out our GitHub repo
              </a>
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow} ${styles.shouldImageFirst}`}>
          <div className={`col col--6 margin-vert--md`}>
            <div className={styles.reasonDetailContainer}>
              <h4 className={styles.reasonTitle}>
                SigNoz is OpenTelemetry native
              </h4>
              <p className={styles.reasonDesc}>
                ​OpenTelemetry is the second most active project in the CNCF,
                with only Kubernetes being more active. Using an open source
                standard like OpenTelemetry frees you from vendor lock-in.
                SigNoz is built to support OpenTelemetry from Day 1. Datadog
                does not support OTel as their primary data format. It also
                tried to kill an OTel PR!
              </p>
            </div>
          </div>
          <div
            className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
          >
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow}`}>
          <div
            className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
          >
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
          <div className={`col col--6 margin-vert--md`}>
            <div className={styles.reasonDetailContainer}>
              <h4 className={styles.reasonTitle}>
                Use of columnar database for faster ingestion & aggregation
              </h4>
              <p className={styles.reasonDesc}>
                SigNoz uses ClickHouse - a fast open source distributed columnar
                database. Ingestion and aggregations are lightening fast, while
                providing best-in-class compression for economical storage.
                Learn <a className={`highlight ${styles.underline}`}></a>why is
                ClickHouse so fast.
              </p>
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow} ${styles.shouldImageFirst}`}>
          <div className={`col col--6 margin-vert--md`}>
            <div className={styles.reasonDetailContainer}>
              <h4 className={styles.reasonTitle}>
                Save up to 86% on your Datadog bill
              </h4>
              <p className={styles.reasonDesc}>
                Datadog has a very complex pricing tier which makes Datadog
                bills unpredictable. For 20 APM hosts, 50 infra hosts, and 2500
                GB logs data, SigNoz can provide up to 7x more value than
                Datadog.{" "}
                <a href="" className="highlight">
                  Lean more.
                </a>
              </p>
            </div>
          </div>
          <div
            className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
          >
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow}`}>
          <div
            className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
          >
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
          <div className={`col col--6 margin-vert--md`}>
            <div className={styles.reasonDetailContainer}>
              <h4 className={styles.reasonTitle}>
                No special pricing for custom metrics
              </h4>
              <p className={styles.reasonDesc}>
                Datadog’s custom metrics is insane. It charges $0.5 per custom
                metrics. You can end up with unpredictable bills, and custom
                metrics pricing can constitute up to 52% of your bill for a
                large engineering team. SigNoz does not treat custom metrics
                differently and charges only $0.1 per million samples.{" "}
                <a href="" className="highlight">
                  Learn more.
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow} ${styles.shouldImageFirst}`}>
          <div className={`col col--6 margin-vert--md`}>
            <div className={styles.reasonDetailContainer}>
              <h4 className={styles.reasonTitle}>
                We provide managed self-hosted option
              </h4>
              <p className={styles.reasonDesc}>
                You can host SigNoz in your own cloud. We also provide managed
                services. It’s perfect for customers having data privacy and
                data governance requirements.
                <br />
                We have data centers in EU, US and India region to help you
                comply with data regulations. Check out our{" "}
                <a href="" className="highlight">
                  paid plans.
                </a>
              </p>
            </div>
          </div>
          <div
            className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
          >
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonSection = () => {
  return (
    <div>
      <h3 className={styles.reasonHeaderTitle}>Side by Side Comparsion</h3>
      <ComparisonGrid />
      <ComparisonGridMobile />
    </div>
  );
};

const ComparisonGrid = () => {
  return (
    <div className="container">
      <div className={styles.tableGrid}>
        {/* header */}
        <div className={styles.tableHeader}></div>
        <div className={styles.tableHeader}>SigNoz</div>
        <div className={styles.tableHeader}>Datadog</div>
        {/* data */}
        {COMPARISON_GRID_DATA.map((row) => {
          return (
            <>
              <div className={styles.tableMetric}>{row.sideHeader}</div>
              <div className={styles.tableMetricAvailability}>
                {row.isAvailableInSignoz ? "✅" : "❌"}
                {row.signozExtraDetail && (
                  <small className={styles.tableMetricDesc}>
                    {row.signozExtraDetail}
                  </small>
                )}
              </div>
              <div className={styles.tableMetricAvailability}>
                {row.isAvailableInDatadog ? "✅" : "❌"}
                {row.datadogExtraDetail && (
                  <small className={styles.tableMetricDesc}>
                    {row.datadogExtraDetail}
                  </small>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

const ComparisonGridMobile = () => {
  return (
    <div className="container">
      <div className={styles.tableGridMobile}>
        {COMPARISON_GRID_DATA.map((cell) => {
          return (
            <div className={styles.tableGridCell}>
              <h4 className={styles.tableGridCellHeader}>{cell.sideHeader}</h4>
              <div>
                <div className={styles.tableGridCompareCell}>
                  <span className={styles.tableGridProdCell}>
                    Signoz
                    {cell.signozExtraDetail && (
                      <small className={styles.tableMetricDesc}>
                        ${cell.signozExtraDetail}
                      </small>
                    )}
                  </span>
                  <span> {cell.isAvailableInSignoz ? "✅" : "❌"}</span>
                </div>
                <div className={styles.tableGridCompareCell}>
                  <span className={styles.tableGridProdCell}>
                    Datadog
                    {cell.datadogExtraDetail && (
                      <small className={styles.tableMetricDesc}>
                        ${cell.datadogExtraDetail}
                      </small>
                    )}
                  </span>
                  <span> {cell.isAvailableInDatadog ? "✅" : "❌"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HackerNewsThread = () => {
  return (
    <div>
      <div className={styles.svsdThreadContainer}>
        <div className="container">
          <h3 className={styles.threadTitle}>
            Datadog shocking bill of $65 million. Check out the{" "}
            <a href="" className={`${styles.underline} highlight`}>
              HackerNews thread.
            </a>
          </h3>
        </div>
      </div>
      <div className="container">
        <div className={styles.trySigNozContainer}>
          <h3 className={styles.tagline}>
            OpenTelemetry-Native Metrics, Logs, and Traces in a single pane of
            glass
          </h3>
          <p className={styles.desc}>Sign up for SigNoz Cloud.</p>
          <a
            className={`button button--secondary ${styles.trySigNozCtaBtn}`}
            href="https://signoz.io/teams/"
          >
            Get started - free
          </a>
        </div>
      </div>
      <div className="container">
        <div className={styles.migrationSupportContainer}>
          <h4 className={styles.tagline}>
            Migrate from Datadog to SigNoz with ease.
          </h4>
          <p className={styles.desc}>
            We provide support for migrating from Datadog to SigNoz.{" "}
            <a className={`${styles.underline} highlight`} href="#">
              Request a migration support
            </a>{" "}
            from one of our experts and get started with SigNoz quickly.
          </p>
        </div>
      </div>
    </div>
  );
};
