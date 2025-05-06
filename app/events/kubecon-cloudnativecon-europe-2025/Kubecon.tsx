// @ts-nocheck
'use client'

import * as React from 'react'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, Handshake, MapPin, Megaphone } from 'lucide-react'


const MainSection: React.FC = () => {


  return (
    <>
      <section className="flex w-full flex-col items-start px-20 pt-12 font-medium max-md:max-w-full max-md:px-5">
        <div className="container !mt-[-40px] mb-0 ml-5 flex max-h-full max-w-full flex-col border-l border-r border-dashed border-signoz_slate-100 !px-0">
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="mt-10 flex max-w-full flex-col">
              <div className="flex flex-col justify-between gap-6 sm:flex-row">
                <div className="max-w-full px-6 font-mono text-xl text-signoz_vanilla-400 max-md:max-w-full">
                  {`// 1 Apr ⎯ 4 Apr`}
                </div>
              </div>
              <div className="mt-8 max-w-full border-b border-dashed border-signoz_slate-100 px-6 text-5xl font-medium uppercase text-signoz_vanilla-100 max-md:max-w-full max-md:text-4xl">
                meet us at <span className="text-signoz_cherry-500">booth s631</span> <br /> in kubecon europe <span className="text-signoz_cherry-500">2025</span>
              </div>
            </div>
            <div className="z-10 mt-11 self-stretch border-b border-dashed border-signoz_slate-100 px-6 font-mono text-base font-medium leading-8 text-signoz_vanilla-400 max-md:mt-10 max-md:max-w-full">
             Heading to KubeCon Europe? Come say hi to Team SigNoz at booth S631.
              <br className="hidden sm:block" /> We're also excited to be presenting 3 talks — don’t miss them!
            </div>
          </div>

          <div className="z-[1] my-6 ml-5 flex min-h-[40px] w-fit items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-white px-4 py-2 text-sm leading-none text-signoz_ink-500">
            <Link href="https://lu.ma/9pttptzu" target="_blank" id="launch-page-subscribe">
              <div className="flex items-center gap-1.5">
                <Handshake size={14} />
                <span className="px-2 py-1 text-sm font-medium leading-none text-neutral-950">
                  Meet SigNoz Team
                </span>
              </div>
            </Link>
          </div>

      

          <div className="mt-8 mb-16 max-w-full px-6 text-5xl font-medium uppercase text-signoz_vanilla-100 max-md:max-w-full max-md:text-4xl">
            Talks From <span className="text-signoz_cherry-500"> Team SigNoz</span>
          </div>


          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Apr 1, 2025 <br />
                  10:40pm - 11:05 BST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Level 0 | ICC Capital Hall <br /> Room I</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://colocatedeventseu2025.sched.com/event/1u5eV"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://colocatedeventseu2025.sched.com/event/1u5eV"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/A_I'mSpeaking.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Instrumenting Unified Observability with OpenTelemetry - IDP on Backstage with OpenTelemetry</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>
                  <div className='flex flex-col gap-5'>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Shivanshu.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Shivansu Raj Shrivastava</div>
                        <div className='text-xs'>Founding Engineer <br /> SigNoz </div>
                      </div>
                    </div>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Ekansh.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Ekansh Gupta</div>
                        <div className='text-xs'>Software Engineer <br />SigNoz</div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>



          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Apr 1, 2025 <br />
                  15:20 - 15:45 BST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Level 0 | ICC Capital Hall<br />Room J</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://colocatedeventseu2025.sched.com/event/1u5gj/bridging-the-cloud-native-opentelemetry-education-gap-shivay-lamba-couchbase-shivanshu-raj-shrivastava-signoz"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://colocatedeventseu2025.sched.com/event/1u5gj/bridging-the-cloud-native-opentelemetry-education-gap-shivay-lamba-couchbase-shivanshu-raj-shrivastava-signoz"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/B_I'mSpeaking.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Bridging the Cloud Native OpenTelemetry Education Gap</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/events/kubecon/shivay-lamba.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Shivay Lamba</div>
                        <div className='text-xs'>Developer Relations Engineer <br /> Couchbase</div>
                      </div>
                    </div>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Shivanshu.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Shivansu Raj Shrivastava</div>
                        <div className='text-xs'>Founding Engineer <br /> SigNoz </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Thursday
                  Apr 3, 2025 <br />
                  16:55 - 17:00 BST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Level 0 <br />ICC Auditorium</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://kccnceu2025.sched.com/event/1txCq?iframe=no"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://kccnceu2025.sched.com/event/1txCq?iframe=no"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/D_I'mSpeaking.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base"> Lightning Talk: Observability Diet - Your 5-step plan to trim the Data fat</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Pranay.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Pranay Prateek</div>
                        <div className='text-xs'>Maintainer <br /> SigNoz</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>
      <GetStarted page="launch-week" />
    </>
  )
}

export default MainSection


const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <div className="flex flex-col gap-16 px-20 font-medium max-md:max-w-full max-md:px-5 ">
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:45%] bg-[center_top_-12rem] sm:bg-no-repeat">
        <section className="container flex max-h-full max-w-full flex-col border-l border-r border-dashed border-signoz_slate-100 !px-0">
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[length:110%] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className="flex flex-col gap-12">
              <p className="mb-0 mt-20 text-center text-3xl sm:text-4xl font-bold">
                OpenTelemetry-Native Logs,
                <br /> Metrics and Traces in a single pane
              </p>
              <div className="mb-10 flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                <Button id={getStartedId}>
                  <Link href="/teams/" className="flex-center">
                    Get Started - Free
                    <ArrowRight size={14} />
                  </Link>
                </Button>

                <Button type={Button.TYPES.SECONDARY} id={readDocumentationId}>
                  <Link href="/docs/introduction/" className="flex-center">
                    <BookOpen size={14} />
                    Read Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src="/img/landing/landing_thumbnail.webp"
                alt="Custom Thumbnail"
                className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
