'use client'

import Hero from '../../components/ui/Hero'
import VimeoPlayer from '../../components/VimeoPlayer/VimeoPlayer'
import { ArrowRight, BookOpen, Handshake } from 'lucide-react'
import Button from '@/components/Button/Button'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import { useLogEvent } from 'hooks/useLogEvent'

export const Header = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const logEvent = useLogEvent()

  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[-1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border  !border-b-0 !border-t-0  border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[8.5rem]">
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
        <Button id="btn-get-started-homepage-hero">
          <TrackingLink
            href="/teams/"
            className="flex-center"
            clickType="Primary CTA"
            clickName="Sign Up Button"
            clickText="Get Started - Free"
            clickLocation="Hero Section"
          >
            Get Started - Free
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>

        <Button type={Button.TYPES.SECONDARY} id="btn-read-documentation-homepage-hero">
          <TrackingLink
            href="/docs/introduction/"
            className="flex-center"
            clickType="Secondary CTA"
            clickName="Read Documentation Link"
            clickText="Read Documentation"
            clickLocation="Hero Section"
          >
            <BookOpen size={14} />
            Read Documentation
          </TrackingLink>
        </Button>
      </div>
      <div className="section-container !mx-auto !mt-0 !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 md:!w-[80vw] md:border-dashed">
        <div className="w-100 mx-[-28px]">
          <div className="product-explainer-video hero-figure rounded-lg p-3">
            <div className="embed-container">
              <div className="absolute">
                <img
                  src="/img/landing/landing_thumbnail.webp"
                  alt="Custom Thumbnail"
                  className="w-full rounded-lg"
                />

                <div className="play-container absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none">
                  <TrackingButton
                    clickType="Video Click"
                    clickName="Video Play Button"
                    clickText="Play Video"
                    clickLocation="Hero Section"
                    onClick={onOpen}
                  >
                    <img
                      src="/svgs/icons/play-icon.svg"
                      alt="signoz-video-play-btn"
                      className="h-6 w-6 md:h-20 md:w-20"
                    />
                  </TrackingButton>
                </div>
              </div>

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
                      <ModalBody className="py-6">
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
    </header>
  )
}
