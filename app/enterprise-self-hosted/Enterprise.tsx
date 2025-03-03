'use client'

import React from 'react'
import styles from './styles.module.css'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import PricingForm from '../pricing-form'
import DiscussYourProject from '../discuss-your-project'

const ENTERPRISE_DATA = {
  TITLE: 'Enterprise-Grade Observability in your own infrastructure',
  DESC: 'Observability at any scale with advanced security and compliance. Our experts will connect to give a brief demo and answer any questions.',
  PORTAL_ID: '22308423',
  FORM_ID: '7c13fa9f-29bd-4a2b-96c6-10c5846b556a',
  FEATURE_POINTS: [
    {
      title: 'Three Signals in a Single Pane of Glass',
      desc: 'Get logs, metrics, and traces under a single pane of glass. No need for disparate tooling with too much operational overhead.',
      imageUrl: '/svgs/icons/metrics-traces-and-logs-light.svg',
    },
    {
      title: 'Trusted by industry leaders',
      desc: 'Teams at NetApp, ClearTax and other industry leaders have trusted SigNoz to run their observability stack.',
      imageUrl: '/svgs/icons/trusted-by-industry-light.svg',
    },
    {
      title: 'OpenTelemetry-Native',
      desc: 'Future-proof your observability with OpenTelemetry. Second most active CNCF project after Kubernetes, OpenTelemetry is the future of cloud-native application monitoring.',
      imageUrl: '/svgs/icons/open-telemetry-native-light.svg',
    },
    {
      title: 'Advanced Security & Compliance',
      desc: 'SigNoz enterprise comes with advanced security & compliance features.',
      imageUrl: '/svgs/icons/your-data-in-your-boundary-light.svg',
    },
  ],
}

function Enterprise() {
  return (
    <div title="Enterprise">
      <section className={styles.enterprise}>
        <DiscussYourProject title={ENTERPRISE_DATA.TITLE} desc={ENTERPRISE_DATA.DESC} />
        <div className={styles.enterpriseSection}>
          <div className={`container ${styles.enterpriseContainer}`}>
            <div className={`row ${styles.enterpriseRow}`}>
              <div className={'col col--6 margin-vert--md'}>
                <div className={styles.featuresContainer}>
                  {ENTERPRISE_DATA.FEATURE_POINTS.map((feature, idx) => (
                    <div key={idx} className={styles.featureWrapper}>
                      <img
                        className={styles.featureImage}
                        src={feature.imageUrl}
                        alt={feature.title}
                      />
                      <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDesc}>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={'col col--6 margin-vert--md'}>
                <div className={`card ${styles.enterpriseCard}`}>
                  <div className="card__body">
                    <HubspotProvider>
                      <PricingForm
                        portalId={ENTERPRISE_DATA.PORTAL_ID}
                        formId={ENTERPRISE_DATA.FORM_ID}
                      />
                    </HubspotProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Enterprise
