'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

import { cn } from 'app/lib/utils'

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  className?: string
  children?: React.ReactNode
}

export default function ImageZoom({
  src,
  alt,
  width = 1200,
  height = 675,
  priority = false,
  loading = 'lazy',
  className,
  children,
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const open = useCallback(() => setIsZoomed(true), [])
  const close = useCallback(() => setIsZoomed(false), [])

  useEffect(() => {
    if (!isZoomed) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isZoomed, close])

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
        aria-label={`Zoom image: ${alt}`}
      >
        {children ?? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            loading={priority ? undefined : loading}
            className={cn('rounded-md', className)}
          />
        )}
      </button>

      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed image"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <div
            className="relative h-[90vh] w-full max-w-6xl cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              onClick={close}
            />
          </div>
        </div>
      )}
    </>
  )
}
