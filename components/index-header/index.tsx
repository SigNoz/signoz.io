'use client'

import React from 'react'
import SubHeading from '../../components/ui/SubHeading'
import Hero from '../../components/ui/Hero'
import Button from '../../components/ui/Button'
import VimeoPlayer from '../../components/VimeoPlayer/VimeoPlayer'

export const Header = () => {
  return (
    <header className="my-8">
      <div className="mb-5 flex flex-col items-center px-5 text-center">
        <Hero>
          Best OpenTelemetry-Native&nbsp;
          <br className="hidden lg:inline" />
          Observability In A Single Pane
        </Hero>
        <SubHeading>
          SigNoz is an open-source Datadog or New Relic alternative. Get APM, logs,{' '}
          <br className="hidden lg:inline" /> traces, metrics, exceptions, & alerts in a single tool.
        </SubHeading>
      </div>
      <div className="mx-5 mb-12 flex flex-col justify-center gap-5 md:flex-row">
        <Button
          isButton
          className="flex items-center justify-center"
          to={'/teams/'}
          id="btn-get-started-homepage-hero"
        >
          Try SigNoz Cloud
        </Button>
        <Button isButton outlined className="" to={'/docs'} id="btn-self-host-homepage-hero">
          Documentation
        </Button>
      </div>
      <div className="container">
        <div className="w-100 mx-auto">
          <div className="product-explainer-video hero-figure rounded-lg p-3">
            <div className="embed-container">
              <VimeoPlayer videoId="944340217" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
