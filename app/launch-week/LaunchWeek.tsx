'use client'

import * as React from 'react'
import { useState } from 'react'
import type { Metadata } from 'next'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import CountdownTimer from '@/components/Timer'
import { Linkedin } from '@/components/social-icons/SolidIcons'
import Youtube from '@/components/VideoPlayer/VideoPlayer'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react'

const MainSection: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [videoId, setVideoId] = useState<string>('')

  const handleOpenModal = (id: string) => {
    setVideoId(id)
    onOpen()
  }

  return (
    <>
      <section className="flex w-full flex-col items-start px-20 pt-12 font-medium max-md:max-w-full max-md:px-5">
        <div
          className="container !mt-[-40px] mb-0 ml-5 flex max-h-full max-w-full flex-col border-l border-r border-dashed border-signoz_slate-100 !px-0"
          style={{
            backgroundImage: "url('/img/launch_week/launch-week-3-bg.svg')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
          }}
        >
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="mt-10 flex max-w-full flex-col">
              <div className="flex flex-col justify-between gap-6 sm:flex-row">
                <div className="max-w-full px-6 font-mono text-xl text-signoz_vanilla-400 max-md:max-w-full">
                  {`// May 12 ⎯ 16`}
                </div>
                <div className="flex flex-row items-center gap-4 px-6">
                  <div className="inline-block h-3 w-3 rounded-sm bg-signoz_forest-500" />
                  <div className="pr-2 font-mono text-lg uppercase text-signoz_vanilla-400 max-md:max-w-full sm:text-xl">
                    ONLINE — WORLDWIDE, May 12, 9AM PT
                  </div>
                </div>
              </div>
              <div className="mt-8 max-w-full border-b border-dashed border-signoz_slate-100 px-6 text-5xl font-medium uppercase text-signoz_vanilla-100 max-md:max-w-full max-md:text-4xl">
                Launch Week{' '}
                <span className="launch-week-counter rounded bg-signoz_cherry-500  text-signoz_vanilla-100">
                  4
                </span>
              </div>
            </div>
            <div className="z-10 mt-11 self-stretch border-b border-dashed border-signoz_slate-100 px-6 font-mono text-base font-medium leading-8 text-signoz_vanilla-400 max-md:mt-10 max-md:max-w-full">
              Join us for a week of new features and find new ways
              <br className="hidden sm:block" /> to level up on your observability goals.
            </div>
          </div>

          <div className="z-[1] my-6 ml-5 flex min-h-[40px] w-fit items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-white px-4 py-2 text-sm leading-none text-signoz_ink-500  ">
            <a
              href="https://lu.ma/event/evt-rsG0WzmmgF9FPfy"
              data-luma-action="checkout"
              data-luma-event-id="evt-rsG0WzmmgF9FPfy"
              id="launch-page-subscribe"
            >
              <div className="flex items-center gap-1.5">
                <img src="/svgs/icons/subscribe.svg" alt="subscribe icon" />
                <span className="px-2 py-1 text-sm font-medium leading-none text-neutral-950">
                  Subscribe for updates
                </span>
              </div>
            </a>
          </div>

          <div className="flex flex-col justify-between border-b border-t border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 sm:pr-4">
              <div className="text-base uppercase text-signoz_vanilla-400">Monday ⎯ May 12</div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://www.linkedin.com/events/deeptemporalobservability-signo7325138473550544896/theater/"
                  target="_blank"
                  id="btn-linkedin-live"
                  className="button-background flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    LinkedIn Live
                  </span>
                </Link>
                <div
                  id="btn-watch-youtube-video"
                  className="button-background mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                  onClick={() => handleOpenModal('P1_YVmbMcVw')}
                >
                  <img src="/svgs/icons/watch-video.svg" alt="watch video icon" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Watch the video
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="blog/deep-temporal-observability/"
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/blog/2025/05/deep-temporal-observability-cover.webp"
                className=" mb-4 h-auto w-auto pr-2 sm:mb-0 sm:w-3/5 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-eedium mb-2 text-base">Deep Temporal Observability - Correlate Metrics with Logs & Traces</div>
                  <div className="text-sm font-medium text-signoz_vanilla-400">
                    Get end-to-end observability of your Temporal workflows using OpenTelemetry and SigNoz.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
            <Modal
              size={'5xl'}
              backdrop="blur"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              className="self-center"
            >
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

          {/*<div className="flex flex-col justify-between border-b border-t border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 sm:pr-4">
              <div className="text-base uppercase text-signoz_vanilla-400">Tuesday ⎯ Feb 11</div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://www.linkedin.com/events/traceswithoutlimits-loadamillio7293312515470503938/theater/"
                  target="_blank"
                  id="btn-linkedin-live"
                  className="button-background flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    LinkedIn Live
                  </span>
                </Link>
                <div
                  id="btn-watch-youtube-video"
                  className="button-background mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                  onClick={() => handleOpenModal('cAbQcJC58VA')}
                >
                  <img src="/svgs/icons/watch-video.svg" alt="watch video icon" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Watch the video
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/blog/traces-without-limits/"
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/blog/2025/02/traces-without-limits-trace-updates.webp"
                className=" mb-4 h-auto w-auto pr-2 sm:mb-0 sm:w-3/5 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div className="min-w-[306px]">
                  <div className="font-eedium mb-2 text-base">Traces Without Limits</div>
                  <div className="text-sm font-medium text-signoz_vanilla-400">
                   SigNoz is now the only distributed tracing tool capable of loading a million spans seamlessly.
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

           <div className="flex flex-col justify-between border-b border-t border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 sm:pr-4">
              <div className="text-base uppercase text-signoz_vanilla-400">Wednesday ⎯ Feb 12</div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://www.linkedin.com/events/out-of-the-boxopentelemetry-pow7295056491584110592/theater/"
                  target="_blank"
                  id="btn-linkedin-live"
                  className="button-background flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    LinkedIn Live
                  </span>
                </Link>
                <div
                  id="btn-watch-youtube-video"
                  className="button-background mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                  onClick={() => handleOpenModal('2IlxtLHaqoY')}
                >
                  <img src="/svgs/icons/watch-video.svg" alt="watch video icon" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Watch the video
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/blog/opentelemetry-powered-kafka-celery-monitoring/"
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/blog/2025/02/opentelemetry-powered-kafka-celery-monitoring-messaging-queues-blog-cover.webp"
                className=" mb-4 h-auto w-auto pr-2 sm:mb-0 sm:w-3/5 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-eedium mb-2 text-base">OpenTelemetry-Powered Kafka & Celery Monitoring</div>
                  <div className="text-sm font-medium text-signoz_vanilla-400">
                  Industry's first fully integrated observability solution for messaging queues powered by OpenTelemetry.
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

          <div className="flex flex-col justify-between border-b border-t border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 sm:pr-4">
              <div className="text-base uppercase text-signoz_vanilla-400">Thursday ⎯ Feb 13</div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://www.linkedin.com/events/deepertraceanalytics-analyzeroo7295415096619479040/theater/"
                  target="_blank"
                  id="btn-linkedin-live"
                  className="button-background flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    LinkedIn Live
                  </span>
                </Link>
                <div
                  id="btn-watch-youtube-video"
                  className="button-background mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                  onClick={() => handleOpenModal('YJMkZOgOElA')}
                >
                  <img src="/svgs/icons/watch-video.svg" alt="watch video icon" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Watch the video
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/blog/deeper-trace-analytics-root-and-entry-spans/"
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/blog/2025/02/deeper-trace-analytics-root-and-entry-spans-trace-analytics-yt.webp"
                className=" mb-4 h-auto w-auto pr-2 sm:mb-0 sm:w-3/5 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-eedium mb-2 text-base">
                  Deeper Trace Analytics
                  </div>
                  <div className="text-sm font-medium text-signoz_vanilla-400">
                  Analyze Root & Entry Spans with Ease
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

          <div className="flex flex-col justify-between border-b border-t border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 sm:pr-4">
              <div className="text-base uppercase text-signoz_vanilla-400">FRIDAY ⎯ Feb 14</div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://www.linkedin.com/events/nativeawsintegrationswithautodi7295777503921549313/theater/"
                  target="_blank"
                  id="btn-linkedin-live"
                  className="button-background flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    LinkedIn Live
                  </span>
                </Link>
                <div
                  id="btn-watch-youtube-video"
                  className="button-background mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 sm:mb-0"
                  onClick={() => handleOpenModal('D7KLFIWIbq4')}
                >
                  <img src="/svgs/icons/watch-video.svg" alt="watch video icon" />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Watch the video
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/blog/native-aws-integrations-with-autodiscovery/"
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/blog/2025/02/native-aws-integrations-with-autodiscovery-native-aws-integrations-yt.webp"
                className=" mb-4 h-auto w-auto pr-2 sm:mb-0 sm:w-3/5 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-eedium mb-2 text-base">
                  Native AWS Integrations with AutoDiscovery
                  </div>
                  <div className="text-sm font-medium text-signoz_vanilla-400">
                  Making AWS monitoring dead simple in SigNoz.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div> */}

          {/* Timer  */}
          {[
            // 'Monday ⎯ May 12',
            'Tuesday ⎯ May 13',
            'Wednesday ⎯ May 14',
            'Thursday ⎯ May 15',
            'Friday ⎯ May 16',
          ].map((day, index) => (
            <div
              key={index}
              className="flex flex-grow items-center justify-between border-b border-dashed border-signoz_slate-100 px-6 py-2"
            >
              <div className="w-[32%] font-mono text-sm font-medium uppercase text-signoz_vanilla-400 sm:text-base">
                {day}
              </div>
              <div className="flex w-[68%] justify-end sm:justify-start">
                <CountdownTimer eventDate={`2025-05-${13 + index} 21:30:00`} />
              </div>
            </div>
          ))}

          {/* // Cards */}
          {/* <div className="mb-20 mt-12 flex flex-col gap-7 px-6">
            <div className="self-stretch font-mono uppercase text-signoz_vanilla-400">
              More From Launch Week
            </div>
            <div className="flex flex-col gap-6 sm:flex-row">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  url={card.url}
                />
              ))}
            </div>
          </div> */}
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
    url: '/blog/signoz-is-soc2-type2-and-hipaa-compliant/',
  },
  {
    title: 'Chat with Ankit, CTO of SigNoz',
    description: 'Get a sneak peek of the upcoming roadmap of SigNoz',
    url: '/blog/insights-into-signoz-latest-features/',
  },
]

const Card = ({ title, description, url }) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="launch-week-card-background group flex max-w-96 cursor-pointer flex-col rounded-md border border-signoz_slate-500 px-5 py-4 hover:bg-[#121317]"
    >
      <div>
        <div className="mb-2 text-base font-medium">{title}</div>
        <div className="mb-10 text-sm font-medium text-signoz_vanilla-400">{description}</div>
      </div>
      <div className="flex">
        <div className="button-background flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5">
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}

const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <div className="flex flex-col gap-16 px-20 font-medium max-md:max-w-full max-md:px-5 ">
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:45%] bg-[center_top_-12rem] sm:bg-no-repeat">
        <section className="container flex max-h-full max-w-full flex-col border-l border-r border-dashed border-signoz_slate-100 !px-0">
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[length:110%] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className="flex flex-col gap-12">
              <p className="mb-0 mt-20 text-center text-4xl font-bold">
                Get started with <br /> SigNoz Cloud today
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
