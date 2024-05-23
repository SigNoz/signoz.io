import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const Hero = (props) => {
  const { title, desc, billForComparison, trySigNozCloud, selfHost } = props
  return (
    <div className={styles.svsdHeaderContainer}>
      <h2 className={styles.headerTitle}>{title}</h2>
      <p className={styles.headerDesc}>{desc}</p>
      <div className={styles.ctaContainer}>
        {billForComparison.isVisible && (
          <Link
            className={`button ${billForComparison.className} ${styles.ctaButton}`}
            href={billForComparison.path}
          >
            Send your bill for comparison
          </Link>
        )}
        {trySigNozCloud.isVisible && (
          <Link className={`button bg-signoz_vanilla-300 text-signoz_ink-300`} href="/teams">
            Try SigNoz Cloud
          </Link>
        )}
        {selfHost.isVisible && (
          <Link className={`button x${selfHost.className} ${styles.ctaButton}`} href={selfHost.path}>
            Self-Host
          </Link>
        )}
      </div>
      <div className={styles.headerHeroImageContainer}>
        <img src="/img/signoz-distributed-tracing.webp" />
      </div>
    </div>
  )
}

export default Hero
