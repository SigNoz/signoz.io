import React, { useState } from 'react'
import styles from './styles.module.css'

export const DiscussYourProject = ({ title, desc, withUnderline = false }) => {
  return (
    <section className={styles.yourProject}>
      <div className="container">
        <h3
          className={`${styles.title} ${withUnderline ? styles.withUnderline : ''} text-signoz_ink-500 dark:text-white`}
        >
          {title}
        </h3>
        <p className={`${styles.subTagline} text-signoz_ink-500 dark:text-white`}>{desc}</p>
      </div>
    </section>
  )
}
