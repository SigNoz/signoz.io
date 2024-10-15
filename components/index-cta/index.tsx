'use client'

import React from 'react'
import ReactGA from 'react-ga4'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '../../components/ui/Button'

ReactGA.initialize('G-6NFJ2Y6NQN')

const CTA = () => {
  const requestDemoClicked = () => {
    ReactGA.event({
      category: 'User',
      action: 'Request Demo Clicked',
    })
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <Heading type={2}>
              OpenTelemetry-Native Metrics, Logs,&nbsp;
              <br className="hidden lg:inline" />
              and Traces in a single pane of glass
            </Heading>
            <SubHeading>Check out our hosted and enterprise solutions.</SubHeading>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-5 sm:flex-row">
            <Button
              isButton
              className="button button-sm"
              to={'/teams/'}
              id="btn-get-started-homepage-bottom"
            >
              Get Started - Free
            </Button>
            <Button
              isButton
              outlined
              className="button button-sm"
              to={'/docs/install/'}
              onClick={requestDemoClicked}
              id="btn-self-hosted-homepage-bottom"
            >
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
