'use client'

import { useEffect } from 'react'
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'], weight: ['400'] })

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  time: number
}

export function Toast({ message, isVisible, onClose, time }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, time)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 transform">
      <div
        className={`rounded-lg border border-red-400/50 bg-red-500/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm ${lexend.className}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  )
}
