'use client'
import React, { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
    >
      <div className="relative mx-4 h-[80vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Chat iframe content */}
        <div className="h-full w-full bg-white">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/ZXMN63dnzm9r1LEY0He6U"
            width="100%"
            style={{ height: '100%', minHeight: '400px' }}
            frameBorder="0"
            title="SigNoz Chat Assistant"
            allow="microphone"
          />
        </div>
      </div>
    </div>
  )
}

export default ChatModal
