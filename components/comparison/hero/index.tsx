import React from 'react'
import styles from './styles.module.css'
import Button from '@/components/ui/Button'

const Hero = (props) => {
  const { title, desc, billForComparison, trySigNozCloud, selfHost } = props
  return (
    <div className={styles.svsdHeaderContainer}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <p className={styles.headerDesc}>{desc}</p>
      <div className={styles.ctaContainer}>
        {billForComparison.isVisible && (
          <Button href={billForComparison.path} className={styles.ctaButton}>
            Send your bill for comparison
          </Button>
        )}
        {trySigNozCloud.isVisible && (
          <Button
            href="/teams/"
            className="primary-gradient bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground"
          >
            Get Started - Free
          </Button>
        )}
        {selfHost.isVisible && (
          <Button href={selfHost.path} variant="outline" className={styles.ctaButton}>
            Self-Host
          </Button>
        )}
      </div>
      <div className={styles.headerHeroImageContainer}>
        <img
          src="/img/signoz-distributed-tracing.webp"
          alt="SigNoz trace details view showing a distributed trace waterfall and span attributes for an HTTP request"
        />
      </div>
    </div>
  )
}

export default Hero
