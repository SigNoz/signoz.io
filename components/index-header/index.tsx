'use client'

import React from 'react'
import SubHeading from '../../components/ui/SubHeading'
import Hero from '../../components/ui/Hero'
import Button from '../../components/ui/Button'
import VimeoPlayer from '../../components/VimeoPlayer/VimeoPlayer'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const Header = () => {
  return (
    <header className="mt-28">
      <div className="mb-5 flex flex-col items-center px-5 text-center">
        <Link href="/">
          <button className="h-10 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_slate-400 font-medium leading-5 text-white border border-signoz_slate-200 shadow-[0_0_14px_0_rgba(78,116,248,0.40)]">
            <BookOpen size={14}/>SigNoz raises $6.5 million<ArrowRight size={14} />
          </button>
        </Link>
        <Hero>
          Best OpenTelemetry-Native&nbsp;
          <br className="hidden lg:inline" />
          Observability In A Single Pane
        </Hero>
        <p className='text-base font-medium m-0'>
          SigNoz is an open-source Datadog or New Relic alternative. Get APM, logs,{' '}
          <br className="hidden lg:inline" /> traces, metrics, exceptions, & alerts in a single tool.
        </p>
      </div>
      <div className="mx-5 mb-12 flex flex-col justify-center gap-5 md:flex-row">
      <Link href="/teams/">
          <button className="h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">
            Start your free trial
            <ArrowRight size={14} />
        </button>
          </Link>
      <Link href="/docs/introduction/">
          <button className="h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">
            <BookOpen size={14}/>
            Read Documentation
        </button>
          </Link>
      </div>
      <div className="container">
        <div className="w-100 mx-auto">
          <div className="product-explainer-video hero-figure rounded-lg p-3">
            <div className="embed-container">
              <VimeoPlayer videoId="944340217" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
