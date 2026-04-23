'use client'

import React from 'react'
import styles from './styles.module.css'
import HubspotCustomForm from '@/components/hubspot-custom-form/HubspotCustomForm'

type MigrateSavingProps = {
  data: { TITLE: string; DESC: string; PORTAL_ID: string; FORM_ID: string }
}

const MigrateSaving = ({ data: { TITLE, DESC, PORTAL_ID, FORM_ID } }: MigrateSavingProps) => {
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
                  <HubspotCustomForm portalId={PORTAL_ID} formId={FORM_ID} formName={TITLE} />
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
