import React, { useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const TALK_TO_EXPERT_URL = 'https://share.hsforms.com/1kLv_9137QQSkt56SM1s6YQda5af'

export const TalkToExpert = () => {
  return (
    <section className={styles.expert}>
      <div className="container">
        <p className={styles.tagline}>Have more specific questions about SigNoz?</p>
        <p className={styles.subTagline}>
          Every engineering team is different - we’re here to help.
        </p>
        <div className="text-center">
          <Link
            id="btn-pricing-talk-to-an-expert"
            style={{
              margin: '6px',
              paddingLeft: '10px !important',
              paddingRight: '10px !important',
            }}
            className="button button--primary"
            href={TALK_TO_EXPERT_URL}
          >
            Reach out to an Expert
          </Link>
        </div>
      </div>
    </section>
  )
}
