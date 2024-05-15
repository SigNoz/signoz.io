'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '../../components/ui/Button'
const SigNozStats = () => {
  const STATS_LIST = [
    { id: 1, name: 'Downloads', value: '9Mn+' },
    { id: 2, name: 'GitHub Stars', value: '16k+' },
    { id: 3, name: 'Contributors', value: '130+' },
    { id: 4, name: 'Community Members', value: '4k+' },
  ]
  return (
    <section>
      <div className="bg-[#252529] py-16">
        <div className="container">
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <Heading type={1}>
              Developers <span className="heart-emoji">❤️</span> Open Source SigNoz
            </Heading>
            <SubHeading>
              Join our huge open source community and nerd about observability
            </SubHeading>
          </div>
          <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
              {STATS_LIST.map((stat) => (
                <div
                  key={stat.id}
                  className="mx-auto flex max-w-xs flex-col justify-center gap-y-4"
                >
                  <div className="text-2xl leading-7 text-white">{stat.name}</div>
                  <div className="order-first text-2xl font-semibold tracking-tight text-white sm:text-5xl">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Button isButton to={'https://signoz.io/slack'}>
              Join our slack community
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SigNozStats
