import React from 'react'
import Hero from '@/components/ui/Hero'
import { ArrowRight, Handshake, LucideGamepad2, LucideRocket } from 'lucide-react'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'
import Link from 'next/link'
import { VideoModalPlayer } from './VideoModalPlayer'

// Server component with single CTA
export async function Header() {
  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[-1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border  !border-b-0 !border-t-0  border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        {/* Uncomment the below link tag to create a pill on homepage */}

        {/*<Link href="https://signoz.io/events/kubecon-cloudnativecon-north-america-2025/">
          <button className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-signoz_slate-200 bg-signoz_slate-400 px-4 py-2 text-xs font-medium leading-5 text-white shadow-[0_0_14px_0_rgba(78,116,248,0.40)] sm:gap-2 sm:text-sm">
          
            🎁  Olly's got 15 mystery boxes for KubeCon. Will you find one?
          </button>
        </Link>*/}
        <div className="absolute left-0 top-[147px] z-[-1] h-10 !w-[100vw] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 sm:h-14 md:top-[253px] md:!w-[80vw]" />
        <Hero>
          OpenTelemetry-Native Logs,&nbsp;
          <br className="hidden lg:inline" />
          Metrics and Traces in a single pane
        </Hero>
        <p className="m-0 p-3 text-base font-medium sm:p-0">
          SigNoz is an open-source Datadog or New Relic alternative. Get APM, logs,{' '}
          <br className="hidden lg:inline" /> traces, metrics, exceptions, & alerts in a single
          tool.
        </p>
      </div>
      {/* <div className='!w-[80vw] h-12 !mx-auto border border-signoz_slate-400 border-dashed !border-t-0 !border-b-0' /> */}
      <div className="!mx-auto mx-2 flex !w-[100vw] flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw] md:flex-row">
        {/* Single CTA with control version */}
        <TrackingLink
          href="/teams/"
          clickType="Primary CTA"
          clickName="Sign Up Button"
          clickText="Get Started - Free"
          clickLocation="Hero Section"
        >
          <Button className="flex-center" id="btn-get-started-homepage-hero">
            Get Started - Free
            <ArrowRight size={14} />
          </Button>
        </TrackingLink>
      </div>
      <div className="section-container !mx-auto !mt-0 !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 md:!w-[80vw] md:border-dashed">
        <div className="w-100 mx-[-28px]">
          <VideoModalPlayer
            thumbnailSrc="/img/landing/landing_thumbnail.webp"
            videoId="944340217"
          />
        </div>
      </div>
    </header>
  )
}
