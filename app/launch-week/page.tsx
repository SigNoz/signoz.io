import * as React from 'react'
import type { Metadata } from 'next';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import CountdownTimer from '@/components/Timer';

export const metadata: Metadata = {
  title: {
    absolute: 'Launch Week 2.0 | Sep 16 - 20 | 9 AM PT',
  },
  openGraph: {
    title: 'Launch Week 2.0 | Sep 16 - 20 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/launch_week/launch-week-cover.webp'
  },
  description:
    'Join us for a week of announcing new features at 9 AM PT daily.',
  twitter: {
    title: 'Launch Week 2.0 | Sep 16 - 20 | 9 AM PT',
    description: 'Join us for a week of announcing new features at 9 AM PT daily.',
    images: '/img/launch_week/launch-week-cover.webp'
  }
}




const MainSection: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="flex w-full flex-col items-start px-20 pt-12 font-medium max-md:max-w-full max-md:px-5">
        <div className="mb-0 ml-5 !mt-[-40px] flex max-w-full flex-col max-md:mb-2.5 container max-h-full !px-0 border-l border-r border-dashed border-signoz_slate-100">
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="flex max-w-full flex-col mt-10">
              <div className='flex flex-col sm:flex-row justify-between gap-6'>
                <div className="text-xl px-4 max-w-full font-mono text-signoz_vanilla-400 max-md:max-w-full">
                  {`// Sept 16 ⎯ 20`}
                </div>
                <div className='flex flex-row items-center gap-4 px-4'>
                  <div className='inline-block w-3 h-3 bg-signoz_cherry-500 rounded-sm' />
                  <div className="pr-2 text-lg sm:text-xl uppercase font-mono text-signoz_vanilla-400 max-md:max-w-full">
                    ONLINE — WORLDWIDE, 9AM PT
                  </div>
                </div>
              </div>
              <div className="mt-8 px-4 text-5xl uppercase font-medium text-signoz_vanilla-100 max-w-full max-md:max-w-full max-md:text-4xl border-b border-dashed border-signoz_slate-100">
                Launch Week <span className="text-signoz_cherry-500">2.0</span>
              </div>
            </div>
            <div className="mt-11 px-4 text-base font-mono leading-8 font-medium self-stretch text-signoz_vanilla-400 max-md:mt-10 max-md:max-w-full z-10 border-b border-dashed border-signoz_slate-100">
              Join us for a week of new features and find new ways
              <br />
              to level up on your observability goals.
            </div>
          </div>

          <div className="ml-5 my-6 flex min-h-[40px] z-[1] w-fit items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-white px-4 py-2 text-sm leading-none text-signoz_ink-500">
            <Link href="https://lu.ma/n4qst10q" target='_blank' id="launch-page-subscribe">
              <div className="flex items-center gap-1.5">
                <img src='/svgs/icons/subscribe.svg' alt='subscribe icon' />
                <span className="px-2 py-1 text-sm font-medium leading-none text-neutral-950">
                  Subscribe for updates
                </span>
              </div>
            </Link>
          </div>


          <div className='flex flex-col sm:flex-row justify-between py-6 px-6 border-b border-t border-signoz_slate-100 border-dashed'>
            <div className='flex flex-col justify-between gap-4 pr-4'>
              <div className='text-base uppercase text-signoz_vanilla-400'>Monday ⎯ Sept 16</div>
              <Link href="" target='_blank' id="btn-watch-youtube-video" className='flex px-3 py-2 mb-4 sm:mb-0 justify-center items-center gap-2 rounded-full button-background'>
                <img src='/svgs/icons/watch-video.svg' alt='watch video icon' />
                <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>Watch the video</span>
              </Link>
            </div>
            <Link href="" target='_blank' className='flex justify-between max-w-full py-4 px-5 launch-week-card-background hover:bg-[#121317] transition-colors duration-300 w-[864px] rounded-md border border-signoz_slate-500'>
              <div><img src='/img/graphics/homepage/feature-graphic-2.webp' height={240} width={400} className='pr-2 sm:pr-0' /></div>
              <div className='flex flex-col justify-between group'>
                <div>
                  <div className='text-base font-eedium mb-2'>Monitoring Messaging queues</div>
                  <div className='text-sm font-medium text-signoz_vanilla-400'>Our metrics are charged simple at $0.1 per million samples.</div>
                </div>
                <div className='flex justify-end'>
                  <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5 mt-2 sm:mt-0'>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>


          <div className='flex flex-col sm:flex-row justify-between py-6 px-6 border-b border-signoz_slate-100 border-dashed'>
            <div className='flex flex-col justify-between gap-4 pr-4'>
              <div className='text-base uppercase text-signoz_vanilla-400'>Tuesday ⎯ Sept 17</div>
              <Link href="" target='_blank' id="btn-watch-stream" className='flex px-3 py-2 mb-4 sm:mb-0 justify-center items-center gap-2 rounded-full button-background'>
                <img src='/svgs/icons/watch-video.svg' alt='watch stream icon' />
                <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>Watch the stream</span>
              </Link>
            </div>
            <Link href="" target='_blank' className='flex justify-between max-w-full py-4 px-5 launch-week-card-background hover:bg-[#121317] transition-colors duration-300 w-[864px] rounded-md border border-signoz_slate-500'>
              <div><img src='/img/graphics/homepage/feature-graphic-2.webp' height={240} width={400} className='pr-2 sm:pr-0' /></div>
              <div className='flex flex-col justify-between group'>
                <div>
                  <div className='text-base font-eedium mb-2'>Monitoring Messaging queues</div>
                  <div className='text-sm font-medium text-signoz_vanilla-400'>Our metrics are charged simple at $0.1 per million samples.</div>
                </div>
                <div className='flex justify-end'>
                  <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5 mt-2 sm:mt-0'>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>


          {['Wednesday ⎯ Sept 18', 'Thursday ⎯ Sept 19', 'Friday ⎯ Sept 20'].map((day, index) => (
            <div key={index} className="flex flex-grow items-center py-2 px-6 justify-between border-b border-dashed border-signoz_slate-100">
              <div className="text-base font-mono font-medium text-signoz_vanilla-400 uppercase w-[32%]">
                {day}
              </div>
              <div className="w-[68%] flex justify-end sm:justify-start">
                <CountdownTimer eventDate={`2024-09-${18 + index} 21:30:00`} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <GetStarted page="launch-week" />
    </div>
  )
}

export default MainSection

const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`;
  const readDocumentationId = `btn-read-documentation-${page}-bottom`;

  return (
    <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:50%] bg-[center_top_-10rem] bg-no-repeat z-[-10]">
      <section className='relative pt-5 px-20 max-md:px-5'>
        <div className='relative !mb-0 ml-5 !mt-[-30px] flex max-w-full flex-col max-md:mb-2.5 container max-h-full !px-0'>
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat z-[-10]">
            <div className='flex flex-col gap-16 border-l border-r border-dashed border-signoz_slate-100'>
              <div className='flex flex-col gap-12'>
                <p className='text-4xl font-bold text-center mb-0 mt-20'>
                  Get started with <br /> SigNoz Cloud today
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                  <Button id={getStartedId}>
                    <Link href="/teams/" className="flex-center">
                      Try SigNoz Cloud
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
              <div className="relative flex justify-center items-center">
                <img
                  src="/img/landing/landing_thumbnail.png"
                  alt="Custom Thumbnail"
                  className="w-3/5 rounded-lg max-sm:-mb-8 -mb-36 z-[-1]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
