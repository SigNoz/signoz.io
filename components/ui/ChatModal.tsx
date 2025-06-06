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
      <div className="relative mx-4 h-[90vh] max-h-[800px] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 id="chat-modal-title" className="text-lg font-semibold text-gray-900">
            SigNoz Assistant
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-signoz_robin-500"
            aria-label="Close chat modal"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Chat iframe content */}
        <div className="h-full w-full bg-white">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/ZXMN63dnzm9r1LEY0He6U"
            width="100%"
            style={{ height: 'calc(100% - 73px)', minHeight: '600px' }}
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
