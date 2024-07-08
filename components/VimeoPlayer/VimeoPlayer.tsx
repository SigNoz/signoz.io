'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react"
import Player from '@vimeo/player'

const VimeoPlayer = ({ videoId }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const playerRef = useRef(null)
  const [isPlayerReady, setIsPlayerReady] = useState(false)

  useEffect(() => {
    if (isOpen && videoId && playerRef.current && !isPlayerReady) {
      const player = new Player(playerRef.current, {
        url: `https://vimeo.com/${videoId}`,
        autoplay: true,
      })
      setIsPlayerReady(true)
    }
  }, [isOpen, videoId, isPlayerReady])

  return (
    <div>
      <div className="absolute">
        <img
          src="/img/landing/landing_thumbnail.png"
          alt="Custom Thumbnail"
          className="w-full rounded-lg"
        />

        <div onClick={onOpen} className="play-container flex h-16 w-16 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none absolute inset-0 m-auto">
          <img
            src="/svgs/icons/play-icon.svg"
            alt="signoz-video-play-btn"
            className="h-6 w-6 md:h-20 md:w-20"
          />
        </div>
      </div>

      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
        <ModalContent>
          <ModalBody>
            <div ref={playerRef} className="embed-container w-full" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default VimeoPlayer

