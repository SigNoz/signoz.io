'use client'

import React from 'react'
import SubHeading from '../../components/ui/SubHeading'
import Hero from '../../components/ui/Hero'
import VimeoPlayer from '../../components/VimeoPlayer/VimeoPlayer'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

export const Header = () => {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <header className="mt-16 relative !w-[80vw] !mx-auto "> 
      <div className='absolute top-0 bottom-0 border border-signoz_slate-400 border-dashed top-0 left-[24px] right-[24px] z-[-1] !border-t-0 !border-b-0'/>
      <div className="flex flex-col items-center pt-[8.5rem] px-5 text-center relative !w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed pb-4 !border-b-0">
        {/* <Link href="/">
          <button className="h-10 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_slate-400 font-medium leading-5 text-white border border-signoz_slate-200 shadow-[0_0_14px_0_rgba(78,116,248,0.40)]">
            <BookOpen size={14} />SigNoz raises $6.5 million<ArrowRight size={14} />
          </button>
        </Link> */}
          <div className='absolute h-14 !w-[80vw] border border-signoz_slate-400 border-dashed left-0 top-[212px] z-[-1] !border-r-0 !border-l-0'/>
        <Hero>
          Best OpenTelemetry-Native&nbsp;
          <br className="hidden lg:inline" />
          Observability In A Single Pane
        </Hero>
        <p className='p-3 sm:p-0 text-base font-medium m-0'>
          SigNoz is an open-source Datadog or New Relic alternative. Get APM, logs,{' '}
          <br className="hidden lg:inline" /> traces, metrics, exceptions, & alerts in a single tool.
        </p>
      </div>
      {/* <div className='!w-[80vw] h-12 !mx-auto border border-signoz_slate-400 border-dashed !border-t-0 !border-b-0' /> */}
      <div className="mx-5 pt-4 pb-12 flex flex-col justify-center gap-3 md:flex-row items-center !w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed !border-b-0 !border-t-0">
        <Link href="/teams/">
          <Button>
            Start your free trial
            <ArrowRight size={14} />
          </Button>
        </Link>
        <Link href="/docs/introduction/">
          <Button type={Button.TYPES.SECONDARY}>
            <BookOpen size={14} />
            Read Documentation
          </Button>
        </Link>
      </div>
      <div className="section-container !w-[80vw] !mt-0 !mx-auto border border-signoz_slate-400 border-dashed !border-b-0 !border-t-0">
        <div className="w-100 mx-[-28px]">
        <div className="product-explainer-video hero-figure rounded-lg p-3">
        <div className="embed-container">
          <div className="absolute">
            <img
              src="/img/landing/landing_thumbnail.png"
              alt="Custom Thumbnail"
              className="w-full rounded-lg"
            />

            <div className="play-container flex h-16 w-16 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none absolute inset-0 m-auto">
              <img
                src="/svgs/icons/play-icon.svg"
                alt="signoz-video-play-btn"
                onClick={onOpen}
                className="h-6 w-6 md:h-20 md:w-20"
              />
            </div>
          </div>
          <Modal size={'5xl'} backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className='bg-transparen'>
              {() => (
                <>
                  <ModalBody className='py-6'>
                  <VimeoPlayer videoId="944340217" />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        </div>
        </div>
      </div>
    </header >
  )
}
