'use client'

import React from 'react'
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'
import Heading from '../../components/ui/Heading'

const LatestInOpenTelementry = () => {
  const TUTORIALS_LIST = [
    {
      youtubeId: 'Wzut0kjVeYI',
      desc: 'OpenTelemetry Webinars: Getting started with OpenTelemetry.',
    },
    {
      youtubeId: 'sL6XvOOAEP0',
      desc: 'Gathering data with the OpenTelemetry Collector.',
    },
    {
      youtubeId: 'CgByZJeuRZY',
      desc: 'Implementing Distributed Tracing in a NodeJS Application using OpenTelemetry',
    },
  ]

  return (
    <section>
      <div className="container my-16">
        <div className="mb-5 flex flex-col items-center text-center">
          <Heading type={4}>Read ABOUT</Heading>
          <Heading type={1}>Latest in OpenTelemetry</Heading>
        </div>
        <div className="row">
          {TUTORIALS_LIST.map((tutorial) => (
            <div key={tutorial.youtubeId} className="col col--4">
              <div className="card-demo margin--sm">
                <div className="card bluish-gradient rounded-lg">
                  <div className="card__body p-0">
                    <div className="flex flex-col gap-5">
                      <LiteYoutubeEmbed id={tutorial.youtubeId} mute={false} />
                      <p className="line-clamp-2 text-ellipsis px-5">{tutorial.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestInOpenTelementry
