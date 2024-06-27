'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '../../components/ui/Button'
import { ArrowRight, Book, BookOpen } from 'lucide-react'
import Link from 'next/link'

const DataProtectionLaws = () => {
  return (
    <section>
    <div className='container flex w-auto h-auto border border-signoz_slate-400 border-dashed px-10 py-10'>
      <div className="flex flex-col">
        <div>
        <p className='text-2xl font-semibold text-signoz_vanilla-100'> Worried about Data Protection Laws?</p>
        <p className='text-signoz_vanilla-400 text-base font-normal leading-9'> - Store your data in the US, EU or India region depending on your needs.</p>
        <p className='text-signoz_vanilla-400 text-base font-normal leading-9'> - You can self-host SigNoz or opt for our managed self-hosted offerings to have complete   adherence to data privacy and regulation laws.</p>
        </div>
        <div className="h-[352px] w-auto bg-signoz_ink-400"></div>
        <div className='flex flex-row gap-3 mt-[18px]'>
          <Link href="/">
          <button className="h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">Use Signoz Cloud<ArrowRight size={14} />
        </button>
          </Link>
          <Link href="/">
          <button className="h-10 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white"><BookOpen size={14} />Self-Host SigNoz
        </button>
          </Link>
          <Link href="/">
          <button className="h-10 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white"><BookOpen size={14} />On-prem, managed by SigNoz
        </button>
          </Link>
        </div>

      </div>
    </div>
  </section>
  )
}

export default DataProtectionLaws
