import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

function SigNozVSDataDog() {
  return (
    <Layout title="SigNoz vs Datadog">
      <section className={styles.svsd}>
        <ComparisonHero />
        <MigrationSupport />

        <TopReasons />
        <ComparisonGrid />

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
        SigNoz can help you{" "}
        <span className="highlight">save up to 86% of your Datadog bill</span>{" "}
        while providing a robust observability stack.
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
        Top reasons why people choose SigNoz over Datadog
      </h3>
      <div className="container">
        <div className={`row ${styles.reasonRow} ${styles.reasonElonMusk}`}>
          <div className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}>
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
            <div>
              <h4 className={styles.reasonTitle}>SigNoz is open source</h4>
              <p className={styles.reasonDesc}>
                We believe the decision of choosing one product over the other
                ultimately comes down to trust - whether you trust the product
                to fulfil all your use-cases, whether you trust it to be good
                value for your money. Trust starts with transparency, and open
                source is the epitome of transparency in software ecosystem.
                Have a look at our code, test it out, and then make a decision.
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
            <div>
              <h4 className={styles.reasonTitle}>
                SigNoz is OpenTelemetry native
              </h4>
              <p className={styles.reasonDesc}>
                ​OpenTelemetry is the path forward for observability. SigNoz is
                built to support OpenTelemetry from Day 1. Datadog does not
                support OTel as their primary data format. It also tried to kill
                an OTel PR!
              </p>
            </div>
          </div>
          <div className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}>
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow}`}>
          <div className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}>
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
          <div className={`col col--6 margin-vert--md`}>
            <div>
              <h4 className={styles.reasonTitle}>
                Use of columnar database for faster ingestion & aggregation{" "}
              </h4>
              <p className={styles.reasonDesc}>
                SigNoz uses ClickHouse - a fast open source column-oriented
                database. Ingestion and aggregation are lightening fast, while
                providing best-in-class compression for economical storage.
              </p>
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow} ${styles.shouldImageFirst}`}>
          <div className={`col col--6 margin-vert--md`}>
            <div>
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
          <div className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}>
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
        </div>
        <div className={`row ${styles.reasonRow}`}>
          <div className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}>
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
          <div className={`col col--6 margin-vert--md`}>
            <div>
              <h4 className={styles.reasonTitle}>
                No special pricing for custom metrics{" "}
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
            <div>
              <h4 className={styles.reasonTitle}>
                We provide managed self-hosted option
              </h4>
              <p className={styles.reasonDesc}>
                You can host SigNoz in your own cloud. We also provide managed
                services. It’s perfect for customers having data privacy and
                data governance requirements. We have data centers in EU, US and
                India region to help you comply with data regulations. Check out
                our{" "}
                <a href="" className="highlight">
                  paid plans.
                </a>
              </p>
            </div>
          </div>
          <div className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}>
            <div className={styles.reasonImageContainer}>
              <img src="/img/reasons/placeholder.png" alt="reason" />
            </div>
          </div>
        </div>
      </div>
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
        <div className={styles.tableMetric}>Open Source</div>
        <div className={styles.tableMetricAvailability}>✅</div>
        <div className={styles.tableMetricAvailability}>❌</div>
        <div className={styles.tableMetric}>OpenTelemetry-Native</div>
        <div className={styles.tableMetricAvailability}>
          ✅
          <small className={styles.tableMetricDesc}>
            (No vendor lock-in in instrumentation)
          </small>
        </div>
        <div className={styles.tableMetricAvailability}>❌</div>
        <div className={styles.tableMetric}>Network monitoring</div>
        <div className={styles.tableMetricAvailability}>✅</div>
        <div className={styles.tableMetricAvailability}>❌</div>
        <div className={styles.tableMetric}>Cloud SIEM</div>
        <div className={styles.tableMetricAvailability}>✅</div>
        <div className={styles.tableMetricAvailability}>❌</div>
        <div className={styles.tableMetric}>OpenTelemetry visualization</div>
        <div className={styles.tableMetricAvailability}>
          ✅<small className={styles.tableMetricDesc}></small>
        </div>
        <div className={styles.tableMetricAvailability}>❌</div>
        <div className={styles.tableMetric}>
          No peak usage billing for data.
        </div>
        <div className={styles.tableMetricAvailability}>✅</div>
        <div className={styles.tableMetricAvailability}>❌</div>
        <div className={styles.tableMetric}>
          No outrageous pricing for custom metrics
        </div>
        <div className={styles.tableMetricAvailability}>
          ✅
          <small className={styles.tableMetricDesc}>
            Priced at only $0.1 per million samples.
          </small>
        </div>
        <div className={styles.tableMetricAvailability}>
          ❌
          <small className={styles.tableMetricDesc}>
            0.05 dollar per custom metrics
          </small>
        </div>
        <div className={styles.tableMetric}>Managed in your cloud options</div>
        <div className={styles.tableMetricAvailability}>
          ✅
          <small className={styles.tableMetricDesc}>
            More suited if you have data privacy and data governance
            requirements
          </small>
        </div>
        <div className={styles.tableMetricAvailability}>
          ❌
          <small className={styles.tableMetricDesc}>
            No self-hosting options available
          </small>
        </div>
        <div className={styles.tableMetric}>
          Transparent usage-based billing
        </div>
        <div className={styles.tableMetricAvailability}>✅</div>
        <div className={styles.tableMetricAvailability}>
          ❌
          <small className={styles.tableMetricDesc}>
            Transparent usage-based billing
          </small>
        </div>
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
          <p className={styles.desc}>
            Check out our hosted and enterprise solutions.
          </p>
          <a
            className={`button button--secondary ${styles.trySigNozCtaBtn}`}
            href="https://signoz.io/teams/"
          >
            Try SigNoz
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
