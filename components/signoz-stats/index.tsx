'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/card'
import { ArrowRight, BookOpen } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

const SigNozStats = () => {
  const STATS_LIST = [
    {
      id: 1,
      logo: '/img/index_features/download.svg',
      name: 'OSS Downloads',
      value: '10 million+',
    },
    { id: 2, logo: '/img/index_features/github.svg', name: 'GitHub Stars', value: '22k+' },
    { id: 3, logo: '/img/index_features/contributions.svg', name: 'Contributors', value: '140+' },
    { id: 4, logo: '/img/index_features/community.svg', name: 'Community Members', value: '4.5k+' },
  ]
  return (
    <section>
      <div className="">
        <div className="section-container !mx-auto flex !w-[100vw] flex-col border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 !px-0 sm:flex-row md:!w-[80vw]">
          <div className="!w-[300px] flex-1 border !border-b-0 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400">
            <p className="pl-12 pt-10 text-left text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
              Developers <br />
              Love
              <br />
              SigNoz
            </p>
          </div>

          <div className="flex flex-[2_2_0%] flex-col">
            <div className="grid grid-cols-1 text-left sm:grid-cols-2">
              {STATS_LIST.map((stat) => (
                <Card
                  logo={stat.logo}
                  stats={stat.value}
                  description={stat.name}
                  logoSize={24}
                  key={stat.name}
                  sectionName="Stats"
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-3 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 py-6 sm:flex-row sm:py-6 sm:pl-10">
              <TrackingLink
                href="https://signoz.io/slack/"
                className="inline-block"
                clickType="Primary CTA"
                clickName="Join Community Link"
                clickText="Join the community"
                clickLocation="Stats Section"
                target="_blank"
              >
                <Button className="flex-center text-xs sm:text-sm" id="btn-join-community-homepage">
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Join the community
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </TrackingLink>
              <TrackingLink
                href="https://github.com/SigNoz/signoz/"
                className="inline-block"
                clickType="Secondary CTA"
                clickName="GitHub Repository Link"
                clickText="GitHub Repository"
                clickLocation="Stats Section"
                target="_blank"
              >
                <Button
                  type={Button.TYPES.SECONDARY}
                  className="flex-center text-xs sm:text-sm"
                  id="btn-github-repo-homepage"
                >
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  GitHub Repository
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </TrackingLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SigNozStats
