import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const GetStarted = (props) => {
  const { withHackerNews, data } = props;
  return (
    <>
      <HackerNewsThread
        withHackerNews={withHackerNews}
        title={data.HACKER_THREAD_TITLE}
      />
      <GetStartedSection withHackerNews={withHackerNews} />
      <MigrationSupport
        withHackerNews={withHackerNews}
        title={data.TITLE}
        desc={data.DESC}
      />
    </>
  );
};

const HackerNewsThread = (props) => {
  const { withHackerNews, title } = props;
  if (!withHackerNews) {
    return null;
  }
  return (
    <div className={styles.svsdThreadContainer}>
      <div className="container">
        <h3 className={styles.threadTitle}>{title}</h3>
      </div>
    </div>
  );
};

const GetStartedSection = (props) => {
  const { withHackerNews } = props;
  return (
    <div className="container">
      <div
        className={`${styles.trySigNozContainer} ${
          !withHackerNews && styles.withoutHackerNews
        }`}
      >
        <h3 className={styles.tagline}>
          OpenTelemetry-Native Metrics, Logs, and Traces in a single pane of
          glass
        </h3>
        <p className={styles.desc}>Sign up for SigNoz Cloud.</p>
        <Link
          className={`button button--secondary ${styles.trySigNozCtaBtn}`}
          href="/teams/"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

const MigrationSupport = (props) => {
  const { withHackerNews, title, desc } = props;
  return (
    <div className="container">
      <div
        className={`${styles.migrationSupportContainer} ${
          !withHackerNews && styles.withoutHackerNews
        }`}
      >
        <h4 className={styles.tagline}>{title}</h4>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  );
};

export default GetStarted;
