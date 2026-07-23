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
        <div className="container mx-auto">
          <div className="mx-auto my-4 w-full max-w-xl">
            <div className={`border-border bg-card rounded-md border ${styles.hubForm}`}>
              <HubspotCustomForm portalId={PORTAL_ID} formId={FORM_ID} formName={TITLE} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MigrateSaving
