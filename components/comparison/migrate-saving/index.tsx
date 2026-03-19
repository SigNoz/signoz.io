'use client'

import React from 'react'
import styles from './styles.module.css'
import { FormBlockedFallback, useHubspotFormFallback } from '@/components/HubspotFormFallback'

const MigrateSaving = (props) => {
  const {
    data: { TITLE, DESC, PORTAL_ID, FORM_ID },
  } = props

  const { formCreated, error, showFallback, formRef } = useHubspotFormFallback({
    portalId: PORTAL_ID,
    formId: FORM_ID,
    target: '#my-hubspot-form',
    formName: TITLE,
  })

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
