import React from "react";
import styles from "./styles.module.css";

const GetStarted = (props) => {
  return (
    <>
      <HackerNewsThread />
      <GetStartedSection />
      <MigrationSupport />
    </>
  );
};

const HackerNewsThread = () => {
  return (
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
  );
};

const GetStartedSection = () => {
  return (
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
  );
};

const MigrationSupport = () => {
  return (
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
  );
};

export default GetStarted;