import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

function SigNozVSDataDog() {
  return (
    <Layout title="SigNoz vs Datadog">
      <section className={styles.svsd}>
        <div className={styles.svsdHeaderContainer}>
          <h2 className={styles.headerTitle}>SigNoz vs Datadog</h2>
          <p className={styles.headerDesc}>
            SigNoz can help you{" "}
            <span className="highlight">
              save up to 86% of your Datadog bill
            </span>{" "}
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
        <div className={styles.svsdMigrationContainer}>
          <div className="container">
            <h3 className={styles.title}>
              Migrate from Datadog to SigNoz with ease.
            </h3>
            <p className={styles.desc}>
              We provide support for migrating from Datadog to SigNoz.{" "}
              <a href="" className={`${styles.migrationCTA} highlight`}>
                Request a migration support
              </a>{" "}
              from one of our experts and get started with SigNoz quickly.
            </p>
          </div>
        </div>
        <div className={styles.svsdResasonsContainer}>
          <h3 className={styles.resaonHeaderTitle}>
            Top reasons why people choose SigNoz over Datadog
          </h3>
          <div className="container">
            <div className={`row ${styles.reasonRow}`}>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.reasonImageContainer}>
                  <img src="/img/reasons/elon-musk.png" alt="reason" />
                  <div className={styles.reasonReviewContainer}>
                    <p className={styles.reasonReview}>
                      “In order to really build trust, you have to have
                      transparency. If you want to trust something, you want to
                      know how it works.” -&nbsp;<strong>Elon Musk</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div>
                  <h4 className={styles.reasonTitle}>SigNoz is open source</h4>
                  <p className={styles.reasonDesc}>
                    We believe the decision of choosing one product over the
                    other ultimately comes down to trust - whether you trust the
                    product to fulfil all your use-cases, whether you trust it
                    to be good value for your money. Trust starts with
                    transparency, and open source is the epitome of transparency
                    in software ecosystem. Have a look at our code, test it out,
                    and then make a decision.
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
              <div className={"col col--6 margin-vert--md"}>
                <div>
                  <h4 className={styles.reasonTitle}>
                    SigNoz is OpenTelemetry native
                  </h4>
                  <p className={styles.reasonDesc}>
                    ​OpenTelemetry is the path forward for observability. SigNoz
                    is built to support OpenTelemetry from Day 1. Datadog does
                    not support OTel as their primary data format. It also tried
                    to kill an OTel PR!
                  </p>
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.reasonImageContainer}>
                  <img src="/img/reasons/placeholder.png" alt="reason" />
                </div>
              </div>
            </div>
            <div className={`row ${styles.reasonRow}`}>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.reasonImageContainer}>
                  <img src="/img/reasons/placeholder.png" alt="reason" />
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div>
                  <h4 className={styles.reasonTitle}>
                    Use of columnar database for faster ingestion & aggregation{" "}
                  </h4>
                  <p className={styles.reasonDesc}>
                    SigNoz uses ClickHouse - a fast open source column-oriented
                    database. Ingestion and aggregation are lightening fast,
                    while providing best-in-class compression for economical
                    storage.
                  </p>
                </div>
              </div>
            </div>
            <div className={`row ${styles.reasonRow} ${styles.shouldImageFirst}`}>
              <div className={"col col--6 margin-vert--md"}>
                <div>
                  <h4 className={styles.reasonTitle}>
                    Save up to 86% on your Datadog bill
                  </h4>
                  <p className={styles.reasonDesc}>
                    Datadog has a very complex pricing tier which makes Datadog
                    bills unpredictable. For 20 APM hosts, 50 infra hosts, and
                    2500 GB logs data, SigNoz can provide up to 7x more value
                    than Datadog.{" "}
                    <a href="" className="highlight">
                      Lean more.
                    </a>
                  </p>
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.reasonImageContainer}>
                  <img src="/img/reasons/placeholder.png" alt="reason" />
                </div>
              </div>
            </div>
            <div className={`row ${styles.reasonRow}`}>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.reasonImageContainer}>
                  <img src="/img/reasons/placeholder.png" alt="reason" />
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div>
                  <h4 className={styles.reasonTitle}>
                    No special pricing for custom metrics{" "}
                  </h4>
                  <p className={styles.reasonDesc}>
                    Datadog’s custom metrics is insane. It charges $0.5 per
                    custom metrics. You can end up with unpredictable bills, and
                    custom metrics pricing can constitute up to 52% of your bill
                    for a large engineering team. SigNoz does not treat custom
                    metrics differently and charges only $0.1 per million
                    samples.{" "}
                    <a href="" className="highlight">
                      Learn more.
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className={`row ${styles.reasonRow} ${styles.shouldImageFirst}`}>
              <div className={"col col--6 margin-vert--md"}>
                <div>
                  <h4 className={styles.reasonTitle}>
                    We provide managed self-hosted option
                  </h4>
                  <p className={styles.reasonDesc}>
                    You can host SigNoz in your own cloud. We also provide
                    managed services. It’s perfect for customers having data
                    privacy and data governance requirements. We have data
                    centers in EU, US and India region to help you comply with
                    data regulations. Check out our{" "}
                    <a href="" className="highlight">
                      paid plans.
                    </a>
                  </p>
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.reasonImageContainer}>
                  <img src="/img/reasons/placeholder.png" alt="reason" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default SigNozVSDataDog;
