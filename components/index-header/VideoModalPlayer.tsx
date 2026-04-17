'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Image, { type StaticImageData } from 'next/image'
import { AppModal as Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import TrackingButton from '@/components/TrackingButton'
import PlayIcon from '@/public/svgs/icons/play-icon.svg'

const VimeoPlayer = dynamic(() => import('../VimeoPlayer/VimeoPlayer'), {
  ssr: false,
})

interface VideoModalPlayerProps {
  thumbnailSrc: string | StaticImageData
  thumbnailAlt: string
  videoId: string
}

export const VideoModalPlayer = ({
  thumbnailSrc,
  thumbnailAlt,
  videoId,
}: VideoModalPlayerProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="product-explainer-video hero-figure rounded-lg">
      <div className="embed-container">
        <div className="relative aspect-[2400/1194] w-full">
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="rounded-lg"
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />

          <div className="play-container absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none">
            <TrackingButton
              clickType="Video Click"
              clickName="Video Play Button"
              clickText="Play Video"
              clickLocation="Hero Section"
              onClick={onOpen}
              aria-label="Play product demo video"
            >
              <PlayIcon className="h-6 w-6 md:h-20 md:w-20" aria-hidden="true" />
            </TrackingButton>
          </div>
        </div>

        <Modal
          size="5xl"
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          panelClassName="p-0"
        >
          <div className="rounded bg-signoz_ink-400 px-6 py-6">
            {isOpen ? <VimeoPlayer videoId={videoId} /> : null}
          </div>
        </Modal>
      </div>
    </div>
  )
}
