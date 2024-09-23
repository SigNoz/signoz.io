'use client'

import * as React from 'react'
import { useState } from 'react';
import type { Metadata } from 'next';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import CountdownTimer from '@/components/Timer';
import { Linkedin } from '@/components/social-icons/SolidIcons';
import Youtube from '@/components/VideoPlayer/VideoPlayer'
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'

const MainSection: React.FC = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [videoId, setVideoId] = useState<string>('');

  const handleOpenModal = (id: string) => {
    setVideoId(id);
    onOpen(); 
  };

  return (
    <>
      <section className="flex w-full flex-col items-start px-20 pt-12 font-medium max-md:max-w-full max-md:px-5">
        <div className="mb-0 ml-5 !mt-[-40px] flex max-w-full flex-col container max-h-full !px-0 border-l border-r border-dashed border-signoz_slate-100">
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="flex max-w-full flex-col mt-10">
              <div className='flex flex-col sm:flex-row justify-between gap-6'>
                <div className="text-xl px-6 max-w-full font-mono text-signoz_vanilla-400 max-md:max-w-full">
                  {`// Sept 16 ⎯ 20`}
                </div>
                <div className='flex flex-row items-center gap-4 px-6'>
                  <div className='inline-block w-3 h-3 bg-signoz_forest-500 rounded-sm' />
                  <div className="pr-2 text-lg sm:text-xl uppercase font-mono text-signoz_vanilla-400 max-md:max-w-full">
                    ONLINE — WORLDWIDE, 9AM PT
                  </div>
                </div>
              </div>
              <div className="mt-8 px-6 text-5xl uppercase font-medium text-signoz_vanilla-100 max-w-full max-md:max-w-full max-md:text-4xl border-b border-dashed border-signoz_slate-100">
                Launch Week <span className="text-signoz_cherry-500">2.0</span>
              </div>
            </div>
            <div className="mt-11 px-6 text-base font-mono leading-8 font-medium self-stretch text-signoz_vanilla-400 max-md:mt-10 max-md:max-w-full z-10 border-b border-dashed border-signoz_slate-100">
              Join us for a week of new features and find new ways
              <br className='hidden sm:block' />
              {' '}to level up on your observability goals.
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
            <div className='flex flex-col justify-between gap-4 sm:pr-4'>
              <div className='text-base uppercase text-signoz_vanilla-400'>Monday ⎯ Sept 16</div>
              <div className='flex flex-col gap-2'>
                <Link href="https://www.linkedin.com/events/signozlaunchweek2-0-day1-ingest7239997437791064064/theater/" target='_blank' id="btn-linkedin-live" className='flex px-3 py-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background justify-center'>
                  <Linkedin className='w-4 h-4' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>LinkedIn Live</span>
                </Link>
                <div id="btn-watch-youtube-video" className='flex px-3 py-2 mb-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background cursor-pointer justify-center' onClick={() => handleOpenModal('SJ7H82wbXJo')} >
                  <img src='/svgs/icons/watch-video.svg' alt='watch video icon' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>Watch the video</span>
                </div>
              </div>
            </div>
            <Link href="/blog/introducing-ingest-guard-feature/" className='flex sm:flex-row flex-col gap-6 max-w-full py-4 px-5 launch-week-card-background hover:bg-[#121317] transition-colors duration-300 w-[864px] rounded-md border border-signoz_slate-500 cursor-pointer'>
              <img src='/img/launch-week/launch-week-2/day-1-ingest-gaurd-cover.webp' className=' w-auto sm:w-3/5 h-auto pr-2 sm:pr-0 mb-4 sm:mb-0' />
              <div className='flex flex-col justify-between group'>
                <div>
                  <div className='text-base font-eedium mb-2'>Introducing Ingest Guard</div>
                  <div className='text-sm font-medium text-signoz_vanilla-400'>A game changer for Observability cost control</div>
                </div>
                <div className='flex justify-end'>
                  <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5 mt-2 sm:mt-0'>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link> 
          </div>



          <div className='flex flex-col sm:flex-row justify-between py-6 px-6 border-b border-t border-signoz_slate-100 border-dashed'>
            <div className='flex flex-col justify-between gap-4 sm:pr-4'>
              <div className='text-base uppercase text-signoz_vanilla-400'>Tuesday ⎯ Sept 17</div>
              <div className='flex flex-col gap-2'>
                <Link href="https://www.linkedin.com/events/signozlaunchweek2-0-day2-alerts7241444501922181120/theater/" target='_blank' id="btn-linkedin-live" className='flex px-3 py-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background justify-center'>
                  <Linkedin className='w-4 h-4' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>LinkedIn Live</span>
                </Link>
                <div id="btn-watch-youtube-video" className='flex px-3 py-2 mb-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background cursor-pointer justify-center' onClick={() => handleOpenModal('uvXNZxAd4w0')}>
                  <img src='/svgs/icons/watch-video.svg' alt='watch video icon' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>Watch the video</span>
                </div>
              </div>
            </div>
            <Link href="/blog/introducing-anomaly-detection-for-smarter-alerts/" className='flex sm:flex-row flex-col gap-6 max-w-full py-4 px-5 launch-week-card-background hover:bg-[#121317] transition-colors duration-300 w-[864px] rounded-md border border-signoz_slate-500 cursor-pointer'>
              <img src='/img/launch-week/launch-week-2/anomaly-detection-blog-poster.webp' className=' w-auto sm:w-3/5 h-auto pr-2 sm:pr-0 mb-4 sm:mb-0' />
              <div className='flex flex-col justify-between group'>
                <div className='min-w-[306px]'>
                  <div className='text-base font-eedium mb-2'>Introducing Anomaly Detection</div>
                  <div className='text-sm font-medium text-signoz_vanilla-400'>Create smarter alerts for dynamic metrics</div>
                </div>
                <div className='flex justify-end'>
                  <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5 mt-2 sm:mt-0'>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          
          <div className='flex flex-col sm:flex-row justify-between py-6 px-6 border-b border-t border-signoz_slate-100 border-dashed'>
            <div className='flex flex-col justify-between gap-4 sm:pr-4'>
              <div className='text-base uppercase text-signoz_vanilla-400'>Wednesday ⎯ Sept 18</div>
              <div className='flex flex-col gap-2'>
                <Link href="https://www.linkedin.com/events/signozlaunchweek2-0-day3-correl7241806894388895744/theater/" target='_blank' id="btn-linkedin-live" className='flex px-3 py-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background justify-center'>
                  <Linkedin className='w-4 h-4' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>LinkedIn Live</span>
                </Link>
                <div id="btn-watch-youtube-video" className='flex px-3 py-2 mb-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background cursor-pointer justify-center' onClick={() => handleOpenModal('_Mpbv1imSEE')}>
                  <img src='/svgs/icons/watch-video.svg' alt='watch video icon' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>Watch the video</span>
                </div>
              </div>
            </div>
            <Link href="/blog/introducing-correlation-of-signals/" className='flex sm:flex-row flex-col gap-6 max-w-full py-4 px-5 launch-week-card-background hover:bg-[#121317] transition-colors duration-300 w-[864px] rounded-md border border-signoz_slate-500 cursor-pointer'>
              <img src='/img/blog/2024/09/introducing-correlation-of-signals-correlation-blog-poster.webp' className=' w-auto sm:w-3/5 h-auto pr-2 sm:pr-0 mb-4 sm:mb-0' />
              <div className='flex flex-col justify-between group'>
                <div>
                  <div className='text-base font-eedium mb-2'>Introducing Correlation</div>
                  <div className='text-sm font-medium text-signoz_vanilla-400'>Bringing Infra/APM Metrics and Logs Together</div>
                </div>
                <div className='flex justify-end'>
                  <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5 mt-2 sm:mt-0'>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>


          <div className='flex flex-col sm:flex-row justify-between py-6 px-6 border-b border-t border-signoz_slate-100 border-dashed'>
            <div className='flex flex-col justify-between gap-4 sm:pr-4'>
              <div className='text-base uppercase text-signoz_vanilla-400'>Thursday ⎯ Sept 19</div>
              <div className='flex flex-col gap-2'>
                <Link href="https://www.linkedin.com/events/signozlaunchweek2-0-day4-alerts7242170689032519680/theater/" target='_blank' id="btn-linkedin-live" className='flex px-3 py-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background justify-center'>
                  <Linkedin className='w-4 h-4' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>LinkedIn Live</span>
                </Link>
                <div id="btn-watch-youtube-video" className='flex px-3 py-2 mb-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background cursor-pointer justify-center' onClick={() => handleOpenModal('7mNB715Ul0Y')}>
                  <img src='/svgs/icons/watch-video.svg' alt='watch video icon' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>Watch the video</span>
                </div>
              </div>
            </div>
            <Link href="/blog/introducing-alerts-history-and-scheduled-maintenance/" className='flex sm:flex-row flex-col gap-6 max-w-full py-4 px-5 launch-week-card-background hover:bg-[#121317] transition-colors duration-300 w-[864px] rounded-md border border-signoz_slate-500 cursor-pointer'>
              <img src='/img/launch-week/launch-week-2/blog-poster.webp' className=' w-auto sm:w-3/5 h-auto pr-2 sm:pr-0 mb-4 sm:mb-0' />
              <div className='flex flex-col justify-between group'>
                <div>
                  <div className='text-base font-eedium mb-2'>Introducing Alerts History & Scheduled Maintenance</div>
                  <div className='text-sm font-medium text-signoz_vanilla-400'>Better manage recurring issues and alert silencing during planned downtimes</div>
                </div>
                <div className='flex justify-end'>
                  <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5 mt-2 sm:mt-0'>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>


          <div className='flex flex-col sm:flex-row justify-between py-6 px-6 border-b border-t border-signoz_slate-100 border-dashed'>
            <div className='flex flex-col justify-between gap-4 sm:pr-4'>
              <div className='text-base uppercase text-signoz_vanilla-400'>Friday ⎯ Sept 20</div>
              <div className='flex flex-col gap-2'>
                <Link href="https://www.linkedin.com/events/signozlaunchweek2-0-day5-logsim7242530405214527488/theater/" target='_blank' id="btn-linkedin-live" className='flex px-3 py-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background justify-center'>
                  <Linkedin className='w-4 h-4' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>LinkedIn Live</span>
                </Link>
                <div id="btn-watch-youtube-video" className='flex px-3 py-2 mb-2 sm:mb-0 w-full items-center gap-2 rounded-full button-background cursor-pointer justify-center' onClick={() => handleOpenModal('n9Kq_l4EeCw')}>
                  <img src='/svgs/icons/watch-video.svg' alt='watch video icon' />
                  <span className='text-[#F7F7F8] text-sm font-medium whitespace-nowrap'>Watch the video</span>
                </div>
              </div>
            </div>
            <Link href="/blog/improvements-to-logs-search-and-filter/" className='flex sm:flex-row flex-col gap-6 max-w-full py-4 px-5 launch-week-card-background hover:bg-[#121317] transition-colors duration-300 w-[864px] rounded-md border border-signoz_slate-500 cursor-pointer'>
              <img src='/img/launch-week/launch-week-2/logs-ui-day-5-cover.webp' className=' w-auto sm:w-3/5 h-auto pr-2 sm:pr-0 mb-4 sm:mb-0' />
              <div className='flex flex-col justify-between group'>
                <div>
                  <div className='text-base font-eedium mb-2'>Logs Search & Filter</div>
                  <div className='text-sm font-medium text-signoz_vanilla-400'>Taking Quick Analysis of Logs to the Next Level</div>
                </div>
                <div className='flex justify-end'>
                  <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5 mt-2 sm:mt-0'>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>


            <Modal size={'5xl'} backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} className='self-center'>
              <ModalContent className="bg-transparent">
                {() => (
                  <>
                    <ModalBody className="py-10">
                      <Youtube id={videoId} />
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>




           {/* Timer  */}
          {/* {['Friday ⎯ Sept 20'].map((day, index) => (
            <div key={index} className="flex flex-grow items-center py-2 px-6 justify-between border-b border-dashed border-signoz_slate-100">
              <div className="text-sm sm:text-base font-mono font-medium text-signoz_vanilla-400 uppercase w-[32%]">
                {day}
              </div>
              <div className="w-[68%] flex justify-end sm:justify-start">
                <CountdownTimer eventDate={`2024-09-${20 + index} 21:30:00`} />
              </div>
            </div>
          ))} */}


          {/* Cards */}
          <div className='flex flex-col gap-7 px-6 mt-12 mb-20'>
            <div className='font-mono uppercase text-signoz_vanilla-400 self-stretch'>More From Launch Week</div>
            <div className='flex flex-col sm:flex-row gap-6'>
              {cardData.map((card, index) => (
                <Card key={index} title={card.title} description={card.description} url={card.url} />
              ))}
            </div>
          </div>

        </div>

      </section>
      <GetStarted page="launch-week" />
    </>
  )
}

