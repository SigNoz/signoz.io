'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import { ArrowRight, Book, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button/Button'

const DataProtectionLaws = ({ isInPricingPage = false }) => {
  return (
    <section>
      <div className='container flex w-auto h-auto border border-signoz_slate-400 border-dashed px-10 py-10 !border-r-0 !border-b-0'>
        <div className="flex flex-col">
          <div>
            <p className='text-2xl font-semibold text-signoz_vanilla-100 block mb-2'>Worried about Data Protection Laws?</p>
            {!isInPricingPage ?

              <ul className="list-['—_'] pl-5 ">
                <li className='text-signoz_vanilla-400 text-base font-normal leading-9 mb-2 max-w-[50vw] sm:w-[35rem]'>&nbsp;Store your data in the US, EU or India region depending on your needs.</li>
                <li className='text-signoz_vanilla-400 text-base font-normal leading-9 max-w-[50vw] sm:w-[35rem]'>&nbsp;You can self-host SigNoz or opt for our managed self-hosted offerings to have complete adherence to data privacy and regulation laws.</li>
              </ul> :

              <div className='text-signoz_vanilla-400 text-base font-normal leading-9 mb-10'>
                No need to send data outside your region. We have data centers in US, EU and India to comply with data privacy regulations. You can also host SigNoz in your own cloud.
              </div>
            }

          </div>
          <img src="/img/graphics/homepage/feature-graphic-data-protection.png" alt="" />
          {
            !isInPricingPage ?
              <div className='flex flex-col sm:flex-row gap-3 mt-[18px]'>
                <Link href="/teams/">
                  <Button className="w-[100%] text-xs sm:text-sm">
                    Use Signoz Cloud <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Button>
                </Link>
                <Link href="/docs/install/">
                  <Button type={Button.TYPES.SECONDARY} className="w-[100%] text-xs sm:text-sm">
                    <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />Self-Host Signoz
                  </Button>
                </Link>
                <Link href="/enterprise/">
                  <Button type={Button.TYPES.SECONDARY} className="w-[100%] text-xs sm:text-sm">
                    <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />On-prem, managed by SigNoz
                  </Button>
                </Link>
              </div> : null
          }
        </div>
      </div>
    </section>
  )
}

export default DataProtectionLaws

