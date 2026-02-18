'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'

const FORM_LOAD_TIMEOUT_MS = 10_000
const MIN_FORM_HEIGHT_PX = 100

function FormBlockedFallback() {
  return (
    <div className="rounded-lg border border-signoz_amber-500/30 bg-signoz_amber-500/5 px-5 py-4 text-center">
      <p className="mb-1 text-sm font-medium text-signoz_amber-400">Unable to load the form</p>
      <p className="mb-3 text-xs leading-relaxed text-signoz_vanilla-400">
        Your browser&apos;s tracking protection or an ad blocker may be preventing this form from
        loading. Try disabling tracking protection for this page, using a different browser, or
        reach out to us directly.
      </p>
      <a
        href="mailto:cloud-support@signoz.io"
        className="inline-block rounded-full border border-signoz_robin-500 px-4 py-1.5 text-xs font-medium text-signoz_robin-500 no-underline transition-colors hover:bg-signoz_robin-500 hover:text-white"
      >
        Email us at cloud-support@signoz.io
      </a>
    </div>
  )
}

const MigrateSaving = (props) => {
  const {
    data: { TITLE, DESC, PORTAL_ID, FORM_ID },
  } = props

  const { loaded, error, formCreated } = useHubspotForm({
    portalId: PORTAL_ID,
    formId: FORM_ID,
    target: '#my-hubspot-form',
  })

  const formRef = useRef<HTMLDivElement>(null)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (error) {
      setShowFallback(true)
      return
    }
    const timer = setTimeout(() => {
      const el = formRef.current
      if (el && el.offsetHeight < MIN_FORM_HEIGHT_PX) {
        setShowFallback(true)
      }
    }, FORM_LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [error])

  return (
    <>
      <div className={styles.svsdHeaderContainer}>
        <h2 className={styles.headerTitle}>{TITLE}</h2>
        <p className={styles.headerDesc}>{DESC}</p>
        <div className="container">
          <div className="row">
            <div className={'col col--3 margin-vert--md'}></div>
            <div className={'col col--6 margin-vert--md'}>
              <div className={`card ${styles.hubForm}`}>
                <div className="card__body">
                  <div id="my-hubspot-form" ref={formRef}>
                    {!formCreated && !error && !showFallback && (
                      <p className="text--center">Loading...</p>
                    )}
                  </div>
                  {showFallback && <FormBlockedFallback />}
                </div>
              </div>
            </div>
            <div className={'col col--3 margin-vert--md'}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MigrateSaving
