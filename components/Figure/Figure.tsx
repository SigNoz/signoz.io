'use client'

import React from 'react'
import Image from 'next/image'

import ClientZoom from '../ClientZoom'
import { cn } from 'app/lib/utils'
import { isSrcAllowedForNextImage } from '@/constants/allowedImageDomains'

interface FigureProps {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
  priority?: boolean
  link?: string
  sourceText?: string
  className?: string
  figureClassName?: string
  captionClassName?: string
}

export default function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
  link,
  sourceText,
  className,
  figureClassName,
  captionClassName,
}: FigureProps) {
  const useNextImage = isSrcAllowedForNextImage(src)

  return (
    <ClientZoom>
      <figure className={figureClassName}>
        {useNextImage ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            className={cn('rounded-md', className)}
          />
        ) : (
          <img src={src} alt={alt} className={cn('rounded-md', className)} />
        )}
        <figcaption className={captionClassName}>
          <i>
            {link && !sourceText ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
                {caption}
              </a>
            ) : (
              <>
                {caption}{' '}
                {link && sourceText && (
                  <>
                    Source:{' '}
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {sourceText}
                    </a>
                  </>
                )}
              </>
            )}
          </i>
        </figcaption>
      </figure>
    </ClientZoom>
  )
}
