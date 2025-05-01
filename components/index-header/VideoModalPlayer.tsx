'use client'

import React from 'react'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react'
import VimeoPlayer from '../VimeoPlayer/VimeoPlayer'
import TrackingButton from '@/components/TrackingButton'

interface VideoModalPlayerProps {
  thumbnailSrc: string
  videoId: string
}

export const VideoModalPlayer = ({ thumbnailSrc, videoId }: VideoModalPlayerProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="product-explainer-video hero-figure rounded-lg p-3">
      <div className="embed-container">
        <div className="relative">
          <img src={thumbnailSrc} alt="Product Explainer Thumbnail" className="w-full rounded-lg" />

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
                  <VimeoPlayer videoId={videoId} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
