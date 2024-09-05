import * as React from 'react'
import type { Metadata } from 'next';

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
    <div className="flex flex-col overflow-hidden relative">
      <section className="relative flex min-h-[908px] min-h-screen w-full flex-col items-start px-20 pb-[583px] pt-12 font-medium max-md:max-w-full max-md:px-5 max-md:pb-24">
        <img
          loading="lazy"
          src="/img/launch_week/launch-week-bg.webp"
          alt="background"
          className="absolute inset-0 size-full container object-cover"
        />
        <div className="relative mb-0 ml-5 !mt-[-40px] flex w-[533px] max-w-full flex-col max-md:mb-2.5 container max-h-full">
          <div className="flex w-full flex-col max-md:max-w-full p-2">
          <div className="absolute bottom-0 left-[12px] h-[300%] right-[12px] top-0 z-[1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-100 md:left-[16px] md:right-[16px]" />
          <div className="absolute bottom-0 left-[12px] h-[300%] right-[12px] top-0 z-[1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-100 md:left-[0px] md:right-[0px]" />

            <div className="flex max-w-full flex-col mt-10">
              <div className='flex flex-col sm:flex-row justify-between gap-6'>
              <div className="text-xl pl-2 max-w-full font-mono text-signoz_vanilla-400 max-md:max-w-full">
                // Sept 16 ⎯ 20
              </div>
              <div className='flex flex-row items-center gap-4'>
              <div className='inline-block w-3 h-3 bg-signoz_cherry-500 rounded-sm'/>
              <div className=" pr-2 text-lg sm:text-xl uppercase font-mono text-signoz_vanilla-400 max-md:max-w-full">
                ONLINE — WORLDWIDE, 9AM PT
              </div>
              </div>
              </div>
              <div className="mt-4 pl-2 text-5xl uppercase font-medium text-signoz_vanilla-100 max-w-full max-md:max-w-full max-md:text-4xl">
                Launch Week <span className="text-signoz_cherry-500">2.0</span>
              </div>
              <div className="absolute bottom-0 left-[12px] h-screen right-[12px] bottom-[172px] z-[0] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-100 md:left-[0px] md:right-[0px]" />
            </div>
            <div className="absolute bottom-0 left-[12px] h-screen right-[12px] bottom-[104px] z-[0] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-100 md:left-[0px] md:right-[0px]" />
            <div className="mt-11 pl-2 text-base font-mono leading-8 font-medium self-stretch text-signoz_vanilla-400 max-md:mt-10 max-md:max-w-full z-10">
              Join us for a week of new features and find new ways
              <br />
              to level up on your observability goals.
            </div>
            <div className="absolute bottom-0 left-[12px] h-screen right-[12px] bottom-[80px] z-[0] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-100 md:left-[0px] md:right-[0px]" />
          </div>
          <a
            href="https://lu.ma/n4qst10q"
            target='_blank'
            className="ml-5 mt-6 flex min-h-[40px] z-[1] w-fit items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-white px-4 py-2 text-sm leading-none text-signoz_ink-500"
            id="launch-page-subscribe"

          >
            <img src='/svgs/icons/subscribe.svg'></img>
            <span className="px-2 py-1 text-sm font-medium leading-none text-neutral-950">
              Subscribe for updates
            </span>
          </a>
        </div>
      </section>
    </div>
  )
}

export default MainSection