export default MainSection


const cardData = [
  {
    title: 'SOC2 Type II and HIPAA Compliant',
    description: 'SigNoz is now SOC2 Type II and HIPAA compliant',
    url: '/blog/signoz-is-soc2-type2-and-hipaa-compliant/'
  },
  {
    title: 'Chat with Ankit, CTO of SigNoz',
    description: 'Get a sneak peek of the upcoming roadmap of SigNoz',
    url: '/blog/insights-into-signoz-latest-features/'
  },
];


const Card = ({ title, description, url }) => {
  return (
    <Link href={url} target="_blank" className='flex flex-col group py-4 px-5 max-w-96 cursor-pointer launch-week-card-background hover:bg-[#121317] rounded-md border border-signoz_slate-500'>
      <div>
        <div className='text-base font-medium mb-2'>{title}</div>
        <div className='text-sm font-medium text-signoz_vanilla-400 mb-10'>{description}</div>
      </div>
      <div className='flex'>
        <div className='rounded-full button-background p-2 flex items-center justify-center w-fit h-fit transform transition-transform group-hover:translate-x-2.5'>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};



const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`;
  const readDocumentationId = `btn-read-documentation-${page}-bottom`;

  return (
    <div className='flex flex-col gap-16 px-20 font-medium max-md:max-w-full max-md:px-5 '>
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:45%] bg-[center_top_-12rem] sm:bg-no-repeat">
        <section className='flex max-w-full flex-col container max-h-full !px-0 border-l border-r border-dashed border-signoz_slate-100'>
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[length:110%] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className='flex flex-col gap-12'>
              <p className='text-4xl font-bold text-center mb-0 mt-20'>
                Get started with <br /> SigNoz Cloud today
              </p>
              <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col mb-10">
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
                className="w-3/5 rounded-lg max-sm:-mb-8 -mb-36 z-[0]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}