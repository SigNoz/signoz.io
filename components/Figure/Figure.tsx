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
  /** When false, skip light-mode color invert. Default true. */
  themeInvert?: boolean
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
  themeInvert = true,
}: FigureProps) {
  const useNextImage = isSrcAllowedForNextImage(src)
  const imageClassName = cn('rounded-md', !themeInvert && 'no-theme-invert', className)

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
            className={imageClassName}
          />
        ) : (
          <img src={src} alt={alt} className={imageClassName} />
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
