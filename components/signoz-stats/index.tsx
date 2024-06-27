'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '../../components/ui/Button'
import Card from '@/components/Card/card'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

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
        <div className="container my-10 mb-16 flex border border-signoz_slate-400 border-dashed">
          <div className="mb-10 flex flex-2 flex-col items-center justify-center text-center">
            <p className='text-signoz_vanilla-100 text-[44px] font-bold leading-[3.5rem] text-left'>
              Developers <br/>Love<br/>Signoz
            </p>
          </div>

          <div className="flex flex-1 flex-col  max-w-7xl">
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
            <div className="flex flex-row gap-3 py-6 pl-10 border border-signoz_slate-400 border-dashed ">
              <Link href="/">
                <button className="h-10 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white"><BookOpen size={14}/>Join the community<ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/">
                <button className="h-10 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white"><BookOpen size={14}/>GitHub Repository<ArrowRight size={14} />
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
