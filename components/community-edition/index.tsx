import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

export const CommunityEdition = () => {
  return (
    <section>
    <div className='container flex h-auto border border-signoz_slate-400 border-dashed px-10 py-10 !border-b-0 !border-r-0'>
      <div className="flex flex-col w-full">
        <div>
        <p className='text-2xl font-semibold text-signoz_vanilla-100'> Get started with Community Edition</p>
        <p className='text-signoz_vanilla-400 text-base font-normal leading-9'>You always have the open source version of SigNoz to get started with your observability journey.</p>
        </div>
        <div className="h-[352px] card-background"></div>
        <div className='flex flex-row gap-3 mt-[18px]'>
        </div>

      </div>
    </div>
  </section>
  )
}
