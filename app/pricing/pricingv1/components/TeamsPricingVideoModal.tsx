'use client'

import React from 'react'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react'
import { Play } from 'lucide-react'
import VimeoPlayer from '../../../../components/VimeoPlayer/VimeoPlayer'
import TrackingButton from '../../../../components/TrackingButton'

interface VideoModalProps {
  buttonLabel: string
}

export default function TeamsPricingVideoModal({ buttonLabel }: VideoModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <TrackingButton
        onClick={onOpen}
        className="mx-auto flex items-center justify-center gap-1.5 hover:text-signoz_vanilla-300"
        clickType="Info Button"
        clickName="Pricing Video Modal Button"
        clickLocation="Teams Pricing Video Modal"
        clickText={buttonLabel}
      >
        <Play size={16} className="text-signoz_robin-500" />
        {buttonLabel}
      </TrackingButton>

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
                <VimeoPlayer videoId="968489758" />
                <p className="mt-4 text-center text-signoz_vanilla-400">
                  Note: Usage-based pricing applies after crossing the $49 mark
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
