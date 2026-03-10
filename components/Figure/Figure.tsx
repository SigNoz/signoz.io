'use client'

import React from 'react'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import { cn } from 'app/lib/utils'

interface FigureProps {
  src: string
  alt: string
  caption: string
  link?: string
  sourceText?: string
  className?: string
  figureClassName?: string
  captionClassName?: string
  /** Cap the figure at a specific pixel width (e.g. lesser than the image's natural width) to prevent stretching */
  maxWidth?: number
}

export default function Figure({
  src,
  alt,
  caption,
  link,
  sourceText,
  className,
  figureClassName,
  captionClassName,
  maxWidth,
}: FigureProps) {
  const figureStyle = maxWidth ? { maxWidth, margin: '0 auto' } : undefined

  return (
    <Zoom>
      <figure className={figureClassName} style={figureStyle}>
        <img
          src={src}
          alt={alt}
          className={cn('rounded-md', className)}
          style={{ maxWidth: '100%' }}
        />
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
    </Zoom>
  )
}
