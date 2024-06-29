'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import { ArrowRight, Book, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button/Button'

const DataProtectionLaws = () => {
  return (
    <section>
      <div className='container flex w-auto h-auto border border-signoz_slate-400 border-dashed px-10 py-10 !border-r-0 !border-b-0'>
        <div className="flex flex-col">
          <div>
            <p className='text-2xl font-semibold text-signoz_vanilla-100 block mb-2'> Worried about Data Protection Laws?</p>
            <ul className="list-['—_'] pl-5 ">
              <li className='text-signoz_vanilla-400 text-base font-normal leading-9 mb-2 w-[35rem]'>&nbsp;Store your data in the US, EU or India region depending on your needs.</li>
              <li className='text-signoz_vanilla-400 text-base font-normal leading-9 w-[35rem]'>&nbsp;You can self-host SigNoz or opt for our managed self-hosted offerings to have complete   adherence to data privacy and regulation laws.</li>
            </ul>
          </div>
          {/* <div className="h-[206px] w-auto card-background"></div> */}
          <div className='flex flex-row gap-3 mt-[18px]'>
            <Link href="/">
              <Button>
                Use Signoz Cloud <ArrowRight size={14} />
              </Button>
            </Link>
            <Link href="/">
              <Button type={Button.TYPES.SECONDARY}>
                <BookOpen size={14} />Self-Host Signoz
              </Button>
            </Link>
            <Link href="/">
              <Button type={Button.TYPES.SECONDARY}>
                <BookOpen size={14} />On-prem, managed by SigNoz
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DataProtectionLaws
