'use client'

import React from 'react'
import SubHeading from '../../components/ui/SubHeading'
import Hero from '../../components/ui/Hero'
import VimeoPlayer from '../../components/VimeoPlayer/VimeoPlayer'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'

export const Header = () => {
  return (
    <header className="mt-16 "> 
      <div className="mb-5 flex flex-col items-center pt-24 px-5 text-center relative">
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
      <div className="mx-5 mb-12 flex flex-col justify-center gap-3 md:flex-row">
      <Link href="/teams/">
          <Button>
            Start your free trial
            <ArrowRight size={14} />
          </Button>
          </Link>
      <Link href="/docs/introduction/">
          <Button type={Button.TYPES.SECONDARY}>
            <BookOpen size={14}/>
            Read Documentation
            </Button>
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
