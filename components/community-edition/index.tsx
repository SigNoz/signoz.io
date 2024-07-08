import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const CommunityEdition = () => {
  return (
    <section>
      <div className='container flex h-auto border border-signoz_slate-400 border-dashed px-10 py-10 !border-b-0 !border-r-0'>
        <div className="flex flex-col w-full">
          <div>
            <p className='text-2xl font-semibold text-signoz_vanilla-100'> Get started with Community Edition</p>
            <p className='text-signoz_vanilla-400 text-base font-normal leading-9'>You always have the open source version of SigNoz to get started with your observability journey.</p>
          </div>
          <div className="h-[250px]">
            <Link href={'https://github.com/SigNoz/signoz'} style={{ cursor: 'default' }}>
              <div className="flex items-center p-4 bg-signoz_ink-400 hover:bg-signoz_ink-300 text-white border border-none rounded group">
                <div className="mr-4">
                  <img src="/svgs/icons/signoz.svg" alt="SigNoz Icon"/>
                </div>
                <div className="flex-grow">
                  <div className="text-sm sm:text-base font-medium text-signoz_vanilla-400">SigNoz / <span className='text-signoz_vanilla-100'>signoz</span></div>
                  <div className="text-[10px] sm:text-sm text-signoz_vanilla-400">The open-source observability platform — v0.48.1</div>
                </div>
                <div className="ml-4 transform transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16}/>
                </div>
              </div>
            </Link>
          </div>
          <div className='flex flex-row gap-3 mt-[18px]'>
          </div>
        </div>
      </div>
    </section>
  )
}
