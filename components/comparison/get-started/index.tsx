import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const GetStarted = (props) => {
  const { withHackerNews, withMigrationSupport, data } = props
  return (
    <>
      <HackerNewsThread withHackerNews={withHackerNews} title={data.HACKER_THREAD_TITLE} />
      <GetStartedSection
        withHackerNews={withHackerNews}
        withMigrationSupport={withMigrationSupport}
      />
      <MigrationSupport
        withMigrationSupport={withMigrationSupport}
        withHackerNews={withHackerNews}
        title={data.TITLE}
        desc={data.DESC}
      />
    </>
  )
}

const HackerNewsThread = (props) => {
  const { withHackerNews, title } = props
  if (!withHackerNews) {
    return null
  }
  return (
    <div className={styles.svsdThreadContainer}>
      <div className="container">
        <h3 className={styles.threadTitle}>{title}</h3>
      </div>
    </div>
  )
}

const GetStartedSection = (props) => {
  const { withHackerNews, withMigrationSupport } = props
  return (
    <div className="container">
      <div
        className={`${styles.trySigNozContainer} 
        ${!withHackerNews && styles.withoutHackerNews} 
        ${!withMigrationSupport && styles.withoutMigrationSupport} bg-indigo-500`}
      >
        <h3 className={styles.tagline}>
          OpenTelemetry-Native Metrics, Logs, and Traces in a single pane of glass
        </h3>
        <p className={styles.desc}>SigNoz Cloud is the easiest way to run SigNoz</p>
        <Link className={`button button--secondary ${styles.trySigNozCtaBtn}`} href="/teams/">
          Try SigNoz Cloud
        </Link>
      </div>
    </div>
  )
}

const MigrationSupport = (props) => {
  const { withMigrationSupport, withHackerNews, title, desc } = props
  if (!withMigrationSupport) {
    return null
  }
  return (
    <div className="container">
      <div
        className={`${styles.migrationSupportContainer} 
        ${!withMigrationSupport && styles.withoutMigrationSupport} 
        ${!withHackerNews && styles.withoutHackerNews} `}
      >
        <h4 className={styles.tagline}>{title}</h4>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  )
}

export default GetStarted
