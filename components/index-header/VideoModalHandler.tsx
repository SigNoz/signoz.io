'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { AppModal as Modal } from '@/components/ui/Modal'

const VimeoPlayer = dynamic(() => import('../VimeoPlayer/VimeoPlayer'), {
  ssr: false,
})

interface VideoModalHandlerProps {
  targetId: string
  videoId: string
}

// Minimal client component - attaches click handler to server-rendered button
export const VideoModalHandler = ({ targetId, videoId }: VideoModalHandlerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const button = document.getElementById(targetId)
    if (!button) return

    const handleClick = () => setIsOpen(true)
    button.addEventListener('click', handleClick)

    return () => button.removeEventListener('click', handleClick)
  }, [targetId])

  return (
    <Modal size="5xl" backdrop="blur" isOpen={isOpen} onOpenChange={setIsOpen} panelClassName="p-0">
      <div className="rounded bg-signoz_ink-400 px-6 py-6">
        {isOpen ? <VimeoPlayer videoId={videoId} /> : null}
      </div>
    </Modal>
  )
}
