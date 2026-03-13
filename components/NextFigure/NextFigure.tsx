'use client'

import React from 'react'
import Image from 'next/image'

import ImageZoom from '../ImageZoom/ImageZoom'
import { cn } from 'app/lib/utils'

interface NextFigureProps {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  link?: string
  sourceText?: string
  className?: string
  figureClassName?: string
  captionClassName?: string
}

export default function NextFigure({
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
}: NextFigureProps) {
  return (
    <figure className={figureClassName}>
      <ImageZoom
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={cn('rounded-md', className)}
        />
      </ImageZoom>
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
  )
}
