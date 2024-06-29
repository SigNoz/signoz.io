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
    { id: 1, logo: '/img/index_features/layout-grid.svg', name: 'Downloads', value: '10 million+' },
    { id: 2, logo: '/img/index_features/layout-grid.svg', name: 'GitHub Stars', value: '17k+' },
    { id: 3, logo: '/img/index_features/layout-grid.svg', name: 'Contributors', value: '140+' },
    { id: 4, logo: '/img/index_features/layout-grid.svg', name: 'Community Members', value: '4.5k+' },
  ]
  return (
    <section>
      <div className="">
        <div className="!w-[80vw] !mx-auto !px-0 container flex border border-signoz_slate-400 border-dashed !border-t-0 !border-b-0">
          <div className="flex-1 !w-[300px] border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0 !border-l-0">
            <p className='text-signoz_vanilla-100 text-[44px] font-bold leading-[3.5rem] text-left pt-10 pl-12'>
              Developers <br/>Love<br/>Signoz
            </p>
          </div>

          <div className="flex flex-col max-w-7xl flex-[2_2_0%]">
            <div className="grid grid-cols-2 text-left">
              {STATS_LIST.map((stat) => (
                <Card
                  logo={stat.logo}
                  stats={stat.value}
                  description={stat.name}
                  logoSize={24}
                />
              ))}
            </div>
            <div className="flex flex-row gap-3 py-6 pl-10 border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0">
              <Link href="/">
                <Button>
                <BookOpen size={14}/>Join the community<ArrowRight size={14} />
                </Button>
              </Link>
              <Link href="/">
                <Button type={Button.TYPES.SECONDARY}>
                <BookOpen size={14}/>GitHub Repository<ArrowRight size={14} />
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
