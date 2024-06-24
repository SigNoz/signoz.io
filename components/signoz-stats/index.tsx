'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '../../components/ui/Button'
import Card from '@/components/Card/card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const SigNozStats = () => {
  const STATS_LIST = [
    { id: 1, logo: '/img/index_features/layout-grid.svg', name: 'Downloads', value: '10Mn+' },
    { id: 2, logo: '/img/index_features/layout-grid.svg', name: 'GitHub Stars', value: '17k+' },
    { id: 3, logo: '/img/index_features/layout-grid.svg', name: 'Contributors', value: '140+' },
    { id: 4, logo: '/img/index_features/layout-grid.svg', name: 'Community Members', value: '4.5k+' },
  ]
  return (
    <section>
      <div className="py-16">
        <div className="container my-10 mb-16 flex flex-row">
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <Heading type={1}>
              Developers Love Signoz
            </Heading>
          </div>

          <div className="flex flex-col mx-auto mb-16 max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-16 text-center">
              {STATS_LIST.map((stat) => (
                <Card
                  logo={stat.logo}
                  subTitle={stat.value}
                  description={stat.name}
                />
              ))}
            </div>
            <div className="flex flex-row">
              <Link href="/">
                <button className="h-8 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">Join the community<ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/">
                <button className="h-8 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">GitHub Repository<ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SigNozStats
