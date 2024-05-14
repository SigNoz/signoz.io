import React, { useState } from 'react'
import styles from './styles.module.css'

export const UserReview = () => {
  return (
    <section className={styles.review}>
      <div className="container">
        <img src="/img/users/blip_logo.webp" />
        <p className={styles.subTagline}>
          We use SigNoz to trace requests step by step, and that kind of stuff is invaluable. Before
          SigNoz, we tried Jaeger to try and trace through the code. We ran Jaeger with
          Elasticsearch, but ran into all sorts of issues.
        </p>
        <p className={styles.user}>
          - Nate Bohman
          <br />
          <span className={styles.userRole}>Senior DevOps Engineer</span>
        </p>
      </div>
    </section>
  )
}
