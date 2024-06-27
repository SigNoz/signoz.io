import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

export const SignozDatalog = () => {
  return (
    <section>
    <div className='container flex h-auto border border-signoz_slate-400 border-dashed px-10 py-10'>
      <div className="flex flex-col w-full">
        <div>
        <p className='text-2xl font-semibold text-signoz_vanilla-100'>SigNoz provides up to 9X ROI than DataDog</p>
        <p className='text-signoz_vanilla-400 text-base font-normal leading-9'>You can also set data ingestion limits so you never get a surprise bill.</p>
        </div>
        <div className="h-[352px] bg-signoz_ink-400"></div>
        <div className='flex flex-row gap-3 mt-[18px]'>
        </div>

      </div>
    </div>
  </section>
  )
}