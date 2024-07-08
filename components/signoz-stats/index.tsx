'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/card'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

const SigNozStats = () => {
  const STATS_LIST = [
    { id: 1, logo: '/img/index_features/download.svg', name: 'OSS Downloads', value: '10 million+' },
    { id: 2, logo: '/img/index_features/github.svg', name: 'GitHub Stars', value: '17k+' },
    { id: 3, logo: '/img/index_features/contributions.svg', name: 'Contributors', value: '140+' },
    { id: 4, logo: '/img/index_features/community.svg', name: 'Community Members', value: '4.5k+' },
  ]
  return (
    <section>
      <div className="">
        <div className="!w-[80vw] !mx-auto !px-0 container flex flex-col sm:flex-row border border-signoz_slate-400 border-dashed !border-t-0 !border-b-0">
          <div className="flex-1 !w-[300px] border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0 !border-l-0">
            <p className='text-signoz_vanilla-100 text-4xl sm:text-[44px] font-bold leading-[3.5rem] text-left pt-10 pl-12'>
              Developers <br/>Love<br/>Signoz
            </p>
          </div>

          <div className="flex flex-col max-w-7xl flex-[2_2_0%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 text-left">
              {STATS_LIST.map((stat) => (
                <Card
                  logo={stat.logo}
                  stats={stat.value}
                  description={stat.name}
                  logoSize={24}
                />
              ))}
            </div>
            <div className="flex flex-col items-center py-6 sm:flex-row gap-3 sm:py-6 sm:pl-10 border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0">
              <Link href="https://signoz.io/slack/">
                <Button  className="w-[100%] text-xs sm:text-sm">
                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5"/>Join the community<ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </Link>
              <Link href="https://github.com/SigNoz/signoz/">
                <Button type={Button.TYPES.SECONDARY}  className="w-[100%] text-xs sm:text-sm">
                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5"/>GitHub Repository<ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SigNozStats
