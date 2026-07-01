'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Figure from '../Figure/Figure'

interface ImageCTAProps {
  src: string
  alt: string
  className?: string
  ctaText?: string
  ctaUrl?: string
  caption: string
}

const ImageCTA: React.FC<ImageCTAProps> = ({
  src,
  alt,
  className = '',
  ctaText,
  ctaUrl,
  caption,
}) => {
  return (
    <div className={`${className} group relative`}>
      <div className="transition-transform duration-300 hover:scale-[1.02]">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 px-2 py-0">
          <Figure src={src} alt={alt} caption={caption} />
        </div>
      </div>

      {/* CTA Button - Always on top */}
      {ctaText && ctaUrl && (
        <div className="absolute bottom-8 right-8 z-[9999] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [&:has(+div[data-rmiz-modal-overlay])]:opacity-100">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              window.open(ctaUrl, '_blank')
            }}
            size="sm"
            className="bg-white/10 shadow-lg backdrop-blur"
          >
            <span className="flex items-center gap-2">
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ImageCTA
